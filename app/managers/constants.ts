// app/managers/constants.ts

export const K = {
    FireStore: {
      Collections: {
        monthly_adhan_times: {
          collection_name: 'monthly_adhan_times',
          fields: {
            fajr: 'fajr',
            dhuhr: 'dhuhr',
            asr: 'asr',
            maghrib: 'maghrib',
            isha: 'isha',
            sunrise: 'sunrise',
            date: 'date',
          },
        },
        todays_prayer_times: {
          collection_name: 'todays_prayer_times',
          daily_prayer_times: {
            document_name: 'daily_prayer_times',
            fields: {
              fajr_adhan: 'fajr_adhan',
              fajr_iqama: 'fajr_iqama',
              dhuhr_adhan: 'dhuhr_adhan',
              // NOTE: In your Swift code, there’s a probable typo: 
              // you used `dhuhr_iqama = "asr_iqama"`. We assume that’s a bug. 
              // We'll correct it to 'dhuhr_iqama'.
              dhuhr_iqama: 'dhuhr_iqama',
              asr_adhan: 'asr_adhan',
              asr_iqama: 'asr_iqama',
              maghrib_adhan: 'maghrib_adhan',
              maghrib_iqama: 'maghrib_iqama',
              isha_adhan: 'isha_adhan',
              isha_iqama: 'isha_iqama',
              jumaa_khutba: 'jumaa_khutba',
              jumaa_salah: 'jumaa_salah',
            },
          },
        },
        hadiths: {
          collection_name: 'hadiths',
          hadith: {
            document_name: 'hadith',
            fields: {
              number: 'number',
            },
          },
        },
        announcements: {
          collection_name: 'announcements',
          announcements: {
            document_name: 'announcements',
            fields: {
              urls: 'urls',
            },
          },
        },
      },
    },
  
    DailyPrayerDisplayNames: {
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      jumaa_salah: 'Jumaa Salah',
      jumaa_khutba: 'Jumaa Khutba',
    },
  
    segues: {
      loadSeque: 'loaded',
      announceSegue: 'Announcements',
    },
  
    userDefaults: {
      lastNetworkDate: 'dateOfLastNetwork',
      userWantsNotitifications: 'userWantsNotifications',
  
      fajr_adhan_notification: 'fajr_adhan',
      dhuhr_adhan_notification: 'dhuhr_adhan',
      asr_adhan_notification: 'asr_adhan',
      maghrib_adhan_notification: 'maghrib_adhan',
      isha_adhan_notification: 'isha_adhan',
  
      fajr_iqama_notification: 'fajr_iqama',
      dhuhr_iqama_notification: 'dhuhr_iqama',
      asr_iqama_notification: 'asr_iqama',
      maghrib_iqama_notification: 'maghrib_iqama',
      isha_iqama_notification: 'isha_iqama',
  
      pushNoticeTest: 'pushTest',
      hadithNumber: 'hadithNumber',
    },
  
    images: {
      logo: 'magrImage',
      mosque: 'magr_mosque',
    },
  } as const;
  