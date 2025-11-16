// Prophetic Event Relationships and Connections

export interface EventRelationship {
  fromEventId: string;
  toEventId: string;
  relationshipType: 'fulfillment' | 'foreshadowing' | 'causation' | 'parallel' | 'judgment' | 'preparation';
  description: string;
  strength: 'strong' | 'moderate' | 'weak';
}

export interface TimelinePosition {
  eventId: string;
  year: number;
  yearRange?: [number, number];
  era: string;
  visualX: number;
}

export const EVENT_RELATIONSHIPS: EventRelationship[] = [
  // Creation to Patriarchal
  {
    fromEventId: 'creation',
    toEventId: 'enoch-calendar',
    relationshipType: 'foreshadowing',
    description: 'Divine order established at creation is revealed through Enoch\'s heavenly calendar',
    strength: 'strong'
  },
  {
    fromEventId: 'creation',
    toEventId: 'abraham-covenant',
    relationshipType: 'preparation',
    description: 'Creation establishes the framework for covenant lineage',
    strength: 'strong'
  },

  // Patriarchal to Exodus
  {
    fromEventId: 'abraham-covenant',
    toEventId: 'exodus-event',
    relationshipType: 'fulfillment',
    description: 'Abraham\'s covenant promise of descendants is fulfilled through the Exodus',
    strength: 'strong'
  },
  {
    fromEventId: 'enoch-calendar',
    toEventId: 'sinai-covenant',
    relationshipType: 'foreshadowing',
    description: 'Enoch\'s calendar revelation is confirmed and formalized at Sinai',
    strength: 'strong'
  },

  // Exodus to Monarchy
  {
    fromEventId: 'sinai-covenant',
    toEventId: 'davidic-kingship',
    relationshipType: 'preparation',
    description: 'Sinai covenant establishes the framework for Davidic messianic expectation',
    strength: 'strong'
  },
  {
    fromEventId: 'exodus-event',
    toEventId: 'davidic-kingship',
    relationshipType: 'foreshadowing',
    description: 'Exodus deliverance foreshadows the coming messianic redemption',
    strength: 'strong'
  },

  // Monarchy to First Temple
  {
    fromEventId: 'davidic-kingship',
    toEventId: 'solomon-temple',
    relationshipType: 'causation',
    description: 'Davidic kingship leads to Solomon\'s Temple construction',
    strength: 'strong'
  },

  // First Temple to Exile
  {
    fromEventId: 'solomon-temple',
    toEventId: 'temple-destruction',
    relationshipType: 'causation',
    description: 'Temple corruption leads to its destruction by Babylon',
    strength: 'strong'
  },
  {
    fromEventId: 'temple-destruction',
    toEventId: 'era-of-wrath',
    relationshipType: 'causation',
    description: 'Temple destruction initiates the 390-year Era of Wrath',
    strength: 'strong'
  },

  // Exile to Restoration
  {
    fromEventId: 'era-of-wrath',
    toEventId: 'cyrus-decree',
    relationshipType: 'fulfillment',
    description: 'End of Era of Wrath is marked by Cyrus\'s decree allowing return',
    strength: 'strong'
  },
  {
    fromEventId: 'cyrus-decree',
    toEventId: 'second-temple-completion',
    relationshipType: 'causation',
    description: 'Cyrus\'s decree leads to Second Temple completion',
    strength: 'strong'
  },

  // Restoration to Hellenistic
  {
    fromEventId: 'second-temple-completion',
    toEventId: 'alexander-conquest',
    relationshipType: 'preparation',
    description: 'Restored Temple faces new threat from Hellenistic conquest',
    strength: 'moderate'
  },
  {
    fromEventId: 'alexander-conquest',
    toEventId: 'antiochus-defilement',
    relationshipType: 'causation',
    description: 'Hellenistic conquest leads to Antiochus\'s defilement of Temple',
    strength: 'strong'
  },

  // Hellenistic to Hasmonean
  {
    fromEventId: 'antiochus-defilement',
    toEventId: 'maccabean-revolt',
    relationshipType: 'causation',
    description: 'Temple defilement triggers the Maccabean revolt',
    strength: 'strong'
  },
  {
    fromEventId: 'maccabean-revolt',
    toEventId: 'root-of-planting',
    relationshipType: 'parallel',
    description: 'Maccabean independence coincides with emergence of the Root of Planting',
    strength: 'moderate'
  },

  // Hasmonean to Teacher
  {
    fromEventId: 'root-of-planting',
    toEventId: 'teacher-emergence',
    relationshipType: 'fulfillment',
    description: 'Root of Planting culminates in emergence of Teacher of Righteousness',
    strength: 'strong'
  },
  {
    fromEventId: 'teacher-emergence',
    toEventId: 'wicked-priest-conflict',
    relationshipType: 'causation',
    description: 'Teacher\'s revelation of true calendar causes conflict with Wicked Priest',
    strength: 'strong'
  },
  {
    fromEventId: 'wicked-priest-conflict',
    toEventId: 'qumran-settlement',
    relationshipType: 'causation',
    description: 'Persecution by Wicked Priest leads to settlement at Qumran',
    strength: 'strong'
  },

  // Hasmonean to Roman
  {
    fromEventId: 'maccabean-revolt',
    toEventId: 'pompey-conquest',
    relationshipType: 'causation',
    description: 'Hasmonean independence eventually leads to Roman conquest',
    strength: 'moderate'
  },
  {
    fromEventId: 'pompey-conquest',
    toEventId: 'herod-kingship',
    relationshipType: 'causation',
    description: 'Roman conquest establishes Herod as client king',
    strength: 'strong'
  },

  // Roman Period Convergence
  {
    fromEventId: 'herod-kingship',
    toEventId: 'final-generation',
    relationshipType: 'preparation',
    description: 'Herodian rule sets stage for final generation before eschaton',
    strength: 'strong'
  },
  {
    fromEventId: 'pompey-conquest',
    toEventId: 'final-generation',
    relationshipType: 'fulfillment',
    description: 'Roman domination fulfills Daniel\'s prophecy of fourth kingdom',
    strength: 'strong'
  },

  // Eschatological Convergence
  {
    fromEventId: 'final-generation',
    toEventId: 'last-jubilee',
    relationshipType: 'preparation',
    description: 'Final generation leads into the last jubilee before eschaton',
    strength: 'strong'
  },
  {
    fromEventId: 'last-jubilee',
    toEventId: 'final-week',
    relationshipType: 'causation',
    description: 'Last jubilee culminates in the final week of Daniel\'s prophecy',
    strength: 'strong'
  },
  {
    fromEventId: 'final-week',
    toEventId: 'temple-destruction-70ce',
    relationshipType: 'fulfillment',
    description: 'Final week prophecy is fulfilled in Temple destruction',
    strength: 'strong'
  },
  {
    fromEventId: 'temple-destruction-70ce',
    toEventId: 'day-of-yhwh',
    relationshipType: 'preparation',
    description: 'Temple destruction marks preparation for Day of YHWH',
    strength: 'strong'
  },

  // Eschaton
  {
    fromEventId: 'day-of-yhwh',
    toEventId: 'messianic-kingdom',
    relationshipType: 'fulfillment',
    description: 'Day of YHWH culminates in eternal messianic kingdom',
    strength: 'strong'
  },

  // Messianic Foreshadowing Throughout
  {
    fromEventId: 'davidic-kingship',
    toEventId: 'teacher-emergence',
    relationshipType: 'foreshadowing',
    description: 'Davidic kingship foreshadows messianic expectation fulfilled in Teacher',
    strength: 'moderate'
  },
  {
    fromEventId: 'solomon-temple',
    toEventId: 'qumran-settlement',
    relationshipType: 'parallel',
    description: 'Solomon\'s Temple and Qumran community represent competing visions of true worship',
    strength: 'moderate'
  },

  // Calendar Prophecy Thread
  {
    fromEventId: 'enoch-calendar',
    toEventId: 'teacher-emergence',
    relationshipType: 'foreshadowing',
    description: 'Enoch\'s calendar revelation is vindicated by Teacher\'s revelation',
    strength: 'strong'
  },
  {
    fromEventId: 'sinai-covenant',
    toEventId: 'teacher-emergence',
    relationshipType: 'fulfillment',
    description: 'Teacher reveals true interpretation of Sinai\'s festival calendar',
    strength: 'strong'
  }
];

