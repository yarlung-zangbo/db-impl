/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Animated, Easing, TouchableOpacity} from 'react-native';
import {themeColor, width, height, personalServer, shareServer} from "../variable/Commen"
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Sound  from "react-native-sound";

export default class PlayScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state =({
            playing:false,
            book:undefined,
            pause:false,
            whoosh:undefined,
            audioPath:"http://zjyd.sc.chinaz.net/Files/DownLoad/sound1/201905/11572.wav",
            totalTime:0,
            totalMinute:0,
            totalSecond:0,
            time:0,
            minute:0,
            second:0,
        })
    }

    componentDidMount(): void {
        this.spin();
        this.getBook();
    }

    setTime(){
        setInterval(()=>{
            if(this.state.playing){
                this.state.whoosh.getCurrentTime((seconds)=>{
                    this.setState({
                        time:seconds,
                    })
                    this.setState({
                        second: Math.floor(this.state.time % 60),
                        minute: Math.floor(this.state.minute / 60),
                    })
                })
            }
        }, 100);
    }

    clearTime(){
        this.setState({
            time:0,
            second:0,
            minute:0
        });
    }

    getBook(){
        let uri=shareServer+"getBook?bookid=1"
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            this.setState({
                book: resJson.values,
            });
        });
    }

    getSound(){
        /*
        let uri=shareServer+"getSound?bookid=1"
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            this.setState(
                {}
            )
        });
        */
        this.setState({
            playing:true,
            whoosh:new Sound(this.state.audioPath, '', (err) => {
                if(err) {
                    return console.log(err)
                }
                this.setState({
                    totalTime:this.state.whoosh.getDuration()
                });
                this.setState({
                    totalMinute: Math.floor(this.state.totalTime / 60),
                    totalSecond: Math.floor(this.state.totalTime % 60),
                });
                this.setState({playing:true, pause:false});
                this.setTime();
                this.state.whoosh.play(success => {
                    if(success) {
                        this.setState({playing:false, pause:false, time:0, second:0, minute:0});
                        console.log('success - 播放成功')
                    }else {
                        this.setState({playing:false, pause:false, time:0, second:0, minute:0});
                        console.log('fail - 播放失败')
                    }
                })
            })
        })
    }

    playSound(){
        if(this.state.whoosh==undefined){
            this.getSound();
        }else{
            if(this.state.playing){
                this.state.whoosh.pause();
            }else{
                this.state.whoosh.play();
            }
            this.setState({playing:!this.state.playing, pause:!this.state.pause});
        }
    }

    spin=()=>{
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue:1,
            duration:20000,
            easing: Easing.linear
        }).start(()=>this.spin())
    }

    render() {
        const {user, pwd, fadeAnim}=this.state;
        const spin=this.spinValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <TouchableOpacity  onPress={()=>{this.props.navigation.goBack(null)}}
                    style={styles.returnView}>
                    <Entypo style={styles.returnIcon} name={"chevron-thin-down"}/>
                </TouchableOpacity>
                <View style={styles.funView}>
                    <View style={styles.playerView}>
                        <Animated.Image style={[styles.player, {transform:[{rotate: spin }]}]}
                                        source={require('YueSheng/src/image/player.jpg')}
                        />
                        <View style={{marginTop: 20, alignItems:'center'}}>
                            <Text style={{color: "#000", fontSize: 18}}>{this.state.book==undefined?" ":this.state.book.name}</Text>
                            <Text style={{color: "#888", fontSize: 13}}>{this.state.book==undefined?" ":this.state.book.creater.name}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceView}>
                        <TouchableOpacity>
                            <AntDesign  style={{color: '#ccc', fontSize: 18}} name={"hearto"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Octicons  style={{color: '#ccc', fontSize: 18}} name={"comment"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign  style={{color: '#ccc', fontSize: 18}} name={"staro"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.progress}>
                        <View style={{flexDirection:'row', marginRight:5}}>
                            <Text style={styles.time}>{this.state.minute}</Text>
                            <Text style={{fontSize:12}}>:</Text>
                            <Text style={styles.time}>{this.state.second}</Text>
                        </View>
                        <View style={[styles.played,{flex: this.state.time*1000}]}>
                        </View>
                        <View>
                            <FontAwesome style={{color: themeColor, fontSize: 8}} name={"circle"}/>
                        </View>
                        <View style={[styles.playing,{flex: this.state.totalTime==0?1:(this.state.totalTime-this.state.time)*1000}]}>
                        </View>
                        <View style={{flexDirection:'row', marginLeft: 5}}>
                            <Text style={styles.time}>{this.state.totalMinute}</Text>
                            <Text style={{fontSize:12}}>:</Text>
                            <Text style={styles.time}>{this.state.totalSecond}</Text>
                        </View>
                    </View>
                    <View style={styles.playView}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons style={{color: themeColor, fontSize: 40}}
                                                    name={"skip-previous-circle"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign  style={{color: themeColor, fontSize: 46}}
                                        onPress={()=>{this.playSound();}}
                                        name={this.state.playing?"pausecircle":"play"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons  style={{color: themeColor, fontSize: 40}}
                                                     name={"skip-next-circle"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fdfbfb',
    },
    player:{
        width: width*0.6,
        height:width*0.6,
        borderRadius: width*0.8,
    },
    returnView:{
        width:width,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor: '#e0e0e0',
        backgroundColor:'#fff',
    },
    returnIcon:{
        padding:12,
        color:themeColor,
        fontSize: 16,
    },
    funView:{
        width:width,
        flex:1,
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    playerView:{
        width:600,
        height: height* 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfbfb',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
    },
    playView:{
        width: width*0.6,
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    serviceView:{
        width: width*0.8,
        height:60,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 30,
    },
    progress:{
        width: width,
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        alignItems:'center',
    },
    played:{
        backgroundColor:themeColor,
        height:2,
    },
    playing:{
        backgroundColor: '#e1e1e1',
        height:2,
    },
    time:{
        fontSize:10,
        width: 18,
        textAlign: 'center',
        color:'#3e3e3e',
    }
});
