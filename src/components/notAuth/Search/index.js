import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  SectionList,
  Dimensions,
  BackHandler,
  RefreshControl,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigator from '../../../router/BottomNavigator';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import favorite from '../../../assets/icon/37.png';
import unFavorite from '../../../assets/icon/36.png';

import BellIcon from '../../../assets/icon/bell.png'

import {CheckBox, Overlay, Button} from 'react-native-elements';

import FastImage from 'react-native-fast-image';
import styles from './indexCss';
import back from '../../../assets/icon/back.png';
import LocationIcon from '../../../assets/icon/29.png';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
  category_with_advertisement,
  AddFavorite,
  GetAllCategory,
  MyNotificationCount,
  loginToken
} from '../../../Api/afterAuth';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryWithAdvertisement: [],
      category: [],
      categoryData: [],
      isBodyLoaded: false,
      isSpinner: true,
      ad_id: 0,
      notificationCountValue:0,
      isCurrenetComponentRefreshing:false,
    };
  }

  fetchCategoryData = async () => {
    const GetCategoryListResponse = await GetAllCategory();
    if (GetCategoryListResponse.result === true) {
      if (GetCategoryListResponse.response.status === true) {
        var categoryData = GetCategoryListResponse.response.categories;
        // console.log("getting category ----------",categoryData)
        this.setState({isBodyLoaded: true, isSpinner: false, categoryData});
      } else {
        // Alert.alert("Message", "Token Expire Plese Login!")
        // this.props.navigation.navigate("login")
        this.setState({isBodyLoaded: true, isSpinner: false});
      }
    } else {
      console.log(
        '---------------------------------------------',
        GetCategoryListResponse.error,
      );
    }
  };


  fetchNotificationCount = async() => {
    const GetNotificationCount = await MyNotificationCount();
    if(GetNotificationCount.result === true){
      var notificationCountValue = GetNotificationCount.response.notification_count;
      // console.log("getting here or not for last time testing-------------",notificationCountValue)
      this.setState({isBodyLoaded: true, isSpinner: false, notificationCountValue,isCurrenetComponentRefreshing:false,});
    }
    else{
      this.setState({isBodyLoaded: true, isSpinner: false});
    } 
 }


  fetchCategoryWithAdvisment = async () => {

    // this.setState({ isSpinner: true }, async () => {
    
    const categoryWithAdvertisementResponse = await category_with_advertisement();

    if (categoryWithAdvertisementResponse.result == true) {
      // console.log(
      //   'JSON DATA <<< ',
      //   JSON.stringify(categoryWithAdvertisementResponse),
      // );
      this.setState({        
        isBodyLoaded: true,        
        isCurrenetComponentRefreshing:false,
        categoryData: categoryWithAdvertisementResponse.response.cate_with_ads,        
      });
    } else {
      this.setState({isBodyLoaded: false, isSpinner: false}, () => {
        Alert.alert('Message', 'Something Went Wrong Try Again!', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      });
    }
  // }) 
    //  console.log("getting on the state response----------------",this.state.categoryWithAdvertisement)
  };

  FavoriteFunction = async (id) => {
   
    const favoriteResponse = await AddFavorite({
      ad_id: id,
    });
    if (favoriteResponse.result === true) {
      // this.fetchCategoryWithAdvisment()
     

      setTimeout(
        () => {
          this.fetchCategoryWithAdvisment();
        },
        10,
        () => {
          this.forceUpdate();
        },
      );
      console.log("getting result here --------",favoriteResponse.response)
    } else {
      this.myAlert('Error', favoriteResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  componentDidMount = async () => {    
    this.fetchCategoryWithAdvisment();
    
    setInterval(() => {
      this.fetchNotificationCount()  
    }, 5000);
    

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
      nav.navigate('Home');
      return true;
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
    const {categoryWithAdvertisement, category, categoryData} = this.state;
    console.log("getting inside the render method----------",categoryData)
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        />
        {/* <Spinner visible={this.state.isSpinner} /> */}
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>           Explorer</Text>                     
           
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:45,margin:20,marginStart:13}}>
                  
                  <Image source={BellIcon } style={{height:30,width:30,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                  {
                    this.state.notificationCountValue > 0 ?
                    <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-15,marginTop:12,marginStart:3,righ:-20,bottom:-1}}></Badge>
                    :null
                  }
                 
                  </View>
                  </TouchableOpacity>

          
        </View>

        
 <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
                      <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchCategoryWithAdvisment();
                      },100)  }} />
                    }>
          <View style={{borderWidth: 0,marginBottom:40}}>
            {this.state.isBodyLoaded == true ? (
              <Fragment>   
                  {
                    categoryData.length > 0 ?
                    <View>
                    {categoryData.map((singleData, index) => {                      
                      let categoryKey = Object.keys(singleData)[0];
                      console.log("Checking here for testing>>>>>>>>>>",(singleData.is_empty))
                      return (
                        <Fragment>
                          {
                            singleData.is_empty == false ?
                            <Text style={styles.headerMainText}>
                            {categoryKey}
                          </Text>
                          :null
                          }                        
                          <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderWidth: 0,
                                marginStart: 10,
                                zIndex: 20,
                              }}>
                              {singleData[categoryKey].map((singleCategory) => {
                                return (
                                  <View>
                                    <ScrollView horizontal={true}>
                                      
  
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          borderColor: 'blue',
                                          borderWidth: 0,
                                          marginStart: 4,
                                        }}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.props.navigation.navigate(
                                              'fashion',
                                              {
                                                category_name:
                                                  singleCategory.category_name,
                                                Id: singleCategory.id,
                                              },
                                            );
                                          }}>
                                          <FastImage
                                            source={{
                                              uri: `https://www.thelyfe.fr/${singleCategory.ad_image}`,
                                            }}
                                            style={styles.catImgStyle}>
                                            <View style={styles.imgContainerView}>
                                              <View
                                                style={
                                                  styles.singleContainerStyle
                                                }>
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                      'space-around',
                                                    borderColor: 'red',
                                                    borderWidth: 0,
                                                  }}>
                                                  <Text
                                                    style={styles.textheader}
                                                    numberOfLines={1}>
                                                    {singleCategory.company_name}
                                                  </Text>
                                                  <CheckBox
                                                    containerStyle={{
                                                      borderColor: 'blue',
                                                      borderWidth: 0,
                                                      height: 25,
                                                      width: 30,
                                                    }}
                                                    checkedIcon={
                                                      singleCategory.is_favourite ==
                                                      0 ? (
                                                        <FastImage
                                                          source={unFavorite}
                                                          style={{
                                                            height: 16,
                                                            width: 16,
                                                            marginTop: -10,
                                                            marginEnd: 10,
                                                            marginStart: 5,
                                                          }}
                                                          resizeMode="contain"
                                                        />
                                                      ) : (
                                                        <FastImage
                                                          source={favorite}
                                                          style={{
                                                            height: 16,
                                                            width: 16,
                                                            marginTop: -10,
                                                            marginEnd: 10,
                                                            marginStart: 5,
                                                          }}
                                                          resizeMode="contain"
                                                        />
                                                      )
                                                    }
                                                    checked={
                                                      singleCategory.is_favourite
                                                    }
                                                    onPress={() =>
                                                      this.FavoriteFunction(
                                                        singleCategory.id,
                                                      )
                                                    }
                                                  />
                                                </View>
                                                <View
                                                  style={{flexDirection: 'row'}}>
                                                  <FastImage
                                                    style={{
                                                      height: 15,
                                                      width: 15,
                                                      marginTop: -10,
                                                      marginStart: -3,
                                                      margin: 3,
                                                      marginEnd: 3,
                                                    }}
                                                    source={LocationIcon}
                                                  />
                                                  <Text
                                                    style={styles.textSubheader}
                                                    numberOfLines={2}>
                                                    {singleCategory.address}
                                                  </Text>
                                                </View>
                                              </View>
                                            </View>
                                          </FastImage>
                                        </TouchableOpacity>
                                      </View>
                                    </ScrollView>
                                  </View>
                                );
                              })}
                            </View>
                          </ScrollView>
                        </Fragment>
                      );
                    })}
                  </View>


                    : <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                     <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>No advertisement found!</Text>
                    </View>
                  }            
              </Fragment>
            ) :  <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
            <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading....</Text>
        </View>}
          </View>
        </ScrollView>

        <BottomNavigator
          currentRoute={'Search'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
