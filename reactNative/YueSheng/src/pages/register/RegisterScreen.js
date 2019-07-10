/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeColor, image, width, height} from '../variable/Commen'
export default class LoginScreen extends Component<Props> {
    render() {
        return (
            <ImageBackground source={require("YueSheng/src/image/b.jpg")} style={{width: '100%', height: '100%'}}>
                <View  style={styles.container}>
                    <KeyboardAvoidingView style={styles.avoid}>
                        <View>
                            <View style={{alignItems:'center'}}>
                                <FontAwesome name={"user-circle"}
                                             style={{color: "#000", fontSize:50}}/>
                            </View>
                            <View style={styles.loginView}>
                                <View >
                                    <TextInput style={styles.input}
                                               placeholder={"Username"}
                                               placeholderTextColor={"#888"}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               placeholder={"Email"}
                                               placeholderTextColor={"#888"}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               placeholder={"Password"}
                                               placeholderTextColor={"#888"}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               placeholder={"Confirm Password"}
                                               placeholderTextColor={"#888"}/>
                                </View>
                                <TouchableOpacity>
                                    <View style={styles.registerIcon}>
                                        <Text style={{color:"#fff", fontSize:15}}> 注册 </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        );
    }
}
const b=image+"b.jpg";

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        justifyContent: 'center',
    },
    avoid:{
        alignItems:'center',
        flex:4,
        justifyContent:"space-around",
    },
    loginView:{
        paddingTop:20,
    },
    input:{
        width:width*0.7,
        height:40,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingLeft:10,
        paddingRight:10,
        marginBottom: 20,
        borderRadius:6,
        color:'#fff',
    },
    registerIcon:{
        backgroundColor: "rgba(243,75,89, 0.9)",
        opacity:0.95,
        borderRadius: 6,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    }
});
