// app/screens/ContactUsScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import BaseBackground from '../../components/BaseBackground';

export default function ContactUsScreen() {
  // Hardcoded or from a data manager
  const address = '5921 Darlene Drive Rockford, IL 61109';
  const phone = '815-397-3311';
  const email = 'secretary@magr.org';
  const facebook = 'https://www.facebook.com/mccrockford/';
  const twitter = 'https://x.com/rockfordmuslim';
  const instagram = 'https://www.instagram.com/pr.magr/';
  const youtube = 'https://www.youtube.com/channel/UCR5A1w2CHgVzczONPABxOMQ';

  // Functions to open external apps/URLs
  const openMap = (addr: string) => {
    const encoded = encodeURIComponent(addr);
    const url = `http://maps.apple.com/?q=${encoded}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Cannot open maps'));
  };

  const callNumber = (num: string) => {
    const url = `tel://${num}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open dialer');
      }
    });
  };

  const sendEmail = (mail: string) => {
    const url = `mailto:${mail}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Cannot open mail app'));
  };

  const openWebPage = (link: string) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Alert.alert('Error', 'Cannot open link');
      }
    });
  };

  return (
    <BaseBackground logo={require('../../assets/magrImage.png')}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Example "row" for Address */}
        <ContactRow
          icon={require('../../assets/mappin.png')} // or a vector icon
          text={`Address: ${address}`}
          onPress={() => openMap(address)}
          color="red"
        />
        {/* Phone */}
        <ContactRow
          icon={require('../../assets/phone.png')}
          text={`Phone: ${phone}`}
          onPress={() => callNumber(phone)}
          color="green"
        />
        {/* Email */}
        <ContactRow
          icon={require('../../assets/envelope.png')}
          text={`Email: ${email}`}
          onPress={() => sendEmail(email)}
        />
        {/* Facebook */}
        <ContactRow
          icon={require('../../assets/facebook.png')}
          text="Facebook"
          onPress={() => openWebPage(facebook)}
        />
        {/* Twitter */}
        <ContactRow
          icon={require('../../assets/twitter.png')}
          text="Twitter"
          onPress={() => openWebPage(twitter)}
        />
        {/* Instagram */}
        <ContactRow
          icon={require('../../assets/instagram.png')}
          text="Instagram"
          onPress={() => openWebPage(instagram)}
        />
        {/* YouTube */}
        <ContactRow
          icon={require('../../assets/youtube.png')}
          text="YouTube"
          onPress={() => openWebPage(youtube)}
        />
      </ScrollView>
    </BaseBackground>
  );
}

// A sub-component for each row
interface ContactRowProps {
  icon: any;
  text: string;
  onPress: () => void;
  color?: string;
}

function ContactRow({ icon, text, onPress, color = '#007AFF' }: ContactRowProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Image source={icon} style={[styles.rowIcon, { tintColor: color }]} />
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowText}>{text}</Text>
      </View>
      <Image source={require('../../assets/link.png')} style={[styles.rowLinkIcon]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  rowIcon: {
    width: 48,
    height: 48,
    marginRight: 10,
    resizeMode: 'contain',
  },
  rowTextContainer: {
    flex: 1,
  },
  rowText: {
    color: '#007AFF',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  rowLinkIcon: {
    width: 24,
    height: 24,
    tintColor: '#007AFF',
  },
});
