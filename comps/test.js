
import React, { useState} from 'react';
import { View,
        Text,
        TextInput, 
        StyleSheet, 
        Alert,
        TouchableOpacity,
        Button,
        Image,
        ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from"@react-native-firebase/storage";
import { AuthContext } from './utils';
import { auth,firebase } from '@react-native-firebase/app';



const  test1 = () =>{

  const {signIn} = React.useContext(AuthContext)

    
 
 const addb = (Name,Age)=>{
     if (!Name||!Age){
         Alert.alert("Error","Invalid Error !")
     };
    return firestore()
    .collection("Users")
    .doc(firebase.auth().currentUser.uid)
    .set({
        Name,
        Age
    })
 };
    const [Age,SetText]= useState(null)
    const [Name,SetText1]= useState(null)
    const [image,setImage]=useState('https://i.pinimg.com/564x/59/59/0b/59590b7d296017a09e9614cbd995efe1.jpg')
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const _add = ()=>{
        addb(Name,Age)
        .then(
            Alert.alert("Updated !"," The value has  Updated ")
        ).catch(
            err => Alert.alert(err.code,err.message)
        )
        
    };

    const clickImage = () =>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            // console.log(image);
            setImage(image.path)
          });
    };
    const SelectFromGallery =()=>{

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            // console.log(image);
            setImage(image.path)
          });
    };
    const imagesetatstoragefirebase = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
      
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = firebase.auth().currentUser.uid +name + Date.now() + '.' + extension;
        
     



        setUploading(true);
        setTransferred(0);
    
        const storageRef = storage().ref(`photos/userAvatars/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
       
        task.on('state_changed', (taskSnapshot) => {
          // console.log(
          //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          // );
    
          setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
              100,
          );
        });

                

    
        try {
          await task;
           Alert.alert(
               "post Submitted",
               "The post has succesfully submitted to the cloud Storage")
          const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(image);
          const ImageReference = (fileName,downloaduri )=>{
           
            let  path =  'photos/userAvatars/'+fileName
              firestore().collection("Users").doc(firebase.auth().currentUser.uid).set({
                userAvatarPath: path,
                userImageUri:downloaduri,
              },{merge:true})
           }
           ImageReference(filename,url)
          return url;
    
        } catch (e) {
          // console.log(e);
          return null;
        }
    
      };

    const loginHandle = (Name,Age)=>{
       signIn(Name,Age);
    }


const ImagePress=()=>{
  Alert.alert(

  "Image Options",
  <Button title ={"Click to take picture"} onPress ={SelectFromGallery}></Button>

  )
}
 








return(

   <View style = {{flex:1,alignItems:"center",justifyContent:"space-between"}}>
      <TouchableOpacity onPress={ImagePress}>
      <Image
        style={styles.logo}
        source={{

          uri: image

          
        }}
        fadeDuration={500}
        
      /></TouchableOpacity>
      
      
      
       <TextInput
       
       placeholder={"Enter Name"}
       placeholderTextColor={"black"}
      keyboardType={"web-search"}
       maxLength={50}
       value={Name}
       onChangeText={ e=>SetText1(e)}
       style = {styles.txtInput}
       >
        
        </TextInput>

            <TextInput
              placeholder={"Enter Age"}
              placeholderTextColor={"black"}
              keyboardType={"web-search"}
              maxLength={50}
              style = {styles.txtInput}
              value = {Age}
              onChangeText={value =>SetText(value)}
              >
           
            </TextInput>
             <TouchableOpacity  onPress = {_add} style={styles.opacitybutton}>
                 <Text style={styles.textsubmit}>
                     Submit
                 </Text>
             </TouchableOpacity>
             <Button title = "Choose photo from Grallery " onPress ={SelectFromGallery}/>
             <Button title ="Click an Image " onPress ={clickImage}/>
             
        
  
       <Button title ="Upload to cloud Storage" onPress ={imagesetatstoragefirebase}/>
       <Button title = "Next" onPress = {()=>{loginHandle(Name,Age)}}/>
   </View>




);




}
const styles = StyleSheet.create({

    txtInput:{
      height:50,
      width:"80%"
    },
    opacitybutton:{
        marginTop:"25%",
    
    },
    textsubmit:{
        color:'black',
        fontFamily:"serif"
    },
    logo:{
        height:200,
        width:200,
        borderRadius:100,
        marginTop:"5%"
    }
});
export default test1;