// Enhanced Timeline Data with Prophecy Types, Historical Eras, and Eschatological Importance

export type ProphecyType = 
  | 'messianic' 
  | 'apocalyptic' 
  | 'judgment' 
  | 'restoration' 
  | 'cosmic' 
  | 'temple' 
  | 'political' 
  | 'calendar';

export type HistoricalEra = 
  | 'creation' 
  | 'patriarchal' 
  | 'exodus' 
  | 'monarchy' 
  | 'exile' 
  | 'restoration' 
  | 'hellenistic' 
  | 'hasmonean' 
  | 'roman' 
  | 'eschatological';

export type EschatologicalImportance = 'critical' | 'major' | 'minor';

export interface PropheticEvent {
  id: string;
  period: string;
  era: HistoricalEra;
  year?: string;
  yearRange?: [number, number];
  title: string;
  description: string;
  prophecyTypes: ProphecyType[];
  importance: EschatologicalImportance;
  biblicalReferences: string[];
  deadSeaScrollReferences?: string[];
  details: string[];
  messianic?: boolean;
  apocalyptic?: boolean;
  cosmicSignificance?: string;
}

export const PROPHECY_TYPES: Record<ProphecyType, { label: string; color: string; description: string }> = {
  messianic: {
    label: 'Messianic',
    color: '#FFD700',
    description: 'Events related to the coming of the Messiah or messianic figures'
  },
  apocalyptic: {
    label: 'Apocalyptic',
    color: '#FF6B6B',
    description: 'End-times events and cosmic upheaval'
  },
  judgment: {
    label: 'Judgment',
    color: '#FF8C00',
    description: 'Divine judgment and punishment'
  },
  restoration: {
    label: 'Restoration',
    color: '#4ECDC4',
    description: 'Restoration of Israel and renewal'
  },
  cosmic: {
    label: 'Cosmic',
    color: '#9B59B6',
    description: 'Celestial signs and cosmic events'
  },
  temple: {
    label: 'Temple',
    color: '#E74C3C',
    description: 'Temple-related events and prophecies'
  },
  political: {
    label: 'Political',
    color: '#3498DB',
    description: 'Political events and empires'
  },
  calendar: {
    label: 'Calendar',
    color: '#F39C12',
    description: 'Calendar-related prophecies and calculations'
  }
};

export const HISTORICAL_ERAS: Record<HistoricalEra, { label: string; color: string; description: string }> = {
  creation: {
    label: 'Creation',
    color: '#E8F8F5',
    description: 'Primordial time and divine order'
  },
  patriarchal: {
    label: 'Patriarchal',
    color: '#D5F4E6',
    description: 'Age of the Patriarchs (2000-1500 BCE)'
  },
  exodus: {
    label: 'Exodus',
    color: '#A9DFBF',
    description: 'Moses and the Exodus (1500-1400 BCE)'
  },
  monarchy: {
    label: 'Monarchy',
    color: '#73C6B6',
    description: 'First Temple Period (1000-586 BCE)'
  },
  exile: {
    label: 'Exile',
    color: '#52BE80',
    description: 'Babylonian Exile (586-538 BCE)'
  },
  restoration: {
    label: 'Restoration',
    color: '#2ECC71',
    description: 'Post-Exilic Restoration (538-196 BCE)'
  },
  hellenistic: {
    label: 'Hellenistic',
    color: '#1E8449',
    description: 'Hellenistic Period (332-167 BCE)'
  },
  hasmonean: {
    label: 'Hasmonean',
    color: '#186A3B',
    description: 'Hasmonean Independence (167-63 BCE)'
  },
  roman: {
    label: 'Roman',
    color: '#0B5345',
    description: 'Roman Period (63 BCE - 1st century CE)'
  },
  eschatological: {
    label: 'Eschatological',
    color: '#000000',
    description: 'End Times and Eschaton'
  }
};

export const IMPORTANCE_LEVELS: Record<EschatologicalImportance, { label: string; color: string; description: string }> = {
  critical: {
    label: 'Critical',
    color: '#C0392B',
    description: 'Essential to Essene eschatological expectations'
  },
  major: {
    label: 'Major',
    color: '#E67E22',
    description: 'Significant prophetic importance'
  },
  minor: {
    label: 'Minor',
    color: '#F39C12',
    description: 'Supporting prophetic detail'
  }
};

