/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Alert, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height, width, shareServer, loginServer} from "../variable/Common";
import Item from './components/Item'
export default class MyBookScreen extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            books:[],
        });
    }

    componentDidMount(): void {
        this.updateBook();
        this.getUsername();
    }

    updateBook(){
        let uri=shareServer+"getAllBook";
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            this.setState({
                books:resJson.values,
            });
        });
    }

    searchBook(value){
        let uri=shareServer+(value==""?"getAllBook": "getBookFromAll?name="+value);
        fetch(uri).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({
                books:resJson.values
            })
        });
    }

    getUsername(){
        let uri = loginServer + 'isLogin';
        fetch(uri, {
            method:"GET",
            credentials: 'include',
        }).then((res)=>res.json()).then((resJson)=>{
            this.setState({username: resJson.values});
        })
    }

    render() {
        return (
            <ImageBackground source={require ('YueSheng/src/image/cb1.jpg')}
                             style={{width: width, height: height}}>
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput style={styles.input}
                               onChangeText={(value)=>{this.searchBook(value);}}
                               placeholderTextColor={"rgba(255,255,255, 0.5)"}
                               placeholder={"搜索 | 有声书"}/>
                </View>
                <FlatList
                    data={this.state.books}
                    style={{width:width,height:height-100}}
                    refreshing={false}
                    initialNumToRender={8}
                    onRefresh={()=>{
                        this.updateBook();
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <Item book={item}
                                                  username={this.state.username}
                                                  navigation={this.props.navigation}/>}
                    ListFooterComponent={<View style={{height:120,backgroundColor:"rgba(255,255,255,0.8)"}}></View>}
                    ListEmptyComponent={
                        <View style={{flex:1,backgroundColor:"rgba(255,255,255,0.8)", justifyContent: 'center', alignItems: 'center'}}>
                            <Text>空空如也^=^</Text>
                        </View>}
                />
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    inputView:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20,
        paddingBottom:10,
        flexDirection: 'row',
        backgroundColor:themeColor,
    },
    input:{
        backgroundColor:"rgba(255,255,255,0.2)",
        flex:1,
        borderRadius: 15,
        height:30,
        fontSize:14,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:15,
        paddingRight:15,
        color:'#fff',
    },
    return: {
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
});
