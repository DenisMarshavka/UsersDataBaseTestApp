import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const height = Dimensions.get('screen').height;
const navbarHeight = height - screenHeight;

export {screenHeight, screenWidth, navbarHeight};
