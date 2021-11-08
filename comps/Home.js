import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,StatusBar,Image, Dimensions} from 'react-native';
import { AuthContext } from './utils';
import ScrollUp from './liveView';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




 const Home = () =>{
  

  return(
         <View style={styles.container}>
      <StatusBar hidden={false} translucent = {true} backgroundColor = {'rgba(52, 52, 52, 0)'}/>
              <Image
              source = {{uri:"https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}}
              blurRadius={0.2}
              style = {{
                height:windowHeight,
                width:windowWidth,
              }}/>
        
         </View>
  
);
}
const styles = StyleSheet.create({
 container:{
   flex:1,
  justifyContent:"space-between",
  alignItems:"center",
  backgroundColor:"white",
  
},
container2:{
  flex:1
}
});

export default Home ;
