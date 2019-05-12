import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity,ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => (
      <View style={s.container}>
        <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
       
          <ImageBackground resizeMode='stretch' source={require('../../assets/nublado/5.png')} style={s.imageContainer}>
          <TouchableOpacity onPress={()=> props.navigation.goBack()}>
          <View style={s.backButtonContainer}>
            <Image source={require('../../assets/atras/atras.png')} />
          </View>
        </TouchableOpacity>

          </ImageBackground>

        </LinearGradient>
      </View>
  )


const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 41,
    marginBottom: 44
  },
  titleText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'rgb(255,255,255)',
    letterSpacing: 1.9
  },
  imageContainer: {
    width: '100%',
    height:'100%',
  },
  paragraphContainer: {
    marginBottom: 20,
    paddingHorizontal: 27
  },
  textContainer: {
    color: 'rgb(255,255,255)',
    fontFamily: 'HouschkaRoundedAlt',
    fontSize: 15,
    lineHeight: 19,
    textAlign: 'justify'
  },
  buttonPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonShape: {
    borderRadius: 26,
    backgroundColor: 'rgb(255,255,255)',
    borderWidth: 2,
    borderColor: 'rgb(212,220,241)',
    height: 52,
    width: 187
  },
  buttonTextContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'rgb(64,76,155)'
  },
  backButtonContainer: {
    marginTop: 22,
    paddingLeft: 16,

  },
});