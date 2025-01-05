// app/components/PrayerChoiceLabel.tsx
import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface PrayerChoiceLabelProps {
  text: string;
  initiallySelected?: boolean;
  onTap?: () => void; 
  // In Swift, you also had attachTo(...) for constraints
  // We'll rely on the parent to style or position this component
  style?: StyleProp<TextStyle>;
}

// Example functional component
const PrayerChoiceLabel: React.FC<PrayerChoiceLabelProps> = ({
  text,
  initiallySelected = false,
  onTap,
  style,
}) => {
  const [selected, setSelected] = useState(initiallySelected);

  const handlePress = () => {
    setSelected(!selected);
    onTap?.();
  };

  return (
    <Pressable onPress={handlePress}>
      <Text style={[styles.baseText, style, selected ? styles.selectedText : styles.deselectedText]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseText: {
    textAlign: 'center',
    fontSize: 28,
  },
  selectedText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'white',
  },
  deselectedText: {
    color: 'black',
  },
});

export default PrayerChoiceLabel;
