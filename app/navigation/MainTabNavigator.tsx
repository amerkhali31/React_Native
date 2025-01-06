// app/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PrayerTimeHomeScreen from '../screens/PrayerTimeHomeScreen';
import { MainTabParamList } from '../../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="PrayerTimeHomeScreen" component={PrayerTimeHomeScreen} />
    </Tab.Navigator>
  );
}
