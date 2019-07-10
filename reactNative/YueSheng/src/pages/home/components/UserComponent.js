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
import {BoxShadow} from "react-native-shadow";

export default class UserComponent extends Component<Props> {

    render() {
        return (
            <BoxShadow setting={shadowOpt} >
                <View style={styles.userView}>
                    <View>
                        <Image style={styles.headerIcon}
                               source={require('YueSheng/src/image/h.jpg')}
                        />
                    </View>
                    <View style={styles.msgIcon}>
                        <Text style={{fontSize:20}}>
                            yz
                        </Text>
                        <Text style={{color: '#aaa', fontSize: 11}}>
                            yuanZhuo
                        </Text>
                    </View>
                </View>
            </BoxShadow>
        );
    }
}

const shadowOpt={
    width: Dimensions.get("window").width-16,
    radius:4,
    height:120,
    color:'#000',
    border:4,
    opacity:0.05,
}

const styles = StyleSheet.create({
    userView:{
        marginTop:10,
        backgroundColor: '#fff',
        flex:1,
        height:120,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:16,
        paddingRight: 16,
    },

    headerIcon:{
        width:60,
        height: 60,
        borderRadius: 30,
    },
    msgIcon:{
        height:50,
        flex:1,
        paddingLeft:20,
    }
});
