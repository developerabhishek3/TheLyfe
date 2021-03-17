import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
    backgroundColor:'#F6F2EF'
  },
  header: {
    height: 50,
    backgroundColor:'#c29a74',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: 'red',
    borderWidth: 0,
    width: '100%',
    flexDirection: 'row',
    alignSelf:'center',
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
    marginTop:5   
  },
  backStyle: {
    height: 20,
    width: 20,
    marginTop: 10,
    margin: 15,
  },
  headertxtInputImg: {
    height: 20,
    width: 20,
    margin: 10,
  },
  contentView: {
    flex: 2,
    width: '100%',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:15
  },
  
  imgStyle: {
    height:SCREEN_HEIGHT/3.1,  
    width: '100%',    
    margin: 10,
    alignSelf:'center',
    marginTop:30
  },
  ImgView: {
    width: '100%',
    height:SCREEN_HEIGHT/3.1,  
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
      height:15,
      width:15,
      margin:1,
      marginStart:10
      
  },
  contentConteinrView:{
      flex:3,
      marginTop:0,
      marginBottom:10,
      borderColor:'red',
      borderWidth:0
  },
  containerHeader:{
      fontSize:18,
      margin:10,
      fontWeight:"700",

  },
  containerSubHeading:{
    fontSize:16,
    margin:3,
    marginStart:10, 
    fontWeight:"700",
  },
  containerTxt:{
    fontSize:13,
    marginStart:10,
    fontWeight:"600",
    color:'#5A5757'
    
  },
  rewardTxtView:{
      flexDirection:'row'
  },
  actionBtn: {
     
    backgroundColor:'#c29a74',
    width: 170,
    height: 40,
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
  rewardDot:{  borderWidth:3,borderRadius:3,height:3,width:3,borderColor:'#000000',marginTop:5,margin:3}

});
