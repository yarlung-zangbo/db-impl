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
import {setLoaded, setLoading, setPause, setPlaying,} from "../variable/Common";
import Sound from "react-native-sound";


export default class BottomTab extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
        };
    }

    componentDidMount(): void {
        this.playWatcher();
    }

    setPlay(){
        if(this.pickParams().playing) {
            this.props.navigation.dispatch(setPause);
        } else {
            this.props.navigation.dispatch(setPlaying);
        }
    }

    setLoading(){
        this.props.navigation.setParams({loading: true});
    }

    setLoaded(){
        this.props.navigation.setParams({loading:false});
    }

    bookUndefined(){
        return this.props.navigation.state.params.book==undefined;
    }

    pickParams(){
        return this.props.navigation.state.params;
    }

    playWatcher(){
        setInterval(() => {
            if(this.pickParams().newPlay && !this.pickParams().loading){
                if(this.pickParams().whoosh!=undefined){
                    this.pickParams().whoosh.stop();
                    this.pickParams().whoosh.release();
                }
                this.props.navigation.setParams({newPlay:false, whoosh:undefined, playing:false});
                this.playSound();
            }
        }, 500);
    }

    getSound() {
        /*
        let uri=personalServer+"getTextAudio?bookid="+this.pickParams().book.bookid;
        this.setState({audioPath: uri});
        */
        this.setLoading();
        this.setPlay();
        const whoosh = new Sound("http://zjyd.sc.chinaz.net/Files/DownLoad/sound1/201905/11572.wav", '', (err) => {
            if (err) {
                return console.log(err);
            }
            whoosh.setNumberOfLoops(0);
            this.setLoaded();
            whoosh.play(success => {
                this.setPlay();
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
    }


    playSound() {
        if(this.pickParams().loading)return;
        if (this.pickParams().whoosh == undefined) {
            this.getSound();
        } else {
            this.setPlay();
            if (this.pickParams().playing) {
                this.pickParams().whoosh.pause();
            } else {
                this.pickParams().whoosh.play(success => {
                    this.setPlay();
                    if (success) {
                        console.log('success - 播放成功')
                    } else {
                        console.log('fail - 播放失败')
                    }
                });
            }
        }
    }

    render() {
        return (
                    <TouchableOpacity style={styles.container}
                                      onPress={()=>{
                                          this.props.navigation.navigate(
                                              "Play", this.pickParams())}}>
                        <View style={styles.userHeader}>
                            <Image style={styles.headerIcon}
                                   source={require('YueSheng/src/image/p.jpg')}
                            />
                            <View style={styles.msgIcon}>
                                <Text>
                                    {this.bookUndefined()?" ":this.pickParams().book.name}
                                </Text>
                                <Text style={{color:'#aaa', fontSize: 13}}>
                                    {this.bookUndefined()?" ":this.pickParams().book.creater.name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.player}>
                            <TouchableOpacity style={styles.playIconView} onPress={()=>{this.playSound();}}>
                                <MaterialIcons
                                    name={this.pickParams().playing? "pause-circle-filled":"play-circle-filled"}
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
