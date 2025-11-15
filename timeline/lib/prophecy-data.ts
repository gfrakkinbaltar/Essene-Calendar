export interface ProphecyEvent {
  id: string
  annusMundi: number
  title: string
  summary: string
  description: string
  significance?: string
  category: "covenant" | "judgment" | "restoration" | "millennial"
  historicalContext?: string
  archaeologicalEvidence?: string
  theologicalTheme?: string
  scholarlyInterpretation?: string
}

export const categories = [
  { id: "covenant", label: "Covenant", color: "bg-chart-1" },
  { id: "judgment", label: "Judgment", color: "bg-destructive" },
  { id: "restoration", label: "Restoration", color: "bg-chart-3" },
  { id: "millennial", label: "Millennial", color: "bg-chart-2" },
]

export const prophecyEvents: ProphecyEvent[] = [
  {
    id: "1",
    annusMundi: 0,
    title: "Creation of Humanity",
    summary: "The beginning of human history according to Essene reckoning.",
    description:
      "The Essene calendar marks the Anno Mundi (year of the world) from creation. This represents the zero point of their prophetic timeline.",
    significance: "Foundation of all prophetic cycles and ages.",
    category: "covenant",
    historicalContext:
      "The Qumran community, called the 'Yahad,' developed this calendar system as their theological framework for understanding cosmic order and divine time.",
    theologicalTheme:
      "Divine Perfection - The number 364 represents perfect cosmic order embodying God's immutable character.",
  },
  {
    id: "2",
    annusMundi: 1948,
    title: "Abraham's Birth",
    summary: "Birth of Abraham, patriarch of faith.",
    description:
      "Abraham was born in 1948 AM. Remarkably, the Jewish nation of Israel was founded in 1948 AD—exactly 4,000 years later—on the Gregorian calendar.",
    significance: "A prophetic parallel linking ancient promise to modern fulfillment.",
    category: "covenant",
    historicalContext:
      "The Essenes viewed Abraham as the first receiver of the covenant promise, marking the beginning of the chosen people.",
    theologicalTheme:
      "Covenant Continuity - The 4,000-year interval reflects the continuous unfolding of God's covenant throughout human history.",
  },
  {
    id: "3",
    annusMundi: 2488,
    title: "Exodus & Mount Sinai",
    summary: "The children of Israel arrive at Mount Sinai.",
    description:
      "The Israelites left Egypt and arrived at Mount Sinai in 2488 AM, where the Torah was given. This marks the establishment of the Law Covenant.",
    significance: "Foundation of the Jewish legal and spiritual tradition, the giving of divine law.",
    category: "covenant",
    historicalContext:
      "The Essenes considered this event the validation of their solar calendar system, as it represented God's ordering of sacred time through Torah.",
    archaeologicalEvidence:
      "The Dead Sea Scrolls (4Q321, 4Q325) contain detailed priestly rotation schedules confirming the importance of this calendar period.",
    theologicalTheme:
      "Sacred Law - The Torah's revelation established the framework for proper observance of sacred time and ritual purity.",
  },
  {
    id: "4",
    annusMundi: 3000,
    title: "First Millennium Cycle",
    summary: "Completion of the first 1,000-year period.",
    description:
      "The Essenes believed in cycles of seven 1,000-year periods, with each thousand years representing a cosmic season. This marks the completion of the first cosmic epoch.",
    category: "restoration",
    historicalContext:
      "The Qumran community developed a sophisticated system of 1,000-year cycles (jubilees of jubilees) as part of their apocalyptic timeline.",
    theologicalTheme:
      "Cosmic Cycles - Each millennium represents a distinct phase in God's unfolding plan for creation and redemption.",
    scholarlyInterpretation:
      "James C. VanderKam notes this calendrical framework was central to Qumran community formation and identity.",
  },
  {
    id: "5",
    annusMundi: 4000,
    title: "Fourth Millennium Begins",
    summary: "Entering the age of the Fourth Thousand.",
    description:
      "The Essenes viewed history in 1,000-year cycles. The fourth millennium represents a transition period toward the end times.",
    category: "judgment",
    historicalContext:
      "By the Second Temple period (250 BCE-68 CE), the Essenes calculated they were in the fourth or fifth millennium, heightening their apocalyptic expectations.",
    archaeologicalEvidence:
      "Pesher Habakkuk (Dead Sea Scroll commentary) documents conflict with the 'Wicked Priest' during this calculated end-times period.",
    theologicalTheme:
      "Judgment Dawning - The transition into later millennia signals the approach of divine judgment and cosmic transformation.",
  },
  {
    id: "6",
    annusMundi: 6000,
    title: "End of Six Thousand Years",
    summary: "Completion of six millennia of human history.",
    description:
      "According to Essene prophecy, the first 6,000 years encompass all human history before the Millennial Reign. This is believed to be near or at the current era.",
    significance: "The transition point to the seventh millennium and the Millennial Reign of Christ.",
    category: "judgment",
    historicalContext:
      "The Book of Jubilees (associated with Essene thought) emphasizes that humanity was granted 6,000 years to work the earth, followed by a Sabbatical rest.",
    theologicalTheme:
      "Sabbatical Principle - Six days of labor followed by one day of rest, applied cosmically to the entire age of humanity.",
    scholarlyInterpretation:
      "The 6,000-year period reflects ancient Jewish cosmology found in rabbinical texts and influenced early Christian calculations (Augustinian timeline).",
  },
  {
    id: "7",
    annusMundi: 6025,
    title: "Tribulation Period",
    summary: "Prophesied tribulation aligned with Jubilee cycles.",
    description:
      "Based on Essene interpretation of the Dead Sea Scrolls, with a Jubilee in 1948 AD (corresponding to 1948 AM), the tribulation is believed to begin in a subsequent Jubilee year around 2025 AD.",
    significance: "Critical prophetic period marked by cosmic and spiritual turmoil according to Isaiah prophecies.",
    category: "judgment",
    historicalContext:
      "The Essenes identified Jubilee years (every 50 years) as spiritually significant transition points. If 1948 marked a Jubilee, 1998 and 2048 would be subsequent Jubilees.",
    theologicalTheme:
      "Purification Through Judgment - The tribulation represents necessary judgment and purification before the restoration of all things.",
    scholarlyInterpretation:
      "Contemporary interpretations connect Essene calendrical calculations with modern Jubilee theology and prophetic timelines.",
  },
  {
    id: "8",
    annusMundi: 6029,
    title: "Asteroid Apophis Event",
    summary: "Potential impact of asteroid Apophis (Wormwood).",
    description:
      'Some Essene interpretations connect the asteroid Apophis to the biblical "Wormwood" prophecy (Revelation 8:11). April 13, 2029 is theorized as a potential impact date within the prophesied tribulation period.',
    significance: "A potential sign of the end times as foretold in the Book of Revelation.",
    category: "judgment",
    historicalContext:
      "The Essenes lived in expectation of cosmic signs and wonders accompanying the end times, consistent with apocalyptic Judaism.",
    theologicalTheme:
      "Cosmic Signs - Celestial events serve as divine markers signaling the progression of God's plan toward completion.",
    scholarlyInterpretation:
      "Modern scholars debate whether ancient calendrical systems intended literal predictions or served primarily as theological frameworks.",
  },
  {
    id: "9",
    annusMundi: 7000,
    title: "Millennial Reign Begins",
    summary: "The seventh thousand years—the Millennial Reign.",
    description:
      "The Essenes prophesied that the final 1,000 years of the first 7,000-year cycle would be the Millennial Reign of Christ, a period of peace, restoration, and divine rule.",
    significance:
      "The ultimate fulfillment of all prophecy, restoration of creation, and eternal peace. The complete Jubilee cycle.",
    category: "millennial",
    historicalContext:
      "The concept of a 1,000-year Sabbath rest reflects the Essene understanding of sacred time, drawing from Torah and prophetic literature.",
    archaeologicalEvidence:
      "Dead Sea Scroll texts describe the 'War of the Sons of Light Against the Sons of Darkness' anticipating this final age.",
    theologicalTheme:
      "Cosmic Restoration - The seventh millennium represents the completion of creation's redemption and the manifestation of God's kingdom.",
    scholarlyInterpretation:
      "This timeline influenced early Christian apocalypticism and provided alternative dating frameworks for New Testament chronology.",
  },
]

