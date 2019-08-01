/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList,Alert,TextInput, TouchableOpacity} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {themeColor, height,width, personalServer} from "../variable/Common";
import Item from './components/Item'
import NameModal from './components/NameModal'
import DeleteModal from './components/DeleteModal'
export default class MyBookScreen extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            selfBooks:[],
        });
    }

    componentDidMount(): void {
        let uri=personalServer+"getSelfBooks?username="+this.pickUsername();
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
                console.log(resJson);
                this.setState({
                    selfBooks:resJson.values,
                    toModifyBookId:0,
                    toModifyBookName:"",
                    toDeleteBookId:0,
                    toDeleteBookName:"",
                });
            });
    }

    modifyName(id, name){
        this.setState({
            toModifyBookId:id,
            toModifyBookName:name
        })
        this.refs.name.setModalVisible();
    }

    updateBook(){
        let uri=personalServer+"getSelfBooks?username="+this.pickUsername();
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            this.setState({
                selfBooks:resJson.values,
                toModifyBookId:0,
                toModifyBookName:"",
                toDeleteBookId:0,
                toDeleteBookName:"",
            });
        });
    }

    finishModifyName(value){
        if(value!=null){
            let uri=personalServer+"modifyName";
            fetch(uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'username='+this.pickUsername()+'&bookid='+this.state.toModifyBookId+'&name='+value,
            }).then((res)=>{
                this.updateBook();
            })
        }else{
            this.setState({
                toModifyBookId:0,
                toModifyBookName:"",
            })
        }
    }

    deleteBook(id, name){
        this.setState({
            toDeleteBookId:id,
            toDeleteBookName:name
        })
        this.refs.delete.setModalVisible(true);
    }

    finishDeleteBook(value){
        if(value==0){
            this.setState({
                toModifyBookId:0,
                toModifyBookName:"",
            })
        }else{
            let uri=personalServer+"deleteBook";
            fetch(uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'username='+this.pickUsername()+'&bookid='+this.state.toDeleteBookId
            }).then((res)=>{
                console.log(res);
                this.updateBook();
            })
        }
    }

    searchBook(value){
        let uri=personalServer+"findSelfBook?username="+this.pickUsername()+"&name="+value;
        fetch(uri).then((res)=>res.json()
        ).then((resJson)=>{
            this.setState({
                selfBooks:resJson.values
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
                        <Text style={styles.title}>我的有声书</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input}
                                   onChangeText={(value)=>{this.searchBook(value);}}
                                   placeholderTextColor={"rgba(255,255,255, 0.5)"}
                                   placeholder={"搜索 | 有声书"}/>
                    </View>
                </View>
                <DeleteModal ref={"delete"} name={this.state.toDeleteBookName}
                             finishDeleteBook={this.finishDeleteBook.bind(this)}/>
                <NameModal ref={"name"} name={this.state.toModifyBookName}
                           finishModifyName={this.finishModifyName.bind(this)}/>
                    <FlatList
                        data={this.state.selfBooks}
                        style={{width:width,height:height-100}}
                        refreshing={false}
                        initialNumToRender={8}
                        onRefresh={()=>{
                            this.updateBook();
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <Item book={item}
                                                      navigation={this.props.navigation}
                                                      deleteBook={this.deleteBook.bind(this)}
                                                      modifyName={this.modifyName.bind(this)}/>}
                        ListFooterComponent={<View style={{height:100}}></View>}
                        ListEmptyComponent={
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>还没有属于自己的有声书 ^=^</Text>
                            </View>}
                    />
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
