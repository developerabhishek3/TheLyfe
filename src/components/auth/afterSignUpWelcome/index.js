import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './indexCss';
import bgimg from '../../../assets/welcome.png';

import logo from '../../../assets/1024.png';
import insta from '../../../assets/icon/4.png';

export default class index extends Component {

  
  render() {

    const email = this.props.navigation.getParam("email")
    console.log("getting email================",email)


    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
          <View style={styles.contentView}>
            <Image resizeMode="contain" source={logo} style={styles.imgView} />
            <Text style={styles.headertxtView}>
              Live your best healthy life
            </Text>

            <Text style={styles.imgTextView}>Thanks!</Text>

            <View style={styles.textContent}>
              <Text style={styles.textContentnormal}>
                We have registered your subscription
              </Text>
              <Text style={styles.textContentnormal}>
                We are going to analyze your profile
              </Text>
              <Text style={styles.textContentnormal}>
                and get back to you asap at
              </Text> 

              <Text style={styles.influeanceStyle1}>{email}</Text>             
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('login');
              }}>
            <Text style={styles.seeYouSoonStyle}>See you soon on</Text>
            
              <Text style={styles.influeanceStyle}>The Lyfe influence</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
