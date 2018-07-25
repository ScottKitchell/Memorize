import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Memories from './app/components/Memories';

class FirstScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>First screen!</Text>
      </View>
    );
  }
}

class SecondScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Second screen!</Text>
      </View>
    );
  }
}

class ThirdScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Third screen!</Text>
      </View>
    );
  }
}

const MemoriesStack = createStackNavigator({
  Home: Memories,
  Details: FirstScreen,
});

export default createBottomTabNavigator({
  Memories: MemoriesStack,
  Flags: { screen: SecondScreen },
  User: { screen: ThirdScreen }
},{
  navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  tabBarOptions: {
    activeTintColor: '#5b10b0',
    inactiveTintColor: 'gray',
    showIcon: false,
  },
});

/*export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
      <Memories />

        <View style={styles.navbar}>
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
        </View>
      </View>
    );
  }
}*/

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
