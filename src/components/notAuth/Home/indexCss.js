import { StyleSheet,Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    container:{
        // flex:1,      
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center',
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
        marginBottom:10
    },headerTxt:{
        fontSize:20,
        fontWeight:'600',
        textAlign:"left",
        color:'#FFFFFF',
        margin:10,
        marginStart:30,
        marginTop:40, 
               
        
    },
    searchButton:{
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
        flex:2,        
        width:'100%',    
        alignItems:'center',
        justifyContent:'center',
        borderColor:'red',
        borderWidth:0,
        flexDirection:'row',
        flexWrap:'wrap',
        paddingBottom:65,
        // marginTop:50
        
    },
    categoryView:{
        // backgroundColor:'#FFFFFF',
        borderRadius:10,
       height:SCREEN_HEIGHT/8.6,
       width:SCREEN_WIDTH/4.9,
       margin:5,
       marginStart:15,
       marginEnd:15,
       borderColor:'red',
       borderWidth:0
      
    },
    ImgStyle:{
         height:SCREEN_HEIGHT/9.3,
       width:SCREEN_WIDTH/4.2,
        margin:3,      
        alignSelf:'center'
    },
    categoryText:{
        fontWeight:'700',
        fontSize:10,
        margin:1,
        textAlign:"center"
    },
})