export const calendarSystemInfo = {
  structure: {
    title: "364-Day Calendar Structure",
    daysPerYear: 364,
    weeks: 52,
    months: 12,
    monthBreakdown: "8 months of 30 days + 4 months of 31 days",
    seasons: 4,
    daysPerSeason: 91,
    weeksPerSeason: 13,
  },
  mathematical: {
    title: "Mathematical Properties",
    properties: [
      "364 = 7 × 52 (perfect weeks)",
      "364 = 2² × 7 × 13 (prime factorization)",
      "No remainder in weekly calculations",
      "Every date falls on same weekday annually",
      "No leap year system required",
    ],
  },
  astronomical: {
    title: "Astronomical Considerations",
    accuracy: "1.25 days shorter than tropical year (365.2422 days)",
    annualError: "~1.25 days drift per year",
    centennialDrift: "~125 days displacement per 100 years",
    compensation: "Spring equinox may have served as natural correction mechanism",
  },
  festivals: {
    title: "Festival System",
    major: [
      { name: "Passover", date: "Nisan 14", weekday: "Always Wednesday" },
      { name: "Unleavened Bread", date: "Nisan 15-21", weekday: "Culminates Wednesday" },
      { name: "Wheat Festival (Shavuot)", date: "Sivan 15", weekday: "Always Sunday" },
      { name: "New Wine Festival", date: "Av 3", weekday: "Always Sunday (50 days after Shavuot)" },
      { name: "New Oil Festival", date: "Elul 22", weekday: "Always Sunday (50 days after Wine)" },
      { name: "Feast of Trumpets", date: "Tishrei 1", weekday: "Always Wednesday" },
      { name: "Yom Kippur", date: "Tishrei 10", weekday: "Always Friday" },
      { name: "Sukkot", date: "Tishrei 15", weekday: "Always Wednesday" },
    ],
  },
}

export const comparativeCalendars = {
  babylonian: {
    name: "Babylonian Lunar Calendar",
    days: 354,
    system: "19-year Metonic cycle with 235 months and 7 intercalary months",
    characteristics: [
      "Observation-based (new moon sighting)",
      "Required constant human intervention",
      "19-year cycle with mathematical refinement",
    ],
  },
  egyptian: {
    name: "Egyptian Solar Calendar",
    days: 365,
    system: "12 months of 30 days + 5 epagomenal days",
    characteristics: ["Three concurrent systems", "1,460-year Sothic cycle", "Administrative focus"],
  },
  roman: {
    name: "Roman Republican Calendar",
    days: 355,
    system: "Lunar-solar hybrid with political manipulation",
    characteristics: [
      "Pontifical authority controlled adjustments",
      "Julian reform introduced 365.25-day system",
      "Subject to political interference",
    ],
  },
  essene: {
    name: "Essene Solar Calendar",
    days: 364,
    system: "Perfect mathematical harmony without intercalation",
    characteristics: [
      "No human intervention in sacred time",
      "Perfect weekly integration",
      "Mathematical perfection embodied divine order",
    ],
  },
}
