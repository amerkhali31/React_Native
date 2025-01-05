// app/managers/prayerManager.ts
import { K } from './constants';
import { DataManager } from './dataManager';
import { TimeManager } from './timeManager';
import { DailyPrayer } from '../models/dailyPrayer';

export class PrayerManager {
  private constructor() {}

  static findCurrentPrayer(): DailyPrayer {
    // We'll create a temp object with prayerName -> adhanTimeInSeconds
    const tempPrayerTimes: Record<string, number> = {};

    tempPrayerTimes[K.DailyPrayerDisplayNames.fajr] =
      TimeManager.convertTimeToSeconds(DataManager.fajrToday.adhan);
    tempPrayerTimes[K.DailyPrayerDisplayNames.dhuhr] =
      TimeManager.convertTimeToSeconds(DataManager.dhuhrToday.adhan);
    tempPrayerTimes[K.DailyPrayerDisplayNames.asr] =
      TimeManager.convertTimeToSeconds(DataManager.asrToday.adhan);
    tempPrayerTimes[K.DailyPrayerDisplayNames.maghrib] =
      TimeManager.convertTimeToSeconds(DataManager.maghribToday.adhan);
    tempPrayerTimes[K.DailyPrayerDisplayNames.isha] =
      TimeManager.convertTimeToSeconds(DataManager.ishaToday.adhan);

    const currentTime = TimeManager.getCurrentTimeAsSecondsFromMidnight();

    if (
      currentTime > tempPrayerTimes[K.DailyPrayerDisplayNames.isha] ||
      currentTime < tempPrayerTimes[K.DailyPrayerDisplayNames.fajr]
    ) {
      return DataManager.ishaToday;
    } else if (currentTime > tempPrayerTimes[K.DailyPrayerDisplayNames.maghrib]) {
      return DataManager.maghribToday;
    } else if (currentTime > tempPrayerTimes[K.DailyPrayerDisplayNames.asr]) {
      return DataManager.asrToday;
    } else if (currentTime > tempPrayerTimes[K.DailyPrayerDisplayNames.dhuhr]) {
      return DataManager.dhuhrToday;
    } else {
      return DataManager.fajrToday;
    }
  }

  static getNextPrayer(): DailyPrayer {
    switch (DataManager.currentPrayer.name) {
      case K.DailyPrayerDisplayNames.fajr:
        return DataManager.dhuhrToday;
      case K.DailyPrayerDisplayNames.dhuhr:
        return DataManager.asrToday;
      case K.DailyPrayerDisplayNames.asr:
        return DataManager.maghribToday;
      case K.DailyPrayerDisplayNames.maghrib:
        return DataManager.ishaToday;
      case K.DailyPrayerDisplayNames.isha:
        return DataManager.fajrToday;
      default:
        return DataManager.fajrToday;
    }
  }

  static getTimeUntilNextPrayer(): number {
    const currentPrayer = DataManager.currentPrayer;
    const nextPrayer = DataManager.nextPrayer;

    // If it's Isha and current time is past nextPrayer.adhan that same day, add 24 hours
    if (
      currentPrayer.name === K.DailyPrayerDisplayNames.isha &&
      TimeManager.getCurrentTimeAsSecondsFromMidnight() >
        TimeManager.convertTimeToSeconds(nextPrayer.adhan)
    ) {
      return (
        TimeManager.convertTimeToSeconds(nextPrayer.adhan) +
        24 * 3600 -
        TimeManager.getCurrentTimeAsSecondsFromMidnight()
      );
    } else {
      return (
        TimeManager.convertTimeToSeconds(nextPrayer.adhan) -
        TimeManager.getCurrentTimeAsSecondsFromMidnight()
      );
    }
  }
}
