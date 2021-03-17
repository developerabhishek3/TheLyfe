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
    height: 70,
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
    height: 20,
    width: 20,
    marginTop: 30,
    margin: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInputView:{
      width:'90%',
      marginTop:30,
      borderWidth:0,
      borderColor:'red',margin:6,
    
  },
  textInputHeading:{
      fontSize:13,
      fontWeight:'700'
      ,margin:4,
      
  },
  textInputStyle:{
    borderColor:'#DDDDDD' ,
    borderWidth:1,
    borderRadius:20,
    paddingStart:10,
   height:SCREEN_HEIGHT/8
  },
  actionBtn: {
     
    backgroundColor:'#c29a74',
    width: 170,
    height: 40,
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 50,
    margin:30  
  },
  actionBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  calenderViewStyle:{
      backgroundColor:'lightblue',
      height:SCREEN_HEIGHT/2.3,
      borderRadius:20,
      margin:10,
      width:'90%'
    },
modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     },  
     text: {  
        color: '#3f2949',  
        marginTop: 10  
     }
});
