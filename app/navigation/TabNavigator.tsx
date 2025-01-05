import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import PrayerStackNavigator from './PrayerStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="PrayerTab"
        component={PrayerStackNavigator}
        options={{ title: 'Prayer' }}
      />
    </Tab.Navigator>
  );
}
