import React from 'react';
import {auth,getAuth} from '@react-native-firebase/auth'
import {View,StatusBar,Text,TouchableOpacity,StyleSheet,FlatList,Dimensions} from 'react-native';
import Posts from './../APIS/PostsDesc';
import onConnect from './LiveView/WebRTCMobileVideoComponent';
import Description from './LiveView/Description';   
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




var a = []

function PostChecker (item) {
    id = item.id 
    a.splice(0,0,id)
}

const OnScrollEvent = (b) =>{
  
    console.log("a")
}

const funct = (props) =>{
    <Description DbId = {item}/>
}




const LiveView = () =>{

    return (
        <View style = {styles.conatainer} >
            <StatusBar
             hidden={true}
            />
        <FlatList
    
        data = {Posts}
        renderItem = {({item})=><Description DbId = {item}/>}
        keyExtractor = {item=>item.id}
        scrollEnabled={true}
        snapToInterval = {windowHeight}
        decelerationRate ={"normal"}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        onScrollEndDrag = {()=>OnScrollEvent()}

        
        />
            
        </View> 
      


    )
}
const styles = StyleSheet.create({
    conatainer :{
   flex:1
   ,
   backgroundColor:"black"
    },
})

export default LiveView;
