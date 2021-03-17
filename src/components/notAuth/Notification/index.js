import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  SectionList,
  Dimensions,
  BackHandler,
  RefreshControl,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigator from '../../../router/BottomNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import favorite from '../../../assets/icon/37.png';
import unFavorite from '../../../assets/icon/36.png';

import {CheckBox, Overlay, Button} from 'react-native-elements';

import FastImage from 'react-native-fast-image';
import styles from './indexCss';
import back from '../../../assets/icon/back.png';
import LocationIcon from '../../../assets/icon/29.png';
import TimeAgo from 'react-native-timeago';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
loginToken,
  MyNotification

} from '../../../Api/afterAuth';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryWithAdvertisement: [],
      category: [],
      MyNotificationData: [],
      isBodyLoaded: false,
      isSpinner: true,
      ad_id: 0,
      isCurrenetComponentRefreshing:false,
    };
  }


  componentDidMount = async () => {
    this.fetchTokenData()
    this.fetchMyNotification()
         
    this.fetchTimeStamp()

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  };


  fetchMyNotification = async () => {
    const GetNotificationResponse = await MyNotification();
    if (GetNotificationResponse.result === true) {
        console.log("getting response here--------------",GetNotificationResponse)
        var MyNotificationData = GetNotificationResponse.response.notification_list;


        this.setState({isBodyLoaded: true, isSpinner: false, MyNotificationData,isCurrenetComponentRefreshing:false,});           
    }
    else{
      console.log("---------------------------------------------",GetCategoryListResponse.error)
    }
  };

  fetchTokenData = async () => {
    const LoginTokenResponse = await loginToken();
    if (LoginTokenResponse.result == true) {
      if (LoginTokenResponse.response != "") {
        let keys = ['token'];
        AsyncStorage.multiRemove(keys)
        await AsyncStorage.setItem("token", JSON.stringify(LoginTokenResponse.response.my_token));
        console.log("getting inside the follow condition------------")

        // this.props.navigation.navigate('Home');
      }
      else {
        this.props.navigation.navigate("login")
        console.log("getting inside the else constion condition------------")
      }
      console.log("gettin response here-----------", LoginTokenResponse.response)
      // await AsyncStorage.setItem("token",JSON.stringify(LoginTokenResponse.response));
    }
    else {
      console.log("---------------------------------------------", LoginTokenResponse.error)
    }
  };
  fetchTimeStamp = async() => {
    console.log("getting inside the time zone----------")
    console.log
    this.state.MyNotificationData.map((singleNotification)=>{
      console.log("I am here-------------------------------------------")
      var newTime =  singleNotification.create_date,
      dArr = newTime.split('-'),
      ts = new Date(dArr[1] + "-" + dArr[0] + "-" + dArr[2]).getTime();
      console.log("getting time zone here-----------",ts)
    })
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };

  render() {
    const {categoryWithAdvertisement, category, categoryData} = this.state;
    console.log("getting inside the render method----------",this.state.MyNotificationData)
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        />
           <Spinner visible={this.state.isSpinner} 
        />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifications</Text>
          <Text style={styles.headerText}>   </Text>
        </View>
            <View style={{flex:2,borderWidth:0,borderColor:'red',width:'96%',margin:7}}>
                <ScrollView>

              {
                 this.state.isBodyLoaded == true ?
                 <Fragment>
                 {
                   this.state.MyNotificationData.length > 0  ?
                   <Fragment>
                   {
                       this.state.MyNotificationData.map((singleNotification)=>{
                           console.log("getting result here----------------",singleNotification)
                           return(
                               <View style={{borderRadius:10,width:'94%',margin:5,alignSelf:'center',borderWidth:0,backgroundColor:'#FFFFFF',}}>
                                       <View style={{flexDirection:'row',margin:7}}>   
                                       { 
                                       
                                       singleNotification.is_seen == 0  ?
                                                                                                       
                                       <Text style={{                                               
                                           color:'#000000',
                                           fontWeight:'700',
                                           padding:0,
                                           fontSize:14,
                                           color: '#B87548',
                                            
                                   }} >{singleNotification.message}</Text>
                                                                      
                                           :                                           
                                           <Text style={{                                               
                                               color:'#000000',
                                               fontWeight:'600',
                                               padding:0,
                                               fontSize:14,
                                               color: '#B87548',
                                                
                                       }} >{singleNotification.message}</Text>
                                 
   
                                   
                                   }   
                                   </View>                                                                  
                                         
   
   
   
   
   
                                       <View style={{flexDirection:'row',margin:7,justifyContent:'flex-end'}}>                                        
                                       {/* <Text style={{                                               
                                                   color:'#000000',
                                                   fontWeight:'600',
                                                   paddingStart:7,
                                                  
                                                    
                                           }} >Date :  </Text> */}
   
                                           
                                           <Text  style={{                                               
                                                   color:'#000000',
                                                   fontWeight:'600',
                                                   padding:0,
                                                   fontSize:10,
                                                   alignSelf:'flex-end',
                                                   color: '#B87548',
                                                    
                                           }} >{singleNotification.create_date}</Text>
                                       </View>
                               </View>
                           )
                       })
                   }
                   </Fragment>
   
   
  
                   : <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                   <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000',justifyContent:'center'}}>Currently No Notificatoins !</Text>
                  </View>
                 }
   
                 </Fragment>


                 :<View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                 <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000',justifyContent:'center'}}>Loading !</Text>
                </View>
              }


              
         
                </ScrollView>
            </View>
     

      </View>
    );
  }
}
