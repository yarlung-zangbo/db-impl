/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {width} from "../../variable/Common";


export default class Time extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            time:{
                year: "",
                month: "",
                day: "",
                week: "",
            },
            showTime: true,
        })
    }

    componentDidMount(): void {
        this.setTime();
    }

    setTime(){
        let now=new Date();
        this.setState({time:{
                year: now.getFullYear(),
                month: now.getMonth()<10 ? '0'+now.getMonth(): now.getMonth(),
                day:now.getDate()<10 ? '0'+now.getDate():now.getDate(),
                week: now.getDay()
            }})
    }


    render() {
        if(this.state.showTime){
            return (
                <View style={{height: this.state.height}}>
                    <View style={styles.time}>
                        <Text style={styles.day}>
                            <Text style={{fontSize: 25,}}>{this.state.time.day}</Text>
                            <Text>/</Text>
                            <Text style={{fontSize: 15}}>{this.state.time.month}</Text>
                            <Text>/</Text>
                            <Text style={{fontSize: 11}}>{this.state.time.year}</Text>
                        </Text>
                        <Text style={styles.week}>
                            星期<Text style={{
                            fontSize: 30,
                            paddingLeft: 5,
                            fontStyle: "italic",
                            fontWeight: "bold"
                        }}>{this.state.time.week}</Text>
                        </Text>
                    </View>
                    <View style={styles.sayView}>
                        <Text style={styles.say}>根据你的口味，为你推荐有声书</Text>
                    </View>
                </View>
            );
        }else{
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({

    time:{
        flexDirection:'row',
        height: 80,
        width:width,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    day: {
        flexDirection: 'row',
        color:'#fff',
        fontStyle: "italic",
        paddingLeft:20,
    },

    week:{
        flexDirection: 'row',
        color: '#fff',
        paddingRight: 20,
        width: 80,
    },
    say:{
        color:"#fff",
    },
    sayView:{
        height: 50,
        width: width,
        justifyContent: 'center',
        paddingLeft:20,
    }
});
