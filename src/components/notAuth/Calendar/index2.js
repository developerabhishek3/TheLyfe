import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
  RefreshControl,
} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import back from '../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
import LocationIcon from '../../../assets/icon/29.png'
import dateTimeIcon from '../../../assets/icon/46.png'
import statusIcon from '../../../assets/icon/47.png'
import {GetMyPendingReservation, GetPastAgenda,MyNotificationCount,loginToken} from '../../../Api/afterAuth';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import styles from './indexCss';
import AsyncStorage from '@react-native-community/async-storage';
import BellIcon from '../../../assets/icon/bell.png'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import FastImage from 'react-native-fast-image';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ưserDetails: {},
      isDetailsFetched: false,

      token: '',
      PastAgendaData: [],
      category_id: 2,

      isBodyLoaded: false,
      isSpinner: true,
      searchTerm: '',
      notificationCountValue:0,
      isCurrenetComponentRefreshing:false,
    };
  }

  componentDidMount = async () => {
    this.fetchTokenData()
    setInterval(() => {
      this.fetchNotificationCount()  
    }, 5000);
    this.fetchPastAgendaData();
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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
      nav.navigate('Home');
      return true;
    }
  };

  fetchPastAgendaData = async () => {
    const PendingAppointmentResponse = await GetPastAgenda();
    if (PendingAppointmentResponse.result === true) {
      console.log("getting categoy response here-------------------",PendingAppointmentResponse.response)
      var PastAgendaData =
        PendingAppointmentResponse.response.reservation;
    }
    this.setState({
      isBodyLoaded: true,
      isSpinner: false,
      PastAgendaData,
      isCurrenetComponentRefreshing:false,
    });
    console.log("getting categoryData response----------------",PastAgendaData)
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
  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        <StatusBar
          barStyle="dark-content"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>          Agenda</Text>
       
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:15,marginEnd:12}}>
                  
                  <Image source={BellIcon } style={{height:30,width:30,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                  {
                this.state.notificationCountValue > 0 ?
                  <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-15,marginTop:12,marginStart:3,righ:-20,bottom:-1}}                  
                  // containerStyle={{ position: 'absolute', top: 0, right: -20 }}
                  />
                  :null}
                  </View>
                  </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: 'red',
            borderWidth: 0,
            width: '100%',
            marginStart: 10,
            marginEnd: 10,
            marginTop:6,
            flexDirection:'row',
            justifyContent:'space-around'
          }}>                            
            
              <TouchableOpacity   style={{borderColor:'red',height:40,justifyContent:'center',width:'45%', borderWidth:0,borderRadius:50,backgroundColor:'#c29a74',margin:4,marginStart:5,marginEnd:5}}>
                <Text style={styles.headerBtnText}>Past</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                borderColor: '#696969',
                height: 40,
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 50,
                margin: 4,
                marginStart: 2,
                marginEnd: 2,
                width:'45%'  
              }}
              onPress={()=>{this.props.navigation.navigate("Calender")}}
              >
                <Text  style={{
                  color: '#808080',
                  fontSize: 14,
                  fontWeight: '700',
                  marginStart: 10,
                  marginEnd: 10,
                  textAlign: 'center',
                  borderWidth: 0,
                  margin: 7,
                }}>Next Appointments</Text>
              </TouchableOpacity>
        
        </View>
        {
          this.state.isBodyLoaded == true ?         

            <ScrollView  
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                            this.fetchPastAgendaData();
                          },100)  }} />
                        }>
          <View
            style={{
              flexWrap: 'wrap',
              alignContent: 'center',
              borderColor: 'blue',
              borderWidth: 0,
              width: SCREEN_WIDTH,
              marginBottom:40
            }}>
            {/* <Text>Abhshek</Text> */}
            {
              this.state.PastAgendaData.length > 0 ?  
              <View>
              {this.state.PastAgendaData.map((singlePendingData,index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderColor: 'red',
                      borderWidth: 0,
                      margin: 6,
                      borderRadius: 7,
                      backgroundColor: '#FFFFFF',
                      width: SCREEN_WIDTH * 0.95,
                      height:SCREEN_HEIGHT/7
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('addetail', {
                          appointment_id:singlePendingData.appointment_id,
                          Id: singlePendingData.ad_id,
                          bgImg:singlePendingData.ad_image,
                          categoryName:singlePendingData.category_name,
                          companyName:singlePendingData.merchant_company_name,
                          requestDate:singlePendingData.reserve_date,
                          reschedule_date:singlePendingData.reschedule_date,
  
                          reserve_time:singlePendingData.reserve_time,
                          reschedule_time:singlePendingData.reschedule_time,
  
                          reschedule_status:singlePendingData.reschedule_status,
  
                          status:singlePendingData.reserve_status
                        });
                      }}>
                      <View style={{flexDirection: 'row', margin: 1}}>
                      <View style={{borderWidth:0,  justifyContent:'center',
                            height:SCREEN_HEIGHT/7,
                                alignItems:'center'}}>
                        <FastImage
                          source={{
                            uri: `https://www.thelyfe.fr/${singlePendingData.ad_image}`,
                          }}
                          style={{
                            height: SCREEN_HEIGHT/9,
                            width: SCREEN_WIDTH/5,
                            borderRadius: 10,
                            margin: 5,
                          }}
                        />
                        </View>
                        <View style={{flexDirection: 'column', margin: 3,justifyContent:'center',borderWidth:0,marginTop:3}}>
                          <Text
                            style={{fontSize: 13, fontWeight: '700', margin: 1,}}>
                            {singlePendingData.merchant_company_name}
                          </Text>
                          <View style={{flexDirection:'row',borderWidth:0,marginEnd:10,width:SCREEN_WIDTH*0.6}}>
                              <FastImage style={{height:14,width:14,margin:3,marginEnd:3}} source={LocationIcon} />
                            <Text  numberOfLines={1} style={{fontSize: 10, fontWeight: '600', margin: 3,}}>{singlePendingData.location}</Text>
                          </View>
                          <View>
                          {
                            singlePendingData.reserve_status != `Reschedule` ? 
                            <View style={{flexDirection:'row',margin:1}}>
                            <FastImage source={dateTimeIcon} style={{width:14,height:14,margin:1}} />
                            <Text
                            style={{fontSize: 10, fontWeight: '600', margin: 1,marginStart:7,}}>
                            {singlePendingData.reserve_date}
                            </Text>
                            <Text
                            style={{fontSize: 10, fontWeight: '600', margin: 1,marginStart:7,}}>
                            {singlePendingData.reserve_time}
                            </Text>
                          </View>
                          :
                          <View style={{flexDirection:'row',margin:1}}>
                            <FastImage source={dateTimeIcon} style={{width:14,height:14,margin:1}} />
                          <Text
                          style={{fontSize: 10, fontWeight: '600', margin: 1,}}>
                          {singlePendingData.reschedule_date}
                          </Text>
                          <Text
                          style={{fontSize: 10, fontWeight: '600', margin: 1,}}>
                          {singlePendingData.reschedule_time}
                          </Text>
                          </View>
                          }
                          </View>  
                          {
                            singlePendingData.reserve_status != `Reschedule` ? 
                            <View style={{flexDirection:'row',margin:1}}>
                              <FastImage  source={statusIcon} style={{width:14,height:14,margin:1}}/>
                            <Text
                             style={{fontSize: 11, fontWeight: '700',color:'#B87548', margin: 1,}}>
                            {singlePendingData.reserve_status}
                            </Text>
                            </View>
                            :
                            <View style={{flexDirection:'row',margin:1}}>
                                <FastImage  source={statusIcon} style={{width:14,height:14,margin:1}}/>
                              <Text
                             style={{fontSize: 11, fontWeight: '700',color:'#B87548', margin: 1,}}>
                              {singlePendingData.reserve_status}
                              </Text>
                              <Text
                              style={{fontSize: 11, fontWeight: '700',color:'#B87548', margin: 1,}}>
                              ({singlePendingData.reschedule_status})
                              </Text>
                            </View>

                          }                          
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
              </View>
              
              :  <View style={{alignSelf:'center',marginTop:200,marginBottom:200}}>
               <Text style={{textAlign:'center',fontWeight:'700',fontSize:20,color:'#000000'}}>No Appointments found!</Text>
                </View>
            }
           
          </View>
        </ScrollView>
            : <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
          <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading</Text>
          </View>
        }       
        <BottomNavigator
          currentRoute={'Calender'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}





















