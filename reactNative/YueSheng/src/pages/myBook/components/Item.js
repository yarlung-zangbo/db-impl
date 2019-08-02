/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Dimensions, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {personalServer, themeColor} from "../../variable/Common";
import { NavigationActions } from 'react-navigation';
export default class Item extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            release:false,
        })
    }

    componentDidMount(): void {
        this.setState({
            release: this.props.book.releasetime!=undefined
        })
    }

    setParamsAction = NavigationActions.setParams({
        params: {
            book:this.props.book,
            newPlay:true,
        },
        key: 'BottomTab',
    });

    share(){
        let uri=personalServer+"share";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'username='+this.props.book.creater.username+'&bookid='+this.props.book.bookid
        }).then((res)=>{
            console.log(res.json());
            this.setState({release:!this.state.release})
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.dispatch(this.setParamsAction);
                }}
                style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:15, color: "#000"}}>
                            {this.props.book.name}
                        </Text>
                        <Text style={{fontSize: 12}}>
                            {this.props.book.creater.name}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.props.modifyName(this.props.book.bookid, this.props.book.name)}}>
                        <EvilIcons name={"pencil"} style={{padding:10, color:themeColor, fontSize:18}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.deleteBook(this.props.book.bookid, this.props.book.name)}}>
                        <AntDesign name={"delete"} style={{padding:10, color:themeColor}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.share()}}>
                        <AntDesign name={"sharealt"}
                                   style={{padding:10, color:this.state.release?themeColor:"#bbb"}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#fcfcfc',
    },
    item:{
        height:70,
        borderBottomColor:"#efefef",
        borderBottomWidth:1,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
    }
});
