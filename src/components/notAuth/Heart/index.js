import React, {Component,Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  BackHandler,
  RefreshControl,
Modal
} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import styles from './indexCss';
import back from '../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
import closeModal from '../../../assets/icon/64.png'
import LocationIcon from '../../../assets/icon/29.png';
// import Modal from 'react-native-modal';
import filterIcon from '../../../assets/icon/39.png';
import crossIcon from '../../../assets/icon/38.png';
import FastImage from 'react-native-fast-image';
import {GetAllFavorite, GetAllCategory,MyNotificationCount,loginToken} from '../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';
import BellIcon from '../../../assets/icon/bell.png'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'


import Search from '../.././../assets/icon/search.png';
import SearchInput, {createFilter} from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['category_name', 'company_name'];
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteData: [],

      isBodyLoaded: false,
      isSpinner: true,
      searchTerm: '',
      Model_Visibility: false,
      Alert_Visibility: false,

      notificationCountValue:0,
      
      categoryData: [],
      selectedCategory: [],
      isCurrenetComponentRefreshing:false,
    };
  }
  Show_Custom_AlertForTime(visible) {
    this.setState({Model_Visibility: visible});
  }

  Hide_Custom_AlertForTime(index) {
    let {categoryData} = this.state;
    categoryData[index].visible = true;
    this.setState({Model_Visibility: false, categoryData});
  }


  Hide_Custom_AlertForTime1() {   
    this.setState({Model_Visibility: false});
  }

  componentDidMount = async () => {
    this.fetchTokenData()
    setTimeout(() => {
      this.fetchCategoryData();
      this.fetchFavoritesList();
    }, 10);
    setInterval(() => {
        this.fetchNotificationCount()
    }, 5000);
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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

  fetchCategoryData = async () => {
    const GetCategoryListResponse = await GetAllCategory();
    if (GetCategoryListResponse.result === true) {
      if (GetCategoryListResponse.response.status === true) {
        var categoryData = GetCategoryListResponse.response.categories;
        var updatedCategoryData = categoryData.map((singleCategory) => ({
          ...singleCategory,
          visible: false,
        }));
        this.setState({
          isBodyLoaded: true,
          isSpinner: false,
          categoryData: updatedCategoryData,
        });
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

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  fetchFavoritesList = async () => {
    const AdvertisementResponse = await GetAllFavorite();
    if (AdvertisementResponse.result === true) {
      // console.log(
      //   'getting favorite response here-------------------',
      //   AdvertisementResponse.response,
      // );
      var favoriteData = AdvertisementResponse.response.Ad_list;
    }
    this.setState({isBodyLoaded: true, isSpinner: false, favoriteData,isCurrenetComponentRefreshing:false,});
    // console.log("getting favorite response----------------",favoriteData)
  };
  filterData = (favoriteData,categoryData) => {
    if(!favoriteData || favoriteData?.length == 0){
      return [];
    }
    let atleastSingleCatSelected = 0;
    let favoritesData = [];
    categoryData.map((singleCategory)=>{
      if(singleCategory.visible){ 
        atleastSingleCatSelected++;
        favoriteData.map((singleFav)=>{
          console.log("I am here in the case of the single product - ",singleFav);
          if(singleFav.category_id == singleCategory.category_id){
            favoritesData.push(singleFav);
          }
        })
      }
    });
    return atleastSingleCatSelected == 0 ? favoriteData : favoritesData;
     
  }
  handleVisibleCategorty = (index) => {
    const { categoryData }  = this.state;
    categoryData[index].visible = false;
    this.setState({categoryData});
  }

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


  render() {
    const {favoriteData : favDataState  , categoryData} = this.state; 
      let favoriteData = this.filterData(favDataState,categoryData);
      
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        <StatusBar
          barStyle="dark-content"
          hidden={false}
         backgroundColor="#c29a74"
          translucent={true}
        />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>    Favorites</Text>
        
                  <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("notification")
                  }} >
                  <View style={{flexDirection:'column-reverse',borderWidth:0,height:50,marginTop:15,marginEnd:12}}>
                  
                  <Image source={BellIcon } style={{height:30,width:30,marginTop:5,marginStart:15,marginEnd:20,top:5,left:5}} />
                  {
                      this.state.notificationCountValue > 0 ?
                    <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-15,marginTop:12,marginStart:3,righ:-20,bottom:-1}}></Badge>
                    :null
                  }
                  
                  </View>
                  </TouchableOpacity>                          
        </View>        
        <View
          style={{
            width: '99%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10, 
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              margin: 6,
              paddingStart: 18,
              color: '#B87548',
            }}>
            FILTER BY CATEGORY
          </Text>                 
          <TouchableOpacity onPress={() => {
            let openBlock = this.state.categoryData.every((singleCat)=> { return singleCat.visible == true });
            if(!openBlock){
              this.Show_Custom_AlertForTime()
            }                   
          }}>
            <Image source={filterIcon} style={styles.headertxtInputImg} />
          </TouchableOpacity>
        </View>
        {this.state.categoryData.length > 0 ? (
         <View style={{flexDirection: "row",flexWrap: "wrap",justifyContent:'center',borderWidth:0,marginTop:-10}}>
           {
             this.state.categoryData.map((singleCategory,index)=>{
               if(!singleCategory.visible){
                return null;
               }
               return(
                <View  style={{
                  backgroundColor: '#98AFC7',
                  borderWidth: 1,
                  paddingStart: 4,
                  paddingEnd: 4,
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 14,
                  marginTop: 5,
                  margin:5,
                  alignSelf: 'center',
                  marginStart: 5,
                  marginEnd: 5,
                  fontFamily: 'Arial',
                  flexDirection:'row',
                  borderRadius:4
                }}>                
                <Text style={{margin:5,fontWeight:'600',fontSize:12}}>
                   { singleCategory.category_name }
                </Text>
                <TouchableOpacity key={index} onPress={()=>{ this.handleVisibleCategorty(index) }}>
                <FastImage source={crossIcon} style={{height:13,width:13,marginTop:9,margin:5,marginBottom:8}} />
                </TouchableOpacity>
              </View>
               )
             })
           }
         </View>
        ) : null}
        
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchFavoritesList();
                      },100)  }} />
                    }>
          {
                this.state.isBodyLoaded === true ?                
                <View
                  style={{
                    borderColor: 'red',
                    marginTop: 15,
                    borderWidth: 0,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginBottom:40,
                  }}>
                  { favoriteData.length > 0 ? (
                    favoriteData.map((singleAdvisement,index) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate('fashion', {
                                category_name: singleAdvisement.category_name,
                                Id: singleAdvisement.id,
                              });
                            }}>
                            <FastImage
                              style={styles.catImgStyle}
                              imageStyle={{borderRadius: 5}}
                              source={{
                                uri: `https://www.thelyfe.fr/${singleAdvisement.ad_image}`,
                              }}>
                              <View style={styles.imgContainerView}>
                                <View style={styles.singleContainerStyle}>
                                  <Text
                                    numberOfLines={1}
                                    style={styles.textheader}
                                    numberOfLines={1}>
                                    {singleAdvisement.company_name}
                                  </Text>
                                  <View style={{flexDirection: 'row'}}>
                                    <FastImage
                                      style={{
                                        height: 15,
                                        width: 15,
                                        marginStart: -3,
                                        margin: 3,
                                        marginEnd: 3,
                                      }}
                                      source={LocationIcon}
                                    />
                                    <Text
                                      numberOfLines={1}
                                      style={styles.textSubheader}
                                      numberOfLines={2}>
                                      {singleAdvisement.address}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </FastImage>
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  ) : (
                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: 200,
                        marginBottom: 200,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 20,
                          color: '#000000',
                        }}>
                        No item found !
                      </Text>
                    </View>
                  )}
                </View>            
            :<View
            style={{
              alignSelf: 'center',
              marginTop: 200,
              marginBottom: 200,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 20,
                color: '#000000',
              }}>
              Loading!
            </Text>
          </View>
          }
          </ScrollView>    
        <BottomNavigator
          currentRoute={'Heart'}
          navigation={this.props.navigation}
        />

        {/* model here for all category */}

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
              right: 60,
              left: 10,
              // left: Dimensions.get('window').width*1.60,
              top: 90,
              bottom: 50,
            }}>
            <View
              style={{
                width: '40%',
                height: SCREEN_HEIGHT/1.4,
                backgroundColor: '#FFFFFF',
                alignSelf: 'flex-end',                
                margin: 10,
                marginEnd: 40,
              }}>
                <TouchableOpacity
                  onPress={()=>this.Hide_Custom_AlertForTime1()}
                >
                <View style={{justifyContent:'flex-end'}}>
                  <Image source={closeModal} style={{height:25,width:25,alignSelf:'flex-end',margin:1,}} />
                </View>
                </TouchableOpacity>             
                <View
                 style={{
                  flex: 2,                  
                  borderColor: 'red',
                  borderWidth: 0,                
                  alignSelf:'center'
                  
                }}
                >
                <ScrollView showsVerticalScrollIndicator={false}>
                {categoryData.map((singleCategory, index) => {
                  if (singleCategory.visible) {
                    return null;
                  }
                  return (
                    <ScrollView horizontal={true}>
                      <View
                        style={{
                          justifyContent:'center',
                          alignItems:'center',
                          alignSelf:'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.Hide_Custom_AlertForTime(index);
                          }}>
                          <View
                            style={{
                              backgroundColor: '#98AFC7',
                              borderColor: '#000000',
                              borderWidth: 1,
                              alignItems:'center',
                              alignSelf:'center',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 0.5,
                              shadowRadius: 1,
                              elevation: 1,
                              margin: 4,
                              width: SCREEN_WIDTH / 3,
                              borderRadius: 7,
                            }}>
                            <Text
                              style={{
                                padding: 4,
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: 12,                                
                                alignSelf: 'center',
                              }}>
                              {singleCategory.category_name}
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
          </View>
        </Modal>
      </View>
    );
  }
}
