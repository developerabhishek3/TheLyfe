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
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './indexCss';
import SwitchToggle from 'react-native-switch-toggle';
import back from '../../../../assets/icon/back.png';
// import ToggleSwitch from 'toggle-switch-react-native'
import {MySetting,UpdateSettings,loginToken} from '../../../../Api/afterAuth';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';
let email_global
let switch_global
let push_global
let switch_global2
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
      switchValue:false,
      isBodyLoaded: false,
      isSpinner: true,
      isSwitchOn: false,
      MySettingDate:[],
      SwitchOnValueHolder: false,
      SwitchOnValueHolder2:false,

      
      email_notification:0,
      push_notification:0,
    };
  }



  FetchupdateSettings = async (value,email_global) => {   
  
    const {           
        // email_notification:email_global,     
        push_notification,
   } = this.state;
   console.log("email confiramtion  and push confirmation -------------------",email_global,value,push_global)
    const updateSettingsResponse = await UpdateSettings({         
        email_notification:email_global,
        push_notification:push_global
    });
    if (updateSettingsResponse.result === true) {
      console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",updateSettingsResponse.response)

      this.GetSettings();        
    } else {
      this.myAlert('Error', updateSettingsResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };




  GetSettings =  () => {
    this.setState({ isSpinner: true }, async () => {
    const mysettingsResponse = await MySetting();
    if (mysettingsResponse.result === true) {        
    // console.log("getting date here>>>>>>>>>>>>>>>>>>>>",mysettingsResponse.response.my_setting)
    var push_notification = parseInt(mysettingsResponse.response.my_setting.push_notification)
    var  email_notification =  parseInt(mysettingsResponse.response.my_setting.email_notification)

    // console.log("I am here-------------------",push_notification)

    if (email_notification == 0) {
      this.setState({      
      email_notification: 0,  SwitchOnValueHolder:false }); }
      else if(email_notification == 1){
        this.setState({ email_notification: 1, SwitchOnValueHolder:true })
      }

      if(push_notification == 0) {
        this.setState({push_notification : 0,SwitchOnValueHolder2:false})
      }
      else if(push_notification == 1){
        this.setState({ push_notification: 1, SwitchOnValueHolder2:true })
      }



      this.setState({
        isBodyLoaded: true,
        isSpinner: false,
        isCurrenetComponentRefreshing:false,
        MySettingDate: mysettingsResponse.response.my_setting,      
        // email_notification:email_notification,
        // push_notification:push_notification,        
      });
    
    } else {
      this.setState({isBodyLoaded: false, isSpinner: false}, () => {
        Alert.alert('Message', 'Something Went Wrong Try Again!', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      });
    }
  })     
  };




  
  componentDidMount = async () => {  
    this.fetchTokenData()   
    this.GetSettings()           



    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
    console.log("Receive Map Nav ","Receive Map Nav ")
    
    this.GetSettings();
    
    });


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



  checkSwitch  = (value) => {
  console.log("getting value inside the function--1111111111-------------",value)  // this.setState({email_notification:!this.state.email_notification})

    if (value == true) { 
      console.log("inside true  11111>>>>>", value)
      this.setState({
      email_notification:1,   
      SwitchOnValueHolder: value
      
      })
      email_global = 1,switch_global = value
      }
    
      else if (value == false) {
        console.log("inside false111111111 >>>>>", value)         
          this.setState({
            email_notification:0, SwitchOnValueHolder: value
            }) 
            email_global = 0,switch_global = value     
      console.log("getting finally here---111111111111--------",switch_global,email_global)
      }
     

    this.FetchupdateSettings(value,email_global)    
  };
  
  checkSwitch2  = (value2) => {
    console.log("getting value inside 2222222222the function---------------",value2)  // this.setState({email_notification:!this.state.email_notification})
  
      if (value2 == true) { 
        console.log("inside true 22222222222>>>>>", value2)
        this.setState({
        push_notification:1,   
        SwitchOnValueHolder2: value2
        
        })
        push_global = 1,switch_global2 = value2
        }

      
        else if (value2 == false) {
          console.log("inside false 222222222222>>>>>", value2)         
            this.setState({
              push_notification:0, SwitchOnValueHolder2: value2
              }) 
              push_global = 0,switch_global2 = value2     
        console.log("getting finally here2222222222222-----------",switch_global2,)
        }
       
  
      this.FetchupdateSettings(value2,push_global)    
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
                <Text style={styles.headerText}>Settings</Text>
                <Text style={styles.headerText}>    </Text>
            </View>
            <View style={styles.contentView}>        
                {
                  this.state.isBodyLoaded == true ?
                  
            <View style={{borderWidth:0,flex:2,width:'99%',alignSelf:'center',marginTop:20}}>                 
            <View
              style={{
                marginTop: 5,
                borderColor: 'red',
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
                  
                        <Text style={{fontWeight:'600',fontSize:16,paddingStart:20}}>Email Notification</Text>
                        <Switch

                        trackColor={{ true: '#6FB8EF', false: 'grey' }}
                        // thumbColor='#6FB8EF'

                        onTintColor="#009ee0"
                        thumbColor="#fff"
                        onValueChange={(value) => this.checkSwitch(value)}                      
                        value={this.state.SwitchOnValueHolder}
                        ></Switch>

            </View>     





{/* 
            <View
              style={{
                marginTop: 5,
                borderColor: 'red',
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
                  
                        <Text style={{fontWeight:'600',fontSize:16,paddingStart:20}}>Push Notification</Text>
                        <Switch

                        trackColor={{ true: '#6FB8EF', false: 'grey' }}
                        // thumbColor='#6FB8EF'

                        onTintColor="#009ee0"
                        thumbColor="#fff"
                        onValueChange={(value2) => this.checkSwitch2(value2)}                      
                        value={this.state.SwitchOnValueHolder2}
                        ></Switch>

            </View>                   */}



            
            </View>

                  :null
                }

        
            </View>
      </View>
    );
  }
}
