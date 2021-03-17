import React, { Component, version, Fragment } from 'react';
import {View,Text,ScrollView,Image,Alert,BackHandler, StatusBar,Dimensions} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import styles from './indexCss'
import profileImage from  '../../../assets/icon/profileImage.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import profile from '../../../assets/icon/profile.png'
import { Logout,UserProfile,MyNotificationCount, InstagramInfo,loginToken } from '../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import packageJson from '../../../../package.json';


import BellIcon from '../../../assets/icon/bell.png'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

export default class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            UserDetails:[],
            notificationCountValue:0,
            isBodyLoaded: false,
            isSpinner: true,
            instagramImage:'',
        }
    }

        // componentDidMount = async () => {
        //     setTimeout(() => {
        //         this.userProfileFunction();
        //       },200)  
        //     }


    LogoutFunction = async () => {
        const LogoutResponse = await Logout();
        
        if(LogoutResponse.result === true) {
            // console.log("getting logout response---------------",LogoutResponse.response)
            await AsyncStorage.setItem('userLoggedIn','false')
            let keys = ['token'];
            AsyncStorage.multiRemove(keys)
            this.props.navigation.navigate("login")            
            Alert.alert("Message","Logout Sucessfully !")
        }
        else{
            // console.log("getting error on logout -------------",LogoutResponse.error)
        }        
        // console.log("getting country response----------------",countryData.country_list)
      };


      userProfileFunction = async () => {
        const UserProfileResponse = await UserProfile();
        
        if(UserProfileResponse.result === true) {
            // console.log("getting logout response---------------",UserProfileResponse.response) 
            var UserDetails = UserProfileResponse.response.my_profile;

      

            // console.log("Getting Instagram NAme >>>>>>>>>>>>>>>>",InstagramName)

            

            this.setState({ isBodyLoaded: true,isSpinner: false,UserDetails})
                    
        }
        else{
            this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
              Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
                  this.props.navigation.goBack();
              }}]);
          })
          }           
        // console.log("getting country response----------------",countryData.country_list)
      };

      componentDidMount = async() => {
        this.fetchTokenData()
        BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
          this.userProfileFunction();
          // this.fetchInstagramDetails()
          setInterval(() => {
              this.fetchNotificationCount()
          }, 5000);              
       }
     

      componentWillUnmount(){
      
        BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));

      }
      
handleBackButton=(nav)=> {
        
        if(!nav.isFocused()) {
          BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
          return false;
        }else{
          nav.navigate("Home");
          return true;
        }
}


 fetchInstagramDetails = async() => {
   const GetInstagamInfo = await InstagramInfo()
   if(GetInstagamInfo.result == true){
     console.log("getting details here>>>>>>>>>>>>>>>>>>>>>------------",GetInstagamInfo.response.graphql.user.profile_pic_url)
     var instagramImage =  GetInstagamInfo.response.graphql.user.profile_pic_url
     var InstagramName =  GetInstagamInfo.response.graphql.user.username
    
     this.setState({instagramImage,InstagramName})
   }
   else{
     console.log("getting error on the else part---------",GetInstagamInfo.error)
   }
 }



