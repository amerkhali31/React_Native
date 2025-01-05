// app/navigation/RootNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadScreen from '../screens/LoadScreen';           // the file you showed
import MainTabNavigator from './MainTabNavigator';        // your main tab nav

// 1) Declare exactly which routes exist
export type RootStackParamList = {
  LoadScreen: undefined;
  MainTab: undefined;
};

// 2) Create the typed Stack
const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false }}  // no headers if you prefer
    >
      <Stack.Screen name="LoadScreen" component={LoadScreen} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
