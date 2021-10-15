import React,{ useEffect,useState} from 'react';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    mediaDevices,
  } from 'react-native-webrtc';
  import {View,Text,StyleSheet,Button,Dimensions,StatusBar} from 'react-native';
  import {connect} from 'react-redux';
  import socketIO from 'socket.io-client';
  import array from './static APIS/GetData API';
  import LocalStreamComponent from '../comps/LiveView/LocalStreamComponent'
  import RemoteStreamComponent from '../comps/LiveView/RemoteStreamComponent'

  // Config variables: change them to point to your own servers
  const SIGNALING_SERVER_URL = 'http://192.168.0.105:9999';
  const TURN_SERVER_URL = '192.168.0.1:3478';
  const TURN_SERVER_USERNAME = 'username';
  const TURN_SERVER_CREDENTIAL = 'credential';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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


const Socket =  socketIO(SIGNALING_SERVER_URL,{
  autoConnect: false,
  jsonp: false,
  transports: ['websocket'],
})


const RemoteStreamGiver = (props) =>{
  var id = props.id


    const [LocalStreamCalled,setLocalStreamCalled] = useState(false)
    const [RemoteStream,SetRemoteStream]= useState({toURL:()=>null});
    const [usercame,setUserCame]= useState(null)

 

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
      
            
            // SetLocalStream(stream)
            props.LocalStreamset(stream)
          
              console.log("stream")
           //  Socket.connect()
            props.pc.addStream(stream)
            
          
                
          }).catch(error => {
            console.error('Stream not found: ', error);
          });
      
    }

  
  
    
    const CreatePeerConnection = () =>{
        try {
         
           props.pc.onicecandidate  =  event  =>{
            if (event.candidate) {
              console.log('ICE candidate');
             sendData({
                type: 'candidate',
                candidate: event.candidate
              });
            }

      }
                  props.pc.onaddstream = event =>{
            console.log("Add Stream")
           SetRemoteStream(event.stream) 
            setUserCame(1)    
            // if (props.Num>0){
            //   array.push({
            //     id : props.Num+1
            //   })
            // }
        //    props.RemoteStreamset(event.stream)
        }   
           console.log("PeerConnectionCreated")
          
        } catch (error) {
            console.error(error)
        }
    }
    


    const sendOffer = () => {
            props.pc.createOffer({}).then((description)=>{
            setAndSendLocalDescription(description),
            (error) => { console.error('Send offer failed: ', error); }
          }  
          );
    }

    const sendAnswer = () =>{
       console.log(" Answer Send ")
       props.pc.createAnswer().then((description)=>{
         setAndSendLocalDescription(description),
         (error)=>{console.error(error)}
       }

       );
    };
    
   

      const setAndSendLocalDescription = (description) =>{
        props.pc.setLocalDescription(description);
        console.log("Local des")
        sendData(description)
      };    
      
     
      
     const handleSignalingData = (data) => {
        switch (data.type) {
          case 'offer':
           CreatePeerConnection();
            props.pc.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
            break;
          case 'answer':
            props.pc.setRemoteDescription(new RTCSessionDescription(data));
            break;
          case 'candidate':
            props.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            break;
        }
      };
      const RemoteStreamCompoent1 = () =>{
   
        return(
          <View style = {{backgroundColor :"blue"}}>
            <RTCView
            streamURL = {RemoteStream.toURL()}
            objectFit = {"cover"} 
            style = {styles.RSCcontainer}            
            />
            </View>
         
        )
      }

    



    function StreamProvider (){          
      if (usercame == null){
        return(
          <LocalStreamComponent/>
        )
      }       
      else{ 
        console.log("remote")
        return(
          <RemoteStreamComponent RemoteStream = {RemoteStream}/>
        )
      }

    }

    useEffect(()=>{
      if (id == 0){
        if (LocalStreamCalled == false){
          getLocalStream()
          setLocalStreamCalled(true)
        }

      }
      else if (id == props.Num){
               Socket.connect()
               console.log("Here RemoteStreamComponent",props.Num,id)
      }
      else if (id == props.Num-1){
              Socket.disconnect()
              props.pc.close()
      }
    },[props.Num,id])

return (
  <View style = {styles.container }>
    <StatusBar
    translucent = {true}                                  
    />
    <StreamProvider
  />

  </View>
)
  }



  function mapStateToProps(state) {
    return {
        LocalStream: state.LocalStream,
        pc : state.pc,
        InitialUserId:state.InitialUserId,  
        RemoteStream:state.RemoteStream ,
        Num :state.Num,
        socket:state.socket  
    }
}

function mapDispatchToProps(dispatch) {            
    return {
      LocalStreamset: (stream) => dispatch(
        { 
          type: 'SET_LOCAL_Stream',
          data:stream
        }),
      SetPc : (pc) => dispatch(
        {
          type:"SET_PC",
          pcvalue:pc
        }
      ),        
      UpdateUserId : (newUserId) => dispatch(
        {
          type :"UP_DATE_USER_INTIAL_ID",
          newUserId:newUserId
        }
        ), 
      RemoteStreamset : (stream) => dispatch(
          { 
            type: 'REMOTE_Stream',
            data:stream
          }),

    }
}


const styles = StyleSheet.create({
  container : {
    flex:1,
    height:"100%",
    width:"100%",
    flexDirection:"column",
  
  },
  container1 : {
    flex:1,
    height:"100%",
    width:"100%",
    flexDirection:"column",
  
  },
  
  RSCcontainer:{
    flex:1,
    height:windowHeight,
    width:windowWidth,
  },
  RSCDescription:{
    position:"absolute",
    bottom:0,
    height:80,
    width:windowWidth,
  }
})


export default  connect(mapStateToProps,mapDispatchToProps)(RemoteStreamGiver)