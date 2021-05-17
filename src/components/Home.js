import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import styles, {
  fontBold,
  hp,
  lightBar,
  primaryColor,
  thirdColor,
  wp,
} from './assets/styles/Styles';
import * as NavigationActions from '../NavigationActions';
import {connect} from 'react-redux';
import {makeRequest, changeValue} from '../actions';
import {APIKEY, baseURL} from '../constants';
import {MovieCardItem, VectorIcon} from './assets/UIComponents';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {id: 1, title: 'Upcoming'},
        {id: 2, title: 'Popular'},
        {id: 3, title: 'Top Rated'},
      ],
      activeTab: 1,
    };
  }
  onPagination = () => {
    const {
      makeRequest,
      popularArr,
      upcommingArr,
      topRatedArr,
      popular_total_pages,
      popular_current_page,
      upcommig_total_pages,
      upcommig_current_page,
      top_rated_total_pages,
      top_rated_current_page,
    } = this.props;
    const {activeTab} = this.state;
    let data = {
      api_key: APIKEY,
    };
    if (activeTab === 1) {
      if (upcommig_current_page < upcommig_total_pages) {
        let newData = {
          ...data,
          page: Number(upcommig_current_page + 1),
        };
        makeRequest(
          'GET',
          'movie/upcoming',
          newData,
          '',
          'getUpcoming',
          upcommingArr,
        );
      }
    } else if (activeTab === 2) {
      if (popular_current_page < popular_total_pages) {
        let newData = {
          ...data,
          page: Number(popular_current_page + 1),
        };
        makeRequest(
          'GET',
          'movie/popular',
          newData,
          '',
          'getPopular',
          popularArr,
        );
      }
    } else if (activeTab === 3) {
      if (top_rated_current_page < top_rated_total_pages) {
        let newData = {
          ...data,
          page: Number(top_rated_current_page + 1),
        };
        makeRequest(
          'GET',
          'movie/top_rated',
          newData,
          '',
          'getTopRated',
          topRatedArr,
        );
      }
    }
  };
  renderItem = ({item}) => {
    const {genresArr} = this.props;
    const genre =
      genresArr &&
      genresArr.filter(function (e) {
        return this.indexOf(e.id) > 0;
      }, item.genre_ids);
    return (
      <MovieCardItem
        item={item}
        genre={genre}
        onPress={() =>
          NavigationActions.navigate('Details', {
            movie_id: item.id,
          })
        }
      />
    );
  };
  render() {
    const {tabs, activeTab} = this.state;
    const {upcommingArr, popularArr, topRatedArr, loading} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={lightBar} barStyle="dark-content" />
        <ScrollView horizontal contentContainerStyle={{paddingLeft: wp(3)}}>
          {tabs &&
            tabs.map(item => {
              return (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => this.setState({activeTab: item.id})}>
                  <View
                    style={{
                      ...styles.tabButton,
                      backgroundColor:
                        item.id === activeTab ? primaryColor : '#ddd',
                    }}>
                    <Text
                      style={{
                        ...styles.tabText,
                        color: item.id === activeTab ? '#fff' : '#000',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </ScrollView>
        {activeTab === 1 ? (
          <FlatList
            data={upcommingArr && upcommingArr.length > 0 ? upcommingArr : []}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={{
              paddingTop: wp(2),
            }}
            onEndReached={this.onPagination}
            onEndReachedThreshold={0.1}
          />
        ) : activeTab === 2 ? (
          <FlatList
            data={popularArr && popularArr.length > 0 ? popularArr : []}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={{
              paddingTop: wp(2),
            }}
            onEndReached={this.onPagination}
            onEndReachedThreshold={0.1}
          />
        ) : activeTab === 3 ? (
          <FlatList
            data={topRatedArr && topRatedArr.length > 0 ? topRatedArr : []}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={{
              paddingTop: wp(2),
            }}
            onEndReached={this.onPagination}
            onEndReachedThreshold={0.1}
            loa
          />
        ) : null}
        {loading ? (
          <ActivityIndicator size={'large'} color={primaryColor} />
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.mainR.loading,
    popularArr: state.mainR.popularArr,
    genresArr: state.mainR.genresArr,
    upcommingArr: state.mainR.upcommingArr,
    topRatedArr: state.mainR.topRatedArr,
    popular_total_pages: state.mainR.popular_total_pages,
    popular_current_page: state.mainR.popular_current_page,
    upcommig_total_pages: state.mainR.upcommig_total_pages,
    upcommig_current_page: state.mainR.upcommig_current_page,
    top_rated_total_pages: state.mainR.top_rated_total_pages,
    top_rated_current_page: state.mainR.top_rated_current_page,
  };
};
export default connect(mapStateToProps, {changeValue, makeRequest})(Home);