export const PROPHETIC_TIMELINE: PropheticEvent[] = [
  {
    id: 'creation',
    period: 'Primordial Time',
    era: 'creation',
    title: 'Creation and Divine Order',
    description: 'God establishes the cosmos with perfect mathematical harmony. The 364-day calendar reflects this original divine order.',
    prophecyTypes: ['cosmic', 'calendar'],
    importance: 'critical',
    biblicalReferences: ['Genesis 1-2', 'Psalm 19'],
    deadSeaScrollReferences: ['1 Enoch 72-82'],
    details: [
      'Seven days of creation establishing the Sabbath pattern',
      'Establishment of luminaries to mark seasons and sacred times',
      'Angelic hosts assigned to govern celestial movements',
      'Original covenant with creation itself'
    ],
    cosmicSignificance: 'Foundation of all prophetic calculation'
  },
  {
    id: 'enoch-calendar',
    period: 'Patriarchal Age',
    era: 'patriarchal',
    yearRange: [2000, 1500],
    title: 'Enoch\'s Reception of the Heavenly Calendar',
    description: 'Enoch receives revelation of the true 364-day solar calendar from the heavenly realm, establishing the foundation for correct timekeeping.',
    prophecyTypes: ['messianic', 'calendar', 'cosmic'],
    importance: 'critical',
    biblicalReferences: ['Genesis 5:24', 'Hebrews 11:5'],
    deadSeaScrollReferences: ['1 Enoch 72-82', '4Q208-211 (Enoch fragments)'],
    details: [
      'Enoch\'s translation to heaven',
      'Revelation of 364-day calendar structure',
      'Teaching of celestial mechanics',
      'Establishment of priestly course rotations',
      'Foundation for Essene calendar practice'
    ],
    messianic: false,
    apocalyptic: false
  },
  {
    id: 'abraham-covenant',
    period: 'Patriarchal Age',
    era: 'patriarchal',
    yearRange: [1800, 1700],
    title: 'Abraham\'s Covenant',
    description: 'God establishes covenant with Abraham, promising descendants and land. This covenant lineage foreshadows the final redemption.',
    prophecyTypes: ['restoration', 'messianic'],
    importance: 'major',
    biblicalReferences: ['Genesis 12:1-3', 'Genesis 15', 'Genesis 17'],
    deadSeaScrollReferences: ['1QS (Community Rule)', '4Q252 (Patriarchal Blessings)'],
    details: [
      'Promise of numerous descendants',
      'Covenant of circumcision',
      'Promise of land inheritance',
      'Foreshadowing of messianic lineage'
    ],
    messianic: true
  },
  {
    id: 'exodus-event',
    period: 'Exodus',
    era: 'exodus',
    yearRange: [1500, 1400],
    title: 'The Exodus from Egypt',
    description: 'God delivers Israel from Egyptian bondage through miraculous signs. This event serves as prototype for the final redemption.',
    prophecyTypes: ['restoration', 'judgment', 'cosmic'],
    importance: 'critical',
    biblicalReferences: ['Exodus 1-15', 'Psalm 113-118'],
    deadSeaScrollReferences: ['4Q175 (Testimonia)', '1QS'],
    details: [
      'Ten plagues demonstrating divine power',
      'Passover as eternal memorial',
      'Crossing the Red Sea',
      'Pillar of cloud and fire',
      'Prototype of final redemption'
    ],
    apocalyptic: false
  },
  {
    id: 'sinai-covenant',
    period: 'Exodus',
    era: 'exodus',
    yearRange: [1400, 1350],
    title: 'Sinai Covenant and Festival Calendar',
    description: 'God gives the Law and establishes the festival calendar at Mount Sinai. The Essenes believed they alone properly observed this calendar.',
    prophecyTypes: ['calendar', 'temple', 'restoration'],
    importance: 'critical',
    biblicalReferences: ['Exodus 19-24', 'Leviticus 23'],
    deadSeaScrollReferences: ['1QS', '4Q175', 'Temple Scroll'],
    details: [
      'Ten Commandments given',
      'Establishment of festival calendar',
      'Priestly ordination',
      'Tabernacle construction',
      'Essene claim to true calendar observance'
    ],
    messianic: false
  },
  {
    id: 'davidic-kingship',
    period: 'First Temple',
    era: 'monarchy',
    yearRange: [1000, 960],
    title: 'David\'s Kingship and Messianic Lineage',
    description: 'David establishes the Davidic dynasty. God promises that the Messiah will come from David\'s line, establishing the royal messianic expectation.',
    prophecyTypes: ['messianic', 'restoration'],
    importance: 'critical',
    biblicalReferences: ['2 Samuel 7', 'Psalm 89', 'Psalm 110'],
    deadSeaScrollReferences: ['4Q174 (Florilegium)', '4Q252', '1QS'],
    details: [
      'David\'s anointing as king',
      'Covenant promise to David',
      'Messiah of Israel expectation',
      'Royal messianic lineage established',
      'Temple construction authorized'
    ],
    messianic: true
  },
  {
    id: 'solomon-temple',
    period: 'First Temple',
    era: 'monarchy',
    yearRange: [960, 920],
    title: 'Solomon\'s Temple Construction',
    description: 'Solomon builds the First Temple in Jerusalem. The Essenes viewed this as the earthly reflection of the heavenly sanctuary.',
    prophecyTypes: ['temple', 'cosmic'],
    importance: 'major',
    biblicalReferences: ['1 Kings 5-8', '2 Chronicles 2-7'],
    deadSeaScrollReferences: ['Temple Scroll', '1QS'],
    details: [
      'Temple as earthly sanctuary',
      'Priestly service established',
      'Festival worship centralized',
      'Reflection of heavenly temple',
      'Eventual desecration foreshadowed'
    ],
    messianic: false
  },
  {
    id: 'temple-destruction',
    period: 'First Temple',
    era: 'monarchy',
    yearRange: [586, 586],
    title: 'Destruction of the First Temple',
    description: 'Nebuchadnezzar destroys the First Temple and Jerusalem. This marks the beginning of the 390-year "Era of Wrath" in Essene calculation.',
    prophecyTypes: ['judgment', 'apocalyptic'],
    importance: 'critical',
    biblicalReferences: ['2 Kings 25', 'Lamentations', 'Jeremiah 52'],
    deadSeaScrollReferences: ['Damascus Document', '1QS', '4Q175'],
    details: [
      'Babylonian conquest of Jerusalem',
      'Temple destruction and desolation',
      'Beginning of 390-year Era of Wrath',
      'Exile of Judean population',
      'Loss of proper calendar observance'
    ],
    apocalyptic: true
  },
  {
    id: 'era-of-wrath',
    period: 'Exile and Restoration',
    era: 'exile',
    yearRange: [586, 196],
    title: 'The 390-Year Era of Wrath',
    description: 'From Ezekiel 4:5, the Essenes calculated a 390-year period of divine punishment following the Temple\'s destruction. This era encompassed exile, return, and ongoing corruption.',
    prophecyTypes: ['judgment', 'apocalyptic', 'calendar'],
    importance: 'critical',
    biblicalReferences: ['Ezekiel 4:5', 'Daniel 9'],
    deadSeaScrollReferences: ['Damascus Document', '4Q175', '1QS'],
    details: [
      '390 years of punishment for Israel\'s iniquity',
      'Exile and dispersion of Israel',
      'Corruption of Temple priesthood',
      'Loss of proper calendar observance',
      'Preparation for Teacher of Righteousness'
    ],
    apocalyptic: true
  },
  {
    id: 'cyrus-decree',
    period: 'Restoration',
    era: 'restoration',
    yearRange: [538, 538],
    title: 'Cyrus\'s Decree and Temple Rebuilding',
    description: 'Cyrus of Persia allows Jews to return and rebuild the Temple. This marks the beginning of Daniel\'s 490-year prophecy.',
    prophecyTypes: ['restoration', 'political'],
    importance: 'major',
    biblicalReferences: ['Ezra 1', 'Isaiah 44:28', 'Daniel 9:25'],
    deadSeaScrollReferences: ['4Q175', '4Q252'],
    details: [
      'Return from Babylonian exile',
      'Rebuilding of Second Temple',
      'Restoration of Jewish autonomy',
      'Beginning of Daniel\'s 70 weeks',
      'Continued calendar disputes'
    ],
    messianic: false
  },
  {
    id: 'second-temple-completion',
    period: 'Restoration',
    era: 'restoration',
    yearRange: [516, 516],
    title: 'Second Temple Completion',
    description: 'The Second Temple is completed and dedicated. However, the Essenes believed the priesthood remained corrupted and the calendar was incorrectly observed.',
    prophecyTypes: ['temple', 'restoration'],
    importance: 'major',
    biblicalReferences: ['Ezra 6', 'Haggai', 'Zechariah'],
    deadSeaScrollReferences: ['1QS', 'Temple Scroll'],
    details: [
      'Temple dedication ceremony',
      'Resumption of Temple worship',
      'Priestly service restored',
      'Essene rejection of Temple authority',
      'Continued calendar disputes'
    ],
    messianic: false
  },
  {
    id: 'alexander-conquest',
    period: 'Hellenistic',
    era: 'hellenistic',
    yearRange: [332, 332],
    title: 'Alexander the Great\'s Conquest',
    description: 'Alexander conquers Judea, introducing Hellenistic culture. The Essenes viewed this as the beginning of foreign domination prophesied in Daniel.',
    prophecyTypes: ['political', 'apocalyptic'],
    importance: 'major',
    biblicalReferences: ['Daniel 8:21', '1 Maccabees 1:1-7'],
    deadSeaScrollReferences: ['4Q175', '4Q252'],
    details: [
      'Greek conquest of Near East',
      'Hellenistic influence on Jewish culture',
      'Threat to Jewish religious practice',
      'Fulfillment of Daniel\'s prophecy',
      'Preparation for Maccabean crisis'
    ],
    apocalyptic: true
  },
  {
    id: 'antiochus-defilement',
    period: 'Hellenistic',
    era: 'hellenistic',
    yearRange: [167, 167],
    title: 'Antiochus IV\'s Defilement of the Temple',
    description: 'Antiochus IV Epiphanes desecrates the Temple, placing a pagan altar and prohibiting Jewish worship. The Essenes identified this as the "Abomination of Desolation."',
    prophecyTypes: ['judgment', 'apocalyptic', 'temple'],
    importance: 'critical',
    biblicalReferences: ['Daniel 11:31', '1 Maccabees 1:54', 'Matthew 24:15'],
    deadSeaScrollReferences: ['4Q175', 'War Scroll', '1QS'],
    details: [
      'Desecration of Temple sanctuary',
      'Prohibition of Jewish worship',
      'Abomination of Desolation erected',
      'Fulfillment of Daniel\'s prophecy',
      'Trigger for Maccabean revolt'
    ],
    apocalyptic: true
  },
  {
    id: 'maccabean-revolt',
    period: 'Hasmonean',
    era: 'hasmonean',
    yearRange: [167, 164],
    title: 'The Maccabean Revolt and Temple Rededication',
    description: 'The Maccabees revolt against Seleucid rule and rededicate the Temple. However, the Essenes rejected Hasmonean authority and the calendar they observed.',
    prophecyTypes: ['restoration', 'political'],
    importance: 'major',
    biblicalReferences: ['1 Maccabees 1-2', '2 Maccabees 10'],
    deadSeaScrollReferences: ['1QS', 'Damascus Document'],
    details: [
      'Judas Maccabeus leads revolt',
      'Temple rededication (Hanukkah)',
      'Hasmonean dynasty established',
      'Essene rejection of Hasmonean priesthood',
      'Separation and formation of Yahad'
    ],
    messianic: false
  },
  {
    id: 'root-of-planting',
    period: 'Hasmonean',
    era: 'hasmonean',
    yearRange: [196, 176],
    title: 'The Root of Planting',
    description: 'Twenty years before the Teacher of Righteousness, faithful Israelites ("root of planting") recognize Temple corruption and seek true righteousness in preparation for divine intervention.',
    prophecyTypes: ['restoration', 'messianic'],
    importance: 'major',
    biblicalReferences: ['Isaiah 60:21', 'Isaiah 61:3'],
    deadSeaScrollReferences: ['Damascus Document', '1QS', '4Q175'],
    details: [
      'Recognition of guilt and iniquity',
      'Groping like blind men for the way',
      'Seeking God with a whole heart',
      'Preparation for Teacher\'s emergence',
      'Formation of proto-Essene communities'
    ],
    messianic: true
  },
  {
    id: 'teacher-emergence',
    period: 'Hasmonean',
    era: 'hasmonean',
    yearRange: [176, 150],
    title: 'Emergence of the Teacher of Righteousness',
    description: 'God raises up the Teacher of Righteousness to reveal the true interpretation of the Law, the correct 364-day calendar, and the mysteries of the prophets.',
    prophecyTypes: ['messianic', 'restoration', 'calendar'],
    importance: 'critical',
    biblicalReferences: ['Malachi 4:5-6', 'Isaiah 40:3'],
    deadSeaScrollReferences: ['1QS', 'Damascus Document', 'Pesharim', '4Q175'],
    details: [
      'Divine revelation of true calendar',
      'Correct interpretation of Torah',
      'Mysteries of prophetic writings revealed',
      'Three Shavuot festivals established',
      'Priestly course rotations clarified',
      'Conflict with Wicked Priest begins'
    ],
    messianic: true
  },
  {
    id: 'wicked-priest-conflict',
    period: 'Hasmonean',
    era: 'hasmonean',
    yearRange: [150, 100],
    title: 'Persecution by the Wicked Priest',
    description: 'The Wicked Priest (Hasmonean ruler) persecutes the Teacher of Righteousness over calendar disputes and authority. The Teacher is forced to flee to the wilderness.',
    prophecyTypes: ['judgment', 'apocalyptic'],
    importance: 'major',
    biblicalReferences: ['Habakkuk 1-2'],
    deadSeaScrollReferences: ['1QpHab', '1QS', 'Damascus Document'],
    details: [
      'Calendar disputes with Temple authorities',
      'Persecution of the Teacher',
      'Flight to the wilderness (Qumran)',
      'Establishment of Yahad community',
      'Composition of pesharim (interpretations)'
    ],
    apocalyptic: true
  },
  {
    id: 'qumran-settlement',
    period: 'Hasmonean',
    era: 'hasmonean',
    yearRange: [150, 70],
    title: 'Settlement at Qumran',
    description: 'The Teacher and followers establish the Yahad community at Qumran. This becomes the center of Essene life and the repository of sacred texts.',
    prophecyTypes: ['restoration', 'messianic'],
    importance: 'major',
    biblicalReferences: ['Isaiah 40:3'],
    deadSeaScrollReferences: ['1QS', 'Damascus Document', 'All Dead Sea Scrolls'],
    details: [
      'Establishment of isolated community',
      'Preparation in the wilderness',
      'Composition of sectarian texts',
      'Preservation of sacred writings',
      'Development of Essene theology'
    ],
    messianic: true
  },
  {
    id: 'pompey-conquest',
    period: 'Roman',
    era: 'roman',
    yearRange: [63, 63],
    title: 'Pompey\'s Conquest and Roman Domination',
    description: 'Pompey the Great conquers Judea and establishes Roman rule. The Essenes identified Rome as the fourth kingdom of Daniel\'s prophecy.',
    prophecyTypes: ['political', 'apocalyptic'],
    importance: 'critical',
    biblicalReferences: ['Daniel 7:23', '1 Maccabees 8'],
    deadSeaScrollReferences: ['4Q175', '4Q252', 'War Scroll'],
    details: [
      'End of Hasmonean independence',
      'Beginning of Roman occupation',
      'Fulfillment of Daniel\'s prophecy',
      'Intensification of messianic expectations',
      'Preparation for final conflict'
    ],
    apocalyptic: true
  },
  {
    id: 'herod-kingship',
    period: 'Roman',
    era: 'roman',
    yearRange: [37, 4],
    title: 'Herod\'s Reign and Temple Expansion',
    description: 'Herod the Great rules as Roman client king and undertakes massive Temple expansion. The Essenes viewed him as a usurper and his Temple as corrupted.',
    prophecyTypes: ['political', 'temple'],
    importance: 'major',
    biblicalReferences: ['Josephus, Antiquities'],
    deadSeaScrollReferences: ['1QS', 'War Scroll'],
    details: [
      'Herod\'s rule as Roman puppet',
      'Massive Temple renovation',
      'Continued calendar disputes',
      'Essene rejection of Herodian Temple',
      'Intensification of apocalyptic expectations'
    ],
    messianic: false
  },
  {
    id: 'final-generation',
    period: 'Roman',
    era: 'roman',
    yearRange: [4, 70],
    title: 'The Final Generation',
    description: 'The Essenes believed they lived in the final generation before the eschaton. Signs of the end multiply: Roman occupation, Temple corruption, messianic figures, and cosmic portents.',
    prophecyTypes: ['apocalyptic', 'messianic'],
    importance: 'critical',
    biblicalReferences: ['Matthew 24', 'Mark 13', 'Luke 21'],
    deadSeaScrollReferences: ['War Scroll', '1QS', 'Pesharim'],
    details: [
      'Roman occupation as prophesied',
      'Corruption of Temple priesthood',
      'Appearance of messianic figures',
      'Wars and rumors of wars',
      'Cosmic signs and wonders',
      'Intensification of sectarian separation'
    ],
    apocalyptic: true,
    messianic: true
  },
  {
    id: 'last-jubilee',
    period: 'Roman',
    era: 'roman',
    yearRange: [20, 70],
    title: 'The Last Jubilee (Final 49 Years)',
    description: 'The Melchizedek Scroll speaks of a proclamation in the "first week of the last jubilee"—the final 49 years before the decreed end of Daniel\'s 490-year prophecy.',
    prophecyTypes: ['apocalyptic', 'calendar', 'messianic'],
    importance: 'critical',
    biblicalReferences: ['Daniel 9:24-27', 'Leviticus 25'],
    deadSeaScrollReferences: ['11Q13 (Melchizedek Scroll)', '4Q175'],
    details: [
      'Seven weeks of seven years',
      'Melchizedek\'s proclamation of liberty',
      'Release from debts and captivity',
      'Atonement for Sons of Light',
      'Judgment on Belial and his hosts',
      'Final preparation for Day of YHWH'
    ],
    apocalyptic: true,
    messianic: true
  },
  {
    id: 'final-week',
    period: 'Roman',
    era: 'roman',
    yearRange: [63, 70],
    title: 'The Final Week of Years',
    description: 'Daniel 9:27 speaks of a final week of years during which a covenant is made, sacrifice ceases at midpoint, and the Abomination of Desolation appears.',
    prophecyTypes: ['apocalyptic', 'judgment'],
    importance: 'critical',
    biblicalReferences: ['Daniel 9:27', 'Matthew 24:15'],
    deadSeaScrollReferences: ['4Q175', 'War Scroll'],
    details: [
      'First 3.5 years: strong covenant made',
      'Midpoint: sacrifice and offering cease',
      'Abomination of Desolation appears',
      'Final 3.5 years: great tribulation',
      'Persecution of the righteous',
      'Decreed end poured out on desolator'
    ],
    apocalyptic: true
  },
  {
    id: 'temple-destruction-70ce',
    period: 'Roman',
    era: 'roman',
    yearRange: [70, 70],
    title: 'Destruction of the Second Temple',
    description: 'The Roman legions destroy the Second Temple and Jerusalem, fulfilling the Essene expectation of divine judgment and the end of the current age.',
    prophecyTypes: ['judgment', 'apocalyptic', 'temple'],
    importance: 'critical',
    biblicalReferences: ['Matthew 24:2', 'Mark 13:2', 'Luke 21:6'],
    deadSeaScrollReferences: ['War Scroll', '1QS'],
    details: [
      'Roman siege of Jerusalem',
      'Temple destruction and desolation',
      'Cessation of Temple worship',
      'Fulfillment of prophecy',
      'Preparation for eschaton'
    ],
    apocalyptic: true
  },
  {
    id: 'day-of-yhwh',
    period: 'Eschaton',
    era: 'eschatological',
    title: 'The Day of YHWH - Final Judgment',
    description: 'The climax of history arrives with the Day of Judgment. God intervenes to destroy the wicked and vindicate the righteous. The War Scroll describes this 40-year conflict in detail.',
    prophecyTypes: ['apocalyptic', 'judgment', 'cosmic'],
    importance: 'critical',
    biblicalReferences: ['Isaiah 2:12-22', 'Joel 2:31', 'Revelation 19'],
    deadSeaScrollReferences: ['War Scroll (1QM)', 'Melchizedek Scroll'],
    details: [
      'War between Sons of Light and Sons of Darkness',
      '40-year conflict with multiple engagements',
      'Angelic armies join the battle',
      'Appearance of messianic figures',
      'Destruction of Belial and his hosts',
      'Judgment of the wicked',
      'Vindication of the righteous'
    ],
    apocalyptic: true,
    messianic: true,
    cosmicSignificance: 'Complete cosmic transformation'
  },
  {
    id: 'messianic-kingdom',
    period: 'Eschaton',
    era: 'eschatological',
    title: 'The Messianic Kingdom and Age to Come',
    description: 'Following the Day of YHWH, the righteous enter the eternal kingdom characterized by perfect righteousness, restored Temple, and renewed creation.',
    prophecyTypes: ['restoration', 'messianic', 'cosmic'],
    importance: 'critical',
    biblicalReferences: ['Isaiah 65-66', 'Revelation 21-22'],
    deadSeaScrollReferences: ['1QS', 'War Scroll', 'Melchizedek Scroll'],
    details: [
      'New Jerusalem with purified Temple',
      'Righteous priesthood restored',
      'Perfect observance of 364-day calendar',
      'Resurrection of the righteous dead',
      'Eternal covenant established',
      'No more war, suffering, or death',
      'Direct communion with God',
      'Angelic fellowship for the righteous'
    ],
    apocalyptic: false,
    messianic: true,
    cosmicSignificance: 'Eternal renewal of creation'
  }
];

