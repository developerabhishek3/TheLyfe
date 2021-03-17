import React, { Component } from 'react'
import { View,Text,TouchableOpacity,ScrollView,Image} from 'react-native'
import styles from './indexCss'
import back from '../../../../../assets/icon/back.png'
import {Admin_Contact_Info} from '../../../../../Api/afterAuth'
export default class indexCss extends Component {
    constructor(props){
        super(props)    
        this.state = {
            AdminContactData:[]
        }
      }

    componentDidMount = async () => {    
        // setInterval(() => {
        //   this.fetchCountryData();
        // },100);
        this.adminContactFunction()
      };
    
      adminContactFunction = async () => {
        const AdminContactResponse = await Admin_Contact_Info();
        if (AdminContactResponse.result === true) {
          var AdminContactData = AdminContactResponse.response.contact_info
          
        }
        this.setState({ AdminContactData,  });
       
      };

    render() {
        const {AdminContactData} = this.state;
        const adminMap = Object.assign(AdminContactData)
        console.log("getting admin contact details inside render-----------------", adminMap)
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Image  source={back} style={styles.backArrowStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Admin Contact</Text>
                    <Text style={styles.headerText}>          </Text>
                </View>
                <ScrollView>
                    <View style={styles.contentView}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>                         
                        <Text style={{fontWeight:'700',fontSize:15}}>  About Us -</Text>
                            <Text style={styles.textStyle}> {adminMap.about_us}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}> 
                            <Text style={{fontWeight:'700',fontSize:15}}> Address -</Text> 
                            <Text style={styles.textStyle}>{adminMap.address}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}> 
                            <Text style={{fontWeight:'700',fontSize:15}}> Contact -</Text> 
                            <Text style={styles.textStyle}>{adminMap.contact_no}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}> 
                            <Text style={{fontWeight:'700',fontSize:15}}> Email -</Text> 
                            <Text style={styles.textStyle}>{adminMap.contact_email}</Text>
                        </View>                                             
                    </View>
                </ScrollView>               
            </View>
        )
    }
}
