import React from 'react';
import { Image,Button, StatusBar, StyleSheet, View,FlatList,Text} from 'react-native';


const Description = (props) =>{
    return (
        <View style = {styles.Description}>
            <View style = {styles.userinfocontainer}>                            
                <Text style = {styles.text}>@ {props.name}</Text>
                    <View style = {styles.text}>
                        <Text>{props.country} </Text>
                    </View>

            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    Description:{
        flex:1,
        flexDirection:'row'
    },
    userinfocontainer:{
        height:"100%",
       
    },
    text:{
        color:"white",
        fontFamily:"Helvetica Neue Medium Extended",
        fontSize:20,
        fontStyle:"normal",
        includeFontPadding:true,
        fontVariant:[undefined,

            "proportional-nums"],
           
    },
  
})


export default Description;