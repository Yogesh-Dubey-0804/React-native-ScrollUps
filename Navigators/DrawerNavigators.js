import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './BottomTab Navigator';
import React from 'react';
const DrawerTab = createDrawerNavigator();

function DrawerTabsNavigators () {
    return (

            <DrawerTab.Navigator>
             < DrawerTab.Screen 
             name = "Home"
             component = {MyTabs}
            />
             </DrawerTab.Navigator>



    );
};
export default DrawerTabsNavigators;