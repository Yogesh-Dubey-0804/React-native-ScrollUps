import React from 'react';
import { Image, StatusBar, StyleSheet, View, Dimensions} from 'react-native';
import { RTCView } from 'react-native-webrtc';
import WebRTC from '/Users/SUNIL/AyeVids_/AyeLives/APIS/WebRTC'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class WebRTCMobile extends React.Component {
  state = {
    remoteStreamURL: null,
  }
 

  onConnect = () => {
    this.webrtc = new WebRTC();
    this.webrtc.onRemoteStreamObtained = (stream) => {
      this.setState({remoteStreamURL: stream.toURL()});
    }
   
    this.webrtc.connect();
    
  }
 
  render() 
  
  {
    return (
     <View style  = {styles.ayesavi}>
      <StatusBar hidden={true}/>
     
    
            {/* <RTCView
              streamURL={this.state.remoteStreamURL}
              objectFit = "cover"
              mirror={true}
              style = {styles.insideRTCcomponent}
           />
             */}
            <Image
            source = {{uri:"https://i.pinimg.com/736x/d2/77/10/d2771092926a99fb837e3a298a726a95.jpg"}}
            style={styles.insideRTCcomponent}
            />



         
       </View>
           
       
                      
     
    );
  }
};
const styles = StyleSheet.create({
  ayesavi:{
    flex:1
} ,
insideRTCcomponent:{
  
  height:windowHeight,
  width:windowWidth
}

 
})