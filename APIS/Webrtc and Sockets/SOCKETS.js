import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,

 } from 'react-native-webrtc';
 import array from '../static APIS/GetData API'
import React, {useState} from 'react';

function Socket (Ws,ReduxStore,dispatch,PC,SETPC){

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



  const fetch_USERS = () =>{
     
    Ws.send(JSON.stringify({
        action:"default",
    }))
}

                  
   fetch_USERS()

   let PartnerID ;


    Ws.onmessage = (entity)=>{ 
    mesage = JSON.parse(entity.data)
    if (mesage.type!="data"){
    console.log(mesage)
    }
   
    switch(mesage.type){
        case "data":
            handleSignalingData(mesage.data)
            break;
        case "ByanotherUser":
           PartnerID =mesage.PartnerConnectionID
            break; 
        case "Ready":
          PartnerID = mesage.PartnerConnectionID
            createPeerConnection()
            sendOffer()
            
        }

}





    const sendData = (DATAS) =>{

        
        Ws.send(JSON.stringify({
            action:"connecTo",
            data : DATAS,
            PartnerConnectionID :PartnerID,
        })     )
        
    }

    const createPeerConnection = () =>{
          
      try {
          setTimeout(SETPC (new RTCPeerConnection(PC_CONFIG)),2000)
          PC.onicecandidate  =  event  =>{
            if (event.candidate) {
              // console.log('ICE candidate');
             sendData({
                type: 'candidate',
                candidate: event.candidate
              });
            }

      }
           PC.onaddstream = event =>{
          //  console.log("Add Stream")
          dispatch({type:"REMOTE_Stream",data:event.stream});
     //      console.log("REDUXSTORE NUM ", ReduxStore.Num )
           dispatch({type:"REMOTE_STREAM_OBTAINED",data:true})
        } 
        PC.addStream(ReduxStore.LocalStream)  
       //    console.log("PeerConnectionCreated")
          
        } catch (error) {
            console.error(error)
        }
    }
    


    const sendOffer = () => {
            PC.createOffer({}).then((description)=>{
            setAndSendLocalDescription(description),
            (error) => { console.error('Send offer failed: ', error); }
          }  
          );
    }

    const sendAnswer = () =>{
       //console.log(" Answer Send ")
       PC.createAnswer().then((description)=>{
         setAndSendLocalDescription(description),
         (error)=>{console.error(error)}
       }

       );
    };
    
      const setAndSendLocalDescription = (description) =>{
        PC.setLocalDescription(description);
        // console.log("Local des")
        sendData(description)
      };    
   
      
     const handleSignalingData = (data) => {
        switch (data.type) {
          case 'offer':
           createPeerConnection();
            // console.log("Recieved Offer")
            PC.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
             // console.log("Send Answer")
            break;
          case 'answer':
             // console.log("recieved answer")
            PC.setRemoteDescription(new RTCSessionDescription(data));
            break;
          case 'candidate':
             // console.log("ICE candidates ")
            PC.addIceCandidate(new RTCIceCandidate(data.candidate));
            break;
        }
      };
}

export default Socket;