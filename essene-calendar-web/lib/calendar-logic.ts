// Core calendar logic for the Essene 364-day solar calendar

export interface EsseneDate {
  year: number
  month: number
  day: number
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  gregorianDate: Date
  isSpecialDay: boolean
  specialDayType?: 'sabbath' | 'festival' | 'tekufah'
  festivalName?: string
}

export interface Festival {
  name: string
  month: number
  day: number
  dayOfWeek: number
  description: string
  category: 'major' | 'special' | 'seasonal'
}

// Month structure: 8 months of 30 days, 4 months of 31 days
const MONTH_DAYS = [
  30, // Nisan
  30, // Iyyar
  31, // Sivan (includes Tekufah - Summer)
  30, // Tammuz
  30, // Av
  31, // Elul (includes Tekufah - Autumn)
  30, // Tishrei
  30, // Marcheshvan
  31, // Kislev (includes Tekufah - Winter)
  30, // Tevet
  30, // Shevat
  31, // Adar (includes Tekufah - Spring)
]

export const MONTH_NAMES = [
  'Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
  'Tishrei', 'Marcheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar'
]

export const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

// Festival definitions
export const FESTIVALS: Festival[] = [
  { name: 'Passover', month: 1, day: 14, dayOfWeek: 3, description: 'The Exodus from Egypt', category: 'major' },
  { name: 'Unleavened Bread (Last Day)', month: 1, day: 21, dayOfWeek: 3, description: 'End of Unleavened Bread', category: 'major' },
  { name: 'Shavuot (Feast of Weeks)', month: 3, day: 15, dayOfWeek: 0, description: 'Wheat Harvest Festival', category: 'special' },
  { name: 'Festival of New Wine', month: 5, day: 3, dayOfWeek: 0, description: 'New Wine Celebration', category: 'special' },
  { name: 'Festival of New Oil', month: 5, day: 22, dayOfWeek: 0, description: 'New Oil Celebration', category: 'special' },
  { name: 'Feast of Trumpets', month: 7, day: 1, dayOfWeek: 3, description: 'New Year', category: 'major' },
  { name: 'Yom Kippur', month: 7, day: 10, dayOfWeek: 5, description: 'Day of Atonement', category: 'special' },
  { name: 'Sukkot (Feast of Tabernacles)', month: 7, day: 15, dayOfWeek: 3, description: 'Feast of Booths', category: 'major' },
  { name: 'Last Day of Sukkot', month: 7, day: 22, dayOfWeek: 3, description: 'End of Tabernacles', category: 'major' },
]

// Seasonal transitions (Tekufah)
export const TEKUFAH_DAYS = [
  { month: 3, day: 31, season: 'Summer' },
  { month: 6, day: 31, season: 'Autumn' },
  { month: 9, day: 31, season: 'Winter' },
  { month: 12, day: 31, season: 'Spring' },
]

/**
 * Calculate the vernal equinox for a given Gregorian year
 * Approximate calculation - actual equinox varies
 */
export function getVernalEquinox(gregorianYear: number): Date {
  // Simplified calculation - March 20th approximation
  // In production, use more precise astronomical calculations
  return new Date(gregorianYear, 2, 20) // March 20
}

/**
 * Get the starting date of the Essene year
 * Always the first Wednesday on or after the Vernal Equinox
 */
export function getEsseneYearStart(gregorianYear: number): Date {
  const equinox = getVernalEquinox(gregorianYear)
  const dayOfWeek = equinox.getDay()
  
  // Find the next Wednesday (3)
  let daysToAdd = (3 - dayOfWeek + 7) % 7
  if (daysToAdd === 0 && dayOfWeek !== 3) {
    daysToAdd = 7
  }
  
  const yearStart = new Date(equinox)
  yearStart.setDate(equinox.getDate() + daysToAdd)
  return yearStart
}

/**
 * Convert Essene date to Gregorian
 */
export function esseneToGregorian(esseneYear: number, month: number, day: number): Date {
  // Approximate Gregorian year from Essene year (5000 AM ≈ 1760 CE)
  const gregorianYear = esseneYear - 3240
  const yearStart = getEsseneYearStart(gregorianYear)
  
  // Calculate days from start of year
  let daysFromStart = 0
  for (let m = 0; m < month - 1; m++) {
    daysFromStart += MONTH_DAYS[m]
  }
  daysFromStart += day - 1
  
  const result = new Date(yearStart)
  result.setDate(yearStart.getDate() + daysFromStart)
  return result
}

/**
 * Convert Gregorian date to Essene
 */
export function gregorianToEssene(date: Date): EsseneDate {
  const year = date.getFullYear()
  const yearStart = getEsseneYearStart(year)
  
  // Calculate days since year start
  const daysSinceStart = Math.floor((date.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysSinceStart < 0 || daysSinceStart >= 364) {
    // Date is outside current Essene year, try adjacent year
    const prevYearStart = getEsseneYearStart(year - 1)
    const nextYearStart = getEsseneYearStart(year + 1)
    
    if (date < yearStart) {
      return gregorianToEssene(new Date(prevYearStart.getTime() + daysSinceStart * 24 * 60 * 60 * 1000))
    } else {
      return gregorianToEssene(new Date(nextYearStart.getTime() + daysSinceStart * 24 * 60 * 60 * 1000))
    }
  }
  
  // Find month and day
  let remainingDays = daysSinceStart
  let month = 1
  
  for (let i = 0; i < MONTH_DAYS.length; i++) {
    if (remainingDays < MONTH_DAYS[i]) {
      month = i + 1
      break
    }
    remainingDays -= MONTH_DAYS[i]
  }
  
  const day = remainingDays + 1
  const esseneYear = year + 3240 // Approximate Essene year
  
  // Check for special days
  const dayOfWeek = date.getDay()
  const isSabbath = dayOfWeek === 6
  const festival = FESTIVALS.find(f => f.month === month && f.day === day)
  const tekufah = TEKUFAH_DAYS.find(t => t.month === month && t.day === day)
  
  return {
    year: esseneYear,
    month,
    day,
    dayOfWeek,
    gregorianDate: date,
    isSpecialDay: isSabbath || !!festival || !!tekufah,
    specialDayType: festival ? 'festival' : tekufah ? 'tekufah' : isSabbath ? 'sabbath' : undefined,
    festivalName: festival?.name || (tekufah ? `${tekufah.season} Transition` : undefined)
  }
}

/**
 * Get calendar month data
 */
export function getMonthData(esseneYear: number, month: number): EsseneDate[] {
  const days: EsseneDate[] = []
  const daysInMonth = MONTH_DAYS[month - 1]
  
  for (let day = 1; day <= daysInMonth; day++) {
    const gregorianDate = esseneToGregorian(esseneYear, month, day)
    const esseneDate = gregorianToEssene(gregorianDate)
    days.push(esseneDate)
  }
  
  return days
}

/**
 * Get today's Essene date
 */
export function getToday(): EsseneDate {
  return gregorianToEssene(new Date())
}

/**
 * Format Essene date as string
 */
export function formatEsseneDate(date: EsseneDate): string {
  return `${MONTH_NAMES[date.month - 1]} ${date.day}, ${date.year} AM`
}
