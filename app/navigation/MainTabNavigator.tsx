// app/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import your screens
import HomeScreen from '../screens/HomeScreen';
import PrayerViewScreen from '../screens/PrayerTimeHomeScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="PrayerView"
        component={PrayerViewScreen}
        options={{ title: 'Prayer' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{ title: 'Announcements' }}
      />
      {/* add more screens if needed */}
    </Tab.Navigator>
  );
}
