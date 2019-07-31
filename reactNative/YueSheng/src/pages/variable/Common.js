import {Animated, Dimensions, Easing} from "react-native";
import Sound from "react-native-sound";
import {NavigationActions} from "react-navigation";


export const themeColor='rgb(234,75, 89)';
export const image='YueSheng/src/image/';
export const width=Dimensions.get("window").width;
export const height=Dimensions.get("window").height;
export const loginServer="http://192.168.43.124:8086/yuesheng/";
export const personalServer="http://202.120.40.8:30402/yuesheng/";
export const shareServer="http://202.120.40.8:30403/yuesheng/";
export const recommendServer="http://202.120.40.8:30409/";

export const user= {
    username: 'yuesheng',
    name: 'yuesheng',
    gender: 0,
    email: 'yuesheng@123.com',
    creatertime:'2019-01-01 00:00:00'
}


export const setLoading =NavigationActions.setParams({
    params: {loading: true},
    key: 'BottomTab'});

export const setLoaded =NavigationActions.setParams({
    params: {loading: false},
    key: 'BottomTab'});

export const setPlaying =NavigationActions.setParams({
    params: {playing: true},
    key: 'BottomTab'});


export const setPause=NavigationActions.setParams({
    params: {playing: false},
    key: 'BottomTab'});

export const bookList=[
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },{
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
    {
        bookid: 1,
        name: "拉拉的星期天",
        creater:{
            username: "yz",
            name: "zhuoShen"
        },
        mark: 10.0,
        releasetime: '2010-09-09 12:12:12'
    },
];

