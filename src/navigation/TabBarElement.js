import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default ({noFocusedIcon, focusedIcon, focused, navigate}) => (
  <TouchableOpacity activeOpacity={1} onPress={()=> navigate()} style={[s.container, {borderBottomColor: focused ? 'rgb(93,191,189)' : 'transparent' }]}>
      <View style={s.iconContainer}>
        <Image  
          source={focused ? focusedIcon : noFocusedIcon }
        />
      </View>
  </TouchableOpacity>
)

const s = StyleSheet.create({
  container: {
    borderBottomWidth: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});