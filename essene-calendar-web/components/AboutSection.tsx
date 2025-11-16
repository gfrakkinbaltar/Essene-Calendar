import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Scroll, Users, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { Streamdown } from 'streamdown';

export default function AboutSection() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Book className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Understanding the Essene Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Historical context and theological significance
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30">
          <TabsTrigger value="overview">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="yahad">
            <Users className="w-4 h-4 mr-2" />
            Yahad
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Scroll className="w-4 h-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="theology">
            <Scroll className="w-4 h-4 mr-2" />
            Theology
          </TabsTrigger>
          <TabsTrigger value="sources">
            <FileText className="w-4 h-4 mr-2" />
            Sources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-4">
          <Streamdown>
{`## The Essene Calendar System

The Essene Calendar represents one of the most fascinating and theologically significant calendrical systems in ancient Judaism. Discovered among the Dead Sea Scrolls at Qumran (1947-1956), this **364-day solar calendar** embodied the community's quest for cosmic perfection, their rejection of lunar-based timekeeping, and their theological stance against the Jerusalem Temple establishment.

### Key Characteristics

The calendar's mathematical precision and astronomical calculations provide crucial insights into Second Temple Jewish sectarianism and the development of early Jewish-Christian traditions:

- **364 days** = 7 × 52 = 2² × 7 × 13 (perfect mathematical structure)
- **52 perfect weeks** with no fractional days
- **4 seasons** of exactly 91 days (13 weeks) each
- **Fixed festival dates** falling on the same day of the week every year
- **No intercalation** required, reflecting divine perfection

### Historical Significance

The calendar was not merely a timekeeping device but a **theological manifesto** expressing the Qumran community's understanding of divine order, cosmic harmony, and sacred time. Its influence extended beyond the Second Temple period, shaping subsequent Jewish and Christian calendrical traditions while providing modern scholars with crucial insights into the complexity and diversity of ancient Jewish religious life.`}
          </Streamdown>
        </TabsContent>
        
        <TabsContent value="yahad" className="mt-6 space-y-4">
          <Streamdown>
{`## The Yahad Community

The Qumran community, calling itself the **"Yahad"** (Hebrew: יחד, "together"), was led by a figure known as the **Teacher of Righteousness** who rejected what he viewed as the "defiled" Temple in Jerusalem.

### Community Identity

The community's extreme reclusiveness and messianic expectations were deeply connected to their calendrical system, which they believed represented **divinely ordained cosmic order**. The Yahad saw themselves as:

- **Sons of Light** in cosmic battle against Sons of Darkness
- **True Israel** maintaining proper covenant observance
- **Final generation** before the Day of YHWH
- **Keepers of sacred knowledge** including the true calendar

### Organization and Life

The community was organized in a hierarchical structure:

- **Priests** (Sons of Zadok) led liturgical functions
- **Levites** assisted in sacred duties
- **Israelites** formed the general membership
- **Council** governed communal affairs

Members lived in **strict discipline** with:

- Common property and shared resources
- Multiple daily ritual immersions (miqva'ot)
- Communal meals with priestly blessings
- Continuous Torah study and prayer
- Rigid adherence to purity laws and calendar

### The Great Calendar Schism

The calendrical dispute between the Qumran community and Jerusalem Temple represented one of the most significant religious divisions in Second Temple Judaism. Different observance dates for the **Day of Atonement** (holiest day) meant mutual rejection of each other's worship, justifying the Yahad's physical separation from Jerusalem.`}
          </Streamdown>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6 space-y-4">
          <Streamdown>
{`## The 364-Day Calendar Structure

### Mathematical Perfection

The Essene calendar was based on a precisely structured 364-day solar year with remarkable mathematical properties:

- **364 = 7 × 52 = 2² × 7 × 13** (prime factorization)
- **12 months**: 8 months of 30 days + 4 months of 31 days
- **Fixed weekly structure**: Every date falls on the same weekday annually
- **Four seasons**: Each 91 days (13 weeks × 7 days)

### The Three Shavuot Festivals

A unique innovation of the Essene calendar was the expansion of the biblical Shavuot (Pentecost) into **three harvest festivals** separated by 50-day intervals:

1. **Festival of New Wheat** (Sivan 15) - Traditional Pentecost
2. **Festival of New Wine** (Av 3) - 50 days after Wheat
3. **Festival of New Oil** (Elul 22) - 50 days after Wine

This **150-day cycle** created a rhythm of covenant renewal and agricultural sanctification, integrating sacred time with the harvest economy.

### Astronomical Issues

The 364-day calendar was mathematically elegant but astronomically problematic:

- **1.25 days shorter** than the actual solar year (365.2422 days)
- **Seasonal drift**: Festivals would drift approximately 1.25 days per year
- **Long-term inaccuracy**: After 100 years, dates would shift by ~125 days
- **No leap year system**: Unlike Egyptian or Babylonian calendars

However, recent research suggests the Essenes may have understood this discrepancy and used the **spring equinox** as a natural correction mechanism.

### Calendar Secrecy

The community guarded calendrical knowledge through:

- **Cryptic scripts** (Cryptic A alphabet) for calendar texts
- **Graduated initiation** with progressive revelation
- **Oaths of secrecy** preventing unauthorized disclosure
- **Limited circulation** marking it as esoteric wisdom`}
          </Streamdown>
        </TabsContent>
        
        <TabsContent value="theology" className="mt-6 space-y-4">
          <Streamdown>
{`## Theological Significance

### Divine Perfection and Holiness

The 364-day calendar embodied fundamental Essene theological principles:

- **Mathematical Perfection**: The number 364 (7 × 52) represented divine order
- **Unchanging Nature**: Eternal consistency reflected God's immutable character
- **Cosmic Harmony**: Calendar structure mirrored celestial mechanics
- **Priestly Authority**: Validated their rejection of Temple calendar system

### Anti-Lunar Polemic

The Essenes explicitly rejected lunar-based calendars as corrupted. From the Book of Jubilees:

> "There will be people who carefully observe the moon... it is corrupt with respect to the seasons" (Jubilees 6:36-37)

Their objections included:

- **Ten-day annual error**: Lunar calendar falls behind solar by ~10 days yearly
- **Sacred-profane mixing**: Lunar calendars cause holy days to coincide with profane times
- **Gentile influence**: Lunar observation associated with pagan practices
- **Human intervention**: Intercalation corrupts divine time with human adjustment

### Apocalyptic Worldview

The calendar served as a **prophetic map** charting the course from creation to eschaton:

- **Jubilee cycles** (49 years) marked prophetic periods
- **Daniel's 70 weeks** (490 years) calculated the end times
- **Era of Wrath** (390 years) from Babylonian exile
- **Final generation** belief that they lived in last days

### Calendar as Identity Marker

For the Yahad, maintaining the correct calendar meant:

- **Participating in cosmic order** aligned with angelic hosts
- **Separating from corruption** of Temple establishment
- **Preparing for eschaton** through proper sacred observance
- **Embodying true Israel** as covenant keepers`}
          </Streamdown>
        </TabsContent>
        
        <TabsContent value="sources" className="mt-6 space-y-4">
          <Streamdown>
{`## Primary Sources and References

### Dead Sea Scrolls Calendrical Texts

Key manuscripts from Qumran caves:

- **4Q320-321 (Mishmarot A & B)**: Priestly courses and lunar-solar alignments
- **4Q324d**: Recently deciphered cryptic script calendar revealing New Wine and Oil festivals
- **4Q325**: Additional calendrical calculations and festival dates
- **Temple Scroll**: Comprehensive festival calendar with three Shavuot festivals
- **Book of Jubilees**: Rewriting of Genesis-Exodus with 364-day calendar framework

### External Validation

Historical sources confirming Essene practices:

- **Josephus**: Jewish historian documenting Essene customs and calendar
- **Philo of Alexandria**: Supporting evidence for solar calendar observance
- **Patristic Sources**: Early Christian awareness of Essene calendrical systems
- **Rabbinic Literature**: Polemical references to sectarian calendar disputes

### Modern Scholarship

Key academic works:

- **Annie Jaubert** (1953): Ancient 364-day calendar predates Essenes, influences Old Testament chronology
- **James C. VanderKam**: Calendar dispute central to Qumran community formation
- **Shemaryahu Talmon**: Anti-lunar polemic defines Essene sectarian identity
- **Jonathan Ben-Dov**: Integration of Mesopotamian astronomical knowledge

### Archaeological Evidence

Material validation from Qumran site:

- **Water purification pools** align with calendrical washing requirements
- **Scriptorium evidence** confirms text production
- **Residential layouts** support communal calendar observance
- **Agricultural installations** validate festival calendar integration

### Resources Provided

This application includes:

- **Video presentation**: "The Essene's Rebel Calendar" (accessible in Resources section)
- **PDF document**: "Essene 364-Day Calendar: Theological & Astronomical Foundations"
- **Comprehensive research**: Synthesized from multiple scholarly sources`}
          </Streamdown>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
