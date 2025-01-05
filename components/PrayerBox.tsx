// app/components/PrayerBox.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { DailyPrayer } from '../app/models/dailyPrayer'; // or wherever you defined it
import { K } from '../app/managers/constants'; // for the display names

interface PrayerBoxProps {
  prayer: DailyPrayer;
  countdownText?: string;
  onPress?: () => void;
}

// Example functional component
const PrayerBox: React.FC<PrayerBoxProps> = ({
  prayer,
  countdownText = '',
  onPress,
}) => {
  // Determine icon name (in your Swift code, you used SF Symbols)
  // For demo, we just pick an image or vector icon
  // We'll skip logic and just show how to display:

  // You had a "mosque" background. If you have an image in assets:
  const mosqueImage = require('../assets/magr_mosque.png'); // or .jpg

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Background Mosque Image */}
      <ImageBackground source={mosqueImage} style={styles.bgImage} imageStyle={{ opacity: 0.5 }}>
        {/* Foreground contents */}
        <View style={styles.content}>
          {/* Icon (moon, sun, etc.) 
              If using a local asset or vector icon, handle accordingly */}
          <Image
            source={require('../assets/moon.png')} // Example
            style={styles.icon}
            resizeMode="contain"
          />
          {/* Top label */}
          <Text style={styles.topLabel}>{`Next Prayer: ${prayer.name}`}</Text>

          {/* Big countdown */}
          <Text style={styles.countdown}>{countdownText}</Text>

          {/* Iqama label */}
          <Text style={styles.iqamaLabel}>{`${prayer.name} Iqama at ${prayer.iqama}`}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden', 
    backgroundColor: 'black',
    marginVertical: 10, 
    // height: 100 if you want fixed
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 15,
    flex: 1,
    // If you want to align items, do flexDirection, etc.
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'green', // approximate systemGreen
    marginBottom: 10,
  },
  topLabel: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countdown: {
    fontSize: 44,
    color: '#00ff00', // or a custom color from your named color sets
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iqamaLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 'auto', // pushes to bottom if you want
  },
});

export default PrayerBox;
