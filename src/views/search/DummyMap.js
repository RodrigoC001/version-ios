import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  Alert
} from 'react-native';

import Mapbox from '@mapbox/react-native-mapbox-gl';
import geoViewport from '@mapbox/geo-viewport';
import Bubble from './Bubble';


// import smileyFaceGeoJSON from './smiley_face.json';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tripActions from "../../redux/actions/trips";

const mapStateToProps = state => ({
  fetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip,
  skyspotsArrayForMap: state.trips.skyspotsArrayForMap
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, tripActions), dispatch)
}

const IS_ANDROID = Platform.OS === 'android';
const MAPBOX_VECTOR_TILE_SIZE = 512;
const CENTER_COORD = [-58.3861497, -34.6111362];



async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Ubicación',
        'message': 'Necesitamos poder acceder a tu ubicación para continuar con la aplicación'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the geolocation")
    } else {
      console.log("geolocation permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

// MAPBOX CONFIG
Mapbox.setAccessToken('pk.eyJ1IjoibGF1dGFyb2dyYW5kZSIsImEiOiJjamtrNjFqMW8xbnVhM3BwYjdmZjczcXkyIn0._Gz0SnZDQIGeosDSbwFwMA');

const layerStyles = Mapbox.StyleSheet.create({
  background: {
    // backgroundPattern: gridPattern,
  },
/*  smileyFace: {
    fillAntialias: true,
    fillColor: 'white',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },*/
});


const icono = {
  selected: require('../../assets/skyspotseleccionado/skyspotseleccionado.png'),
  deselected: require('../../assets/mapa/mapa.png')
}

class MapBoxContainer extends Component<{}> {
  state = {
    isFetchingAndroidPermission: IS_ANDROID,
    isAndroidPermissionGranted: false,
    latitude: null,
    longitude: null,
    error: null,
    name: `test-${Date.now()}`,
    offlineRegion: null,
    offlineRegionStatus: null,   
  }
  async componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await Mapbox.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }
  componentWillUnmount() {
    console.log('entra al will unmount')
    // avoid setState warnings if we back out before we finishing downloading
    Mapbox.offlineManager.deletePack(this.state.name);
    Mapbox.offlineManager.unsubscribe('test');
  }
  componentDidMount() {
    requestCameraPermission()
      .then(()=> this.getCurrentLocation())

    console.log('state is', this.state)
    // console.log('this.props.selectedTrip.data.name', this.props.selectedTrip.data.name)
  }
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        console.log('error', error)
        this.setState({ error: error.message })
      },
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  selectAndDeselect = (id) => {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    var that = this
    
    for (var i = 0; i < skyspotsArrayForMap.length; i++) {
      that[skyspotsArrayForMap[i].id.toString()].props.onDeselected()
    }

    return this[id].props.onSelected()

  }
  onDidFinishLoadingStyle = async () => {
    console.log('entra al onDidFinishLoadingStyle')

    const { width, height } = Dimensions.get('window');
    const bounds = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    );

   /* const options = {
      name: this.state.name,
      styleURL: 'mapbox://styles/lautarogrande/cjl4qetsg5t072snrwgh08jaa',
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 4,
      maxZoom: 20,
    };*/

    const options = {
      name: this.state.name,
      styleURL: Mapbox.StyleURL.Street,
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 3,
      maxZoom: 20,
    };

    // start download
    Mapbox.offlineManager.createPack(options, this.onDownloadProgress);
  }

  onDownloadProgress = (offlineRegion, offlineRegionStatus) => {
    this.setState({
      name: offlineRegion.name,
      offlineRegion: offlineRegion,
      offlineRegionStatus: offlineRegionStatus,
    });
  }
  onResume = () => {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.resume();
    }
  }
  onPause = () => {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.pause();
    }
  }

  onStatusRequest = async () => {
    if (this.state.offlineRegion) {
      const offlineRegionStatus = await this.state.offlineRegion.status();
      Alert.alert('Estado del pedido: ', JSON.stringify(offlineRegionStatus, null, 2));
    }
  }
  _formatPercent = () => {
    if (!this.state.offlineRegionStatus) {
      return '0%';
    }
    return Math.round(this.state.offlineRegionStatus.percentage / 10) / 10;
  }
  _getRegionDownloadState = (downloadState) => {
    switch (downloadState) {
      case Mapbox.OfflinePackDownloadState.Active:
        return 'Activo';
      case Mapbox.OfflinePackDownloadState.Complete:
        return 'Completo';
      default:
        return 'Inactivo';
    }
  }
  renderAnnotation (id, coords) {    
    return (
      <Mapbox.PointAnnotation
        ref={(point) => {this[id] = point}}
        key={id}
        id={id}
        anchor={{ x: 0.9, y: 0.9 }}
        coordinate={coords}
        onSelected={()=> {
          // console.log('entra al selected')
          let newObj = {}
          newObj[id] = true
          this.setState(newObj)
        }}
        onDeselected ={()=> {
          // console.log('entra al deselected')
          let newObj = {}
          newObj[id] = false
          this.setState(newObj)
        }}
        >
        <TouchableOpacity onPress={() => this.selectAndDeselect(id)}>
          <Image source={!this.state[id] ? icono.deselected : icono.selected} />
        </TouchableOpacity>
        <Mapbox.Callout title='Test!' />
      </Mapbox.PointAnnotation>
    )
  }
  renderAnnotations () {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    const items = skyspotsArrayForMap.map(skyspot => {
      return this.renderAnnotation(skyspot.id.toString(), skyspot.coords)
    })

    return items
  }
  render() {

    const { offlineRegionStatus } = this.state;

    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <View style={sheet.matchParent}>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={'mapbox://styles/lautarogrande/cjl4qetsg5t072snrwgh08jaa'}
          zoomLevel={3}
          centerCoordinate={CENTER_COORD}
          style={styles.container}
          showUserLocation={true}
          onDidFinishLoadingMap={this.onDidFinishLoadingStyle}
        >
          {/*<Mapbox.VectorSource>
            <Mapbox.BackgroundLayer
              id="background"
              style={layerStyles.background}
            />
          </Mapbox.VectorSource>
*/}
{/*          <Mapbox.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
            <Mapbox.FillLayer
              id="smileyFaceFill"
              style={layerStyles.smileyFace}
            />
          </Mapbox.ShapeSource>*/}
         {/* {this.renderAnnotations()}*/}
        </Mapbox.MapView>

        {offlineRegionStatus !== null ? (
                  <Bubble>
                    <View style={{ flex: 1 }}>
                      <Text>
                        Download State:{' '}
                        {this._getRegionDownloadState(offlineRegionStatus.state)}
                      </Text>
                      <Text>Download Percent: {offlineRegionStatus.percentage}</Text>
                      <Text>
                        Completed Resource Count:{' '}
                        {offlineRegionStatus.completedResourceCount}
                      </Text>
                      <Text>
                        Completed Resource Size:{' '}
                        {offlineRegionStatus.completedResourceSize}
                      </Text>
                      <Text>
                        Completed Tile Count: {offlineRegionStatus.completedTileCount}
                      </Text>
                      <Text>
                        Required Resource Count:{' '}
                        {offlineRegionStatus.requiredResourceCount}
                      </Text>

                      <View style={styles.buttonCnt}>
                        <TouchableOpacity onPress={this.onResume}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Resume</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onStatusRequest}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Status</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onPause}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Pause</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Bubble>
                ) : null}

        <View style={styles.goBackContainer}>
          <TouchableOpacity onPress={()=> this.props.navigation.pop()}>
              <Image source={require('../../assets/atras/atras.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  goBackContainer: {
    flex: 1,
    left: 22,
    position: 'absolute',
    right: 0,
    top: 27,
    zIndex: 2
  },
  buttonCnt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'blue',
    padding: 8,
  },
  buttonTxt: {
    color: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBoxContainer);


// info

// https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/ShapeSource.md

// https://github.com/mapbox/react-native-mapbox-gl/tree/master/example/src/components