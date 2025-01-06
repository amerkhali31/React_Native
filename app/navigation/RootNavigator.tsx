// app/navigation/RootNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadScreen from '../screens/LoadScreen';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '../../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoadScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoadScreen" component={LoadScreen} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
