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
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor} from "../../variable/Commen";
export default class FavoriteScreen extends Component<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:16, color: "#000"}}>
                            {this.props.book.name}
                        </Text>
                        <Text>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <TouchableOpacity >
                        <AntDesign name={"delete"} style={{padding:10, color:themeColor}}/>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Entypo name={"share"} style={{padding:10, color:themeColor}}/>
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
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
    }
});
