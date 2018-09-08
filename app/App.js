import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import Memories from './screens/Memories';
import FlaggedMemories from './screens/FlaggedMemories';
import User from './screens/User';
import EditMemory from './screens/EditMemory';
import { Colors } from './scripts/styles';

const TabNavigator = createBottomTabNavigator({
  Memories: { screen: Memories },
  Flags: { screen: FlaggedMemories },
  Reflection: { screen: User }
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
  Tabs: TabNavigator,
  EditMemory: {
    screen: EditMemory,
    navigationOptions: {
      title: 'Edit Memory',
    }
  },
},
{
  navigationOptions: {
    header: null,
    animationEnabled: true,
  }
});

export default AppNavStack;
