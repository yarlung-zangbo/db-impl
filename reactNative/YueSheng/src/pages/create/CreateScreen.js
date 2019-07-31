/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height,width, personalServer} from "../variable/Common";

import NameModal from './components/NameModal'

export default class CreateScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            message:" ",
            text: undefined,
        })
    }

    async pick() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.plainText],
            });

            this.setState({
                message: res.name,
                text:res,
            })

            console.log(
                "URI"+res.uri,
                "TYPE"+res.type, // mime type
                "NAME"+res.name,
                "SIZE"+res.size
            )
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("cancel");
            } else {
                throw err;
            }
        }
    }

    willCreate(){
        this.refs.name.setModalVisible(true);
    }

    create(name){
        if(this.state.text!=undefined){
            let formData=new FormData();
            let file={
                uri: this.state.text.uri,
                type: 'multipart/form-data',
                name: this.state.text.name
            };
            console.log(file);
            formData.append("file", file);
            formData.append("name", name);
            fetch("http://192.168.43.124:8086/yuesheng/upload", {
                method:'POST',
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                body:formData,
            }).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    render() {
        return (
            <ImageBackground
                source={require ('YueSheng/src/image/cb1.jpg')}
                style={{width: width, height: height}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack(null)
                }}
                                  style={styles.returnView}>
                    <Entypo style={styles.returnIcon} name={"chevron-thin-down"}/>
                </TouchableOpacity>
                <NameModal ref={"name"} create={this.create.bind(this)}/>
                <View style={{marginTop:height*0.2, alignItems:'center'}}>
                    <Text style={{color:"#aaa"}}>上传文本文件，制作有声书</Text>
                    <View style={styles.pickView}>
                        <TouchableOpacity onPress={()=>{this.pick();}}>
                            <AntDesign name={"addfile"}
                                       style={{color:themeColor, fontSize: 25}}/>
                        </TouchableOpacity>
                        <Text style={{marginTop:5}}>{this.state.message}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.create} onPress={()=>{
                    this.willCreate();}}>
                    <Text style={{color:"#fff"}}>
                        制作
                    </Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:"rgba(255,255,255, 0.8)"
    },
    pickView:{
        marginTop:10,
        width:width*0.85,
        height:120,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth:1,
        borderColor:themeColor,
        borderRadius:5,
    },
    returnView: {
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor:"#fff",
    },
    returnIcon: {
        padding: 12,
        color: themeColor,
        fontSize: 16,
    },
    create:{
        backgroundColor: themeColor,
        height: 40,
        width:width*0.85,
        marginTop:40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5,
    }
});
