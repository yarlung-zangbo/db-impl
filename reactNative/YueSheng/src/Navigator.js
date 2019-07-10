/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, View, Text, TouchableOpacity} from 'react-native';
import CreateScreen from './pages/create/CreateScreen'
import HomeScreen from './pages/home/HomeScreen'
import RecommendScreen from './pages/recommend/RecommendScreen'
import OtherScreen from './pages/other/OtherScreen'
import BottomTab from './pages/other/BottomTab'
import LoginScreen from './pages/login/LoginScreen'
import RegisterScreen from './pages/register/RegisterScreen'
import {
    createMaterialTopTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import {themeColor, width} from "./pages/variable/Commen";
import Entypo from 'react-native-vector-icons/Entypo';


const HomeStack=createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        headerMode:'none'
    }
);

const RecommendStack=createStackNavigator(
    {
        Recommend: RecommendScreen,
    },
    {
        headerMode:'none'
    }
);

const CreateStack=createStackNavigator(
    {
        Create: CreateScreen,
    },
    {
        headerMode:'none'
    }
)

const TopTabNavigator=createMaterialTopTabNavigator(
    {
        Home: {
            screen:HomeStack,
            navigationOptions:{
                title:'我的',
            }
        },
        Recommend: {
            screen:RecommendStack,
            navigationOptions:{
                title:'推荐'
            }
        },
        Create: {
            screen:CreateStack,
            navigationOptions:{
                title:'制作'
            }
        },
    },
    {
        initialRouteName:'Home',
        defaultNavigationOptions: {
        },
        tabBarOptions:{
            style:{
                backgroundColor:'#f34b59',
                height:50,
            },
            labelStyle:{
                fontSize:15,
            },
            inactiveTintColor:'#cfcfcf',
            indicatorStyle:{
                backgroundColor:'#bddadf',
            },
            upperCaseLabel:false,
        },
    }
);

const BottomTabNavigator=createBottomTabNavigator(
    {
        TopTab:{
            screen:TopTabNavigator,
        }
    },
    {
        tabBarComponent:BottomTab,
    }
);


const DrawerNavigator=createDrawerNavigator(
    {
        BottomTab:{
            screen: BottomTabNavigator,
        } ,
    },
    {
        initialRouteName: 'BottomTab',
        drawerWidth: 285,
        contentComponent:OtherScreen,
    }
)

const LogRegStack=createStackNavigator(
    {
        Login:{
            screen: LoginScreen,
            navigationOptions:{
                title:"登陆",
            }
        },
        Register:{
            screen: RegisterScreen,
            navigationOptions:{
                title:"添加用户",
                headerTitleStyle:{
                    flex:1,
                    textAlign:'center',
                    color:'#fff',
                    paddingRight:40,
                },
                headerBackTitleStyle:{
                    color:'#fff',
                },
            }
        },
    },
    {
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:themeColor,
                height:50,
                opacity: 0.9,
            },
            headerTitleStyle:{
                flex:1,
                textAlign:'center',
                color:'#fff',
            },
        }
    }
)

const AppNavigator=createStackNavigator(
    {

        LogReg:{
            screen:LogRegStack,
        },
        Drawer:{
            screen:DrawerNavigator,
        },
    },
    {
        headerMode:'none',
    }
);

export default AppNavigator;

