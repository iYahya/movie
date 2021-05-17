import {I18nManager, PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  fontRegular,
  hp,
  primaryColor,
  wp,
} from './components/assets/styles/Styles';
import Toast from 'react-native-root-toast';
export const headers = {
  Accept: 'application/json',
};
export function renderError(message) {
  let toast = null;
  return (toast = Toast.show(
    message,
    {
      textStyle: {
        fontFamily: fontRegular,
        fontSize: wp(3.5),
        color: '#fff',
        lineHeight: hp(3),
      },
    },
    {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: primaryColor,
      opacity: 0.4,
      delay: 0.2,
    },
    setTimeout(function () {
      Toast.hide(toast);
    }, 4000),
  ));
}
