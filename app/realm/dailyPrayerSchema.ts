// src/realm/dailyPrayerSchema.ts
import { ObjectSchema } from 'realm';
import Realm, { BSON } from 'realm';

export const TodayPrayerSchema: ObjectSchema = {
  name: 'TodayPrayer',   // like TodayPrayerEntity
  properties: {
    _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    fajr_adhan: 'string?',
    fajr_iqama: 'string?',
    dhuhr_adhan: 'string?',
    dhuhr_iqama: 'string?',
    asr_adhan: 'string?',
    asr_iqama: 'string?',
    maghrib_adhan: 'string?',
    maghrib_iqama: 'string?',
    isha_adhan: 'string?',
    isha_iqama: 'string?',
    jumaa_khutba: 'string?',
    jumaa_salah: 'string?',
    // Realm requires specifying optional vs required. 
    // The question mark after 'string' means it can be null/undefined.
  },
  primaryKey: '_id',
};
