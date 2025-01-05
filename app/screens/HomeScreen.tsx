// app/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import BaseBackground from '../../components/BaseBackground';
import PrayerBox from '../../components/PrayerBox';  // from your previous conversion
import HomeBox from '../../components/HomeBox';      // from your previous conversion
// Import your managers or utility logic
// import { DataManager } from '../managers/dataManager';
// import { TimeManager } from '../managers/timeManager';
// import { PrayerManager } from '../managers/prayerManager';

export default function HomeScreen({ navigation }: any) {
  // We replicate your Swift code

  // Suppose we store the date labels in local state
  const [gregorianDate, setGregorianDate] = useState('');
  const [islamicDate, setIslamicDate] = useState('');
  const [countdown, setCountdown] = useState('00:00:00');

  // In Swift, you used `DataManager.nextPrayer`. Let’s mock or call your manager:
  const nextPrayer = {
    name: 'Dhuhr',
    adhan: '12:30 PM',
    iqama: '12:45 PM',
  };
  // We’ll pretend we fetch from your managers
  // const nextPrayer = DataManager.nextPrayer;

  useEffect(() => {
    // Similar to "setupLabels()" in Swift
    setGregorianDate(/*TimeManager.formatDateToReadable(...)*/ 'September 1st, 2025');
    setIslamicDate(/*TimeManager.convertToIslamicDate(new Date())*/ 'IslamicDate...');

    // Start the timer for countdown
    const interval = setInterval(() => {
      // let t = PrayerManager.getTimeUntilNextPrayer();
      // const { hours, minutes, seconds } = TimeManager.convertSecondsToTime(t);
      // For demo:
      let t = 3600;
      t -= 1;

      const hours = '00';
      const minutes = '59';
      const secs = '59';

      setCountdown(`${hours}:${minutes}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Tap handlers
  const handleAnnouncementsPress = () => {
    // Swift does: performSegue(withIdentifier: K.segues.announceSegue, ...)
    // In React Navigation:
    navigation.navigate('AnnouncementScreen'); 
  };

  const handleHadithPress = async () => {
    // Show a loading overlay, fetch hadith, then present
    // For demonstration:
    Alert.alert('Hadith of the Day', 'Fetch from server...');
    // navigation.navigate('HadithScreen'); // if you have a route for it
  };

  const handleContactPress = () => {
    // present ContactUsViewController => navigation.navigate('ContactUsScreen');
    navigation.navigate('ContactUsScreen');
  };

  const handleDonatePress = () => {
    // Swift opened a URL
    // In RN:
    // Linking.openURL("https://magr.org/donate/");
    Alert.alert('Donate', 'Go to https://magr.org/donate/');
  };

  return (
    <BaseBackground logo={require('../../assets/magrImage.png')}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Date labels */}
        <Text style={styles.dateLabel}>{gregorianDate}</Text>
        <Text style={styles.dateLabel}>{islamicDate}</Text>

        {/* PrayerBox with countdown */}
        <PrayerBox
          prayer={nextPrayer}
          countdownText={countdown}
          onPress={() => {
            // In Swift: `prayerTouched()` sets tabBarController.selectedIndex = 0
            // In RN, we'd do something else:
            navigation.navigate('PrayerViewScreen'); 
          }}
        />

        {/* HomeBox for announcements */}
        <HomeBox
          icon={require('../../assets/bell.png')} 
          topText="Announcements"
          bottomText="Stay up to date with MAGR news"
          onPress={handleAnnouncementsPress}
        />

        {/* HomeBox for hadith of day */}
        <HomeBox
          icon={require('../../assets/book.png')} 
          topText="Hadith of the Day"
          bottomText="Reflect on the wisdom of Hadith"
          onPress={handleHadithPress}
        />

        {/* Contact Us */}
        <HomeBox
          icon={require('../../assets/phone.png')} 
          topText="Contact Us"
          bottomText="Find all of our contact information"
          onPress={handleContactPress}
        />

        {/* Donate */}
        <HomeBox
          icon={require('../../assets/dollarsign.circle.png')} 
          topText="Donate"
          bottomText="Increase in charity"
          onPress={handleDonatePress}
        />

        {/* Add more boxes if needed */}
      </ScrollView>
    </BaseBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dateLabel: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
});
