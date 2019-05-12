import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, Animated, StatusBar, AsyncStorage, Alert} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import HTMLView from 'react-native-htmlview';
import axios from "axios";

const { width } = Dimensions.get('window');

const SLIDER_1_FIRST_ITEM = 0;

const TAB_BAR_HEIGHT = 55

const slideWidth = wp(75);
const deviceHeight = Dimensions.get('window').height
const itemHorizontalMargin = wp(2);

const sliderWidth = width;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

function wp (percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
}


// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../redux/actions/destinations";
import * as originActions from "../redux/actions/origins";
import * as tripActions from "../redux/actions/trips";

const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions, tripActions), dispatch)
}

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == 'img') {
    const { src, height } = node.attribs;
    // const imageHeight = height || 300;
    return (
      <Image
        key={index}
        style={null}
        resizeMode='contain'
        source={ null } />
    );
  }
}

// const MODAL_HEIGHT = 429

const MODAL_HEIGHT = Dimensions.get('window').height / 2
const FULL_SCREEN = Dimensions.get('window').height 

class ModalWordpress extends React.Component {
  state = {
    fetching: true,
    content: null,
    title: null,
    showX: false,
    imageSrcArray: [],
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    localImagesArray: [],
    reStoreCompleted: false,
    loadImages: false,
    networkError: false,
    // testUri: null
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // en el did update, corro la misma funcion que el didmount
    if (prevProps.dataLink === this.props.dataLink) return
    this.setState({
      fetching: true,
      localImagesArray: [],
      slider1ActiveSlide: 0
    }, ()=> {
      this.filterSelectedSkyspot()
    })
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300
      // jugar con la duration sin tener prendido el RN debugger
    }).start()
    // levanto la data del skyspot seleccionado
    this.filterSelectedSkyspot()
  }
  filterSelectedSkyspot = () => {
    console.log('this,props.downloadedSkyspotsArray', this.props.downloadedSkyspotsArray)
    console.log('this,props.id', this.props.id)

    let downloadedSkyspotsArray = this.props.downloadedSkyspotsArray
    let id = this.props.id


    let selectedDownloadedSkyspot = downloadedSkyspotsArray.filter(skyspot => {
      return skyspot.id === parseInt(id)
    })

    console.log('selectedDownloadedSkyspot', selectedDownloadedSkyspot)

    let content = selectedDownloadedSkyspot[0].content
    let title = selectedDownloadedSkyspot[0].title
    let imgArray = selectedDownloadedSkyspot[0].imgArray


    this.setState({
      fetching: false,
      content,
      title,
      localImagesArray: imgArray
    }, ()=> console.log('fetching a false', this.state))
  }
  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'img') {
      const { src, height } = node.attribs;
      // retorno null para no renderear estas imagenes;
      return null
    }
  }
  _renderItem = ({item, index}) => {
      return (
          <View style={{flex: 1}}>
            <Image
              key={index}
              style={{ width: width, height: 250, resizeMode: 'contain'}}
              resizeMode='contain'
              source={{uri: item}} 
            />
           </View>
      );
  }
