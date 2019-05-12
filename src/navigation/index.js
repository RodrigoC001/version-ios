import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Config from '../views/config/'
import AboutUs from '../components/AboutUs/AboutUs.js'
import Acelera from '../components/AboutUs/acelera.js'
import TabBar from '../navigation/TabBar.js'
import MapBoxContainer from '../components/MapBoxContainer.js'
import Nubes from '../views/nubes/'
import CarouselNublado from '../views/nubes/CarouselNublado.js'
import Hills from '../views/hills/'
import Search from '../views/search/'
import Faq from '../components/Faq.js'
import Terms from '../components/Terms.js'
import AtlasNubes from '../views/nubes/AtlasNubes.js'
import DibujaNube from '../views/nubes/DibujaNube.js'


const ConfigStack = createStackNavigator(
  {
    Config: {
      screen: Config
    },
    Faq: {
      screen: Faq
    },
    PrivacyTerms: {
      screen: Faq
    },
    Terms: {
      screen: Terms
    }
  },
  {
    initialRouteName: 'Config',
    headerMode: 'none'
  }
)

const NubesStack = createStackNavigator(
  {
    Nubes: {
      screen: Nubes
    },
    CarouselNublado: {
      screen: CarouselNublado
    },
    AtlasNubes: {
      screen: AtlasNubes
      },
      DibujaNube: {
        screen: DibujaNube
        },
  },
  {
    initialRouteName: 'Nubes',
    headerMode: 'none'
  }
)

const AboutSt = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUs,
    },
    Acelera: {
      screen: Acelera
    }
  },
  {
    initialRouteName: 'AboutUs',
    headerMode: 'none'
  }
)

const AboutStack = createAppContainer(AboutSt); 


const BottomTabs = createBottomTabNavigator(
  { 
    AboutUs: AboutStack,
    Hills: Hills,
    Map: MapBoxContainer,
    Nubes: NubesStack,
    Config: ConfigStack,
  },
  {
    initialRouteName: 'Map',
    tabBarComponent: (props) => <TabBar {...props}/>
  }
);

const StackNav = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
    BottomTabs: {
      screen: BottomTabs
    }
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
)

const StackNavigation = createAppContainer(StackNav);

export { StackNavigation, AboutStack };
