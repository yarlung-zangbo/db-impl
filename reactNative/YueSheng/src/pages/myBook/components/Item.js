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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {themeColor} from "../../variable/Commen";
export default class Item extends Component<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:15, color: "#000"}}>
                            {this.props.book.name}
                        </Text>
                        <Text style={{fontSize: 12}}>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.props.modifyName(this.props.book.bookid, this.props.book.name)}}>
                        <EvilIcons name={"pencil"} style={{padding:10, color:themeColor, fontSize:18}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.deleteBook(this.props.book.bookid, this.props.book.name)}}>
                        <AntDesign name={"delete"} style={{padding:10, color:themeColor}}/>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <AntDesign name={"sharealt"} style={{padding:10, color:themeColor}}/>
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
        height:70,
        borderBottomColor:"#efefef",
        borderBottomWidth:1,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
    }
});
