// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   Modal,
//   Dimensions
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import styles from './indexCss';
// import bgimg from '../../../assets/singup.png';
// import downArrow from '../../../assets/icon/downArrow.png'
// import DatePicker from 'react-native-datepicker'
// import moment from 'moment'
// import { color } from 'react-native-reanimated';
// import {createUser} from '../../../Api/auth'
// import { SocialAuth } from '../../../Api/auth';
// var uuid = require('react-native-uuid');
// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;


// import InstagramLogin from 'react-native-instagram-login';


// export default class index extends Component {
//   constructor(props){
//     super(props)    
//     this.state = {
//       date:"2016-05-15 ,select date",  
//       instagram_name:'',
//       first_name:'',
//       last_name:'',
//       email:'',   
//       phone:'',
//       birth_date:'1990-05-15',
//       profile_url:"",
//       device_token:'',
//       reg_type:'',


//       token: '',
    
//       Model_Visibility: false,
//       Alert_Visibility: false,
//     }
//   }



//   componentDidMount = async () => {        
//     const device_token =  uuid.v1();
//     this.setState({device_token})
//     const reg_type = this.props.navigation.getParam("reg_type")    
//     this.setState({reg_type})
//     console.log("getting reg_type text on the did mount---------------",device_token)
//   };

//   setIgToken = (data) => {
//     console.log('data', data)
//     this.setState({ token: data.access_token })
//   }

//   onClear() {
//     CookieManager.clearAll(true)
//       .then((res) => {
//         this.setState({ token: null })
//       });
//   }



//   SocailAuthFunction = async () => {  
//     const {   
//     instagram_name,
//     first_name,
//     last_name,
//     email,   
//     phone,
//     birth_date,
//     profile_url,
//     device_token,
//     reg_type,
//    } = this.state;
//     const socialAuthResponse = await SocialAuth({
//     instagram_name,
//     first_name,
//     last_name,
//     email,   
//     phone,
//     birth_date,
//     profile_url,
//     device_token,
//     reg_type,
           
//     });
//     if (socialAuthResponse.result === true) {
//       console.log("getting result here --------",socialAuthResponse.response) 
//       console.log("getting result here --------",socialAuthResponse.response.message) 
//       if(socialAuthResponse.response.status === true){
//         console.log("getting result here --------",socialAuthResponse.response) 
//         Alert.alert("Message","Login Sucessfully !!")
//         this.props.navigation.navigate("Home")        
//       }
//       else{
//         Alert.alert("Message",socialAuthResponse.response.message)
//       }      
//     } else {
//       this.myAlert('Error', socialAuthResponse.error);
//       console.log('getting error here-------------');
//     }
//     return;
//   };

//   myAlert = (title = '', message = '') => {
//     Alert.alert(title, message);
//   };

//   validateUser = () => {
//     const {   
//       instagram_name,    
//       first_name,
//       last_name,
//       email,     
//       phone,
//       birth_date,
//       profile_url,
//       device_token,
//       reg_type
//      } = this.state;
//      if (instagram_name.length === 0) {
//       this.myAlert('Message', 'Please enter your instagram_name');
//     }
//     else if (first_name.length === 0) {
//       this.myAlert('Message', 'Please enter your first_name');
//     } else if (last_name.length === 0) {
//       this.myAlert('Message', 'Please enter your last_name');
//     } else if (email.length === 0) {
//       this.myAlert('Message', 'Please enter your email');
//     } else if (device_token.length === 0) {
//       this.myAlert('Message', 'Please enter your device_token');
//     }
//     else if (phone.length === 0) {
//       this.myAlert('Message', 'Please enter your phone');
//     } 
//     else if (birth_date.length === 0) {
//       this.myAlert('Message', 'Please enter your birth_date');
//     }   
//     else if (reg_type.length === 0) {
//       this.myAlert('Message', 'Please enter your postcode');
//     }      
//     else {
//       const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if (!email.match(mailformat)) {
//         this.myAlert('Message', 'Invalid email');
//         return false;
//       }
//       const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
//       if (!phone.match(mobileformat)) {
//         this.myAlert('Message', 'Invalid phone');
//         return false;
//       }     
//       this.SocailAuthFunction();
//     }
//     };




// render() {
//     const { date,countryData } = this.state;
   
//     return (
//       <View style={styles.container}>
//         <ImageBackground
//           source={bgimg}
//           style={styles.bgImgStyle}
//           resizeMode="stretch">



//         </ImageBackground>
//       </View>
//     );
//   }
// }






import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  setIgToken = (data) => {
    console.log('data-=----------------------', data)
    this.setState({ token: data.access_token })
  }

  onClear() {
    CookieManager.clearAll(true)
      .then((res) => {
        this.setState({ token: null })
      });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.instagramLogin.show()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { marginTop: 10, backgroundColor: 'green' }]}
          onPress={() => this.onClear()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
        <Text style={{ margin: 10 }}>Token: {this.state.token}</Text>
        {this.state.failure && (
          <View>
            <Text style={{ margin: 10 }}>
              failure: {JSON.stringify(this.state.failure)}
            </Text>
          </View>
        )}
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId='3132471346868778'
          appSecret='228e8b900842a34dd98a252aac7eacfc'
          redirectUrl='https://socialsizzle.herokuapp.com/auth/'
          scopes={['public_content', 'follower_list']}
          // scopes={['user_profile', 'user_media']}          
          onLoginSuccess={this.setIgToken}
          onLoginFailure={(data) => console.log(data)}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
