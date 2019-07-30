import React, { Component } from "react";
import {TextInput, Modal,TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, personalServer, themeColor, width} from "../../variable/Common";
import Entypo from 'react-native-vector-icons/Entypo';

export default class NameModal extends Component {
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
                    this.props.finishModifyName(null);
                    this.setModalVisible(false);}}>
                    <View style={styles.container}>
                        <View style={styles.nameView}>
                            <View style={styles.returnView}>
                                <TouchableOpacity style={styles.returnIcon}
                                                  onPress={()=>{
                                                      this.props.finishModifyName(null);
                                                      this.setModalVisible(false)
                                                  }}>
                                    <Entypo name={"chevron-thin-down"}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputView}>
                                <TextInput style={styles.input}
                                           onChangeText={(value)=>{
                                               this.setState({
                                                   newName:value
                                               })
                                           }}
                                           defaultValue={this.props.name}/>
                            </View>
                            <TouchableOpacity style={styles.finishView}
                            onPress={()=>{
                                this.props.finishModifyName(this.state.newName);
                                this.setModalVisible(false);
                            }}>
                                <Text style={styles.finish}>
                                    保存
                                </Text>
                            </TouchableOpacity>
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
        height:180,
        alignItems: 'center',
        borderWidth:1,
        borderColor:"#f2f2f2",
        zIndex:100,
    },
    returnView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f9f9f9',
    },
    returnIcon:{
        height:40,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        marginTop:20,
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        flex:1,
    },
    finishView:{
        flex:1,
        flexDirection:'row',
        paddingTop:10,
        alignItems:'center',
    },
    finish:{
        flex:1,
        textAlign:'center',
        color:'#000',
    }
})
