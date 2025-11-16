// Essene 364-Day Calendar Data Structure

export interface Festival {
  id: string;
  name: string;
  hebrewName?: string;
  month: number;
  day: number;
  type: 'major' | 'minor' | 'sabbath' | 'prophetic';
  description: string;
  biblicalReference?: string;
  significance: string;
  color: string;
}

export interface Month {
  number: number;
  name: string;
  hebrewName: string;
  days: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface PropheticMarker {
  id: string;
  name: string;
  year: number | string;
  description: string;
  category: 'creation' | 'patriarchs' | 'exodus' | 'temple' | 'exile' | 'teacher' | 'eschaton';
}

// The 12 months of the Essene calendar
export const MONTHS: Month[] = [
  { number: 1, name: 'Nisan', hebrewName: 'נִיסָן', days: 31, season: 'spring' },
  { number: 2, name: 'Iyar', hebrewName: 'אִיָּר', days: 30, season: 'spring' },
  { number: 3, name: 'Sivan', hebrewName: 'סִיוָן', days: 30, season: 'spring' },
  { number: 4, name: 'Tammuz', hebrewName: 'תַּמּוּז', days: 31, season: 'summer' },
  { number: 5, name: 'Av', hebrewName: 'אָב', days: 30, season: 'summer' },
  { number: 6, name: 'Elul', hebrewName: 'אֱלוּל', days: 30, season: 'summer' },
  { number: 7, name: 'Tishri', hebrewName: 'תִּשְׁרֵי', days: 31, season: 'autumn' },
  { number: 8, name: 'Cheshvan', hebrewName: 'חֶשְׁוָן', days: 30, season: 'autumn' },
  { number: 9, name: 'Kislev', hebrewName: 'כִּסְלֵו', days: 30, season: 'autumn' },
  { number: 10, name: 'Tevet', hebrewName: 'טֵבֵת', days: 31, season: 'winter' },
  { number: 11, name: 'Shevat', hebrewName: 'שְׁבָט', days: 30, season: 'winter' },
  { number: 12, name: 'Adar', hebrewName: 'אֲדָר', days: 30, season: 'winter' },
];

// Major festivals and holy days
export const FESTIVALS: Festival[] = [
  // Spring Festivals (Month 1)
  {
    id: 'passover',
    name: 'Passover',
    hebrewName: 'פֶּסַח',
    month: 1,
    day: 14,
    type: 'major',
    description: 'Commemoration of the Exodus from Egypt. Always falls on Tuesday evening.',
    biblicalReference: 'Exodus 12:1-14, Leviticus 23:5',
    significance: 'Prototype of final redemption; liberation from bondage',
    color: 'oklch(0.72 0.15 70)', // Gold
  },
  {
    id: 'unleavened-bread',
    name: 'Feast of Unleavened Bread',
    hebrewName: 'חַג הַמַּצּוֹת',
    month: 1,
    day: 15,
    type: 'major',
    description: 'Seven-day festival beginning on 15th Nisan. First day always falls on Wednesday.',
    biblicalReference: 'Exodus 12:15-20, Leviticus 23:6-8',
    significance: 'Purification from sin; removal of leaven symbolizes removing evil',
    color: 'oklch(0.72 0.15 70)',
  },
  {
    id: 'omer-offering',
    name: 'Omer Offering',
    hebrewName: 'עֹמֶר',
    month: 1,
    day: 26,
    type: 'major',
    description: 'First sheaf offering, always on Sunday. Begins the count to Shavuot.',
    biblicalReference: 'Leviticus 23:10-11',
    significance: 'First fruits of barley harvest; beginning of counting toward Pentecost',
    color: 'oklch(0.72 0.15 70)',
  },
  
  // Spring Equinox
  {
    id: 'spring-equinox',
    name: 'Spring Equinox (Tekufah)',
    month: 1,
    day: 1,
    type: 'prophetic',
    description: 'Beginning of the year, marking the spring equinox.',
    significance: 'Cosmic renewal; alignment with celestial order',
    color: 'oklch(0.60 0.14 280)', // Purple
  },
  
  // Three Shavuot Festivals
  {
    id: 'wheat-shavuot',
    name: 'Festival of New Wheat (Shavuot)',
    hebrewName: 'שָׁבוּעוֹת',
    month: 3,
    day: 15,
    type: 'major',
    description: 'Pentecost - 50 days from Omer. Always on Sunday. Celebration of wheat harvest.',
    biblicalReference: 'Leviticus 23:15-21, Numbers 28:26',
    significance: 'Giving of the Law at Sinai; covenant renewal; first fruits of grain',
    color: 'oklch(0.72 0.15 70)',
  },
  {
    id: 'wine-shavuot',
    name: 'Festival of New Wine',
    hebrewName: 'חַג הַיַּיִן',
    month: 5,
    day: 3,
    type: 'major',
    description: '50 days after Wheat Festival. Always on Sunday. Celebration of wine harvest.',
    biblicalReference: 'Temple Scroll, Numbers 18:12',
    significance: 'Covenant renewal; spiritual intoxication with divine presence',
    color: 'oklch(0.60 0.12 160)', // Teal
  },
  {
    id: 'oil-shavuot',
    name: 'Festival of New Oil',
    hebrewName: 'חַג הַשֶּׁמֶן',
    month: 6,
    day: 22,
    type: 'major',
    description: '50 days after Wine Festival. Always on Sunday. Celebration of olive oil harvest.',
    biblicalReference: 'Temple Scroll, Numbers 18:12',
    significance: 'Anointing; priestly consecration; completion of harvest cycle',
    color: 'oklch(0.60 0.12 160)',
  },
  
  // Summer Solstice
  {
    id: 'summer-solstice',
    name: 'Summer Solstice (Tekufah)',
    month: 4,
    day: 1,
    type: 'prophetic',
    description: 'Beginning of summer season.',
    significance: 'Cosmic transition; height of solar power',
    color: 'oklch(0.60 0.14 280)',
  },
  
  // Autumn Festivals (Month 7)
  {
    id: 'trumpets',
    name: 'Day of Remembrance (Trumpets)',
    hebrewName: 'יוֹם תְּרוּעָה',
    month: 7,
    day: 1,
    type: 'major',
    description: 'New Year for civil calendar. Always on Wednesday. Day of trumpet blasts.',
    biblicalReference: 'Leviticus 23:23-25, Numbers 29:1-6',
    significance: 'Announcement of judgment; awakening call; memorial before God',
    color: 'oklch(0.72 0.15 70)',
  },
  {
    id: 'atonement',
    name: 'Day of Atonement',
    hebrewName: 'יוֹם כִּפּוּר',
    month: 7,
    day: 10,
    type: 'major',
    description: 'Holiest day of the year. Always on Friday. Day of fasting and atonement.',
    biblicalReference: 'Leviticus 16, 23:26-32',
    significance: 'Final purification; atonement for sins; entry into Holy of Holies',
    color: 'oklch(0.72 0.15 70)',
  },
  {
    id: 'tabernacles',
    name: 'Feast of Tabernacles (Sukkot)',
    hebrewName: 'סֻכּוֹת',
    month: 7,
    day: 15,
    type: 'major',
    description: 'Seven-day festival. First day always on Wednesday. Dwelling in booths.',
    biblicalReference: 'Leviticus 23:33-43',
    significance: 'Messianic kingdom; dwelling with God; harvest thanksgiving',
    color: 'oklch(0.72 0.15 70)',
  },
  {
    id: 'eighth-day',
    name: 'Eighth Day Assembly',
    hebrewName: 'שְׁמִינִי עֲצֶרֶת',
    month: 7,
    day: 22,
    type: 'major',
    description: 'Solemn assembly concluding festival season. Always on Wednesday.',
    biblicalReference: 'Leviticus 23:36, Numbers 29:35-38',
    significance: 'Eternal age beyond time; completion of sacred cycle',
    color: 'oklch(0.72 0.15 70)',
  },
  
  // Autumn Equinox
  {
    id: 'autumn-equinox',
    name: 'Autumn Equinox (Tekufah)',
    month: 7,
    day: 1,
    type: 'prophetic',
    description: 'Beginning of autumn season, coinciding with Day of Remembrance.',
    significance: 'Cosmic balance; transition to judgment season',
    color: 'oklch(0.60 0.14 280)',
  },
  
  // Winter Solstice
  {
    id: 'winter-solstice',
    name: 'Winter Solstice (Tekufah)',
    month: 10,
    day: 1,
    type: 'prophetic',
    description: 'Beginning of winter season.',
    significance: 'Cosmic darkness before renewal; depth of winter',
    color: 'oklch(0.60 0.14 280)',
  },
];

// Prophetic timeline markers
export const PROPHETIC_TIMELINE: PropheticMarker[] = [
  {
    id: 'creation',
    name: 'Creation',
    year: 'Beginning',
    description: 'God establishes cosmic order with perfect 364-day calendar',
    category: 'creation',
  },
  {
    id: 'enoch',
    name: 'Enoch Receives Heavenly Calendar',
    year: 'Antediluvian',
    description: 'Enoch translated to heaven, receives revelation of true calendar',
    category: 'patriarchs',
  },
  {
    id: 'abraham',
    name: 'Abrahamic Covenant',
    year: '~2000 BCE',
    description: 'God establishes covenant with Abraham, founding Israel',
    category: 'patriarchs',
  },
  {
    id: 'exodus',
    name: 'Exodus and Sinai',
    year: '~1500 BCE',
    description: 'Liberation from Egypt, giving of Law and festival calendar at Sinai',
    category: 'exodus',
  },
  {
    id: 'first-temple',
    name: 'First Temple Built',
    year: '~960 BCE',
    description: 'Solomon builds Temple, establishing earthly reflection of heavenly sanctuary',
    category: 'temple',
  },
  {
    id: 'exile-begins',
    name: 'Babylonian Exile Begins',
    year: '586 BCE',
    description: 'First Temple destroyed, Era of Wrath begins (390 years)',
    category: 'exile',
  },
  {
    id: 'cyrus-decree',
    name: 'Cyrus Decree',
    year: '538 BCE',
    description: 'Persian king allows return to Jerusalem, Daniel\'s 490-year prophecy begins',
    category: 'exile',
  },
  {
    id: 'second-temple',
    name: 'Second Temple Completed',
    year: '516 BCE',
    description: 'Temple rebuilt, but corruption begins to set in',
    category: 'temple',
  },
  {
    id: 'abomination',
    name: 'Abomination of Desolation',
    year: '167 BCE',
    description: 'Antiochus IV Epiphanes defiles Temple, placing statue of Zeus',
    category: 'exile',
  },
  {
    id: 'era-wrath-ends',
    name: 'Era of Wrath Ends',
    year: '~196 BCE',
    description: '390 years after exile, "root of planting" begins to grow',
    category: 'exile',
  },
  {
    id: 'teacher-rises',
    name: 'Teacher of Righteousness Emerges',
    year: '~176 BCE',
    description: 'God raises up Teacher to reveal true calendar and Law interpretation',
    category: 'teacher',
  },
  {
    id: 'qumran-founded',
    name: 'Yahad Community Founded',
    year: '~150 BCE',
    description: 'Teacher leads community to wilderness, establishing Qumran settlement',
    category: 'teacher',
  },
  {
    id: 'pompey',
    name: 'Pompey Conquers Jerusalem',
    year: '63 BCE',
    description: 'Roman occupation begins, fulfilling prophecies of foreign domination',
    category: 'exile',
  },
  {
    id: 'temple-destroyed',
    name: 'Second Temple Destroyed',
    year: '70 CE',
    description: 'Romans destroy Temple, fulfilling Daniel\'s prophecy',
    category: 'eschaton',
  },
  {
    id: 'day-of-yhwh',
    name: 'Day of YHWH',
    year: 'Future',
    description: 'Final judgment, destruction of wicked, vindication of righteous',
    category: 'eschaton',
  },
  {
    id: 'new-creation',
    name: 'Age to Come',
    year: 'Eternal',
    description: 'New Jerusalem, restored Temple, perfect observance of sacred calendar',
    category: 'eschaton',
  },
];

// Helper functions
export function getDaysInMonth(month: number): number {
  const monthData = MONTHS.find(m => m.number === month);
  return monthData?.days || 30;
}

export function getMonthName(month: number): string {
  const monthData = MONTHS.find(m => m.number === month);
  return monthData?.name || '';
}

export function getFestivalsForMonth(month: number): Festival[] {
  return FESTIVALS.filter(f => f.month === month);
}

export function getFestivalForDate(month: number, day: number): Festival | undefined {
  return FESTIVALS.find(f => f.month === month && f.day === day);
}

export function isSabbath(month: number, day: number): boolean {
  // Calculate day of week based on 364-day calendar
  // Day 1 of Month 1 is Wednesday (day 4 of week)
  // Sabbath is Saturday (day 7 of week)
  
  let totalDays = 0;
  for (let m = 1; m < month; m++) {
    totalDays += getDaysInMonth(m);
  }
  totalDays += day;
  
  // Day 1 of year is Wednesday (4th day), so Sabbath starts on day 4
  const dayOfWeek = ((totalDays + 2) % 7) + 1; // Adjust so 1=Sunday, 7=Saturday
  return dayOfWeek === 7;
}

export function getDayOfWeek(month: number, day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let totalDays = 0;
  for (let m = 1; m < month; m++) {
    totalDays += getDaysInMonth(m);
  }
  totalDays += day;
  
  const dayOfWeek = ((totalDays + 2) % 7); // Day 1 of year is Wednesday (index 3)
  return days[dayOfWeek];
}

// Calculate total days in year
export const TOTAL_DAYS = 364;
export const TOTAL_WEEKS = 52;
export const DAYS_PER_SEASON = 91;
