import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
const OnBoardStack = createStackNavigator()

export function OnBoardStackNavigator (){

    return(
        <OnBoardStack.Navigator
        headerMode = {"none"}
        initialRouteName ={Onboarding}>

            
           
            <OnBoardStack.Screen  name ={"OnBoarding"} component={Onboarding} />


        </OnBoardStack.Navigator>
    );


};