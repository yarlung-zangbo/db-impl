/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, Animated, Easing, TouchableOpacity} from 'react-native';
import {
    themeColor,
    width,
    height,
    personalServer,
    shareServer,
    setPause,
    setPlaying,
    setPlaying1, setPlaying2, setPause1, setPause2, setLoading, setLoaded,
} from "../variable/Common"
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Sound from "react-native-sound";
import CommentModel from './components/CommentModel'
import MarkModel from './components/MarkModel'
import {NavigationActions} from "react-navigation";
import MaterialIcons from "../other/BottomTab";

export default class PlayScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = ({
            favorite: false,
            audioPath: 'http://192.168.43.124:8086/yuesheng/getSound?name=风铃'/*"http://zjyd.sc.chinaz.net/Files/DownLoad/sound1/201905/11572.wav"*/,
            totalTime: 0,
            totalMinute: 0,
            totalSecond: 0,
            time: 0,
            minute: 0,
            second: 0,
        })
    }

    componentDidMount(): void {
        this.spin();
        this.checkFavorite();
        this.setTime();
        this.progressBarStart();
    }

    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 20000,
            easing: Easing.linear
        }).start(() => this.spin())
    }

    setTime() {
        if(this.pickParams().whoosh!=undefined){
            let totalTime=this.pickParams().whoosh.getDuration();
            this.setState({totalTime: totalTime}, ()=>{
                this.setState({
                    totalMinute: Math.floor(this.state.totalTime / 60),
                    totalSecond: Math.floor(this.state.totalTime % 60),
                });
            });
            this.pickParams().whoosh.getCurrentTime((seconds) => {
                this.setState({time: seconds});
                this.setState({
                    second: Math.floor(this.state.time % 60),
                    minute: Math.floor(this.state.minute / 60),
                })
            })
        }
    }

    progressBarStart(){
        setInterval(() => {
            if (this.pickParams().playing) {
                this.pickParams().whoosh.getCurrentTime((seconds) => {
                    this.setState({
                        time: seconds,
                    })
                    this.setState({
                        second: Math.floor(this.state.time % 60),
                        minute: Math.floor(this.state.minute / 60),
                    })
                })
                if(this.state.totalTime>0 && this.state.time>=this.state.totalTime){
                    this.setPause();
                }
            }
        }, 100);
    }

    checkFavorite() {
        let uri = personalServer + "checkFavorite?username=" + this.pickParams().username + "&bookid=" + this.pickParams().book.bookid;
        fetch(uri).then((res) => res.json()).then((resJson) => {
            this.setState({favorite: resJson.values});
        })
    }

    getSound() {
/*
        let uri=personalServer+"getTextAudio?bookid="+this.pickParams().book.bookid;
        this.setState({audioPath: uri});
*/
        this.setLoading();
        this.setPlaying();
        const whoosh = new Sound(this.state.audioPath, '', (err) => {
            if (err) {
                return console.log(err)
            }
            whoosh.setNumberOfLoops(0);
            this.setTime();
            this.setLoaded();
            /*
            let setWhoosh = NavigationActions.setParams({
                params: {whoosh: whoosh},
                key: 'BottomTab'
            });
            this.props.navigation.dispatch(setWhoosh);
            this.props.navigation.setParams({whoosh: whoosh});
            */
            whoosh.play(success => {
                this.setPause();
                if (success) {
                    console.log('success - 播放成功')
                } else {
                    console.log('fail - 播放失败')
                }
            })
        })
        let setWhoosh = NavigationActions.setParams({
            params: {whoosh: whoosh},
            key: 'BottomTab'
        });
        this.props.navigation.dispatch(setWhoosh);
        this.props.navigation.setParams({whoosh: whoosh});
    }

    setLoading(){
        this.props.navigation.dispatch(setLoading);
        this.props.navigation.setParams({loading: true});
    }

    setLoaded(){
        this.props.navigation.dispatch(setLoaded);
        this.props.navigation.setParams({loading:false});
    }

    setPlaying(){
        this.props.navigation.dispatch(setPlaying);
        this.props.navigation.setParams({playing: true});
    }

    setPause(){
        this.props.navigation.dispatch(setPause);
        this.props.navigation.setParams({playing: false});
    }

    isPlaying(){
        return this.pickParams().whoosh!=undefined && this.pickParams().whoosh.isPlaying();
    }

    playSound() {
        if(this.pickParams().loading)return;
        if (this.pickParams().whoosh == undefined) {
            this.getSound();
        } else {
            if (this.pickParams().playing) {
                this.setPause();
                this.pickParams().whoosh.pause();
            } else {
                if(this.state.time>0 && this.state.time==this.state.totalTime){
                    this.setState({time:0});
                }
                this.setPlaying();
                this.pickParams().whoosh.play(success => {
                    this.setPause();
                    if (success) {
                        console.log('success - 播放成功')
                    } else {
                        console.log('fail - 播放失败')
                    }
                });
            }
        }
    }

    unFavorite() {
        let uri = personalServer + "unFavorite";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=' + this.pickParams().username + '&bookid=' + this.pickParams().book.bookid
        }).then((res) => {
            this.setState({favorite: false});
        })
    }

    favorite() {
        let uri = personalServer + "favorite";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=' + this.pickParams().username + '&bookid=' + this.pickParams().book.bookid
        }).then((res) => {
            this.setState({favorite: true});
        })
    }

    bookUndefined() {
        return this.props.navigation.state.params.book == undefined;
    }

    pickParams() {
        return this.props.navigation.state.params;
    }

    render() {
        /*const {user, pwd, fadeAnim}=this.state;*/
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <CommentModel ref="comment" bookid={this.bookUndefined() ? 0 : this.pickParams().book.bookid}
                              username={this.pickParams().username}/>
                <MarkModel ref="mark" bookid={this.bookUndefined() ? 0 : this.pickParams().book.bookid}
                           username={this.pickParams().username}/>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack(null)
                }}
                                  style={styles.returnView}>
                    <Entypo style={styles.returnIcon} name={"chevron-thin-down"}/>
                </TouchableOpacity>
                <View style={styles.funView}>
                    <View style={styles.playerView}>
                        <Animated.Image style={[styles.player, {transform: [{rotate: spin}]}]}
                                        source={require('YueSheng/src/image/player.jpg')}
                        />
                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <Text style={{
                                color: "#000",
                                fontSize: 18
                            }}>{this.bookUndefined() ? " " : this.pickParams().book.name}</Text>
                            <Text style={{
                                color: "#888",
                                fontSize: 13
                            }}>{this.bookUndefined() ? " " : this.pickParams().book.creater.name}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceView}>
                        <TouchableOpacity onPress={() => {
                            if (this.state.favorite)
                                this.unFavorite();
                            else
                                this.favorite();
                        }}>
                            <AntDesign style={{color: this.state.favorite ? themeColor : '#ccc', fontSize: 18}}
                                       name={this.state.favorite ? "heart" : "hearto"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (!this.bookUndefined()) {
                                this.refs.comment.getComments(this.pickParams().book.bookid);
                                this.refs.comment.setModalVisible(true);
                            }
                        }}>
                            <Octicons style={{color: '#ccc', fontSize: 18}} name={"comment"}/>
                        </TouchableOpacity>
                        <TouchableOpacity ref={"star"} onPress={() => {
                            if (!this.bookUndefined()) {
                                this.refs.mark.getMark(this.pickParams().username, this.pickParams().book.bookid)
                                this.refs.star.measure((x, y, width, height, pageX, pageY) => {
                                    this.refs.mark.setModalVisible(true, pageX, pageY);
                                })
                            }
                        }}>
                            <AntDesign style={{color: '#ccc', fontSize: 18}} name={"staro"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.progress}>
                        <View style={{flexDirection: 'row', marginRight: 5}}>
                            <Text style={styles.time}>{this.state.minute}</Text>
                            <Text style={{fontSize: 12}}>:</Text>
                            <Text style={styles.time}>{this.state.second}</Text>
                        </View>
                        <View style={[styles.played, {flex: this.state.time * 1000}]}>
                        </View>
                        <View>
                            <FontAwesome style={{color: themeColor, fontSize: 8}} name={"circle"}/>
                        </View>
                        <View
                            style={[styles.playing, {flex: this.state.totalTime <= 0 ? 1 : (this.state.totalTime - this.state.time) * 1000}]}>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <Text style={styles.time}>{this.state.totalMinute<=0?0:this.state.totalMinute}</Text>
                            <Text style={{fontSize: 12}}>:</Text>
                            <Text style={styles.time}>{this.state.totalSecond<=0?0:this.state.totalSecond}</Text>
                        </View>
                    </View>
                    <View style={styles.playView}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons style={{color: themeColor, fontSize: 40}}
                                                    name={"skip-previous-circle"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.playSound();}}>
                            <AntDesign style={{color: themeColor, fontSize: 46}}
                                       name={this.pickParams().playing? "pausecircle" : "play"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons style={{color: themeColor, fontSize: 40}}
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
    player: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.8,
    },
    returnView: {
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    returnIcon: {
        padding: 12,
        color: themeColor,
        fontSize: 16,
    },
    funView: {
        width: width,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    playerView: {
        width: 600,
        height: height * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfbfb',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
    },
    playView: {
        width: width * 0.6,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceView: {
        width: width * 0.8,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    progress: {
        width: width,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    played: {
        backgroundColor: themeColor,
        height: 2,
    },
    playing: {
        backgroundColor: '#e1e1e1',
        height: 2,
    },
    time: {
        fontSize: 10,
        width: 18,
        textAlign: 'center',
        color: '#3e3e3e',
    }
});
