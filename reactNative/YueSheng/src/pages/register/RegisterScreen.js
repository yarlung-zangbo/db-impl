/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Alert, Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeColor, image, width, server} from '../variable/Commen'
export default class LoginScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = ({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            message: ' '
        })
    }

    register(){
        let url=server+"register";
        let body="username="+this.state.username;
        body+="&email="+this.state.email;
        body+="&password="+this.state.password;
        body+="&confirmPassword="+this.state.confirmPassword;
        this.setState({
            message: "waiting..."
        })
        fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: body
        }).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({
                message: resJson.values
            });
            console.log(resJson);
        }).catch((error)=>{
            this.setState({
                message:"link error..."
            })
        });
    }

    render() {
        return (
            <ImageBackground source={require("YueSheng/src/image/b.jpg")} style={{width: '100%', height: '100%'}}>
                <View  style={styles.container}>
                    <KeyboardAvoidingView style={styles.avoid}>
                        <View>
                            <View style={{alignItems:'center'}}>
                                <FontAwesome name={"user-circle"}
                                             style={{color: "#000", fontSize:50}}/>
                                <Text style={{color:themeColor}}>{this.state.message}</Text>
                            </View>
                            <View style={styles.loginView}>
                                <View >
                                    <TextInput style={styles.input}
                                               placeholder={"Username"}
                                               selectionColor={themeColor}
                                               placeholderTextColor={"#888"}
                                               onChangeText={(username)=>{
                                                   this.setState({username: username, message: ""})
                                               }}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               placeholder={"Email"}
                                               selectionColor={themeColor}
                                               placeholderTextColor={"#888"}
                                               onChangeText={(email)=>{
                                        this.setState({email: email, message: ""})}}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               secureTextEntry={true}
                                               selectionColor={themeColor}
                                               placeholder={"Password"}
                                               placeholderTextColor={"#888"}
                                               onChangeText={(password)=>{
                                        this.setState({password: password, message: ""})}}/>
                                </View>
                                <View>
                                    <TextInput style={styles.input}
                                               secureTextEntry={true}
                                               selectionColor={themeColor}
                                               placeholder={"Confirm Password"}
                                               placeholderTextColor={"#888"}
                                               onChangeText={(confirmPassword)=>{
                                        this.setState({confirmPassword: confirmPassword, message: ""})}}/>
                                </View>
                                <TouchableOpacity onPress={()=>{
                                    this.register();
                                }}>
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
        alignItems:'center',
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
        width:width*0.7,
        backgroundColor: "rgba(243,75,89, 0.9)",
        opacity:0.95,
        borderRadius: 6,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    }
});