/**
 * Get all unique prophecy types in the timeline
 */
export function getProphecyTypes(): ProphecyType[] {
  const types = new Set<ProphecyType>();
  PROPHETIC_TIMELINE.forEach(event => {
    event.prophecyTypes.forEach(type => types.add(type));
  });
  return Array.from(types).sort();
}

/**
 * Get all unique historical eras in the timeline
 */
export function getHistoricalEras(): HistoricalEra[] {
  const eras = new Set<HistoricalEra>();
  PROPHETIC_TIMELINE.forEach(event => eras.add(event.era));
  return Array.from(eras).sort();
}

/**
 * Filter timeline events by prophecy types
 */
export function filterByProphecyType(types: ProphecyType[]): PropheticEvent[] {
  if (types.length === 0) return PROPHETIC_TIMELINE;
  return PROPHETIC_TIMELINE.filter(event =>
    event.prophecyTypes.some(type => types.includes(type))
  );
}

/**
 * Filter timeline events by historical era
 */
export function filterByHistoricalEra(eras: HistoricalEra[]): PropheticEvent[] {
  if (eras.length === 0) return PROPHETIC_TIMELINE;
  return PROPHETIC_TIMELINE.filter(event => eras.includes(event.era));
}

/**
 * Filter timeline events by eschatological importance
 */
