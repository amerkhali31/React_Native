import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

function PrayerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Prayer Screen</Text>
    </View>
  );
}

export default function PrayerStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Prayer" component={PrayerScreen} />
    </Stack.Navigator>
  );
}
