// app/managers/dataManager.ts
// We'll fill this in later, but let's just create stubs
import { DailyPrayer } from '../models/dailyPrayer';

export class DataManager {
  // We'll assume these are static properties for now
  static fajrToday: DailyPrayer = { name: 'Fajr', adhan: '98:76 PM', iqama: '98:76 PM' };
  static dhuhrToday: DailyPrayer = { name: 'Dhuhr', adhan: '98:76 PM', iqama: '98:76 PM' };
  static asrToday: DailyPrayer = { name: 'Asr', adhan: '98:76 PM', iqama: '98:76 PM' };
  static maghribToday: DailyPrayer = { name: 'Maghrib', adhan: '98:76 PM', iqama: '98:76 PM' };
  static ishaToday: DailyPrayer = { name: 'Isha', adhan: '98:76 PM', iqama: '98:76 PM' };

  static currentPrayer: DailyPrayer = { name: 'Fajr', adhan: '98:76 PM', iqama: '98:76 PM' };
  static nextPrayer: DailyPrayer = { name: 'Dhuhr', adhan: '98:76 PM', iqama: '98:76 PM' };

  static hadithNumber: string = '1';

  // Example method
  static setDateOfLastNetwork(date: Date) {
    // We'll handle storing this to AsyncStorage or Realm eventually
    console.log('setDateOfLastNetwork:', date);
  }
}
