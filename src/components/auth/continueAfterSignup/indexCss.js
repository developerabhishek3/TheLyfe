import {StyleSheet, Dimensions} from 'react-native';

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

  imgView: {
    height: 100,
    width: 200,
  },

  headertxtView: {
    color: '#A9A9A9',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    marginTop: -20,
    marginBottom: 10,
  },

  forgotpassword: {
    // color:'#B87548',
    // color:'#BD8A61',
    // color:'#F6F2EF'
  },
  continueBtn: {
    backgroundColor:'#c29a74',
    width: 170,
    height: 40,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 50,
    marginTop:120,
    marginBottom:10
  },
  continueBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