fetchNotificationCount = async() => {
  const GetNotificationCount = await MyNotificationCount();
  if(GetNotificationCount.result  == true){
    var notificationCountValue = GetNotificationCount.response.notification_count;
    // console.log("getting here on the account page------------",notificationCountValue)
    this.setState({isBodyLoaded: true, isSpinner: false, notificationCountValue,isCurrenetComponentRefreshing:false,});
  }
  else{
    this.setState({isBodyLoaded: true, isSpinner: false});
  } 
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
    render() {
                      
        const { UserDetails }  = this.state;
        const userMap = Object.assign(UserDetails)
      // console.log("getting image from the state=-----------------",this.state.instagramImage)
        // console.log("getting indside the reder methid-------",userMap)
        return (
            <View style={styles.container}>
           <StatusBar
          barStyle="dark-content"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        />
                <View style={styles.headerView}>
                    <Text style={styles.headerTextView}> </Text>
                    <Text style={styles.headerTextView1}>           My Account</Text>
                  
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:200,marginEnd:30}}>
                  
                  <Image source={BellIcon } style={{height:30,width:30,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                  {
                      this.state.notificationCountValue >  0 ? 

                  <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-13,marginTop:15,marginStart:10,righ:-20,bottom:-1}}
                                    
                  /> :null}
                  </View>
                  </TouchableOpacity>                
                </View>
                <View style={styles.contentView}>
                
                <Spinner visible={this.state.isSpinner}/>

                <ScrollView scrollEnabled={false}>
                {
                       this.state.isBodyLoaded === true ?
                       <Fragment>
                       <View style={{borderWidth:0}} >
                        <View style={{borderWidth:0,borderColor:'red',height:110,width:110,alignSelf:'center'}}> 
                        {
                          this.state.instagramImage != '' ?
                          <FastImage source={{uri: `${this.state.instagramImage}`}} style={styles.imgStyle}  />
                          :
                          <FastImage source={profile} style={styles.imgStyle}   />
                        }
                                                    
                        </View>
                        <View style={styles.nameemailStyle}>
                            <Text style={styles.nameStyle}>{UserDetails.first_name}   {UserDetails.last_name} </Text>
                            <Text style={styles.emailStyle}>{UserDetails.email}</Text>
                        </View>
                        <View style={styles.contentTextView}>
                          <ScrollView>
                          <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                            <TouchableOpacity style={styles.itemContentStyle} 
                                onPress={()=>{this.props.navigation.navigate("profile",{instagramImage:this.state.instagramImage})}}
                            >
                                <FastImage source={require('../../../assets/profileIcon/profile.png')} style={styles.contentImg} />
                                <Text style={styles.contentTxt}>My Profile</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                              <TouchableOpacity 
                                  onPress={()=>{this.props.navigation.navigate("setting")}}
                              style={styles.itemContentStyle}>
                                <FastImage  source={require('../../../assets/profileIcon/setting.png')} style={styles.contentImg} />
                                <Text style={styles.contentTxt}>Settings</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}></View>
                              <TouchableOpacity style={styles.itemContentStyle}
                                 onPress={()=>{this.props.navigation.navigate("contact")}}
                              >
                                <FastImage source={require('../../../assets/profileIcon/contact.png')} style={styles.contentImg} />
                                <Text style={styles.contentTxt}>Contact us</Text>
                            </TouchableOpacity>


                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                              <TouchableOpacity style={styles.itemContentStyle}
                                onPress={()=>{this.props.navigation.navigate('termsandcondition')}}
                              >
                                <FastImage   source={require('../../../assets/profileIcon/termsandcondition.png')}  style={styles.contentImg} />
                                <Text style={styles.contentTxt}>Terms and Conditions</Text>
                            </TouchableOpacity>
                            </View>





                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                              <TouchableOpacity style={styles.itemContentStyle}
                                onPress={()=>{this.props.navigation.navigate('privacypolicy')}}
                              >
                                <FastImage   source={require('../../../assets/profileIcon/Privacy-policy.png')}  style={styles.contentImg} />
                                <Text style={styles.contentTxt}>Privacy & Policy</Text>
                            </TouchableOpacity>
                            </View>


                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                            <TouchableOpacity style={styles.itemContentStyle}
                                 onPress={()=>{this.props.navigation.navigate("updatepassword")}}
                              >
                                <FastImage  source={require('../../../assets/profileIcon/ChnagePassword.png')}       style={styles.contentImg} />
                                <Text style={styles.contentTxt}>Change Password</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{borderWidth:0,borderColor:'red',width:SCREEN_WIDTH/2.1,marginTop:5}}>
                              <TouchableOpacity style={styles.itemContentStyle}
                                onPress={()=>{this.LogoutFunction()}}                             
                              >
                                <FastImage 
                                   source={require('../../../assets/profileIcon/logout.png')}                               
                                style={styles.contentImg} 
                                />
                                <Text style={styles.contentTxt}>Logout</Text>
                            </TouchableOpacity>                           
                        </View>   

                            </ScrollView>
                            </View>
                          


                                                 
                        </View>
                     
                        </Fragment>
                        : null
                 }
                </ScrollView>
                <View style={{ position:"absolute",bottom:-30}}>
                <View style={{justifyContent:'center',margin:10,marginVertical:SCREEN_HEIGHT/10}}>
                          <Text style={{fontSize:14,fontWeight:'700',textAlign:'center',color:'#B87548'}}>App Version: {packageJson.version}</Text>
                        </View>
                </View>
                </View>
                <BottomNavigator
                    currentRoute={'Account'}
                    navigation={this.props.navigation}/>
            </View>
        )
    }
}
