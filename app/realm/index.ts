// src/realm/index.ts
import Realm from 'realm';
import { TodayPrayerSchema } from './dailyPrayerSchema';
import { MonthlyPrayerSchema } from './monthlyPrayerSchema';
import { AnnouncementSchema } from './announcementSchema';

export const getRealm = async (): Promise<Realm> => {
  return Realm.open({
    path: 'myrealm',     // or any path you prefer
    schema: [
      TodayPrayerSchema,
      MonthlyPrayerSchema,
      AnnouncementSchema,
      // ...any other schemas
    ],
  });
};
