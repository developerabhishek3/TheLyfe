import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F6F2EF'
    // borderColor: 'red',
    // borderWidth: 0,
  },
  header: {
    height: 80,
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
  header2: {
    height: 90,
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
    marginTop:30   
  },
  backStyle: {
    height: 20,
    width: 20,
    marginTop: 33,
    margin: 15,
  },






  headerTxt2: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 20,
    marginTop:40   
  },
  backStyle2: {
    height: 20,
    width: 20,
    marginTop: 40,
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
    margin: 7,
    alignSelf:'center',
    marginTop:3
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
      marginStart:15
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
      marginStart:13,
      margin:10,
      fontWeight:"700",
      borderColor:'red',
      borderWidth:0,
      color:'#000000',
  },
  containerSubHeading:{
    fontSize:16,
    fontWeight:"700",
    marginStart:16,
    margin:10
  },
  containerTxt:{
    fontSize:11,
    marginStart:10,
    fontWeight:"600",
    color:'#5A5757',
    width:'90%',
    marginStart:9,
    marginEnd:6,
    borderColor:'red',
    borderWidth:0,
    flexWrap:'wrap',
    alignSelf:'center',
    
  },
  rewardTxtView:{
      flexDirection:'row',
      marginStart:10
  },
  actionBtn: {
     
    backgroundColor:'#c29a74',
    height: 40,
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 50,
    marginStart: 5,
    marginEnd:5
  },
  actionBtn2: {
     
    backgroundColor:'#c29a74',
    height: 40,
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 50,
    marginStart: 15,
    marginEnd:5
  },

  actionBtn2: {
    backgroundColor:'#c29a74',
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 50,
    margin: 20,
  },
  actionBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    marginStart:20,marginEnd:20,
    fontWeight: '700',
    textAlign: 'center',
    
  },
  actionBtnTxt2: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    margin:10,
    marginStart:10,marginEnd:10,
    
  },
  rewardDot:{ 
     borderWidth:3,
     borderRadius:3,
     height:3,
     marginLeft:12,
     width:3,
     borderColor:'#000000',
     marginTop:5,
     margin:3,
    }

});
