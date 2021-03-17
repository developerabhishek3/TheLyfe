import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImgStyle: {
    height: '100%',
    width: '100%',
  },
  contentView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  headerTxt: {
    textAlign:'center',
    color:'#FFFFFF',
    fontSize:24,
    fontWeight:'700',
    marginTop:50
  },
  txtInputView: {
    flex: 3,
    width:'100%',
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  txtInput: {
    borderColor: '#DDDDDD',
    borderRadius: 50,
    borderWidth: 1,
    width: '80%',
    height: 40,
    margin: 10,
    paddingStart: 15,
  },
  nameSurNameViewStyle:{
    flexDirection:'row',
    width: '100%',
    justifyContent:'center'
  },
  nameSurNameContentStyle:{
    width: '37%',
    borderColor: '#DDDDDD',
    borderRadius: 50,
    borderWidth: 1,
    height: 40,
    margin: 10,
    paddingStart: 15,
  },
  subHeaderTxt:{
      color:'#FFFFFF',
      fontWeight:'600',
      fontSize:14,
      margin:4
  },  
  imgView: {
    height: 100,
    width: 200,
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
  

});
