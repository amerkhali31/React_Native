// app/managers/dataManager.ts
import { DailyPrayer } from '../models/dailyPrayer';
import { FirebaseOneDayAdhanTimes } from '../models/firebaseOneDayAdhanTimes';
import { FirebaseDailyPrayerTimes } from '../models/firebaseDailyPrayerTimes';
import { FirebaseAnnouncement } from '../models/firebaseAnnouncement';
import { getRealm } from '../realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { K } from './constants';
import { PrayerManager } from './prayerManager';
import { TimeManager } from './timeManager';
import { FirebaseManager } from './firebaseManager';

// Realm data model interfaces for convenience
interface TodayPrayer {
  _id?: Realm.BSON.ObjectId;
  fajr_adhan?: string;
  fajr_iqama?: string;
  dhuhr_adhan?: string;
  dhuhr_iqama?: string;
  asr_adhan?: string;
  asr_iqama?: string;
  maghrib_adhan?: string;
  maghrib_iqama?: string;
  isha_adhan?: string;
  isha_iqama?: string;
  jumaa_khutba?: string;
  jumaa_salah?: string;
}

interface MonthlyPrayer {
  _id?: Realm.BSON.ObjectId;
  fajr?: string;
  dhuhr?: string;
  asr?: string;
  maghrib?: string;
  isha?: string;
  sunrise?: string;
  date?: string;  // "yyyy-MM-dd"
}

interface Announcement {
  _id?: Realm.BSON.ObjectId;
  url?: string;
}

export class DataManager {
  /** 
   * STATIC IN-MEMORY PROPERTIES (replacing your Swift static vars)
   * You can store these to reflect the "current" daily prayer times, etc.
   */
  
  // Similar to Swift’s "dateOfLastNetwork" (we'll also store in AsyncStorage)
  static dateOfLastNetwork: Date = new Date();
  
  // Hadith Number
  static hadithNumber: string = '1';
  
  // Prayer notification preferences
  static prayer_notification_preferences: Record<string, boolean> = {};
  
  // "TodayPrayer" entity loaded from Realm
  static todayPrayerEntity: TodayPrayer | null = null;
  static monthlyPrayerEntities: MonthlyPrayer[] = [];
  static announcementEntities: Announcement[] = [];
  
  // Lists for announcements
  static urlList: string[] = [];  // We'll store them as strings
  static urlImages: string[] = []; // or base64 strings, if we actually fetched them
  
  // Current/Next Prayer in memory
  static currentPrayer: DailyPrayer = { name: 'Fajr', adhan: '98:76 PM', iqama: '98:76 PM' };
  static nextPrayer: DailyPrayer = { name: 'Fajr', adhan: '98:76 PM', iqama: '98:76 PM' };
  
