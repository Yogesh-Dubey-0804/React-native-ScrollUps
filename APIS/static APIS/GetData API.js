import React from 'react';
import {View,Text} from 'react-native';
import WaitingScreen from '../../comps/LiveView/WaitingArea';
import LiveView from './../../comps/liveView';


var MainPosts = [
    {
        id:1
    }
]
export default MainPosts;


var status = false;


const ScreenProvider = () =>     {               
    if (status == false){
        return (
            <WaitingScreen/>
        )}
        else{
            return(
                <LiveView/>
            )
        }
    }
    