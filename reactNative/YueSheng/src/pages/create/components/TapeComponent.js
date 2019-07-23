/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {themeColor, width, height} from "../../variable/Commen";
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';


export default class PlayScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            hasPermission: undefined,
            message: "Record",
            audioPath: AudioUtils.DownloadsDirectoryPath + '/record.mp3',
            recording: false, //是否录音
            pause: false, //录音是否暂停
            stop: false, //录音是否停止
            playing:false,
            currentTime: 0, //录音时长,
            second:0,
            minute:0,
            hour:0,
            whoosh:undefined,
        })
    }

    componentDidMount() {
        // 请求授权
        AudioRecorder.requestAuthorization()
            .then(isAuthor => {
                console.log('是否授权: ' + isAuthor)
                if(!isAuthor) {
                    return alert('请前往设置开启录音权限')
                }
                this.setState({hasPermission: isAuthor})
                this.prepareRecordingPath(this.state.audioPath);
                // 录音进展
                AudioRecorder.onProgress = (data) => {
                    this.setState({currentTime: Math.floor(data.currentTime)});
                    this.setState({
                        second: this.state.currentTime % 60,
                        minute: Math.floor(this.state.currentTime / 60),
                        hour: Math.floor(this.state.currentTime / 3600),
                    })
                };
                // 完成录音
                AudioRecorder.onFinished = (data) => {
                    // data 返回需要上传到后台的录音数据
                    console.log(this.state.currentTime)
                    console.log(data)
                };
            })
    };

    prepareRecordingPath = (path) => {
        const option = {
            SampleRate: 44100.0, //采样率
            Channels: 2, //通道
            AudioQuality: 'High', //音质
            AudioEncoding: 'aac', //音频编码
            OutputFormat: 'mp3', //输出格式
            MeteringEnabled: false, //是否计量
            MeasurementMode: false, //测量模式
            AudioEncodingBitRate: 32000, //音频编码比特率
            IncludeBase64: true, //是否是base64格式
            AudioSource: 0, //音频源
        }
        AudioRecorder.prepareRecordingAtPath(path,option)
    }

    async stopRecord(){
        if(this.state.pause || this.state.recording){
            this.setState({stop: true, recording: false, pause: false});
            try {
                await AudioRecorder.stopRecording();
            } catch (error) {
                console.error(error);
            }
        }
    }

    async startRecord(){
        if(this.state.recording){
            try {
                await AudioRecorder.pauseRecording()
                this.setState({pause: true, recording: false})
            } catch (err) {
                console.log(err)
            }
        }else{
            if(!this.state.hasPermission) {
                return alert('没有授权')
            }
            if(this.state.stop) {
                this.setState({stop:false, whoosh:undefined});
                this.prepareRecordingPath(this.state.audioPath)
            }
            if(this.state.pause){
                try {
                    AudioRecorder.resumeRecording();
                } catch (err) {
                    console.log(err)
                }
            }else{
                try {
                    AudioRecorder.startRecording();
                } catch (err) {
                    console.log(err)
                }
            }
            this.setState({recording: true, pause: false})
        }
    }

    playRecord(){
        if(!this.state.stop) return;
        if(this.state.whoosh==undefined){
            this.setState({
                playing:true,
                whoosh:new Sound(this.state.audioPath, '', (err) => {
                    if(err) {
                        return console.log(err)
                    }
                    this.state.whoosh.play(success => {
                        if(success) {
                            this.setState({playing:false});
                            console.log('success - 播放成功')
                        }else {
                            console.log('fail - 播放失败')
                        }
                    })
                })
            })
        }else{
            if(this.state.playing){
                this.state.whoosh.pause();
            }else{
                this.state.whoosh.play();
            }
            this.setState({playing:!this.state.playing});
        }
    }

    createSoundbook(){
        if(this.state.stop){
            try{
                let formData=new FormData();
                let file={
                    uri:"file://"+this.state.audioPath,
                    type: 'multipart/form-data',
                    name: 'record.mp3',
                };
                console.log("uri: "+ file.uri);
                formData.append("file", file);
                fetch("http://192.168.43.124:8086/yuesheng/upload", {
                    method:'POST',
                    headers:{
                        'Content-Type':'multipart/form-data',
                    },
                    body:formData,
                }).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                })

            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.recordTime}>
                    <Text style={styles.time}>
                        {this.state.hour}
                    </Text>
                    <Text style={{color:'#fff'}}>:</Text>
                    <Text style={styles.time}>
                        {this.state.minute}
                    </Text>
                    <Text style={{color:'#fff'}}>:</Text>
                    <Text style={styles.time}>
                        {this.state.second}
                    </Text>
                </View>
                <View style={styles.funView}>
                    <TouchableOpacity onPress={()=>{this.stopRecord();}}
                        style={[styles.iconView,{width: 32, height:32, borderRadius :16}]}>
                        <Fontisto name={"stop"}
                                  style={{fontSize: 20, color: (this.state.pause || this.state.recording)? themeColor:"#ccc"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.startRecord();}}
                        style={[styles.iconView,{width: 50, height:50, borderRadius :25}]}>
                        <Fontisto name={(!this.state.recording)? "record": "pause"}
                                  style={{fontSize: (!this.state.recording)?42:30, color: themeColor}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.playRecord();}}>
                        <AntDesign name={this.state.playing?"pausecircleo":"playcircleo"}
                                   style={{fontSize: 28, color:this.state.playing?themeColor:'#ccc'}}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.create} onPress={()=>{
                    this.createSoundbook();
                }}>
                    <Text style={{color:"#fff"}}>
                        制作
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"rgba(0,0,0,0.95)",
        alignItems: 'center',
        width:width,
        flex:1,
    },
    funView:{
        flexDirection:'row',
        width:width*0.7,
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom:height*0.1,
    },
    iconView:{
        borderWidth: 1,
        borderColor: '#e5e5e5',
        justifyContent:'center',
        alignItems: 'center',
    },
    recordTime:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        height: height*0.5,
    },
    time:{
        color:'#fff',
        textAlign:'center',
        width:20,
    },
    create:{
        backgroundColor: themeColor,
        height: 40,
        width:width*0.85,
        marginTop:40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5,
    }
});
