import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';
import CloudComponent from '../../components/CloudComponent.js'

const nubesData = [{
  id: 1,
  title: '¿Por qué esta nublado?',
  icon: require('../../assets/nubes_photos/por_que_esta_nublado.jpg'),
  onPress: (props)=> props.navigation.navigate('CarouselNublado')
}, {
  id: 2,
  title: 'Atlas de Nubes',
  icon: require('../../assets/nubes_photos/atlas_de_nubes.jpg'),
  onPress: (props)=> props.navigation.navigate('AtlasNubes')
}, {
  id: 3,
  title: 'Dibujá sobre una nube',
  icon: require('../../assets/nubes_photos/dibuja_sobre_una_nube.jpg'),
  onPress: (props)=> props.navigation.navigate('DibujaNube')
}]

export default class NubesIndex extends React.Component {
  state = {
    remainingHeight: null
  }
  _getComponentDimensions = (event) => {
    console.log('entra aca')
    this.setState({
      remainingHeight: event.nativeEvent.layout.height
    })
  }
  render() {
    return (
      <View style={s.container}>
          <View style={s.nubesContainer}>
            <Text style={s.nubesText}>
              NUBES
            </Text>
          </View>
        <ScrollView
          onLayout={ (event) => this._getComponentDimensions(event) }  
          style={{flex: 1}}>
          {nubesData.map((nube, index)=> <CloudComponent key={nube.id} heightPerComponent={this.state.remainingHeight / 3} title={nube.title} icon={nube.icon} textColor={index % 2 ? 'rgb(212,220,241)' : 'rgb(64,76,155)' } tintColor={index % 2 ? 'rgb(64,76,155)' : 'rgb(212,220,241)'} onPress={()=> nube.onPress(this.props)} />)}
        </ScrollView>
      </View>
    );
  }
}


const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  nubesContainer: {
    height: 100,
    backgroundColor: '#3f4b9a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nubesText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'white',
    letterSpacing: 1.9
  }
});