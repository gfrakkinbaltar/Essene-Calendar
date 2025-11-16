// Old Testament Prophecies and Essene Fulfillment Interpretations

export type FulfillmentStatus = 'fulfilled' | 'partial' | 'unfulfilled' | 'ongoing';

export interface OldTestamentProphecy {
  id: string;
  biblicalReference: string;
  text: string;
  book: string;
  chapter: number;
  verses: string;
  theme: string;
}

export interface EsseneFulfillment {
  prophecyId: string;
  eventId: string;
  eventTitle: string;
  status: FulfillmentStatus;
  esseneInterpretation: string;
  pesharReference: string;
  pesharText: string;
  theologicalSignificance: string;
  historicalContext: string;
  messianic: boolean;
  apocalyptic: boolean;
}

export const OLD_TESTAMENT_PROPHECIES: OldTestamentProphecy[] = [
  {
    id: 'gen-3-15',
    biblicalReference: 'Genesis 3:15',
    text: 'And I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.',
    book: 'Genesis',
    chapter: 3,
    verses: '15',
    theme: 'Messianic Protoevangelium'
  },
  {
    id: 'gen-12-3',
    biblicalReference: 'Genesis 12:3',
    text: 'I will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.',
    book: 'Genesis',
    chapter: 12,
    verses: '3',
    theme: 'Abrahamic Covenant'
  },
  {
    id: '2sam-7-12-13',
    biblicalReference: '2 Samuel 7:12-13',
    text: 'When your days are over and you rest with your ancestors, I will raise up your offspring to succeed you, one of your own sons, and I will establish his kingdom. He is the one who will build a house for my Name, and I will establish the throne of his kingdom forever.',
    book: '2 Samuel',
    chapter: 7,
    verses: '12-13',
    theme: 'Davidic Covenant and Messianic Lineage'
  },
  {
    id: 'isa-7-14',
    biblicalReference: 'Isaiah 7:14',
    text: 'Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.',
    book: 'Isaiah',
    chapter: 7,
    verses: '14',
    theme: 'Messianic Birth'
  },
  {
    id: 'isa-9-6-7',
    biblicalReference: 'Isaiah 9:6-7',
    text: 'For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace. Of the greatness of his government and peace there will be no end.',
    book: 'Isaiah',
    chapter: 9,
    verses: '6-7',
    theme: 'Messianic King'
  },
  {
    id: 'isa-40-3',
    biblicalReference: 'Isaiah 40:3',
    text: 'A voice of one calling: "In the wilderness prepare the way for the LORD; make straight in the desert a highway for our God."',
    book: 'Isaiah',
    chapter: 40,
    verses: '3',
    theme: 'Preparation in Wilderness'
  },
  {
    id: 'isa-52-13-53-12',
    biblicalReference: 'Isaiah 52:13-53:12',
    text: 'See, my servant will act wisely; he will be raised and lifted up and highly exalted. Just as there were many who were appalled at him—his appearance was so disfigured beyond that of any human being and his form marred beyond human likeness—so he will sprinkle many nations.',
    book: 'Isaiah',
    chapter: 52,
    verses: '13-53:12',
    theme: 'Suffering Servant'
  },
  {
    id: 'isa-61-1-2',
    biblicalReference: 'Isaiah 61:1-2',
    text: 'The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.',
    book: 'Isaiah',
    chapter: 61,
    verses: '1-2',
    theme: 'Messianic Anointing and Mission'
  },
  {
    id: 'jer-23-5-6',
    biblicalReference: 'Jeremiah 23:5-6',
    text: '"The days are coming," declares the LORD, "when I will raise up for David a righteous Branch, a King who will reign wisely and do what is just and right in the land."',
    book: 'Jeremiah',
    chapter: 23,
    verses: '5-6',
    theme: 'Righteous Branch'
  },
  {
    id: 'jer-31-31-34',
    biblicalReference: 'Jeremiah 31:31-34',
    text: '"The days are coming," declares the LORD, "when I will make a new covenant with the people of Israel and with the people of Judah. It will not be like the covenant I made with their ancestors when I took them by the hand to lead them out of Egypt."',
    book: 'Jeremiah',
    chapter: 31,
    verses: '31-34',
    theme: 'New Covenant'
  },
  {
    id: 'dan-2-44-45',
    biblicalReference: 'Daniel 2:44-45',
    text: 'In the time of those kings, the God of heaven will set up a kingdom that will never be destroyed, nor will it be left to another people. It will crush all those kingdoms and bring them to an end, but it will itself endure forever.',
    book: 'Daniel',
    chapter: 2,
    verses: '44-45',
    theme: 'Eternal Kingdom'
  },
  {
    id: 'dan-7-13-14',
    biblicalReference: 'Daniel 7:13-14',
    text: 'In my vision at night I looked, and there before me was one like a son of man, coming with the clouds of heaven. He approached the Ancient of Days and was led into his presence. He was given authority, glory and sovereign power; all nations and peoples of every language worshiped him.',
    book: 'Daniel',
    chapter: 7,
    verses: '13-14',
    theme: 'Son of Man and Divine Authority'
  },
  {
    id: 'dan-9-24-27',
    biblicalReference: 'Daniel 9:24-27',
    text: 'Seventy "sevens" are decreed for your people and your holy city to finish transgression, to put an end to sin, to atone for wickedness, to bring in everlasting righteousness, to seal up vision and prophecy and to anoint the Most Holy Place.',
    book: 'Daniel',
    chapter: 9,
    verses: '24-27',
    theme: 'Seventy Weeks Prophecy'
  },
  {
    id: 'dan-11-31',
    biblicalReference: 'Daniel 11:31',
    text: 'His armed forces will rise up to desecrate the temple fortress and will abolish the daily sacrifice. Then they will set up the abomination that causes desolation.',
    book: 'Daniel',
    chapter: 11,
    verses: '31',
    theme: 'Abomination of Desolation'
  },
  {
    id: 'dan-12-1-2',
    biblicalReference: 'Daniel 12:1-2',
    text: 'At that time Michael, the great prince who protects your people, will arise. There will be a time of distress such as has not happened from the beginning of nations until then. But at that time your people—everyone whose name is found written in the book—will be delivered.',
    book: 'Daniel',
    chapter: 12,
    verses: '1-2',
    theme: 'End Times Deliverance'
  },
  {
    id: 'mal-3-1',
    biblicalReference: 'Malachi 3:1',
    text: '"I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple; the messenger of the covenant, whom you desire, will come," says the LORD Almighty.',
    book: 'Malachi',
    chapter: 3,
    verses: '1',
    theme: 'Messenger Preparing the Way'
  },
  {
    id: 'mal-4-5-6',
    biblicalReference: 'Malachi 4:5-6',
    text: '"See, I will send the prophet Elijah to you before the great and dreadful day of the LORD comes. He will turn the hearts of the parents to their children, and the hearts of the children to their parents."',
    book: 'Malachi',
    chapter: 4,
    verses: '5-6',
    theme: 'Elijah\'s Return'
  },
  {
    id: 'ezek-4-5',
    biblicalReference: 'Ezekiel 4:5',
    text: 'So for 390 days you will bear the sin of the people of Israel. After that, lie on your right side for 40 days and bear the sin of the people of Judah.',
    book: 'Ezekiel',
    chapter: 4,
    verses: '5',
    theme: 'Era of Wrath Calculation'
  },
  {
    id: 'zech-3-8',
    biblicalReference: 'Zechariah 3:8',
    text: '"Listen, High Priest Joshua, you and your associates seated before you, who are men symbolic of things to come: I am going to bring my servant, the Branch."',
    book: 'Zechariah',
    chapter: 3,
    verses: '8',
    theme: 'Branch Prophecy'
  },
  {
    id: 'zech-6-12-13',
    biblicalReference: 'Zechariah 6:12-13',
    text: '"This is what the LORD says: Here is the man whose name is the Branch, and he will branch out from his place and build the LORD\'s temple. Yes, he will build the LORD\'s temple, and he will be clothed with majesty and will sit and rule on his throne."',
    book: 'Zechariah',
    chapter: 6,
    verses: '12-13',
    theme: 'Branch Building the Temple'
  },
  {
    id: 'psa-2-7-9',
    biblicalReference: 'Psalm 2:7-9',
    text: 'I will proclaim the LORD\'s decree: He said to me, "You are my son; today I have become your father. Ask me, and I will make the nations your inheritance, the ends of the earth your possession."',
    book: 'Psalm',
    chapter: 2,
    verses: '7-9',
    theme: 'Messianic Kingship'
  },
  {
    id: 'psa-110-1-4',
    biblicalReference: 'Psalm 110:1-4',
    text: 'The LORD says to my lord: "Sit at my right hand until I make your enemies a footstool for your feet." The LORD will extend your mighty scepter from Zion, saying, "Rule in the midst of your enemies!"',
    book: 'Psalm',
    chapter: 110,
    verses: '1-4',
    theme: 'Messianic Priest-King'
  },
  {
    id: 'psa-118-22-23',
    biblicalReference: 'Psalm 118:22-23',
    text: 'The stone the builders rejected has become the cornerstone; the LORD has done this, and it is marvelous in our eyes.',
    book: 'Psalm',
    chapter: 118,
    verses: '22-23',
    theme: 'Rejected Stone'
  }
];

