import React, {Component, version} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import styles from './indexCss';
import { WebView } from 'react-native-webview'
import back from '../../../../assets/icon/back.png';

import {GetPrivacyPolicy,loginToken} from '../../../../Api/afterAuth';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrivacyPolicyData: [],

      isBodyLoaded: false,
      isSpinner: true,
    };
  }

  GetPrivacyPolicyFunction = async () => {
    const GetPrivacyPolicyResponse = await GetPrivacyPolicy();

    if (GetPrivacyPolicyResponse.result === true) {
      console.log("getting logout response---------------",GetPrivacyPolicyResponse.response)
      var PrivacyPolicyData = GetPrivacyPolicyResponse.response.privacy_policy

      this.setState({isBodyLoaded: true, isSpinner: false, PrivacyPolicyData});
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
  };

  componentDidMount = async () => {
    this.fetchTokenData()
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    this.GetPrivacyPolicyFunction();
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
    const {PrivacyPolicyData} = this.state;
    const userMap = Object.assign(PrivacyPolicyData);

    console.log("getting indside the reder methid-------",userMap.contents)
    return (
      <View style={styles.container}>
           <Spinner visible={this.state.isSpinner} />
            <StatusBar
            barStyle="#FFFFFF"
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
                <Text style={styles.headerText}>Privacy & Policy</Text>
                <Text style={styles.headerText}> </Text>
            </View>
            {/* <View style={styles.contentView}>    */}
           
            <WebView source={{ uri: 'https://www.thelyfe.fr/home/privacy_policy' }}  />
            {/* </View> */}
      </View>
    );
  }
}