/*  get pagination () {
      const { localImagesArray, slider1ActiveSlide } = this.state;
      return (
          <Pagination
            dotsLength={localImagesArray.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={{ width: '100%'}}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 4,
                // backgroundColor: 'rgb(64,76,155)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderWidth: 2,
                borderColor: 'rgb(64,76,155)'  
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }*/
  navigateItem = (index) => {
   
    this.setState({
      // markerPressed: false,
      slider1ActiveSlide: index
    })
  }
  scrollToTop = () => {
    this.setState({
      showX: true
    })
    Animated.timing(this.animatedValue, {
      toValue: 2,
      duration: 100
    }).start()
  }
  render() {
    const interpolateDistance = this.animatedValue.interpolate({
      inputRange: [0, 1, 2],
      // hago este ternario raro para que la pantalla de atras de todo, ocupe o toda la pantalla o solo la mitad, asi permito que se pueda seguri moviendo el mapa (que sino, queda abajo de esa view y no se como propagar el evento a la view que queda abajo de la containerBig que es absoluto), lo mismo en el estilo inline de containerBig
      outputRange: !this.state.showX ? [-FULL_SCREEN +TAB_BAR_HEIGHT, -MODAL_HEIGHT, -20] : [-FULL_SCREEN +TAB_BAR_HEIGHT, -MODAL_HEIGHT +TAB_BAR_HEIGHT, -20]
      // corregir saltadito
      // outputRange: [-FULL_SCREEN, -MODAL_HEIGHT, -StatusBar.currentHeight]
      // aca el 75 es 55 del tab bar y 20 de la status bar creo, corregir calculo
      // aca necesito sacar el height de la status bar en ios & en Android, porque lo de arriba solo funciona en Android 
      // https://stackoverflow.com/questions/35436643/how-to-find-height-of-status-bar-in-android-through-react-native
      // window y screen? https://facebook.github.io/react-native/docs/dimensions
    })
    const animatedStyle = {
      position: 'absolute',
      // backgroundColor: interpolateColor,
      width: '100%',
      height: '100%'
    }
    if(this.state.fetching) {
      return (
        <View style={s.containerBig}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color='rgb(188,224,253)' />
          </View>
        </View>
      )
    }
    return (

      // <Animated.View style={[s.containerBig, {top: !this.state.showX ? MODAL_HEIGHT - TAB_BAR_HEIGHT : null}]}>
      <Animated.View style={[s.containerBig, {top: 0}]}>
        
          <TouchableOpacity 
            style={{backgroundColor: 'rgba(0,0,0,0)', flex: 1}}
            onPress={()=> this.props.close()} 
          />
        

        <Animated.View
          style={{
            zIndex: 10,
            position: 'absolute',
            // width: '100%',
            height: !this.state.showX ? FULL_SCREEN  : FULL_SCREEN - TAB_BAR_HEIGHT,
            backgroundColor: 'white',
            bottom: interpolateDistance,
            // paddingHorizontal: 12.5,
            // paddingTop: 16.6,
            // paddingBottom: -30 + 55,
            // alignItems: 'center'
          }}
        >

      <View style={s.bigContainer}>

        <TouchableOpacity onPress={!this.state.showX ? this.scrollToTop : this.props.close} style={{flex: 1, flexDirection: 'row'}}>  
          
          <View style={[s.titleContainer, {flex: 0.8}]}>
            <Text style={s.titleText}>
              {this.state.title && this.state.title.toUpperCase()}
            </Text>
          </View>

          <View style={[s.imgContainer, {flex: 0.2}]}>

            <Image source={!this.state.showX ? require('../assets/arriba/arriba.png') : require('../assets/cerrar/cerrar.png') } />
          </View>
          
        </TouchableOpacity>

        <View style={s.line} />

      </View>

        <ScrollView contentContainerStyle={{paddingBottom: !this.state.showX ? 300 : 35 }}>

        

        {this.state.localImagesArray.length === 0 ? null :
          <View style={s.igCounterContainer}>
            <Text style={s.igCounterText}>{`${this.state.slider1ActiveSlide + 1}/${this.state.localImagesArray.length}`}</Text>
          </View>
        }

          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.localImagesArray}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => this.navigateItem(index) }  
           />
           {/* { this.pagination }*/}

          <HTMLView
            renderNode={this.renderNode}
            value={this.state.content && `${this.state.content}`}
            stylesheet={s}
          />
       </ScrollView>
       </Animated.View>
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
  containerBig: {
    // flex: 1,
    // height: FULL_SCREEN,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    // backgroundColor: 'orange'
  },
  bigContainer: {
    height: 53,
  },
  titleContainer: {
    paddingLeft: 33,
    flex: 1,
    justifyContent: 'center'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  igCounterContainer: {
    height: 30, 
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    width: 50, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'absolute', 
    top: 50, 
    right: 20, 
    zIndex: 20
  },
  igCounterText: {
    color: 'white', 
    fontSize: 12, 
    fontFamily: 'HouschkaRoundedAlt'
  },
  line: {
    backgroundColor: 'rgb(64,76,155)',
    height: 1,
    opacity: 0.23
  },
  titleText: {
    color: 'rgb(64,76,155)',
    fontFamily: 'HouschkaRoundedAlt',
    fontSize: 14
  },
  p: {
    color: 'rgb(64,76,155)',
    paddingHorizontal: 33,
    fontFamily: 'HouschkaRoundedAlt',
    lineHeight: 19,
    fontSize: 13
  },
  i: {
    color: 'rgb(64,76,155)',
    paddingHorizontal: 33,
    fontFamily: 'HouschkaRoundedAlt',
    lineHeight: 19,
    fontSize: 13,
    fontStyle: 'italic'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWordpress);