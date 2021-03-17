import React, {Component} from 'react';
import {View, Text, ScrollView,StatusBar,TouchableOpacity,Image,BackHandler,Dimensions} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import back from '../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
import { GetMyPendingReservation, GetMyApproveReservation, GetMyCancelReservation } from '../../../Api/afterAuth'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import styles from './indexCss';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ưserDetails: {},
      isDetailsFetched: false,

      token: '',
      CancelAppointmentData: [],
      category_id: 2,

      isBodyLoaded: false,
      isSpinner: true,

      searchTerm: '',
    };
  }

  componentDidMount = async() => {
    this.fetchCancelAppointmentData()
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));    
    
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
}
  
handleBackButton=(nav)=> {
    
    if(!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
      return false;
    }else{
      nav.navigate("Home");
      return true;
    }
}

fetchCancelAppointmentData = async () => {
  const CancelAppointmentResponse = await GetMyCancelReservation();
  if (CancelAppointmentResponse.result === true) {
    // console.log("getting categoy response here-------------------",CancelAppointmentResponse.response)
    var CancelAppointmentData = CancelAppointmentResponse.response.reservation;
  }
  this.setState({isBodyLoaded: true, isSpinner: false, CancelAppointmentData});
  // console.log("getting categoryData response----------------",PendingAppointmentData)
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
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
            <Image source={back} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Agenda</Text>
          <Text style={styles.headerText}> </Text>
        </View>
      
        <View style={{borderColor:'red',borderWidth:0,width:'100%',marginStart:20}}>
          <ScrollView horizontal={true}>
              
          <TouchableOpacity key={'Next'}
               onPress={()=>{this.props.navigation.navigate("Calender")}}
              style={{borderColor:'#696969',height:40,justifyContent:'center', borderWidth:1,borderRadius:50,margin:4,marginStart:2,marginEnd:2}}>
                <Text style={{color:'#808080',fontSize:14,fontWeight:'700',marginStart:20,marginEnd:20,textAlign:'center',borderWidth:0,margin:7}}>Pending Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity key={'Next'}
               onPress={()=>{this.props.navigation.navigate("nextappointment")}}
              style={{borderColor:'#696969',height:40,justifyContent:'center', borderWidth:1,borderRadius:50,margin:4,marginStart:2,marginEnd:2}}>
                <Text style={{color:'#808080',fontSize:14,fontWeight:'700',marginStart:20,marginEnd:20,textAlign:'center',borderWidth:0,margin:7}}>Approved Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity key={'Previous'} style={{borderColor:'red',height:40,justifyContent:'center', borderWidth:0,borderRadius:50,backgroundColor:'#c29a74',margin:4,marginStart:5,marginEnd:5}}>
              <Text style={styles.headerBtnText}>Cancelled Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity key={'Next'}
               onPress={()=>{this.props.navigation.navigate("reshedule")}}
              style={{borderColor:'#696969',height:40,justifyContent:'center', borderWidth:1,borderRadius:50,margin:4,marginStart:2,marginEnd:2}}>
                <Text style={{color:'#808080',fontSize:14,fontWeight:'700',marginStart:20,marginEnd:20,textAlign:'center',borderWidth:0,margin:7}}>Reschedule Appointment</Text>
              </TouchableOpacity>

          </ScrollView>
        </View>        
        <ScrollView>

          <View style={{flexWrap:'wrap',alignContent:'center',borderColor:'blue',borderWidth:0,width:SCREEN_WIDTH}} >
            {/* <Text>Abhshek</Text> */}
            {
              this.state.CancelAppointmentData.map((singleApproveData) => {
                  return(
                    <View style={{borderColor:'red',borderWidth:0,margin:6,borderRadius:7,backgroundColor:'#FFFFFF',width:SCREEN_WIDTH*0.95}}> 
                    <TouchableOpacity
                      onPress={() => {
                      this.props.navigation.navigate('addetail', {
                        appointment_id:singleApproveData.appointment_id,
                        Id: singleApproveData.ad_id,
                        bgImg:singleApproveData.ad_image,
                        categoryName:singleApproveData.category_name,
                        companyName:singleApproveData.merchant_company_name,
                        requestDate:singleApproveData.request_date,
                        status:singleApproveData.reserve_status
                      });
                    }}>
                        <View style={{flexDirection:'row',margin:10}}>
                            <Image source={{
                                uri: `https://www.thelyfe.fr/${singleApproveData.ad_image}`,
                              }} 
                            style={{height:90,width:90,borderRadius:10,margin:10}}
                          />
                          <View style={{flexDirection:'column',margin:20,}}>
                          <Text style={{fontSize:18,fontWeight:'700',margin:1}}>{singleApproveData.merchant_company_name}</Text>
                          <Text style={{fontSize:13,fontWeight:'600',margin:3}}>{singleApproveData.request_date}</Text>
                          <Text style={{fontSize:13,fontWeight:'600',margin:3}}>{singleApproveData.reserve_status}</Text>
                          </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                  )
              })
            }
          </View>

        </ScrollView>
        <BottomNavigator
          currentRoute={'Calender'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
