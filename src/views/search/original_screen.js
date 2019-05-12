import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Keyboard, Dimensions, ActivityIndicator} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../../redux/actions/destinations";
import * as originActions from "../../redux/actions/origins";
import * as tripActions from "../../redux/actions/trips";

const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions, tripActions), dispatch)
}

// DEVICE INFO
let deviceHeight = Dimensions.get('window').height

class Search extends React.Component {
  state = {
    origins: [],
    query: '',
    destinations: [],
    query2: ''
  }
  componentDidMount() {
    this.addKeyboardEventListener()

    this.props.getOriginsRequest()
      .then(origins => {
        this.setState({origins: this.props.origins.data}, ()=> console.log('origins state', this.state))
      })
  }
  addKeyboardEventListener = () => {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  removeKeyboardEventListener = () => {
    Keyboard.removeAllListeners('keyboardDidHide')
  }
  _keyboardDidHide = () => {
    // cuadno se esconde el keyboard, blureo el textinput para forzar el onfocus
    this.textInput.blur()
    this.state.query && this.getTripWithOrigin(this.state.query)
  }
  getTripWithOrigin = (address) => {
    // cuando hago la busqueda, scrolleo arriba de todo
    this.scroll.props.scrollToPosition(0, 0)

    // aca entra una vez que el usuario escribio el origen, y busca todos los posibles destinos

    // remuevo el listener del keyboard una vez que busco, por las dudas que sino se dispara cuando escondo el keyboard en destinations tambien
    this.removeKeyboardEventListener()

    // con la string de la address, busco el id de esa address en el arreglo de origins
    let selectedTripObject = this.state.origins.find(origin => origin.address.toLowerCase().trim() === address.toLowerCase().trim());

   selectedTripObject && this.props.getTripsWithOriginRequest(selectedTripObject.id)
    .then(data => {
      this.setState({destinations: this.props.possibleDestinations.data}, () => console.log('state is', this.state))
    })
  }
  getSelectedTripWithOriginAndDestination = (address) => {
    // cuando hago la busqueda, scrolleo arriba de todo
    this.scroll.props.scrollToPosition(0, 0)
    
    // una vez que tengo el origen y el destino que quiere, filtro para conseguir el trip al cual voy a navegar
    let finalTripObject = this.state.destinations.find(trip => trip.destination.address.toLowerCase().trim() === address.toLowerCase().trim());

    finalTripObject && console.log('finalTripObject', finalTripObject);
  }
  findOrigin(query) {
    if (query === '') {
      return [];
    }

    const { origins } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return origins.filter(origin => origin.address.search(regex) >= 0);
  }
  findDestination(query2) {
    if (query2 === '') {
      return [];
    }

    const { destinations } = this.state;
    const regex = new RegExp(`${query2.trim()}`, 'i');
    return destinations.filter(trip => trip.destination.address.search(regex) >= 0);
  }
  render() {
    const { query, query2 } = this.state;
    const origins = this.findOrigin(query);
    const destinations = this.findDestination(query2);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
              <KeyboardAwareScrollView 
                extraScrollHeight={450} 
                contentContainerStyle={{flex: 1}} 
                enableOnAndroid={true}
                innerRef={ref => {this.scroll = ref}}
              >
      <View style={s.containerBig}>
        <ImageBackground source={require('../../assets/aire_1242x2436.jpg')} style={{width: '100%', height: '100%'}}>


        <View style={s.titleContainer}>
          <Text style={s.titleExploreText}>
            Explorá la tierra mientras volás
          </Text>
        </View>

        <View style={s.originContainer}>
          <View style={s.originTextContainer}>
            <Text style={s.originText}>
              ORIGEN
            </Text>
          </View>
        </View>

        <View style={s.destinationContainer}>
          <View style={s.originTextContainer}>
            <Text style={s.originText}>
              DESTINO
            </Text>
          </View>
        </View>

        <View style={s.autocompleteContainerOrigen}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={{}}
            listStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            data={origins.length === 1 && comp(query, origins[0].address) ? [] : origins}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Ingresa tu origen acá"
            renderItem={({ address, release_date }) => (
              <TouchableOpacity style={s.listOptionStyle} onPress={() => this.setState({ query: address }, ()=> this.getTripWithOrigin(address))}>
                <Text style={s.itemText}>
                  {address}
                </Text>
              </TouchableOpacity>
            )}
            renderTextInput={() => (
              <View style={s.textInputContainerStyle}>
              <TextInput
                ref={(input) => {this.textInput = input}}
                style={s.textInputStyle}
                onChangeText={text => this.setState({ query: text })}
                defaultValue={query}
                placeholder="Ingresa tu origen acá"
                placeholderTextColor="rgb(64,76,155)"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={()=> {
                  this.state.query && this.getTripWithOrigin(this.state.query)
                }}
                onFocus={()=> this.addKeyboardEventListener()}
              />
              <TouchableOpacity onPress={()=> console.log('test')} style={{flex: 0.15, justifyContent: "center", paddingRight: 10}}>
                <Image style={{width: 16, height: 16, resizeMode: 'contain', flex: 1  }} tintColor={"#9B9B9B"} source={{uri: 'http://simpleicon.com/wp-content/uploads/magnifier-2.png'}} />
              </TouchableOpacity>
              </View>
            )}
            />
        </View>
        
        {this.props.tripsFetching ? <View><ActivityIndicator size="large" color="rgb(64,76,155)" /></View> : 
       <View style={s.autocompleteContainerDestino}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={{}}
            listStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            data={destinations.length === 1 && comp(query2, destinations[0].destination.address) ? [] : destinations}
            defaultValue={query2}
            onChangeText={text => this.setState({ query2: text })}
            placeholder="Ingresa tu destino acá"
            renderItem={({ destination  }) => (
              <TouchableOpacity style={s.listOptionStyle} onPress={() => this.setState({ query2: destination.address }, ()=> this.getSelectedTripWithOriginAndDestination(destination.address))}>
                <Text style={s.itemText}>
                  {destination.address}
                </Text>
              </TouchableOpacity>
            )}
            renderTextInput={() => (
              <View style={s.textInputContainerStyle}>
              <TextInput
                ref={(input) => {this.textInput2 = input}}
                style={s.textInputStyle}
                onChangeText={text => this.setState({ query2: text })}
                defaultValue={query2}
                placeholder="Ingresa tu destino acá"
                placeholderTextColor="rgb(64,76,155)"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={()=> {
                  this.state.query2 && this.getSelectedTripWithOriginAndDestination(this.state.query2)
                }}
              />
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('BottomTabs')} style={{flex: 0.15, justifyContent: "center", paddingRight: 10}}>
                <Image style={{width: 16, height: 16, resizeMode: 'contain', flex: 1  }} tintColor={"#9B9B9B"} source={{uri: 'http://simpleicon.com/wp-content/uploads/magnifier-2.png'}} />
              </TouchableOpacity>
              </View>
            )}
            />
       </View>
       }

        </ImageBackground>
      </View>
</KeyboardAwareScrollView>
    );
  }
}

