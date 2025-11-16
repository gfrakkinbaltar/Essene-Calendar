// Priestly Course (Mishmarot) Data Structure and Utilities
// Based on 1 Chronicles 24:7-19 and Dead Sea Scrolls Temple Scroll

export interface PriestlyCourse {
  number: number;
  name: string;
  hebrewName: string;
  patriarch: string;
  biblicalReference: string;
  description: string;
  color: string;
}

export interface WeeklyRotation {
  week: number;
  month: number;
  monthName: string;
  startDay: number;
  endDay: number;
  courseNumber: number;
  courseName: string;
  hebrewName: string;
  patriarch: string;
  specialObservance?: string;
}

// The 24 Priestly Courses (Mishmarot) from 1 Chronicles 24:7-19
export const PRIESTLY_COURSES: PriestlyCourse[] = [
  {
    number: 1,
    name: "Jehoiarib",
    hebrewName: "יְהוֹיָרִיב",
    patriarch: "Jehoiarib",
    biblicalReference: "1 Chronicles 24:7",
    description: "First course, served as chief priest in the Second Temple period",
    color: "#D4A574"
  },
  {
    number: 2,
    name: "Jedaiah",
    hebrewName: "יְדַיָּה",
    patriarch: "Jedaiah",
    biblicalReference: "1 Chronicles 24:7",
    description: "Second course, prominent in priestly hierarchy",
    color: "#C9956F"
  },
  {
    number: 3,
    name: "Harim",
    hebrewName: "חָרִם",
    patriarch: "Harim",
    biblicalReference: "1 Chronicles 24:8",
    description: "Third course, returned from Babylonian exile",
    color: "#BE886A"
  },
  {
    number: 4,
    name: "Seorim",
    hebrewName: "שְׂעוֹרִים",
    patriarch: "Seorim",
    biblicalReference: "1 Chronicles 24:8",
    description: "Fourth course, meaning 'barley'",
    color: "#B37B65"
  },
  {
    number: 5,
    name: "Malchijah",
    hebrewName: "מַלְכִּיָּה",
    patriarch: "Malchijah",
    biblicalReference: "1 Chronicles 24:9",
    description: "Fifth course, 'My King is Yah'",
    color: "#A86E60"
  },
  {
    number: 6,
    name: "Mijamin",
    hebrewName: "מִיָּמִין",
    patriarch: "Mijamin",
    biblicalReference: "1 Chronicles 24:9",
    description: "Sixth course, 'From the right hand'",
    color: "#9D615B"
  },
  {
    number: 7,
    name: "Hakkoz",
    hebrewName: "הַקּוֹץ",
    patriarch: "Hakkoz",
    biblicalReference: "1 Chronicles 24:10",
    description: "Seventh course, 'The thorn'",
    color: "#925456"
  },
  {
    number: 8,
    name: "Abijah",
    hebrewName: "אֲבִיָּה",
    patriarch: "Abijah",
    biblicalReference: "1 Chronicles 24:10",
    description: "Eighth course, father of John the Baptist",
    color: "#874751"
  },
  {
    number: 9,
    name: "Jeshua",
    hebrewName: "יְשׁוּעַ",
    patriarch: "Jeshua",
    biblicalReference: "1 Chronicles 24:11",
    description: "Ninth course, 'Salvation'",
    color: "#7C3A4C"
  },
  {
    number: 10,
    name: "Shecaniah",
    hebrewName: "שְׁכַנְיָה",
    patriarch: "Shecaniah",
    biblicalReference: "1 Chronicles 24:11",
    description: "Tenth course, 'Yah has dwelt'",
    color: "#D4A574"
  },
  {
    number: 11,
    name: "Eliashib",
    hebrewName: "אֱלִיָּשִׁיב",
    patriarch: "Eliashib",
    biblicalReference: "1 Chronicles 24:12",
    description: "Eleventh course, 'God restores'",
    color: "#C9956F"
  },
  {
    number: 12,
    name: "Jakim",
    hebrewName: "יָקִים",
    patriarch: "Jakim",
    biblicalReference: "1 Chronicles 24:12",
    description: "Twelfth course, 'He establishes'",
    color: "#BE886A"
  },
  {
    number: 13,
    name: "Huppah",
    hebrewName: "חֻפָּה",
    patriarch: "Huppah",
    biblicalReference: "1 Chronicles 24:13",
    description: "Thirteenth course, 'Canopy'",
    color: "#B37B65"
  },
  {
    number: 14,
    name: "Jeshebeab",
    hebrewName: "יְשֶׁבְאָב",
    patriarch: "Jeshebeab",
    biblicalReference: "1 Chronicles 24:13",
    description: "Fourteenth course, 'Father sits'",
    color: "#A86E60"
  },
  {
    number: 15,
    name: "Bilgah",
    hebrewName: "בִּלְגָה",
    patriarch: "Bilgah",
    biblicalReference: "1 Chronicles 24:14",
    description: "Fifteenth course, 'Cheerfulness'",
    color: "#9D615B"
  },
  {
    number: 16,
    name: "Immer",
    hebrewName: "אִמֵּר",
    patriarch: "Immer",
    biblicalReference: "1 Chronicles 24:14",
    description: "Sixteenth course, 'Lamb'",
    color: "#925456"
  },
  {
    number: 17,
    name: "Hezir",
    hebrewName: "חֶזִּיר",
    patriarch: "Hezir",
    biblicalReference: "1 Chronicles 24:15",
    description: "Seventeenth course, 'Swine'",
    color: "#874751"
  },
  {
    number: 18,
    name: "Happizzez",
    hebrewName: "הַפִּצֵּץ",
    patriarch: "Happizzez",
    biblicalReference: "1 Chronicles 24:15",
    description: "Eighteenth course, 'The disperser'",
    color: "#7C3A4C"
  },
  {
    number: 19,
    name: "Pethahiah",
    hebrewName: "פְּתַחְיָה",
    patriarch: "Pethahiah",
    biblicalReference: "1 Chronicles 24:16",
    description: "Nineteenth course, 'Yah opens'",
    color: "#D4A574"
  },
  {
    number: 20,
    name: "Jehezekel",
    hebrewName: "יְחֶזְקֵל",
    patriarch: "Jehezekel",
    biblicalReference: "1 Chronicles 24:16",
    description: "Twentieth course, 'God strengthens'",
    color: "#C9956F"
  },
  {
    number: 21,
    name: "Jachin",
    hebrewName: "יָכִין",
    patriarch: "Jachin",
    biblicalReference: "1 Chronicles 24:17",
    description: "Twenty-first course, 'He establishes'",
    color: "#BE886A"
  },
  {
    number: 22,
    name: "Gamul",
    hebrewName: "גָּמוּל",
    patriarch: "Gamul",
    biblicalReference: "1 Chronicles 24:17",
    description: "Twenty-second course, 'Recompense'",
    color: "#B37B65"
  },
  {
    number: 23,
    name: "Delaiah",
    hebrewName: "דְּלָיָה",
    patriarch: "Delaiah",
    biblicalReference: "1 Chronicles 24:18",
    description: "Twenty-third course, 'Yah has drawn'",
    color: "#A86E60"
  },
  {
    number: 24,
    name: "Maaziah",
    hebrewName: "מַעַזְיָה",
    patriarch: "Maaziah",
    biblicalReference: "1 Chronicles 24:18",
    description: "Twenty-fourth course, 'Yah is my strength'",
    color: "#9D615B"
  }
];

