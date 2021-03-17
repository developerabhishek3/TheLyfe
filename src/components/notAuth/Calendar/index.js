import React, {Component} from 'react';
import {View, Text, ScrollView,StatusBar,TouchableOpacity,Image,BackHandler,Dimensions,RefreshControl} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import back from '../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
import {  GetFutureAgenda,MyNotificationCount,loginToken} from '../../../Api/afterAuth';
import dateTimeIcon from '../../../assets/icon/46.png'
const SCREEN_HEIGHT = Dimensions.get('window').height;
import LocationIcon from '../../../assets/icon/29.png';
import statusIcon from '../../../assets/icon/47.png'
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
      FutureAgendaData: [],
      category_id: 2,

      isBodyLoaded: false,
      isSpinner: true,
      notificationCountValue:0,
      searchTerm: '',
      isCurrenetComponentRefreshing:false,
    };
  }

  componentDidMount = async() => {
    this.fetchTokenData()
    this.fetchFutureAgendaData()
    setInterval(() => {
      this.fetchNotificationCount()  
    }, 5000);
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));    
    
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
}
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
handleBackButton=(nav)=> {
    
    if(!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
      return false;
    }else{
      nav.navigate("Home");
      return true;
    }
}



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



fetchFutureAgendaData = async () => {
  const FutureAgendaDataResponse = await GetFutureAgenda();
  if (FutureAgendaDataResponse.result === true) {
    console.log("getting categoy response here-------------------",FutureAgendaDataResponse.response)
    var FutureAgendaData = FutureAgendaDataResponse.response.reservation;
  }
  this.setState({isBodyLoaded: true, isSpinner: false, FutureAgendaData,isCurrenetComponentRefreshing:false,});
  // console.log("getting categoryData response----------------",PendingAppointmentData)
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
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>          Agenda</Text>
         
             
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:15,marginRight:12}}>
                  
                  <Image source={BellIcon } style={{height:30,width:30,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                  {
                this.state.notificationCountValue > 0 ?
                  <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-15,marginTop:12,marginStart:3,righ:-20,bottom:-1}}/>
                  :
                  null}
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
              onPress={()=>{this.props.navigation.navigate("nextappointment")}}
              
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
                }}>Past</Text>
              </TouchableOpacity>                                      
              <TouchableOpacity   style={{borderColor:'red',height:40,justifyContent:'center',width:'45%', borderWidth:0,borderRadius:50,backgroundColor:'#c29a74',margin:4,marginStart:5,marginEnd:5}}>
                <Text style={styles.headerBtnText}>Next Appointments</Text>
              </TouchableOpacity>                             
        </View>

        {
          this.state.isBodyLoaded == true ?

        

 <ScrollView 
 showsVerticalScrollIndicator={false}
 refreshControl={
               <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                 this.fetchFutureAgendaData();
               },100)  }} />
             }>
          <View style={{flexWrap:'wrap',alignContent:'center',borderColor:'blue',borderWidth:0,width:SCREEN_WIDTH,marginBottom:40}} >            
            {
              this.state.FutureAgendaData.length >  0 ? 
            <View>
            {this.state.FutureAgendaData.map((singleApproveData) => {
                  return(
                    <View style={{borderColor:'red',borderWidth:0,width: SCREEN_WIDTH * 0.95,
                    height:SCREEN_HEIGHT/6.5,margin:6,borderRadius:7,backgroundColor:'#FFFFFF',}}> 
                     <TouchableOpacity
                      onPress={() => {
                      this.props.navigation.navigate('addetail', {
                        appointment_id:singleApproveData.appointment_id,
                        Id: singleApproveData.ad_id,
                        bgImg:singleApproveData.ad_image,
                        categoryName:singleApproveData.category_name,
                        companyName:singleApproveData.merchant_company_name,                        
                        requestDate:singleApproveData.reserve_date,
                        reschedule_date:singleApproveData.reschedule_date,

                        reschedule_status:singleApproveData.reschedule_status,
                        reserve_time:singleApproveData.reserve_time,
                        reschedule_time:singleApproveData.reschedule_time,

                        status:singleApproveData.reserve_status
                      });
                    }}>
                        <View style={{flexDirection:'row',margin:2,}}>
                            <View style={{borderWidth:0,  justifyContent:'center',
                            height:SCREEN_HEIGHT/6.7,
                                alignItems:'center'}}>
                            <FastImage source={{
                                uri: `https://www.thelyfe.fr/${singleApproveData.ad_image}`,
                              }} 
                              style={{
                                height: SCREEN_HEIGHT/9,
                                width: SCREEN_WIDTH/5,
                                borderRadius: 10,
                                margin: 5,
                                
                              }}
                          />
                          </View>
                          <View style={{flexDirection:'column',margin:10,}}>
                          <Text style={{fontSize:14,fontWeight:'700',margin:1,}}>{singleApproveData.merchant_company_name}</Text>
                          <View>
                          <View style={{flexDirection:'row',borderWidth:0,marginEnd:10,width:SCREEN_WIDTH*0.6}}>
                              <FastImage style={{height:15,width:15,margin:3,marginEnd:3}} source={LocationIcon} />
                            <Text  numberOfLines={1} style={{fontSize: 10, fontWeight: '600', margin: 3,}}>{singleApproveData.location}</Text>
                          </View>
                         {
                          singleApproveData.reserve_status != `Reschedule` ? 
                          <View style={{flexDirection:'row',margin:1}}>
                             <FastImage source={dateTimeIcon} style={{width:16,height:16,margin:1,borderWidth:0}} />
                          <Text
                          style={{fontSize: 10, fontWeight: '600', paddingStart:4,margin: 1,}}>
                          {singleApproveData.reserve_date}
                          </Text>
                          <Text
                          style={{fontSize: 10, fontWeight: '600', paddingStart:4,margin: 1,}}>
                          {singleApproveData.reserve_time}
                          </Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',margin:1}}>
                           <FastImage source={dateTimeIcon} style={{width:16,height:16,margin:1}} />
                        <Text
                        style={{fontSize: 10, fontWeight: '600', margin: 1,paddingStart:4,}}>
                        {singleApproveData.reschedule_date}
                        </Text>
                        <Text
                        style={{fontSize: 10, fontWeight: '600', margin: 1,paddingStart:4,}}>
                        {singleApproveData.reschedule_time}
                        </Text>
                        </View>
                        }
                        </View>  
                        {
                          singleApproveData.reserve_status != `Reschedule` ?   
                          <View style={{flexDirection:'row',margin:1}}>
                          <FastImage  source={statusIcon} style={{width:14,height:14,margin:1}}/>                       
                          <Text
                          style={{fontSize: 11, fontWeight: '700',paddingStart:4,color:'#B87548', margin: 1,}}>
                          {singleApproveData.reserve_status}
                          </Text>
                          </View>
                          :
                          <View style={{flexDirection:'row',margin:1}}>
                             <FastImage  source={statusIcon} style={{width:14,height:14,margin:1}}/>
                            <Text
                            style={{fontSize: 11, fontWeight: '700',paddingStart:4, margin: 1,color:'#B87548',}}>
                            {singleApproveData.reserve_status}
                            </Text>
                          {
                            singleApproveData.reschedule_status === `Waiting` ?
                            <Text
                            style={{fontSize: 11, fontWeight: '700', margin: 1,paddingStart:4,color:'red',}}>
                            ({singleApproveData.reschedule_status})
                            </Text>
                            :
                            <Text
                            style={{fontSize: 11, fontWeight: '700', margin: 1,paddingStart:4,color:'#B87548',}}>
                            ({singleApproveData.reschedule_status})
                            </Text>
                          }
                            {/* <Text
                            style={{fontSize: 11, fontWeight: '700', margin: 1,paddingStart:4,color:'#B87548',}}>
                            ({singleApproveData.reschedule_status})
                            </Text> */}
                          </View>
                        }
                          {/*                           
                            <Text style={{fontSize:13,fontWeight:'600',margin:3}}>{singleApproveData.request_date}</Text>
                            <Text style={{fontSize:13,fontWeight:'600',margin:3}}>{singleApproveData.reserve_status}</Text> */}
                          </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                  )
              })
            }
           </View>
              
              : <View style={{alignSelf:'center',marginTop:200,marginBottom:200}}>
               <Text style={{fontWeight:'700',fontSize:20,color:'#000000'}}>No Appointments found!</Text>
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
