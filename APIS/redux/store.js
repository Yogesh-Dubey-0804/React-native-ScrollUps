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

  const SIGNALING_SERVER_URL = 'http://192.168.0.103:9999';
  const TURN_SERVER_URL = '192.168.0.1:3478';
  const TURN_SERVER_USERNAME = 'username';
  const TURN_SERVER_CREDENTIAL = 'credential';
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
    Num :0,
    RemoteStream : {toURL:()=>null},
    socket :null,
   
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
                    pc:action.pcvalue
                }
         case 'UP_DATE_USER_INITIAL_ID':

               return{
                   ...state,
                   InitialUserId:action.newUserId     
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
        
    }

        return state
}


const store = createStore(reducer)
export default store;
