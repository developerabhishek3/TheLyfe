import Axios from 'axios';
import {commonHeader, endPoints} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';

export async function createUser(body = {}) {
  try {
    const createUserRegister = await Axios.post(
      'https://thelyfe.fr/api/registration_via_manual',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (createUserRegister.status) {
      console.log('getting response here-------', createUserRegister.data);
      return {result: true, response: createUserRegister.data};
    } else {
      console.log('getting error here----------', createUserRegister.data);
      return {result: false, error: createUserRegister.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function loginUser(body ={}) {
  try {      
    const loginUserResponse = await Axios.post(
      'https://www.thelyfe.fr/api/login',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (loginUserResponse.status) {
      return {result: true, response: loginUserResponse.data};
    } else {
      return {result: false, response: loginUserResponse.data};
    }
  } catch (err) {
    console.log('Error ----- ', err)
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







export async function ForgotPassword1(body = {}) {
  try {
    const forgotpassword_req_1_Response = await Axios.post(
      'https://www.thelyfe.fr/api/forgotpassword_req_1',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_1_Response.status) {
      console.log('getting response here-------', forgotpassword_req_1_Response.data);
      return {result: true, response: forgotpassword_req_1_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_1_Response.data);
      return {result: false, error: forgotpassword_req_1_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function ForgotPassword2(body = {}) {
  try {
    const forgotpassword_req_2_Response = await Axios.post(
      'https://www.thelyfe.fr/api/forgotpassword_req_2',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_2_Response.status) {
      console.log('getting response here-------', forgotpassword_req_2_Response.data);
      return {result: true, response: forgotpassword_req_2_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_2_Response.data);
      return {result: false, error: forgotpassword_req_2_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function SetNewPassword(body = {}) {
  try {
    const setNewPasswordResponse = await Axios.post(
      'https://www.thelyfe.fr/api/setpassword',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (setNewPasswordResponse.status) {
      console.log('getting response here-------', setNewPasswordResponse.data);
      return {result: true, response: setNewPasswordResponse.data};
    } else {
      console.log('getting error here----------', setNewPasswordResponse.data);
      return {result: false, error: setNewPasswordResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function SocialAuth(body = {}) {
  try {
    const socialAuthResponse = await Axios.post(
      'https://www.thelyfe.fr/api/social_auth',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (socialAuthResponse.status) {
      console.log('getting response here-------', socialAuthResponse.data);
      return {result: true, response: socialAuthResponse.data};
    } else {
      console.log('getting error here----------', socialAuthResponse.data);
      return {result: false, error: socialAuthResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


// export async function UserForgotPassword(body = {}) {
//   try {
//     const forgotPasswordResponse = await Axios.post(
//       'https://yogurtapp.moreyeahs.in/api/Account/ForgotPassword',
//       body,
//       {
//         headers: {...commonHeader},
//       },
//     );
//     if (forgotPasswordResponse.status === 200) {
//       return {result: true, response: forgotPasswordResponse.data};
//     } else {
//       return {result: false, error: forgotPasswordResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }

// export async function GetCustomer() {
//   try {
//     const Authorization = await AsyncStorage.getItem('userLoggedInToken');

//     const GetCustomerResponse = await Axios.get(
//       'https://yogurtapp.moreyeahs.in/api/Customer/GetCustomerById',
//       {
//         headers: {...commonHeader, Authorization: `Bearer ${Authorization}`},
//       },
//     );
//     if (GetCustomerResponse.status === 200) {
//       return {result: true, response: GetCustomerResponse.data, Authorization};
//     } else {
//       return {result: false, error: GetCustomerResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }


// export async function UserUpdate(body = {}) {
//   try {
//     console.log("Update body before send - ",body);
//     const UserprofileUpdateResponse = await Axios.put(
//       'https://yogurtapp.moreyeahs.in/api/Customer/UpdateCustomer',
//       body,
//       {
//         headers: {...commonHeader},
//       },
//     );
//     if (UserprofileUpdateResponse.status === 200) {
//       return {result: true, response: UserprofileUpdateResponse.data};
//     } else {
//       return {result: false, error: UserprofileUpdateResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }


// export async function createNewPassword(body = {}) {
//   try {
//     console.log("Update body before send - ",body);
//     const createNewPasswordResponse = await Axios.put(
//       'https://yogurtapp.moreyeahs.in/api/Account/UpdatePassword',
//       body,
//       {
//         headers: {...commonHeader},
//       },
//     );
//     if (createNewPasswordResponse.status === 200) {
//       return {result: true, response: createNewPasswordResponse.data};
//     } else {
//       return {result: false, error: createNewPasswordResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }

// export async function createPaymentRequest(body) {
//   try {
//     console.log("Update body before send - ",body);
//     const createPayment = await Axios.post(
//       'https://yogurtapp.moreyeahs.in/api/Customer/CreatePaymentRequest',body,
//       {
//         headers:{
//           Authorization: `Bearer EAAAEOJnJzWuHPusXJBvZC-V0DqjqKjRVdETumcgxaiUhSzUic9Sr7DzznlJhxPL`,
//           'Content-Type': 'application/json',
//           'Accept': '*/*'
//         }
//       },
//     );
//     if (createPayment.status === 200) {
//       console.log('create Payment response API Success - ', createPayment)
//       return {result: true, response: createPayment.data};
//     } else {
//       console.log('create Payment response API Fail - ', createPayment)
//       return {result: false, error: createPayment.data};
//     }
//   } catch (error) {
//     console.log('create Payment response API error - ', error)
//     return {result: false, error};
//   }
// }
