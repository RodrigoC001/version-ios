import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';
import TriviaOption from '../../components/TriviaOption.js'

const options = [{
  id: 1,
  name: 'Bañado la Estrella'
}, {
  id: 2,
  name: 'Delta del Paraná'
}, {
  id: 3,
  name: 'Parque Nacional Aconquija'
}]

export default (props) => (
  <View style={s.container}>
    <ImageBackground source={require('../../assets/fondotrivia/fondotrivia.png')} style={{width: '100%', height: '100%'}}>
  <ScrollView>
    <View style={s.titleContainer}>
      <Text style={s.titleText}>
        ¿SOS UN EXPLORADOR DEL AIRE?
      </Text>
    </View>
    <View style={s.windowContainer}>
      <Image source={require('../../assets/ventana_avion/ventana_avion.png')} style={{width: 263*0.8, height: 338*0.8}} />
    </View>

    <View style={s.buttonsContainer}>
      {options.map(option=> <TriviaOption key={option.id} name={option.name} /> )}
    </View>

    </ScrollView>
    </ImageBackground>
  </View>
)

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    // flex: 1,
    paddingHorizontal: 70,
    marginTop: 25
  },
  buttonsContainer: {
    marginTop: 20,
  },
  windowContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'HouschkaRoundedAlt',
  }
});