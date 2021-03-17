import React, {Component,Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Alert,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Axios from 'axios';
import BottomNavigator from '../../../router/BottomNavigator';
import styles from './indexCss';
import Search from '../.././../assets/icon/search.png';
import Spinner from 'react-native-loading-spinner-overlay';
import healthfood from '../../../assets/homePage/8.png';
import stang from '../../../assets/homePage/9.png';
import earth from '../../../assets/homePage/10.png';
import house from '../../../assets/homePage/12.png';
import food from '../../../assets/homePage/13.png';
import yoga from '../../../assets/homePage/15.png';
import jim from '../../../assets/homePage/16.png';
import coffie from '../../../assets/homePage/18.png';
import heart from '../../../assets/homePage/19.png';
import SearchInput, {createFilter} from 'react-native-search-filter';

import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage';
import {GetAllCategory,loginToken,MyNotificationCount,Logout} from '../../../Api/afterAuth';

import FastImage from 'react-native-fast-image';
const KEYS_TO_FILTERS = ['category_name'];

import BellIcon from '../../../assets/icon/bell.png'

import Geolocation from '@react-native-community/geolocation';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ưserDetails: {},
      isDetailsFetched: false,

      token: '',
      categoryData: [],
      category_id: 2,

      isBodyLoaded: false,
      isSpinner: true,  
      
      searchTerm: '',

      notificationCountValue:0,

      animating: true,

      isCurrenetComponentRefreshing:false,

      currentLongitude: 'unknown',//Initial Longitude
      currentLatitude: 'unknown',//Initial Latitude
    };
  }


  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  closeActivityIndicator = () => setTimeout(() => this.setState({  
    animating: false }), 6000)  

