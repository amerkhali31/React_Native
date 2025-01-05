// app/managers/timeManager.ts

export class TimeManager {
    private constructor() {}
  
    // get today's date in yyyy-MM-dd
    static getTodaysDate(): string {
      const now = new Date();
      // Format as yyyy-MM-dd
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    // We can't replicate getMonthofAdhan([MonthlyPrayerEntity]) exactly,
    // because that used Core Data entities. 
    // In React Native, we'd do something else or rely on Realm.
    // We'll omit or adapt as needed.
  
    // Return number of current month as a string
    static getCurrentMonth(): string {
      return String(new Date().getMonth() + 1);
    }
  
    // Get day of month
    static getDayOfMonth(): number {
      return new Date().getDate();
    }
  
    // get month name from a yyyy-MM-dd
    static getMonthName(dateString: string): string {
      // We'll parse and then format
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      // Format month name
      return date.toLocaleString('en-US', { month: 'long' });
    }
  
    // Convert date in yyyy-MM-dd to "MMMM dth, yyyy" style
    static formatDateToReadable(dateString: string, includeYear: boolean): string | null {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
  
      const day = date.getDate();
      const year = date.getFullYear();
  
      // Suffix logic
      let suffix = 'th';
      if (![11, 12, 13].includes(day)) {
        switch (day % 10) {
          case 1:
            suffix = 'st';
            break;
          case 2:
            suffix = 'nd';
            break;
          case 3:
            suffix = 'rd';
            break;
          default:
            suffix = 'th';
        }
      }
  
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      let formattedDate = `${monthName} ${day}${suffix}`;
      if (includeYear) {
        formattedDate += `, ${year}`;
      }
      return formattedDate;
    }
  
    // Convert 12hr time string (e.g. "1:23 PM") to seconds from midnight
    static convertTimeToSeconds(timeString: string): number {
      // e.g. "1:23:45 PM" or "1:23 PM"
      const parts = timeString.split(' ');
      if (parts.length !== 2) return 0;
  
      const timePart = parts[0]; // e.g. "1:23" or "1:23:45"
      const ampm = parts[1];    // "AM" or "PM"
  
      const timeSegments = timePart.split(':'); // ["1", "23", "45?"]
  
      let hours = parseInt(timeSegments[0]) || 0;
      let minutes = parseInt(timeSegments[1]) || 0;
      let seconds = 0;
  
      if (timeSegments.length === 3) {
        seconds = parseInt(timeSegments[2]) || 0;
      }
  
      // convert to 24-hr
      if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }
  
      return hours * 3600 + minutes * 60 + seconds;
    }
  
    static getCurrentTimeAsSecondsFromMidnight(): number {
      // current local time
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      return hours * 3600 + mins * 60 + secs;
    }
  
    // Convert a Gregorian date to Islamic date string (approx)
    // We'll do a partial approach. 
    // Typically, you'd use a library like "moment-hijri" or "hijri-date".
    static convertToIslamicDate(gregorianDate: Date): string | null {
      // We'll skip a true conversion (requires a specialized library).
      // For demonstration, let's return a placeholder or approximate.
      // If you do want to do a real conversion, consider installing a library:
      // npm install moment-hijri
      try {
        // This is a simplified approach. 
        // Real usage: moment(gregorianDate).format('iYYYY/iM/iD')
        return 'Islamic date not fully implemented';
      } catch {
        return null;
      }
    }
  
    // Convert seconds to hours:minutes:seconds
    static convertSecondsToTime(totalSeconds: number): { hours: number; minutes: number; seconds: number } {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { hours, minutes, seconds };
    }
  
    // createDateFromTime("1:23 PM") => Date object for today at 1:23 PM
    static createDateFromTime(timeString: string): Date | null {
      const now = new Date();
      // parse time
      const parts = timeString.split(' ');
      if (parts.length < 2) return null;
  
      const [hhmm, ampm] = parts;
      const [hh, mm] = hhmm.split(':');
      let hours = parseInt(hh) || 0;
      const minutes = parseInt(mm) || 0;
  
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
  
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
      return date;
    }
  
    // createDateFromDateAndTime("1:23 PM","2024-11-09") => Date
    static createDateFromDateAndTime(timeString: string, dateString: string): Date | null {
      const dateObj = TimeManager.createDateFromTime(timeString);
      if (!dateObj) return null;
  
      const targetDate = new Date(dateString);
      if (isNaN(targetDate.getTime())) return null;
  
      // Replace the year/month/day of dateObj with targetDate’s
      dateObj.setFullYear(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      return dateObj;
    }
  
    // isCurrentMonth("2024-01-04") => boolean
    static isCurrentMonth(dateString?: string): boolean {
      if (!dateString) return false;
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return false;
  
      const now = new Date();
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    }
  }
  