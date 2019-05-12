import React from 'react'
import TabBarElement from './TabBarElement.js'
import { StyleSheet, View } from 'react-native'

const icon = {
  AboutUs: require('../assets/aire_blanco/aire.png'),
  Config: require('../assets/configuracion_blanco/configuracion.png'),
  Map: require('../assets/mapa_blanco/mapa.png'),
  Nubes: require('../assets/nubes_blanco/nubes.png'),
  Hills: require('../assets/paisajes_blanco/paisajes.png'), 
}

const focusIcon = {
  AboutUs: require('../assets/aire/aire.png'),
  Config: require('../assets/configuracion/configuracion.png'),
  Map: require('../assets/mapa/mapa.png'), 
  Nubes: require('../assets/nubes/nubes.png'),
  Hills: require('../assets/paisajes/paisajes.png'),   
}

const renderIcon = (routeName) => {
  return icon[routeName]
}

const renderFocusIcon = (routeName) => {
  return focusIcon[routeName]
}

export default (props) => {
  const { routes } = props.navigation.state
  return ( 
  <View style={s.tabBarMockUp}>
    {routes && routes.map((route, index) => {
      const focused = index === props.navigation.state.index;
      return (
      <TabBarElement
        key={index}
        navigate={()=> props.navigation.navigate(route.routeName)}
        style={{ flex: 1 }}
        focused={focused}
        noFocusedIcon={renderIcon(route.routeName)}
        focusedIcon={renderFocusIcon(route.routeName)}
      />
      );
    })
  }
  </View>
  )
}

const s = StyleSheet.create({
  tabBarMockUp: {
    height: 55,
    backgroundColor: 'rgb(64,76,155)',
    flexDirection: 'row'
  },
});
