/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height,width, personalServer} from "../variable/Common";
import TapeComponent from './components/TapeComponent'

export default class RecordScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            message:" ",
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.return}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                        <Entypo name={"chevron-thin-left"}
                                style={{fontSize:20, paddingLeft:10,color:"#fff"}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>录制有声书</Text>
                </View>
                <View style={styles.recordView}>
                    <TapeComponent ref={"tape"}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    return: {
        backgroundColor:themeColor,
        width:width,
        height:50,
        alignItems:'center',
        flexDirection:'row',
    },
    title:{
        fontSize: 16,
        flex:1,
        textAlign:'center',
        color:"#fff",
        paddingRight:30,
    },
    recordView:{
    }
});
