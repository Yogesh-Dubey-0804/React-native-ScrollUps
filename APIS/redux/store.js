import React from 'react';
import {View,Text} from 'react-native';
import { createStore } from 'redux'  ;
import {Provider} from 'react-redux';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    mediaDevices,

  } from 'react-native-webrtc';
import socketIO from 'socket.io-client'; 
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';

  const SIGNALING_SERVER_URL = 'http://192.168.0.103:9999';
  const TURN_SERVER_URL = '13.233.167.171:3478';
  const TURN_SERVER_USERNAME = 'user';
  const TURN_SERVER_CREDENTIAL = 'root';
  const PC_CONFIG = {
    iceServers: [
      {
        urls: 'turn:' + TURN_SERVER_URL + '?transport=tcp',
        username: TURN_SERVER_USERNAME,
        credential: TURN_SERVER_CREDENTIAL
      },
      {
        urls: 'turn:' + TURN_SERVER_URL + '?transport=udp',
        username: TURN_SERVER_USERNAME,
        credential: TURN_SERVER_CREDENTIAL
      }
    ]
};

const initialState = {
    LocalStream : {toURL :()=>null},
    pc :  new RTCPeerConnection(PC_CONFIG),
    InitialUserId : 0,
    Num:0,
    RemoteStream : {toURL:()=>null},
    RemoteStreamObtained:false,
   
}
       
const reducer = (state = initialState,action)=>{
    switch (action.type) {
        case 'SET_LOCAL_Stream':
            
            return { 
                ...state,
                LocalStream: action.data }
        case 'SET_PC':

                return{
                    ...state,
                    pc:new RTCPeerConnection(PC_CONFIG)
                }
         case 'UP_DATE_USER_INITIAL_ID':

               return{
                   ...state,
                   InitialUserId:action.data     
                }
         case "UPDATE NUM":
                
                return{
                  ...state,
                  Num:state.Num+1
                }
          case 'REMOTE_Stream':
            
                  return { 
                      ...state,
                      RemoteStream: action.data }
          case "REMOTE_STREAM_OBTAINED":
            return{
              ...state,
              RemoteStreamObtained:action.data,
            }
         
        
    }

        return state
}


const store = createStore(reducer)
export default store;
