import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
import { parseZone } from 'moment';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
   flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImgStyle: {
    height: '100%',
    width: '100%',
  },
  contentView: {
    flex:2,
    width:'100%',
    
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
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextView:{
    color:'#FFFFFF',
    fontWeight:'700',
    fontSize:20,   
    marginTop:200
  },
  headerImgView:{
    height:20,
    width:20,
    marginTop:200,
    alignSelf:'center'
  },
  ImageView:{
    // alignItems:'center',
    // justifyContent:'center'
 
  },
  imgStyle:{
    height:90,
    width:90,
    alignSelf:'center' ,
    borderRadius:50   
  },
  contentContainerView:{
    flex:3,
    width:'95%',
    borderColor:'red',
    borderWidth:0,
    margin:10,
    alignSelf:'flex-start',  
  },
 floatingInputStyle:{  
    fontSize: 14,
    
    width: '100%',
    color:'#000000',
    fontWeight:'600',
    borderBottomWidth:0,
    borderWidth:0,
    borderBottomColor: '#E5E5E5',  
 },
 floatingLabelStyle:{
    color: '#B87548',
    fontSize: 11,    
    paddingStart: 10,
    fontWeight:'700',
    
 } 
});
