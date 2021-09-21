import { createDrawerNavigator, getIsDrawerOpenFromState } from '@react-navigation/drawer';
import MyTabs from './BottomTab Navigator';
import React from 'react';
import {DrawerContent} from './DrawerContent/DrawerContent'
import ChatScreen from '../comps/ChatScreen'


const DrawerTab = createDrawerNavigator();

function DrawerTabsNavigators () {
    return (

            <DrawerTab.Navigator drawerContent = {props=><DrawerContent{...props}/>}  
            headerMode ={"true"}
            drawerType="front"
            edgeWidth={20}
            drawerStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
        >
           < DrawerTab.Screen 
             name = "Home"
             
             component = {MyTabs}
            />
            < DrawerTab.Screen 
             name = "ChatScreen"
          
             component = {ChatScreen}
             options={{
               title:"ChatScreen"
              }}
            />
             </DrawerTab.Navigator>



    );
};
export default DrawerTabsNavigators;