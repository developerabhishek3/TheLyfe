import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
    backgroundColor:'#F6F2EF'
  },
  header: {
    height: SCREEN_HEIGHT/9,
    backgroundColor:'#c29a74',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: 'red',
    borderWidth: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 10,
    marginEnd: 10,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 20,
    marginTop: 25,
  },
  backStyle: {
    height: 22,
    width: 22,
    margin: 20,
    marginTop: 30,
  },
  headertxtInputImg: {
    height: 22,
    width: 22,
    margin: 10,
  },
  contentView: {
    flex: 2,
    width: '100%',
    marginBottom: 0,
    borderColor: 'red',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:-50,
    margin:3        
  },
  
  imgStyle: {
    height: 220,
    width: '100%',    
    margin: 10,
    alignSelf:'center',
    justifyContent: 'flex-end',
  },
  ImgView: {
    width: '100%',
    height:200,  
    borderColor:'red',
    borderWidth:0,
    marginTop:-10,
    marginBottom:10
   
  },
  subheader:{
      flexDirection:'row',
      margin:3,      
  },
  subheaderImg:{
      height:20,
      width:20,margin:3
  },
  contentContainerView:{
    flex:3,
    width:'95%',
    borderColor:'red',
    borderWidth:0,
    margin:10,
    marginBottom:20,
    alignSelf:'flex-start',  
  },

 floatingInputStyle:{  
    fontSize: 12,    
    width: '90%',
    height:SCREEN_HEIGHT/19,
    paddingStart:10,
    color:'#000000',
    fontWeight:'600',
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius:20,
    alignSelf:'center',
    margin:7,
 
 },
 txtInput: {
  borderColor: '#DDDDDD',
  borderRadius: 50,
  borderWidth: 1,
  width:'90%',
  height: 40,
  margin: 10,
  paddingStart: 15,
  alignSelf:'center'
},

 floatingInputStyle1:{  
    fontSize: 12,
    
    width:SCREEN_WIDTH/2.4,
    height:SCREEN_HEIGHT/19,
    paddingStart:10,
    color:'#000000',
    fontWeight:'600',
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius:20,
    alignSelf:'center',
    margin:7,
 
 },
 MessageInputStyle:{  
    fontSize: 12,
    
    width: '90%',
    height:SCREEN_HEIGHT/9,
    paddingStart:10,
    color:'#000000',
    fontWeight:'600',
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius:20,
    alignSelf:'center',
    margin:3,
    textAlignVertical:"top"
 },
 twotitleStyle:{
  margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',
 },

 actionBtn: {
     
    backgroundColor:'#c29a74',
    width: SCREEN_WIDTH/2,
    height: SCREEN_HEIGHT/16,
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 50,
    margin: 20,
  },
  actionBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
 
});
