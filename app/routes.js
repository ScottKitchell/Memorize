import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from './components/generic/icons';
import MemoriesScreen from './screens/memories';
import SearchScreen from './screens/search';
import SearchResultsScreen from './screens/search-results';
import AccountScreen from './screens/account';
import EditMemoryScreen from './screens/edit-memory';
import { Colors } from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const ROUTES = {
  TABS: {
    toString: ()=>'Tabs',
    MEMORIES: 'Memories',
    SEARCH: 'Search',
    ACCOUNT: 'Account',
  },
  EDIT_MEMORY: 'EditMemory',
  SEARCH_RESULTS: 'SearchResults',
};

// const TabNavigator = createBottomTabNavigator({
//   [ROUTES.TABS.MEMORIES]:  MemoriesScreen,
//   [ROUTES.TABS.FLAGS]:  FlaggedMemoriesScreen,
//   [ROUTES.TABS.ACCOUNT]:  AccountScreen,
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

// const tabBarIcon = (iconName) => ({ tintColor, focused }) => (
//   <Icon name={`${iconName}${focused? '' : '-outline'}`} size={26} color={tintColor} />
// )

const tabBarIcon = (iconName) => ({ tintColor }) => (
  <FeatherIcon name={iconName} size={26} color={tintColor} />
);


const TabNavigator = createMaterialBottomTabNavigator({
  [ROUTES.TABS.MEMORIES]:  {
    screen: MemoriesScreen,
    navigationOptions: {
      tabBarAccessibilityLabel: 'All memories',
      tabBarIcon: tabBarIcon('home'),
    },
  },
  [ROUTES.TABS.SEARCH]:  {
    screen: SearchResultsScreen,
    navigationOptions: {
      tabBarAccessibilityLabel: 'Search',
      tabBarIcon: tabBarIcon('search'),
    },
  },
  [ROUTES.TABS.ACCOUNT]: {
    screen: AccountScreen,
    navigationOptions: {
      tabBarAccessibilityLabel: 'User',
      tabBarIcon: tabBarIcon('user'),
    },
  },
},
{
  shifting: false,
  labeled: false,
  activeColor: Colors.tabBar.activeIcon,
  inactiveColor: Colors.tabBar.inactiveIcon,
  barStyle: {
    height: 56,
    backgroundColor: Colors.tabBar.background,
  },
  // initialRouteName: ROUTES.TABS.SEARCH,
});

export const AppNavStack = createStackNavigator({
  [ROUTES.TABS]: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  [ROUTES.EDIT_MEMORY]: {
    screen: EditMemoryScreen,
    navigationOptions: {
      title: 'Edit Memory',
      header: null,
    },
  },
  [ROUTES.SEARCH_RESULTS]: {
    screen: SearchResultsScreen,
    navigationOptions: {
      title: 'Search Results',
      header: null,
    },
  },
},
{
  navigationOptions: {
    header: null,
    animationEnabled: true,
  },
});
