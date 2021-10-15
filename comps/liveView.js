import React,{useState} from 'react';
import {StatusBar,Button,View,Dimensions,FlatList} from 'react-native';
import Posts from '../APIS/PostsDesc';
import RemoteStreamGiver from './../APIS/WebrtcApi';
import {useSelector,useDispatch} from 'react-redux';
import Home from './Home';
import array from '../APIS/static APIS/GetData API';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ScrollUp = () =>{
 
    const UserId = useSelector((state) => state)
    const dispatch = useDispatch();
    const callingApi = () =>{
            dispatch({
                type:"UPDATE NUM"
            })
            var num = UserId.Num
            var data = Posts[num]
            dispatch({
                type :"UP_DATE_USER_INITIAL_ID",
                newUserId : data
            })
        //    if (num>1){
        //     UserId.pc.close()
        //     array.splice(1,1)
        //  //   console.log(UserId.pc)
        // }
        
    }

    return(
        <View>
            <StatusBar       
            hidden = {false} translucent = {true} />
            <FlatList
            data = {array}
            renderItem = {({item})=><RemoteStreamGiver id = {item.id}/>}
            keyExtractor = {(item)=>item.id}
            snapToInterval = {windowHeight}
            disableScrollViewPanResponder = {true}
            disableIntervalMomentum = {true}
            onScrollEndDrag = {()=>callingApi()}
           />
        </View>
    )
}


export default ScrollUp;