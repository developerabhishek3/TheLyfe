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

import logo from '../../../assets/logo3.png';

export default class index extends Component {
  render() {
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

            <View>
            <TouchableOpacity style={styles.continueBtn}
              onPress={()=>{this.props.navigation.navigate("Home")}}
            >
              <Text style={styles.continueBtnTxt}>Continue</Text>
            </TouchableOpacity> 
            </View>

          </View>
        </ImageBackground>
      </View>
    );
  }
}