//  just test for current lat long........

 async callLocation(that){
  //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
          
       },
       (error) => console.log(error.message),
       { timeout: 200000, maximumAge: 10000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
        // console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
       that.setState({ currentLongitude:currentLongitude });
       //Setting state Longitude to re re-render the Longitude Text
       that.setState({ currentLatitude:currentLatitude });
       //Setting state Latitude to re re-render the Longitude Text


       
            AsyncStorage.setItem("currentLatitude",JSON.stringify(this.state.currentLatitude));

     AsyncStorage.setItem("currentLongitude",JSON.stringify(this.state.currentLongitude));

    //  console.log("getting inside the didmount",this.state.currentLatitude)



    });
 }



   
 componentDidMount = async () => {



  var that =this;
  //Checking for the permission just after component loaded
  if(Platform.OS === 'ios'){
    this.callLocation(that);
  }else{
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          that.callLocation(that);
        } else {
          console.log("Permission Denied");
        }
      } catch (err) {
        console.log("err",err);
        console.warn(err)
      }
    }
    requestLocationPermission();
  }    



  // this.fetchTokenData()
  // setInterval(() => {

  // }, 1000); 
  
    setInterval(() => {
      this.fetchNotificationCount()  
  
    }, 5000);
    
 

  this.closeActivityIndicator()  
  const token = await AsyncStorage.getItem('token');
  const TokenValue = JSON.parse(token);

  // Alert.alert("Message","getting alert !",TokenValue)
  // console.log("getting token here-----------",token, TokenValue)

  setTimeout(() => {
    this.fetchCategoryData()
    }, 300,()=>{
      this.forceUpdate()
    },200);
    
    // setInterval(() => {
    //   this.fetchCategoryData()
    // }, 1000);

  

  // this.advertisement_by_categoryFunction()
  // this.getIndividualHospital_Details()

  const user_id = await AsyncStorage.getItem('user_id');



  BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
};



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );

    Geolocation.clearWatch(this.watchID);

  }
  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      console.log('getting inside the if conditin--------------');
      return true;
    } else {
      console.log('getting inside the else conditin---------------');
      Alert.alert(
        'Exit App',
        'Do you want to Exit..',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  };






  LogoutFunction = async () => {
    const LogoutResponse = await Logout();
    
    if(LogoutResponse.result === true) {
        // console.log("getting logout response---------------",LogoutResponse.response)
        await AsyncStorage.setItem('userLoggedIn','false')
        let keys = ['token'];
        AsyncStorage.multiRemove(keys)
        Alert.alert("Message","Your Session has been expired!")
        this.props.navigation.navigate("login")            
        // Alert.alert("Message","Logout Sucessfully !")
    }
    else{
        // console.log("getting error on logout -------------",LogoutResponse.error)
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };



  fetchCategoryData = async () => {
    const GetCategoryListResponse = await GetAllCategory();
    if (GetCategoryListResponse.result == true) {
      if(GetCategoryListResponse.response.status == true){
        var categoryData = GetCategoryListResponse.response.categories;
        // console.log("getting category ----------",categoryData)
        this.setState({isBodyLoaded: true, isSpinner: false, categoryData,isCurrenetComponentRefreshing:false,});
      }
      else{
        this.setState({isBodyLoaded: false,isSpinner: false }, () => {
          // this.LogoutFunction();
        })
      }
     }
      
    else{
           // console.log("---------------------------------------------",GetCategoryListResponse.error)
    }
  };

 fetchNotificationCount = async() => {
    const GetNotificationCount = await MyNotificationCount();
    if(GetNotificationCount.result === true){
      var notificationCountValue = GetNotificationCount.response.notification_count;
      // console.log("getting here or not for last time testing-------------",notificationCountValue)
      this.setState({isBodyLoaded: true, isSpinner: false, notificationCountValue,isCurrenetComponentRefreshing:false,});
    }
    else{
      this.setState({isBodyLoaded: true, isSpinner: false});
    } 
 }







  render() {
    const {categoryData,animating} = this.state;
    // console.log("gettin in side the render method------------",this.state.categoryData)

    // console.log("getting inside the current lat long-------------",this.state.currentLatitude,"-------------",this.state.currentLongitude)

    const filteredCategory = categoryData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
         {/* <ActivityIndicator  animating = {animating} size="large" color="#ff0000" />   */}
        <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
          backgroundColor="#B87548"
          translucent={true}
        />
        <Spinner visible={this.state.isSpinner} 
        />
        <View style={styles.header}>

          <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0,width:'96%',height:90,alignItems:'center'}}>
          <Text style={styles.headerTxt}>What are you looking for?</Text>
                          
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:20}}>
                  
                  <Image source={BellIcon } style={{height:35,width:35,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                    {
                      this.state.notificationCountValue > 0 ?
                      <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-15,marginTop:12,marginStart:3,righ:-20,bottom:-1}}></Badge>
                      : null
                    }                      
                  </View>
                  </TouchableOpacity> 

         </View>
       
          <View style={styles.searchButton}>
            <Image source={Search} style={styles.headertxtInputImg} />
        
            <TextInput 
                onFocus={()=>{ this.props.navigation.navigate("alladvertisement")}}
              style={{
                borderColor: 'red',
                borderWidth: 0,
                width: SCREEN_WIDTH * 0.8,
                marginStart: -10,
                fontFamily:'Montserrat-Regular'
              }}
              placeholder="Find a place..."
            />
          </View>
        </View>

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
                      <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchCategoryData();
                      },100)  }} />
                    }>

          {
            this.state.isBodyLoaded === true ?
              <Fragment>
                   <View style={styles.contentView}>            
                        { this.state.categoryData.length > 0 
                          ? filteredCategory.map((singleCategory, index) => {
                              return (
                                <View key={index}>
                                  <TouchableOpacity
                                    style={styles.categoryView}
                                    onPress={() => {
                                      this.props.navigation.navigate('workout', {
                                        headerText: singleCategory.category_name,
                                        category_id: singleCategory.category_id,                           
                                      });
                                    }}>
                                    <FastImage
                                      resizeMode="stretch"
                                      source={{
                                        uri: `https://www.thelyfe.fr/${singleCategory.category_image}`,
                                      }}
                                      style={styles.ImgStyle}
                                    />
                                  </TouchableOpacity>
                                </View>
                              );
                            })
                          :  <View style={{alignSelf:'center',marginTop:300,marginBottom:200}}>
                          <Text style={{textAlign:'center',fontWeight:'700',fontSize:20,color:'#000000'}}>No item Found! </Text>
                          </View>                          
                          }
                        </View>
              </Fragment>
            :   <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                  <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading</Text>
              </View>

          }
         
        </ScrollView>
        <BottomNavigator
          currentRoute={'Home'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}