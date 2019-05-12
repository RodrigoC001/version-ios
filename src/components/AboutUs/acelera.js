import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => (
      <View style={s.container}>
        <View style={{backgroundColor:'transparent'}}  style={{flex: 1}}>
        <View style={{flex:1,left:12,top:22,width:40}} >
                  <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                    <View style={s.backButtonContainer}>
                    <Image  source={require('../../assets/atras/atras.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
           
        
          <View style={s.paragraphContainer2}>
            <Text style={s.textContainer}>
              Te necesitamos 
            </Text>
            <Text style={s.textContainer}>
             para acelerar la 
            </Text>
            <Text style={s.textContainerBold}>
              regeneración
            </Text>
            <Text style={s.textContainerBold}>
              de la tierra.
            </Text>
          </View>
          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              Con tu apoyo potenciamos intervenciones 
            </Text>
          </View>
          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              regenerativas en las comunidades y 
            </Text>
          </View>
          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
            ecosistemas que sobrevolás.
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              
            </Text>
          </View>
          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              
            </Text>
          </View>
      
         

          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              Ingresá tu e-mail para ser parte de AI.RE
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              
            </Text>
          </View>
         
          <View style={s.inputContainer}>
            <TextInput placeholder="Email" style={{color:'#BDBDBD',marginBottom:20}}/>
          </View>
          <View style={s.paragraphContainer}>
            <Text style={s.textInfo}>
              
            </Text>
          </View>

          <View style={s.buttonPosition}>
            <TouchableOpacity style={s.buttonShape}>
              <View style={s.buttonTextContainer}>
                <Text style={s.buttonText}>
                  Enviar
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
  )


const s = StyleSheet.create({
  container: {
    flex: 0.8
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 44
  },
  titleText: {
    fontSize: 10,
    fontFamily: 'HouschkaRoundedAlt',
    color: 'rgb(255,255,255)',
    letterSpacing: 1.9
  },
  boldText: {
    fontFamily: 'HouschkaRoundedAlt'
  },
  paragraphContainer: {
    marginBottom: 0,
    paddingHorizontal: 27,
   
  },
  
  paragraphContainer2: {
   marginTop:100,
    paddingHorizontal: 27,
  
  },
  inputContainer: {
    marginBottom: 0,
    
    borderBottomWidth:1,
    borderBottomColor:'#BDBDBD',
    width:'80%',
    alignSelf:'center'
  },
  textContainer: {
    fontFamily: 'HouschkaRoundedAlt',
    textAlign: 'left',
    lineHeight: 30,
    fontSize: 25,
    color: 'rgb(64,76,155)',
    fontWeight: "100",
    
  },
    textContainerBold: {
    fontFamily: 'HouschkaRoundedAlt',
    textAlign: 'justify',
    lineHeight: 35,
    fontSize: 27,
    color: 'rgb(64,76,155)',
    fontWeight: "900",
    
  },
  textInfo: {
    fontFamily: 'HouschkaRoundedAlt',
    lineHeight: 14,
    textAlign: 'left',
    fontSize: 12,
    color: '#6E6E6E'
  },
  buttonPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonShape: {
    borderRadius: 26,
    backgroundColor: 'rgb(255,255,255)',
    borderWidth: 2,
    borderColor: 'rgb(212,220,241)',
    height: 45,
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
    marginTop:0,
    paddingLeft: 0,

  },
});
