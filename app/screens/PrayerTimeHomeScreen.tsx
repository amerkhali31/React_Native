// app/screens/PrayerTimeHomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import BaseBackground from '../../components/BaseBackground';
// If you made your PrayerChoiceLabel into a reusable RN component:
import PrayerChoiceLabel from '../../components/PrayerChoiceLabel';
// If you made your PrayerView, or we have a custom component for each prayer row:
import PrayerView from '../../components/PrayerView';
// Or the monthly row (like a custom cell)...

export default function PrayerTimeHomeScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'today' | 'monthly'>('today');

  // In Swift, you had DataManager calls. We'll mock them or reference them:
  const notificationsEnabled = true; // DataManager.notificationsEnabled

  // “Today” prayers
  const fajr = { name: 'Fajr', adhan: '05:00 AM', iqama: '05:15 AM' };
  const dhuhr = { name: 'Dhuhr', adhan: '12:30 PM', iqama: '12:45 PM' };
  const asr = { name: 'Asr', adhan: '04:30 PM', iqama: '04:45 PM' };
  const maghrib = { name: 'Maghrib', adhan: '07:00 PM', iqama: '07:05 PM' };
  const isha = { name: 'Isha', adhan: '09:00 PM', iqama: '09:15 PM' };
  const khutba = { name: 'Jumaa Khutba', adhan: '00:00', iqama: '12:00 PM' };
  const jumaa = { name: 'Jumaa Salah', adhan: '00:00', iqama: '12:15 PM' };

  // “Monthly” data
  // Suppose each entry is { date: '2025-09-01', fajr: '...', dhuhr: '...', asr: '...', maghrib: '...', isha: '...' }
  const monthlyData = [
    { date: '2025-09-01', fajr: '05:00 AM', dhuhr: '12:30 PM', asr: '04:30 PM', maghrib: '07:00 PM', isha: '09:00 PM' },
    { date: '2025-09-02', fajr: '05:01 AM', dhuhr: '12:31 PM', asr: '04:31 PM', maghrib: '07:01 PM', isha: '09:01 PM' },
    // ...
  ];

  /** Toggling “Today” vs “Monthly” labels */
  const switchToToday = () => {
    setActiveTab('today');
  };
  const switchToMonthly = () => {
    setActiveTab('monthly');
  };

  /** “Prayer touched” -> push or navigate to Notice screen if notifications are enabled */
  const onPrayerPress = (prayer: any) => {
    if (!notificationsEnabled) {
      Alert.alert(
        'Enable Notifications',
        'Please enable notifications in your device settings and restart the app to use this feature.'
      );
      return;
    }
    // Build “inputs”
    // e.g. if prayer.name === 'Fajr', use the adhan_notification etc.
    navigation.navigate('PrayerNoticeScreen', {
      // pass your needed props: prayerName, adhan_field_name, iqama_field_name, etc.
      prayerName: prayer.name,
      adhanFieldName: 'fajr_adhan',
      iqamaFieldName: 'fajr_iqama',
      initialAdhan: true, // or DataManager...
      initialIqama: false,
    });
  };

  // We can do highlight logic for the current prayer if needed.

  return (
    <BaseBackground>
      {/* If you want to handle swipe gestures, we might wrap in a gesture handler. For brevity, we skip that. */}
      <View style={styles.topRow}>
        {/* “Today” label */}
        <PrayerChoiceLabel
          text="Today"
          initiallySelected={activeTab === 'today'}
          onTap={switchToToday}
        />
        {/* “Monthly” label */}
        <PrayerChoiceLabel
          text="Monthly"
          initiallySelected={activeTab === 'monthly'}
          onTap={switchToMonthly}
        />
      </View>

      {activeTab === 'today' ? (
        /** TODAY VIEW */
        <View style={styles.todayView}>
          {/* top labels like date, "Adhan", "Iqama" */}
          <Text style={[styles.label, { alignSelf: 'flex-start' }]}>September 2nd, 2025</Text>
          <View style={styles.labelsRow}>
            <Text style={styles.label}>Adhan</Text>
            <Text style={styles.label}>Iqama</Text>
          </View>

          {/* Prayer rows */}
          <PrayerView icon={require('../../assets/moon.png')} prayer={fajr} onPress={() => onPrayerPress(fajr)} />
          <PrayerView icon={require('../../assets/sun.max.png')} prayer={dhuhr} onPress={() => onPrayerPress(dhuhr)} />
          <PrayerView icon={require('../../assets/sun.min.png')} prayer={asr} onPress={() => onPrayerPress(asr)} />
          <PrayerView icon={require('../../assets/sun.horizon.png')} prayer={maghrib} onPress={() => onPrayerPress(maghrib)} />
          <PrayerView icon={require('../../assets/moon.png')} prayer={isha} onPress={() => onPrayerPress(isha)} />
          {/* For Jumaa, etc. */}
          <PrayerView icon={require('../../assets/music.mic.png')} prayer={khutba} />
          <PrayerView icon={require('../../assets/sun.max.png')} prayer={jumaa} />
        </View>
      ) : (
        /** MONTHLY VIEW */
        <View style={styles.monthView}>
          <View style={styles.monthHeader}>
            {/* 6 columns: [MonthName, Fajr, Dhuhr, Asr, Maghrib, Isha] */}
            <Text style={[styles.monthHeaderCell, { flex: 1 }]}>{'September'}</Text>
            <Text style={styles.monthHeaderCell}>Fajr</Text>
            <Text style={styles.monthHeaderCell}>Dhuhr</Text>
            <Text style={styles.monthHeaderCell}>Asr</Text>
            <Text style={styles.monthHeaderCell}>Maghrib</Text>
            <Text style={styles.monthHeaderCell}>Isha</Text>
          </View>
          {/* Table */}
          <FlatList
            data={monthlyData}
            keyExtractor={(item, index) => `${item.date}-${index}`}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.monthRow,
                  { backgroundColor: index % 2 === 0 ? 'rgba(0,128,0,0.5)' : 'transparent' },
                ]}
              >
                <Text style={[styles.monthCell, { flex: 1 }]}>{item.date}</Text>
                <Text style={styles.monthCell}>{item.fajr}</Text>
                <Text style={styles.monthCell}>{item.dhuhr}</Text>
                <Text style={styles.monthCell}>{item.asr}</Text>
                <Text style={styles.monthCell}>{item.maghrib}</Text>
                <Text style={styles.monthCell}>{item.isha}</Text>
              </View>
            )}
          />
        </View>
      )}
    </BaseBackground>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  todayView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  monthView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  monthHeaderCell: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  monthRow: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  monthCell: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
  },
});
