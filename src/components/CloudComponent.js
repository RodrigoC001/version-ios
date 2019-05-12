import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';

export default (props) => (
  <View style={s.container}>
  <TouchableOpacity onPress={()=> props.onPress()} activeOpacity={0.2}>
    <ImageBackground source={props.icon} style={[s.cloudComponent, {height: props.heightPerComponent}]}>
      <Text style={[s.cloudCardText, {color: props.textColor }]}>
        {props.title}
      </Text>
      <View style={[s.opacityView, {backgroundColor: props.tintColor}]} />
    </ImageBackground>
  </TouchableOpacity>
  </View>
);


const s = StyleSheet.create({
  cloudComponent: {
    zIndex: 1,
    // height: 163,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudCardText: {
    fontSize: 20,
    fontFamily: 'HouschkaRoundedAlt',
    zIndex: 3,
  },
  opacityView: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.58
  }
});
