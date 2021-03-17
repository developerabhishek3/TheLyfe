import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
  BackHandler,
  Dimensions
} from 'react-native';
import styles from './indexCss';

import back from '../../../../assets/icon/back.png';
import location from '../../../../assets/icon/28.png';
import insta from '../../../../assets/icon/27.png';
import workout from '../../../../assets/icon/Explorer/workout.jpeg';
import {GetAdvertisementDetails,loginToken} from '../../../../Api/afterAuth';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.fetchTokenData()
    const headerTxt = this.props.navigation.getParam('categoryName');   
    const imgUrl = this.props.navigation.getParam('imgUrl'); 
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
    // console.log("getting imge and category name ---------",headerTxt, imgUrl)
  }










componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
}
    
handleBackButton=(nav)=> {
      if(!nav.isFocused()) {
        BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
        return false;
      }else{
        nav.goBack();
        return true;
      }
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


    const headerTxt = this.props.navigation.getParam('categoryName');   
    const imgUrl = this.props.navigation.getParam('imgUrl');  
    console.log("getting image url inside render----------",imgUrl)  
    // const advertisementDetailsDataMap = Object.assign(advertisementDetailsData)    
    // console.log("getting indie the render---------------",advertisementDetailsDataMap)

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#c29a74" />

            <View style={styles.header2}>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Image source={back} style={styles.backStyle2} />
                </TouchableOpacity>
              <Text style={styles.headerTxt2}>{headerTxt}</Text>
              <Text style={styles.headerTxt}> </Text>
            </View>          
     
        <View style={styles.contentView}>
          {
            imgUrl != ''  ?
              
            <FastImage 
            resizeMode="contain"
             source={{
                uri: `https://www.thelyfe.fr/${imgUrl}`,                            
              }} 
              style ={{width:'100%',height:300,borderColor:'red',borderWidth:0}}
            />
            :
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{alignSelf:'center',fontSize:18,marginTop:230,fontWeight:'700'}}>No Image found!</Text>
            </View>
          }
          
        </View>
      </View>
    );
  }
}