export function filterByImportance(importance: EschatologicalImportance[]): PropheticEvent[] {
  if (importance.length === 0) return PROPHETIC_TIMELINE;
  return PROPHETIC_TIMELINE.filter(event => importance.includes(event.importance));
}

/**
 * Apply multiple filters
 */
export function applyFilters(
  prophecyTypes?: ProphecyType[],
  eras?: HistoricalEra[],
  importance?: EschatologicalImportance[]
): PropheticEvent[] {
  let filtered = PROPHETIC_TIMELINE;

  if (prophecyTypes && prophecyTypes.length > 0) {
    filtered = filtered.filter(event =>
      event.prophecyTypes.some(type => prophecyTypes.includes(type))
    );
  }

  if (eras && eras.length > 0) {
    filtered = filtered.filter(event => eras.includes(event.era));
  }

  if (importance && importance.length > 0) {
    filtered = filtered.filter(event => importance.includes(event.importance));
  }

  return filtered;
}

/**
 * Search timeline events by text
 */
export function searchTimeline(query: string): PropheticEvent[] {
  const lowerQuery = query.toLowerCase();
  return PROPHETIC_TIMELINE.filter(event =>
    event.title.toLowerCase().includes(lowerQuery) ||
    event.description.toLowerCase().includes(lowerQuery) ||
    event.details.some(detail => detail.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get event by ID
 */
export function getEventById(id: string): PropheticEvent | undefined {
  return PROPHETIC_TIMELINE.find(event => event.id === id);
}
