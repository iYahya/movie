import React from 'react';
import {View, ActivityIndicator, Modal, Text, Image} from 'react-native';

import styles, {primaryColor, wp} from '../styles/Styles';
// import { L } from "../../../Config";

const Spinner = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={'large'} color={primaryColor} />
    </View>
  );
};

export {Spinner};
