import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';

export default ({name}) => (
  <View style={s.buttonPosition}>
    <View style={s.buttonContainer}>
      <Text style={s.textButton}>
        {name}
      </Text>
    </View>
  </View>
)

const s = StyleSheet.create({
  buttonPosition: {
    paddingHorizontal: 69,
    height: 40,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 16,
    height: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 12,
    color: 'rgb(64,76,155)',
    fontFamily: 'HouschkaRoundedAlt'
  }
});

