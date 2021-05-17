import React from 'react';
import {TouchableWithoutFeedback, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {baseURL} from '../../../constants';
import styles, {primaryColor, wp} from '../styles/Styles';
import {VectorIcon} from './VectorIcon';

const MovieCardItem = props => {
  const item = props.item;
  const genre = props.genre;
  const onPress = props.onPress;
  return (
    <TouchableWithoutFeedback key={item.id} onPress={onPress}>
      <View style={styles.movieCardItem}>
        <View>
          {item.poster_path ? (
            <Image
              source={{uri: baseURL + item.poster_path}}
              style={styles.posterImage}
            />
          ) : (
            <View style={styles.placeHolderImageContaainer}>
              <VectorIcon
                name="image"
                type="Feather"
                style={{color: '#ddd', fontSize: wp(6)}}
              />
            </View>
          )}
        </View>
        <View style={{marginLeft: wp(2)}}>
          <Text
            style={[styles.fontBoldStyle, styles.fontSizeM, {width: wp(60)}]}
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.fontRegularStyle,
              styles.fontSizeSM,
              {color: '#999', marginTop: wp(1), marginBottom: wp(2)},
            ]}>
            {item.release_date}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: wp(50),
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            {genre &&
              genre.map(itemGenre => {
                return (
                  <Text
                    key={itemGenre.id}
                    style={[
                      styles.fontRegularStyle,
                      styles.fontSizeXS,
                      styles.genreTag,
                    ]}>
                    {itemGenre.name}
                  </Text>
                );
              })}
          </View>
          <View style={{position: 'absolute', right: wp(2), bottom: wp(-3)}}>
            <Text
              style={[
                styles.fontBoldStyle,
                styles.fontSize3XL,
                {color: primaryColor},
              ]}>
              {item.vote_average * 10 + '%'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {MovieCardItem};
