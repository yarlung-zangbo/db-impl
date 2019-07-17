/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {themeColor, height,width, personalServer} from "../variable/Commen";
import Item from './components/Item'
export default class MyBookScreen extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            selfBooks:[],
        });
    }

    componentDidMount(): void {
        let uri=personalServer+"getSelfBooks?username="+'zxz';
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
                console.log(resJson);
                this.setState({
                    selfBooks:resJson,
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
                    <Text style={styles.title}>我的有声书</Text>
                    <TouchableOpacity onPress={()=>{}}>
                        <Feather name={"search"}
                                style={{fontSize:20, paddingRight:20,color:"#fff"}}/>
                    </TouchableOpacity>
                </View>
                    <FlatList
                        data={this.state.selfBooks}
                        style={{width:width,height:height-100}}
                        refreshing={false}
                        initialNumToRender={8}
                        onRefresh={()=>{
                        }}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => <Item book={item}/>}
                        ListFooterComponent={<View style={{height:100}}></View>}
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
    },
});
