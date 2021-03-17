import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {  
    height:SCREEN_HEIGHT,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F6F2EF'    
  },
  bgImgStyle: {
  height:'100%',
  width:'100%', 
  },
  headerView:{
    backgroundColor:'#c29a74',
    width:'104%',
    height:74,
    borderBottomLeftRadius:65,
    borderBottomRightRadius:65,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between',        
  },
  contentView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  headerTxt: {
    fontSize: 19,
    fontWeight: '700',
    alignSelf:'center',
    color: '#FFFFFF',
    marginTop: 10, 
  
  },
  txtInputView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth:0,
    marginBottom:70
   
  },
  txtInput: {
    borderColor: '#DDDDDD',
    borderRadius: 50,
    borderWidth: 1,
    width:SCREEN_WIDTH*0.8,
    height: 40,
    margin: 20,
    paddingStart: 15,
  },
  
  forgotpassword: {
    alignSelf: 'flex-end',
    marginEnd: 40,
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
    marginTop:90,
  },
  loginBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerImgView:{
    height:20,
    width:20,
    marginTop:200,
    alignSelf:'center'
  },
  newUserView: {
    flexDirection: 'row',
    margin: 4,
  },
  newuser1: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
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
