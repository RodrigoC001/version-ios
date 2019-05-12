import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => (
      <View style={s.container}>
        <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
          <ScrollView>
          <View style={s.titleContainer}>
            <Text style={s.titleText}>
              ¿QUÉ ES AI.RE?
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textContainer}>
              <Text style={[s.textContainer, s.boldText]}>AI.RE</Text> es una aceleradora para la regeneración de ecosistemas.{`
`}
              Desarrollamos <Text style={[s.textContainer, s.boldText]}>AI.RE</Text> APP, una aplicación móvil offline para explorar la tierra desde el cielo. 
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textContainer}>
              Queremos enriquecer tu experiencia de vuelo con contenidos adaptados a tu ruta. Con <Text style={[s.textContainer, s.boldText]}>AI.RE</Text> app podés identificar los paisajes visibles desde la ventanilla de tu avión, conectar con sus historias y apoyar nuestro propósito: aumentar la biocapacidad del planeta.
            </Text>
          </View>

          <View style={s.paragraphContainer}>
            <Text style={s.textContainer}>
              Como viajero de <Text style={[s.textContainer, s.boldText]}>AI.RE</Text> podés potenciar la regeneración de los ecosistemas sobre los que volás, participando en el financiamiento colectivo de los proyectos con impacto en el territorio.
            </Text>
          </View>

          <View style={s.buttonPosition}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Acelera')} style={s.buttonShape}>
              <View style={s.buttonTextContainer}>
                <Text style={s.buttonText}>
                  Acelerá
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </LinearGradient>
      </View>
  )


const s = StyleSheet.create({
  container: {
    flex: 1
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
  boldText: {
    fontFamily: 'HouschkaRoundedAlt'
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
  }
});
