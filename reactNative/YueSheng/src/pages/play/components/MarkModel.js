import React, { Component } from "react";
import { Modal, StyleSheet, Alert, TouchableOpacity, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {themeColor, shareServer, personalServer} from "../../variable/Commen";

export default class GenderModal extends Component {
    constructor(props){
        super(props);
        this.state=({
            modalVisible: false,
            score:0,
            x: 0,
            y: 0,
        })
    }

    setModalVisible(visible, x, y){
        this.setState({modalVisible:visible});
        if(y!=0){
            this.setState({x:x, y:y});
        }
    }

    getMark(username, bookid){
        let uri=shareServer+"getMark?username="+username+"&bookid="+bookid;
        fetch(uri).then((res)=>res.json()).then((resJson)=>{
            this.setState({score: resJson.values});
        })
    }

    mark(score){
        let uri=shareServer+"mark";
        fetch(uri, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'username='+this.props.username+'&bookid='+this.props.bookid+'&score='+score
        }).then((res)=>{
            this.setState({score: score});
        })
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
            >
                <TouchableOpacity style={styles.container} onPress={()=>{
                    this.mark(this.state.score);
                    this.setModalVisible(false, 0, 0);
                }}>
                    <View style={[styles.starView, {top:this.state.y-50, right: 10}]}>
                        <TouchableOpacity onPress={()=>{this.setState({score: 1})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>0?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 2})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>1?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 3})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>2?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 4})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>3?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 5})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>4?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 6})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>5?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 7})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>6?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 8})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>7?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 9})}}  style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>8?themeColor:'#fff'}}
                                name={"star"}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{this.setState({score: 10})}} style={styles.starIcon}>
                            <AntDesign
                                style={{fontSize: 18, color: this.state.score>9?themeColor:'#fff'}}
                                name={"star"}/>
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
    },
    starView:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position:'absolute',
        paddingLeft:10,
        paddingRight:10,
    },
    starIcon:{
        height:40,
        width:25,
        justifyContent:'center',
        alignItems: 'center',
    }
})
