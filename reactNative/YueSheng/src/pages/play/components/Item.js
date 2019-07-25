/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeColor} from "../../variable/Commen";
export default class Item extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userView}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 15, color: 'rgba(234,75, 89, 0.5)'}}>{this.props.comment.user.name}:</Text>
                    </View>
                    <Text style={{fontSize:11, color: '#d9d9d9'}}>{this.props.comment.time}</Text>
                </View>
                <View style={styles.content}>
                    <Text numberOfLines={10}
                    >{this.props.comment.content}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:10,
    },
    userView:{
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        height: 30,
        paddingBottom: 5,
    },

    content:{
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:5,
    }
});
