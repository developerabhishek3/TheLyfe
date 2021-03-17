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
import back from '../../../../assets/icon/back.png';

var uuid = require('react-native-uuid');
import {  ForgotPassword2 } from '../../../../Api/auth'
// import uuid from 'reacr-native-uuid'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      vcode:''
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

  forgotPasswordReq2 = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {   
    email,   
    vcode  
   } = this.state;
    const forgotPasswordResponse = await ForgotPassword2({    
      email,  
      vcode
    });
    if (forgotPasswordResponse.result === true) {
      console.log("getting result here --------",forgotPasswordResponse.response) 
      console.log("getting result here --------",forgotPasswordResponse.response.message) 
      // Alert.alert("Message",forgotPasswordResponse.response.message)
      if(forgotPasswordResponse.response.status === true){
        this.props.navigation.navigate("setnewpassword")
      } 
      else{
        Alert.alert("Message",forgotPasswordResponse.response.message)
      }    
    } else {
      this.myAlert('Error', forgotPasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };
  validateUser = () => {
    const {email, vcode} = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } else if (vcode.length === 0) {
      this.myAlert('Message', 'Please enter your vcode');
    }
     else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid Email-Id');
        return false;
      }
      this.forgotPasswordReq2();
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
          <View style={{birderWidth:0,width:'100%',borderColor:'red',flexDirection:'row',marginTop:30}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
            <Image source={back} style={{height:20,width:20,margin:10}} />
            </TouchableOpacity>
          <Text style={styles.headerTxt}>     FORGOT PASSWORD!</Text>
          <Text style={styles.headerTxt}>      </Text>
         </View>
        
          <View style={styles.txtInputView}>
          
            <TextInput style={styles.txtInput} placeholder="Email"
               autoCapitalize="none"
               onChangeText={(email) => this.setState({ email })}
            />
               <TextInput style={styles.txtInput} placeholder="verification code"
               autoCapitalize="none"
               onChangeText={(vcode) => this.setState({ vcode })}
            />
           
            <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.validateUser()}}
            >
              <Text style={styles.loginBtnTxt}>Forgot Password</Text>
            </TouchableOpacity>

          </View>         
        </ImageBackground>
      </View>
    );
  }
}