/**
 * Generate the weekly rotation schedule for the entire 364-day year
 * Each course serves for one week (7 days)
 * 52 weeks × 24 courses = 1,248 days (3 complete cycles per year)
 */
export function generateWeeklyRotation(): WeeklyRotation[] {
  const monthDays = [31, 30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30];
  const monthNames = [
    "Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul",
    "Tishri", "Cheshvan", "Kislev", "Tevet", "Shevat", "Adar"
  ];

  const rotations: WeeklyRotation[] = [];
  let dayCounter = 1;
  let monthIndex = 0;
  let week = 1;

  while (week <= 52) {
    // Determine which month we're in
    while (dayCounter > monthDays[monthIndex]) {
      dayCounter -= monthDays[monthIndex];
      monthIndex++;
      if (monthIndex >= 12) monthIndex = 0;
    }

    const courseIndex = ((week - 1) % 24);
    const course = PRIESTLY_COURSES[courseIndex];
    const startDay = dayCounter;
    let endDay = dayCounter + 6;

    // Check if week spans across months
    if (endDay > monthDays[monthIndex]) {
      endDay = monthDays[monthIndex];
    }

    let specialObservance = undefined;

    // Mark special observances
    if (monthIndex === 0 && startDay <= 14 && endDay >= 14) {
      specialObservance = "Passover";
    } else if (monthIndex === 6 && startDay <= 10 && endDay >= 10) {
      specialObservance = "Day of Atonement";
    } else if (monthIndex === 6 && startDay <= 15 && endDay >= 15) {
      specialObservance = "Tabernacles";
    }

    rotations.push({
      week,
      month: monthIndex + 1,
      monthName: monthNames[monthIndex],
      startDay,
      endDay,
      courseNumber: course.number,
      courseName: course.name,
      hebrewName: course.hebrewName,
      patriarch: course.patriarch,
      specialObservance
    });

    dayCounter += 7;
    week++;
  }

  return rotations;
}

