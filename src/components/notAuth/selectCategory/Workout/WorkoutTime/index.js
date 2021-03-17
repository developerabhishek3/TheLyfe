import React, {Component, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Button,
  TextInput,
  BackHandler,
  Alert,
  TouchableHighlight,
} from 'react-native';
import styles from './indexCss';
import DatePicker from 'react-native-datepicker';
import back from '../../../../../assets/icon/back.png';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import rightIcon from '../../../../../assets/icon/33.png';
import unCheckIcon from '../../../../../assets/icon/43.png';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {Getdate_time_slots, ad_reservation,loginToken} from '../../../../../Api/afterAuth';
import {timing, cos} from 'react-native-reanimated';
import {CheckBox, Overlay} from 'react-native-elements';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let today = '';
let newDaysObject4 = [];
let combinestring = '';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null,
      isVisible: false,
      Alert_Visibility: false,
      dateArray: [],
      pickupTime: 'Pickup Time',
      dataTimes: [],
      ad_id: 0,
      ad_times: '',

      isBodyLoaded: false,
      isSpinner: true,

      reserve_date: '',
      reserve_time: '',
      message: '',
      full_name: '',
      shipping_address: '',
      postcode: '',
      phone_no: '',
      city: '',
      size:'',
      country: '',

      checked1: false,
      markedDates: '',
      markedDates_blue: '',
      ChooseDay: [],
      date1: '',
      day: '',
      showTime: '',

      isSelectedTime: false,
    };
    today = moment().format('YYYY-MM-DD');

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    //function to handle the date change
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }

  Hide_Custom_Alert() {
    this.props.navigation.navigate('Search');
    this.setState({Alert_Visibility: false});
  }

  componentDidMount() {

    this.fetchTokenData()
    const ad_id = this.props.navigation.getParam('ad_id');


   const advertisementDetailsConditionData = this.props.navigation.getParam("advertisementDetailsConditionData")
   console.log("gettingadvertisemnt constition details here-----------",advertisementDetailsConditionData)



    setTimeout(() => {
      this.setState({
        ad_id,
      });
      console.log(
        'getting advertiemt value here--------------',
        this.state.ad_id,
      );
      this.fetchDataTimeDetails();
    }, 200);

    this.showTimeSlot();
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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

  showTimeSlot = () => {
    let date = new Date();
    let dateArray = [];

    let i = 1;
    dateArray.push(new Date());
    while (i < 5) {
      date.setMinutes(date.getMinutes() + 60);
      dateArray.push(new Date(date));
      i++;
    }
    this.setState({dateArray});
  };

  fetchDataTimeDetails = async () => {
    const {ad_id} = this.state;
    const datetimeResponse = await Getdate_time_slots({
      ad_id,
    });
    if (datetimeResponse.result === true) {
      console.log(
        'gettig data and time according to the value---------',
        datetimeResponse,
      );
      var dataTimes = datetimeResponse.response.date_time_slot;

      var obj1 = datetimeResponse.response.date_time_slot;
      console.log('resoJSon GetVehicle obj===' + obj1);
      var count1 = Object.keys(obj1).length;

      for (var i = 0; i < count1; i++) {
        // var dates;
        // var startdates = moment(obj1[i].startDate).format("YYYY-MM-DD");
        console.log('Available Date ' + obj1[i].ad_dates);

        var pay = obj1[i].ad_dates;
        newDaysObject4[i] = pay;
      }
      var posttt = newDaysObject4;

      posttt.forEach((day) => {
        this.state.markedDates = {
          ...this.state.markedDates,
          [day]: {
            selected: true,
            selectedColor: '#c2a08a',
          },
        };
      });

      var posttt2 = newDaysObject4;
      console.log('Post Data:@@@::' + posttt2);

      posttt2.forEach((day) => {
        this.state.markedDates_blue = {
          ...this.state.markedDates_blue,
          [day]: {
            selected: true,
            selectedColor: '#c2a08a',
          },
        };
      });

      this.setState({
        isBodyLoaded: true,
        isSpinner: false,
        dataTimes,
      });
      // console.log('on the state-----------------', dataTimes);
    } else {
      this.setState({isBodyLoaded: false, isSpinner: false}, () => {
        Alert.alert('Message', 'Something Went Wrong Try Again!', [
          {
            text: 'Okay',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      });
    }
    return;
  };

  showCustomDate = () => {
    this.state.dataTimes.map((singleDate) => {
      if (this.state.ad_id === singleDate.ad_id) {
        return (
          <View>
            <Text>{singleDate.ad_dates} </Text>
          </View>
        );
      }
    });
  };

  ad_reservationFunction =  async () => {
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
      message,
      full_name,
      shipping_address,
      postcode,
      phone_no,
      city,
      country,
      size
    });
    if (ad_reservationResponse.result == true) {
        
        console.log("Message for status >>>>>>>>>>>>>>>>>>",ad_reservationResponse.response.status)
          if(ad_reservationResponse.response.status == false) {          
            // console.log("getting result inside the method.........")
           
            Alert.alert("Message",ad_reservationResponse.response.message)            
          }
          else {
          // Alert.alert("Message",ad_reservationResponse.response.message)
           this.Show_Custom_Alert()
          }

    } else {
      this.myAlert('Error', ad_reservationResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {reserve_date, reserve_time, checked1} = this.state;
    if (reserve_date.length == 0) {
      this.myAlert('Message', 'Please Select your reserve date!');
    } else if (reserve_time.length == 0) {
      this.myAlert('Message', 'Please Select your reserve time!');
    } else if (!checked1) {
      this.myAlert('Message', 'Please do agree the condition!');
    } else {
      //   const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      //   if (!telephone_no.match(mobileformat)) {
      //     this.myAlert('Message', 'Invalid telephone_no');
      //     return false;
      //   }
      this.ad_reservationFunction();
    }
  };

  set_date = (day) => {
    console.log('getting inside the funcation-=------------', day);
    const d = moment(day.dateString).format('YYYY-MM-DD');
    this.setState({reserve_date: d});
    console.log('Selected Date ', d);

    console.log('Selected Marked Date ', this.state.markedDates);

    if (!this.state.markedDates[d]) {
      Alert.alert('Message', 'Please select from the available dates!');
    } else {
      let showTime = [];
      this.setState({ChooseDay: ''});
      if (this.state.markedDates_blue[d]) {
        const color = '#B87548';

        const markedDates_blue = {
          ...this.state.markedDates_blue,
          [d]: {
            ...this.state.markedDates_blue[d],
            selectedColor: color,
          },
        };

        this.setState({markedDates: markedDates_blue});
      }
      this.state.dataTimes.map((singleDate, index) => {
        if (singleDate.ad_dates === d) {
          showTime = singleDate.ad_times;
          var TimeValue = singleDate.ad_times.split(',');

          console.log('getting here or not ----------', TimeValue);
          this.setState({ChooseDay: TimeValue});
        }
        console.log('getting specific time here-------', showTime);
      });
    }
  };

  selectTimeByChangeColor = () => {
    this.state.ChooseDay.map((singleTime) => {
      return (
        (
          <View
            style={{
              borderColor: 'red',
              borderWidth: 1,
              backgroundColor: '#FFFFFF',
              backgroundColor: 'red',
              flexDirection: 'row',
              margin: 10,
            }}>
            <Text
              style={{
                borderColor: 'red',
                color: 'yellow',
                borderWidth: 1,
                margin: 4,
                marginStart: 7,
                marginEnd: 7,
              }}>
              {singleTime}{' '}
            </Text>
          </View>
        ),
        this.setState({reserve_time: singleTime})
      );
    });
  };

  render() {
    const headerText = this.props.navigation.getParam('headerTxt');
    const advertisementDetailsConditionData = this.props.navigation.getParam("advertisementDetailsConditionData")
    // const {dateArray} = this.state;
    // const {selectedStartDate, selectedEndDate} = this.state;
    // const minDate = new Date(2018, 1, 1); // Min date
    // const maxDate = new Date(2050, 6, 3); // Max date
    // const startDate = selectedStartDate ? selectedStartDate.toString() : ''; //Start date
    // const endDate = selectedEndDate ? selectedEndDate.toString() : ''; //End date
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backStyle} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>{headerText}</Text>
          <Text style={styles.headerTxt}> </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              margin: 10,
              fontFamily: 'Arial',
            }}>
            Choose Date and Hour
          </Text>
        </View>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View style={{borderWidth:0}}>
          <View style={{borderRadius:20,width:'90%',alignSelf:'center',borderWidth:0}}>
            <Calendar
              style={{
                marginTop: 0,
                width: '100%',
                alignSelf: 'center',
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginBottom:0,
              }}
              minDate={today}
              onDayPress={(day) => this.set_date(day)}
              markedDates={this.state.markedDates}
              theme={{
                backgroundColor: '#98AFC7',
                calendarBackground: '#98AFC7',
                textSectionTitleColor: '#000000',
                textSectionTitleDisabledColor: '#000000',
                dayTextColor: '#000000',
                dotColor: 'red',
                selectedDotColor: 'red',
                // todayTextColor: '#000000',
                todayTextColor: 'red',
                arrowColor: '#000000',                
                indicatorColor: 'blue',
              }}
            />
          </View>
          <View
              style={{
                flexWrap: 'wrap',
                borderColor: 'blue',
                borderWidth: 0,
                flexDirection: 'row',
                width: '90%',
                margin: 3, 
                marginTop:-4,                         
                backgroundColor: '#98AFC7',
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                height:70,
                alignSelf:'center'

              }}>
              <ScrollView horizontal={true}>
                {this.state.ChooseDay != null ? (
                  <View style={{flexDirection: 'row'}}>
                    {this.state.ChooseDay.map((singleTime) => {
                      return (
                        <View style={{flexDirection: 'row', margin: 5}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({reserve_time: singleTime});
                            }}>
                            {this.state.reserve_time == singleTime ? (
                              <View
                                style={{
                                  borderColor: '# ',
                                  borderWidth: 1,
                                  backgroundColor:'#c29a74',
                                  flexDirection: 'row',
                                  margin: 4,
                                  borderRadius:7,
                                }}>
                                <Text
                                  style={{
                                    borderWidth: 0,
                                    margin: 4,
                                    marginStart: 3,
                                    marginEnd: 3,
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                  }}>
                                  {singleTime}{' '}
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderColor: '#B87548',
                                  borderWidth: 1,
                                  backgroundColor: '#FFFFFF',
                                  flexDirection: 'row',
                                  margin: 4,
                                  borderRadius:7,
                                }}>
                                <Text
                                  style={{
                                    borderWidth: 0,
                                    margin: 4,
                                    marginStart:3,
                                    marginEnd: 3,
                                    color: '#B87548',
                                    fontWeight: '700',
                                  }}>
                                  {singleTime}{' '}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </ScrollView>
            </View>
            </View>
          <View style={styles.contentView}>
            {/* <View style={styles.calenderViewStyle}> */}

           
            <View style={styles.textInputView}>
              <Text style={styles.textInputHeading}>Message (Optional)</Text>
              <TextInput
                onChangeText={(message) => this.setState({message})}
                textAlignVertical="top"
                style={styles.textInputStyle}
                placeholder="Type here...."
                placeholderTextColor="gray"
              />
            </View>
            <Fragment>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',borderWidth:0,width:'90%'}}>
              <Text style={styles.textInputHeading}>I agree to respect the following conditions</Text>  
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
          </View>
          <TouchableOpacity
            style={styles.actionBtn}
            // onPress={() => this.Show_Custom_Alert()}
            onPress={() => {
              this.validateUser();
            }}>
            <Text style={styles.actionBtnTxt}>Oh yes i want it!</Text>
          </TouchableOpacity>
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
              backgroundColor: 'rgba(0,0,0, 0.4)',
              backfaceVisibility: 'hidden',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: 320,
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
                  <FastImage
                    source={rightIcon}
                    style={{height: 90, width: 90, margin: 5}}
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
              <View style={{marginTop:30}}>                 
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{                    
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    margin: 10,
                    justifyContent: 'center',                    
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      margin: 10,
                      marginStart:40,
                      marginEnd:40,
                      fontWeight: '700',
                      alignSelf:'center',
                      textAlign: 'center',                      
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
