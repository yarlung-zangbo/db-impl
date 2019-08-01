/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Dimensions, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
                if(this.props.book.releasetime!=null
                   || this.props.book.creater.username==this.props.username)
                    this.props.navigation.dispatch(this.setParamsAction);
                else
                    Alert.alert(this.props.book.name+": 没有被分享")
            }}
                style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:16, color: "#000"}}>
                            {this.props.book.name}
                        </Text>
                        <Text>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.props.unFavorite(this.props.book.bookid);}}>
                        <AntDesign name={"heart"} style={{padding:10, color:themeColor}}/>
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
