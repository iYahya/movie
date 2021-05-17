import React from 'react';
import {View} from 'react-native';

import LaunchScreen from './components/LaunchScreen';
import Details from './components/Details';
import Home from './components/Home';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import styles, {fontBold, wp} from './components/assets/styles/Styles';

const Stack = createStackNavigator();

export default function RouterNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LaunchScreen"
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitle: '',
        headerTruncatedBackTitle: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="LaunchScreen"
        component={LaunchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true, title: 'Movies'}}
      />
    </Stack.Navigator>
  );
}
