import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  BackHandler,
  KeyboardAvoidingView
} from 'react-native';
import styles from './indexCss';
import bgimg from '../../../assets/login.png';

import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

import AsyncStorage from '@react-native-community/async-storage';

import facebook from '../../../assets/icon/fb.png';
import gmail from '../../../assets/icon/gmail.png';
import instagram from '../../../assets/icon/inst.png';
var uuid = require('react-native-uuid');
import { loginUser } from '../../../Api/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getInstgramUserName, getInstgramUserDetails } from '../../../Api/afterAuth';
// import uuid from 'reacr-native-uuid'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      device_token: '',


      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
  }

  setIgToken = async (data) => {
    console.log('data-----------------------', data)
    await AsyncStorage.setItem("userLoggedIn", "true");
    await AsyncStorage.setItem("Instatoken", JSON.stringify(data.access_token));
    await AsyncStorage.setItem("InstaUserId", JSON.stringify(data.user_id));

    this.setState({ token: data.access_token })

    this.generateUserId()

    // this.props.navigation.navigate("Home")  



  }


  onClear() {
    CookieManager.clearAll(true)
      .then((res) => {
        this.setState({ token: null })
        console.log("getting token herer------------------", token)
      });
  }


  componentDidMount = async () => {
    const device_token = uuid.v1();
    const userId = this.state.email
    this.setState({ device_token })
    console.log("getting uuid value here------------------", device_token)
    await AsyncStorage.setItem('device_token', 'true');
    await AsyncStorage.setItem('token', device_token);

    this.setState({ userId })

    const FCMtoken = await AsyncStorage.getItem('fcmToken');
    console.log("getting token --------", FCMtoken)
    this.setState({ device_token: FCMtoken })

    // const Insttoken = await AsyncStorage.getItem('Insttoken');
    // const Insttoken = await AsyncStorage.getItem('Insttoken');

    // const Instagramtoken = JSON.parse(Insttoken);
    // const InstaUserId = JSON.parse(InstaUserId)
    // console.log("getting token and user id herer--------------------",token, user_id)


    const username = await AsyncStorage.getItem('username');

    const instagramUserName = JSON.parse(username)

    console.log("getting inside the didmount instagram username---------", instagramUserName)


    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));

  }



  generateUserId = async () => {

    // this.props.navigation.navigate("Home")  
    const getInstgramUserNameResponse = await getInstgramUserName();
    if (getInstgramUserNameResponse.result === true) {
      console.log("getting response here1---------", getInstgramUserNameResponse.response)
      // var username = getInstgramUserNameResponse.response;
      // console.log("getting username here-2-----------",username)
      // await AsyncStorage.setItem('username', username);     

    }
    else {
      console.log("getting error here on generating username----------", getInstgramUserNameResponse.error)
    }
    // this.setState({username})
    // console.log("getting user name here---------",username)
    // this.setState({isBodyLoaded: true, isSpinner: false, categoryData});
    // console.log("getting categoryData response----------------",categoryData)  
  }


  generateUserProfile = async () => {

    // this.props.navigation.navigate("Home")  
    const generateUserProfileResponse = await getInstgramUserDetails();
    if (generateUserProfileResponse.result === true) {
      // console.log("getting response here---------",generateUserProfileResponse.response)
      var userDetais = generateUserProfileResponse.response.graphql.user

    }
    this.setState({ userDetais })
    console.log("getting user profile here---------", userDetais)
    // this.setState({isBodyLoaded: true, isSpinner: false, categoryData});
    // console.log("getting categoryData response----------------",categoryData)  
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
  }
  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      console.log("getting inside the if conditin--------------")
      return true;
    } else {
      console.log("getting inside the else conditin---------------")
      Alert.alert(
        'Exit App',
        'Do you want to Exit..', [{
          text: 'Cancel',
          style: 'cancel'
        }, {
          text: 'Exit',
          onPress: () => BackHandler.exitApp()
        },], {
        cancelable: false
      })
      return true;
    }
  }


  userLoginFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {
      email,
      password,
      device_token
    } = this.state;
    const loginUserResponse = await loginUser({
      email,
      password,
      device_token
    });
    if (loginUserResponse.result === true) {
      console.log("getting result here --------", loginUserResponse.response)


      // if(loginUserResponse.response.status == true){
      //   this.props.navigation.navigate("Home")
      // }
      // else{
      //   Alert.alert("Message",loginUserResponse.response.message)
      // }
      if (loginUserResponse.response.status === true) {
        console.log("getting reponse here=================",loginUserResponse.response)
        await AsyncStorage.setItem("userLoggedIn", "true");
        await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));

        await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
        await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));

        this.props.navigation.navigate("Home")
      }
      else {
        Alert.alert("Message", loginUserResponse.response.message)
      }
    } else {
      this.myAlert('Error', loginUserResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const { email, password } = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } else if (password.length === 0) {
      this.myAlert('Message', 'Please enter your password');
    } else {
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid Email-Id');
        return false;
      }
      this.userLoginFunction();
    }
  };


  render() {

    return (
      <View style={styles.container} >
        {
          Platform.OS === "android" ?
            <StatusBar
              barStyle="light-content"
              hidden={false}
             backgroundColor="#c29a74"
              translucent={true}
            /> : null
        }
        <ImageBackground
          resizeMode="stretch"
          source={bgimg}
          style={styles.bgImgStyle}
        >
          <Text style={styles.headerTxt}>LOG IN !</Text>

          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
            
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.txtInputView}>
        
            <TextInput style={styles.txtInput} placeholder="Email"
            placeholderTextColor="gray"
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />
           
            <TextInput style={styles.txtInput} placeholder="Password"
            placeholderTextColor="gray"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />           
            <TouchableOpacity
              style={styles.forgotpassword}
              onPress={() => { this.props.navigation.navigate("forgotpassword") }}
            >
              <Text style={styles.forgotpassword}>Forgot Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => this.validateUser()}
              // onPress={() => { this.props.navigation.navigate("Home") }}

            >
              <Text style={styles.loginBtnTxt}>Log in</Text>
            </TouchableOpacity>


            <View style={styles.newUserView}>
              <Text style={styles.newuser1}>New User? </Text>
              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate("singup") }}                
              >
                <Text style={styles.newuser2}>Apply</Text>
              </TouchableOpacity>
            </View>






            <View style={styles.socialView}>

              <TouchableOpacity
              //  onPress={()=>{this.props.navigation.navigate("loginwithinstagram",{reg_type:`instagram`,headerTxt:`LOGIN WITH INSTAGRAM`})}}
              // onPress={() => this.instagramLogin.show()}

              >
                {/* <Image source={instagram} style={styles.socailImage} /> */}
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
          </KeyboardAwareScrollView>
          {this.state.failure && (
            <View>
              <Text style={{ margin: 10 }}>
                failure: {JSON.stringify(this.state.failure)}
              </Text>
            </View>
          )}
          <InstagramLogin
            ref={ref => (this.instagramLogin = ref)}
            appId='1169992926689606'
            appSecret='ce42462d95d8bc991008a05e7db65995'
            redirectUrl='https://www.groofl.com/'
            // scopes={['basic']} 
            scopes={['user_profile', 'user_media']}
            onLoginSuccess={this.setIgToken}
            onLoginFailure={(data) => console.log(data)}
          />
        </ImageBackground>
      </View>
    );
  }
}
