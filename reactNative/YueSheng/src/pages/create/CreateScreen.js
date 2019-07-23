/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height,width, personalServer} from "../variable/Commen";


export default class CreateScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            message:" ",

        })
    }

    async pick() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.plainText],
            });

            this.setState({
                message: res.name
            })

            console.log(
                "URI"+res.uri,
                "TYPE"+res.type, // mime type
                "NAME"+res.name,
                "SIZE"+res.size
            )

            let formData=new FormData();
            let file={
                uri: res.uri,
                type: 'multipart/form-data',
                name: res.name
            };
            formData.append("file", file);
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
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("cancel");
            } else {
                throw err;
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.return}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                        <Entypo name={"chevron-thin-left"}
                                style={{fontSize:20, paddingLeft:10,color:"#fff"}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>制作有声书</Text>
                </View>
                <View style={{marginTop:height*0.2, alignItems:'center'}}>
                    <Text style={{color:"#e6e6e6"}}>上传文本文件，制作有声书</Text>
                    <View style={styles.pickView}>
                        <TouchableOpacity onPress={()=>{this.pick();}}>
                            <AntDesign name={"addfile"}
                                       style={{color:themeColor, fontSize: 25}}/>
                        </TouchableOpacity>
                        <Text style={{marginTop:5}}>{this.state.message}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.create}>
                    <Text style={{color:"#fff"}}>
                        制作
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
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
