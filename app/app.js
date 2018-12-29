import { Platform, StyleSheet, Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { AppNavStack } from './routes';

export default createAppContainer(AppNavStack);
