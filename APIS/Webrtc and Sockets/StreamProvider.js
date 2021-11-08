import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import RemoteStreamComponent from './../../comps/LiveView/RemoteStreamComponent';
import LocalStreamComponent from './../../comps/LiveView/LocalStreamComponent';

const StreamProvider = (props) =>{


    const ReduxStore = useSelector((state)=>state)
   
    if (ReduxStore.RemoteStreamObtained == true  ){
        return(
            <RemoteStreamComponent/>
        )
    }
    else{
        return(
           <LocalStreamComponent/>
        )
    }
}

export default StreamProvider;