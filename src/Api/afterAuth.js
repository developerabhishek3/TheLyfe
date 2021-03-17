import Axios from 'axios';
import {commonHeader, endPoints, commonHeaderById} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';





export async function loginToken() {

 
  // const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
 
  try {
    const loginTokenResponse = await Axios.get(
      'https://www.thelyfe.fr/api/login_token',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}   
      },
    );
    if (loginTokenResponse.status) {
      // console.log("getting response on the function--------",loginTokenResponse.data)
      return {result: true, response: loginTokenResponse.data};
    } else {
      // console.log("getting error on the function--------",loginTokenResponse.data)
      return {result: false, error: loginTokenResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function getInstgramUserName() {

  const InstaUserId = await AsyncStorage.getItem('InstaUserId');
  const Instatoken = await AsyncStorage.getItem('Instatoken');

  const  InstatokenValue = JSON.parse(Instatoken);
  const InstaUserIdValue = JSON.parse(InstaUserId)

  console.log("getting token and userID on the api calling--------------",InstaUserId,Instatoken)
  
  try {
    const getInstgramUserNameResponse = await Axios.get(
      `https://graph.instagram.com/${InstaUserIdValue}?fields=id,username&access_token=${InstatokenValue}`,      
      {
        headers: {...commonHeader}     
      },
    );
    if (getInstgramUserNameResponse.status) {
      // console.log("getting response on the function--------",getInstgramUserNameResponse.data)
      return {result: true, response: getInstgramUserNameResponse.data};
    } else {
      return {result: false, error: getInstgramUserNameResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function getInstgramUserDetails() {

  const username = await AsyncStorage.getItem('username');
 
  const instagramUserName = JSON.parse(username)

  console.log("getting token and userID on the api calling--------------",instagramUserName)
  try {
    const getInstgramUserDetailsResponse = await Axios.get(
      `https://www.instagram.com/${instagramUserName}/?__a=1`,      
      {
        headers: {...commonHeader}     
      },
    );
    if (getInstgramUserDetailsResponse.status) {
      // console.log("getting response on the function--------",getInstgramUserDetailsResponse.data)
      return {result: true, response: getInstgramUserDetailsResponse.data};
    } else {
      return {result: false, error: getInstgramUserDetailsResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function GetFAQs() {
  try {
    const GetFAQsResponse = await Axios.get(
      'https://www.thelyfe.fr/api/faq',      
      {
        headers: {...commonHeader},
      },
    );
    if (GetFAQsResponse.status) {
      // console.log("getting response on the function--------",GetFAQsResponse.data)
      return {result: true, response: GetFAQsResponse.data};
    } else {
      return {result: false, error: GetFAQsResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function GetTermsAndConditions() {
  try {
    const GetTermsAndConditionsResponse = await Axios.get(
      'https://www.thelyfe.fr/api/terms_and_condition',      
      {
        headers: {...commonHeader},
      },
    );
    if (GetTermsAndConditionsResponse.status) {
      // console.log("getting response on the function--------",GetTermsAndConditionsResponse.data)
      return {result: true, response: GetTermsAndConditionsResponse.data};
    } else {
      return {result: false, error: GetTermsAndConditionsResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function GetPrivacyPolicy() {
  try {
    const GetPrvacyPolicyResponse = await Axios.get(
      'https://thelyfe.fr/api/privacy_policy',      
      {
        headers: {...commonHeader},
      },
    );
    if (GetPrvacyPolicyResponse.status) {
      // console.log("getting response on the function--------",GetPrvacyPolicyResponse.data)
      return {result: true, response: GetPrvacyPolicyResponse.data};
    } else {
      return {result: false, error: GetPrvacyPolicyResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}













export async function GetPastAgenda() {

  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const pastAgendaresponse = await Axios.get(
      'https://www.thelyfe.fr/api/past_agenda',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (pastAgendaresponse.status) {
      // console.log("getting response on the function--------",pastAgendaresponse.data)
      return {result: true, response: pastAgendaresponse.data};
    } else {
      return {result: false, error: pastAgendaresponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function GetFutureAgenda() {

  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const FutureAgendaResponse = await Axios.get(
      'https://www.thelyfe.fr/api/future_agenda',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (FutureAgendaResponse.status) {
      // console.log("getting response on the function--------",FutureAgendaResponse.data)
      return {result: true, response: FutureAgendaResponse.data};
    } else {
      return {result: false, error: FutureAgendaResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function GetMyCancelReservation() {

  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const MyCancelReservationResponse = await Axios.get(
      'https://www.thelyfe.fr/api/my_cancel_reservation',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (MyCancelReservationResponse.status) {
      // console.log("getting response on the function--------",MyCancelReservationResponse.data)
      return {result: true, response: MyCancelReservationResponse.data};
    } else {
      return {result: false, error: MyCancelReservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function GetMyRescheduleReservation() {

  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const MyRescheduleReservationResponse = await Axios.get(
      'https://www.thelyfe.fr/api/my_reschedule_reservation',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (MyRescheduleReservationResponse.status) {
      // console.log("getting response on the function--------",MyRescheduleReservationResponse.data)
      return {result: true, response: MyRescheduleReservationResponse.data};
    } else {
      return {result: false, error: MyRescheduleReservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}





export async function Logout() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
 
  try {
    const logoutResponse = await Axios.get(
      'https://www.thelyfe.fr/api/logout',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (logoutResponse.status) {
      // console.log("getting response on the function--------",logoutResponse.data)
      return {result: true, response: logoutResponse.data};
    } else {
      return {result: false, error: logoutResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function UserProfile() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
 
  try {
    const UserProfileResponse = await Axios.get(
      'https://www.thelyfe.fr/api/my_profile',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (UserProfileResponse.status) {
      // console.log("getting response on the function--------",UserProfileResponse.data)
      return {result: true, response: UserProfileResponse.data};
    } else {
      // console.log("getting error on the function--------",UserProfileResponse.data)
      return {result: false, error: UserProfileResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function updateUserProfile(body = {}) {



  console.log("ready body before send--------------,",body)
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const updateUserProfileResponse = await Axios.post(
      'https://www.thelyfe.fr/api/update_profile',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (updateUserProfileResponse.status) {
      console.log('getting response here-------', updateUserProfileResponse.data);
      return {result: true, response: updateUserProfileResponse.data};
    } else {
      console.log('getting error here----------', updateUserProfileResponse.data);
      return {result: false, error: updateUserProfileResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function ad_reservation(body = {} ) {
console.log("ready body before send---------",body)
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  console.log("getting toke n and idhere-----------",TokenValue, UserId)
  
  try {      
    const adreservationResponse = await Axios.post(
      'https://www.thelyfe.fr/api/ad_reservation',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (adreservationResponse.status) {
      console.log("getting rsult herer-----------",adreservationResponse.data)
      return {result: true, response: adreservationResponse.data}
      
    } else {
      console.log("getting rsult herer-----------",adreservationResponse.statusText)
      return {result: false, response: adreservationResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}

// api for notification......................




export async function MyNotification() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
 
  try {
    const MyNotificationResponse = await Axios.get(
      'https://thelyfe.fr/api/my_notification',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (MyNotificationResponse.status) {
      // console.log("getting response on the function--------",MyNotificationResponse.data)
      return {result: true, response: MyNotificationResponse.data};
    } else {
      // console.log("getting error on the function--------",MyNotificationResponse.data)
      return {result: false, error: MyNotificationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


// gettinginstagram details here--------




export async function InstagramDetails() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
 
  try {
    const MyNotificationResponse = await Axios.get(
      `https://www.instagram.com/${jitin.gambhir}/?__a=1`,      
      {
        headers: {...commonHeader, }     
      },
    );
    if (MyNotificationResponse.status) {
      // console.log("getting response on the function--------",MyNotificationResponse.data)
      return {result: true, response: MyNotificationResponse.data};
    } else {
      // console.log("getting error on the function--------",MyNotificationResponse.data)
      return {result: false, error: MyNotificationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}







// new setting notificaiton ............


export async function UpdateSettings(body = {} ) {
  console.log("ready body before send---------",body)
    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
  
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
  
    console.log("getting toke n and idhere-----------",TokenValue, UserId)
    
    try {      
      const UpdateSettingsResponse = await Axios.post(
        'https://thelyfe.fr/api/update_my_setting',
        body,
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
        },
      );
      if (UpdateSettingsResponse.status) {
        console.log("getting rsult herer-----------",UpdateSettingsResponse.data)
        return {result: true, response: UpdateSettingsResponse.data}
        
      } else {
        console.log("getting rsult herer-----------",UpdateSettingsResponse.statusText)
        return {result: false, response: UpdateSettingsResponse.data};
      }
    } catch (err) {
      let error = new Error();
      const {data, status} = err.response;
      error.response = err.response;
      if (status == 400 && data.error === 'invalid_grant') {
        error.message = 'Invalid Credentials';
      } else {
        error.message = 'Request Failed';
      }
      throw error;
    }
  }



  export async function MySetting() {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
  
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
   
    try {
      const MySettingsResponse = await Axios.get(
        'https://thelyfe.fr/api/my_setting',      
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
        },
      );
      if (MySettingsResponse.status) {
        // console.log("getting response on the function--------",MySettingsResponse.data)
        return {result: true, response: MySettingsResponse.data};
      } else {
        // console.log("getting error on the function--------",MySettingsResponse.data)
        return {result: false, error: MySettingsResponse.data};
      }
    } catch (error) {
      return {result: false, error};
    }
  }
  
  






export async function MyNotificationCount() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
 
  try {
    const MyNotificationCountResponse = await Axios.get(
      'https://thelyfe.fr/api/notification_count',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (MyNotificationCountResponse.status) {
      // console.log("getting response on the function--------",MyNotificationCountResponse.data)
      return {result: true, response: MyNotificationCountResponse.data};
    } else {
      // console.log("getting error on the function--------",MyNotificationCountResponse.data)
      return {result: false, error: MyNotificationCountResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}








export async function category_with_advertisement() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {
    const getCategoryWithAdvertisement = await Axios.get(
      'https://www.thelyfe.fr/api/category_with_advertisement',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (getCategoryWithAdvertisement.status) {
      // console.log("getting response on the function--------",getCategoryWithAdvertisement.data)
      return {result: true, response: getCategoryWithAdvertisement.data};
    } else {
      return {result: false, error: getCategoryWithAdvertisement.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function GetCountryList() {
  try {
    const GetCountryDataResponse = await Axios.get(
      'https://www.thelyfe.fr/api/country_list',      
      {
        headers: {...commonHeader},
      },
    );
    if (GetCountryDataResponse.status) {
      // console.log("getting response on the function--------",GetCountryDataResponse.data)
      return {result: true, response: GetCountryDataResponse.data};
    } else {
      return {result: false, error: GetCountryDataResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function Admin_Contact_Info() {
  try {
    const AdminContactResponse = await Axios.get(
      'https://www.thelyfe.fr/api/admin_contact_info',      
      {
        headers: {...commonHeader},
      },
    );
    if (AdminContactResponse.status) {
      // console.log("getting response on the function--------",AdminContactResponse.data)
      return {result: true, response: AdminContactResponse.data};
    } else {
      return {result: false, error: AdminContactResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function GetAllCategory() {

  // const currentLatitude = await AsyncStorage.getItem('currentLatitude');
  // const currentLongitude = await AsyncStorage.getItem('currentLongitude');

  // console.log("getting here------",currentLatitude)

  // const currentLatitudeValue = JSON.parse(currentLatitude);
  // const currentLongitudeVAlue = JSON.parse(currentLongitude)


  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  // console.log("getitng token annd user id on home page==============",TokenValue,UserId)


  // console.log("getting inside the api frunctin lat long--------------------",currentLatitudeValue, currentLongitudeVAlue)
  try {
    const CategoryResponse = await Axios.get(
      'https://www.thelyfe.fr/api/all_category',      
      {
        headers: {...commonHeader, }     
      },
    );
    if (CategoryResponse.status) {     
      return {result: true, response: CategoryResponse.data};
    } else {
      console.log("getting error herer---------------")
      return {result: false, error: CategoryResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function GetAllAdvertisement() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  // console.log("getting token and user id herer--------------------",token, user_id)
  try {
    const AdvertisementResponse = await Axios.get(
      'https://www.thelyfe.fr/api/all_advertisement',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (AdvertisementResponse.status) {
      // console.log("getting response on the function--------",AdvertisementResponse.data)
      return {result: true, response: AdvertisementResponse.data};
    } else {
      console.log("getting error herer---------------")
      return {result: false, error: AdvertisementResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function  advertisement_filter_by_category () {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  // console.log("getting token and user id herer--------------------",token, user_id)
  try {
    const advertisement_filter_by_categoryResponse = await Axios.get(
      'https://www.thelyfe.fr/api/advertisement_filter_by_category',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (advertisement_filter_by_categoryResponse.status) {
      // console.log("getting response on the function--------",advertisement_filter_by_categoryResponse.data)
      return {result: true, response: advertisement_filter_by_categoryResponse.data};
    } else {
      console.log("getting error herer---------------")
      return {result: false, error: advertisement_filter_by_categoryResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}







export async function updatePassword(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const updatePasswordResponse = await Axios.post(
      'https://www.thelyfe.fr/api/change_password',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (updatePasswordResponse.status) {
      return {result: true, response: updatePasswordResponse.data};
    } else {
      return {result: false, response: updatePasswordResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}



export async function Getdate_time_slots(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const date_time_slotsResponse = await Axios.post(
      'https://www.thelyfe.fr/api/date_time_slots',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (date_time_slotsResponse.status) {
      return {result: true, response: date_time_slotsResponse.data};
    } else {
      return {result: false, response: date_time_slotsResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}



// getting instagram details............

export async function  InstagramInfo() {

  const InstagramName = await AsyncStorage.getItem('InstagramName')

  const InstaName = JSON.parse(InstagramName)

  var url = `https://www.instagram.com/${InstaName}/?__a=1`

  console.log("inside the functon url>>>>>>>>>",url)

  console.log(">>>>>>>>>> insta name inside the api function------------",InstaName)  
  try {
    const GetInstagramInfoResponse = await Axios.get(url);
    if (GetInstagramInfoResponse.status) {
      console.log("getting response on the function--------",GetInstagramInfoResponse.data)
      return {result: true, response: GetInstagramInfoResponse.data};
    } else {
      console.log("getting error herer---------------")
      return {result: false, error: GetInstagramInfoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}









export async function GetAdvertisementDetails(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const AdvertisementDetailsResponse = await Axios.post(
      'https://www.thelyfe.fr/api/advertisement_detail',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (AdvertisementDetailsResponse.status) {
      return {result: true, response: AdvertisementDetailsResponse.data};
    } else {
      return {result: false, response: AdvertisementDetailsResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}


export async function CancelReservation(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const CancelReservationResponse = await Axios.post(
      'https://www.thelyfe.fr/api/ad_reservation_cancel',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (CancelReservationResponse.status) {
      return {result: true, response: CancelReservationResponse.data};
    } else {
      return {result: false, response: CancelReservationResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}




export async function TriggeredAcceptRejectAppoinment(body ={}) {
  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)  
  try {      
    const AcceptRejectAppoinmentResponse = await Axios.post(
      'https://www.thelyfe.fr/api/reject_accept_appointment',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (AcceptRejectAppoinmentResponse.status) {
      return {result: true, response: AcceptRejectAppoinmentResponse.data};
    } else {
      return {result: false, response: AcceptRejectAppoinmentResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}






export async function advertisement_by_category(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const AdvertisementByCategoryResponse = await Axios.post(
      'https://www.thelyfe.fr/api/advertisement_by_category',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (AdvertisementByCategoryResponse.status) {
      return {result: true, response: AdvertisementByCategoryResponse.data};
    } else {
      return {result: false, response: AdvertisementByCategoryResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}







export async function AddFavorite(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const AddFavoriteListResponse = await Axios.post(
      'https://www.thelyfe.fr/api/favourite_ad',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (AddFavoriteListResponse.status) {
      return {result: true, response: AddFavoriteListResponse.data};
    } else {
      return {result: false, response: AddFavoriteListResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}




export async function  GetAllFavorite () {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  // console.log("getting token and user id herer--------------------",token, user_id)
  try {
    const GetAllFavoriteResponse = await Axios.get(
      'https://www.thelyfe.fr/api/my_favourite_ad',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}     
      },
    );
    if (GetAllFavoriteResponse.status) {
      // console.log("getting response on the function--------",GetAllFavoriteResponse.data)
      return {result: true, response: GetAllFavoriteResponse.data};
    } else {
      console.log("getting error herer---------------")
      return {result: false, error: GetAllFavoriteResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}









// Check account status API


export async function CheckAccountStatus(body ={}) {

  
  try {      
    const CheckAccountStatusResponse = await Axios.post(
      'https://thelyfe.fr/api/check_account',
      body,
      {
        headers: {...commonHeader,}     
      },
    );
    if (CheckAccountStatusResponse.status) {
      return {result: true, response: CheckAccountStatusResponse.data};
    } else {
      return {result: false, response: CheckAccountStatusResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error == 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}