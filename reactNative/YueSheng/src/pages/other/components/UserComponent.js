/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions} from "react-navigation";
import {server, themeColor, user, userMessage} from '../../variable/Commen'
import {BoxShadow} from "react-native-shadow";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserComponent extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            user:{},
        })
    }

    getUser(){
        return this.state.user;
    }

    componentDidMount(): void {
        fetch(server+"userMessage",{
            method:"GET",
            credentials: 'include'
        }).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({
                user: resJson.values
            })
            console.log(user);
        })
    }

    render() {
        return (
                <View style={styles.userView}>
                    <View>
                        <Image style={styles.headerIcon}
                               source={require('YueSheng/src/image/h.jpg')}
                        />
                    </View>
                    <View style={styles.msgIcon}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:16}}>
                                {this.state.user.name==='undefined'?this.state.user.username:this.state.user.name}
                            </Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    userView:{
        backgroundColor: '#f9f9f9',
        height:80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:16,
        flex:1,
    },

    headerIcon:{
        width:40,
        height: 40,
        borderRadius: 20,
    },
    msgIcon:{
        flex:1,
        marginLeft:20,
    }
});
