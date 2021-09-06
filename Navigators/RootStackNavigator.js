import { createStackNavigator } from '@react-navigation/stack';
import Home from  './../comps/Home';
import test1 from '../comps/test';
import React from 'react';


const RootStack = createStackNavigator();

const RootStackNavigator = ()=>{
    return(
        <RootStack.Navigator
        initialRouteName={Home}
        headerMode = {"none"}>       
      <RootStack.Screen  name ={"Home"} component={Home} />
  </RootStack.Navigator>
   
    );


};

export default RootStackNavigator;