import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './indexCss';
import bgimg from '../../../assets/singup.png';
import downArrow from '../../../assets/icon/downArrow.png'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import { color } from 'react-native-reanimated';
import {createUser} from '../../../Api/auth'
import { SocialAuth } from '../../../Api/auth';
var uuid = require('react-native-uuid');
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props){
    super(props)    
    this.state = {
      date:"2016-05-15 ,select date",  
      instagram_name:'',
      first_name:'',
      last_name:'',
      email:'',   
      phone:'',
      birth_date:'1990-05-15',
      profile_url:"",
      device_token:'',
      reg_type:'',

    
      Model_Visibility: false,
      Alert_Visibility: false,
    }
  }



  componentDidMount = async () => {        
    const device_token =  uuid.v1();
    this.setState({device_token})
    const reg_type = this.props.navigation.getParam("reg_type")    
    this.setState({reg_type})
    console.log("getting reg_type text on the did mount---------------",device_token)
  };

  SocailAuthFunction = async () => {  
    const {   
    instagram_name,
    first_name,
    last_name,
    email,   
    phone,
    birth_date,
    profile_url,
    device_token,
    reg_type,
   } = this.state;
    const socialAuthResponse = await SocialAuth({
    instagram_name,
    first_name,
    last_name,
    email,   
    phone,
    birth_date,
    profile_url,
    device_token,
    reg_type,
           
    });
    if (socialAuthResponse.result === true) {
      console.log("getting result here --------",socialAuthResponse.response) 
      console.log("getting result here --------",socialAuthResponse.response.message) 
      if(socialAuthResponse.response.status === true){
        console.log("getting result here --------",socialAuthResponse.response) 
        Alert.alert("Message","Login Sucessfully !!")
        this.props.navigation.navigate("Home")        
      }
      else{
        Alert.alert("Message",socialAuthResponse.response.message)
      }      
    } else {
      this.myAlert('Error', socialAuthResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {   
      instagram_name,    
      first_name,
      last_name,
      email,     
      phone,
      birth_date,
      profile_url,
      device_token,
      reg_type
     } = this.state;
     if (instagram_name.length === 0) {
      this.myAlert('Message', 'Please enter your instagram_name');
    }
    else if (first_name.length === 0) {
      this.myAlert('Message', 'Please enter your first_name');
    } else if (last_name.length === 0) {
      this.myAlert('Message', 'Please enter your last_name');
    } else if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } else if (device_token.length === 0) {
      this.myAlert('Message', 'Please enter your device_token');
    }
    else if (phone.length === 0) {
      this.myAlert('Message', 'Please enter your phone');
    } 
    else if (birth_date.length === 0) {
      this.myAlert('Message', 'Please enter your birth_date');
    }   
    else if (reg_type.length === 0) {
      this.myAlert('Message', 'Please enter your postcode');
    }      
    else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid email');
        return false;
      }
      const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      if (!phone.match(mobileformat)) {
        this.myAlert('Message', 'Invalid phone');
        return false;
      }     
      this.SocailAuthFunction();
    }
  };




render() {
    const { date,countryData } = this.state;
   
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">

          <View style={styles.contentView}>
            <View style={styles.headerView}>
            <Text style={styles.headerTxt}>{this.props.navigation.getParam("headerTxt")}</Text>
              {/* <Text style={styles.subHeaderTxt}>
                Hey john@gmail.com, this is not your account ?
              </Text> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.txtInputView}>
            <TextInput style={styles.txtInput} placeholder="Instagram Username" 
                  autoCapitalize="none"
                  onChangeText={(instagram_name) => this.setState({ instagram_name })}

            />
            <View style={styles.nameSurNameViewStyle}>
                
                <TextInput style={styles.nameSurNameContentStyle} placeholder="FirstName" 
                      autoCapitalize="none"
                      onChangeText={(first_name) => this.setState({ first_name })}
                />
                <TextInput style={styles.nameSurNameContentStyle} placeholder="Lastname"
                      autoCapitalize="none"
                      onChangeText={(last_name) => this.setState({ last_name })}
                />
            </View>

            <View style={styles.txtInput}>
            <DatePicker
        style={{width: 300}}
        date={this.state.date   }
        placeholder="Date of Birth                           "
        mode="date"
              
        format="YYYY-MM-DD"
        minDate="1990-05-01"
        maxDate="2020-06-01"
        
        // confirmBtnText="Confirm"
        // cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {         
            left: -50,          
          },
          dateInput: {
            marginLeft: -90,
            borderColor:'red',
            borderWidth:0,
            marginRight:90,
            
            
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(birth_date) => {this.setState({birth_date})}}
      />
        </View>

                <TextInput style={styles.txtInput} placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput style={styles.txtInput} placeholder="Telephone"
                    keyboardType="phone-pad"  
                    autoCapitalize="none"
                    onChangeText={(phone) => this.setState({ phone })}
                />
                <TextInput style={styles.txtInput} placeholder="profile_url"
                    autoCapitalize="none" 
                    onChangeText={(profile_url) => this.setState({ profile_url })}
                />
               
                 <TextInput style={styles.txtInput} placeholder="device_token" 
                    autoCapitalize="none"
                    value={this.state.device_token}
                    onChangeText={(device_token) => this.setState({ device_token })}
                />
                <TextInput style={styles.txtInput} placeholder="reg_type"                  
                   autoCapitalize="none"
                   value={this.state.reg_type}
                    onChangeText={(reg_type) => this.setState({ reg_type })}
                />           
             </View>
             
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.validateUser()}}
            >
              <Text style={styles.loginBtnTxt}>Sign Up</Text>
            </TouchableOpacity> 
            </View>
             </ScrollView>
            










             {/* <Modal
          visible={this.state.Model_Visibility}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_AlertForTime(!this.state.Model_Visibility);
          }}>
          <View
            style={{            
              // backgroundColor: 'rgba(0,0,0,0.5)',
              backfaceVisibility:'hidden',
              flex: 1,
              right:20,
              left:200,             
              
              // left: Dimensions.get('window').width*1.60,
              top:350,
              bottom:20,                         
            }}>
            <View
              style={{
                width: '38%',
                height: SCREEN_HEIGHT/3.3,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <ScrollView
                style={{
                  flex: 2,
                  width: '100%',
                  borderColor: 'red',
                  borderWidth: 0,
                
                }}
                showsVerticalScrollIndicator={false}>
                {this.state.countryData.map((singleCountry, index) => {
                  return (
                    <View style={{ justifyContent: 'center' }}>
                      <TouchableOpacity
                        onPress={() => { this.setState({ country: `${singleCountry.country_name}` }, () => this.Hide_Custom_AlertForTime()) }}
                      >
                        <View style={{
                          height: 30,
                          
                          // borderColor: '#b48484',
                          // borderWidth: 0,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.5,
                          shadowRadius: 1,
                          elevation: 1,
                          margin:5
                        }}>
                          <Text style={{fontWeight:'bold', color: '#B87548', fontSize: 16, fontFamily:'OpenSans-Bold', textAlign: 'center', }}>{`${singleCountry.country_name}`}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal> */}





          </View>
        
        </ImageBackground>
      </View>
    );
  }
}
