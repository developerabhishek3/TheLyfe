import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    backgroundColor:'#F6F2EF'
    // justifyContent: 'center',
    // alignItems: 'center',
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
  headerView:{
    backgroundColor:'#c29a74',
    width:'100%',
    height:80,
    borderBottomLeftRadius:70,
    borderBottomRightRadius:70,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',        
  },
  headerText:{
    fontSize:20,
    color:'#FFFFFF',
    fontWeight:'700',
    marginEnd:10
  },
  backArrowStyle:{
    height:20,
    width:20,
    marginStart:20,
    marginTop:5
  },
  headerBtnStyle:{
    flexDirection:'row',
    width:'100%',
    margin:7,
    alignItems:'center',
    justifyContent:'center'  
  },
  headerBtn:{
    backgroundColor:'#BD8A61',
    justifyContent:'center',
    margin:3,
    width:'46%',
    height:45,
    borderRadius:50
  },
  headerBtnText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontWeight:'700'
  }, 
});
