import React ,{useState} from 'react';
import {View,StyleSheet,Text,Button,ActivityIndicator,Dimensions} from 'react-native';
import { RTCView } from 'react-native-webrtc';
import WebRTC from '/Users/SUNIL/AyeVids_/AyeLives/APIS/WebRTC'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function WaitingScreen(props){
        return(
          <View style  = {styles.container}>
              <ActivityIndicator
              color = "blue"
              />
          </View>
        )
      }

const styles = StyleSheet.create({
  container:{
   height: windowHeight,
   width: windowWidth,
  }
})