/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height,width, personalServer} from "../variable/Common";
import TapeComponent from './components/TapeComponent'
import NameModal from './components/NameModal'

export default class RecordScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            message:" ",
        })
    }

    willCreate(){
        this.refs.name.setModalVisible(true);
    }

    create(name){
        this.refs.tape.create(name);
    }

    render() {
        return (
            <ImageBackground
                source={require ('YueSheng/src/image/cb2.jpg')}
                style={{width: width, height: height}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack(null)
                }}
                                  style={styles.returnView}>
                    <Entypo style={styles.returnIcon} name={"chevron-thin-down"}/>
                </TouchableOpacity>
                <NameModal ref={"name"} create={this.create.bind(this)}/>
                <View style={styles.recordView}>
                    <TapeComponent ref={"tape"} willCreate={this.willCreate.bind(this)}/>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: "rgba(0,0,0,0.85)"
    },
    returnView: {
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor:"#000000",
    },
    returnIcon: {
        padding: 12,
        color: "#ddd",
        fontSize: 16,
    },
    recordView:{
    }
});
