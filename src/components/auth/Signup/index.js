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
  Dimensions,
  BackHandler,
  DatePickerIOS
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './indexCss';
import bgimg from '../../../assets/singup.png';
import downArrow from '../../../assets/icon/downArrow.png';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';
import {createUser} from '../../../Api/auth';
import {GetCountryList} from '../../../Api/afterAuth';
import calenderIcon from '../../../assets/icon/26.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SCREEN_HEIGHT = Dimensions.get('window').height; 
const SCREEN_WIDTH = Dimensions.get('window').width;


import FastImage from 'react-native-fast-image';

import { CheckBox, Overlay, Button } from 'react-native-elements';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      instagram_username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      telephone_no: '',
      birth_date:  new Date(),
      address: '',
      postcode: '',
      city: '',
      country: '',
      device_token:'',
      countryData: [],
      Model_Visibility: false,
      Alert_Visibility: false,  
      checked1:false
    };
  }

  Show_Custom_Alert(visible) {
    if (this.state.country != 'Country') {
      this.setState({ Alert_Visibility: visible });
    } else {
      Alert.alert('Message', "Please select your Country")
    }

  }
  
  Hide_Custom_Alert() {
    this.setState({ Alert_Visibility: false });
  }

  Show_Custom_AlertForTime(visible) {
    this.setState({Model_Visibility: visible});
  }

  Hide_Custom_AlertForTime() {
    this.setState({Model_Visibility: false});
  }

  Show_Custom_Alert(visible) {
    if (this.state.country != 'Country') {
      this.setState({Alert_Visibility: visible});
    } else {
      Alert.alert('Warning', 'Please select your your country');
    }
  }

  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
  }

  
  UserRegistrationFunction = async () => {
    this.setState({spinner: true});
    const {
      instagram_username,
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      // birth_date,
      address,
      postcode,
      city,
      country,
      device_token
    } = this.state;
    const createUserResponse = await createUser({
      instagram_username,
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      // birth_date,
      address,
      postcode,
      city,
      country,
      device_token
    });
    if (createUserResponse.result == true) {
      console.log('getting resu333333333lt here --------', createUserResponse.response);
      console.log(
        'getting result222222 here --------',
        createUserResponse.response.message,
      );    
      if(createUserResponse.response.status == true){
        console.log("getting inide5555555 response ---",createUserResponse.response.message)
        Alert.alert("Message",createUserResponse.response.message)
        this.props.navigation.navigate('aftersignupwelcome',{email:email})
      }
      else{
        Alert.alert("Message",createUserResponse.response.message)
      }
    } else {
      this.myAlert('Error', createUserResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };






  validateUser = () => {
    const {
      instagram_username,
      first_name,
      last_name,
      email,
      telephone_no,
      address,
      password,  
      postcode,
      city,
      country,      
      checked1        
    } = this.state;
    if (instagram_username.length === 0) {
      this.myAlert('Message', 'Please enter your instagram username');
    } else if (first_name.length === 0) {
      this.myAlert('Message', 'Please enter your first name');
    } else if (last_name.length === 0) {
      this.myAlert('Message', 'Please enter your last name');
    } else if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } 
     else if (telephone_no.length === 0) {
      this.myAlert('Message', 'Please enter your telephone no');
    } 
    //  else if (birth_date.length === 0) {
    //   this.myAlert('Message', 'Please enter your birth_date');
    // }
     else if (address.length === 0) {
      this.myAlert('Message', 'Please enter your address');
    }
    else if (postcode.length === 0) {
      this.myAlert('Message', 'Please enter your postcode');
    } 
    else if (password.length === 0) {
      this.myAlert('Message', 'Please enter your password');
    }   
   else if (city.length === 0) {
      this.myAlert('Message', 'Please enter your city');
    } else if (country.length === 0) {
      this.myAlert('Message', 'Please select your country');
    } 
    else if (!checked1) {
      this.myAlert('Message', 'Please indicate that you have read and agree to the Terms and Conditions.');
    }
    
    else {
      // const mailformat = /^\w+@.+\.\w+$/g
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid email');
        return false;
      }      
      this.UserRegistrationFunction();
    }
  };

  componentDidMount = async () => {
    setInterval(() => {
      this.fetchCountryData();
    },100);


    const FCMtoken = await AsyncStorage.getItem('fcmToken');
    console.log("getting token --------",FCMtoken)
    this.setState({device_token:FCMtoken})


    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    this.fetchCountryData();
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

  fetchCountryData = async () => {
    const GetCountryListResponse = await GetCountryList();
    if (GetCountryListResponse.result === true) {
      var countryData = GetCountryListResponse.response.country_list;
      // console.log("getting country data----------",countryData)
    }
    this.setState({countryData});
    // console.log("getting country response----------------",countryData.country_list)
  };
  render() {
    const {date, countryData} = this.state;    
// console.log("getin country date-------",countryData)
    
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
          <View style={styles.contentView}>
            <View style={styles.headerView}>
              <Text style={styles.headerTxt}>APPLY</Text>
              {/* <Text style={styles.subHeaderTxt}> 
                Hey john@gmail.com, this is not your account ?
              </Text> */}
            </View>
           
            <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
            <View style={{borderWidth:0,}}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
           
              <View style={styles.txtInputView}>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Instagram Username"
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  onChangeText={(instagram_username) =>
                    this.setState({instagram_username})
                  }
                />
                <View style={styles.nameSurNameViewStyle}>
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="Name"
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    onChangeText={(first_name) => this.setState({first_name})}
                  />
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="Surname"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={(last_name) => this.setState({last_name})}
                  />
                </View>

                {/* <View style={styles.txtInput}>
                

      <DatePicker
         style={{width: SCREEN_WIDTH*0.70,}}
         date={this.state.birth_date}
         placeholder="Date of Birth"                    
         format="YYYY-MM-DD"                   
         maxDate="2060-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={calenderIcon}
          iconSource={calenderIcon}
          customStyles={{
            dateIcon: {
              left: -25,
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
                </View> */}

                <TextInput
                  style={styles.txtInput}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({email})}                
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Telephone"
                  placeholderTextColor="gray"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  onChangeText={(telephone_no) => this.setState({telephone_no})}
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Address"
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  onChangeText={(address) => this.setState({address})}
                />
               
                <TextInput
                  style={styles.txtInput}
                  placeholder="Postcode"
                  keyboardType="numeric"      
                  placeholderTextColor="gray"            
                  autoCapitalize="none"
                  onChangeText={(postcode) => this.setState({postcode})}
                />
                 <TextInput
                  style={styles.txtInput}
                  placeholder="Password"
                  secureTextEntry={true}                  
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  onChangeText={(password) => this.setState({password})}
                />

              

               
                <View style={styles.nameSurNameViewStyle}>
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="City"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={(city) => this.setState({city})}
                  />                 

                  <TouchableOpacity
                    onPress={() => this.Show_Custom_AlertForTime()}>
                    <View
                      style={{
                        borderRadius: 50,
                        marginTop: 13,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                        width: SCREEN_WIDTH / 2.8,
                        height: 35,
                      }}>
                          {
                            this.state.country == '' ?
                            <Text
                              style={{
                                color: 'gray',
                                paddingStart: 10,
                                padding:5,
                                fontWeight:'600',
                                fontSize: 15,
                                                              

                              }}>                        
                            Country
                            </Text>
                              :  <Text
                              style={{
                                color: 'gray',
                                paddingStart: 10,
                                fontWeight:'600',
                                fontSize: 16,
                                padding:5,
                               
                               
      
                              }}>                            
                                {this.state.country}
                            </Text>
                          }
                      <Image
                        source={downArrow}
                        style={{
                          width: 18,
                          height: 18,
                          margin: 3,
                          marginEnd:5,
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>




                <View style={{alignSelf:'flex-start',marginStart:40,margin:7}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("termsofservice")}}>
                  <Text style={{fontSize:16,fontWeight:'700',color:"gray",alignSelf:'flex-start', textDecorationLine: 'underline',}}>Terms of service</Text>
                </TouchableOpacity>
                </View>



                <View style={{flexDirection:'row',margin:9,width:'85%',borderWidth:0,flexWrap:'wrap',alignContent:'center',}}>
                <CheckBox
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                  checkedIcon={
                    <FastImage
                      source={require('../../../assets/icon/33.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                       
                      }}
                    />
                  }
                  uncheckedIcon={
                    <FastImage
                      source={require('../../../assets/icon/43.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                     
                      }}
                    />
                  }
                />
                <Text style={{width:"75%",fontSize:14,fontWeight:'700',color:"gray"}}>
                By creating an account, you confirm you have read and agree to the Terms of service.
                </Text>
                </View>
              </View>


              <View style={{alignSelf:'center',marginTop:70,marginBottom:70}}>
              <TouchableOpacity
                style={styles.loginBtn}
                // onPress={() => { this.props.navigation.navigate("aftersignupwelcome") }}
                onPress={() => {
                  this.validateUser();
                }}
                >
                <Text style={styles.loginBtnTxt}>Subscribe</Text>
              </TouchableOpacity>
            </View>
              
            </ScrollView>
            </View>
            </KeyboardAwareScrollView>
            <Modal
              visible={this.state.Model_Visibility}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => {
                this.Show_Custom_AlertForTime(!this.state.Model_Visibility);
              }}>
              <View
                style={{
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  backfaceVisibility: 'hidden',
                  flex: 1,
                  right: 20,
                  left: 10,

                  // left: Dimensions.get('window').width*1.60,
                  top: 350,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '50%',
                    height: SCREEN_HEIGHT /2.6,
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
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                {country: `${singleCountry.country_name}`},
                                () => this.Hide_Custom_AlertForTime(),
                              );
                            }}>
                            <View
                              style={{
                                height: 30,

                                // borderColor: '#b48484',
                                // borderWidth: 0,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                elevation: 1,
                                margin: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#000000',
                                  fontSize: 14,                                  
                                  textAlign: 'center',
                                }}>{`${singleCountry.country_name}`}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>


        
          </View>
        </ImageBackground>
      </View>
    );
  }
}
