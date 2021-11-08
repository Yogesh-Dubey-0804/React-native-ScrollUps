import React,{ useEffect,useState} from 'react';

   import Socket from "./SOCKETS";
  import array from '../static APIS/GetData API'
  


const WebrtcCall = (Ws,ReduxStore,dispatch,functionName) =>{


 let ReduxSstore = ReduxStore;

  function sendData(data){
    Socket(Ws,ReduxSstore,dispatch,{name:"sendData",datas:data})
  } 

      const createPeerConnection = () =>{
        try {
         
          ReduxStore.pc.onicecandidate  =  event  =>{
            if (event.candidate) {
              console.log('ICE candidate');
             sendData({
                type: 'candidate',
                candidate: event.candidate
              });
            }

      }
           ReduxStore.pc.onaddstream = event =>{
           console.log("Add Stream")
          dispatch({type:"REMOTE_Stream",data:event.stream});
         
          array.push({
             id:ReduxStore.Num+1
           })
        }   
           console.log("PeerConnectionCreated")
          
        } catch (error) {
            console.error(error)
        }
    }
    


    const sendOffer = () => {
            ReduxStore.pc.createOffer({}).then((description)=>{
            setAndSendLocalDescription(description),
            (error) => { console.error('Send offer failed: ', error); }
          }  
          );
    }

    const sendAnswer = () =>{
       console.log(" Answer Send ")
       ReduxStore.pc.createAnswer().then((description)=>{
         setAndSendLocalDescription(description),
         (error)=>{console.error(error)}
       }

       );
    };
    
      const setAndSendLocalDescription = (description) =>{
        ReduxStore.pc.setLocalDescription(description);
        console.log("Local des")
        sendData(description)
      };    
   
      
     const handleSignalingData = (data) => {
        switch (data.type) {
          case 'offer':
           createPeerConnection();
           console.log("Recieved Offer")
            ReduxStore.pc.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
            console.log("Send Answer")
            break;
          case 'answer':
            console.log("recieved answer")
            ReduxStore.pc.setRemoteDescription(new RTCSessionDescription(data));
            break;
          case 'candidate':
            console.log("ICE candidates ")
            ReduxStore.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            break;
        }
      };
         if (functionName.name=="Handlesignallingdata"){
           console.log("handlesignallingdata")
                handleSignalingData(functionName.data)
         }
         else if (functionName.name == "CreatePeerConnectionAndSendAnswer"){
           console.log("called Peer connection ")
                createPeerConnection()
                 sendOffer()
         }
    }




export default WebrtcCall;
