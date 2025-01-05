// app/screens/HadithScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import BaseBackground from '../../components/BaseBackground';

// Suppose we have the APIResponse Type from your models
import { APIResponse } from '../models/hadith'; 

interface HadithScreenProps {
  route?: any; 
  // If using React Navigation, you'd get props via route.params
  // e.g. route.params.apiResponse
  // Or you can pass it as a normal prop if not using navigation
}

export default function HadithScreen({ route }: HadithScreenProps) {
  // If using navigation:
  // const apiResponse: APIResponse | undefined = route?.params?.apiResponse;
  // If you have some global state or a manager, you can fetch from there
  const apiResponse: APIResponse | undefined = undefined; // mock

  const {
    narrator,
    hadithNumber,
    hadithEnglish,
    bookSlug,
    chapterEnglish,
    volume,
  } = processApiResponse(apiResponse);

  return (
    <BaseBackground logo={require('../../assets/magrImage.png')}>
      <View style={styles.container}>
        {/* "Drag handle" is typically iOS-specific. We can replicate as a simple bar */}
        <View style={styles.dragHandle} />
        
        <Text style={styles.bookLabel}>
          Book: {bookSlug}, Volume: {volume}, Chapter: {chapterEnglish}, Hadith Number: {hadithNumber}
        </Text>

        <Text style={styles.narratorLabel}>Narrator: {narrator}</Text>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.hadithText}>
            {hadithEnglish}
          </Text>
        </ScrollView>
      </View>
    </BaseBackground>
  );
}

// Helper to parse the Swift data structure
function processApiResponse(apiResponse?: APIResponse) {
  const hadithsData = apiResponse?.hadiths?.data;
  if (!hadithsData || hadithsData.length === 0 || !hadithsData[0]) {
    return {
      narrator: 'N/A',
      hadithNumber: 'N/A',
      hadithEnglish: 'N/A',
      bookSlug: 'N/A',
      chapterEnglish: 'N/A',
      volume: 'N/A',
    };
  }
  const hadith = hadithsData[0];
  return {
    narrator: hadith?.englishNarrator ?? 'N/A',
    hadithNumber: hadith?.hadithNumber ?? 'N/A',
    hadithEnglish: hadith?.hadithEnglish ?? 'N/A',
    bookSlug: hadith?.bookSlug ?? 'N/A',
    chapterEnglish: hadith?.chapter?.chapterEnglish ?? 'N/A',
    volume: hadith?.volume ?? 'N/A',
  };
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  dragHandle: {
    backgroundColor: 'lightgray',
    borderRadius: 3,
    width: 50,
    height: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bookLabel: {
    color: 'white',
    fontSize: 17,
    marginBottom: 10,
  },
  narratorLabel: {
    color: 'white',
    fontSize: 17,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  scrollContent: {
    padding: 10,
  },
  hadithText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});
