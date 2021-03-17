import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Auth component...
import Login from '../components/auth/Login/';
import Splash from '../components/auth/Splash/';
import Welcome from '../components/auth/Welcome/';
import Welcome2 from '../components/auth/Welcome2/';
import Signup from '../components/auth/Signup';
import afterSignupWelcome from '../components/auth/afterSignUpWelcome';
import continueAfterSignUp from '../components/auth/continueAfterSignup';

import SocialAuth from '../components/auth/socialLogin';

// Not Auth Component....
import Home from '../components/notAuth/Home';
import Search from '../components/notAuth/Search';
import Heart from '../components/notAuth/Heart';
import Calender from '../components/notAuth/Calendar';
import Account from '../components/notAuth/Account/';

import Contact from '../components/notAuth/Account/Contact';
import AdminContact from '../components/notAuth/Account/Contact/AdminContact'

import Profile from '../components/notAuth/Account/MyProfile';
import EditProfile from '../components/notAuth/Account/MyProfile/EditProfile';
import ForgotPassword from '../components/auth/forgotPassword/forgotPasswordReq1';
import ForgotPassword2 from '../components/auth/forgotPassword/forgotPasswordReq2';
import SetNewPassword from '../components/auth/forgotPassword/SetNewPassword';
import LoginWithInstagram from '../components/auth/socialLogin/loginWithInstagram'


import Workout from '../components/notAuth/selectCategory/Workout';
import WorkoutDetails from '../components/notAuth/selectCategory/Workout/WorkoutDetails';
import WorkoutTime from '../components/notAuth/selectCategory/Workout/WorkoutTime';


import Fashion from '../components/notAuth/selectCategory/Fashion';
import Fashion1 from '../components/notAuth/selectCategory/Fashion/index2';
import FahsionDetails from '../components/notAuth/selectCategory/Fashion/FashionDetail';

import  UpdatePassword from '../components/notAuth/Account/MyProfile/ChnagePassword';

import NextAppointment from '../components/notAuth/Calendar/index2';
import CancelledAppointment from '../components/notAuth/Calendar/index3';
import Reshedule from '../components/notAuth/Calendar/index4';

import TermsAndConditions from '../components/notAuth/Account/TermsAndCondition';
 import Notification from '../components/notAuth/Notification'

import AdDetail from '../components/notAuth/Calendar/DetailedScreen';


import AllAdvertisment from '../components/notAuth/Home/index2';

import MapScreen from '../components/notAuth/selectCategory/Fashion/mapindex';
import setting from '../components/notAuth/Account/Settings/index';


import privacypolicy from '../components/notAuth/Account/PrivacyPolicy/index';


import Termsofservice from '../components/auth/Signup/index2';


const AppNavigator = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
        gestureEnabled:false
      },
    },
    singup:{
        screen:Signup,
        navigationOptions: {
          headerShown: false,
        },
    },

    termsofservice:{
      screen:Termsofservice,
      navigationOptions: {
        headerShown: false,
      },
  },
    notification:{
      screen:Notification,
      navigationOptions: {
        headerShown: false,
      },
    },
    setting:{
      screen:setting,
      navigationOptions: {
        headerShown: false,
      },
    },
    addetail:{
      screen:AdDetail,
      navigationOptions: {
        headerShown: false,
      },
  },
  alladvertisement:{
    screen:AllAdvertisment,
    navigationOptions: {
      headerShown: false,
    },
},
mapscreen:{
  screen:MapScreen,
  navigationOptions: {
    headerShown: false,
  },
},
  
  termsandcondition:{
    screen:TermsAndConditions,
    navigationOptions: {
      headerShown: false,
    },
},


privacypolicy:{
  screen:privacypolicy,
  navigationOptions: {
    headerShown: false,
  },
},
    updatepassword:{
      screen:UpdatePassword,
      navigationOptions: {
        headerShown: false,
      },
  },
    nextappointment:{
      screen:NextAppointment,
      navigationOptions: {
        headerShown: false,
      },
  },
  reshedule:{
    screen:Reshedule,
    navigationOptions: {
      headerShown: false,
    },
},
    cancelappointment:{
      screen:CancelledAppointment,
      navigationOptions: {
        headerShown: false,
      },
    },

    socialauth:{
      screen:SocialAuth,
      navigationOptions: {
        headerShown: false,
      },
    },
    loginwithinstagram:{
      screen:LoginWithInstagram,
      navigationOptions: {
        headerShown: false,
      },
    },    
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
    welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    welcome2: {
      screen: Welcome2,
      navigationOptions: {
        headerShown: false,
      },
    },
    aftersignupwelcome: {
      screen: afterSignupWelcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    continueaftersignup: {
      screen: continueAfterSignUp,
      navigationOptions: {
        headerShown: false,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        headerShown: false,
      },
    },
    Heart: {
      screen: Heart,
      navigationOptions: {
        headerShown: false,
      },
    },
    Calender: {
      screen: Calender,
      navigationOptions: {
        headerShown: false,
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        headerShown: false,
      },
    },
    editprofile: {
      screen: EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },   
    workout:{
      screen:Workout,
      navigationOptions: {
        headerShown: false,
      },
    },
    workoutdetails:{
      screen:WorkoutDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    workouttime:{
      screen:WorkoutTime,
      navigationOptions: {
        headerShown: false,
      },
    },
    profile:{
      screen:Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    fashion:{
      screen:Fashion,
      navigationOptions: {
        headerShown: false,
      },
    },
    fashion1:{
      screen:Fashion1,
      navigationOptions: {
        headerShown: false,
      },
    },
    fahsiondetails:{
      screen:FahsionDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    contact:{
      screen:Contact,
      navigationOptions: {
        headerShown: false,
      },
    },
    forgotpassword:{
      screen:ForgotPassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    forgotpassword2:{
      screen:ForgotPassword2,
      navigationOptions: {
        headerShown: false,
      },
    },
    setnewpassword:{
      screen:SetNewPassword,
      navigationOptions: {
        headerShown: false,
      },
    },

    admincontact:{
      screen:AdminContact,
      navigationOptions: {
        headerShown: false,
      },
    }
    //     topNav:{
    //         screen:TopNav,
    //         navigationOptions:{
    //            headerShown:false
    //         }
    //     },

    //    BottomNavLayout:{
    //        screen:BottomNavLayout,
    //        navigationOptions:{
    //         headerShown:false
    //         }
    //    },
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'splash',
  },
);

export default createAppContainer(AppNavigator);
