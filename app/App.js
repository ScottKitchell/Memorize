import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import Memories from './screens/Memories';
import NewMemory from './screens/NewMemory';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Hey!</Text>
      <Memories />

        {/*<View style={styles.navbar}>
          <TouchableNativeFeedback onPress={this._onPressButton} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Reflection</Text>
            </View>
          </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this._onPressButton} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Memories</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this._onPressButton} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableNativeFeedback>
      </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  }
});
