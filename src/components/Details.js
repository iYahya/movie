import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import styles, {hp, lightBar, primaryColor, wp} from './assets/styles/Styles';
import {APIKEY, baseURL} from '../constants';
import * as NavigationActions from '../NavigationActions';
import {connect} from 'react-redux';
import {makeRequest, changeValue} from '../actions';
import {Spinner, VectorIcon} from './assets/UIComponents';
import {ifIphoneX} from 'react-native-iphone-x-helper';


class Details extends Component {
  componentDidMount() {
    const {makeRequest, route, changeValue} = this.props;
    const movie_id = route.params ? route.params.movie_id : 0;
    changeValue({movieDetails: {}});
    let data = {
      api_key: APIKEY,
    };
    makeRequest('GET', `movie/${movie_id}`, data, '', 'getDetails');
    makeRequest('GET', `movie/${movie_id}/credits`, data, '', 'getCredits');
  }
  render() {
    const {movieDetails, cast, loading} = this.props;
    if (movieDetails) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={lightBar} barStyle="dark-content" />
          <ScrollView>
            <View>
              <View style={{alignItems: 'center'}}>
                {movieDetails.poster_path ? (
                  <Image
                    source={{uri: baseURL + movieDetails.poster_path}}
                    style={{
                      ...styles.posterImage,
                      width: wp(50),
                      height: wp(70),
                    }}
                  />
                ) : (
                  <View
                    style={{
                      ...styles.placeHolderImageContaainer,
                      width: wp(50),
                      height: wp(70),
                    }}>
                    <VectorIcon
                      name="image"
                      type="Feather"
                      style={{color: '#ddd', fontSize: wp(18)}}
                    />
                  </View>
                )}
              </View>
              <View style={{marginTop: wp(3), alignItems: 'center'}}>
                <Text
                  style={[
                    styles.fontBoldStyle,
                    styles.fontSize3XL,
                    {alignSelf: 'center', paddingHorizontal: wp(5)},
                  ]}>
                  {movieDetails.title}
                </Text>
                <Text
                  style={[
                    styles.fontBoldStyle,
                    styles.fontSize2XL,
                    {color: primaryColor},
                  ]}>
                  {movieDetails.vote_average * 10 + '%'}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.fontBoldStyle,
                    styles.fontSizeXL,
                    {paddingHorizontal: wp(5)},
                  ]}>
                  Overview
                </Text>
                <Text
                  style={[
                    styles.fontSemiBoldStyle,
                    styles.fontSizeM,
                    {color: '#999', paddingHorizontal: wp(5)},
                  ]}>
                  {movieDetails.overview}
                </Text>
                <Text
                  style={[
                    styles.fontBoldStyle,
                    styles.fontSizeXL,
                    {
                      marginTop: wp(2),
                      marginBottom: wp(2),
                      paddingHorizontal: wp(5),
                    },
                  ]}>
                  Genres
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    paddingHorizontal: wp(5),
                  }}>
                  {movieDetails.genres &&
                    movieDetails.genres.map(itemGenre => {
                      return (
                        <Text
                          key={itemGenre.id}
                          style={[
                            styles.fontBoldStyle,
                            styles.fontSizeSM,
                            styles.genreTag,
                          ]}>
                          {itemGenre.name}
                        </Text>
                      );
                    })}
                </View>
                <Text
                  style={[
                    styles.fontBoldStyle,
                    styles.fontSizeXL,
                    {
                      marginTop: wp(2),
                      marginBottom: wp(2),
                      paddingHorizontal: wp(5),
                    },
                  ]}>
                  Credits
                </Text>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    paddingLeft: wp(5),
                    ...ifIphoneX({
                      marginBottom: wp(5),
                    }),
                  }}>
                  {cast &&
                    cast.length > 0 &&
                    cast.map(item => {
                      let name = item.name.split(' ');
                      return (
                        <View
                          key={item.id}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginRight: wp(3),
                          }}>
                          {item.profile_path ? (
                            <Avatar.Image
                              source={{uri: baseURL + item.profile_path}}
                              size={wp(15)}
                            />
                          ) : name && name.length >= 2 ? (
                            <Avatar.Text
                              label={name[0].charAt(0) + name[1].charAt(0)}
                              size={wp(15)}
                              color={'#fff'}
                            />
                          ) : null}

                          <Text
                            style={[
                              styles.fontSizeXS,
                              styles.fontBoldStyle,
                              {marginTop: wp(1)},
                            ]}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
          {loading ? <Spinner /> : null}
        </View>
      );
    } else {
      return <View />;
    }
  }
}
const mapStateToProps = state => {
  return {
    loading: state.mainR.loading,
    movieDetails: state.mainR.movieDetails,
    cast: state.mainR.cast,
    crew: state.mainR.crew,
  };
};
export default connect(mapStateToProps, {changeValue, makeRequest})(Details);
