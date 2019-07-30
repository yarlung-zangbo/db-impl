import React, { Component } from "react";
import {TextInput, Modal,TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, personalServer, themeColor, width} from "../../variable/Common";
import Entypo from 'react-native-vector-icons/Entypo';

export default class DeleteModal extends Component {
    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
            newName:this.props.name,
        })
    }

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    this.props.finishDeleteBook(0);
                    this.setModalVisible(false);}}>
                    <View style={styles.container}>
                        <View style={styles.nameView}>
                            <View style={styles.returnView}>
                                <TouchableOpacity style={styles.returnIcon}
                                                  onPress={()=>{
                                                      this.props.finishDeleteBook(0);
                                                      this.setModalVisible(false)
                                                  }}>
                                    <Entypo name={"chevron-thin-down"}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.node}>
                                <Text>删除有声书: {this.props.name}?</Text>
                            </View>
                            <View style={styles.finishView}>
                                <TouchableOpacity style={styles.finish}
                                                  onPress={()=>{
                                                      this.props.finishDeleteBook(1);
                                                      this.setModalVisible(false);
                                                  }}>
                                    <Text >
                                        确定
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.finish}
                                                  onPress={()=>{
                                                      this.props.finishDeleteBook(0);
                                                      this.setModalVisible(false);
                                                  }}>
                                    <Text>
                                        取消
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
        height:170,
        alignItems: 'center',
        borderWidth:1,
        borderColor:"#f2f2f2",
        zIndex:100,
    },
    returnView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f1f1f1',
    },
    returnIcon:{
        height:40,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    node:{
        marginTop:30,
        marginBottom: 30,
    },
    finishView:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
    },
    finish:{
        borderTopColor:'#f1f1f1',
        borderTopWidth:1,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:"100%",
        color:'#000',
    }
})
