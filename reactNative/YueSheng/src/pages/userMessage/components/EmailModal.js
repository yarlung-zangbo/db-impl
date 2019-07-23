import React, { Component } from "react";
import {TextInput, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginServer, themeColor, width} from "../../variable/Commen";
import Entypo from 'react-native-vector-icons/Entypo';

export default class EmailModal extends Component {
    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
            message:"修改后注意检查邮箱，完成邮箱更改",
            newEmail:this.props.email,
        })
    }

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    modifyEmail(){
        this.setState({
            message:"wait..."
        });
        let uri=loginServer+"modifyEmail";
        fetch(uri,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'email='+this.state.newEmail,
        }).then((res=>res.json())
        ).then((resJson)=>{
            if(resJson.status=="ok"){
                this.setModalVisible(false);
                this.setState({message:"修改后注意检查邮箱，完成邮箱更改"})
            }else{
                this.setState({message: resJson.values});
            }
        })
    }


    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <TouchableOpacity style={styles.container}
                                  onPress={()=>{
                                      this.setModalVisible(false);}}>
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
                                       defaultValue={this.props.email}
                                       onChangeText={(value)=>{
                                this.setState({
                                    newEmail:value,
                                    message: '修改后注意检查邮箱，完成邮箱更改'
                                })
                            }}/>
                        </View>
                        <Text style={{color:themeColor}}>
                            {this.state.message}
                        </Text>
                        <TouchableOpacity style={styles.finishView}
                                          onPress={()=>{
                                              this.modifyEmail();
                                          }}>
                            <Text style={styles.finish}>
                                保存
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
    nameView:{
        backgroundColor:'#fff',
        width:width*0.85,
        borderRadius:10,
        marginBottom:20,
        height:210,
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
        marginTop:30,
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
