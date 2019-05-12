import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Keyboard, Dimensions, ActivityIndicator} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Carousel, { Pagination } from 'react-native-snap-carousel';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../../redux/actions/destinations";
import * as originActions from "../../redux/actions/origins";
import * as tripActions from "../../redux/actions/trips";

const SLIDER_1_FIRST_ITEM = 0;


const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip
});

const deviceWidth = Dimensions.get('window').width
const slideWidth = wp(75);
const deviceHeight = Dimensions.get('window').height
const itemHorizontalMargin = wp(2);

const sliderWidth = deviceWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;


function wp (percentage) {
    const value = (percentage * deviceWidth) / 100;
    return Math.round(value);
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions, tripActions), dispatch)
}

const nubladoImages = [{
  id: 1,
  image: require('../../assets/nublado/1.png'),
}, {
  id: 2,
  image: require('../../assets/nublado/2.png'),
}, {
  id: 3,
  image: require('../../assets/nublado/3.png'),
}, {
  id: 4,
  image: require('../../assets/nublado/4.png'),
}]

class CarouselNublado extends React.Component {
  state = {
    nubladoImages: nubladoImages,
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
  }
  _renderItem = ({item, index}) => {
      return (
          <View style={{flex: 1}}>
              <Image 
                source={item.image} 
                style={{width: '100%', height: '100%'}}
              />
          </View>
      );
  }
  get pagination () {
      const { nubladoImages, slider1ActiveSlide } = this.state;
      return (
          <Pagination
            dotsLength={nubladoImages.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={{ backgroundColor: 'transparent', position: 'absolute', top: deviceHeight * 0.74, width: '100%'}}
            dotStyle={{
                width: 20,
                height: 20,
                borderRadius: 10,
                marginHorizontal: 8,
                // backgroundColor: 'rgb(64,76,155)',
                backgroundColor: 'rgba(93, 191, 189, 0.92)',
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
  }
  navigateItem = (index) => {
   
    this.setState({
      // markerPressed: false,
      slider1ActiveSlide: index
    })
  }
  render() {
    return (
            <View style={s.container}>
              <View style={s.backButtonContainer}>
                <TouchableOpacity  
                  onPress={()=> this.props.navigation.goBack()}>
                <Image source={require('../../assets/atras/atras.png')} />
                </TouchableOpacity>
              </View>
              <Carousel
               ref={(c) => { this._carousel = c; }}
               data={this.state.nubladoImages}
               renderItem={this._renderItem}
               sliderWidth={sliderWidth}
               itemWidth={itemWidth}
               onSnapToItem={(index) => this.navigateItem(index) }  
              />
             { this.pagination }
            </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgb(64,76,155)'
  },
  backButtonContainer: {
    flex: 1,
    left: 16,
    position: 'absolute',
    top: 22,
    zIndex: 999
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselNublado);
