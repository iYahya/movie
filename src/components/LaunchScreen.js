import AsyncStorage from '@react-native-community/async-storage';
import React, {PureComponent} from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import styles, {hp, lightBar, wp} from './assets/styles/Styles';
import * as NavigationActions from '../NavigationActions';
import {connect} from 'react-redux';
import {makeRequest, changeValue} from '../actions';
import {APIKEY, baseURL} from '../constants';

class LaunchScreen extends PureComponent {
  componentDidMount() {
    const {makeRequest} = this.props;
    let data = {
      api_key: APIKEY,
    };
    makeRequest('GET', 'genre/movie/list', data, '', 'getGeners');
    let newData = {
      ...data,
      page: 1,
    };
    makeRequest('GET', 'movie/upcoming', newData, '', 'getUpcoming', []);
    makeRequest('GET', 'movie/popular', newData, '', 'getPopular', []);
    makeRequest('GET', 'movie/top_rated', newData, '', 'getTopRated', []);
    setTimeout(() => {
      NavigationActions.reset('Home');
    }, 1500);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={lightBar} barStyle="dark-content" />
        <Image
          source={require('./assets/images/launch_screen.png')}
          resizeMode="contain"
          style={{width: wp(100), height: hp(90)}}
        />
      </View>
    );
  }
}
export default connect(null, {changeValue, makeRequest})(LaunchScreen);
