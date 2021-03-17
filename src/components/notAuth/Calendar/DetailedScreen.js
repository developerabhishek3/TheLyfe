import React, {Component, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  BackHandler,
  Alert,
  Modal,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import styles from './indexCss2';
import Spinner from 'react-native-loading-spinner-overlay';
import back from '../../../assets/icon/back.png';
import location from '../../../assets/icon/28.png';
import insta from '../../../assets/icon/27.png';
import workout from '../../../assets/icon/Explorer/workout.jpeg';
import FastImage from 'react-native-fast-image';
import foodMenu from '../../../assets/icon/shopping-basket.png';
import ReadMore from 'react-native-read-more-text';
import {
  GetAdvertisementDetails,
  CancelReservation,
  TriggeredAcceptRejectAppoinment,
  loginToken
} from '../../../Api/afterAuth';
import rightIcon from '../../../assets/icon/64.png';
import NOImage from '../../../assets/noImage.png'
import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage'
import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad_id: '',
      appointment_id: '',
      advertisementDetailsData: [],

      advertisementDetailsConditionData: [],
      advertisementDetailsad_datetimeData: [],
      advertisementDetailsad_rewardsData: [],

      advertisementDetailsad_infoData: [],


      advertisementDetailsad_galleryData:[],
      advertisementDetailsad_product_sizeData:[],
      isBodyLoaded: false,
      isSpinner: true,
      myInteger: 0,
      reschedule_status: '',
      reject_message:"",
      cancel_message :"",


      lat_longValue:'',
      latValue:0,
      longValue:0,

      currentLatitudeValue:0,
      currentLongitudeVAlue:0,

      Model_Visibility: false,
      Alert_Visibility: false,

      ModelVisible: false,
      AlertVisible: false,

      ModelVisible1: false,
      AlertVisible1: false,
    };
  }

  //  here all the custome detail vale

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('Search');
  }

  // Show_Custom_AlertForTime(visible) {
  //   this.setState({Model_Visibility: visible});
  // }

  // Hide_Custom_AlertForTime() {
  //   this.setState({Model_Visibility: false});
  // }

  Show_Custom_Alert1(visible) {
    this.setState({AlertVisible: visible});
  }
  Hide_Custom_Alert1() {
    this.setState({AlertVisible: false});
    // this.props.navigation.navigate('Search');
  }

  Show_Custom_Alert2(visible) {
    this.setState({AlertVisible1: visible});
  }
  Hide_Custom_Alert2() {
    this.setState({AlertVisible1: false});
    // this.props.navigation.navigate('Search');
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
  componentDidMount = async () => {

    this.fetchTokenData()

  const currentLatitude = await AsyncStorage.getItem('currentLatitude');
  const currentLongitude = await AsyncStorage.getItem('currentLongitude');

  console.log("getting here------",currentLatitude)

  const currentLatitudeValue = JSON.parse(currentLatitude);
  const currentLongitudeVAlue = JSON.parse(currentLongitude)

  this.setState({ currentLatitudeValue, currentLongitudeVAlue})

  console.log("getting inside the did mount lat long--------------------",this.state.currentLatitudeValue,this.state.currentLongitudeVAlue)




    const advertisementId = this.props.navigation.getParam('Id');
    const appntId = this.props.navigation.getParam('appointment_id');
    console.log('gettin appointent id here-----------', appntId);
    const status = this.props.navigation.getParam('reschedule_status');

    // console.log("gettign all details from the previous screen-----",bgImg,categoryName,companyName,requestDate,status)

    // console.log("getting visit to place value here-----------",visit_to_place)

    this.setState({
      ad_id: advertisementId,
    });
    setTimeout(() => {
      this.setState({
        appointment_id: appntId,
        reschedule_status: status,
      });
      console.log(
        'getting advertiemt value here--------------',
        this.state.ad_id,
        this.state.reschedule_status,
      );
      this.fetchAdvertisementDetails();
    }, 200);

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

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

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{color: '#B87548', marginTop: 5, fontWeight: '700'}}
        onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{color: '#B87548', marginTop: 5, fontWeight: '700'}}
        onPress={handlePress}>
        Show less
      </Text>
    );
  };

  fetchAdvertisementDetails = async () => {
   
    const {ad_id} = this.state;
    const AdvertisementDetailsResponse = await GetAdvertisementDetails({
      ad_id,
    });
    if (AdvertisementDetailsResponse.result === true) {
      // console.log("getting response  here------------",AdvertisementDetailsResponse.response)
      var lat_longValue = AdvertisementDetailsResponse.response.lat_long

      
      var values = lat_longValue.split('-');
      var latValue = values[0];
      var longValue = values[1]


      var advertisementDetailsConditionData =
        AdvertisementDetailsResponse.response.ad_conditions;
      var advertisementDetailsad_datetimeData =
        AdvertisementDetailsResponse.response.ad_datetime;
      var advertisementDetailsad_rewardsData =
        AdvertisementDetailsResponse.response.ad_rewards;
      var advertisementDetailsad_infoData =
        AdvertisementDetailsResponse.response.ad_info;
        var advertisementDetailsad_galleryData =
        AdvertisementDetailsResponse.response.ad_gallery;
        var advertisementDetailsad_product_sizeData =
         AdvertisementDetailsResponse.response.ad_product_size;
      

      this.setState({
        isBodyLoaded: true,
        isSpinner: false,
        advertisementDetailsConditionData,
        advertisementDetailsad_datetimeData,
        advertisementDetailsad_rewardsData,
        advertisementDetailsad_infoData,
        advertisementDetailsad_galleryData,
        advertisementDetailsad_product_sizeData,
        lat_longValue,
        latValue,
        longValue
      });
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


  _goToYosemite() {
    console.log("getting lat long ere---------",this.state.latValue)
    const {latValue,longValue} = this.state;
    openMap({ latitude:  37.865101, longitude: -119.538330 });
  }


  fetchCancelReservation = async () => {
    // console.log(
    //   'getting inside the function------- --------',
    //   this.state.ad_id,
    // );
    const {appointment_id,cancel_message } = this.state;
    console.log("getting console for cancel-----------",cancel_message)
    const CancelReservationResponse = await CancelReservation({
      appointment_id,  
      cancel_message     
    });
    if (CancelReservationResponse.result == true) {

      if(CancelReservationResponse.response.status == true)
     {   
      console.log(
        'getting response here---------------',
        CancelReservationResponse.response,
      );
      Alert.alert('Message', CancelReservationResponse.response.message);
      this.props.navigation.navigate('Home');
      this.setState({
        isBodyLoaded: true,
        isSpinner: false,
      });
    } 
    else {
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
     }
    else {
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


  
  fetchAcceptAppoinment = async () => {
    const {appointment_id,  reject_message} = this.state;
    const AcceptRejectAppoinmentResponse = await TriggeredAcceptRejectAppoinment(
      {
        appointment_id,
        reschedule_status: 1,
        reject_message
      },
    );
    if (AcceptRejectAppoinmentResponse.result == true) {

      if(AcceptRejectAppoinmentResponse.response.status == true) {
        console.log(
          'getting response here---------------',
          AcceptRejectAppoinmentResponse.response.message,
        );
        Alert.alert('Message', AcceptRejectAppoinmentResponse.response.message);
        this.props.navigation.navigate('Home');
        this.setState({
          isBodyLoaded: true,
          isSpinner: false,
        });

      }
      else {
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

  fetchRejectAppoinment = async () => {
    const {appointment_id,reject_message} = this.state;
    console.log("getting inside the reject function-------------",reject_message)
    const AcceptRejectAppoinmentResponse = await TriggeredAcceptRejectAppoinment(
      {
        appointment_id,
        reschedule_status: 0,
        reject_message
      },
    );
    if (AcceptRejectAppoinmentResponse.result === true) {

      if(AcceptRejectAppoinmentResponse.response.status == true) { 
        console.log(
          'getting response here---------------',
          AcceptRejectAppoinmentResponse.response,
        );
        Alert.alert('Message', AcceptRejectAppoinmentResponse.response.message);
        this.props.navigation.navigate('Home');
        this.setState({
          isBodyLoaded: true,
          isSpinner: false,
        });
      }
      else {
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
  _renderItem ({item, index}) {
    return (
      <View style={{flex:1,borderWidth:0}}>
          <FastImage 
            resizeMode="cover"
             source={{
              uri: `https://www.thelyfe.fr/${item.image_path}`,
            }}            
            style={styles.imgStyle} />
        </View>
  );}









// here for map



openMap() {
  console.log("Current lat map%%%" + this.state.currentLatitudeValue);
  console.log("Current lng map%%%" + this.state.currentLongitudeVAlue);
  
  console.log("Current dest lat map%%%" + this.state.latValue);
  console.log("Current dest lng map%%%" + this.state.longValue);
  
  var s_lat_val = this.state.currentLatitudeValue;
  var s_lng_val = this.state.currentLongitudeVAlue;
  
  var d_lat_val = this.state.latValue;
  var d_lng_val = this.state.longValue;
  
  Platform.select({
  ios: () => {
  Linking.openURL('http://maps.google.com/maps?saddr=' + s_lat_val + ',' + s_lng_val + '&daddr=' + d_lat_val + ',' + d_lng_val);
  },
  android: () => {
  Linking.openURL('http://maps.google.com/maps?saddr=' + s_lat_val + ',' + s_lng_val + '&daddr=' + d_lat_val + ',' + d_lng_val);
  }
  })();
  
  }










  render() {

    console.log('getting lat long value --------', this.state.latValue,"-----------",this.state.longValue);

    const advertisementId = this.props.navigation.getParam('Id');
    const bgImg = this.props.navigation.getParam('bgImg');
    const categoryName = this.props.navigation.getParam('categoryName');
    const companyName = this.props.navigation.getParam('companyName');

    const requestDate = this.props.navigation.getParam('requestDate');
    const reschedule_date = this.props.navigation.getParam('reschedule_date');
    const status = this.props.navigation.getParam('status');

    const reserve_time = this.props.navigation.getParam('reserve_time');
    const reschedule_time = this.props.navigation.getParam('reschedule_time');





    const reschedule_status = this.props.navigation.getParam(
      'reschedule_status',
    );

    const {
      advertisementDetailsConditionData,
      advertisementDetailsad_datetimeData,
      advertisementDetailsad_rewardsData,
      advertisementDetailsad_infoData,
      advertisementDetailsad_product_sizeData,
  
    } = this.state;
    const adInfoMap = Object.assign(advertisementDetailsad_infoData);
    //  console.log("getting adinfomap value --------",adInfoMap)

    const visit_to_place = this.props.navigation.getParam('visit_to_place');

    const headerTxt = this.props.navigation.getParam('category_name');
    // const advertisementDetailsDataMap = Object.assign(advertisementDetailsData)

    // console.log("getting indie the render---------------",advertisementDetailsConditionData)

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        {
          Platform.OS === "android"?
          <StatusBar
            barStyle="light-content"
            hidden={false}
           backgroundColor="#c29a74"
            translucent={true}
          />: null
        }      
        {/* <View style={styles.ImgView}>
          <FastImage
            source={{
              uri: `https://www.thelyfe.fr/${bgImg}`,
            }}
            // source={workout}
            style={styles.imgStyle}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={back} style={styles.backStyle} />
              </TouchableOpacity>
              <Text style={styles.headerTxt}>{categoryName}</Text>
              <Text style={styles.headerTxt}> </Text>
            </View>
          </FastImage>
        </View> */}




        <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={back} style={styles.backStyle} />
              </TouchableOpacity>
              <Text style={styles.headerTxt}>{categoryName}</Text>
              <Text style={styles.headerTxt}> </Text>
            </View>                 
              <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.advertisementDetailsad_galleryData}
              renderItem={this._renderItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH*0.86}
              showSpinner={true}
              spinnerColor={'red'}
              showsHorizontalScrollIndicator={true}
              indicatorStyle="white"
              // activeSlideOffset={true}
            />

        <View style={styles.contentView}>
          <ScrollView>
            {this.state.isBodyLoaded === true ? (
              <View style={styles.contentConteinrView}>
                <Text style={styles.containerHeader}>{companyName}</Text>
                <TouchableOpacity                                               
                                onPress={()=>{this.openMap()}}
                >
                <View style={styles.subheader}>
                  <Image source={location} style={styles.subheaderImg} />
                  <Text numberOfLines={1} style={styles.containerTxt}>
                    {adInfoMap.address}
                  </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                      onPress={() => Linking.openURL(`https://www.instagram.com/${adInfoMap.instagram_name}`) }
                    >
                <View style={{flexDirection:'row',marginStart:0,marginEnd:20,margin:5}}>
                        <FastImage source={insta} style={{
                            height:15,
                            width:15,
                            margin:1,
                            marginStart:18
                        }} />
                        <Text style={styles.containerTxt}>{adInfoMap.instagram_name}</Text>
                    </View>
                        </TouchableOpacity>
                  
                      <Fragment>
                      {advertisementDetailsad_product_sizeData.length > 0 ? (
                        <Fragment>
                          {advertisementDetailsad_product_sizeData.map(
                            (product_size) => {
                              return (
                                <View >
                           <View style={styles.rewardTxtView}>
                             <View style={styles.rewardDot} />
                             <Text style={{ fontWeight:'700',fontSize:12}}>
                               {product_size.product_size}
                             </Text>
                           </View>
                         </View>
                              );
                            },
                          )}
                        </Fragment>
                      ) : null}
                      </Fragment>                            


              {adInfoMap.menu_image != '' ? (
                    <Fragment>
                      <View
                        style={{
                          flexDirection: 'row',                          
                          borderWidth: 0,
                          width: '99%',
                          alignSelf: 'center',
                        }}>
                        <View style={{flexDirection: 'column'}}>
                          {/* <Text style={styles.containerSubHeading}>
                            Menu Link{' '}
                          </Text> */}

                          {
                              adInfoMap.category_name === `Restaurants` || adInfoMap.category_name === `Take Away` ?

                              <Text style={styles.containerSubHeading}>
                              Menu Link{' '}
                            </Text>
                            :
                            <Text style={styles.containerSubHeading}>
                            Product Link{' '}
                          </Text>
                          } 

                          {/* <Text>{ adInfoMap.menu_url}</Text> */}

                          <TouchableOpacity
                            // onPress={() => Linking.openURL(`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)${adInfoMap.menu_url}`) }
                            onPress={() =>
                              Linking.openURL(`${adInfoMap.menu_url}`)
                            }
                            style={{borderWidth: 0}}>
                            <View
                              style={{
                                borderWidth: 0,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '65%',
                              }}>
                              <FastImage
                                source={foodMenu}
                                style={{
                                  height: 25,
                                  width: 25,
                                  marginTop: -3,
                                  marginStart: 25,
                                  margin:5,
                                  marginEnd:10
                                }}
                              />
                              <Text
                                style={{
                                  paddingStart: 18,
                                  width: '95%',
                                  marginTop: -5,
                                  borderWidth: 0,
                                  paddingEnd: 7,
                                }}
                                numberOfLines={1}>
                                {/* {adInfoMap.menu_url} */}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={styles.actionBtn2}
                          onPress={() => {
                            this.props.navigation.navigate('fashion1', {
                              categoryName: adInfoMap.category_name,
                              imgUrl: adInfoMap.menu_image,
                            });
                          }}>
                          <Text style={styles.actionBtnTxt2}>View Web Menu</Text>
                        </TouchableOpacity>
                      </View>
                    </Fragment>
                  ) : null}


                <View style={styles.subheader}>
                  {status != `Reschedule` ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={1}
                        style={{paddingStart: 30, fontSize: 12}}>
                        {requestDate}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{paddingStart: 30, fontSize: 12}}>
                        {reserve_time}
                      </Text>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={1}
                        style={{paddingStart: 30, fontSize: 12}}>
                        {reschedule_date}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{paddingStart: 30, fontSize: 12}}>
                        {reschedule_time}
                      </Text>
                    </View>
                  )}
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#B87548',
                      fontSize: 14,
                      paddingStart: 20,
                      fontWeight: '700',
                    }}>
                    {status}
                  </Text>
                </View>

                <Text style={styles.containerSubHeading}>Details </Text>
                {this.state.ad_id === adInfoMap.id ? (
                  <View
                    style={{margin: 5, paddingStart: 15, alignSelf: 'center'}}>
                    <ReadMore
                      numberOfLines={3}
                      renderTruncatedFooter={this._renderTruncatedFooter}
                      renderRevealedFooter={this._renderRevealedFooter}>
                      <Text style={styles.containerTxt} numberOfLines={3}>
                        {adInfoMap.detail}
                      </Text>
                    </ReadMore>
                  </View>
                ) : null}

                {advertisementDetailsad_rewardsData.length > 0 ? (
                  <Fragment>
                    <Text style={styles.containerSubHeading}>Rewards </Text>
                    {this.state.ad_id == adInfoMap.id ? (
                      <Fragment>
                        {advertisementDetailsad_rewardsData.map(
                          (singleRewardMap) => {
                            //   console.log("getting -----------------------------",singleRewardMap)

                            return (
                              <View>
                                <View style={styles.rewardTxtView}>
                                  <View style={styles.rewardDot} />
                                  <Text style={styles.containerTxt}>
                                    {singleRewardMap.reward}
                                  </Text>
                                </View>
                              </View>
                            );
                          },
                        )}
                      </Fragment>
                    ) : null}
                  </Fragment>
                ) : null}
                {
                  advertisementDetailsConditionData.length > 0 ?
                  <View style={{paddingBottom:90}}>
                    <Text style={styles.containerSubHeading}>Conditions </Text>
                    {this.state.ad_id == adInfoMap.id ? (
                      <Fragment>
                        {advertisementDetailsConditionData.map(
                          (singleConditionMap) => {                           
                              return (
                                <View>
                                  <View style={styles.rewardTxtView}>
                                    <View style={styles.rewardDot} />
                                    <Text style={styles.containerTxt}>
                                      {singleConditionMap.condition}
                                    </Text>
                                  </View>
                                </View>
                              );
                            }                          
                        )}
                      </Fragment>
                     ) : null} 
                  </View>
                  :null
                }        
              </View>
            ) : null}
          </ScrollView>
          <Fragment>
            <View
              style={{
                position: 'absolute',
                left: 20,
                bottom: 20,
                right: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: 'red',
                  borderWidth: 0,
                  width: '96%',
                  marginTop: SCREEN_HEIGHT / 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                {status != `Reschedule` && status != `Cancelled` ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.Show_Custom_Alert();
                    }}
                    style={styles.actionBtn}>
                    <Text style={styles.actionBtnTxt2}>Cancel reservation</Text>
                  </TouchableOpacity>
                ) : (
                  <Fragment>
                    {reschedule_status == `Waiting` ? (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.Show_Custom_Alert1();
                          }}
                          style={styles.actionBtn}>
                          <Text style={styles.actionBtnTxt}>Accept </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.Show_Custom_Alert2();
                          }}
                          style={styles.actionBtn}>
                          <Text style={styles.actionBtnTxt}>Reject </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </Fragment>
                )}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    this.props.navigation.navigate('contact');
                  }}>
                  <Text style={styles.actionBtnTxt}>Contact us</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Fragment>
        </View>

        {/* coding here for the model testing........... */}

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
                height: SCREEN_HEIGHT /1.7,
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
                    fontFamily: 'Arial',
                  }}>
                  Cancel Reservation
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  Are you sure you want
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  to cancel reservation ?
                </Text>
              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',margin:7,marginStart:10,width:'97%'}}>
              <Text style={{alignSelf:'flex-start',margin:3,marginStart:15}} >Message (Optional)</Text>
              <View style={{borderColor:"#DDDDDD",borderWidth:1,width:'90%',height:80,alignSelf:'center',margin:7}}>                 
                  <TextInput 
                      textAlignVertical="top"
                      
                      onChangeText={(cancel_message) => this.setState({cancel_message})}
                      numberOfLines={3}
                      style={{paddingStart:7,width:'90%',height:80}}
                  />  
              </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  margin: 5,                
                }}>
                <TouchableOpacity
                  onPress={() => this.fetchCancelReservation()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* model for accept */}
        <Modal
          visible={this.state.AlertVisible}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert1(!this.state.AlertVisible);
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
                height: SCREEN_HEIGHT/2.6,
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
                    fontFamily: 'Arial',
                  }}>
                  Accept Appointent
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  Are you sure you want
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  to Accept reservation ?
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',

                  margin: 5,
                }}>
                <TouchableOpacity
                  onPress={() => this.fetchAcceptAppoinment()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert1()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* model for reject  */}

        <Modal
          visible={this.state.AlertVisible1}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert2(!this.state.AlertVisible1);
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
                height: SCREEN_HEIGHT /1.9,
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
                    fontFamily: 'Arial',
                  }}>
                  Reject Appointent
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  Are you sure you want
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    margin: 2,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontFamily: 'Arial',
                  }}>
                  to Reject reservation ?
                </Text>
              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',margin:7,marginStart:10,width:'97%'}}>
              <Text style={{alignSelf:'flex-start',margin:3,marginStart:15}} >Message (Optional)</Text>
              <View style={{borderColor:"#DDDDDD",borderWidth:1,width:'90%',height:80,alignSelf:'center',margin:7}}>                 
                  <TextInput 
                      textAlignVertical="top"
                      onChangeText={(reject_message) => this.setState({reject_message})}
                      numberOfLines={3}
                      style={{paddingStart:7,width:'90%',height:80}}
                  />  
              </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth:0,
                  alignSelf:'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  margin: 5,
                  
                }}>
                <TouchableOpacity
                  onPress={() => this.fetchRejectAppoinment()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert2()}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor:'#c29a74',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Arial',
                    }}>
                    No
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
