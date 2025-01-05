// app/screens/LoadScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// << import your param list from RootNavigator:
import { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

export default function LoadScreen() {
  // << Tell TypeScript: "navigation" is for RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeApp() {
      // ... your loading logic, DataManager calls, etc.
      setIsLoading(false);

      // Now TS knows "MainTab" is valid:
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' }], 
      });
    }
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/magrImage.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: height * 0.3,
    marginBottom: 20,
  },
});
