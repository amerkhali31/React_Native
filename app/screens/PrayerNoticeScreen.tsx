// app/screens/PrayerNoticeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import BaseBackground from '../../components/BaseBackground';
// import { FirebaseManager } from '../managers/firebaseManager';
// import { DataManager } from '../managers/dataManager';

interface PrayerNoticeScreenProps {
  route: any; // or direct props
  navigation: any;
}

export default function PrayerNoticeScreen({ route, navigation }: PrayerNoticeScreenProps) {
  // Suppose route.params = { prayerName, adhanFieldName, iqamaFieldName, adhan_bool, iqama_bool }
  const {
    prayerName = 'Fajr',
    adhanFieldName = 'fajr_adhan',
    iqamaFieldName = 'fajr_iqama',
    initialAdhan = false,
    initialIqama = false,
  } = route.params || {};

  const [isAdhanOn, setIsAdhanOn] = useState<boolean>(initialAdhan);
  const [isIqamaOn, setIsIqamaOn] = useState<boolean>(initialIqama);

  const handleAdhanSwitch = (value: boolean) => {
    setIsAdhanOn(value);
    // if (value) FirebaseManager.subscribeToTopic(adhanFieldName)
    // else FirebaseManager.unsubscribeToTopic(adhanFieldName)
    // DataManager.setSingleUserPreference(adhanFieldName, value)
  };

  const handleIqamaSwitch = (value: boolean) => {
    setIsIqamaOn(value);
    // if (value) FirebaseManager.subscribeToTopic(iqamaFieldName)
    // else FirebaseManager.unsubscribeToTopic(iqamaFieldName)
    // DataManager.setSingleUserPreference(iqamaFieldName, value)
  };

  return (
    <BaseBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{`${prayerName} Notification Settings`}</Text>

        {/* Adhan View */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Adhan Notifications</Text>
          <Text style={styles.boxDesc}>Set notifications for {prayerName} adhan.</Text>
          <Switch
            value={isAdhanOn}
            onValueChange={handleAdhanSwitch}
          />
        </View>

        {/* Iqama View */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Iqama Notifications</Text>
          <Text style={styles.boxDesc}>
            Set notifications for 15 minutes before {prayerName} iqama.
          </Text>
          <Switch
            value={isIqamaOn}
            onValueChange={handleIqamaSwitch}
          />
        </View>
      </View>
    </BaseBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  boxDesc: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
});
