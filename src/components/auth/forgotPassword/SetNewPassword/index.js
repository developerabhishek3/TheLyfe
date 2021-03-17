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

import bgimg from '../../../../assets/login.png';


var uuid = require('react-native-uuid');
import {  SetNewPassword } from '../../../../Api/auth'
// import uuid from 'reacr-native-uuid'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
    };    
  }

  componentDidMount() {   
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

SetNewPasswordFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {   
    email,   
    password  
   } = this.state;
    const resetPasswordResponse = await SetNewPassword({    
      email,  
      password
    });
    if (resetPasswordResponse.result === true) {
      console.log("getting result here --------",resetPasswordResponse.response) 
      console.log("getting result here --------",resetPasswordResponse.response.message) 
      Alert.alert("Message",resetPasswordResponse.response.message)
      this.props.navigation.navigate("login")
    } else {
      this.myAlert('Error', resetPasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };
  validateUser = () => {
    const {email, password} = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } 
    else if (password.length === 0) {
        this.myAlert('Message', 'Please enter your email');
    }
     else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid Email-Id');
        return false;
      }
      this.SetNewPasswordFunction();
    }
  };


  render() {

    return (
      <View style={styles.container} >    
        {
          Platform.OS === "android"?
          <StatusBar
            barStyle="light-content"
            hidden={false}
           backgroundColor="#c29a74"
            translucent={true}
          />: null
        }
        <ImageBackground
          resizeMode="stretch"
          source={bgimg}
          style={styles.bgImgStyle}
         >
          <Text style={styles.headerTxt}>RESET PASSWORD!</Text>
        
          <View style={styles.txtInputView}>
          
            <TextInput style={styles.txtInput} placeholder="Email"
               autoCapitalize="none"
               onChangeText={(email) => this.setState({ email })}
            />
             <TextInput style={styles.txtInput} placeholder="Password"
               autoCapitalize="none"
               onChangeText={(password) => this.setState({ password })}
            />
           
            <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.validateUser()}}
            >
              <Text style={styles.loginBtnTxt}>Reset Password</Text>
            </TouchableOpacity>

          </View>         
        </ImageBackground>
      </View>
    );
  }
}
