import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from './components/icons';
import Memories from './screens/memories';
import FlaggedMemories from './screens/flagged-memories';
import User from './screens/user';
import EditMemory from './screens/edit-memory';
import { Colors } from './scripts/styles';

export const ROUTES = {
  TABS: {
    toString: ()=>'Tabs',
    MEMORIES: 'Memories',
    FLAGS: 'Flags',
    ACCOUNT: 'Account',
  },
  EDIT_MEMORY: {
    toString: ()=>'EditMemory',
  },
};

// const TabNavigator = createBottomTabNavigator({
//   [ROUTES.TABS.MEMORIES]:  Memories,
//   [ROUTES.TABS.FLAGS]:  FlaggedMemories,
//   [ROUTES.TABS.ACCOUNT]:  User,
// },
// {
//   defaultNavigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({ focused, tintColor }) => {
//       const { routeName } = navigation.state;
//       let iconName;
//       if (routeName === ROUTES.TABS.MEMORIES) {
//         iconName = `feature-search${focused? '' : '-outline'}`;
//       } else if (routeName === ROUTES.TABS.FLAGS) {
//         iconName = `flag${focused? '' : '-outline'}`;
//       } else if (routeName === ROUTES.TABS.ACCOUNT) {
//         iconName = `account${focused? '' : '-outline'}`;
//       };
//       return <Icon name={iconName} size={26} color={tintColor} />;
//     },
//   }),
//   tabBarOptions: {
//     activeTintColor: Colors.tabBar.activeIcon,
//     inactiveTintColor: Colors.tabBar.inactiveIcon,
//     showLabel: false,
//     style: {
//       height: 56,
//       backgroundColor: Colors.tabBar.background
//     },
//   },
// });

const tabBarIcon = (iconName) => ({ tintColor, focused }) => (
  <Icon name={`${iconName}${focused? '' : '-outline'}`} size={26} color={tintColor} />
)

const TabNavigator = createMaterialBottomTabNavigator({
  [ROUTES.TABS.MEMORIES]:  {
    screen: Memories,
    navigationOptions: {
        // title: I18n.t('homeTitle'),
        // tabBarLabel: I18n.t('homeTabTitle'),
        // tabBarColor: Colors.primary,
        tabBarIcon: tabBarIcon('feature-search'),
      }
  },
  [ROUTES.TABS.FLAGS]: {
    screen: FlaggedMemories,
    navigationOptions: {
      tabBarIcon: tabBarIcon('flag'),
    },
  },
  [ROUTES.TABS.ACCOUNT]: {
    screen: User,
    navigationOptions: {
      tabBarIcon: tabBarIcon('account'),
    },
  },
},
{
  shifting: true,
  labeled: false,
  activeColor: Colors.tabBar.activeIcon,
  inactiveColor: Colors.tabBar.inactiveIcon,
  barStyle: {
    height: 56,
    backgroundColor: Colors.tabBar.background
  },
});

export const AppNavStack = createStackNavigator({
  [ROUTES.TABS]: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  [ROUTES.EDIT_MEMORY]: {
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
