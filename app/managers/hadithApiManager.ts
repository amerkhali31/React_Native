// app/managers/hadithApiManager.ts
import { APIResponse } from '../models/hadith';
import { DataManager } from './dataManager';

export class HadithApiManager {
  private static baseUrl = 'https://www.hadithapi.com/api/hadiths';
  private static book = 'sahih-bukhari';
  // We'll fetch from DataManager.hadithNumber
  // If we need a "PrivateKeys" approach, just inline for now or store in .env
  private static apikey = 'YOUR_HADITH_API_KEY';

  private constructor() {}

  static async fetchHadiths(): Promise<APIResponse | null> {
    const hadithNumber = DataManager.hadithNumber; 
    const urlString = `${this.baseUrl}?apiKey=${this.apikey}&book=${this.book}&hadithNumber=${hadithNumber}`;

    try {
      const response = await fetch(urlString);
      const data = await response.json();
      // data will be shaped like APIResponse
      return data as APIResponse;
    } catch (error) {
      console.log('Error fetching hadiths:', error);
      return null;
    }
  }
}
