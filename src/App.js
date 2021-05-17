import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import Store from './store';
import RouterNavigator from './RouterNavigator';
import {navigationRef, isReadyRef} from './NavigationActions';
import AsyncStorage from '@react-native-community/async-storage';
// import {changeLng} from './Config';
import {theme} from './components/assets/styles/Styles';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';

class App extends Component {
  state = {lng: false, lang: ''};
  async componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <StoreProvider store={Store}>
        <RootSiblingParent>
          <PaperProvider theme={theme}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                isReadyRef.current = true;
              }}>
              <RouterNavigator />
            </NavigationContainer>
          </PaperProvider>
        </RootSiblingParent>
      </StoreProvider>
    );
  }
}

export default App;