export function getEventRelationships(eventId: string): EventRelationship[] {
  return EVENT_RELATIONSHIPS.filter(
    rel => rel.fromEventId === eventId || rel.toEventId === eventId
  );
}

export function getRelationshipsFrom(eventId: string): EventRelationship[] {
  return EVENT_RELATIONSHIPS.filter(rel => rel.fromEventId === eventId);
}

export function getRelationshipsTo(eventId: string): EventRelationship[] {
  return EVENT_RELATIONSHIPS.filter(rel => rel.toEventId === eventId);
}

export function getRelationshipsByType(
  type: EventRelationship['relationshipType']
): EventRelationship[] {
  return EVENT_RELATIONSHIPS.filter(rel => rel.relationshipType === type);
}

export const RELATIONSHIP_DESCRIPTIONS: Record<
  EventRelationship['relationshipType'],
  { label: string; color: string; description: string }
> = {
  fulfillment: {
    label: 'Fulfillment',
    color: '#4ECDC4',
    description: 'A prophecy or expectation is fulfilled'
  },
  foreshadowing: {
    label: 'Foreshadowing',
    color: '#9B59B6',
    description: 'An earlier event prefigures a later event'
  },
  causation: {
    label: 'Causation',
    color: '#E74C3C',
    description: 'One event directly causes another'
  },
  parallel: {
    label: 'Parallel',
    color: '#F39C12',
    description: 'Events occur simultaneously with similar significance'
  },
  judgment: {
    label: 'Judgment',
    color: '#C0392B',
    description: 'Divine judgment connects events'
  },
  preparation: {
    label: 'Preparation',
    color: '#3498DB',
    description: 'One event prepares the way for another'
  }
};

// Timeline positioning for visual layout (years BCE/CE)
export const TIMELINE_POSITIONS: Record<string, number> = {
  'creation': -4000,
  'enoch-calendar': -3000,
  'abraham-covenant': -1800,
  'exodus-event': -1400,
  'sinai-covenant': -1350,
  'davidic-kingship': -1000,
  'solomon-temple': -960,
  'temple-destruction': -586,
  'era-of-wrath': -586,
  'cyrus-decree': -538,
  'second-temple-completion': -516,
  'alexander-conquest': -332,
  'antiochus-defilement': -167,
  'maccabean-revolt': -167,
  'root-of-planting': -196,
  'teacher-emergence': -176,
  'wicked-priest-conflict': -150,
  'qumran-settlement': -150,
  'pompey-conquest': -63,
  'herod-kingship': -37,
  'final-generation': -4,
  'last-jubilee': 20,
  'final-week': 63,
  'temple-destruction-70ce': 70,
  'day-of-yhwh': 100,
  'messianic-kingdom': 200
};

export function getTimelineYear(eventId: string): number {
  return TIMELINE_POSITIONS[eventId] || 0;
}

export function normalizeTimelinePosition(year: number, minYear: number, maxYear: number, width: number): number {
  const range = maxYear - minYear;
  const position = (year - minYear) / range;
  return position * width;
}