export const ESSENE_FULFILLMENTS: EsseneFulfillment[] = [
  {
    prophecyId: 'gen-12-3',
    eventId: 'abraham-covenant',
    eventTitle: 'Abraham\'s Covenant',
    status: 'fulfilled',
    esseneInterpretation: 'The covenant with Abraham established the lineage through which all nations would be blessed, ultimately fulfilled in the Teacher of Righteousness and the Yahad community.',
    pesharReference: '4Q175 (Testimonia)',
    pesharText: 'Abraham\'s seed is identified with the righteous remnant of Israel who keep the covenant.',
    theologicalSignificance: 'Foundation of Essene identity as the true Israel',
    historicalContext: 'The Essenes understood themselves as the spiritual heirs of Abraham\'s covenant promise.',
    messianic: true,
    apocalyptic: false
  },
  {
    prophecyId: '2sam-7-12-13',
    eventId: 'davidic-kingship',
    eventTitle: 'David\'s Kingship and Messianic Lineage',
    status: 'partial',
    esseneInterpretation: 'David\'s throne and kingdom are eternal, but the Essenes expected a future messianic king from David\'s line who would establish the true kingdom.',
    pesharReference: '4Q174 (Florilegium)',
    pesharText: 'The Davidic covenant is reinterpreted to refer to the messianic figure who will rule in the age to come.',
    theologicalSignificance: 'Establishes messianic expectation of a royal Messiah',
    historicalContext: 'The Essenes rejected Hasmonean kingship as illegitimate usurpation of David\'s throne.',
    messianic: true,
    apocalyptic: false
  },
  {
    prophecyId: 'isa-40-3',
    eventId: 'qumran-settlement',
    eventTitle: 'Settlement at Qumran',
    status: 'fulfilled',
    esseneInterpretation: 'The Essenes saw themselves as the voice in the wilderness preparing the way for the Lord through strict observance of the Law and separation from corruption.',
    pesharReference: '1QS (Community Rule), 1QpHab (Habakkuk Pesher)',
    pesharText: 'The community in the wilderness is the fulfillment of Isaiah\'s prophecy about preparing the way in the desert.',
    theologicalSignificance: 'Validates Essene withdrawal to Qumran as divinely ordained',
    historicalContext: 'The Essenes interpreted their wilderness community as the fulfillment of Isaiah 40:3.',
    messianic: false,
    apocalyptic: false
  },
  {
    prophecyId: 'dan-9-24-27',
    eventId: 'teacher-emergence',
    eventTitle: 'Emergence of the Teacher of Righteousness',
    status: 'partial',
    esseneInterpretation: 'The Teacher of Righteousness is the revealer of the mysteries of the prophets, whose emergence marks the beginning of the final age within Daniel\'s 70-week prophecy.',
    pesharReference: '1QpHab (Habakkuk Pesher), 4Q175 (Testimonia)',
    pesharText: 'The Teacher is the one to whom God made known all the mysteries of the words of His servants the prophets.',
    theologicalSignificance: 'The Teacher\'s emergence is a critical prophetic marker',
    historicalContext: 'The Essenes calculated the Teacher\'s appearance as fulfilling Daniel\'s 70 weeks.',
    messianic: true,
    apocalyptic: true
  },
  {
    prophecyId: 'dan-11-31',
    eventId: 'antiochus-defilement',
    eventTitle: 'Antiochus IV\'s Defilement of the Temple',
    status: 'fulfilled',
    esseneInterpretation: 'The abomination of desolation spoken of by Daniel was fulfilled when Antiochus IV desecrated the Temple, validating the Essene rejection of Temple worship.',
    pesharReference: '4Q175 (Testimonia), War Scroll',
    pesharText: 'The defilement of the Temple by the Gentiles is the abomination that makes desolate.',
    theologicalSignificance: 'Proves the Temple establishment\'s corruption and validates Essene separation',
    historicalContext: 'The Essenes used this fulfillment to justify their rejection of the Jerusalem Temple.',
    messianic: false,
    apocalyptic: true
  },
  {
    prophecyId: 'dan-2-44-45',
    eventId: 'day-of-yhwh',
    eventTitle: 'The Day of YHWH - Final Judgment',
    status: 'unfulfilled',
    esseneInterpretation: 'The eternal kingdom of God will be established when the Son of Man receives authority and all earthly kingdoms are destroyed.',
    pesharReference: 'War Scroll (1QM), Melchizedek Scroll (11Q13)',
    pesharText: 'In the final battle, God will establish His kingdom that will never be destroyed.',
    theologicalSignificance: 'The ultimate fulfillment of all prophecy in the eschaton',
    historicalContext: 'The Essenes awaited this final fulfillment as imminent in their generation.',
    messianic: true,
    apocalyptic: true
  },
  {
    prophecyId: 'isa-9-6-7',
    eventId: 'messianic-kingdom',
    eventTitle: 'The Messianic Kingdom and Age to Come',
    status: 'unfulfilled',
    esseneInterpretation: 'The messianic king will reign in righteousness and peace, establishing an eternal kingdom where the righteous dwell in perfect communion with God.',
    pesharReference: 'War Scroll, Melchizedek Scroll, 1QS',
    pesharText: 'The Prince of Peace will rule forever in the age to come.',
    theologicalSignificance: 'The ultimate goal of Essene eschatology',
    historicalContext: 'The Essenes lived in anticipation of this eternal kingdom.',
    messianic: true,
    apocalyptic: true
  },
  {
    prophecyId: 'ezek-4-5',
    eventId: 'era-of-wrath',
    eventTitle: 'The 390-Year Era of Wrath',
    status: 'fulfilled',
    esseneInterpretation: 'The 390-year period of punishment for Israel\'s iniquity, calculated from the Temple\'s destruction, ended with the emergence of the righteous remnant.',
    pesharReference: 'Damascus Document',
    pesharText: 'For 390 years after the destruction of the Temple, Israel wandered in blindness until the Teacher of Righteousness emerged.',
    theologicalSignificance: 'Validates Essene timeline calculations and the Teacher\'s emergence',
    historicalContext: 'The Essenes used this calculation to determine when the Teacher would appear.',
    messianic: false,
    apocalyptic: true
  },
  {
    prophecyId: 'mal-3-1',
    eventId: 'teacher-emergence',
    eventTitle: 'Emergence of the Teacher of Righteousness',
    status: 'partial',
    esseneInterpretation: 'The messenger who prepares the way is identified with the Teacher of Righteousness, who came to reveal the true interpretation of the Law.',
    pesharReference: '1QS, 1QpHab',
    pesharText: 'The Teacher is the messenger sent to prepare the way in the wilderness.',
    theologicalSignificance: 'Identifies the Teacher as a messianic forerunner figure',
    historicalContext: 'The Essenes saw the Teacher as fulfilling Malachi\'s prophecy.',
    messianic: true,
    apocalyptic: false
  },
  {
    prophecyId: 'isa-52-13-53-12',
    eventId: 'teacher-emergence',
    eventTitle: 'Emergence of the Teacher of Righteousness',
    status: 'partial',
    esseneInterpretation: 'The Teacher of Righteousness, like the suffering servant, was rejected and persecuted but vindicated by God as the revealer of divine mysteries.',
    pesharReference: '1QpHab, 4Q175',
    pesharText: 'The Teacher suffered persecution from the Wicked Priest but was exalted by God.',
    theologicalSignificance: 'The Teacher embodies the suffering servant role',
    historicalContext: 'The Essenes saw the Teacher\'s persecution as fulfilling the suffering servant prophecy.',
    messianic: true,
    apocalyptic: false
  },
  {
    prophecyId: 'psa-110-1-4',
    eventId: 'messianic-kingdom',
    eventTitle: 'The Messianic Kingdom and Age to Come',
    status: 'unfulfilled',
    esseneInterpretation: 'The Messiah will be both priest and king, sitting at God\'s right hand and ruling over all enemies in the age to come.',
    pesharReference: 'War Scroll, 1QS',
    pesharText: 'The messianic figures—both priestly and royal—will rule in the eternal kingdom.',
    theologicalSignificance: 'Establishes the two-messiah doctrine of the Essenes',
    historicalContext: 'The Essenes expected both a priestly and royal messiah.',
    messianic: true,
    apocalyptic: true
  }
];

