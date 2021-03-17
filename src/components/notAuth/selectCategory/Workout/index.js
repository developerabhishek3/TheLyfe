import React, {Component, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  Alert
} from 'react-native';
import styles from './indexCss';
import back from '../../../../assets/icon/back.png';
import AsyncStorage from '@react-native-community/async-storage';
import running from '../../../../assets/icon/Explorer/running.jpeg';
import workout from '../../../../assets/icon/Explorer/workout.jpeg';
import workout2 from '../../../../assets/icon/Explorer/workout2.jpeg';
import location from '../../../../assets/icon/29.png';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';

import {advertisement_by_category,Logout} from '../../../../Api/afterAuth';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: '',
      advertiemtByCategory: [],
      isBodyLoaded: false,
      isSpinner: true,
    };
  }

  componentDidMount = async() => {
    const headerText = this.props.navigation.getParam('headerText');
    const category_id = this.props.navigation.getParam('category_id');


    const token = await AsyncStorage.getItem('token');
    const TokenValue = JSON.parse(token);

    this.setState({
      category_id: category_id,
    });
    console.log(
      'getting category id and header text value here------------',
      category_id,
      '=====================',
      headerText,
    );

    setTimeout(() => {
      console.log(
        'getting category_id value here--------------',
        this.state.category_id,
      );
      this.fetchAdvertisementByCategorytDetails();
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



  fetchAdvertisementByCategorytDetails = async () => {
    console.log(
      'getting inside the function------- --------',
      this.state.category_id,
    );
    const {category_id} = this.state;
    const AdvertisementByCategoryResponse = await advertisement_by_category({
      category_id,
    });
    if (AdvertisementByCategoryResponse.result == true) {

      
        console.log("getting response here-------------",AdvertisementByCategoryResponse.response.status)
        var advertiemtByCategory =
          AdvertisementByCategoryResponse.response.advertisements;
        this.setState({
          isBodyLoaded: true,
          isSpinner: false,
          advertiemtByCategory,
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














  LogoutFunction = async () => {
    const LogoutResponse = await Logout();
    
    if(LogoutResponse.result === true) {
        // console.log("getting logout response---------------",LogoutResponse.response)
        await AsyncStorage.setItem('userLoggedIn','false')
        let keys = ['token'];
        AsyncStorage.multiRemove(keys)
        Alert.alert("Message","Your Session has been expired!")
        this.props.navigation.navigate("login")            
        // Alert.alert("Message","Logout Sucessfully !")
    }
    else{
        // console.log("getting error on logout -------------",LogoutResponse.error)
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };


  render() {
    const headerTxt = this.props.navigation.getParam('headerText');
    const {advertiemtByCategory} = this.state;

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
          <Text style={styles.headerTxt}>{headerTxt}</Text>
          <Text style={styles.headerTxt}> </Text>
        </View>
        <View style={styles.contentView}>
          {
             this.state.isBodyLoaded == true 
           ?
            <Fragment>
               <ScrollView>
            {
              advertiemtByCategory.length > 0 
                ? advertiemtByCategory.map((singleMap, index) => {
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
                      <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>No Item Found!</Text>
              </View>
            }
               </ScrollView>
            </Fragment>
            :  
            <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:200,marginBottom:200}}>
                    <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:'#000000'}}>Loading</Text>
            </View>
          }
         
          
       
        </View>
      </View>
    );
  }
}
