import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
import {parseZone} from 'moment';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImgStyle: {
    height: '100%',
    width: '100%',
  },
  contentView: {
    flex: 2,
    width: '100%',

    borderColor: 'red',
    borderWidth: 0,
    marginTop: -50,
    margin: 3,
  },
  textView: {
    color: 'red',
  },
  headerView: {
    height: 400,
    marginTop: -250,
    width: '119%',
    borderRadius: 200,
    backgroundColor:'#c29a74',
    borderColor: 'red',
    borderWidth: 0,
    alignSelf:'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextView: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 200,
  },
  headerImgView: {
    height: 20,
    width: 20,
    marginTop: 200,
    alignSelf: 'center',
  },
  ImageView: {
    // alignItems:'center',
    // justifyContent:'center'
  },
  imgStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius:50
  },
  contentContainerView: {
    width: '95%',
    borderColor: 'red',
    borderWidth: 0,
    margin: 10,
  },
  textInputStyle: {
    borderColor: '#DDDDDD',
    borderWidth: 1,
    margin: 10,
    borderRadius: 50,
    width: '90%',
    paddingStart: 10,
    height: 42,
    alignSelf: 'center',
  },
  buttonMainView: {
    position: 'absolute',
    right: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
  buttonActionView: {
    backgroundColor:'#c29a74',
    borderRadius: 50,
    alignSelf: 'center',
    margin: 10,
    height: 40,
    width: '45%',
    justifyContent: 'center',
  },
  buttonActionText: {
    color: '#FFF',
    alignSelf: 'center',
    fontWeight: '700',

    fontSize: 18,
  },
});
