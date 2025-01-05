// app/realm/MonthlyPrayerSchema.ts
import { ObjectSchema } from 'realm';
import { BSON } from 'realm';

export const MonthlyPrayerSchema: ObjectSchema = {
  name: 'MonthlyPrayer',
  primaryKey: '_id',
  properties: {
    _id: { type: 'objectId', default: () => new BSON.ObjectId() },
    fajr: 'string?',
    dhuhr: 'string?',
    asr: 'string?',
    maghrib: 'string?',
    isha: 'string?',
    sunrise: 'string?',
    date: 'string?',  // 'yyyy-MM-dd'
  },
};