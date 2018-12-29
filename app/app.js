import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from './components/icons';
import Memories from './screens/memories';
import FlaggedMemories from './screens/flagged-memories';
import User from './screens/user';
import EditMemory from './screens/edit-memory';
import { Colors } from './scripts/styles';

const MEMORIES = 'Memories';
const FLAGS = 'Flags';
const ACCOUNT = 'Account'

const TabNavigator = createBottomTabNavigator({
  [MEMORIES]:  Memories,
  [FLAGS]:  FlaggedMemories,
  [ACCOUNT]:  User,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === MEMORIES) {
        iconName = `feature-search${focused? '' : '-outline'}`;
      } else if (routeName === FLAGS) {
        iconName = `flag${focused? '' : '-outline'}`;
      } else if (routeName === ACCOUNT) {
        iconName = `account${focused? '' : '-outline'}`;
      };
      return <Icon name={iconName} size={24} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.tabBar.activeIcon,
    inactiveTintColor: Colors.tabBar.inactiveIcon,
    showLabel: false,
    style: {
      height: 56,
      backgroundColor: Colors.tabBar.background
    },
    // labelStyle: {
    //   marginBottom: 6,
    // }
  },
});

const AppNavStack = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  EditMemory: {
    screen: EditMemory,
    navigationOptions: {
      title: 'Edit Memory',
      header: null,
    }
  },
},
{
  navigationOptions: {
    header: null,
    animationEnabled: false,
  }
});

export default createAppContainer(AppNavStack);
