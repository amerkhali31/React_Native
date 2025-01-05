// src/realm/monthlyPrayerSchema.ts
import { ObjectSchema } from 'realm';
import Realm, { BSON } from 'realm';

export const MonthlyPrayerSchema: ObjectSchema = {
  name: 'MonthlyPrayer',  // like MonthlyPrayerEntity
  properties: {
    _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    fajr: 'string?',
    dhuhr: 'string?',
    asr: 'string?',
    maghrib: 'string?',
    isha: 'string?',
    sunrise: 'string?',
    date: 'string?',
  },
  primaryKey: '_id',
};
