/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeColor, image, width, loginServer, personalServer, user} from '../variable/Common';
import {NavigationActions} from "react-navigation";
export default class LoginScreen extends Component<Props> {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      message: ' ',
      isLogin: 0,
      user: {},
    };
  }

  login () {
    let uri = loginServer + 'login';
    this.setState ({
      message: 'wait...',
    });
    fetch (uri, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'username=' + this.state.username + '&password=' + this.state.password,
    })
      .then (res => res.json ())
      .then (resJson => {
        console.log (resJson);
        if (resJson.status == 'ok') {
          this.setState ({
            message: ' ',
          });
          this.toHome(resJson.values);
        } else {
          this.setState ({
            message: resJson.values,
          });
        }
      })
      .catch (error => {
        this.setState ({
          message: 'link error...',
        });
      });
  }

  toHome(username){
    fetch(personalServer+"recentListen?username="+username)
        .then((res)=>res.json()).then((resJson)=>{
      let book=resJson.status=="ok"?resJson.values.soundbook:undefined;
      this.props.navigation.navigate (
          'BottomTab',
          {
            book:book,
            username:username,
            playing: false,
            newPlay:false,
            whoosh: undefined,
            loading: false,
          });
    })
  }

  simpleLogin () {
    let uri = loginServer + 'isLogin';
    this.setState ({
      message: 'wait...',
    });
    fetch (uri, {
      method: 'GET',
      credentials: 'include',
    })
      .then (res => res.json ())
      .then (resJson => {
        console.log (resJson);
        if (resJson.status == 'ok') {
          this.setState ({
            message: ' ',
          });
          this.toHome(resJson.values);
        } else {
          this.setState ({
            message: 'please login',
          });
        }
      })
      .catch (error => {
        this.setState ({
          message: 'link error...',
        });
      });
  }

  render () {
    return (
      <ImageBackground
        source={require ('YueSheng/src/image/b.jpg')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.avoid}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.simpleLogin ();
                }}
              >
                <FontAwesome
                  name={'user-circle'}
                  style={{color: '#000', fontSize: 60}}
                />
              </TouchableOpacity>
              <Text style={{color: themeColor}}>{this.state.message}</Text>
            </View>
            <View style={styles.loginView}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Username'}
                  placeholderTextColor={'#888'}
                  selectionColor={themeColor}
                  onChangeText={username => {
                    this.setState ({
                      username: username,
                      message: ' ',
                    });
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  placeholderTextColor={'#888'}
                  selectionColor={themeColor}
                  secureTextEntry={true}
                  onChangeText={password => {
                    this.setState ({
                      password: password,
                      message: ' ',
                    });
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.login ();
                }}
              >
                <View style={styles.login}>
                  <Text style={{color: '#fff', fontSize: 15}}> 登陆 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.registerView}
            onPress={() => {
              this.props.navigation.navigate ('Register');
            }}
          >
            <Text style={{color: themeColor, fontWeight: 'bold', fontSize: 15}}>
              注册>>>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    justifyContent: 'center',
  },
  avoid: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'space-around',
  },
  loginView: {
    paddingTop: 20,
  },
  input: {
    width: width * 0.7,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderRadius: 6,
    color: '#fff',
  },
  login: {
    backgroundColor: themeColor,
    opacity: 0.9,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerView: {
    height: 50,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});
