import React, {Component,Fragment} from 'react';
import {View, Text, Image, TouchableOpacity,Alert, TextInput,Modal,Dimensions,BackHandler} from 'react-native';
import styles from './indexCss';
import back from '../../../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
// import rightIcon from '../../  ../../../../assets/icon/33.png';
import rightIcon from '../../../../../assets/icon/33.png'
import unCheckIcon from '../../../../../assets/icon/43.png'
import FloatingLabel from 'react-native-floating-labels';
import {ScrollView} from 'react-native-gesture-handler';

import { CheckBox, Overlay, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {UserProfile, ad_reservation,loginToken} from '../../../../../Api/afterAuth';




import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import calenderIcon from '../../../../../assets/icon/26.png'
import downArrow from '../../../../../assets/icon/downArrow.png'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image';
export default class index extends Component {

      constructor(props){
        super(props)
        this.state = {
            UserDetails:[],
            date: new Date(),
            isBodyLoaded: false,
            isSpinner: true,
            Model_Visibility: false,
            Alert_Visibility: false, 
            AlertBox_Visibility : false,
            dateArray: [],
            pickupTime: 'Pickup Time' ,
            ad_id:0,    
            reserve_date:new Date(),        
            reserve_time:"",
            message:"",
             full_name:"",
            shipping_address:"",
            postcode:"",
            phone_no:"",
            city:"",
            country:"",
            size:'',

            checked1: false,

        }
    }


    userProfileFunction = async () => {
        const UserProfileResponse = await UserProfile();        
        if(UserProfileResponse.result == true) {
            // console.log("getting logout response---------------",UserProfileResponse.response) 
            var UserDetails = UserProfileResponse.response.my_profile
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
          const ad_id =  this.props.navigation.getParam('ad_id')
          console.log("getting ad id on the did mount-------",ad_id)       

          this.userProfileFunction();
          this.showTimeSlot() 

          setTimeout(() => {                                
            this.setState({
              ad_id,
            });                      
          }, 400);
          console.log("getting on the state------------",this.state.ad_id)
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

      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }    
      Hide_Custom_Alert() {
        this.props.navigation.navigate('Search');
        this.setState({Alert_Visibility: false});
        
      }

      Show_Custom_AlertForSize(visible){
        this.setState({AlertBox_Visibility : visible })
      }

      Hide_Custom_AlertForSize() { 
        this.setState({AlertBox_Visibility: false})
      }

      Show_Custom_AlertForTime(visible) {
        this.setState({Model_Visibility: visible});
      }
      
    
      Hide_Custom_AlertForTime() {
        this.setState({Model_Visibility: false});
      }
      

      


      showTimeSlot = () => {
        let currentDate = new Date();
        let currentMinute = currentDate.getMinutes();
        if(currentMinute >= 30){ 
          currentDate.setMinutes(0);
          currentDate.setHours(currentDate.getHours() + 1);
        }
        else{
          currentDate.setMinutes(30);
        }
        let  i=1;
        let dateArray = [];
        while(i<=48){
            let pushDate = new Date(currentDate);
          dateArray.push(pushDate);
          currentDate.setMinutes(currentDate.getMinutes()+30);
          i++;
        }
        this.setState({dateArray});
        console.log(dateArray);
      }


      // showTimeSlot = () => {
      //   let date = new Date();
      //   let dateArray = [];        
      //   let i = 1;
      //   dateArray.push(new Date());
      //   while (i <  48) {                   
      //     date.setMinutes(date.getMinutes() +  (60 - date.getMinutes())  );
      //     dateArray.push(new Date(date));
      //     i++;
      //   }
      //   this.setState({dateArray});
      // }

      
    ad_reservationFunction = async () => {       
      console.log("getting indie the post function ")
      console.log("getting ad_id inside the function-------------",this.state.ad_id)  
      const {
        ad_id,       
        reserve_date,     
        reserve_time,
        message,
         full_name,
        shipping_address,
        postcode,
        phone_no,
        city,
        country,
        size
      } = this.state;
      const ad_reservationResponse = await ad_reservation({
        ad_id,       
        reserve_date,     
        reserve_time,        
        full_name,
        shipping_address,
        postcode,
        phone_no,
        message,
        city,
        country,
        size
      });
      if (ad_reservationResponse.result == true) {


        console.log('getting result here --------', ad_reservationResponse.response.status);   
        console.log("Message for status >>>>>>>>>>>>>>>>>>",ad_reservationResponse.response.status)
        if(ad_reservationResponse.response.status == false) {          
          console.log("getting result inside the method.........",ad_reservationResponse.response.message)         
          Alert.alert("Message",ad_reservationResponse.response.message)            
        }
        else {
        console.log("getting result inside the method.........",ad_reservationResponse.response.message)         
        // Alert.alert("Message",ad_reservationResponse.response.message)
         this.Show_Custom_Alert()
        }

        // Alert.alert('Message', ad_reservationResponse.response.message);
        
      } else {
        this.myAlert('Error', ad_reservationResponse.error);
        console.log('getting error here-------------');
      }
      return;
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  
    validateUser = () => {
      const {    
        shipping_address, 
        postcode,
        phone_no,
        reserve_date,     
        reserve_time,
        city,
        country,
        checked1
  
      } = this.state;
      if (shipping_address.length == 0) {
        this.myAlert('Message', 'Please enter your shipping_address!');
      }
      else if (postcode.length == 0) {
        this.myAlert('Message', 'Please enter your postcode!');
      } 
      else if (phone_no.length == 0) {
        this.myAlert('Message', 'Please enter your phone no!');
      } 
      else if (reserve_date.length == 0) {
        this.myAlert('Message', 'Please Select your reserve date!');
      }  
      else if (reserve_time.length == 0) {
        this.myAlert('Message', 'Please Select your reserve time!');
      }  else if (city.length == 0) {
        this.myAlert('Message', 'Please enter your city!');
      }
      else if (country.length == 0) {
        this.myAlert('Message', 'Please enter your country!');
      }
       else if (!checked1) {
        this.myAlert('Message', 'Please do agree the condition!');
      }
      
      else {      
        const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
        if (!phone_no.match(mobileformat)) {
          this.myAlert('Message', 'Invalid phone_no');
          return false;
        }
        this.ad_reservationFunction();
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
    const headerTxt = this.props.navigation.getParam('headerTxt')
    const advertisementDetailsConditionData = this.props.navigation.getParam("advertisementDetailsConditionData")



    const sizeDate =  this.props.navigation.getParam("sizeDate")
    console.log("getting size data ---------- - -  - -  -  - -   - -  - - ",sizeDate)


    const {dateArray} = this.state;
    const { UserDetails }  = this.state;
    const userMap = Object.assign(UserDetails)
    return (
      <View style={styles.container}>
         <Spinner visible={this.state.isSpinner}/>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backStyle} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>{headerTxt}</Text>
          <Text style={styles.headerTxt}> </Text>
        </View>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View style={styles.contentContainerView}>
            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',}}> Full Name</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Full Name"

              value={`${UserDetails.first_name} ${UserDetails.last_name}`}
              editable={false}
              style={styles.floatingInputStyle}
            />
            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',}}> Shipping Address</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Shipping Address"
              style={styles.floatingInputStyle}
              // value={UserDetails.address}
              onChangeText={(shipping_address) => this.setState({ shipping_address })}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderColor: 'red',
                borderWidth: 0,
                flexWrap: 'wrap',
                justifyContent:'center'
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',}}>Post Code</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Post Code"
                  // value={UserDetails.postcode}
                  keyboardType="numeric"      
                 onChangeText={(postcode) => this.setState({ postcode })}
                  style={styles.floatingInputStyle1}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',}}> Telephone</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Telephone"
                  keyboardType="numeric"      
                  // value={UserDetails.phone_no}
                    onChangeText={(phone_no) => this.setState({ phone_no })}
                  style={styles.floatingInputStyle1}
                /> 
              </View>
            </View>
            <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',}}>Choose Date</Text>
            <View style={styles.txtInput}>
            

                  <DatePicker
                  style={{width: SCREEN_WIDTH*0.70,}}
                  date={this.state.reserve_date}
                  placeholder="Date of Birth"                    
                  format="YYYY-MM-DD"                   
                  // maxDate="01-06-2060"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={calenderIcon}
                    iconSource={calenderIcon}
                    customStyles={{
                      dateIcon: {
                        left: 6,
                        height:24,width:24
                      },
                      dateInput: {
                        marginLeft: -60,
                        borderColor: 'red',
                        borderWidth: 0,
                        marginRight: 90,
                      },          
                    }}
                    onDateChange={(reserve_date) => {
                      this.setState({reserve_date});
                    }}
                  />
                          </View>

                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',}}>Choose Time</Text>


              
                    <View
                      style={{
                        borderRadius: 50,
                        marginTop: 13,
                        margin:10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                        width: SCREEN_WIDTH*0.86,
                        alignSelf:'center',
                        height: 35,
                      }}>   
                     

                        <Text
                        style={{
                          color: '#000000',
                          paddingStart: 10,
                          fontSize: 16,                          
                          fontWeight: '800',
                        }}>
                        {/* {this.state.reserve_time} */}
                        {this.state.reserve_time}
                      </Text>

                      <TouchableOpacity
                    onPress={() => this.Show_Custom_AlertForTime()}>
                      <Image
                        source={downArrow}
                        style={{
                          width: 22,
                          height: 22,
                          margin: 3,
                          marginEnd:30,
                          borderColor:'red',
                          borderWidth:0,
                          
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      />
                       </TouchableOpacity>
                    </View>                 
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderColor: 'red',
                borderWidth: 0,
                flexWrap: 'wrap',
                justifyContent:'center'
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.twotitleStyle}>City </Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="City"
                  onChangeText={(city) => this.setState({ city })}
                  
                  style={styles.floatingInputStyle1}
                />
              </View>
              <View style={{flexDirection: 'column',alignSelf:'center'}}>
              <Text style={styles.twotitleStyle}>Country</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Country"
                  onChangeText={(country) => this.setState({ country })}         
                  style={styles.floatingInputStyle1}
                />
              </View>
            </View>


                  {
                    sizeDate != '' ?
                    <Fragment>
                        <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',}}>Choose Size</Text>
                                    
                                    <View
                                      style={{
                                        borderRadius: 50,
                                        marginTop: 13,
                                        margin:10,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        borderColor: '#DDDDDD',
                                        borderWidth: 1,
                                        width: SCREEN_WIDTH*0.86,
                                        alignSelf:'center',
                                        height: 35,
                                      }}>   
                                    
              
                                        <Text
                                        style={{
                                          color: '#000000',
                                          paddingStart: 10,
                                          fontSize: 16,                          
                                          fontWeight: '800',
                                        }}>
                                        {/* {this.state.reserve_time} */}
                                        {this.state.size}
                                      </Text>
              
                                      <TouchableOpacity
                                    onPress={() => this.Show_Custom_AlertForSize()}>
                                      <Image
                                        source={downArrow}
                                        style={{
                                          width: 22,
                                          height: 22,
                                          margin: 3,
                                          marginEnd:30,
                                          borderColor:'red',
                                          borderWidth:0,
                                          
                                          alignSelf: 'flex-end',
                                          justifyContent: 'flex-end',
                                        }}
                                      />
                                      </TouchableOpacity>
                                    </View>  
                    </Fragment> 
                    :null
                  }
              
                            

            <Text style={styles.twotitleStyle}> Message Optional</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Type here...."
              style={styles.MessageInputStyle}
              onChangeText={(message) => this.setState({message})}
            />

            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',}}>I agree to respect the following conditions</Text>
           


        <Fragment>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',borderWidth:0,width:'90%'}}>
              {/* <Text style={styles.textInputHeading}>I agree to</Text>   */}
                    <View style={{flexDirection:'row',margin:0}}>
                    <CheckBox
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                  checkedIcon={
                    <FastImage
                      source={require('../../../../../assets/icon/33.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                       
                      }}
                    />
                  }
                  uncheckedIcon={
                    <FastImage
                      source={require('../../../../../assets/icon/43.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                     
                      }}
                    />
                  }
                />
                <Fragment>
                  <View style={{flexDirection:'column',marginTop:12,marginStart:-7}}>
                {
                   advertisementDetailsConditionData.map((singleCondition)=>{
                     return(
                        <View style={{flexDirection:'column'}}>                   
                                <Text    style={{
                              fontSize: 12,
                              fontWeight: '600',                              
                              
                            }}>{singleCondition.condition}</Text>
                        </View>
                     )
                   })
                 }
                 </View>
                </Fragment>
                    </View>
              </View>
                                         
            </Fragment>


            <TouchableOpacity
              style={styles.actionBtn}
              // onPress={() => this.Show_Custom_Alert()}
                onPress={()=>{this.validateUser()}}
              >
              <Text style={styles.actionBtnTxt}>Oh yes i want it!</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        </KeyboardAwareScrollView>


        <Modal
          visible={this.state.Alert_Visibility}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}>
          <View
            style={{
              // backgroundColor:'#FFF',
              backgroundColor: 'rgba(0,0,0,0.700)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height:320,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    borderWidth: 0,
                    marginTop: -50,
                  }}>
                  <Image
                    source={rightIcon}
                    style={{height: 90, width: 90, margin:5}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin: 10,
                    color: '#B87548',
                    textAlign: 'center',
                  }}>
                  Request Confirmed
                </Text>
                {/* <View >
                  <Text
                    style={{
                      fontSize: 13,
                      margin: 5,
                      textAlign: 'center',
                      fontWeight: '700',
                    }}>
                    {' '}
                   Luz - Active Wear Collection
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      margin: 5,
                      textAlign: 'center',
                      fontWeight: '700',
                    }}>
                   Brassieree + Legging
                  </Text>
                </View> */}
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  Thanks for your request, we will get
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  back to you asap with your
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  {' '}
                  confirmation!
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin: 10,
                    color: '#B87548',
                    textAlign: 'center',
                  }}>
                  With love from the Lyfe team
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  margin: 5,                 
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}
                  // onPress={()=>{this.props.navigation.navigate("Search")}}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',                    
                    justifyContent: 'center',
                    margin:0,
                    height:40
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart:40,
                      marginEnd:40,
                      fontWeight: '700',
                      textAlign: 'center',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>






        {/* model for selecting current time to time slot */}
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
                  right: 10,
                  left: 10,
                  // left: Dimensions.get('window').width*1.60,
                  top: 350,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '90%',
                    height:260,
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
                       {dateArray.map((singleDate, index) => {
                  return (
                    <ScrollView horizontal={true}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            let minutes = singleDate.getMinutes();
                            if(minutes == 0){
                              minutes = `00`;
                            }
                            this.setState({
                              reserve_time: `${singleDate.getHours()}:${minutes}`,
                            },   () => this.Hide_Custom_AlertForTime(),
                            );
                          }}>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#B87548',
                              borderWidth: 1,                              
                              alignItems:'center',
                              justifyContent: 'center',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 0.5,
                              shadowRadius: 1,
                              elevation: 1,
                              margin: 3,
                              width:SCREEN_WIDTH/3.5,
                              borderRadius:7,
                            }}>                           
                              {
                                singleDate.getMinutes() == 0 ?
                                <Text
                                style={{
                                  padding: 4,
                                  fontWeight: 'bold',
                                  color: '#000000',
                                  fontSize: 12,                                
                                  textAlign: 'center',
                                }}>{`${singleDate.getHours()} : ${singleDate.getMinutes()}0`}</Text>
                                :
                                <Text
                                style={{
                                  padding: 4,
                                  fontWeight: 'bold',
                                  color: '#000000',
                                  fontSize: 12,                                
                                  textAlign: 'center',
                                }}>{`${singleDate.getHours()} : ${singleDate.getMinutes()}`}</Text>

                              }
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  );
                })}
                  </ScrollView>
                </View>
              </View>
            </Modal>


    {/* model for size option......... */}


    <Modal
              visible={this.state.AlertBox_Visibility}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => {
                this.Show_Custom_AlertForSize(!this.state.AlertBox_Visibility);
              }}>
              <View
                style={{
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  backfaceVisibility: 'hidden',
                  flex: 1,
                  right: 10,
                  left: 10,
                  // left: Dimensions.get('window').width*1.60,
                  top: SCREEN_HEIGHT/1.4,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '90%',
                    height:100,
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
                       {sizeDate.map((singleSize, index) => {

                          console.log("getting single Size ????????????? ????????? ? ????? ? ??  ? ? ?",singleSize)

                  return (
                    <ScrollView horizontal={true}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          onPress={() => {                           
                            this.setState({
                              size: `${singleSize.product_size}`,
                            },   () => this.Hide_Custom_AlertForSize(),
                            );
                          }}>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#B87548',
                              borderWidth: 1,                              
                              alignItems:'center',
                              justifyContent: 'center',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 0.5,
                              shadowRadius: 1,
                              elevation: 1,
                              margin: 3,
                              width:SCREEN_WIDTH/3.5,
                              borderRadius:7,
                            }}>                                                                                       
                               <Text
                               style={{
                                  padding: 4,
                                  fontWeight: 'bold',
                                  color: '#000000',
                                  fontSize: 12,                                
                                  textAlign: 'center',
                                }}>
                                  {singleSize.product_size}
                                  </Text>                              
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  );
                })}
                  </ScrollView>
                </View>
              </View>
            </Modal>









      </View>
    );
  }
}
