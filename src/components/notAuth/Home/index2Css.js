import { StyleSheet,Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    container:{
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,      
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'red',
        borderWidth:0,
        backgroundColor:'#F6F2EF'
    },
    header:{
        height:180,
        backgroundColor:'#c29a74',
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        borderColor:'red',
        borderWidth:0,
        width:'103%',    
        alignSelf:'center',    
        marginBottom:-50
    },headerTxt:{
        fontSize:20,
        fontWeight:'600',
        textAlign:"left",
        color:'#FFFFFF',
        margin:10,
        marginStart:30,
        marginTop:4, 
               
        
    },
    backStyle:{
        height:20,
        width:20,
        marginTop:36,
        margin:15
        
    },  searchButton:{
        flexDirection:'row',
        height:40,
        width:'90%',
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        alignSelf:'center',
        borderColor:'red',
        borderWidth:0,                      
    },
   
    headertxtInputImg:{
        height:22,
        width:22,
        margin:10
    },
    contentView:{
        flex:1,
        width:'100%',    
        alignItems:'center',
        justifyContent:'center',
        borderColor:'red',
        borderWidth:0,
        margin:10,
        marginTop:55,
        marginBottom:40,
        flexDirection:'row',
        flexWrap:'wrap'
    },

    bgImgStyle:{
        height:SCREEN_HEIGHT/3.9,
        width:'90%',                     
        marginTop:16,
        alignSelf:'center',
        justifyContent:'flex-end',                    
    },
    ImgView:{
        width:'100%',             
    },
    bgImageMainStyle:{
        borderRadius:10,
        width:'99%'
    },    
    imgBottomView:{
        backgroundColor:'#FFFFFF',
        opacity:0.7,
        width:'100%',
        height:'35%',
        borderColor:'red',
        borderWidth:0
    },
        mainText:{
        fontSize:17,
        fontWeight:'700',
        paddingStart:10,
        padding:3,
        
    },
    subText:{
      flexDirection:'row',
    },
    subImgStyle:{
        height:20,
        width:20,
        margin:2
    },    
})