  // The five daily prayers for "today" 
  static fajrToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.fajr, adhan: '98:76 PM', iqama: '98:76 PM' };
  static dhuhrToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.dhuhr, adhan: '98:76 PM', iqama: '98:76 PM' };
  static asrToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.asr, adhan: '98:76 PM', iqama: '98:76 PM' };
  static maghribToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.maghrib, adhan: '98:76 PM', iqama: '98:76 PM' };
  static ishaToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.isha, adhan: '98:76 PM', iqama: '98:76 PM' };
  
  static khutbaToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.jumaa_khutba, adhan: '98:76 PM', iqama: '98:76 PM' };
  static jumaaToday: DailyPrayer = { name: K.DailyPrayerDisplayNames.jumaa_salah, adhan: '98:76 PM', iqama: '98:76 PM' };
  
  // Possibly store monthly prayers from Firebase
  static monthlyPrayers: FirebaseOneDayAdhanTimes[] = [];
  
  // For demonstration
  static todaysDate: string = TimeManager.getTodaysDate();
  
  // Whether notifications are enabled (not used much in RN, but we keep it)
  static notificationsEnabled: boolean = false;
  
  /** 
   * =============== USERDEFAULTS-LIKE METHODS (AsyncStorage) ===============
   */

  static async getDateOfLastNetwork(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(K.userDefaults.lastNetworkDate);
      if (stored) {
        const dateNum = parseInt(stored, 10);
        DataManager.dateOfLastNetwork = new Date(dateNum);
      } else {
        // If not found, set a default
        await DataManager.setDateOfLastNetwork();
      }
    } catch (error) {
      console.log('Error reading dateOfLastNetwork:', error);
    }
  }

  static async setDateOfLastNetwork(date: Date = new Date(2024, 10, 9)): Promise<void> {
    try {
      await AsyncStorage.setItem(K.userDefaults.lastNetworkDate, String(date.getTime()));
      DataManager.dateOfLastNetwork = date;
    } catch (error) {
      console.log('Error setting dateOfLastNetwork:', error);
    }
  }

  static async getHadithNumber(): Promise<void> {
    try {
      const number = await AsyncStorage.getItem(K.userDefaults.hadithNumber);
      if (number) {
        DataManager.hadithNumber = number;
      } else {
        await DataManager.setHadithNumber('1');
      }
    } catch (error) {
      console.log('Error reading hadithNumber:', error);
    }
  }

  static async setHadithNumber(num: string): Promise<void> {
    try {
      await AsyncStorage.setItem(K.userDefaults.hadithNumber, num);
      DataManager.hadithNumber = num;
    } catch (error) {
      console.log('Error setting hadithNumber:', error);
    }
  }

  static notices = [
    K.userDefaults.fajr_adhan_notification,
    K.userDefaults.fajr_iqama_notification,
    K.userDefaults.dhuhr_adhan_notification,
    K.userDefaults.dhuhr_iqama_notification,
    K.userDefaults.asr_adhan_notification,
    K.userDefaults.asr_iqama_notification,
    K.userDefaults.maghrib_adhan_notification,
    K.userDefaults.maghrib_iqama_notification,
    K.userDefaults.isha_adhan_notification,
    K.userDefaults.isha_iqama_notification,
  ];

  static async loadUserNotificationPreferences(): Promise<void> {
    try {
      for (const notice of DataManager.notices) {
        const value = await AsyncStorage.getItem(notice);
        if (value !== null) {
          DataManager.prayer_notification_preferences[notice] = value === 'true';
        } else {
          // Default is false
          await DataManager.setSingleUserPreference(notice, false);
        }
      }
    } catch (error) {
      console.log('Error loading user notification prefs:', error);
    }
  }

  static async setSingleUserPreference(name: string, status: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(name, status ? 'true' : 'false');
      DataManager.prayer_notification_preferences[name] = status;
    } catch (error) {
      console.log('Error setting user preference:', error);
    }
  }

  /** 
   * =============== REALM PERSISTENCE (CORE DATA REPLACEMENT) ===============
   */

  // CREATE
  // We'll create an object in Realm from a given FirebaseDailyPrayerTimes
  static async createTodayPrayerEntity(prayerTimes: FirebaseDailyPrayerTimes) {
    const realm = await getRealm();
    let entity: TodayPrayer | null = null;
    realm.write(() => {
      entity = realm.create('TodayPrayer', {
        fajr_adhan: prayerTimes.fajr_adhan,
        fajr_iqama: prayerTimes.fajr_iqama,
        dhuhr_adhan: prayerTimes.dhuhr_adhan,
        dhuhr_iqama: prayerTimes.dhuhr_iqama,
        asr_adhan: prayerTimes.asr_adhan,
        asr_iqama: prayerTimes.asr_iqama,
        maghrib_adhan: prayerTimes.maghrib_adhan,
        maghrib_iqama: prayerTimes.maghrib_iqama,
        isha_adhan: prayerTimes.isha_adhan,
        isha_iqama: prayerTimes.isha_iqama,
        jumaa_khutba: prayerTimes.jumaa_khutba,
        jumaa_salah: prayerTimes.jumaa_salah,
      }) as TodayPrayer;
    });
    return entity;
  }

  static async createMonthlyPrayerEntity(prayers: FirebaseOneDayAdhanTimes) {
    const realm = await getRealm();
    let entity: MonthlyPrayer | null = null;
    realm.write(() => {
      entity = realm.create('MonthlyPrayer', {
        fajr: prayers.fajr,
        dhuhr: prayers.dhuhr,
        asr: prayers.asr,
        maghrib: prayers.maghrib,
        isha: prayers.isha,
        sunrise: prayers.sunrise,
        date: prayers.date,
      }) as MonthlyPrayer;
    });
    return entity;
  }

  static async createAnnouncementEntities(announcements: FirebaseAnnouncement): Promise<Announcement[]> {
    const realm = await getRealm();
    const announcementList: Announcement[] = [];
    realm.write(() => {
      for (const url of announcements.urls) {
        const created = realm.create('Announcement', {
          url: url,
        }) as Announcement;
        announcementList.push(created);
      }
    });
    return announcementList;
  }

  // READ
  static async loadTodayPrayerEntity() {
    const realm = await getRealm();
    const today = realm.objects<TodayPrayer>('TodayPrayer');
    if (today.length > 0) {
      DataManager.todayPrayerEntity = today[0];
    }
  }

  static async loadMonthlyPrayerEntities() {
    const realm = await getRealm();
    const monthlyObjs = realm.objects<MonthlyPrayer>('MonthlyPrayer');
    // Sort by date ascending
    const sorted = monthlyObjs.sorted('date');
    DataManager.monthlyPrayerEntities = sorted.map(obj => ({ ...obj }));
  }

  static async loadAnnouncementEntities() {
    const realm = await getRealm();
    const announcements = realm.objects<Announcement>('Announcement');
    DataManager.announcementEntities = announcements.map(a => ({ ...a }));
  }

  // UPDATE
  // Clear old data and store new
  static async updateMonthlyAdhanStorage(prayers: FirebaseOneDayAdhanTimes[]) {
    // Clear
    await DataManager.clearMonthlyPrayerEntities();
    // Insert new
    for (const daily of prayers) {
      await DataManager.createMonthlyPrayerEntity(daily);
    }
    await DataManager.loadMonthlyPrayerEntities();
  }

  static async updateDailyPrayerStorage(prayers: FirebaseDailyPrayerTimes) {
    await DataManager.clearTodayPrayerEntities();

    // populate "fajrToday" etc. in-memory
    DataManager.fajrToday.adhan = prayers.fajr_adhan;
    DataManager.fajrToday.iqama = prayers.fajr_iqama;
    DataManager.dhuhrToday.adhan = prayers.dhuhr_adhan;
    DataManager.dhuhrToday.iqama = prayers.dhuhr_iqama;
    DataManager.asrToday.adhan = prayers.asr_adhan;
    DataManager.asrToday.iqama = prayers.asr_iqama;
    DataManager.maghribToday.adhan = prayers.maghrib_adhan;
    DataManager.maghribToday.iqama = prayers.maghrib_iqama;
    DataManager.ishaToday.adhan = prayers.isha_adhan;
    DataManager.ishaToday.iqama = prayers.isha_iqama;
    DataManager.jumaaToday.iqama = prayers.jumaa_salah;
    DataManager.khutbaToday.iqama = prayers.jumaa_khutba;

    const entity = await DataManager.createTodayPrayerEntity(prayers);
    DataManager.todayPrayerEntity = entity || null;
  }

  static async updateAnnouncementStorage(announcements: FirebaseAnnouncement) {
    await DataManager.clearAnnouncementEntities();
    DataManager.urlList = [];
    for (const url of announcements.urls) {
      DataManager.urlList.push(url);
    }
    DataManager.announcementEntities = await DataManager.createAnnouncementEntities(announcements);
  }

  // "Handle" functions for monthly/daily/announcements/hadith
  // replicate your "handleMonthly()", etc.
  static async handleMonthly(): Promise<void> {
    // If local data is empty OR the first date is not current month, we fetch from Firebase
    if (
      DataManager.monthlyPrayerEntities.length === 0 ||
      !TimeManager.isCurrentMonth(DataManager.monthlyPrayerEntities[0].date)
    ) {
      console.log('networking for monthly');
      const monthlyTimes = await FirebaseManager.fetchMonthlyAdhanTimes();
      await DataManager.updateMonthlyAdhanStorage(monthlyTimes);
    }
  }

  static async handleDaily(): Promise<void> {
    // If no local daily data or dateOfLastNetwork is old
    if (
      !DataManager.todayPrayerEntity ||
      !isSameDay(DataManager.dateOfLastNetwork, new Date())
    ) {
      console.log('Networking for today entities');
      const prayerTimes = await FirebaseManager.fetchTodayPrayerTimes();
      await DataManager.updateDailyPrayerStorage(prayerTimes);
    } else {
      // If we have local entity in realm, copy those values into in-memory prayers
      const e = DataManager.todayPrayerEntity;
      DataManager.fajrToday.adhan = e?.fajr_adhan ?? '22:22 AM';
      DataManager.fajrToday.iqama = e?.fajr_iqama ?? '22:22 AM';
      // etc. for each prayer
      DataManager.dhuhrToday.adhan = e?.dhuhr_adhan ?? '22:22 AM';
      DataManager.dhuhrToday.iqama = e?.dhuhr_iqama ?? '22:22 AM';
      DataManager.asrToday.adhan = e?.asr_adhan ?? '22:22 AM';
      DataManager.asrToday.iqama = e?.asr_iqama ?? '22:22 AM';
      DataManager.maghribToday.adhan = e?.maghrib_adhan ?? '22:22 AM';
      DataManager.maghribToday.iqama = e?.maghrib_iqama ?? '22:22 AM';
      DataManager.ishaToday.adhan = e?.isha_adhan ?? '22:22 AM';
      DataManager.ishaToday.iqama = e?.isha_iqama ?? '22:22 AM';
      DataManager.jumaaToday.iqama = e?.jumaa_salah ?? '22:22 AM';
      DataManager.khutbaToday.iqama = e?.jumaa_khutba ?? '22:22 AM';
    }
  }

  static async handleAnnouncements(): Promise<void> {
    if (
      DataManager.announcementEntities.length === 0 ||
      !isSameDay(DataManager.dateOfLastNetwork, new Date())
    ) {
      console.log('Networking for announcements');
      const announcements = await FirebaseManager.fetchAnnouncementImageURLs();
      await DataManager.updateAnnouncementStorage(announcements);
    } else {
      // we already have them in realm
      DataManager.urlList = [];
      for (const a of DataManager.announcementEntities) {
        if (a.url) DataManager.urlList.push(a.url);
      }
    }
    // fetch images in base64
    if (DataManager.urlList.length > 0) {
      const images = await FirebaseManager.fetchAnnouncementImages(DataManager.urlList);
      DataManager.urlImages.push(...images);
    }
  }

  static async handleHadith(): Promise<void> {
    // if dateOfLastNetwork is old, fetch a new hadithNumber
    if (!isSameDay(DataManager.dateOfLastNetwork, new Date())) {
      console.log('networking for hadith');
      const number = await FirebaseManager.fetchHadithNumber();
      await DataManager.setHadithNumber(number);
    }
  }

  // DELETE (clear)
  static async clearCoreData() {
    // Instead of clearing all Realm data, you can do the below:
    const realm = await getRealm();
    realm.write(() => {
      realm.deleteAll();
    });
    console.log('Successfully cleared all data in Realm.');
  }

  static async clearAnnouncementEntities() {
    const realm = await getRealm();
    realm.write(() => {
      const all = realm.objects<Announcement>('Announcement');
      realm.delete(all);
    });
    DataManager.announcementEntities = [];
  }

  static async clearMonthlyPrayerEntities() {
    const realm = await getRealm();
    realm.write(() => {
      const all = realm.objects<MonthlyPrayer>('MonthlyPrayer');
      realm.delete(all);
    });
    DataManager.monthlyPrayerEntities = [];
  }

  static async clearTodayPrayerEntities() {
    const realm = await getRealm();
    realm.write(() => {
      const all = realm.objects<TodayPrayer>('TodayPrayer');
      realm.delete(all);
    });
    DataManager.todayPrayerEntity = null;
  }

  // Example for clearing AsyncStorage (like clearUserDefaults)
  static async clearUserDefaults() {
    try {
      await AsyncStorage.clear();
      console.log('UserDefaults cleared from AsyncStorage.');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  }
}

// Helper for checking same day
function isSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}
