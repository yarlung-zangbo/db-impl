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



export default class BottomTab extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
            play:"play-circle-filled",
            isPlaying: false,
        };
    }

    playBook(){
        Alert.alert("playBook");
    }

    render() {
        return (
            <BoxShadow setting={shadowOpt} >
                <View style={styles.container}>
                    <View style={styles.userHeader}>
                        <Image style={styles.headerIcon}
                               source={require('YueSheng/src/image/p.jpg')}
                        />
                        <View style={styles.msgIcon}>
                            <Text>
                                动物园一日游
                            </Text>
                            <Text style={{color:'#aaa', fontSize: 13}}>
                                wsy
                            </Text>
                        </View>
                    </View>
                    <View style={styles.player}>
                        <TouchableOpacity style={styles.playIconView} onPress={()=>{
                            this.playBook();
                            this.setState((preState)=>{
                                if(preState.isPlaying){
                                    return {play: "play-circle-filled", isPlaying: false};
                                }else{
                                    return {play: "pause-circle-filled", isPlaying: true};
                                }
                            })
                        }}>
                            <MaterialIcons name={this.state.play} style={styles.playIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playIconView}>
                            <MaterialCommunityIcons name={"skip-next-circle"} style={styles.playIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </BoxShadow>
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
        flex:1,
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
        alignItems:'center',
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
