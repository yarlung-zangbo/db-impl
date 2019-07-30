/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import {
    DrawerActions, NavigationActions,
} from 'react-navigation';
import UserComponent from './components/UserComponent'
import HomeService from './components/HomeService'
import {loginServer, user, width} from "../variable/Common";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class HomeScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            user: user
        })
    }

    componentDidMount(): void {
        fetch(loginServer+"userMessage",{method:"GET", credentials: 'include'}
        ).then((res)=>res.json()).then((resJson)=>{
            this.setState({user: resJson.values})
        })

    }

    render() {
            return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.dispatch(DrawerActions.openDrawer());
                    }}>
                    <UserComponent user={this.state.user}/>
                </TouchableOpacity>
                <HomeService navigation={this.props.navigation} username={this.state.user.username}/>
                <TouchableOpacity style={styles.recommendView} onPress={()=>{
                    this.props.navigation.navigate("Recommend");
                }}>
                    <View style={{flexDirection:'row', }}>
                        <Image style={styles.headerIcon}
                               source={require('YueSheng/src/image/rh.jpg')}
                        />
                        <View style={{height: 50, justifyContent: 'space-around', marginLeft: 10}}>
                            <Text style={{color: "#000", fontSize: 16}}>推荐</Text>
                            <Text style={{color: "#aaa", fontSize: 12}}>根据你的口味，为你推荐有声书</Text>
                        </View>
                    </View>
                    <EvilIcons style={{fontSize: 30}} name={"chevron-right"}/>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    recommendView:{
        marginTop:40,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        height:80,
        width: width*0.96,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:10,
        paddingRight: 10,
        alignItems: 'center',
        paddingBottom:15,
        paddingTop:15,
    },
    headerIcon:{
        width: 50,
        height: 50,
        borderRadius: 5,
    }
});
