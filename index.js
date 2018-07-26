import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';


// The following removes the react-navigation isMounted() warning
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => App);
