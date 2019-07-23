/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, View, Animated, Easing} from 'react-native';
import CreateScreen from './pages/create/CreateScreen'
import HomeScreen from './pages/home/HomeScreen'
import RecommendScreen from './pages/recommend/RecommendScreen'
import SettingScreen from './pages/other/SettingScreen'
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
import UserMessageScreen from "./pages/userMessage/UserMessageScreen";
import ModifyPasswordScreen from "./pages/userMessage/ModifyPasswordScreen";
import FavoriteScreen from "./pages/favorite/FavoriteScreen";
import MyBookScreen from "./pages/myBook/MyBookScreen";
import HistoryScreen from "./pages/history/HistoryScreen";
import PlayScreen from "./pages/play/PlayScreen";
import RecordScreen from "./pages/create/RecordScreen";
import CommentScreen from "./pages/comment/CommentScreen";

/*
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
        Record: RecordScreen,
    },
    {
        headerMode:'none'
    }
)
*/

const TopTabNavigator=createMaterialTopTabNavigator(
    {
        Home: {
            screen:HomeScreen,
            navigationOptions:{
                title:'我的',
            }
        },
        Recommend: {
            screen:RecommendScreen,
            navigationOptions:{
                title:'推荐'
            }
        },
        /*
        Create: {
            screen:CreateStack,
            navigationOptions:{
                title:'制作'
            }
        },
        */
    },
    {
        initialRouteName:'Home',
        defaultNavigationOptions: {
        },
        tabBarOptions:{
            style:{
                backgroundColor:'#f34b59',
                paddingTop:5,
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

const MainStack=createStackNavigator(
    {
        TopTab: TopTabNavigator,
        MyBook:MyBookScreen,
        Favorite:FavoriteScreen,
        History:HistoryScreen,
    },
    {
        headerMode:'none'
    }
)

const BottomTabNavigator=createBottomTabNavigator(
    {
        MainStack:{
            screen:MainStack,
        }
    },
    {
        tabBarComponent:BottomTab,
        tabBarOptions:{
            keyboardHidesTabBar: 'true'
        }
    }
);

const UserStack=createStackNavigator(
    {
        UserMessage:{
            screen:UserMessageScreen
        },
        ModifyPassword:{
            screen:ModifyPasswordScreen
        }
    },{
        headerMode:'none',
    });

const DrawerNavigator=createDrawerNavigator(
    {
        BottomTab:{
            screen: BottomTabNavigator,
        } ,
        UserStack:{
            screen:UserStack,
        },
    },
    {
        initialRouteName: 'BottomTab',
        drawerWidth: 285,
        contentComponent:SettingScreen,
    }
)

const ServiceStack=createStackNavigator(
    {
        Drawer: {
            screen: DrawerNavigator,
        },
        Create: CreateScreen,
        Record: RecordScreen,
        Comment: CommentScreen,
    },
    {
        headerMode:'none',
    })

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

const AppStack=createStackNavigator(
    {
        ServiceStack:{
            screen: ServiceStack,
        },
        Play:{
            screen:PlayScreen,
        },
    },
    {
        headerMode:'none',
        transitionConfig: () => ({
            transitionSpec: {
                duration: 1000,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });
                return {opacity, transform: [{translateY}]};
            },

        })
    }
)

const AppNavigator=createStackNavigator(
    {
        LogReg:{
            screen:LogRegStack,
        },
        AppStack:{
            screen:AppStack,
        }
    },
    {
        headerMode:'none',
    }
);

export default AppNavigator;

