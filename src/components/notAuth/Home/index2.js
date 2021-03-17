import React, {Component, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  Dimensions,
  RefreshControl,
} from 'react-native';
import styles from './index2Css';
import BottomNavigator from '../../../router/BottomNavigator';
import back from '../../../assets/icon/back.png';
import Search from '../.././../assets/icon/search.png';
import running from '../../../assets/icon/Explorer/running.jpeg';
import workout from '../../../assets/icon/Explorer/workout.jpeg';
import workout2 from '../../../assets/icon/Explorer/workout2.jpeg';
import location from '../../../assets/icon/29.png';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchInput, {createFilter} from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['company_name', 'postcode','address'];
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {advertisement_by_category,GetAllAdvertisement,loginToken} from '../../../Api/afterAuth';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      AllAdvertisementData: [],
      searchTerm: '',
      isBodyLoaded: false,
      isSpinner: true,
      isCurrenetComponentRefreshing:false,
    };
  }

  componentDidMount = () => {
    this.fetchTokenData()
    setTimeout(() => {     
      this.fetchAllAdvertisement();
    }, 500);

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

  fetchAllAdvertisement = async () => {

    const AllAdvertisementResponse = await GetAllAdvertisement();
    if (AllAdvertisementResponse.result == true) {      
      var AllAdvertisementData =
        AllAdvertisementResponse.response.advertisements;
        console.log("getting response hhhhhhhhhhhhhhhh------",AllAdvertisementData)
      this.setState({
        isBodyLoaded: true,
        isSpinner: false,
        AllAdvertisementData,
        isCurrenetComponentRefreshing:false,
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


  searchUpdated(term) {
    this.setState({searchTerm: term});
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
  render() {
    const headerTxt = this.props.navigation.getParam('headerText');
    const {AllAdvertisementData} = this.state;
    const filteredAdvertisementData = AllAdvertisementData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isSpinner} />
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={{height:20,width:20,margin:10,marginTop:40,marginStart:27}} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>What are you looking for?</Text>

          {/* <View style={styles.searchButton}>
            <Image source={Search} style={styles.headertxtInputImg} />
            <TextInput placeholder="Find a place..." />
          </View> */}
            
          <View style={styles.searchButton}>
            <Image source={Search} style={styles.headertxtInputImg} />
            <SearchInput
             onChangeText={(term) => { this.searchUpdated(term) }} 
              style={{                
                  borderColor: 'red',
                  borderWidth: 0,
                  width: SCREEN_WIDTH * 0.8,
                  marginStart: -10,
                  paddingLeft:20,
                  fontFamily: 'Arial',
                }}
                placeholder="Find a place..."
                placeholderTextColor="gray"
              
            />           
          </View>
        </View>
        <View style={styles.contentView}>            
        <ScrollView 
       
        refreshControl={
                      <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchAllAdvertisement();
                      },100)  }} />
                    }>
              {   this.state.isBodyLoaded == true ?
                  <Fragment>
                  {
                  AllAdvertisementData.length > 0
                      ? filteredAdvertisementData.map((singleMap, index) => {
                          return (
                            <View key={index}>
                              <TouchableOpacity
                                // onPress={()=>{this.props.navigation.navigate("workoutdetails")}}
                                onPress={() => {
                                  this.props.navigation.navigate('fashion', {
                                    category_name: singleMap.category_name,
                                    Id: singleMap.id,
                                    visit_to_place: singleMap.visit_to_place,
                                  });
                                }}>
                                <FastImage
                                  resizeMode="stretch"
                                  imageStyle={styles.bgImageMainStyle}
                                  source={workout2}
                                  source={{
                                    uri: `https://www.thelyfe.fr/${singleMap.ad_image}`,
                                  }}
                                  style={styles.bgImgStyle}>
                                  <View style={styles.imgBottomView}>
                                    <Text style={styles.mainText}>
                                      {singleMap.company_name}
                                    </Text>
                                    <View style={styles.subText}>
                                      <Image
                                        source={location}
                                        style={styles.subImgStyle}
                                      />
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          borderWidth: 0,
                                          borderColor: 'red',
                                          width: '90%',
                                          margin: 2,
                                          fontSize:12,
                                          
                                        }}>
                                        {singleMap.address}
                                      </Text>
                                    </View>
                                  </View>
                                </FastImage>
                              </TouchableOpacity>
                            </View>
                          );
                        })
                      : 
                    <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                            <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading !</Text>
                    </View>
                  }
                  </Fragment>
                : <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading !</Text>
                </View>
              }
            
          </ScrollView>
         
        </View>
        <BottomNavigator
          currentRoute={'alladvertisement'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
