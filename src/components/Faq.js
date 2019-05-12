import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import HTMLView from 'react-native-htmlview';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as termsActions from "../redux/actions/terms";

import LinearGradient from 'react-native-linear-gradient';


const mapStateToProps = state => ({
  fetching: state.terms.fetching,
  faq: state.terms.faq,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, termsActions), dispatch)
}


class Faq extends Component {
  componentDidMount() {
    this.props.getFaqRequest()
      .then(()=> console.log('this.props.faq', this.props.faq))
  }
  render() {
    if(this.props.fetching) {
      return (
        <View style={[s.container]}>
          <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color='rgb(188,224,253)' />
            </View>
          </LinearGradient>
        </View>
      )
    }
    return (
      <View style={s.container}>
        <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
          <View style={s.backButtonContainer}>
            <Image source={require('../assets/atras/atras.png')} />
          </View>
        </TouchableOpacity>
          <ScrollView>
            <View style={s.titleContainer}>
              <Text style={s.titleText}>
                Preguntas Frecuentes
              </Text>
            </View>

            <View style={s.paragraphContainer}>
              <HTMLView
                value={this.props.faq && `<div>${this.props.faq}</div>`}
                stylesheet={s}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 44,
  },
  backButtonContainer: {
    marginTop: 22,
    paddingLeft: 16,
  },
  titleText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'rgb(255,255,255)',
    letterSpacing: 1.9
  },
  boldText: {
    fontFamily: 'HouschkaRoundedAlt'
  },
  paragraphContainer: {
    marginBottom: 20,
    paddingHorizontal: 27,
  },
  textContainer: {
    color: 'rgb(255,255,255)',
    fontFamily: 'HouschkaRoundedAlt',
    fontSize: 15,
    lineHeight: 19
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
  div: {
    color: 'rgb(255,255,255)',
    fontFamily: 'HouschkaRoundedAlt',
    fontSize: 15,
    lineHeight: 19,
    textAlign: 'justify',
  },
  strong: {
    color: 'rgb(255,255,255)',
    fontFamily: 'HouschkaRoundedAlt',
    fontSize: 15,
    lineHeight: 19
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Faq);
