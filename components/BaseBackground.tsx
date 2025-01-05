// app/components/BaseBackground.tsx
import React, { PropsWithChildren } from 'react';
import { Image, StyleSheet, View, ImageSourcePropType, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
// or react-native-linear-gradient if not in Expo

// Example props
interface BaseBackgroundProps {
  logo?: ImageSourcePropType; 
  // Possibly pass custom gradient colors or other props
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BaseBackground: React.FC<PropsWithChildren<BaseBackgroundProps>> = ({
  logo,
  children,
}) => {
  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <LinearGradient
        colors={['#YOUR_FIRST_COLOR', '#YOUR_SECOND_COLOR']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top Logo */}
        {logo && (
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        {/* Screen Content */}
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 55,
    alignSelf: 'center',
  },
});

export default BaseBackground;
