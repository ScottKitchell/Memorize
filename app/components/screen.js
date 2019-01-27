import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Colors } from 'app/styles';


export default function Screen({style, statusBarColor, statusBarStyle, statusBarHidden, ...props}) {
  return (
    <View {...props} style={[styles.screen, style]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} hidden={statusBarHidden} />
      {props.children}
    </View>
  );
}
Screen.propTypes = {
  ...View.propTypes,
  statusBarColor: StatusBar.propTypes.backgroundColor,
  statusBarStyle: StatusBar.propTypes.barStyle,
  statusBarHidden: StatusBar.propTypes.hidden,
};
Screen.defaultProps = {
  statusBarColor: Colors.statusBar,
  statusBarStyle: 'light-content',
  statusBarHidden: false,
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});