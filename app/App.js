import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import Memories from './components/Memories';
import NewMemory from './components/NewMemory';

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
  Home: {
    screen: Memories,
    navigationOptions: {
      title: 'Memories'
    }
  },
  NewMemory: {
    screen: NewMemory,
    navigationOptions: ({ navigation }) => ({
      title: 'New Memory',
      tabBarVisible: false,
    })
  },
},
{
  navigationOptions: {
    header: null,
    animationEnabled: true
  }
});

export default createBottomTabNavigator({
  Memories: { screen: MemoriesStack },
  Flags: { screen: SecondScreen },
  User: { screen: ThirdScreen }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Memories') {
        iconName = 'circle';
      } else if (routeName === 'Flags') {
        iconName = 'flag';
      } else if (routeName === 'User') {
        iconName = 'user';
      }

      return <Icon name={iconName} size={30} color="#900" />;
      //return <Text>what</Text>
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
