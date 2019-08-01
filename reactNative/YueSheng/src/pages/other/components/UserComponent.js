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
import {loginServer, themeColor, user, userMessage} from '../../variable/Common'
import {BoxShadow} from "react-native-shadow";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserComponent extends Component<Props> {
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
                                {this.props.user.name}
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
