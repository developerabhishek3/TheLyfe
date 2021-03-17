/*This is an Example of React Native Map*/
import React, { Fragment } from 'react';
import { StyleSheet, Text, View , TextInput,BackHandler,Dimensions,TouchableOpacity,Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import back from '../../../../assets/icon/back.png'
import Spinner from 'react-native-loading-spinner-overlay';
 import styless from './index2'
 const SCREEN_HEIGHT = Dimensions.get('window').height;
 const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state={    
      isBodyLoaded: false,
      isSpinner: true,  
    }
  }




  onRegionChange(region) {
    this.setState({ region });
  }


  
  findLocation = () => { 
    Geocoder.init("AIzaSyA9x-ScoEoclUac055WF-8cj1ArxLxn7yQ"); 

      Geocoder.from("Colosseum") 
    .then(json => {
      var location = json.results[0].geometry.location
      console.log("--------------inside the function---------",location);
      })
      .catch(error => console.warn(error));

      Geocoder.from(41.89, 12.49)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
            console.log("--------------inside the function---------",addressComponent)
        })
        .catch(error => console.warn(error));
  }
   


  
         
  

  
  componentDidMount() {   
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    const headerTxt = this.props.navigation.getParam('headerTxt');
    console.log("getting value here-----------",headerTxt)
    const lat_longValue = this.props.navigation.getParam("lat_long")
    // console.log("getting long lat value inside did mount---------",lat_longValue)


    // var values = lat_longValue.split('-');
    // var latValue = values[0];
    // var longValue = values[1];  
   
    // this.setState({latValue,longValue,isSpinner:false},() => this.forceUpdate())  

    // console.log("getting inside the setstate----------",lat,"----------",long)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }
  
  handleBackButton = (nav) => {
    if (!nav.isFocused()) {      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };


  render() {
    const headerTxt = this.props.navigation.getParam('headerTxt');


    const LatitudeValue = this.props.navigation.getParam("latValue")
    const LongitudeValue = this.props.navigation.getParam("longValue")
    var LetValue = parseFloat(LatitudeValue)
    var longValue = parseFloat(LongitudeValue)
    console.log("getting latitude and longitude-----------",LatitudeValue,"-------",LongitudeValue)

    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    return (                                  
            <View style={styles.container}>    
                          
                      <View style={{height:SCREEN_HEIGHT/9,justifyContent:'space-between',backgroundColor:'#c29a74',width:'100%',borderWidth:0,flexDirection:'row',    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,}}>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.goBack()}}
                            >
                                <Image source={back} style={{height:20,width:20,marginTop:33,marginStart:15}} />
                            </TouchableOpacity>
                          <Text style={{fontSize:20,color:"#FFFFFF",marginTop:30,fontWeight:'700'}}>{headerTxt}</Text>
                          <Text style={{fontSize:20,color:"#FFFFFF",marginTop:30}}>      </Text>
                        </View>
                    <View style={{height:SCREEN_HEIGHT}} >
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: LetValue,
                        longitude: longValue,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      // customMapStyle={mapStyle}
                    >
                      <Marker
                        draggable
                        coordinate={{
                          latitude: LetValue,
                          longitude: longValue,
                        }}
                        // onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                      />
                    </MapView>
                    </View>
                  </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
});
