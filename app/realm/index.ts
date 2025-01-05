// app/realm/index.ts
import Realm from 'realm';
import { TodayPrayerSchema } from './dailyPrayerSchema';
import { MonthlyPrayerSchema } from './monthlyPrayerSchema';
import { AnnouncementSchema } from './announcementSchema';

let realmInstance: Realm | null = null;

export async function getRealm(): Promise<Realm> {
  if (realmInstance) {
    return realmInstance;
  }
  realmInstance = await Realm.open({
    path: 'myrealm',
    schema: [TodayPrayerSchema, MonthlyPrayerSchema, AnnouncementSchema],
  });
  return realmInstance;
}
