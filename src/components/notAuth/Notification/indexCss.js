import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    // flex:1,
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
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
    borderWidth: 1,
    flexDirection:'row',
    width:'100%'
  },
  headerView:{
    backgroundColor:'#c29a74',
    width:'105%',
    height:70,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
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
    marginTop:20,
     
  },
  backArrowStyle:{
    height:20,
    width:20,
    marginStart:20,
    marginTop:20,
  },
  headerMainText:{
    color:'#BD8A61',
    fontSize:18,
    fontWeight:'700',
    marginTop:10,
    margin:5,
    paddingStart:10,
    alignSelf:'flex-start',
     
        
  },
  mainContainer:{
    width:'100%',
    borderColor:'red',
    borderWidth:1,
    height:SCREEN_HEIGHT/4,
    flexDirection:'row',
    margin:3,  
  },
  categoryContainer:{
 
    width:'100%',   
  },
  catImgStyle:{
    height:SCREEN_HEIGHT/4,
    width:SCREEN_WIDTH/2.6,
    margin:7,
    borderColor:'red',
    borderWidth:0,
    borderRadius:10,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    

  },
  imgContainerView:{
    backgroundColor:'#FFFFFF',
    opacity:0.7,
    height:SCREEN_HEIGHT/12,
    width:'100%',    
    borderColor:'blue',
    borderWidth:0
  },
  singleContainerStyle:{
   flexDirection:'column',
   margin:1,
   marginStart:5,
   
  },
  textheader:{
    color:'#000000',
    fontWeight:'700',
    fontSize:13,
    width:'80%',
    borderWidth:0,
    paddingStart:7,
  },
  textSubheader:{
    color:'#000000',
    fontWeight:'700',
    fontSize:8,
    marginEnd:15,
    paddingEnd:10,
    marginTop:-10,
    borderWidth:0,
    //fontFamily:'Montserrat-bold' 

  },
  imgsubheader:{
 

  }
  
});
