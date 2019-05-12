import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Keyboard, Dimensions, ActivityIndicator, AsyncStorage, NetInfo} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../../redux/actions/destinations";
import * as originActions from "../../redux/actions/origins";
import * as tripActions from "../../redux/actions/trips";


// import SplashScreen from 'react-native-splash-screen'


const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip,
  skyspotsArrayForMap: state.trips.skyspotsArrayForMap
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
    query2: '',
    permission: true,
    asyncStorageTripsArray: null,
    showColor: false
  }
  componentDidMount() {
    console.log('entra al did mount')
    this.addKeyboardEventListener()
    this.startFlow()
  }
  changeStateBackGround = () => {
    this.setState({
      showColor: true
    })
  }
  startFlow = () => {
    console.log('begins flow');

    this.findOrCreateDownloadedTripsAsyncStorageFolder()
      .then(data => {
        this.setState({
          asyncStorageTripsArray: data
        })
        console.log('lo que retorna el findOrCreateDownloadedTripsAsyncStorageFolder es', data)
      })
      .then(()=> this.getConnectionInfo())
      .then(connectionInfo => {
        if (connectionInfo === 'none') {
          // no hay conexion y entra  a este if
          console.log('no hay conexion y entra a este if', connectionInfo)
          // aca hago lo necesario para levantar esa info de forma offline
          let asyncStorageTripsArray = this.state.asyncStorageTripsArray
          let arrayFinal = asyncStorageTripsArray.map(trip => trip.origin)
          
          console.log('arrayFinal', arrayFinal)

          this.setState({origins: arrayFinal})
          return null
        }
        return this.props.getOriginsRequest()    
      })
      .then(origins => {
        if(origins) {
          console.log('Primer paso con internet, array de origins', this.props.origins.data)
          this.setState({origins: this.props.origins.data})
        }
      })
  }
  getBackFromChildComponentAndUpdate = (data) => {
    // si vuelvo para atras, hago lo mismo que en el didMount : checkeo si tengo internet o no (puede ser que en la pantalla de adelante, el usuario haya bajado el mapa, y despues vuelve para tras y queda ahi)
    if(data) {
      this.setState({
        query: '',
        query2: '' 
      })
      this.startFlow()
    }
  }
  getConnectionInfo = () => {
    return NetInfo.getConnectionInfo()
      .then((connectionInfo) => {
      // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      return connectionInfo.type
      });
  }
  findOrCreateDownloadedTripsAsyncStorageFolder = () => {
    return AsyncStorage.getItem('tripsArray')
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the trips array async storage folder already exists and is', json)
            return json
          }
          if(!json) {
            const emptyArray = [];
            return AsyncStorage.setItem('tripsArray', JSON.stringify(emptyArray))
                  .then(json => {
                    return AsyncStorage.getItem('tripsArray')
                    .then(data => {
                      console.log('trips array storage folder is created for the first time and is', JSON.parse(data))
                      return JSON.parse(data)
                    })
                  })
                  .catch(error => console.log('error!', error));
          }
         })
         .catch(error => console.log('error!', error));
  }
  pushFinalTripToAsyncStorage = (tripObject) => {
   return AsyncStorage.getItem('tripsArray')
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            let clonedArray = json.slice()
            //clono el arreglo que me llega, y le pusheo el tripObject que tengo, 
            // console.log('el array, antes de pushearle algo es', clonedArray)
            
            // valido que si ya existe, no lo pusheo y corto ahi
            for (var i = 0; i < clonedArray.length; i++) {
              if(clonedArray[i].id === tripObject.id) {
                return null
              }
            }

            clonedArray.push(tripObject)
            // console.log('finalArray es', clonedArray)
            return AsyncStorage.setItem('tripsArray', JSON.stringify(clonedArray))
          }
         })
         .then(json => AsyncStorage.getItem('tripsArray'))
         .then(req => JSON.parse(req))
         .then(data => {
                      console.log('se pusheo al arreglo, y el arreglo final que queda guardado en async storage es', data)
                      return data
                    })
         .catch(error => console.log('error!', error)); 
  }
  // requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         'title': 'Ubicación',
  //         'message': 'Necesitamos poder acceder a tu ubicación para continuar con la aplicación'
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       this.setState({
  //         permission: true
  //       })
  //     } else {
  //       this.setState({
  //         permission: false
  //       })
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }
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
    this.setState({
      showColor: false
    })
  }
  getTripWithOrigin = (address) => {
    // cuando hago la busqueda, scrolleo arriba de todo
    this.scroll.props.scrollToPosition(0, 0)

    // aca entra una vez que el usuario escribio el origen, y busca todos los posibles destinos

    // remuevo el listener del keyboard una vez que busco, por las dudas que sino se dispara cuando escondo el keyboard en destinations tambien
    this.removeKeyboardEventListener()

    // con la string de la address, busco el id de esa address en el arreglo de origins
    let selectedTripObject = this.state.origins && this.state.origins.find(origin => origin.address.toLowerCase().trim() === address.toLowerCase().trim());

    selectedTripObject && 
      this.getConnectionInfo()
        .then(connectionInfo => {
          if (connectionInfo === 'none') {
            // no hay conexion y entra  a este if
            console.log('no hay conexion y entra a este if en el segundo paso', connectionInfo)
            let asyncStorageTripsArray = this.state.asyncStorageTripsArray
            
            let arrayDestinations = asyncStorageTripsArray.filter(trip => trip.originId === selectedTripObject.id)
            
            console.log('arrayDestinations', arrayDestinations)

            this.setState({destinations: arrayDestinations})
            return null
          }
          return this.props.getTripsWithOriginRequest(selectedTripObject.id)
        })
        .then(trips => {
          if(trips) {
            console.log('Segundo paso, get trip with Origin, el origin seleccionado es', selectedTripObject)
            console.log('Segundo paso, todas las posibles trips son, con sus respectivos destinations y origins', this.props.possibleDestinations.data)

            this.setState({destinations: this.props.possibleDestinations.data})
          }
        })
  }
  getSelectedTripWithOriginAndDestination = (address) => {
    // cuando hago la busqueda, scrolleo arriba de todo
    this.scroll.props.scrollToPosition(0, 0)
    // una vez que tengo el origen y el destino que quiere, filtro para conseguir el trip al cual voy a navegar
    let finalTripObject = this.state.destinations && this.state.destinations.find(trip => trip.destination.address.toLowerCase().trim() === address.toLowerCase().trim());

    console.log('finalTripObject is', finalTripObject)

    // una vez que tengo el trip seleccionado y puesto en el store, navego a la pantalla principal
/*    finalTripObject && this.props.getTripRequest(finalTripObject.id)
      .then((data)=> this.props.navigation.navigate('BottomTabs'))
*/


    finalTripObject && 
    this.getConnectionInfo()
      .then(connectionInfo => {
        if (connectionInfo === 'none') {
          // no hay conexion y entra  a este if
          console.log('no hay conexion y entra a este if en el tercer paso', connectionInfo)
          this.props.grabDataFromAsyncStorage(finalTripObject)
          console.log('this.props.skyspotsArrayForMap sacado del async storage es', this.props.skyspotsArrayForMap)
          this.props.navigation.navigate('BottomTabs',  {getBackFromChildComponentAndUpdate: this.getBackFromChildComponentAndUpdate})
          return null
        }

        if(this.state.permission) {
          return this.props.getTripRequest(finalTripObject.id)
        }
      })
      .then(trip => {
        if(trip) {
          console.log('Tercer paso, getSelectedTripWithOriginAndDestination, el destination seleccionado es', address)
          console.log('Tercer paso, el final trip seleccionado es', this.props.selectedTrip.data)
          console.log('Tercer paso, el array final de skyspots del trip seleccionado es', this.props.skyspotsArrayForMap)

          return this.pushFinalTripToAsyncStorage(this.props.selectedTrip.data)
            .then(data => {
            console.log('lo que llega del pushFinalTripToAsyncStorage es', data)
            this.props.navigation.navigate('BottomTabs', {getBackFromChildComponentAndUpdate: this.getBackFromChildComponentAndUpdate})
            }) 
        }

      })

  }
  findOrigin(query) {
    if (query === '') {
      return [];
    }

    const { origins } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return origins && origins.filter(origin => origin.address.search(regex) >= 0);
  }
  findDestination(query2) {
    if (query2 === '') {
      return [];
    }

    const { destinations } = this.state;
    const regex = new RegExp(`${query2.trim()}`, 'i');
    return destinations && destinations.filter(trip => trip.destination.address.search(regex) >= 0);
  }
  render() {console.log('la informacion del origen', origins)
    const { query, query2 } = this.state;
    const origins = this.findOrigin(query);
    const destinations = this.findDestination(query2);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
              <KeyboardAwareScrollView 
                contentContainerStyle={{flex: 1, backgroundColor: "rgb(64,76,155)"}}
                enableOnAndroid={true}
                innerRef={ref => {this.scroll = ref}}
              >
     <View style={s.containerBig}>
    
<ImageBackground source={this.state.showColor ? null : require('../../assets/aire_1242x2436.jpg')} style={{width: '100%', height: '100%'}}>

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
            listStyle={{backgroundColor: this.state.showColor ? "rgb(64,76,155)" : 'transparent', borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            data={origins && origins.length === 1 && comp(query, origins[0].address) ? [] : origins}
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
                  onFocus={()=> {
                    this.changeStateBackGround()
                    this.addKeyboardEventListener()
                  }}
                />
                <TouchableOpacity onPress={()=> console.log('test')} style={{flex: 0.15, justifyContent: "center", paddingRight: 10}}>
                  <Image  source={require('../../assets/lupita/lupita.png')} />
                </TouchableOpacity>
              </View>
            )}
            />
        </View>
        
        {this.props.tripsFetching ? <View><ActivityIndicator size="large" color='rgb(188,224,253)' /></View> : 
       <View style={s.autocompleteContainerDestino}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={{}}
            listStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            data={destinations && destinations.length === 1 && comp(query2, destinations[0].destination.address) ? [] : destinations}
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
                onFocus={()=> {
                    this.changeStateBackGround()
                  }}
              />
              <TouchableOpacity onPress={()=> {
                  this.state.query2 && this.getSelectedTripWithOriginAndDestination(this.state.query2)
                }} 
                style={{flex: 0.15, justifyContent: "center", paddingRight: 10}}
              >
                <Image  source={require('../../assets/lupita/lupita.png')} />
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
    height: deviceHeight,
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
    fontFamily: 'HouschkaRoundedAlt',
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
    marginHorizontal: 16,
    marginTop: 4
  },
  textInputStyle: {
    padding: 16,
    fontFamily: 'HouschkaRoundedAlt',
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
    fontFamily: 'HouschkaRoundedAlt',
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
    fontFamily: 'HouschkaRoundedAlt',
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