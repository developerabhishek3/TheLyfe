import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  BackHandler,
  Dimensions,
} from 'react-native';

// import back from '../../../assets/icon/back.png';
import back from '../../../../assets/icon/back.png';
import Search from '../../../../assets/icon/search.png';
import styles from './indexCss';

import callus from '../../../../assets/icon/52.png';
import messege from '../../../../assets/icon/53.png';
import {call} from 'react-native-reanimated';
import downArrow from '../../../../assets/icon/downArrow.png'

import {GetFAQs,loginToken} from '../../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';

import SearchInput, {createFilter} from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['question', 'answer',];



import { Fragment } from 'react';
import Collapsible from 'react-native-collapsible';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FAQs: [],
      searchTerm: '',
      isCollapseOpen:false,
      collapsed:{},
      
    };
  }

  componentDidMount = async () => {
    this.fetchTokenData()
    this.fetchFAQsData();

    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
  };

  
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
searchUpdated(term) {
  this.setState({searchTerm: term});
}


toggleExpanded = () => {
  //Toggling the state of single Collapsible
  this.setState({ collapsed: !this.state.collapsed });
};

isCollapsedSelected(name,value){
  let data=this.state.collapsed
  data={...data,[name]:!value}
  this.setState({collapsed:data})
}


toggleExpanded1 = () => {
  //Toggling the state of single Collapsible
  this.setState({ collapsed2: !this.state.collapsed2 });
};


  fetchFAQsData = async () => {
    const GetFAQsResponse = await GetFAQs();
    let isCollapsedData={}
    if (GetFAQsResponse.result === true) {
      var FAQs = GetFAQsResponse.response.faq;
      FAQs.map((singleMap,Index) =>{
        let key=`collapsed${Index+1}`
        isCollapsedData={...isCollapsedData,[key]:true}
      })
    }
    this.setState({FAQs,collapsed:isCollapsedData});
  };

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${01234567890}';
    } else {
      phoneNumber = 'telprompt:${01234567890}';
    }

    Linking.openURL(phoneNumber);
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
    const  {FAQs} = this.state;
    console.log("getting result inside render method------",FAQs)
    const filteredFAQs = FAQs.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#c29a74" />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Contact us</Text>
          <Text style={styles.headerText}> </Text>
        </View>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          {/* <View>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              // onPress={()=>{this.props.navigation.navigate("admincontact")}}
              onPress={() => {
                this.dialCall();
              }}>
              <Image
                source={callus}
                style={{height: 30, width: 30, margin: 7}}
              />
              <Text style={{margin: 10}}>call our customer service</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{marginStart:10,marginEnd:10}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}            
              // onPress={this.smsSendFunction} 
              onPress={() => Linking.openURL('mailto:thelyfe.help@gmail.com?subject=SendMail&body=Description') }
              title="support@example.com"
              >
              <Image
                source={messege}
                style={{height: 30, width: 30, margin: 7}}
              />
              <Text style={{margin: 10}}>
                Send a message to our customer service
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin: 20, marginTop: 30, alignSelf: 'flex-start'}}>
          <Text
            style={{
              textAlign: 'left',
              alignItems: 'flex-start',
              color: '#000000',
              fontSize: 15,
              fontWeight: '700',

            }}>
            Frequently Asked Question
          </Text>
        </View>

        <View style={{flexDirection:'row',
        height:40,
        width:'90%',
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        alignSelf:'center',
        borderColor:'red',
        borderWidth:0,  }}>
            <Image source={Search} style={{  height:22,
        width:22,
        margin:10}} />
            <SearchInput
             onChangeText={(term) => { this.searchUpdated(term) }} 
              style={{
                borderColor: 'red',
                borderWidth: 0,
                width: SCREEN_WIDTH * 0.8,
                marginStart: -10,
                height:38
              }}
              placeholder="Search Question..."
            />           
          </View>

        {/* <TextInput
          placeholder="Serach Question......"
          style={{
            paddingStart: 10,
            height: 40,
            width: '90%',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            alignSelf: 'center',
          }}
        /> */}
        <View style={{flex:2,borderWidth:0,borderColor:'blue',width:'99%',alignSelf:'center',marginBottom:20}}> 
        <ScrollView>
          {filteredFAQs.map((singleQuestion, index) => {
            let key=`collapsed${index+1}`
            return (              
              <View style={{flexWrap: 'wrap',borderWidth:0,width:'96%',alignSelf:'center',marginTop:10}}>
                <TouchableOpacity onPress={() => this.isCollapsedSelected(key,this.state.collapsed[key])}>                  
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:4,borderWidth:0,borderColor:'red'}}> 
                        <Text style={{margin: 0, textAlign: 'left',paddingStart:15}}>
                          {singleQuestion.question}
                        </Text>
                        <Image source={downArrow} style={{height:15,width:15,margin:7,marginEnd:10}} />
                    </View>                
                    <Collapsible  collapsed={this.state.collapsed[key]} align="center" style={{borderWidth:0}}>
                    <View style={{borderColor:'orange',borderWidth:0,height:90}}>
                      <Text style={{margin:3,textAlign: 'left',paddingStart:15}}>{singleQuestion.answer}</Text>
                      </View>
                    </Collapsible>                   
                </TouchableOpacity>               
              </View>            
            );
          })}
        </ScrollView>
        </View>
      </View>
    );
  }
}
