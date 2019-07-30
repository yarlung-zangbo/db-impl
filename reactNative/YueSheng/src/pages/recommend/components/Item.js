/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {themeColor} from "../../variable/Common";
import {NavigationActions} from "react-navigation";

export default class Item extends Component<Props> {

    setParamsAction = NavigationActions.setParams({
        params: {
            book:this.props.book,
            newPlay:true,
        },
        key: 'BottomTab',
    });

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.props.navigation.dispatch(this.setParamsAction);
            }}
                              style={styles.container}>
                <View style={styles.item}>
                    <View style={{}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:14, color: "#000"}}>{this.props.book.name}</Text>
                            <Text style={{width:40,color: themeColor, fontStyle: 'italic', fontSize:12}}>  {this.props.book.mark}</Text>
                        </View>
                        <Text style={{fontSize:11}}>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#888", fontSize:10}}>release:{this.props.book.releasetime}</Text>
                    </View>
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
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        justifyContent: 'space-between',
    }
});
