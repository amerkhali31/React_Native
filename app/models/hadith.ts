// src/models/hadith.ts

export interface APIResponse {
    status?: number;
    hadiths?: Hadiths;
  }
  
  export interface Hadiths {
    data?: Array<Hadith | null>;
  }
  
  export interface Hadith {
    hadithNumber?: string;
    englishNarrator?: string;
    hadithEnglish?: string;
    bookSlug?: string;
    volume?: string;
    status?: string;
    chapter?: Chapter;
  }
  
  export interface Chapter {
    chapterEnglish?: string;
  }
  