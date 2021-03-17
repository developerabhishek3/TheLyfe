import React, {Component} from 'react';
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
BackHandler 
} from 'react-native';
import styles from './indexCss';
//import bgimg from '../../../assets/login.png';
import Spinner from 'react-native-loading-spinner-overlay';

import bgimg from '../../../../../assets/login.png';
import back from '../../../../../assets/icon/back.png'
var uuid = require('react-native-uuid');
import AsyncStorage from '@react-native-community/async-storage';
import {  updatePassword ,loginToken} from '../../../../../Api/afterAuth'
// import uuid from 'reacr-native-uuid'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password:'',
      new_password:'',
      confirm_new_password:'',
      spinner: false,
    };    
  }

componentDidMount() { 
  this.fetchTokenData()  
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));   
}

componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
}
    
handleBackButton=(nav)=> {
      if(!nav.isFocused()) {
        BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
        return false;
      }else{
        nav.goBack();
        return true;
      }
}

UserUpdateFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {   
      old_password,
      new_password,
      confirm_new_password, 
   } = this.state;
    const updatePasswordResponse = await updatePassword({    
      old_password,
      new_password,
      confirm_new_password,   
    });
    if (updatePasswordResponse.result === true) {
      console.log("getting result here --------",updatePasswordResponse.response) 
      console.log("getting result here --------",updatePasswordResponse.response.message)       
      if(updatePasswordResponse.response.status === true){
        Alert.alert("Message",updatePasswordResponse.response.message)
        this.props.navigation.navigate("Home",)
      }
      else{
        Alert.alert("Message",updatePasswordResponse.response.message)
      }      
    } else {
      this.myAlert('Error', updatePasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };
  validateUser = () => {
    const {  old_password,
      new_password,
      confirm_new_password   } = this.state;
    if (old_password.length === 0) {
      this.myAlert('Message', 'Please enter your Old Password');
    } else if (new_password.length === 0) {
      this.myAlert('Message', 'Please enter  your New Password');
    } else if (confirm_new_password.length === 0) {
      this.myAlert('Message', 'Please enter your Confirm Password');
    }
   else {    
    if (new_password != confirm_new_password) {
      this.myAlert('Message', 'New Password and Confirm Password are not matched');
      return false;
    }
      this.UserUpdateFunction();
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
  render() {

    return (
      <View style={styles.container} > 
         <Spinner visible={this.state.spinner} />   
        <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        /> 
        <View style={styles.headerView}>
        <TouchableOpacity
           onPress={()=>{this.props.navigation.goBack()}}>
       
        <Image source={back} style={{width:20,height:20,margin:10,marginTop:20,marginStart:20}} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Update Password</Text>
        <Text style={styles.headerTxt}>         </Text>
        </View>
         
        <View style={styles.contentView}>         
          
        <TextInput style={styles.txtInput} placeholder="Old Password"
               autoCapitalize="none"
               onChangeText={(old_password) => this.setState({ old_password })}
            />
             <TextInput style={styles.txtInput} placeholder="New Password"
               autoCapitalize="none"
               onChangeText={(new_password) => this.setState({ new_password })}
            />
             <TextInput style={styles.txtInput} placeholder="Confirm Password"
               autoCapitalize="none"
               onChangeText={(confirm_new_password) => this.setState({ confirm_new_password })}
            />
           
            <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.validateUser()}}
            >
              <Text style={styles.loginBtnTxt}>Update Password</Text>
            </TouchableOpacity>

          </View>         
      </View>
    );
  }
}
