
import firestore from '@react-native-firebase/firestore';

import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,StatusBar} from 'react-native';
import { AuthContext } from './utils';

  



 const Home = (props) =>{
  
  const registrationpage = (prop)=>{
    props.navigation.navigate("test")
  }
  const {signOut} = React.useContext(AuthContext)
  
  // console.log(UserDocument)

  return(
         <View style={styles.container}>
      <StatusBar hidden={true}/>

           <Text style={{color:"white"}}> {"\n"}
         </Text>
           
            

                    <TouchableOpacity  onPress= {()=>{signOut()}} style = {{bottom:"15%"}}>
                       <Text style ={{color:"#0276FD",fontWeight:"bold",fontFamily:"serif",fontSize:25,elevation:1,shadowOpacity:1,shadowColor:"yellow"}}>LogOut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress= {registrationpage} style = {{bottom:"15%"}}>
                       <Text style ={{color:"#0276FD",fontWeight:"bold",fontFamily:"serif",fontSize:25,elevation:1,shadowOpacity:1,shadowColor:"yellow"}}>Home</Text>
                    </TouchableOpacity>
         </View>
  
   
);
}
const styles = StyleSheet.create({
 container:{
   flex:1,
  justifyContent:"space-between",
  alignItems:"center",
  backgroundColor:'#000000',
  
}
});

export default Home ;
