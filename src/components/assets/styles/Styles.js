import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, I18nManager, Platform} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const primaryColor = '#47b613';
export const secondaryColor = '#d8d8d8';
export const thirdColor = '#1c1e26';
export const toastBG = '#28630C';
export const lightBar = '#fff';
export const darktBar = '#47b613';

export const fontRegular = 'Cairo-Regular';
export const fontLight = 'Cairo-Light';
export const fontSemiBold = 'Cairo-SemiBold';
export const fontBold = 'Cairo-Bold';

export const theme = {
  ...DefaultTheme,
  roundness: wp(4),
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: secondaryColor,
    background: '#fff',
    text: '#000',
  },
  fonts: {
    regular: {fontFamily: fontRegular, fontWeight: 'normal'},
    medium: {fontFamily: fontSemiBold, fontWeight: '400'},
    light: {fontFamily: fontLight, fontWeight: 'normal'},
    thin: {fontFamily: fontBold, fontWeight: '900'},
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerPaddingTen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    fontFamily: fontBold,
    textTransform: 'capitalize',
    fontSize: wp(6),
  },
  fontBoldStyle: {
    fontFamily: fontBold,
    fontWeight: '900',
  },
  fontRegularStyle: {
    fontFamily: fontRegular,
    fontWeight: '200',
  },
  fontSemiBoldStyle: {
    fontFamily: fontSemiBold,
    fontWeight: '400',
  },
  fontLightStyle: {
    fontFamily: fontLight,
    fontWeight: 'normal',
  },
  fontSizeXS: {
    fontSize: wp(3),
  },
  fontSizeSM: {
    fontSize: wp(3.5),
  },
  fontSizeM: {
    fontSize: wp(4),
  },
  fontSizeL: {
    fontSize: wp(4.5),
  },
  fontSizeXL: {
    fontSize: wp(5),
  },
  fontSize2XL: {
    fontSize: wp(5.5),
  },
  fontSize3XL: {
    fontSize: wp(6),
  },
  fontSize4XL: {
    fontSize: wp(6.5),
  },
  fontSizeHuge: {
    fontSize: wp(7),
  },
  tabButton: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(0.6),
    flex: 3,
    marginHorizontal: wp(2),
    borderRadius: wp(5),
    width: wp(27),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: wp(4),
    elevation: 5,
    height: wp(9),
    marginTop: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    textAlign: 'center',
    fontFamily: fontBold,
    fontSize: wp(4),
  },
  movieCardItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    width: wp(90),
    alignSelf: 'center',
    padding: wp(5),
    borderRadius: wp(4),
    marginBottom: hp(2.5),
    flexDirection: 'row',
  },
  placeHolderImageContaainer: {
    width: wp(20),
    height: wp(30),
    borderRadius: wp(4),
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: wp(20),
    height: wp(30),
    borderRadius: wp(4),
    resizeMode: 'contain',
  },
  genreTag: {
    backgroundColor: '#ddd',
    color: '#000',
    paddingHorizontal: wp(3),
    marginHorizontal: wp(1),

    marginTop: wp(2),
    overflow: 'hidden',
    ...ifIphoneX(
      {
        borderRadius: wp(3),
      },
      {
        borderRadius: wp(4),
      },
    ),
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 111,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
