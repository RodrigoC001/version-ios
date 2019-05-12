import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, Alert, AsyncStorage} from 'react-native';
import ConfigOption from '../../components/ConfigOption.js'

import Mapbox from '@mapbox/react-native-mapbox-gl';

// MAPBOX CONFIG
Mapbox.setAccessToken('pk.eyJ1IjoibGF1dGFyb2dyYW5kZSIsImEiOiJjamtrNjFqMW8xbnVhM3BwYjdmZjczcXkyIn0._Gz0SnZDQIGeosDSbwFwMA');

const configData = [{
  id: 1,
  icon: require('../../assets/config/cesto/cesto.png'),
  title: 'Eliminar rutas descargadas',
  onPress: ()=> {
    Alert.alert(
      'AI.RE',
      '¿Queres eliminar todas las rutas descargadas?',
      [
        {text: 'OK', onPress: () => {
          AsyncStorage.clear()
            .then((data)=> console.log('async storage cleared', data) )
        }},
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }
}, {
  id: 2,
  icon: require('../../assets/config/pregunta/pregunta.png'),
  title: 'Preguntas Frecuentes',
  onPress: (props)=> props.navigation.navigate('Faq')
}, {
  id: 3,
  icon: require('../../assets/config/info/info.png'),
  title: `Políticas y privacidad / 
Términos y condiciones`,
  onPress: (props)=> props.navigation.navigate('Terms')
}]

export default (props) => (
  <View style={s.container}>
    <ImageBackground source={require('../../assets/aire_1242x2436.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={s.titleContainer}>
        <Text style={s.titleText}>
          CONFIGURACIÓN
        </Text>
      </View>
      {configData.map(option=> <ConfigOption onPress={()=> option.onPress(props)} key={option.id} icon={option.icon} title={option.title} />)}
      <View style={s.logoContainer}>
        <Image source={require('../../assets/logoaire/logoaire.png')} />
      </View>
    </ImageBackground>
  </View>
)


const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 51,
    marginBottom: 66
  },
  titleText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'rgb(255,255,255)'
  },
  logoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 31,
    paddingRight: 18.2
  }
});
