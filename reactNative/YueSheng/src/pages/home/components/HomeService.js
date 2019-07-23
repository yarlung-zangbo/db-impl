/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export default class HomeService extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("MyBook");
                                      }}>
                        <Fontisto style={styles.icon} name={"music-note"} />
                        <Text style={styles.iconTitle}>我的有声书</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("Favorite");
                                      }}>
                        <AntDesign style={styles.icon} name={"hearto"} />
                        <Text style={styles.iconTitle}>我的收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("History");
                                      }}>
                        <AntDesign style={styles.icon} name={"clockcircleo"} />
                        <Text style={styles.iconTitle}>最近收听</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("Create");
                                      }}>
                        <Feather style={styles.icon} name={"book"} />
                        <Text style={styles.iconTitle}>制作有声书</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("Record");
                                      }}>
                        <Feather name={"mic"} style={styles.icon} />
                        <Text style={styles.iconTitle}>录制有声书</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconView}
                                      onPress={()=>{
                                          this.props.navigation.navigate("Comment");
                                      }}>
                        <Fontisto style={styles.icon} name={"commenting"} />
                        <Text style={styles.iconTitle}>我的评论</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
    },
    row:{
        width:Dimensions.get('window').width-16,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight:10,
    },
    iconView:{
        width: 70,
        height: 70,
        alignItems:'center',
        justifyContent:'center',
    },
    icon:{
        color:'#f34b59',
        fontSize: 22,
        padding: 4,
    },
    iconTitle:{
        color: '#555',
        fontSize: 12,
    }
});
