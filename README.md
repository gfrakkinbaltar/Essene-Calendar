# Essene Calendar - Ancient Hebrew Solar Calendar

A comprehensive standalone Linux application implementing the 364-day solar calendar used by the Essenes, the ancient Jewish sect that wrote the Dead Sea Scrolls.

![Essene Calendar Screenshot](screenshot.png)

## Overview

The Essene Calendar is based on the calendar system discovered in the Dead Sea Scrolls at Qumran. Unlike the lunar calendar used by mainstream Judaism, the Essenes followed a purely solar calendar with exactly 364 days, divided into 52 perfect weeks.

## Historical Background

The Essenes were an ancient Jewish sect that lived in the Judean Desert near the Dead Sea from approximately 150 BCE to 70 CE. They wrote the famous Dead Sea Scrolls, which included detailed calendrical texts describing their unique 364-day solar calendar system.

Key historical points:
- **Dead Sea Scrolls**: Over 900 manuscripts discovered between 1946-1956
- **Qumran Community**: The Essenes who wrote the scrolls lived at Khirbet Qumran
- **Calendar Controversy**: Different Jewish groups (Pharisees, Sadducees, Essenes) used different calendars
- **Solar vs Lunar**: While others used lunar calendars, Essenes used a fixed solar calendar

## Calendar Features

### Structure
- **364 days per year** (52 weeks exactly)
- **12 months**: 8 months of 30 days, 4 months of 31 days
- **Extended months**: Months 3, 6, 9, and 12 have 31 days (seasonal transitions)
- **4 seasons** of exactly 91 days (13 weeks) each
- **Fixed calendar**: Every date falls on the same weekday every year

### Unique Characteristics
- **Year begins**: Always on Wednesday after the Vernal Equinox
- **No lunar observations**: Completely solar-based system
- **Perfect weeks**: Exactly 52 weeks with no partial weeks
- **Seasonal transitions**: Special days (Tekufah) mark season changes
- **Festival consistency**: All festivals fall on the same weekday annually

### Month Names
The calendar uses traditional Hebrew month names:
1. **Nisan** (30 days) - Spring
2. **Iyyar** (30 days)
3. **Sivan** (31 days) - includes Tekufah (Summer transition)
4. **Tammuz** (30 days)
5. **Av** (30 days)
6. **Elul** (31 days) - includes Tekufah (Autumn transition)
7. **Tishrei** (30 days) - Autumn
8. **Marcheshvan** (30 days)
9. **Kislev** (31 days) - includes Tekufah (Winter transition)
10. **Tevet** (30 days)
11. **Shevat** (30 days)
12. **Adar** (31 days) - includes Tekufah (Spring transition)

### Biblical Festivals
All festivals fall on consistent weekdays:

**Major Festivals (Wednesdays):**
- **Passover** (Nisan 14)
- **Last Day of Unleavened Bread** (Nisan 21)
- **Feast of Trumpets** (Tishrei 1)
- **Sukkot/Feast of Tabernacles** (Tishrei 15)
- **Last Day of Sukkot** (Tishrei 22)

**Special Festivals:**
- **Yom Kippur** (Tishrei 10) - Always Friday
- **Shavuot/Feast of Weeks** (Sivan 15) - Always Sunday
- **Festival of New Wine** (Sivan 22) - Always Sunday
- **Festival of New Oil** (Av 3) - Always Sunday

**Seasonal Transitions (Tekufah):**
- **Summer Transition** (Sivan 31)
- **Autumn Transition** (Elul 31)
- **Winter Transition** (Kislev 31)
- **Spring Transition** (Adar 31)

## Application Features

### Main Calendar View
- **Monthly calendar grid** with proper day-of-week alignment
- **Festival highlighting** with gold background for festival days
- **Sabbath indication** with gray background for Saturdays
- **Current day highlighting** with green background
- **Navigation controls** for months and years
- **"Today" button** to quickly return to current date

### Information Panels
- **Selected date details** including Essene and Gregorian dates
- **Day of week information**
- **Festival identification** for special days
- **Calendar system statistics** and information

### Festival Calendar
- **Complete annual festival list** in chronological order
- **Day-of-week consistency** showing the fixed nature of festivals
- **Gregorian date equivalents** for each festival

### Date Conversion Tools
- **Gregorian to Essene** date conversion
- **Essene to Gregorian** date conversion
- **Accurate calculations** based on historical research
- **Error handling** for invalid dates

### Export Functionality
- **Full year export** to text file
- **Day-by-day listings** with Gregorian equivalents
- **Festival annotations** included in export
- **Formatted output** suitable for printing or reference

## Installation

### Quick Installation

1. **Download the files**:
   ```bash
   # All files should be in the same directory
   ls -la
   # essene_calendar.py
   # essene-calendar.desktop  
   # install_essene_calendar.sh
   # README.md
   ```

2. **Make installation script executable**:
   ```bash
   chmod +x install_essene_calendar.sh
   ```

3. **Run installation**:
   ```bash
   # For current user only (recommended)
   ./install_essene_calendar.sh
   
   # For system-wide installation (requires sudo)
   sudo ./install_essene_calendar.sh
   ```

### Manual Installation

If you prefer to install manually:

1. **Install dependencies**:
   ```bash
   # Ubuntu/Debian
   sudo apt install python3-tk
   
   # Fedora/RHEL
   sudo dnf install python3-tkinter
   
   # Arch Linux
   sudo pacman -S tk
   ```

