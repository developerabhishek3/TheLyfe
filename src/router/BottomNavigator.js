import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import FastImage from 'react-native-fast-image';

import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

// unsleceted images
import Search from '../assets/bottomNavigator/deslected/search.png'
import Heart from '../assets/bottomNavigator/deslected/heart.png'
import Calender from '../assets/bottomNavigator/deslected/calender.png'
import Account from '../assets/bottomNavigator/deslected/profile.png'

// selected images


import selectedSearch from '../assets/bottomNavigator/selected/search.png'
import SelectedHeart from '../assets/bottomNavigator/selected/heart.png'
import SelectedCalender from '../assets/bottomNavigator/selected/calendar.png'
import SelectedAccount from '../assets/bottomNavigator/selected/profile.png'

import homeIcon from '../assets/homeIcon1.png'
class BottomNavigator extends Component{
    
    render(){
        let {currentRoute} = this.props;
        // console.log("current route name-",currentRoute)
        return(
            <View keyboardShouldPersistTaps="always">
                
                <View style={styles.TabNavigatorView}>

        

                <TouchableOpacity
                  style={{width: '20%'}}
                  onPress={() => {
                    if (currentRoute != 'Search') {
                      this.props.navigation.navigate('Search', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'Search' ? (
                    <FastImage source={require('../assets/bottomNavigator/selected/search.png')} style={styles.routesImageView} />
                  ) : (
                    <FastImage source={require('../assets/bottomNavigator/deslected/search.png')} style={styles.routesImageView} />
                  )}                 
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: '20%'}}
                  onPress={() => {
                    if (currentRoute != 'Heart') {
                      this.props.navigation.navigate('Heart', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'Heart' ? (
                    <FastImage source={require('../assets/bottomNavigator/selected/heart.png')} style={styles.routesImageView} />
                  ) : (
                    <FastImage source={require('../assets/bottomNavigator/deslected/heart.png')} style={styles.routesImageView} />
                  )}                 
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: SCREEN_WIDTH/4.5,height:SCREEN_HEIGHT/8.1,backgroundColor:'#c29a74',borderColor:'#c29a74',borderWidth:1,marginBottom:50,borderRadius:100,justifyContent:'center'}}
                  onPress={() => {
                    if (currentRoute != 'Home') {
                      this.props.navigation.navigate('Home', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'Home' ? (
                    <FastImage source={homeIcon} style={styles.routesImageView1} />
                  ) : (
                    <FastImage source={homeIcon} style={styles.routesImageView1} />
                  )}                 
                </TouchableOpacity>





                <TouchableOpacity
                  style={{width: '20%'}}
                  onPress={() => {
                    if (currentRoute != 'Calender') {
                      this.props.navigation.navigate('Calender', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'Calender' ? (
                    <FastImage source={require('../assets/bottomNavigator/selected/calendar.png')} style={styles.routesImageView} />
                  ) : (
                    <FastImage source={require('../assets/bottomNavigator/deslected/calender.png')} style={styles.routesImageView} />
                  )}                 
                </TouchableOpacity>


                
                <TouchableOpacity
                  style={{width: '20%',marginEnd:10}}
                  onPress={() => {
                    if (currentRoute != 'Account') {
                      this.props.navigation.navigate('Account', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'Account' ? (
                    <FastImage source={require('../assets/bottomNavigator/selected/profile.png')} style={styles.routesImageView} />
                  ) : (
                    <FastImage source={require('../assets/bottomNavigator/deslected/profile.png')} style={styles.routesImageView} />
                  )}                 
                </TouchableOpacity>
                                           
                </View>
            </View>
        )
    }
}


export default BottomNavigator;

const styles = StyleSheet.create({
    TabNavigatorView: {
      backgroundColor:'#c29a74',
      height: 55,
      borderColor: '#EFEFEF',
      borderWidth: 0,
      width: '103%',
      alignSelf:'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom:-3,
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30
    },
    routesImageView: {
      alignSelf: 'center',
      height: 22,
      width: 22
    },
    routeTextView: {
      textAlign: 'center',
      fontSize: 12,  
      color: '#696969',
      paddingTop: 5,
    },
    selectedRouteTextView: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '700',
      color: '#793422',
      paddingTop: 5,
    },
    routesImageView1:{
      height:70,
      width:30,
      alignSelf:'center',
      borderColor:'red',
      borderWidth:0,
      marginBottom:30
    },
  });