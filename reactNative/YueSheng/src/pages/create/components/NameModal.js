import React, { Component } from "react";
import {TextInput, Modal,TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, personalServer, themeColor, width} from "../../variable/Common";
import Entypo from 'react-native-vector-icons/Entypo';

export default class NameModal extends Component {
    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
            name:"yuesheng",
        })
    }

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    this.setModalVisible(false);}}>
                    <View style={styles.container}>
                        <View style={styles.nameView}>
                            <View style={{marginTop: 10, height: 30, justifyContent: 'center'}}>
                                <Text style={{color: "#000"}}>输入有声书名</Text>
                            </View>
                            <View style={styles.inputView}>
                                <TextInput style={styles.input} onChangeText={(value)=>{
                                    this.setState({name:value})}}/>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <TouchableOpacity style={styles.finishView}
                                                  onPress={()=>{
                                                      this.setModalVisible(false);
                                                  }}>
                                    <Text style={styles.finish}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.finishView}
                                                  onPress={()=>{
                                                      this.props.create(this.state.name);
                                                      this.setModalVisible(false);
                                                  }}>
                                    <Text style={styles.finish}>
                                        完成
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    nameView:{
        backgroundColor:'#fff',
        width:width*0.85,
        borderRadius:10,
        marginBottom:20,
        alignItems: 'center',
        borderWidth:1,
        borderColor:"#f2f2f2",
        zIndex:100,
    },
    inputView:{
        marginTop:20,
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
    },
    input:{
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 5,
        flex:1,
    },
    finishView:{
        flex:1,
        margin:10,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: "#f2f2f2",
        borderRadius:5,
    },
    finish:{
        textAlign:'center',
        color:'#000',
    }
})