2. **Copy files**:
   ```bash
   # Copy to local bin directory
   mkdir -p ~/.local/bin
   cp essene_calendar.py ~/.local/bin/
   chmod +x ~/.local/bin/essene_calendar.py
   
   # Copy desktop entry
   mkdir -p ~/.local/share/applications
   cp essene-calendar.desktop ~/.local/share/applications/
   
   # Update desktop entry path
   sed -i "s|%h|$HOME/.local/bin|g" ~/.local/share/applications/essene-calendar.desktop
   ```

3. **Update desktop database**:
   ```bash
   update-desktop-database ~/.local/share/applications/
   ```

### Dependencies

- **Python 3.6+** (standard on most Linux distributions)
- **Tkinter** (GUI toolkit) - usually `python3-tk` package
- **Standard Python libraries**: datetime, calendar, json, os

## Usage

### Running the Application

After installation, you can run the application in several ways:

1. **From application menu**: Look for "Essene Calendar" in Office or Education category
2. **From command line**: `python3 ~/.local/bin/essene_calendar.py`
3. **Direct execution**: `essene_calendar.py` (if ~/.local/bin is in PATH)

### Navigation

- **◄◄ / ►►**: Navigate years
- **◄ / ►**: Navigate months  
- **Today**: Jump to current date
- **Click on dates**: Select specific days for details

### Date Conversion

1. **Gregorian to Essene**: Enter date as YYYY-MM-DD format
2. **Essene to Gregorian**: Enter date as YYYY-MM-DD format using Essene calendar
3. **Click Convert**: Results show in both calendar systems

### Export Calendar

1. **File → Export Calendar**
2. **Choose filename and location**
3. **Save**: Creates formatted text file with complete year

## Technical Details

### Calendar Calculations

The application uses historically accurate calculations based on:

- **Vernal Equinox**: Approximately March 20th each year
- **Year Start**: First Wednesday on or after the Vernal Equinox
- **Month Structure**: Fixed 30/31 day pattern
- **Festival Dates**: Based on Dead Sea Scroll evidence

### Date Range

- **Supported years**: Approximately 5775-5835 (Hebrew calendar equivalent)
- **Gregorian equivalent**: Roughly 2015-2075
- **Calculation method**: Based on astronomical vernal equinox

### Accuracy Notes

- The 364-day year loses approximately 1.24 days per solar year
- No leap year corrections (historically accurate to Essene practice)
- Vernal equinox calculations are approximate
- Festival dates match Dead Sea Scroll specifications

## Historical Sources

This application is based on scholarly research of the Dead Sea Scrolls:

### Primary Sources
- **Dead Sea Scroll 4Q324d**: Calendrical text in cryptic script
- **Book of Jubilees**: Ancient text describing 364-day calendar
- **1 Enoch**: Astronomical book with calendar details
- **Temple Scroll**: Festival and calendar regulations

### Scholarly References
- Ratson, E. & Ben-Dov, J. (2017). "A Newly Reconstructed Calendrical Scroll from Qumran"
- VanderKam, J.C. "Calendars in the Dead Sea Scrolls"
- Wise, M.O. "Thunder in Gemini and Other Essays"
- Tabor, J.D. "Understanding the Essene/Dead Sea Scroll Calendar"

### Archaeological Evidence
- **Qumran excavations** (1951-1956, 1993-2004)
- **Cave discoveries** at Khirbet Qumran
- **Manuscript analysis** of calendrical texts
- **Cryptic script decipherment** (2017)

## Educational Value

This application serves as an educational tool for:

### Historical Studies
- **Ancient Judaism** and sectarian differences
- **Dead Sea Scroll** research and discoveries
- **Calendar systems** in antiquity
- **Qumran community** life and practices

### Religious Studies
- **Biblical festivals** and their timing
- **Hebrew calendar** alternatives
- **Sectarian Judaism** in the Second Temple period
- **Messianic expectations** and calendar symbolism

### Archaeological Research
- **Manuscript studies** and textual analysis
- **Ancient scribal practices** and cryptic writing
- **Community organization** at Qumran
- **Historical chronology** and dating systems

## Troubleshooting

### Common Issues

**Application won't start:**
- Check Python 3 installation: `python3 --version`
- Install tkinter: `sudo apt install python3-tk`
- Check file permissions: `chmod +x essene_calendar.py`

**Missing from application menu:**
- Update desktop database: `update-desktop-database ~/.local/share/applications/`
- Check desktop file location: `~/.local/share/applications/essene-calendar.desktop`
- Log out and log back in

**Date conversion errors:**
- Use correct format: YYYY-MM-DD
- Check date range: roughly 2015-2075 supported
- Verify Essene dates: months 1-12, days within month limits

### Getting Help

For technical issues:
1. Check the error message carefully
2. Verify all dependencies are installed
3. Try running from command line to see error output
4. Check file permissions and paths

## License

This application is released under the MIT License. You are free to use, modify, and distribute it according to the license terms.

## Contributing

Contributions are welcome! Areas for improvement:

- **Extended date range** calculations
- **Additional festival** integration
- **Multi-language support**
- **Enhanced export formats** (PDF, HTML)
- **Calendar printing** functionality
- **Astronomical accuracy** improvements

## Author

Created as an educational and research tool for studying the ancient Essene calendar system based on Dead Sea Scroll discoveries.

---

*"The Essenes designed a calendar that spanned a precise period of 364 days each year, corresponding seamlessly with a sequence of 52 weeks."* - Dead Sea Scroll Research