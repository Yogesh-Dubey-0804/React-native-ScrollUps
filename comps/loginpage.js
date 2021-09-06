import auth from '@react-native-firebase/auth';
import React,{useState,useEffect} from "react";
import {TextInput,
        KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Text, 
        View,
        StyleSheet,
        Keyboard,
        TouchableOpacity,
        ScrollView,
        ToastAndroid,
        StatusBar
      } from 'react-native';
import Termsconds from './terms&conditions';
import { AuthContext } from './utils';


function Loginpage(props){

  const [number,setNumber]= useState("")
  const [confirm,setConfirm]= useState(null)

  const Signin = async()=>{
    const confirmation = await auth().signInWithPhoneNumber("+91"+number);
    if (confirmation){
      setConfirm(confirmation);
      props.navigation.navigate('OTP',{"confirm":confirmation,"number":number})
    }
  }



  const LengthChecker=()=>{
    ToastAndroid.show("Please Enter a Valid Mobile Number",ToastAndroid.SHORT)
  }



   return(
    
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

  <View style = {styles.mainview}>{/* The whole page View*/}
  <StatusBar
  
  hidden={true
  }/>
    <KeyboardAvoidingView>   
      <Text style={styles.text}>
        Give us  
      </Text>
          <Text style={styles.urmobno}>
            Your Mobile Number
          </Text>
              <Text style={styles.coats}>
                  Active Mobile Number is {"\n"}needed to 
              </Text>
                  <TextInput style ={styles.input}
                    placeholder="Enter Your Mobile Number"
                    onChangeText= {(value)=> setNumber(value)}  
                    placeholderTextColor="grey"
                    autoFocus={true}
                    maxLength={10}
                    onEndEditing={Keyboard.dismiss}
                    keyboardType={"numeric"}>
                  </TextInput>
    </KeyboardAvoidingView>
             <View style={styles.bottomView}>
                        <TouchableOpacity 
                          style={styles.button}
                           disabled={number.length>=6?false : true }
                           onPress ={number.length==10?Signin:LengthChecker}>
                            <Text style={styles.textagree}>
                              Agree & Continue 
                              </Text>
                          </TouchableOpacity>
                        
                            <ScrollView  style={{flexGrow:100}}>
                              <Termsconds/>
                            </ScrollView>
                        </View>
                          
  </View>
  
</TouchableWithoutFeedback>);
    
  
};

const styles =StyleSheet.create({
  text:{
    color:"grey",
    fontSize:35,
    fontWeight:"bold",
    marginLeft:10,
    marginTop:2,
    fontFamily:"sans-serif-medium"
  },

  mainview :{
    flex :1,
    backgroundColor:"#000000",  
  },
  urmobno:{
    fontSize:25,
    color:"white",
    fontWeight:"bold",
    marginLeft:10,
    fontFamily:"sans-serif"
  },
  coats:{
    color:"white",
    marginLeft:10,
    marginTop:5,
    fontSize:18,
    

  },
  input:{
    marginLeft:5,
    height:"30%",
    fontSize:25,
    width:"100%",
    color:"white",
   
  },
  bottomView:{
    width: '100%',
    height: "30%",
    flex: 1 ,
    backgroundColor: "#1C1C1E",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    bottom:0, 
    elevation:1,
    
  },
  button:{
    borderRadius:25,
    borderWidth:2,
    borderColor:"#0276FD",
    backgroundColor:"black",
    width:"60%",
    height:"15%",
    justifyContent:"center",
    alignItems:'center',
    marginTop:"2%",
    marginLeft:"2%",
    elevation:50,
  },
  textagree:{
    color:"white",
    fontSize:25,
  },
  
});



export default Loginpage;
