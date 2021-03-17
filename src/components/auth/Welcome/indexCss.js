import { StyleSheet,Dimensions } from "react-native";
import { color } from "react-native-reanimated";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    container:{
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,
        justifyContent:'center',   
        alignItems:'center' 
    },
    bgImgStyle:{
    
        height:'100%',
        width:'100%'
    },

    contentView:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'red',
        borderWidth:0,        
    },
    header:{
        borderColor:'red',
        borderWidth:0,
        justifyContent:'center'
    },
    imgView:{
      height:120,
      width:220,
    },
    imgTextView:{
      color:'#A9A9A9',
      textAlign:'center',
        fontSize:18,
        fontWeight:'700',
        marginTop:-20,
        marginBottom:40
    },
    headerTextView:{
        margin:10,        
        width:'100%',
        borderColor:'red',
        borderWidth:0,
    },
    textView:{
        color:'#000000',
        fontSize:18,
        margin:4,
        textAlign:'center',
        fontWeight:'700',
    },
    forgotpassword:{
        alignSelf:'flex-end',
        marginEnd:40,
      
        fontWeight:'700',
        fontSize:14
        // color:'#B87548',
        // color:'#BD8A61',
        // color:'#F6F2EF'
    },
    btnView:{
        marginTop:70,
        marginBottom:40
    },
    Btn:{
        backgroundColor:'#c29a74',
        width:150,
        height:40,
        justifyContent:'center',
        borderRadius:50,
        margin:10
    },
    BtnTxt:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'700',
        textAlign:'center',
        margin:20
    },    
})