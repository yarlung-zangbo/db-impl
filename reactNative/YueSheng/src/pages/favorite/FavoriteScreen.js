/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {themeColor, height,width, personalServer} from "../variable/Common";
import Item from './components/Item'
export default class MyBookScreen extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            favorite:[],
        });
    }

    componentDidMount(): void {
        let uri=personalServer+"getFavorite?username="+this.pickUsername();
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            this.setState({
                favorite:resJson.values
            });
        });
    }

    updateFavorite(){
        let uri=personalServer+"getFavorite?username="+this.pickUsername();
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            this.setState({
                favorite:resJson.values
            });
        });
    }

    unFavorite(value){
        let uri=personalServer+"unFavorite";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'username='+this.pickUsername()+'&bookid='+value
        }).then((res)=>{
            this.updateFavorite();
        })
    }

    searchBook(value){
        let uri=personalServer+"findFavorite?username="+this.pickUsername()+"&name="+value;
        fetch(uri).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({
                favorite:resJson.values
            })
        });
    }

    pickUsername(){
        return this.props.navigation.state.params.username;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View  style={styles.return}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                            <Entypo name={"chevron-thin-left"}
                                    style={{fontSize:20, paddingLeft:10,color:"#fff"}}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>我的收藏夹</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input}
                                   onChangeText={(value)=>{this.searchBook(value);}}
                                   placeholderTextColor={"rgba(255,255,255, 0.5)"}
                                   placeholder={"搜索 | 有声书"}/>
                    </View>
                </View>
                <FlatList
                    data={this.state.favorite}
                    style={{width:width,height:height-100}}
                    refreshing={false}
                    initialNumToRender={8}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={()=>{
                        this.updateFavorite();
                    }}
                    renderItem={({item}) => <Item book={item}
                                                  username={this.pickUsername()}
                                                  navigation={this.props.navigation}
                                                  unFavorite={this.unFavorite.bind(this)}/>}
                    ListFooterComponent={<View style={{height:100}}></View>}
                    ListEmptyComponent={
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>还没有自己的收藏 ^=^</Text>
                        </View>}/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header:{
        width:width,
        backgroundColor:themeColor,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
    },
    inputView:{
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        flexDirection: 'row',
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
