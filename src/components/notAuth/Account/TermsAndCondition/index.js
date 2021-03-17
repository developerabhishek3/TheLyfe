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
import AsyncStorage from '@react-native-community/async-storage';
import back from '../../../../assets/icon/back.png';
import { WebView } from 'react-native-webview';
import {GetTermsAndConditions,loginToken} from '../../../../Api/afterAuth';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TermsData: [],

      isBodyLoaded: false,
      isSpinner: true,
    };
  }

  GetTermsAndConditionsFunction = async () => {
    const GetTermsAndConditionsResponse = await GetTermsAndConditions();

    if (GetTermsAndConditionsResponse.result === true) {
      console.log("getting logout response---------------",GetTermsAndConditionsResponse.response)
      var TermsData = GetTermsAndConditionsResponse.response.terms_condition

      this.setState({isBodyLoaded: true, isSpinner: false, TermsData});
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
    this.GetTermsAndConditionsFunction();
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
    const {TermsData} = this.state;
    const userMap = Object.assign(TermsData);

    // console.log("getting indside the reder methid-------",userMap.contents)
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
                <Text style={styles.headerText}>Terms and Conditions</Text>
                <Text style={styles.headerText}> </Text>
            </View>
           
             <WebView source={{ uri: 'https://www.thelyfe.fr/home/terms_condition' }}  />
      </View>
    );
  }
}
