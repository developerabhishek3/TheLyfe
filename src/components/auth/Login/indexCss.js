import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {  
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  bgImgStyle: {
  height:'100%',
  width:'100%', 
  },
  headerTxt: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    margin: 10, 
    marginTop:50
  },
  txtInputView: {
    flex: 3,
    marginTop:SCREEN_HEIGHT/6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth:0,
    marginBottom:10
   
  },
  txtInput: {
    borderColor: '#DDDDDD',
    borderRadius: 50,
    borderWidth: 1,
    width: '80%',
    height: 40,
    margin: 20,
    paddingStart: 15,
  },
  
  forgotpassword: {
    alignSelf: 'flex-end',
    marginEnd: 20,
    color: '#B87548',
    fontWeight: '700',
    fontSize: 14,

    // color:'#BD8A61',
    // color:'#F6F2EF'
  },
  loginBtn: {
    backgroundColor:'#c29a74',
    width: 170,
    height: 40,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 20,
  },
  loginBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  newUserView: {
    flexDirection: 'row',
    margin: 4,
  },
  newuser1: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  newuser2: {
    color: '#B87548',
    fontSize: 15,
    fontWeight: '700',
  },
  socialView: {
    flexDirection: 'row',
    margin: 10,
  },
  socailImage: {
    width: 33,
    height: 33,
    margin: 10,
  },
});
