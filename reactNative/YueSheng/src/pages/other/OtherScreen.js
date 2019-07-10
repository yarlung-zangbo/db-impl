/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button,Image, TouchableOpacity} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {BoxShadow} from "react-native-shadow";

export default class OtherScreen extends Component<Props> {

    render() {
        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress={
                        ()=>{this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
                style={styles.return}>
                    <Entypo name="chevron-thin-right" size={25} style={styles.returnIcon}/>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text>
                        Other Page!
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    return:{
        backgroundColor: '#f34b59',
        height:50,
        flexDirection:'row',
        alignItems: 'center',
    },
    returnIcon:{
        color:'#fff',
        flex:1,
        paddingRight:10,
        textAlign: 'right',
    }
});
