
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './comps/utils';
import React, { useEffect } from 'react';
import { StatusBar,LogBox, View, Text, ToastAndroid, DrawerLayoutAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerTabsNavigators from './Navigators/DrawerNavigators'
import { AuthStackNavigator } from './Navigators/AuthStackNavigtor';
import { RootStackNavigator } from './Navigators/RootStackNavigator';

LogBox.ignoreAllLogs(true);

const App = () => {

  
    const initialLoginState = {
      isLoading: true,
      userToken: null,
    };
  
   
    
  
    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT': 
          return {
            ...prevState,
            userToken: null,
            isLoading: false,
          };
        case "OnBoard":
          return{
             ...prevState,
             onboardtoken:null,
             isLoading:false,
          };
      }
    };
  
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  
    const authContext = React.useMemo(() => ({
      signIn: async(Name,Age) => {
        let userToken;
        userToken = null;
        if (Name!=null && Age != null){
        try{
          userToken = "userregistered"//kfjd
           await AsyncStorage.setItem("userToken",userToken);
         }catch(e){null}
        
         
        }
        // else{
        //   Alert.alert("Error To Upload",
        //   "You have not entered the field!")
        // }
        dispatch({ type: 'LOGIN', token:userToken});
      },
      signOut: async() => {
        
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
      
        }
        dispatch({ type: 'LOGOUT' });
      },
      OnBoarded: async() => {
        let onboardtoken = null;
        try{
        onboardtoken = "BOARDED";
         await AsyncStorage.setItem("onbaoredtoken",onboardtoken)
       }catch(e){null}
       dispatch({ type: 'OnBoard', token:onboardtoken});
      },
     
    }), []);
  
    useEffect(() => {
      setTimeout(async() => {
       
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch(e) {
        
        }
        
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 1000);
    }, []);
  
    if( loginState.isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
         
      <AuthContext.Provider value={authContext}>
      <NavigationContainer >
         {/* {loginState.onboardtoken ==null?(<OnBoardStackNavigator/>)
         :<OnBoardStackNavigator/>} */}


        { loginState.userToken != null ? (
          <DrawerTabsNavigators/>
        )
      :
        <AuthStackNavigator/>
      }
      </NavigationContainer>
      </AuthContext.Provider>
      


    );
}
  
  export default App;
