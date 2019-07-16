/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,ScrollView, TouchableOpacity} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import UserComponent from './components/UserComponent'
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, server} from "../variable/Commen"

export default class SettingScreen extends Component<Props> {

    logout(){
        let uri=server+"logout";
        fetch(uri,{
            method:"POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
        }).then((res)=>{
            this.props.navigation.navigate("Login");
        })
    }

    render() {
        return (
            <View  style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:5}} onPress={()=>{
                        this.props.navigation.navigate(
                            "UserMessage",
                            {user: this.refs.user.getUser()})
                    }}>
                        <UserComponent ref={"user"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        ()=>{this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
                                      style={styles.return}>
                        <Entypo name="chevron-thin-right" size={25} style={styles.returnIcon}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex:1}}>

                </ScrollView>
                <TouchableOpacity style={styles.exitView} onPress={()=>{
                    this.logout();
                }}>
                    <Text style={{color:'#fff'}}>退出</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    return:{
        backgroundColor: '#f9f9f9',
        height:80,
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
    },
    returnIcon:{
        color:'#000',
        flex:1,
        paddingRight:10,
        textAlign: 'right',
    },
    exitView:{
        backgroundColor: themeColor,
        height:40,
        justifyContent:'center',
        alignItems: 'center',
    }
});
