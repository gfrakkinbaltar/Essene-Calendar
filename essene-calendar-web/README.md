# Essene Calendar Web Application

A modern, interactive web application implementing the ancient 364-day solar calendar used by the Essenes, the Jewish sect that wrote the Dead Sea Scrolls.

## Features

- **Interactive Calendar**: Navigate months and years with festival, Sabbath, and seasonal transition highlighting
- **Prophecy Timeline**: Explore prophetic events from Creation to the Millennial Reign
- **Date Converter**: Convert between Gregorian and Essene calendar systems
- **Festival Calendar**: Complete listings of all biblical festivals
- **Demo Page**: Interactive showcase of all features

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling matching GAI7US brand
- **Lucide React**: Beautiful icons
- **Date-fns**: Date manipulation utilities

## Color Palette

Matches GAI7US brand standards:
- Background: `#0a0a0a` (deep black)
- Foreground: `#fafafa` (pure white)
- Accent: `#c87a4d` (subtle orange)
- Card: `#1a1a1a` (slightly lighter black)

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel with one click or use any Next.js-compatible hosting platform.

## Project Structure

```
essene-calendar-web/
├── app/
│   ├── calendar/         # Interactive calendar view
│   ├── timeline/         # Prophecy timeline
│   ├── converter/        # Date conversion tools
│   ├── festivals/        # Festival calendar
│   ├── demo/             # Demo/showcase page
│   ├── layout.tsx        # Root layout with navigation
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   └── timeline-*        # Timeline-specific components
├── lib/
│   ├── calendar-logic.ts # Core calendar calculations
│   ├── prophecy-data.ts  # Timeline event data
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Calendar Logic

The Essene calendar system:
- **364 days** per year (52 perfect weeks)
- **12 months**: 8 of 30 days, 4 of 31 days
- **Year begins**: First Wednesday on or after Vernal Equinox
- **No lunar observations**: Purely solar-based
- **Perfect festival alignment**: Every date falls on same weekday annually

## Historical Context

Based on scholarly research of the Dead Sea Scrolls:
- Primary sources: Dead Sea Scroll 4Q324d, Book of Jubilees, 1 Enoch
- Archaeological evidence from Qumran excavations (1951-2004)
- Modern analysis by VanderKam, Wise, Tabor, and others

## License

MIT License - Educational and research tool

## Author

Part of the GAI7US portfolio - Excellence in design and development.
