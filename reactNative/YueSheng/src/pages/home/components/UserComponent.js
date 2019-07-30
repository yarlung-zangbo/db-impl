/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {themeColor} from '../../variable/Common'
import {BoxShadow} from "react-native-shadow";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserComponent extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({})
    }

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
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:20}}>
                                {this.props.user.name==='undefined'?this.props.user.username:this.props.user.name}
                            </Text>
                            <Text style={{color:themeColor, marginLeft:10}}>
                                <Ionicons name={this.props.user.gender===0?"ios-female":"ios-male"} />
                            </Text>
                        </View>
                        <Text style={{color: '#aaa', fontSize: 11}}>
                            {this.props.user.username}
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
