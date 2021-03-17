import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  RefreshControl,
  Dimensions
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Back from '../../../../../assets/icon/back.png';
import edit from '../../../../../assets/icon/edit.png';
import profileImage from '../../../../../assets/icon/profileImage.png';
import calenderIcon from '../../../../../assets/icon/26.png'
import FloatingLabel from 'react-native-floating-labels';
import {updateUserProfile,UserProfile,loginToken} from '../../../../../Api/afterAuth'
import styles from './indexCss';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import profile from '../../../../../assets/icon/profile.png'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserDetails:[],
      date: new Date(),
      instagram_username: '',
      first_name: '',
      last_name: '',
      password: '',
      telephone_no: '',
      birth_date: '',
      address: '',
      postcode: '',
      city: '',
      country: '',      
    };
  }








  updateUserProfileFunction = async () => {
    this.setState({spinner: true});
    const {
      instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    } = this.state;
    const updateUserProfileResponse = await updateUserProfile({
      instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    });
    if (updateUserProfileResponse.result === true) {
      console.log('getting result here --------', updateUserProfileResponse.response);
      if(updateUserProfileResponse.response.status === true){
        console.log(
          'getting result here --------',
          updateUserProfileResponse.response.message,
        );
        Alert.alert('Message', updateUserProfileResponse.response.message);
        setTimeout(() => {
          this.userProfileFunction()
          this.props.navigation.navigate("Home")
        }, 300);
      
      }
      else{
        Alert.alert("Message", updateUserProfileResponse.response.message)
      }    
    } else {
      this.myAlert('Error', updateUserProfileResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {
      // instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    } = this.state;
   if (first_name.length == 0) {
      this.myAlert('Message', 'Please enter your first_name');
    } else if (last_name.length == 0) {
      this.myAlert('Message', 'Please enter your last_name');
    } else if (telephone_no.length == 0) {
      this.myAlert('Message', 'Please enter your telephone_no');
    } 
    else if (birth_date.length == 0) {
      this.myAlert('Message', 'Please enter your birth_date');
    }
     else if (address.length == 0) {
      this.myAlert('Message', 'Please enter your address');
    } else if (postcode.length == 0) {
      this.myAlert('Message', 'Please enter your postcode');
    } else if (city.length == 0) {
      this.myAlert('Message', 'Please enter your city');
    } else if (country.length == 0) {
      this.myAlert('Message', 'Please enter your country');
    } else {
      const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      if (!telephone_no.match(mobileformat)) {
        this.myAlert('Message', 'Invalid telephone_no');
        return false;
      }
      this.updateUserProfileFunction();
    }
  };

  componentDidMount = async () => {
    this.userProfileFunction()
    this.fetchTokenData()
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  };

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

  userProfileFunction = async () => {
    const UserProfileResponse = await UserProfile();
    
    if(UserProfileResponse.result === true) {
        console.log("getting UserProfileResponse response---------------",UserProfileResponse.response) 
        var UserDetails = UserProfileResponse.response.my_profile
        this.setState({ isBodyLoaded: true,isSpinner: false,UserDetails,
          first_name:UserDetails.first_name,
          last_name:UserDetails.last_name,
          telephone_no:UserDetails.phone_no,
          address:UserDetails.address,
          postcode:UserDetails.postcode,
          city:UserDetails.city,
          country:UserDetails.country,
          birth_date:UserDetails.birth_date
        })
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

    let instagramImage = this.props.navigation.getParam("instagramImage")

    const { UserDetails }  = this.state;
    const userMap = Object.assign(UserDetails)

    console.log("getting usermap ============",UserDetails)

    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Back} style={styles.headerImgView} />
          </TouchableOpacity>
          <Text style={styles.headerTextView}>My Profile</Text>
          <Text style={styles.headerTextView}> </Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.ImageView}>
          {
                        instagramImage != '' ?
                          <FastImage source={{uri: `${instagramImage}`}} style={styles.imgStyle}  />

                          :
                          <FastImage source={profile} style={styles.imgStyle}   />
                        }
          </View>
          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
          <ScrollView >
            <View style={styles.contentContainerView}>
              {/* <TextInput
                style={styles.textInputStyle}                              
                placeholderTextColor="gray"
                onChangeText={(instagram_username) =>
                  this.setState({instagram_username})
                }
              /> */}
              <TextInput
                style={styles.textInputStyle}
                placeholder="Name"                
                // value={UserDetails.first_name}
                placeholderTextColor="gray"
                onChangeText={(first_name) => this.setState({first_name })}
              >
                {this.state.first_name}
              </TextInput>

              <TextInput
                style={styles.textInputStyle}
                placeholder="SurName"
                placeholderTextColor="gray"
                // value={UserDetails.last_name}
                onChangeText={(last_name) => this.setState({last_name})}
              >
                {UserDetails.last_name}
              </TextInput>

              <View style={styles.textInputStyle}>               
                <DatePicker
                  style={{width: SCREEN_WIDTH*0.70,}}
                  date={(this.state.birth_date == `0000-00-00`) ? "" : this.state.birth_date }
                  placeholder="Date of Birth"                    
                  format="YYYY-MM-DD"                              
                  maxDate={this.state.date}                                
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={calenderIcon}
                    iconSource={calenderIcon}
                    customStyles={{
                      dateIcon: {
                        left: -15,
                        height:24,width:24
                      },
                      dateInput: {
                        marginLeft: -60,
                        borderColor: 'red',
                        borderWidth: 0,
                        marginRight: 90,
                      },          
                    }}
                    onDateChange={(birth_date) => {
                      this.setState({birth_date});
                    }}
                  />
              </View>

              <TextInput
                style={styles.textInputStyle}
                placeholder="Telephone"
                placeholderTextColor="gray"
                keyboardType="number-pad"                
                onChangeText={(telephone_no) => this.setState({telephone_no})}
                    >
                      {this.state.telephone_no}
                    </TextInput>
              <TextInput style={styles.textInputStyle} placeholder="Address" 
                  onChangeText={(address) => this.setState({address})}
              >
              {this.state.address}
              </TextInput>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Post Code"
                placeholderTextColor="gray"
                keyboardType="numeric"
                onChangeText={(postcode) => this.setState({postcode})}
              >
               {this.state.postcode}
              </TextInput>
               <TextInput
                style={styles.textInputStyle}
                placeholder="City"
                placeholderTextColor="gray"
                onChangeText={(city) => this.setState({city})}
              >
               {this.state.city}
              </TextInput>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Country"
                placeholderTextColor="gray"
                onChangeText={(country) => this.setState({country})}
              >
                {this.state.country}                
              </TextInput> 
            </View>
            <View>
              <TouchableOpacity style={styles.buttonActionView}
                onPress={()=>{this.validateUser()}}
              >
                <Text style={styles.buttonActionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
