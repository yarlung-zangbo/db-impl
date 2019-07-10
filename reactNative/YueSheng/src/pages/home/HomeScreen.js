/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import {
    DrawerActions,
} from 'react-navigation';
import UserComponent from './components/UserComponent'
import HomeService from './components/HomeService'

export default class HomeScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <UserComponent />
                </TouchableOpacity>
                <HomeService />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});