/**
 * Get the priestly course for a specific week
 */
export function getCourseForWeek(week: number): PriestlyCourse {
  const courseIndex = ((week - 1) % 24);
  return PRIESTLY_COURSES[courseIndex];
}

/**
 * Get the priestly course for a specific date
 */
export function getCourseForDate(month: number, day: number): WeeklyRotation | null {
  const rotations = generateWeeklyRotation();
  
  for (const rotation of rotations) {
    if (rotation.month === month && day >= rotation.startDay && day <= rotation.endDay) {
      return rotation;
    }
  }
  
  return null;
}

/**
 * Get all courses serving in a specific month
 */
export function getCoursesInMonth(month: number): WeeklyRotation[] {
  const rotations = generateWeeklyRotation();
  return rotations.filter(r => r.month === month);
}

/**
 * Get course details by course number
 */
export function getCourseDetails(courseNumber: number): PriestlyCourse {
  return PRIESTLY_COURSES[courseNumber - 1];
}

/**
 * Get the current cycle position (1-3, since there are 3 complete cycles per year)
 */
export function getCyclePosition(week: number): number {
  return Math.ceil(week / 24);
}

/**
 * Get all courses in a specific cycle
 */
export function getCoursesInCycle(cycle: number): PriestlyCourse[] {
  return PRIESTLY_COURSES;
}

/**
 * Format course information for display
 */
export function formatCourseInfo(course: PriestlyCourse): string {
  return `${course.name} (${course.hebrewName}) - ${course.patriarch}`;
}

/**
 * Get course color for visualization
 */
export function getCourseColor(courseNumber: number): string {
  const course = PRIESTLY_COURSES[courseNumber - 1];
  return course.color;
}

/**
 * Information about priestly service in the Essene calendar
 */
export function getPriestlyServiceInfo(): string {
  return `The Essene calendar maintained a precise rotation of the 24 priestly courses (Mishmarot) 
throughout the year. Each course served for one week, creating a perfect mathematical system: 
52 weeks × 24 courses = 1,248 days, allowing for exactly 3 complete cycles per 364-day year. 
This ensured that every priest served an equal number of times annually and that the same 
courses served on the same festivals every year—a key feature of the Essene calendar's perfection.`;
}

/**
 * Get historical context about priestly courses
 */
export function getPriestlyHistoricalContext(): string {
  return `The 24 priestly courses were established after the Babylonian exile, as recorded in 
1 Chronicles 24:7-19. Each course was named after a priestly family and served in the Temple 
for one week at a time. The Essenes adopted this system but integrated it perfectly with their 
364-day solar calendar, ensuring mathematical precision and theological perfection. The Dead Sea 
Scrolls, particularly the Temple Scroll and the Mishmarot texts, provide detailed information 
about how the Qumran community organized and understood priestly service.`;
}
