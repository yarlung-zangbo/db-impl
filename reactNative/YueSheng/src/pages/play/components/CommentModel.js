/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import EvilIcons from  'react-native-vector-icons/EvilIcons';
import {height, loginServer, personalServer, shareServer, themeColor, width} from "../../variable/Common";
import Item from "./Item";

export default class CommentModel extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
            comments:[],
            content:"",
            inputHeight: 40,
        })
    }

    _keyExtractor=(item, index)=>''+item.commentId

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    getComments(bookid){
        let uri=shareServer+"getComment?bookid="+bookid;
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            this.setState({comments: resJson.values});
        })
    }

    comment(){
        let uri=shareServer+"comment";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'username='+this.props.username+'&bookid='+this.props.bookid+"&content="+this.state.content,
        }).then((res)=>res.json()
        ).then((resJson)=>{
            this.refs.input.clear();
            this.getComments(this.props.bookid);
            console.log(resJson);
        });
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <View style={styles.container}>
                    <TouchableOpacity  onPress={()=>{this.setModalVisible(false);}}
                                       style={styles.returnView}>
                        <EvilIcons style={{color:themeColor, fontSize:16}} name={"navicon"}/>
                    </TouchableOpacity>
                    <View style={styles.commentView}>
                        <FlatList
                            data={this.state.comments}
                            style={{width:width}}
                            refreshing={false}
                            initialNumToRender={8}
                            onRefresh={()=>{
                                this.getComments(this.props.bookid);
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => <Item comment={item} />}
                            ListFooterComponent={<View style={{height:20}}></View>}
                            ListEmptyComponent={
                                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>还没有评论 ^=^ </Text>
                                </View>}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            ref={"input"}
                            autoCapitalize={"sentences"}
                            maxLength={1024}
                            multiline={true}
                            onContentSizeChange={(event) => {
                                let h=event.nativeEvent.contentSize.height;
                                if(h<=40) this.setState({inputHeight:40});
                                else if(h>=120) this.setState({inputHeight:120});
                                else this.setState({inputHeight: event.nativeEvent.contentSize.height})
                            }}
                            onChangeText={(value)=>{this.setState({content: value})}}
                            style={[styles.input, {height:this.state.inputHeight}]}/>
                        <TouchableOpacity
                            onPress={()=>{this.comment();}}
                            style={styles.submitIcon}>
                            <Text style={{color:'#fff'}}>评论</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:100,
        backgroundColor: 'rgba(0,0,0, 0.8)'
    },
    returnView:{
        width:width,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor:'#fff',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth:1,
    },
    commentView:{
        paddingTop:10,
        backgroundColor:'#fff',
        width:width,
        flex:1,
    },
    inputView:{
        width:width,
        height:50,
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff',
        paddingBottom:5,
        alignItems:'flex-end',
    },
    input:{
        flex:1,
        borderRadius:20,
        backgroundColor: '#f6f6f6',
        paddingLeft:20,
        paddingRight: 20,
        fontSize: 16,
        marginRight:5,
    },
    submitIcon:{
        width:60,
        height:40,
        borderRadius:20,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: themeColor,
        borderWidth:1,
        borderColor:'#d7d7d7',
    }
});
