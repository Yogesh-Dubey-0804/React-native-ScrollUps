import { createStackNavigator } from '@react-navigation/stack';
import test1 from '../comps/test';
import Loginpage from '../comps/loginpage';
import OTP from '../comps/otp';
import OnBoarding from'../comps/OnBoardingView'
import React from 'react';

const AuthStack = createStackNavigator()

export function AuthStackNavigator (){

    return(
        <AuthStack.Navigator
        headerMode = {"none"}
        initialRouteName ={OnBoarding}>

            <AuthStack.Screen  name ={"OnBoarding"} component={OnBoarding} />
            <AuthStack.Screen  name ={"Loginpage"} component={Loginpage} />
            <AuthStack.Screen  name ={"OTP"} component={OTP} />
            <AuthStack.Screen  name ={"test"} component={test1}/>


        </AuthStack.Navigator>
    );


};