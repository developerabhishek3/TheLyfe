import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
  //  flex:1,
   width:SCREEN_WIDTH,
   height:SCREEN_HEIGHT,
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
  },
  headerView:{
    backgroundColor:'#c29a74',
    width:'101%',
    height:70,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',        
  },
  headerText:{
    fontSize:20,
    color:'#FFFFFF',
    fontWeight:'700',
    marginEnd:10,
    marginTop:20,
    textAlign:"center"
  },
  searchButton:{
    flexDirection:'row',
    height:40,
    width:'90%',
    borderRadius:10,
    backgroundColor:'lightblue',
    alignSelf:'center',
    borderColor:'red',
    borderWidth:0,
    margin:10
    
          
},
headertxtInputImg:{
    height:22,
    width:22,
    margin:10,
    marginEnd:25
},
  backArrowStyle:{
    height:20,
    width:20,
    margin:20,
    marginTop:40,
  },
  mainContainer:{
    width:'100%',
    borderColor:'red',
    borderWidth:1,
    height:SCREEN_HEIGHT/3,
    
    margin:3,  
  },
  categoryContainer:{
    // height:260,
    width:'100%',   
  },
  catImgStyle:{
    height:SCREEN_HEIGHT/3.9,
    width:SCREEN_WIDTH/2.6,
    margin:10,
    borderColor:'orange',
    borderWidth:0,
    borderRadius:5,
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
    opacity:0.6,
    height:SCREEN_HEIGHT/12,
    width:'103%',
    alignSelf:'center',    
    borderColor:'blue',
    borderWidth:0,

  },
  singleContainerStyle:{
   margin:10
  },
  textheader:{
    color:'#000000',
    fontWeight:'700',
    fontSize:12,
     
  },
  textSubheader:{
    color:'#000000',
    fontWeight:'600',
    fontSize:8,
    marginEnd:12,
    fontWeight:'700',
     
  }
  
 
});
