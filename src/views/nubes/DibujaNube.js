import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity,ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => (
    <View style={s.container}>
        <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
            <ImageBackground resizeMode='stretch' source={require('../../assets/nublado/dibujaNube.jpg')} style={s.imageContainer}>
                <Image style={{position:'absolute', bottom:300, left:100}} source={require('../../assets/nublado/dibujo/dibujo.png')}></Image>
                <View style={{flex:0.5 ,flexDirection:'row'}}>
                <View style={{flex:1}} >
                  <TouchableOpacity onPress={()=> props.navigation.goBack()} style={s.backButtonContainer}>
                    <Image  source={require('../../assets/atras/atras.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1}} onPress={()=> console.log('ir para atras')}>
                  <TouchableOpacity style={s.ButtonContainerRight}>
                    <Image source={require('../../assets/dibuja/dibuja.png')} />
                  </TouchableOpacity>
                </View>
                </View>
                <View style={{flex:0.5 ,flexDirection:'row'}}>
                <View style={{flex:1}} onPress={()=> console.log('ir para atras')}>
                  <TouchableOpacity style={s.ButtonCamera}>
                    <Image style={{width:'100%',height:'50%'}} source={require('../../assets/camara/camara.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1}} onPress={()=> console.log('ir para atras')}>
                  <TouchableOpacity style={s.ButtonOk}>
                    <Image style={{width:'100%',height:'50%'}} source={require('../../assets/ok/ok.png')} />
                  </TouchableOpacity>
                </View>
                </View>
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
    flex:1,
    flexDirection:'column'
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
    marginTop: 15,
    paddingLeft: 13 ,          
    
    flex:0.5,

  },
  ButtonContainerRight:{
    marginTop: 15,
    paddingLeft:128,
    flex:0.5

  },
  ButtonCamera:{
   
    flex:0.5,
   
    position:'relative',
    width:'45%',
    left:5,
    top:222


  },
  ButtonOk:{
    
    position:'relative',
    left:104,
    top:222,
    width:'45%',
    
    flex:0.5,
    
    

  }
});