import React, { Component } from "react";
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, themeColor, width} from "../../variable/Commen";
import Entypo from 'react-native-vector-icons/Entypo';

export default class GenderModal extends Component {
    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
        })
    }

    modifyGender(value){
        let uri=loginServer+"modifyGender";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'gender='+value,
        }).then((res)=>res.json()
        ).then((resJson)=>{
            console.log(resJson);
            this.setModalVisible(false);
        });
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
                <TouchableOpacity style={styles.container} onPress={()=>{
                    this.setModalVisible(false);
                }}>
                    <View style={styles.genderView}>
                        <View style={styles.returnView}>
                            <TouchableOpacity style={styles.returnIcon}
                                              onPress={()=>{
                                                  this.setModalVisible(false)
                                              }}>
                                <Entypo name={"chevron-thin-down"}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.item}
                        onPress={()=>{
                            this.modifyGender(2);
                            this.props.updateGender("男");
                        }}>
                            <Text style={{width:40, textAlign:'center'}}>
                                男
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={()=>{
                                              this.modifyGender(1);
                                              this.props.updateGender("女");
                                          }}>
                            <Text style={{width:40, textAlign:'center'}}>
                                女
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
    genderView:{
        backgroundColor:'#fff',
        width:width*0.85,
        borderRadius:10,
        marginBottom:20,
        height:180,
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
    },
    returnView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#fafafa',
    },
    returnIcon:{
        height:40,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    item:{
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        height:40,
        justifyContent:'center',
    }
})
