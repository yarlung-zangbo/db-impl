import React, { Component } from "react";
import {TextInput, Modal,TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, themeColor, width} from "../../variable/Commen";
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

    modifyName(){
        let uri=loginServer+"modifyName";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'name='+this.state.newName,
        }).then((res)=>{
            this.setModalVisible(false);
        })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    this.setModalVisible(false);}}>
                    <View style={styles.container}>
                        <View style={styles.nameView}>
                            <View style={styles.returnView}>
                                <TouchableOpacity style={styles.returnIcon}
                                                  onPress={()=>{
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
                                this.modifyName();
                                this.props.updateName(this.state.newName);
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
        justifyContent:'flex-end',
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
        borderBottomColor:'#fbfbfb',
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
