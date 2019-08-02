/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, ImageBackground, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationActions } from 'react-navigation';
import {loginServer, personalServer, themeColor} from "../../variable/Common";
export default class Item extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
        })
    }

    componentDidMount(): void {
    }

    setParamsAction = NavigationActions.setParams({
        params: {
            book:this.props.book,
            newPlay:true,
        },
        key: 'BottomTab',
    });

    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.dispatch(this.setParamsAction);
                }}
                style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:15, color: "#000"}}>
                            {this.props.book.name}
                        </Text>
                        <Text style={{fontSize: 12}}>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <View style={{width: 30}}>
                        <Text style={{fontSize:14, fontStyle: "italic", color: themeColor}}>
                            {this.props.book.mark}
                        </Text>
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
        backgroundColor:'rgba(255,255,255, 0.8)',
    },
    item:{
        height:70,
        borderBottomColor:"#d5d5d5",
        borderBottomWidth:1,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
    }
});
