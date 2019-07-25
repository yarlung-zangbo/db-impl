/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View, Dimensions, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationActions} from "react-navigation";


export default class BottomTab extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
        };
    }

    setPlaying =NavigationActions.setParams({
            params: {playing: true },
            key: 'BottomTab'});

    setPause=NavigationActions.setParams({
        params: {playing: false},
        key: 'BottomTab'});

    playBook(){
        Alert.alert("playBook");
    }

    setPlay(){
        if(this.props.navigation.state.params.playing)
            this.props.navigation.dispatch(this.setPause);
        else
            this.props.navigation.dispatch(this.setPlaying);
    }

    render() {
        return (
                    <TouchableOpacity style={styles.container}
                                      onPress={()=>{this.props.navigation.navigate("Play");}}>
                        <View style={styles.userHeader}>
                            <Image style={styles.headerIcon}
                                   source={require('YueSheng/src/image/p.jpg')}
                            />
                            <View style={styles.msgIcon}>
                                <Text>
                                    {this.props.navigation.state.params.name}
                                </Text>
                                <Text style={{color:'#aaa', fontSize: 13}}>
                                    {this.props.navigation.state.params.user}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.player}>
                            <TouchableOpacity style={styles.playIconView} onPress={()=>{
                                this.setPlay();
                            }}>
                                <MaterialIcons
                                    name={this.props.navigation.state.params.playing? "pause-circle-filled":"play-circle-filled"}
                                    style={styles.playIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.playIconView}>
                                <MaterialCommunityIcons name={"skip-next-circle"} style={styles.playIcon}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
        );
    }
}


//样式
const shadowOpt = {
    width:Dimensions.get('window').width,
    height:60,
    color:'#000',
    border:4,
    opacity:0.1,
};


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height: 60,
        borderTopColor:'#eeeeee',
        borderTopWidth:1,
        backgroundColor:'#f9f9f9',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'space-between'
    },
    userHeader:{
        flexDirection: 'row',
        alignItems:'center',
    },
    headerIcon:{
        width:50,
        height:50,
        borderRadius:25,
    },
    msgIcon:{
        marginLeft:10,
    },
    player:{
        flexDirection:'row',
        alignItems:'center',
    },
    playIconView:{
        width:50
    },
    playIcon:{
        fontSize:40,
        color:'#f34b59',
    }
});
