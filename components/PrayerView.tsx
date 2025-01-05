// app/components/PrayerView.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { DailyPrayer } from '../app/models/dailyPrayer';

interface PrayerViewProps {
  icon?: any; // or ImageSourcePropType
  prayer: DailyPrayer;
  show?: boolean;
  jumaa?: boolean;
  // Swift had onTouch closure
  onPress?: () => void;
}

// We also replicate the "alarmIcon" logic
const PrayerView: React.FC<PrayerViewProps> = ({
  icon,
  prayer,
  show = true,
  jumaa = false,
  onPress,
}) => {
  const [alarmOn, setAlarmOn] = useState<boolean>(false);

  // Toggle alarm color
  const toggleAlarm = () => {
    setAlarmOn(!alarmOn);
    // If you want an alert, you'd do an Alert.alert(...) 
  };

  // Equivalent to Swift's "configure()"
  const displayedPrayerName = jumaa ? 'Jumaa' : prayer.name;
  const displayedAdhan = jumaa 
    ? prayer.name.replace('Jumaa ', '') 
    : prayer.adhan;
  const displayedIqama = prayer.iqama;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Icon */}
      {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}

      {/* Prayer label */}
      <Text style={styles.prayerLabel}>{displayedPrayerName}</Text>

      {/* Adhan label (center) */}
      <Text style={styles.adhanLabel}>{displayedAdhan}</Text>

      {/* Iqama label */}
      <Text style={styles.iqamaLabel}>{displayedIqama}</Text>

      {/* Alarm icon */}
      <Pressable onPress={toggleAlarm} style={styles.alarmIconPress}>
        <Image
          source={require('../assets/alarm.png')} // Or vector icon
          style={[
            styles.alarmIcon,
            { tintColor: alarmOn ? 'white' : 'gray' },
          ]}
          resizeMode="contain"
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    height: 60, // or your preferred
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginRight: 10,
  },
  prayerLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 20,
  },
  adhanLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 'auto', 
    // We want this in the center, so you might do flex: 1 & textAlign: 'center'
  },
  iqamaLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  alarmIconPress: {
    padding: 5,
  },
  alarmIcon: {
    width: 20,
    height: 20,
  },
});

export default PrayerView;
