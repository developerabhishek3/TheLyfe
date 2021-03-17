import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
import { parseZone } from 'moment';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default StyleSheet.create({
  container: {
  height:SCREEN_HEIGHT,
  width:SCREEN_WIDTH,
  // flex:1,
   backgroundColor:'#F6F2EF'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bgImgStyle: {
    height: '100%',
    width: '100%',
  },
  contentView: {
    flex:1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
    marginTop:-50,
    margin:3    
  },
  textView:{
    color:'red'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextView:{
    color:'#FFFFFF',
    fontWeight:'700',
    fontSize:20,  
    marginTop:200
  },
  headerTextView1:{
    color:'#FFFFFF',
    fontWeight:'700',
    fontSize:20,  
    marginTop:200,
    marginStart:50
  },
  ImageView:{
    // alignItems:'center',
    // justifyContent:'center'
 
  },
  imgStyle:{
    height:100,
    width:100,
    alignSelf:'center',
    borderRadius:50   
  },
  nameemailStyle:{
    margin:7
  },
  emailStyle:{
    color:'#000000',
    fontSize:13,
    fontWeight:'600',
    textAlign:'center',
    
  },
  nameStyle:{
    fontSize:13,
    fontWeight:'700',
    textAlign:'center',
    
  },
  contentTextView:{   
    borderColor:'blue',
    borderWidth:0,
    width:SCREEN_WIDTH*0.94, 
    marginBottom:50,
    borderColor:'blue'       
  },
  itemContentStyle:{
    flexDirection:'row',
    alignSelf:'flex-start',
    borderColor:'red',
    borderWidth:0,
    margin:7
  },
  contentImg:{
    height:20,
    width:20,
    margin:1,
  
  },
  contentTxt:{
   fontSize:11,
   color:'#000000',
   fontWeight:'700',
   margin:3,
   paddingStart:15,
   

  },
 
});
