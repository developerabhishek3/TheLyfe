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
  header: {
    borderColor: 'red',
    borderWidth: 0,
    justifyContent: 'center',
  },
  imgView: {
    height: 100,
    width: 200,
    alignSelf:'center'
  },
  imgTextView: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 36,
    marginTop: -10,
    marginBottom: 40,
    fontWeight:'700',
    margin:10,
    //fontFamily:'Montserrat-bold' 
  },
  textView: {
    color: '#000000',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '700',

  },
  forgotpassword: {
    alignSelf: 'flex-end',
    marginEnd: 40,

    fontWeight: '700',
    fontSize: 14,
    // color:'#B87548',
    // color:'#BD8A61',
    // color:'#F6F2EF'
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems:'center'
  },
  textContent2: {
    flexDirection: 'row',
    padding: 2,
    textAlign:'center'
  },
  textContentnormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    padding: 2,
    
  },
  textContentspecial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B87548',
    padding: 2,
    
  },
  instaImgStyle: {
    height: 100,
    width: 100,
    margin: 30,
    alignSelf: 'center',
  },
  areYouReadyStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    
  },
  letsGoStyle: {
    color: '#B87548',
    fontSize: 22,
    fontWeight: '700',
    margin:10,
    alignSelf:'center',
    

  },
  loginBtn: {
    backgroundColor:'#c29a74',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 20,
  },
  loginBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    margin:7,
    marginStart:50,
    marginEnd:50,
    fontWeight: '700',
    textAlign: 'center',
  },
});
