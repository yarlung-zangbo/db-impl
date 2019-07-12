/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default class CreateScreen extends Component<Props> {

    async pick() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.plainText],
            });

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
                <Button title="pick" onPress={this.pick}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