const s = StyleSheet.create({
  containerBig: {
    height: deviceHeight * 1.3,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 51,
    marginBottom: 66
  },
  inputContainerAutocomplete: {
    height: 48,
    backgroundColor: 'red',
    borderRadius: 200
  },
  titleExploreText: {
    fontSize: 20,
    fontFamily: 'HouschkaRoundedAltMedium',
    color: 'rgb(255,255,255)'
  },
  originTextContainer: {
    marginLeft: 24,
    marginBottom: 16
  },
  textInputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginHorizontal: 18,
    flexDirection: 'row'
  },
  listOptionStyle: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    height: 48,
    marginHorizontal: 8,
    marginTop: 4
  },
  textInputStyle: {
    padding: 16,
    fontFamily: 'HouschkaRoundedAltMedium',
    fontSize: 14,
    height: 48,
    color: 'rgb(64,76,155)',
    flex: 0.85
  },
  destinationContainer: {
    marginTop: 70
  },
  originText: {
    fontSize: 17,
    color: 'rgb(188,224,253)',
    fontFamily: 'HouschkaRoundedAltDemiBold',
  },
  container: {
    backgroundColor: 'blue',
    height: 200,
    paddingTop: 25
  },
  autocompleteContainerOrigen: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 180,
    zIndex: 2
  },
  autocompleteContainerDestino: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 290,
    zIndex: 1    
  },
  itemText: {
    fontFamily: 'HouschkaRoundedAltMedium',
    fontSize: 14,
    color: 'rgb(64,76,155)'
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
