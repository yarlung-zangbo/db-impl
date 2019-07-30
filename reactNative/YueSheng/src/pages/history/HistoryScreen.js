/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {themeColor, height,width, personalServer} from "../variable/Common";
import Item from './components/Item'
export default class HistoryScreen extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            history:[],
        });
    }

    componentDidMount(): void {
        let uri=personalServer+"getListenRecord?username="+'zxz';
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            console.log(resJson);
            this.setState({
                history:resJson.values
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.return}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                        <Entypo name={"chevron-thin-left"}
                                style={{fontSize:20, paddingLeft:10,color:"#fff"}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>最近收听</Text>
                </View>
                <FlatList
                    data={this.state.history}
                    style={{width:width,height:height-100}}
                    refreshing={false}
                    initialNumToRender={8}
                    keyExtractor={(item, index) => index}
                    onRefresh={()=>{
                    }}
                    renderItem={({item}) => <Item listen={item}
                                                  navigation={this.props.navigation}/>}
                    ListFooterComponent={<View style={{height:100}}></View>}
                    ListEmptyComponent={
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>空收听记录</Text>
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
    return: {
        width:width,
        backgroundColor:themeColor,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
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
