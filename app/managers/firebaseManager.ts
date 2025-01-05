// app/managers/firebaseManager.ts
import { db } from './firebaseConfig'; 
import { 
  collection, 
  getDocs,
  DocumentData,
  // etc. from 'firebase/firestore'
} from 'firebase/firestore';

import { K } from './constants';
import { FirebaseOneDayAdhanTimes } from '../models/firebaseOneDayAdhanTimes'; 
import { FirebaseDailyPrayerTimes } from '../models/firebaseDailyPrayerTimes';
import { FirebaseAnnouncement } from '../models/firebaseAnnouncement';

// We'll replicate your Swift logic, but adapt to the JS Firestore syntax.

// DataManager reference (we haven't built it yet, 
// so let's assume we have a setDateOfLastNetwork in DataManager).
import { DataManager } from './dataManager'; // We'll create later

export class FirebaseManager {
  private constructor() {}

  // Fetch monthly adhan times
  static async fetchMonthlyAdhanTimes(): Promise<FirebaseOneDayAdhanTimes[]> {
    const monthlyAdhanTimes: FirebaseOneDayAdhanTimes[] = [];
    try {
      // Firestore collection ref
      const monthlyRef = collection(
        db, 
        K.FireStore.Collections.monthly_adhan_times.collection_name
      );
      const snapshot = await getDocs(monthlyRef);
      
      snapshot.forEach(doc => {
        // doc.data() returns a DocumentData
        const data = doc.data() as Partial<FirebaseOneDayAdhanTimes>;
        // Convert to your model (with fallback defaults)
        monthlyAdhanTimes.push({
          fajr: data.fajr || '66:66 AM',
          dhuhr: data.dhuhr || '66:66 AM',
          asr: data.asr || '66:66 AM',
          maghrib: data.maghrib || '66:66 AM',
          isha: data.isha || '66:66 AM',
          sunrise: data.sunrise || '66:66 AM',
          date: data.date || '2024-11-09',
        });
      });

      // Sort by date ascending
      // NOTE: We need to parse the date string, compare them, etc.
      monthlyAdhanTimes.sort((a, b) => a.date.localeCompare(b.date));

    } catch (error) {
      console.log('Error fetching monthly adhan times:', error);
    }
    return monthlyAdhanTimes;
  }

  // Fetch today prayer times
  static async fetchTodayPrayerTimes(): Promise<FirebaseDailyPrayerTimes> {
    // default
    let today_times: FirebaseDailyPrayerTimes = {
      fajr_adhan: '66:66 AM',
      fajr_iqama: '66:66 AM',
      dhuhr_adhan: '66:66 AM',
      dhuhr_iqama: '66:66 AM',
      asr_adhan: '66:66 AM',
      asr_iqama: '66:66 AM',
      maghrib_adhan: '66:66 AM',
      maghrib_iqama: '66:66 AM',
      isha_adhan: '66:66 AM',
      isha_iqama: '66:66 AM',
      jumaa_khutba: '66:66 AM',
      jumaa_salah: '66:66 AM',
    };

    try {
      const todayRef = collection(
        db, 
        K.FireStore.Collections.todays_prayer_times.collection_name
      );
      const snapshot = await getDocs(todayRef);
      const docs = snapshot.docs;

      if (docs.length > 0) {
        // In Swift, you used the first doc
        const docData = docs[0].data() as Partial<FirebaseDailyPrayerTimes>;
        today_times = {
          ...today_times,
          ...docData,
        };
        // Set dateOfLastNetwork
        DataManager.setDateOfLastNetwork(new Date());
      }
    } catch (error) {
      console.log('Error fetching daily prayer times:', error);
    }
    return today_times;
  }

  // Fetch hadith number
  static async fetchHadithNumber(): Promise<string> {
    const hadithRef = collection(db, K.FireStore.Collections.hadiths.collection_name);
    try {
      const snapshot = await getDocs(hadithRef);
      const docs = snapshot.docs;
      if (docs.length > 0) {
        // We assume there's a field named "number" that's an int
        const numberVal = docs[0].data()[K.FireStore.Collections.hadiths.hadith.fields.number];
        if (typeof numberVal === 'number') {
          return String(numberVal);
        }
      }
      return '1'; // default
    } catch (error) {
      console.log('Could not fetch hadithNumber:', error);
      return '999';
    }
  }

  // Fetch Announcement Image URLs
  static async fetchAnnouncementImageURLs(): Promise<FirebaseAnnouncement> {
    let announcements: FirebaseAnnouncement = { urls: [] };
    try {
      const announceRef = collection(db, K.FireStore.Collections.announcements.collection_name);
      const snapshot = await getDocs(announceRef);
      const docs = snapshot.docs;
      if (docs.length > 0) {
        const docData = docs[0].data() as Partial<FirebaseAnnouncement>;
        announcements = {
          urls: docData.urls || [],
        };
      }
    } catch (error) {
      console.log('Error fetching Announcement URLs:', error);
    }
    return announcements;
  }

  // Fetch Announcement Images
  // NOTE: There's no direct 'UIImage' in React Native. 
  // Typically, you'd set the image source to the URL rather than fetching raw image data.
  // If you truly want to fetch the image data, you can get base64 or a blob. 
  // We'll show an example returning base64 strings for each image:
  static async fetchAnnouncementImages(urlList: string[]): Promise<string[]> {
    // We'll store base64-encoded images
    const images: string[] = [];

    const tasks = urlList.map(async url => {
      const base64 = await FirebaseManager.fetchImage(url);
      if (base64) images.push(base64);
    });

    // run them concurrently
    await Promise.all(tasks);
    return images;
  }

  // helper to fetch a single image, returning base64 string
  private static async fetchImage(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // Convert blob to base64
      const base64 = await blobToBase64(blob);
      return base64;
    } catch (error) {
      console.log('Error fetching image from URL', url, error);
      return null;
    }
  }

  // Subscribe to a topic
  // NOTE: The official Firebase JS SDK in RN doesn't fully support messaging topics 
  // like the native iOS/Android SDK does. Typically, you'd use react-native-firebase for this.
  static subscribeToTopic(topic: string) {
    console.log(`Attempting to subscribe to topic ${topic}. Not fully supported in the web SDK for RN.`);
    // If you have react-native-firebase:
    // messaging().subscribeToTopic(topic).then(...).catch(...);
  }

  // Unsubscribe
  static unsubscribeToTopic(topic: string) {
    console.log(`Attempting to unsubscribe from topic ${topic}. Also not fully supported in the web SDK.`);
  }
}

// Utility for converting Blob to base64 in RN
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(',')[1];
      if (base64data) {
        resolve(base64data);
      } else {
        reject('Conversion to base64 failed');
      }
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}
