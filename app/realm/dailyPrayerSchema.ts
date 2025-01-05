// app/realm/TodayPrayerSchema.ts
import { ObjectSchema } from 'realm';
import { BSON } from 'realm';

export const TodayPrayerSchema: ObjectSchema = {
  name: 'TodayPrayer',
  primaryKey: '_id',
  properties: {
    _id: { type: 'objectId', default: () => new BSON.ObjectId() },
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
  },
};