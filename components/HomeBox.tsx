// app/components/HomeBox.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';

// Props interface
interface HomeBoxProps {
  icon?: ImageSourcePropType; // or string if using require('path')
  topText: string;
  bottomText: string;
  onPress?: () => void;
}

// Example functional component
const HomeBox: React.FC<HomeBoxProps> = ({
  icon,
  topText,
  bottomText,
  onPress
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Icon */}
      {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}

      {/* Texts */}
      <View style={styles.textContainer}>
        <Text style={styles.topLabel}>{topText}</Text>
        <Text style={styles.bottomLabel}>{bottomText}</Text>
      </View>
    </Pressable>
  );
};

// Example styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // If you want a fixed height, you can add: height: 95
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'green', // or 'systemGreen' approximate
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // so it takes the remaining space
  },
  topLabel: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomLabel: {
    fontSize: 14,
    color: 'lightgray',
  },
});

export default HomeBox;
