import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,  
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F6F2EF'
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
    width:'104%',
    height:74,
    borderBottomLeftRadius:65,
    borderBottomRightRadius:65,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between',        
  },
  headerText:{
    fontSize:20,
    color:'#FFFFFF',
    fontWeight:'700',
    marginEnd:10,
    marginTop:12,
    

  },
  backArrowStyle:{
    height:20,
    width:20,
    marginStart:20,
    marginTop:15
  },
  headerBtnStyle:{
    flexDirection:'row',
    
    margin:7,
    alignItems:'center',
    borderColor:'red',
    borderWidth:1,
    justifyContent:'center'  
  },
  headerBtn:{
    backgroundColor:'#c29a74',
    justifyContent:'center',
    margin:3,
    width:'46%',
    height:45,
    borderRadius:50
  },
  headerBtnText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontWeight:'700',
    
  }, 
});
