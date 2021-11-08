import React,{useEffect} from 'react'
import {View,Image,StyleSheet,Dimensions,StatusBar} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import RemoteStreamComponent from './../../comps/LiveView/RemoteStreamComponent';
import LocalStreamComponent from './../../comps/LiveView/LocalStreamComponent';
import StreamProvider from './StreamProvider';
import CallWebrtc from './WEBRTC';
const RenderItem = (props) =>{

   const ReduxStore = useSelector((state)=>state)
   const dispatch   = useDispatch()
 

  const id = props.id
 
  if (id == 0 ){
    
      return(
    <LocalStreamComponent id = {id} pc = {props.pc}/>
      )
}
  else if (ReduxStore.Num == id ){
      return(
    <StreamProvider />
      )
    }
    else {
      return(  
      <LocalStreamComponent id = {id}  pc = {props.pc}/>
      )
    }

}
export default RenderItem;