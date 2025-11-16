// Gregorian Calendar Converter for Essene Calendar

export interface EsseneDate {
  month: number;
  day: number;
  year: number; // Years since a reference point
}

export interface GregorianDate {
  month: number;
  day: number;
  year: number;
}

export interface DriftData {
  esseneYear: number;
  cumulativeDrift: number; // Days drifted from solar year
  seasonalShift: string;
  equinoxDate: string;
}

// Reference: Essene calendar year 1 = 364 days
// Solar year = 365.2422 days
// Annual drift = 1.2422 days per year

const ESSENE_YEAR_DAYS = 364;
const SOLAR_YEAR_DAYS = 365.2422;
const ANNUAL_DRIFT = SOLAR_YEAR_DAYS - ESSENE_YEAR_DAYS; // 1.2422 days

// Month names for display
export const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const ESSENE_MONTHS = [
  'Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
  'Tishri', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar'
];

/**
 * Calculate cumulative drift after a given number of years
 */
export function calculateDrift(years: number): number {
  return years * ANNUAL_DRIFT;
}

/**
 * Calculate how many days the calendar has drifted from the spring equinox
 */
export function calculateSeasonalDrift(years: number): DriftData {
  const cumulativeDrift = calculateDrift(years);
  const driftDays = Math.floor(cumulativeDrift);
  const driftHours = (cumulativeDrift % 1) * 24;
  
  // Determine seasonal shift description
  let seasonalShift = '';
  if (driftDays < 30) {
    seasonalShift = `${driftDays} days earlier`;
  } else if (driftDays < 90) {
    seasonalShift = `~${Math.floor(driftDays / 30)} months earlier`;
  } else {
    seasonalShift = `~${Math.floor(driftDays / 91)} seasons earlier`;
  }
  
  // Calculate when spring equinox would occur in Essene calendar
  const equinoxShift = driftDays % 364;
  const equinoxMonth = Math.floor(equinoxShift / 30) + 1;
  const equinoxDay = (equinoxShift % 30) + 1;
  
  return {
    esseneYear: years,
    cumulativeDrift,
    seasonalShift,
    equinoxDate: `${ESSENE_MONTHS[equinoxMonth - 1]} ${equinoxDay}`
  };
}

/**
 * Convert Essene calendar date to approximate Gregorian date
 * Assumes Essene Year 1 starts at spring equinox (March 20/21)
 */
export function esseneToGregorian(
  esseneMonth: number,
  esseneDay: number,
  esseneYear: number,
  baseGregorianYear: number = 150 // Default: ~150 BCE when Qumran was founded
): GregorianDate {
  // Calculate total days from start of Essene calendar
  let totalEsseneDays = 0;
  
  // Add complete years
  totalEsseneDays += (esseneYear - 1) * ESSENE_YEAR_DAYS;
  
  // Add days from current year
  const monthDays = [31, 30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30];
  for (let m = 0; m < esseneMonth - 1; m++) {
    totalEsseneDays += monthDays[m];
  }
  totalEsseneDays += esseneDay;
  
  // Convert to Gregorian (accounting for drift)
  // Start from spring equinox (approximately March 20)
  const baseDate = new Date(baseGregorianYear, 2, 20); // March 20
  const gregorianDate = new Date(baseDate.getTime() + totalEsseneDays * 24 * 60 * 60 * 1000);
  
  return {
    month: gregorianDate.getMonth() + 1,
    day: gregorianDate.getDate(),
    year: gregorianDate.getFullYear()
  };
}

/**
 * Calculate drift over a range of years for visualization
 */
export function calculateDriftOverTime(startYear: number, endYear: number): DriftData[] {
  const driftData: DriftData[] = [];
  
  for (let year = startYear; year <= endYear; year += 10) {
    driftData.push(calculateSeasonalDrift(year));
  }
  
  return driftData;
}

/**
 * Format Gregorian date for display
 */
export function formatGregorianDate(date: GregorianDate): string {
  return `${GREGORIAN_MONTHS[date.month - 1]} ${date.day}, ${date.year}`;
}

/**
 * Format Essene date for display
 */
export function formatEsseneDate(month: number, day: number, year: number): string {
  return `${ESSENE_MONTHS[month - 1]} ${day}, Year ${year}`;
}

/**
 * Get days in Gregorian month
 */
export function getDaysInGregorianMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Check if Gregorian year is leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Calculate correction needed to realign with equinox
 */
export function calculateEquinoxCorrection(years: number): {
  daysToAdd: number;
  description: string;
} {
  const drift = calculateDrift(years);
  const daysToAdd = Math.round(drift);
  
  let description = '';
  if (daysToAdd === 0) {
    description = 'No correction needed';
  } else if (daysToAdd === 1) {
    description = 'Add 1 day to realign with spring equinox';
  } else {
    description = `Add ${daysToAdd} days to realign with spring equinox`;
  }
  
  return { daysToAdd, description };
}

/**
 * Theoretical correction mechanism using spring equinox observation
 */
export function getEquinoxCorrectionStrategy(): string {
  return `The Essenes may have used the spring equinox as a natural correction mechanism. 
By observing when the actual equinox occurred and adjusting the calendar start accordingly, 
they could maintain approximate seasonal alignment without a formal intercalation system. 
This would require astronomical observation and periodic adjustment of 1-2 days every few years.`;
}

/**
 * Calculate when major festivals would occur in Gregorian calendar
 */
export interface FestivalGregorianDate {
  festivalName: string;
  esseneDate: string;
  gregorianDate: string;
  drift: number;
}

export function calculateFestivalDrift(year: number, baseGregorianYear: number = 150): FestivalGregorianDate[] {
  const festivals = [
    { name: 'Passover', month: 1, day: 14 },
    { name: 'Wheat Shavuot', month: 3, day: 15 },
    { name: 'Wine Shavuot', month: 5, day: 3 },
    { name: 'Oil Shavuot', month: 6, day: 22 },
    { name: 'Day of Atonement', month: 7, day: 10 },
    { name: 'Tabernacles', month: 7, day: 15 },
  ];
  
  return festivals.map(festival => {
    const gregorian = esseneToGregorian(festival.month, festival.day, year, baseGregorianYear);
    const drift = calculateDrift(year);
    
    return {
      festivalName: festival.name,
      esseneDate: formatEsseneDate(festival.month, festival.day, year),
      gregorianDate: formatGregorianDate(gregorian),
      drift: Math.round(drift)
    };
  });
}
