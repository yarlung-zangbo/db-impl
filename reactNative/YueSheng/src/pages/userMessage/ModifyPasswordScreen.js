/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {themeColor, height, width, loginServer} from "../variable/Common";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

export default class UserMessageScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            oldPassword:"",
            newPassword:"",
            confirmPassword:"",
            message:'',
        })
    }

    modifyPassword(){
        let uri=loginServer+"modifyPassword";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'oldPassword=' + this.state.oldPassword
                + '&newPassword=' + this.state.newPassword
                + '&confirmPassword='+this.state.confirmPassword
        }).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({message:resJson.values});
        })
    }

    render() {
        return (
            <View  style={styles.container}>
                <View  style={styles.return}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Feather name={"x"}
                                style={{fontSize:20, paddingLeft:10}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>账户与安全</Text>
                </View>
                <KeyboardAvoidingView behavior={"padding"}>
                    <View style={{width:width, flex:2, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize:18, color:"#000"}}>
                            修改密码
                        </Text>
                        <Text style={{textAlign:'center', color:themeColor}}>
                            {this.state.message}
                        </Text>
                    </View>
                    <View style={{flex:8, alignItems:'center'}}>
                        <View style={styles.item}>
                            <Text style={{width:80, color:'#000'}}>原密码</Text>
                            <TextInput placeholder={"请输入原密码"}
                                       onChangeText={(value)=>{
                                           this.setState({
                                               oldPassword:value,
                                               message:' ',
                                           })
                                       }}
                                       selectionColor={"#707070"} style={{flex:1}}/>
                        </View>
                        <View style={styles.item}>
                            <Text style={{width:80, color:'#000'}}>新密码</Text>
                            <TextInput placeholder={"请输入新密码"}
                                       onChangeText={(value)=>{
                                           this.setState({
                                               newPassword:value,
                                               message:' '
                                           })
                                       }}
                                       selectionColor={"#707070"} style={{flex:1}} />
                        </View>
                        <View style={styles.item}>
                            <Text style={{width:80, color:'#000'}}>新密码</Text>
                            <TextInput placeholder={"请确认新密码"}
                                       onChangeText={(value)=>{
                                           this.setState({
                                               confirmPassword:value,
                                               message:' ',
                                           })
                                       }}
                                       selectionColor={"#707070"} style={{flex:1}} />
                        </View>
                        <TouchableOpacity style={{marginTop:30}}
                        onPress={()=>{
                            this.modifyPassword();
                        }}>
                            <Text style={styles.finish}>
                                完成
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    return: {
        width:width,
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        height:50,
        alignItems:'center',
        flexDirection:'row',
        zIndex:100,
    },
    title:{
        fontSize: 16,
        flex:1,
        paddingRight:30,
        textAlign:'center',
        color:"#000",
    },

    item:{
        flexDirection:'row',
        alignItems:'center',
        height: 60,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        width:width-30,
        marginTop:20,
    },
    finish:{
        width:width-30,
        textAlign:'center',
        backgroundColor: themeColor,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:20,
    }
});
