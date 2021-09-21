import * as React from 'react';
import { Text, View, StyleSheet,FlatList,Image,Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card ,Title } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

 
  return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
}



const pendingmessagesView = (time)=>{
  return(
  <View style = {{height:25,width:25,borderRadius:25,backgroundColor:"green",alignItems:"center",justifyContent:"center"}}>
    <Text style = {{color:"white"}} >{time}</Text>
  </View>
    )
}


const Data = [
  {
   id:1,
   username:"Muskan" ,
   msg:"Hi Roshani",
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   date:"20-Aug",
   read:"readed",
   time :"13:6",
   pendingmesssages:0
  },
  {
   id:2,
   username:"Kumkum" ,
   uri:"https://i.pinimg.com/236x/43/78/ac/4378ac982920268b059ac8609a5162b4.jpg",
   msg:"re kutiya phone number bhej..",
   date:"20-Aug",
   time :"10:7",
   date :"08/03/2018",
   pendingmesssages:1,
   read :"unreaded",

  },
  {
   id:3,
   username:"pgl" ,
   uri:"https://static.toiimg.com/thumb/msid-79431371,imgsize-455667,width-800,height-600,resizemode-75/79431371.jpg",
   msg:"You: I love You ",
   date:"19-Aug",
   time :"2:00",
   read:"unreaded",
   date :"08/03/2018",
   pendingmesssages:1


  },
  {
   id:4,
   username:"Nitesh Madhoshiya" ,
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   msg:"ae Roshani suno na ",
   date:"18-Aug",
   time :"19:57",
   read:"readed",
   date :"08/03/2018",
   pendingmesssages:0


  },
  {
   id:5,
   username:"Muskan" ,
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   msg:"Hi Roshani",
   date:"08/03/2018",
   time :"13:6",
   read:"readed",
   pendingmesssages:0


  },
  {
   id:6,
   username:"Muskan" ,
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   msg:"Hi Roshani",
   date:"20-Aug",
   time :"13:6",
   read:"unreaded",
   date :"08/03/2018",
   pendingmesssages:56


  },              
  {
   id:7,
   username:"Muskan" ,
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   msg:"Hi Roshani",
   date:"20-Aug",
   time :"13:6",
   read:"readed",
   date :"15/9/2021",
   pendingmesssages:0


  },
  {
   id:8,
   username:"Muskan" ,
   uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
   msg:"Hi Roshani",
   read:"unreaded",
   date:"20-Aug",
   time :"13:6",
   date :"15/9/2021",
   pendingmesssages:0

  },
  {
    id:9,
    username:"Muskan" ,
    uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    msg:"Hi Roshani",
    read:"unreaded",
    date:"20-Aug",
    time :"13:6",
    date :"15/9/2021",
    pendingmesssages:0
 
   },
   {
    id:10,
    username:"Muskan" ,
    uri:"https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    msg:"Hi Roshani",
    read:"unreaded",
    date:"20-Aug",
    time :"13:6",
    date :"15/9/2021",
    pendingmesssages:0
 
   },
]



const RenderItem = (props) =>{
  const object = props.object;
  const navigation = useNavigation();
  return(

     
        <Card onPress = { () => navigation.navigate("ChatScreen",{
          "userAvatar":props.object.uri,
          "userName" : props.object.username,
          "userId":props.object.id,
        })}
        
        style = {{backgroundColor:"black"}}>
         <Card.Content style = {styles.card}>
        <View>
          <Image
           source={{uri:props.object.uri}}
           style ={{
             height:50,
             width:50,
             borderRadius:50,
             marginRight:10

           }}
          />
        </View>
        <View style = {styles.msginfo}>
          <View style = {styles.usernameanddate}>
          <Title style = {{color:"white"}}>{props.object.username}</Title>
          <View style = {styles.datecomponent}>
              <Text style = {{ 
                color : props.object.read== "readed"?"grey":"#25D366",
                
                }}>
                {getCurrentDate==props.object.date?"":props.object.date}
              </Text>
          </View>
          </View>
            
          <View style = {styles.timeinfo}>
                <MaterialIcons
                 name = {"done-all"}
                 color = {props.object.read== "readed"?"#34B7F1":"grey"}
                 size = {16}
                 style = {{
                   marginRight:5,
                 }}
                />
                <Text  style = {{fontFamily:"SFUIDisplay-Ultralight",color:"#EBEBF5"}}>{props.object.msg}</Text>
                <Text style = {{position:"absolute",right:0,color:props.object.read=="readed"?"grey":"grey"}}>{props.object.read=="readed"?props.object.time:pendingmessagesView(props.object.pendingmesssages)}</Text>
               
             
           </View>

         
       </View>
        </Card.Content>
        </Card>                                                       
    
  
  );
}
                                   


export default function MsgScreen() {
 
  
  return (
    <View style = {styles.MsgScreenConatainer}>
     
    <View style = {styles.searchBAR}>
      <MaterialIcons style = {styles.searchIcon} name ="search" size={20} color="#3A3A3C"/>
        <TextInput
            style={styles.input}
            placeholder={"Search"}
            
        />
    </View>
    <FlatList
    data = {Data}
    key={item => item.id}
    renderItem={({item})=> <RenderItem  object = {item}/>}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  MsgScreenConatainer:{
    backgroundColor:"black"
  },
  container: {
    flex: 1,
    top:30
    },
    card:{
      flexDirection:"row",
      backgroundColor:"#000000"
    },
    timeinfo:{
        flexDirection:"row",
        width:windowWidth-85,
       
       },
       datecomponent:{
       
         position:"absolute",
         right:0
       },
       usernameanddate:{
          flexDirection:"row",

       },
       searchBAR:{
            borderWidth:1,
            borderRadius:12,
            //marginTop:10
 
       },
       searchIcon:{
          marginTop:14,
          marginLeft:15

       },
       searchBAR:{
        flexDirection:"row",
        backgroundColor:"#767680",

       },
       input:{
         fontSize:18,
         fontFamily:"Helvetica Neue light",
         backgroundColor:"#767680",
         width:"100%",
         color:"white"

       }
 
});






