/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor} from "../../variable/Common";
import {NavigationActions} from "react-navigation";
export default class Item extends Component<Props> {

    setParamsAction = NavigationActions.setParams({
        params: {
            book:this.props.listen.soundbook,
            newPlay:true,
        },
        key: 'BottomTab',
    });

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                if(this.props.listen.soundbook.releasetime!=null
                    || this.props.listen.soundbook.creater.username==this.props.username)
                    this.props.navigation.dispatch(this.setParamsAction);
                else
                    Alert.alert(this.props.listen.soundbook.name+": 没有被分享")
            }}
                style={styles.container}>
                <View style={styles.item}>
                    <View style={{}}>
                        <Text style={{fontSize:16, color: "#000"}}>
                            {this.props.listen.soundbook.name}
                        </Text>
                        <Text>
                            {this.props.listen.soundbook.creater.name}
                        </Text>
                    </View>
                    <Text style={{color: "#bbb", fontSize:10}}>
                        {this.props.listen.time}
                    </Text>
                    <TouchableOpacity >
                        <AntDesign name={"delete"} style={{padding:10, color:themeColor}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#fcfcfc',
    },
    item:{
        height:60,
        borderBottomColor:"#efefef",
        borderBottomWidth:1,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
    }
});
