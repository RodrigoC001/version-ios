import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';

export default (props) => (
  <View style={s.container}>
    <TouchableOpacity onPress={()=> props.onPress()} activeOpacity={0.2}>
      <View style={s.optionContainer}>   
        <View style={s.configOptionContainer}>
          <View style={s.iconContainer}>
            <Image source={props.icon} />
          </View>
          <View style={s.optionTextContainer}>
            <Text style={s.optionText}>
              {props.title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    <View style={{height: 1, backgroundColor: 'rgb(255,255,255)', opacity: 0.23}}/>
  </View>
);


const s = StyleSheet.create({
  optionContainer: {
    height: 62,
  },
  configOptionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    flex: 0.1,
    paddingLeft: 38
  },
  optionTextContainer: {
    justifyContent: 'center',
    flex: 0.9,
  },
  optionText: {
    color: 'rgb(255,255,255)',
    fontSize: 15,
    fontFamily: 'HouschkaRoundedAlt',
    paddingLeft: 10,
    lineHeight: 21
  }
});
