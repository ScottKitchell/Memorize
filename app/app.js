import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from './components/icons';
import Memories from './screens/memories';
import FlaggedMemories from './screens/flagged-memories';
import User from './screens/user';
import EditMemory from './screens/edit-memory';
import { Colors } from './scripts/styles';

const TabNavigator = createBottomTabNavigator({
  Memories:  Memories,
  Flags:  FlaggedMemories,
  Reflection:  User,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Memories') {
        iconName = 'calendar';
      } else if (routeName === 'Flags') {
        iconName = 'flag';
      } else if (routeName === 'Reflection') {
        iconName = 'user';
      }
      return <Icon name={iconName} size={24} color={focused? Colors.primary : Colors.grey} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.grey,
    style: {
      height: 56,
      backgroundColor: '#FFF'
    },
    labelStyle: {
      marginBottom: 6,
    }
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
    animationEnabled: true,
  }
});

export default createAppContainer(AppNavStack);
