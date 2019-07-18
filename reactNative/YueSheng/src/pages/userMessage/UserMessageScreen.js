/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,Modal,Alert,  Text, View, TouchableOpacity, Image} from 'react-native';
import {loginServer, themeColor, width} from "../variable/Commen";
import NameModal from "./components/NameModal"
import GenderModal from "./components/GenderModal"
import EmailModal from "./components/EmailModal"
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

export default class UserMessageScreen extends Component<Props> {

    constructor(props){
        super(props);
        this.state=({
            user:{},
            name:"",
            gender:"",
            email:"",
        })
    }

    componentDidMount(){
        let user=this.props.navigation.state.params.user;
        this.setState({user:user});
        this.setState({
            name:user.name==='undefined'?user.username:user.name,
            gender:user.gender>1?"男":"女",
            email:user.email
        })
    }

    updateName(value){
        this.setState({
            name:value
        })
    }

    updateGender(value){
        this.setState({
            gender:value
        })
    }

    render() {
        return (
            <View  style={styles.container}>
                <View  style={styles.return}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}}>
                        <Entypo name={"chevron-thin-left"}
                                style={{fontSize:20, paddingLeft:10}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>个人中心</Text>
                </View>
                <View style={styles.userView}>
                    <View>
                        <Image style={styles.headerIcon}
                               source={require('YueSheng/src/image/h.jpg')}
                        />
                    </View>
                    <GenderModal ref="gender" updateGender={this.updateGender.bind(this)}/>
                    <NameModal ref="name" name={this.state.name} updateName={this.updateName.bind(this)}/>
                    <EmailModal ref="email" email={this.state.email}/>
                    <TouchableOpacity style={{paddingTop:10, flexDirection: 'row'}}
                                      onPress={()=>{
                                          this.refs.name.setModalVisible();}}>
                        <Text style={{textAlign:'center', fontSize:16}}>
                            {this.state.name}
                        </Text><Feather name={"edit"} style={{marginLeft:5}}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.item} onPress={()=>{
                    this.refs.gender.setModalVisible();}}>
                    <Text style={{width:100,color:"#000"}}>性别</Text>
                    <Text style={{flex:1}}>{this.state.gender}</Text>
                    <Entypo name={"chevron-thin-right"} style={{fontSize:18, color:"#b4b4b4"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>{
                    this.refs.email.setModalVisible();}}>
                    <Text style={{width:100,color:"#000"}}>邮箱</Text>
                    <Text style={{flex:1}}>{this.state.email}</Text>
                    <Entypo name={"chevron-thin-right"}  style={{fontSize:18, color:"#b4b4b4"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>{
                    this.props.navigation.navigate("ModifyPassword", {updateUser:this.updateUser})
                }}>
                    <Text style={{flex:1,color:"#000"}}>账户与安全</Text>
                    <Entypo name={"chevron-thin-right"}  style={{fontSize:18, color:"#b4b4b4"}}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        flex:1,
        backgroundColor:"#f2f2f2",
    },
    return: {
        width:width,
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        height:50,
        alignItems:'center',
        flexDirection:'row',
    },
    title:{
        fontSize: 16,
        flex:1,
        paddingRight:30,
        textAlign:'center',
        color:"#000",
    },
    userView:{
        width:width,
        alignItems: 'center',
        paddingTop:20,
        paddingBottom:10,
        backgroundColor: "#fff",
        marginBottom:10,
    },

    headerIcon:{
        width:80,
        height: 80,
        borderRadius: 40,
    },
    item:{
        backgroundColor:'#fff',
        width:width,
        height:50,
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        paddingRight:25,
        paddingLeft:20,
    }
});
