import React,{ useState} from 'react';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    mediaDevices,
  } from 'react-native-webrtc';
  import {View,Text,StyleSheet,Button} from 'react-native';
  import socketIO from 'socket.io-client';
  
  // Config variables: change them to point to your own servers
  const SIGNALING_SERVER_URL = 'http://192.168.0.101:9999';
  const TURN_SERVER_URL = '192.168.0.1:3478';
  const TURN_SERVER_USERNAME = 'username';
  const TURN_SERVER_CREDENTIAL = 'credential';


  // WebRTC config: you don't have to change this for the example to work
// If you are testing in local network, you can just use PC_CONFIG = {iceServers: []}
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

export default function RemoteStreamGiver(props) {

    const Socket = socketIO(SIGNALING_SERVER_URL,{
        autoConnect: false,
        jsonp: false,
        transports: ['websocket'],
    });

    const [LocalStream,SetLocalStream] = useState({toURL :()=>null})
    const [pc,setpc] = useState( new RTCPeerConnection(PC_CONFIG))
    const [RemoteStream,SetRemotStream]= useState({toURL:()=>null});





    Socket.on('data',(data)=>{
      handleSignalingData(data);
    })
    Socket.on('ready',()=>{
      console.log('ready')
        CreatePeerConnection();
        sendOffer()
    })

    
    const sendData = (data) =>{
        Socket.emit('data', data)
    }

    const getLocalStream  = () =>{

        mediaDevices.getUserMedia({
            audio: true, video: {facingMode: 'user'},
          }).then((stream) => {
      
          
            SetLocalStream(stream)
            pc.addStream(stream)
            Socket.connect();
          
      
          }).catch(error => {
            console.error('Stream not found: ', error);
          });
          
         
        
    }
  
    
    const CreatePeerConnection = () =>{
        try {
         
           pc.onicecandidate  =  event  =>{
            if (event.candidate) {
              console.log('ICE candidate');
             sendData({
                type: 'candidate',
                candidate: event.candidate
              });
            }

      }
           pc.onaddstream = event =>{
            console.log("Add Stream")
            SetRemotStream(event.stream)        
          }
           console.log("PeerConnectionCreated")
          
        } catch (error) {
            console.error(error)
        }
    }


    const sendOffer = () => {
            pc.createOffer({}).then((description)=>{
            setAndSendLocalDescription(description),
            (error) => { console.error('Send offer failed: ', error); }
          }  
          );
    }

    const sendAnswer = () =>{
       console.log(" Answer Send ")
       pc.createAnswer().then((description)=>{
         setAndSendLocalDescription(description),
         (error)=>{console.error(error)}
       }

       );
    };

   

      const setAndSendLocalDescription = (description) =>{
        pc.setLocalDescription(description);
        console.log("Local des")
        sendData(description)
      };


      
     const handleSignalingData = (data) => {
        switch (data.type) {
          case 'offer':
           CreatePeerConnection();
            pc.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
            break;
          case 'answer':
            pc.setRemoteDescription(new RTCSessionDescription(data));
            break;
          case 'candidate':
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            break;
        }
      };

return (
  <View style = {styles.container }>

  <RTCView
  streamURL = {RemoteStream.toURL()}
  objectFit={"cover"}

  style = {{
    width:"100%",
    height:"50%",
    position:"absolute",
    top:0,
    left:0,
    backgroundColor:"black"
    }}
  />

  <RTCView
    streamURL = {LocalStream.toURL()}
    objectFit={"cover"}
    style = {{
      width:"100%",
      height:"50%",
      position:"absolute",
      bottom:0,
      left:0,
      backgroundColor:"grey"
    }}
  />
  <Button
    title ={"Connect"}
    onPress={() => getLocalStream()}
  />
  </View>

)
  }
const styles = StyleSheet.create({
  container : {
    flex:1,
    width:"100%",
    flexDirection:"column",
    marginBottom:60
  },

})

export default RemoteStreamGiver;

