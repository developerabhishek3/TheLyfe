import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';

import {Logout } from '../../../Api/afterAuth';                     

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('welcome2');
    }, 3000);
  }



  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../../assets/newsplash.png')}
          // source={require('../../assets/splash.png')}
        >
          <Image resizeMode="contain" style={{justifyContent:'center',alignSelf:'center',height:SCREEN_HEIGHT/5,width:'55%'}}
            source={require('../../../assets/1024.png')}

          />
          <Text
           style= {{
              color:'gray',
              textAlign:'center',
                fontSize:16,
                fontWeight:'700',
                marginTop:-30,
                marginBottom:40,
                
            }}
          >
            Live your best healthy life 
          </Text>

        </ImageBackground>
      </View>
    );
  }
}
