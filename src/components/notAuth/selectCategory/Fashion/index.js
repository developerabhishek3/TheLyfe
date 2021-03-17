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
  Dimensions,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './indexCss';
import Spinner from 'react-native-loading-spinner-overlay';
import back from '../../../../assets/icon/back.png';
import location from '../../../../assets/icon/28.png';
import insta from '../../../../assets/icon/27.png';
import NOImage from '../../../../assets/noImage.png';
import {GetAdvertisementDetails, loginToken,CheckAccountStatus} from '../../../../Api/afterAuth';
import ReadMore from 'react-native-read-more-text';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


import { WebView } from 'react-native-webview'
import foodMenu from '../../../../assets/icon/shopping-basket.png';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad_id: '',
      advertisementDetailsData: [],
      advertisementDetailsConditionData: [],
      advertisementDetailsad_datetimeData: [],
      advertisementDetailsad_rewardsData: [],
      advertisementDetailsad_infoData: [],

      advertisementDetailsad_galleryData: [],
      advertisementDetailsad_product_sizeData: [],

      lat_longValue: '',
      latValue: 0,
      longValue: 0,

      currentLatitudeValue: 0,
      currentLongitudeVAlue: 0,

      isBodyLoaded: false,
      isSpinner: true,
      myInteger: 0,
    };
  }

  componentDidMount = async () => {
    this.fetchTokenData();
    const currentLatitude = await AsyncStorage.getItem('currentLatitude');
    const currentLongitude = await AsyncStorage.getItem('currentLongitude');

    console.log('getting here------', currentLatitude);

    const currentLatitudeValue = JSON.parse(currentLatitude);
    const currentLongitudeVAlue = JSON.parse(currentLongitude);

    this.setState({currentLatitudeValue, currentLongitudeVAlue});

    console.log(
      'getting inside the did mount lat long--------------------',
      this.state.currentLatitudeValue,
      this.state.currentLongitudeVAlue,
    );

    const advertisementId = this.props.navigation.getParam('Id');
    const visit_to_place = this.props.navigation.getParam('visit_to_place');

    console.log('getting visit to place value here-----------', visit_to_place);

    this.setState({
      ad_id: advertisementId,
    });
    setTimeout(() => {
      console.log(
        'getting advertiemt value here--------------',
        this.state.ad_id,
      );
      this.fetchAdvertisementDetails();
    }, 200);

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
  fetchTokenData = async () => {
    const LoginTokenResponse = await loginToken();
    if (LoginTokenResponse.result == true) {
      if (LoginTokenResponse.response != '') {
        let keys = ['token'];
        AsyncStorage.multiRemove(keys);
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(LoginTokenResponse.response.my_token),
        );
        console.log('getting inside the follow condition------------');

        // this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('login');
        console.log('getting inside the else constion condition------------');
      }
      console.log(
        'gettin response here-----------',
        LoginTokenResponse.response,
      );
      // await AsyncStorage.setItem("token",JSON.stringify(LoginTokenResponse.response));
    } else {
      console.log(
        '---------------------------------------------',
        LoginTokenResponse.error,
      );
    }
  };
  fetchAdvertisementDetails = async () => {
    // console.log(
    //   'getting inside the function------- --------',
    //   this.state.ad_id,
    // );
    const {ad_id} = this.state;
    const AdvertisementDetailsResponse = await GetAdvertisementDetails({
      ad_id,
    });
    if (AdvertisementDetailsResponse.result == true) {
      var lat_longValue = AdvertisementDetailsResponse.response.lat_long;

      var values = lat_longValue.split('-');
      var latValue = values[0];
      var longValue = values[1];

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

      console.log(
        'getting url here ot not >>>>>',
        AdvertisementDetailsResponse.response.ad_info,
      );

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
        longValue,
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

  // _renderItem ({item, index}) {
  //   this.state.advertisementDetailsad_galleryData.map((item)=>{
  //     return(

  //     )
  //   })
  // }

  _renderItem({item, index}) {
    return (
      <View style={{flex: 1, borderWidth: 0}}>
        <FastImage
          resizeMode="cover"
          source={{
            uri: `https://www.thelyfe.fr/${item.image_path}`,
          }}
          style={styles.imgStyle}
        />
      </View>
    );
  }

  openMap() {
    console.log('Current lat map%%%' + this.state.currentLatitudeValue);
    console.log('Current lng map%%%' + this.state.currentLongitudeVAlue);

    console.log('Current dest lat map%%%' + this.state.latValue);
    console.log('Current dest lng map%%%' + this.state.longValue);

    var s_lat_val = this.state.currentLatitudeValue;
    var s_lng_val = this.state.currentLongitudeVAlue;

    var d_lat_val = this.state.latValue;
    var d_lng_val = this.state.longValue;

    Platform.select({
      ios: () => {
        Linking.openURL(
          'http://maps.google.com/maps?saddr=' +
            s_lat_val +
            ',' +
            s_lng_val +
            '&daddr=' +
            d_lat_val +
            ',' +
            d_lng_val,
        );
      },
      android: () => {
        Linking.openURL(
          'http://maps.google.com/maps?saddr=' +
            s_lat_val +
            ',' +
            s_lng_val +
            '&daddr=' +
            d_lat_val +
            ',' +
            d_lng_val,
        );
      },
    })();
  }


























  fetchAccountStatusDetails = async () => {

    const advertisementId = this.props.navigation.getParam('Id');
    const visit_to_place = this.props.navigation.getParam('visit_to_place');
    const headerTxt = this.props.navigation.getParam('category_name');

    const adInfoDetails = this.state.advertisementDetailsad_infoData

    const advertisementDetailsConditionData  = this.state.advertisementDetailsConditionData;
    const advertisementDetailsad_product_sizeData  = this.state.advertisementDetailsad_product_sizeData ;   
    
    


    console.log("getting condition data ??????????",advertisementDetailsConditionData)
    console.log("getting Size data ??????????",advertisementDetailsad_product_sizeData)

    console.log("getting adinfodetails??????????????",adInfoDetails.visit_to_place)

    const userId = await AsyncStorage.getItem('user_id');    
    const user_id = JSON.parse(userId)
    console.log("getting user id inside the functin?????????????",user_id)
    const {ad_id} = this.state;
    const CheckAccountStatusResponse = await CheckAccountStatus({
      user_id,
    });
    if (CheckAccountStatusResponse.result == true) {
      console.log("getting response here-------------",CheckAccountStatusResponse.response.message)
          if(CheckAccountStatusResponse.response.status == true) {
            {
              adInfoDetails.visit_to_place == 'yes'
                ? this.props.navigation.navigate('workouttime', {
                    headerTxt,
                    ad_id: this.props.navigation.getParam('Id'),
                    advertisementDetailsConditionData: advertisementDetailsConditionData,
                    sizeData:advertisementDetailsad_product_sizeData
                  })
                : this.props.navigation.navigate(
                    'fahsiondetails',
                    {
                      headerTxt,
                      ad_id: this.props.navigation.getParam('Id'),
                      advertisementDetailsConditionData: advertisementDetailsConditionData,
                      sizeDate:advertisementDetailsad_product_sizeData
                    },
                  );
            }
      } 
      else{
        console.log("getting response on the else side  here------------",CheckAccountStatusResponse.response)
        // console.log("getting message on the else side hgere",CheckAccountStatusResponse.response.message)
        Alert.alert("Message",CheckAccountStatusResponse.response.message)
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



  render() {
    // console.log("getting inside the render  1-----------",this.state.advertisementDetailsConditionData)
    // console.log("getting inside the render--2---------",this.state.advertisementDetailsad_datetimeData)
    // console.log("getting inside the render--3--------",this.state.advertisementDetailsad_rewardsData)
    console.log(
      'getting inside the render--3--------',
      this.state.advertisementDetailsad_infoData,
    );

    const {
      advertisementDetailsConditionData,
      advertisementDetailsad_datetimeData,
      advertisementDetailsad_rewardsData,
      advertisementDetailsad_infoData,
      advertisementDetailsad_product_sizeData,
    } = this.state;
    const adInfoMap = Object.assign(advertisementDetailsad_infoData);

    console.log('GETTTING ???????????????????????????? ', adInfoMap.menu_image);
    console.log(
      'getting adinfomap value --------',
      this.state.latValue,
      '-----------',
      this.state.longValue,
    );

    const visit_to_place = this.props.navigation.getParam('visit_to_place');
    console.log(
      'getting inside render web url >>>>>>>>>>',
      adInfoMap.menu_image,
    );
    const headerTxt = this.props.navigation.getParam('category_name');
    // const advertisementDetailsDataMap = Object.assign(advertisementDetailsData)

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
          backgroundColor="#c29a74"
          translucent={true}
        />

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

        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.advertisementDetailsad_galleryData}
          renderItem={this._renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.86}
          showSpinner={true}
          spinnerColor={'red'}
          showsHorizontalScrollIndicator={true}
          indicatorStyle="white"
          // activeSlideOffset={true}
        />
        <View style={styles.contentView}>
          <ScrollView>
            {
              this.state.isBodyLoaded === true ? (
                <View style={styles.contentConteinrView}>
                  <Text style={styles.containerHeader}>
                    {adInfoMap.company_name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.openMap();
                    }}>
                    <View style={styles.subheader}>
                      <FastImage
                        source={location}
                        style={styles.subheaderImg}
                      />
                      <Text numberOfLines={1} style={styles.containerTxt}>
                        {adInfoMap.address}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `https://www.instagram.com/${adInfoMap.instagram_name}`,
                      )
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginStart: 0,
                        marginEnd: 20,
                        margin: 5,
                      }}>
                      <FastImage source={insta} style={styles.subheaderImg} />
                      <Text style={styles.containerTxt}>
                        {adInfoMap.instagram_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Fragment>
                    {advertisementDetailsad_product_sizeData.length > 0 ? (
                      <Fragment>
                        {advertisementDetailsad_product_sizeData.map(
                          (product_size) => {
                            return (
                              <View>
                                <View style={styles.rewardTxtView}>
                                  <View style={styles.rewardDot} />
                                  <Text
                                    style={{
                                      fontWeight: '700',
                                      fontSize: 12,
                                    }}>
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
                  
                  <Fragment>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-around',
                        borderWidth: 0,
                        width: '99%',
                        alignSelf: 'center',
                      }}>
                      {adInfoMap.menu_url != '' ? (
                        <View style={{flexDirection: 'column'}}>
                          {adInfoMap.category_name == `Restaurants` ||
                          adInfoMap.category_name == `Take Away` ? (
                            <Text style={styles.containerSubHeading}>
                              Menu Link{' '}
                            </Text>
                          ) : (
                            <Text style={styles.containerSubHeading}>
                              Product Link{' '}
                            </Text>
                          )}
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
                                  marginStart: 15,
                                }}
                              />
                              <Text
                                style={{
                                  paddingStart: 22,
                                  width: '95%',
                                  marginTop: 5,
                                  borderWidth: 0,
                                  paddingEnd: 7,
                                  fontSize: 13,

                                  textDecorationLine: 'underline', 
                                }}
                                numberOfLines={1}>
                                click here
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null}

                      {adInfoMap.menu_image != '' ? (
                        <TouchableOpacity
                          style={styles.actionBtn2}
                          onPress={() => {
                            this.props.navigation.navigate('fashion1', {
                              categoryName: adInfoMap.category_name,
                              imgUrl: adInfoMap.menu_image,
                            });
                          }}>
                          <Text style={styles.actionBtnTxt2}>
                            View Menu
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </Fragment>                  

                  <Text style={styles.containerSubHeading}>Details </Text>
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
                  {advertisementDetailsad_rewardsData.length > 0 ? (
                    <Fragment>
                      <Text style={styles.containerSubHeading}>Rewards </Text>
                      {advertisementDetailsad_rewardsData.map(
                        (singleRewardMap) => {
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
                  {advertisementDetailsConditionData.length > 0 ? (
                    <View style={{paddingBottom: 90}}>
                      <Text style={styles.containerSubHeading}>
                        Conditions{' '}
                      </Text>
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
                        },
                      )}
                    </View>
                  ) : null}
                  <View>
                    <View>
                      {/* {adInfoMap.is_appointed == 0 ? ( */}
                      <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => {
                          this.fetchAccountStatusDetails()
                          // this.fetchAccountStatusDetails((abc)=>{
                          //   {
                          //     console.log("aaaaalert ",abc)
                          //     adInfoMap.visit_to_place == 'yes'
                          //       ? this.props.navigation.navigate('workouttime', {
                          //           headerTxt,
                          //           ad_id: this.props.navigation.getParam('Id'),
                          //           advertisementDetailsConditionData: advertisementDetailsConditionData,
                          //           sizeData:advertisementDetailsad_product_sizeData
                          //         })
                          //       : this.props.navigation.navigate(
                          //           'fahsiondetails',
                          //           {
                          //             headerTxt,
                          //             ad_id: this.props.navigation.getParam('Id'),
                          //             advertisementDetailsConditionData: advertisementDetailsConditionData,
                          //             sizeDate:advertisementDetailsad_product_sizeData
                          //           },
                          //         );
                          //   }
                          // })                                     
                        }}>
                        <Text style={styles.actionBtnTxt}>
                          Oh yes i want it!
                        </Text>
                      </TouchableOpacity>
                      {/* ) : (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    Alert.alert(
                      'Message',
                      'You have already sent appointment request.',
                    );
                  }}>
                  <Text style={styles.actionBtnTxt}>Oh yes i want it!</Text>
                </TouchableOpacity>
              )} */}
                    </View>
                  </View>
                </View>
              ) : null
              // <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
              // <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'red'}}> No data available</Text>
              // </View>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
