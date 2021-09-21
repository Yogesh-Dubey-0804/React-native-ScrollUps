import React ,{ useState} from 'react';
import {  StyleSheet, View,TouchableOpacity} from 'react-native';
import WebRTCMobile from './WebRTCMobileVideoComponent';
import { Provider as PaperProvider,
        Text
} from 'react-native-paper';

const Description = (props) =>{
    var idlist = []
    var  id = props.DbId.id 
    idlist.push(id)
    console.log(idlist)
   
  function ScreenGiver(){
      var a = 0;
      if (a==null){
         return(<WebRTCMobile/>)
      }else{
        return(<WebRTCMobile/>)
         
      }
  }



    return (
        <View style = {styles.container}>
         
            <ScreenGiver/>
           <View style = {styles.Description}>
           <TouchableOpacity style = {styles.userInfoComponent}>                   
                <Text style = {styles.text}>@ {props.DbId.name}</Text>
                <Text style = {styles.textCountry}> {props.DbId.Country}</Text>
            </TouchableOpacity>
            
                <Text style = {styles.userDesc}>{props.DbId.Desc}</Text>
            <View style = {styles.Intrests}>
                <Text style ={styles.IntrestsText}>{props.DbId.Intrests.intrest1}</Text>
            </View>
            <View style = {styles.Intrests}>
                <Text style ={styles.IntrestsText}>{props.DbId.Intrests.intrest2}</Text>
            </View>
                
            <View style = {styles.Intrests}>
                <Text style ={styles.IntrestsText}>{props.DbId.Intrests.intrest3}</Text>
            </View> 
            
        </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    Description:{
        position: 'absolute',
        bottom:0,
},
   
    text:{
        color:"white",
        fontFamily:"Helvetica Neue Medium Extended",
        fontSize:20,    
},
    textCountry:{
        color:"white",
        fontFamily:"sans-serif-medium",
        fontSize:8
    },
    userInfoComponent:{
        flex:1,
        flexDirection:"row",
    },
    userDesc:{
        fontFamily:"FreeSans",
        color:"white",
        fontSize:13,
        marginLeft:15,

    },
    Intrests:{
        borderRadius:5
    },
    IntrestsText:{
        color:"white",
        fontFamily:"Helvetica Neue Medium"
    }
})


export default Description;