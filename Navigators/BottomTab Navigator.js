import {View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../comps/Home';
import ScrollUp from './../comps/liveView';
import MsgScreen from './../comps/chats';
import  React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {Provider} from 'react-redux';
import store from '../APIS/redux/store';



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Provider store = {store}>
    <Tab.Navigator
   
    tabBarOptions={{
      
      showLabel: true,
      style:{
         backgroundColor:"rgba(0,0,0,0.85)",
         position:"absolute",
         bottom:0,
         right:0,
         left :0,
         borderColor:"#000000",
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
                   siize = {50}
                   color={"#0276FD"}/>
             
                  </View>
              )






            
          }}







      
      />
      <Tab.Screen name="LiveView" component={ScrollUp}
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
      <Tab.Screen name="Chats" component={MsgScreen} 
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
    </Provider>

  );
}

export default MyTabs;
