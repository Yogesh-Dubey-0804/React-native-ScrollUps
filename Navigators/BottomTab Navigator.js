import { Text, View ,Image,TouchableOpacity,  StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../comps/Home';
import WebRTCMobile from './../comps/liveView';
import shorts from '../comps/shorts';
import Chats from './../comps/chats';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator
   
    tabBarOptions={{
      
      showLabel: false,
      style:{
         backgroundColor:"#ffffff",
         position:"absolute",
         bottom:12,
         right:7,
         left :7,
         borderColor:"#000000",
         borderRadius:20,
         height:"10%"

        
      }
    }} >
      <Tab.Screen name="Home" component={Home}
       
      

          options={{

           

              tabBarIcon:({
                
              })=>(
                  <View style={{flex:1,justifyContent:'center'}}>
                   <EntypoIcon
                   name = "chat"
                   height={50}
                   width={50}
                   color={"#0276FD"}/>
             
                  </View>
              )






            
          }}







      
      />
      <Tab.Screen name="LiveView" component={WebRTCMobile}
       options={{

        tabBarVisible:false,

        tabBarIcon:({focused})=>(
            <View>
                <MaterialCommunityIcons
                   name = "video-wireless-outline"
                   height={500}
                   width={500}
                   color={"#0276FD"}/>
             
            </View>
        )






      
    }} />
      <Tab.Screen name="Chats" component={Chats} 
       options={{

        tabBarIcon:({focused})=>(
            <View>
              <FontAwesome5
                   name = "blender-phone"
                   height={50}
                   width={50}
                   color={"#0276FD"}/>
   
            </View>
        )






      
    }}/>
     

    </Tab.Navigator>
  );
}

export default MyTabs;
