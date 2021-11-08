import React from 'react';
import {View,Dimensions,StyleSheet,StatusBar,Image
} from 'react-native';
import { RTCView } from 'react-native-webrtc';
import {useSelector,useDispatch} from 'react-redux';
import Description from './Description'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const RemoteStreamComponent = (props) =>{
   const ReduxStore = useSelector((state)=>state)
    return(
       
           
        <View style = {styles.MainView}>
        <StatusBar
        translucent = {true}
        />
          <RTCView
          streamURL = {ReduxStore.RemoteStream.toURL()}
          objectFit = {"cover"}
          style = {styles.stream}                                 
          />
          
        <View style = {styles.Container2}>
            <Description DbId= {ReduxStore.InitialUserId}/>
            <View style = {styles.btnContainer}>

                <Image
                source = {{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_fdS0ukj7-bDn_WJ5pT1jtoUbv1_-q52EVA&usqp=CAU"}}
                style = {{
                    height:50,
                    width:50,
                    borderRadius:50
                }}
                />

                <FontAwesome
                    name = {"heartbeat"}
                    size={45}
                    color={"grey"}
                />
                <MaterialCommunityIcons
                name = {"account-multiple-plus"}
                size={45}
                color={"white"}
            
                />
            </View>
        </View>
        
    </View>

    )
}

const styles = StyleSheet.create({
    MainView :{
        flex:1,
        flexDirection:"row"
       
    },
    stream:{
        position:"absolute",
        top:0,
        bottom:0 - StatusBar.currentHeight,
        left:0,
        right:0,
    },
    Container2:{
        backgroundColor:"transparent",
        height:windowHeight,
        width:windowWidth,
        justifyContent:"center"
        },
    btnContainer:{
        backgroundColor:"transparent",
        height:"50%",
        width:"15%",
        position:"absolute",
        right:0,
        justifyContent:"space-between"
    }
})
export default RemoteStreamComponent;