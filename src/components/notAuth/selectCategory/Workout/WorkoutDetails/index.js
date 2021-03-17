import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import styles from './indexCss';

import back from '../../../../../assets/icon/back.png';
import location from '../../../../../assets/icon/28.png';
import insta from '../../../../../assets/icon/27.png';
import workout from '../../../../../assets/icon/Explorer/workout.jpeg';

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Image source={back} style={styles.backStyle} />
          <Text style={styles.headerTxt}>Work Out</Text>
          <Text style={styles.headerTxt}> </Text>
        </View> */}
      <View style={styles.ImgView}>
          <ImageBackground source={workout} style={styles.imgStyle} >
          <View  style={styles.header}>
          <Image source={back} style={styles.backStyle} />
          <Text style={styles.headerTxt}>Work Out</Text>
          <Text style={styles.headerTxt}> </Text>
          </View>
          </ImageBackground>
        </View>
        <View style={styles.contentView}>
          <ScrollView>
            {/* <View style={styles.ImgView}>
              <Image source={workout} style={styles.imgStyle} />
            </View> */}
            <View style={styles.contentConteinrView}>
              <Text style={styles.containerHeader}>
                Zone Paris - gym class
              </Text>
              <View style={styles.subheader}>
                <Image source={location} style={styles.subheaderImg} />
                <Text style={styles.containerTxt}>
                  63, Avenue Ladru, Rollin - 75012 Paris
                </Text>
              </View>
              <View style={styles.subheader}>
                <Image source={insta} style={styles.subheaderImg} />
                <Text style={styles.containerTxt}>ZoneParis, gym class</Text>
              </View>
              <Text style={styles.containerSubHeading}>Details </Text>

              <Text style={styles.containerTxt}>
                Dummy text is text that is used in the publishing industry or by
                web designers to occupy the space which will later be filled
                with 'real' content. This is required when, for example, the              
                dummy texts as lyrics when writing melodies in order to have a
                'ready-made' text to sing with the melody. Dummy texts have been
                in use by typesetters since the 16th century.
              </Text>
              <Text style={styles.containerSubHeading}>Rewards </Text>

            <View style={styles.rewardTxtView}> 
            <View style={ styles.rewardDot}/>
                <Text style={styles.containerTxt}>
                     Hit Class
                </Text>
            </View>
            <View style={styles.rewardTxtView}> 
            <View style={ styles.rewardDot}/>
                <Text style={styles.containerTxt}>
                    40 minutes
                </Text>
            </View>

            <Text style={styles.containerSubHeading}>Conditions </Text>
            <View style={styles.rewardTxtView}> 
            <View style={ styles.rewardDot}/>
                <Text style={styles.containerTxt}>
                     3 instagram stories minimum
                </Text>
            </View>
            <View style={styles.rewardTxtView}> 
            <View style={ styles.rewardDot}/>
                <Text style={styles.containerTxt}>
                   Tag @abhishek.influence at @zone.paris
                </Text>
            </View>
            

            <TouchableOpacity style={styles.actionBtn}
              onPress={()=>{this.props.navigation.navigate("workouttime")}}
            >
              <Text style={styles.actionBtnTxt}>Oh yes i want it!</Text>
            </TouchableOpacity>



            </View>




         
          
          </ScrollView>
        </View>
      </View>
    );
  }
}
