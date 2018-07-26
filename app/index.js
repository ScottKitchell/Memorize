import { Navigation } from 'react-native-navigation';
import Memories from './screens/Memories';
import NewMemory from './screens/NewMemory';
import FlaggedMemories from './screens/FlaggedMemories';
import User from './screens/User';

export default () => {
  Navigation.registerComponent('Memories', () => Memories);
  Navigation.registerComponent('FlaggedMemories', () => FlaggedMemories);
  Navigation.registerComponent('User', () => User);
  Navigation.registerComponent('NewMemory', () => NewMemory);

  Navigation.startTabBasedApp({
    tabs: [{
      label: 'Memories',
      screen: 'Memories',
      title: 'Memories'
    }, {
      label: 'Flags',
      screen: 'FlaggedMemories',
      title: 'Flagged memories'
    }, {
      label: 'User',
      screen: 'User',
      title: 'User'
    }]
  })
}