export function getFulfillmentsByEvent(eventId: string): EsseneFulfillment[] {
  return ESSENE_FULFILLMENTS.filter(f => f.eventId === eventId);
}

export function getFulfillmentsByProphecy(prophecyId: string): EsseneFulfillment[] {
  return ESSENE_FULFILLMENTS.filter(f => f.prophecyId === prophecyId);
}

export function getProphecyById(id: string): OldTestamentProphecy | undefined {
  return OLD_TESTAMENT_PROPHECIES.find(p => p.id === id);
}

export function getFulfillmentsByStatus(status: FulfillmentStatus): EsseneFulfillment[] {
  return ESSENE_FULFILLMENTS.filter(f => f.status === status);
}

export function getMessianic(): EsseneFulfillment[] {
  return ESSENE_FULFILLMENTS.filter(f => f.messianic);
}

export function getApocalyptic(): EsseneFulfillment[] {
  return ESSENE_FULFILLMENTS.filter(f => f.apocalyptic);
}

export function searchProphecies(query: string): OldTestamentProphecy[] {
  const lowerQuery = query.toLowerCase();
  return OLD_TESTAMENT_PROPHECIES.filter(
    p =>
      p.text.toLowerCase().includes(lowerQuery) ||
      p.biblicalReference.toLowerCase().includes(lowerQuery) ||
      p.theme.toLowerCase().includes(lowerQuery) ||
      p.book.toLowerCase().includes(lowerQuery)
  );
}
