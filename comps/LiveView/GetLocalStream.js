import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
  } from 'react-native-webrtc';
 
  

  export default function GotlocalStream(){
    const [localStream,setLocalStream] = useState({toURL: ()=>null})
    let isFront = false;
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!
          setLocalStream(stream);

          // setup stream listening
        
        })
        .catch(error => {
          // Log error
        });
    
    return(
        <View>
            <RTCView>
                
            </RTCView>
        </View>
    )
  }