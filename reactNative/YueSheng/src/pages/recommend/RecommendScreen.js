/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bookList, height, personalServer, recommendServer, themeColor, width} from "../variable/Common";
import Item from './components/Item'
import Time from './components/Time'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default class RecommendScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            bookList: [],
            emptyMsg:"Loading...",
        })
    }

    componentDidMount(): void {
        this.getRecommend();
    }

    getRecommend(){
        let uri=recommendServer+"getRecList?username="+this.pickUsername();
        console.log(uri);
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            if(resJson.size==0)
                this.setState({emptyMsg:'没有为你准备推荐内容'})
            else
                this.setState({bookList:resJson,});
        });
    }

    pickUsername(){
        return this.props.navigation.state.params.username;
    }

    render() {
        return (
            <ImageBackground
                source={require ('YueSheng/src/image/rb.jpg')}
                resizeMode={"repeat"}
                style={{width: width, height: height}}>
                    <View style={styles.container}>
                        <View  style={styles.return}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                                <Entypo name={"chevron-thin-left"}
                                        style={{fontSize:20, paddingLeft:10,color:"#fff"}}/>
                            </TouchableOpacity>
                        </View>
                        <Time ref={"time"}/>
                        <View style={styles.bookListView}>
                            <TouchableOpacity onPress={()=>{
                                this.refs.time.setState({showTime: !this.refs.time.state.showTime})}}
                                              style={styles.title}>
                                <FontAwesome style={{color: themeColor}} name={"circle"}/>
                                <FontAwesome style={{color: themeColor}} name={"circle"}/>
                            </TouchableOpacity>
                            <FlatList
                                data={this.state.bookList}
                                style={{width:width}}
                                refreshing={false}
                                initialNumToRender={8}
                                onRefresh={()=>{this.getRecommend();}}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => <Item book={item}
                                                              navigation={this.props.navigation}/>}
                                ListFooterComponent={<View style={{height: 100}}></View>}
                                ListEmptyComponent={
                                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontSize: 16, fontStyle: 'italic'}}>{this.state.emptyMsg}</Text>
                                    </View>}
                            />
                        </View>
                    </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.7)',
    },

    return: {
        width:width,
        height:50,
        alignItems:'center',
        flexDirection:'row',
    },

    bookListView:{
        flex:1,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        backgroundColor: '#fff',
    },
    title:{
        height:40,
        paddingLeft:40,
        paddingRight:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
});
