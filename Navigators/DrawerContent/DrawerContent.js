import React,{useState} from 'react';
import {Text, View, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {AuthContext} from '../../comps/utils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebase }from '@react-native-firebase/auth';
import firestore  from '@react-native-firebase/firestore';



export  function DrawerContent(props) {


   
    const [userUriId,SetUseruri] = useState("")

    const useruid =  firebase.auth().currentUser.uid
    const FetchUserdata = async(userid)=>{
        const userUri = await  firestore().collection("Users").doc(userid).get()
     
          SetUseruri(String(userUri._data.userImageUri))
        return (userUri);
    };
    FetchUserdata(useruid);
    const {signOut} = React.useContext(AuthContext)
    

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <TouchableWithoutFeedback >
                                <Avatar.Image 
                                    source={{
                                        uri:  userUriId
                                    }}
                                    size={100}
                                />
                                </TouchableWithoutFeedback>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Roshani Dubey</Title>
                                <Caption style={styles.caption}>@Roshani_7478</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={"#515154"}
                                size={size}
                                />
                            )}
                            labelStyle ={{color:"#86868b",fontFamily:"OpenSansBold"}}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={"#515154"}
                                size={size}
                                />
                            )}
                            labelStyle ={{color:"#86868b",fontFamily:"OpenSansBold"}}
                            label="Profile"
                            onPress={() => {}}
                        />
            
                        <DrawerItem 
                            
                            icon={({color, size}) => (
                                <Icon 
                                name="cellphone-cog" 
                                color={"#515154"}
                                size={size}
                                />
                            )}
                            labelStyle ={{color:"#86868b",fontFamily:"OpenSansBold"}}
                            label="Settings"
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={"#515154"}
                                size={size}
                                />
                            )}
                            label="Support"
                            labelStyle ={{color:"#86868b",fontFamily:"OpenSansBold"}}
                            onPress={() => {}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {}}>
                            <View style={styles.preference}>
                                <Text style = {{color:"#86868b",fontWeight:"800",fontFamily:"OpenSans"}} >Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={true}
                                     color ="white"
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={"#515154"}
                        size={size}
                        />
                    )}
                    labelStyle={{fontFamily:"OpenSans",color:"#515154"}}
                    label="Sign Out"
                    onPress = {()=>{signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
     
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:"white"
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color:"#515154",
      marginLeft:1,
      fontFamily:"Helvetica Neue Medium"
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      fontFamily:"OpenSans"
    },
    bottomDrawerSection: {
        marginBottom: 9,
        borderTopColor: '#515154',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    font:{
        fontFamily:"OpenSansBold"
    }
  });