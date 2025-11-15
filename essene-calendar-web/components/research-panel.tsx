"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { calendarSystemInfo, comparativeCalendars } from "@/lib/prophecy-data"

export default function ResearchPanel() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* Calendar Structure */}
      <ResearchSection
        id="structure"
        title="Calendar Structure"
        expanded={expandedSection === "structure"}
        onToggle={() => setExpandedSection(expandedSection === "structure" ? null : "structure")}
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-accent font-semibold">{calendarSystemInfo.structure.daysPerYear} Days/Year</p>
            <p className="text-muted-foreground">{calendarSystemInfo.structure.weeks} Perfect Weeks</p>
          </div>
          <div>
            <p className="text-accent font-semibold">{calendarSystemInfo.structure.months} Months</p>
            <p className="text-muted-foreground">{calendarSystemInfo.structure.monthBreakdown}</p>
          </div>
          <div>
            <p className="text-accent font-semibold">{calendarSystemInfo.structure.seasons} Seasons</p>
            <p className="text-muted-foreground">{calendarSystemInfo.structure.daysPerSeason} Days Each</p>
          </div>
          <div>
            <p className="text-accent font-semibold">Fixed Weekdays</p>
            <p className="text-muted-foreground">Every date consistent</p>
          </div>
        </div>
      </ResearchSection>

      {/* Mathematical Properties */}
      <ResearchSection
        id="mathematical"
        title="Mathematical Properties"
        expanded={expandedSection === "mathematical"}
        onToggle={() => setExpandedSection(expandedSection === "mathematical" ? null : "mathematical")}
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          {calendarSystemInfo.mathematical.properties.map((prop, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent font-bold">→</span>
              <span>{prop}</span>
            </li>
          ))}
        </ul>
      </ResearchSection>

      {/* Festivals */}
      <ResearchSection
        id="festivals"
        title="Festival System"
        expanded={expandedSection === "festivals"}
        onToggle={() => setExpandedSection(expandedSection === "festivals" ? null : "festivals")}
      >
        <div className="space-y-2 text-sm">
          {calendarSystemInfo.festivals.major.map((festival, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-accent font-semibold">{festival.name}</span>
              <div className="text-right">
                <p className="text-muted-foreground text-xs">{festival.date}</p>
                <p className="text-muted-foreground/70 text-xs">{festival.weekday}</p>
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* Comparative Calendars */}
      <ResearchSection
        id="comparative"
        title="Comparative Calendar Systems"
        expanded={expandedSection === "comparative"}
        onToggle={() => setExpandedSection(expandedSection === "comparative" ? null : "comparative")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(comparativeCalendars).map(([key, cal]) => (
            <div key={key} className="p-3 bg-card/20 border border-border rounded">
              <p className="text-accent font-semibold text-sm mb-1">{cal.name}</p>
              <p className="text-muted-foreground text-xs mb-2">
                {cal.days} days | {cal.system}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {cal.characteristics.map((char, i) => (
                  <li key={i}>• {char}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResearchSection>
    </div>
  )
}

function ResearchSection({
  id,
  title,
  expanded,
  onToggle,
  children,
}: {
  id: string
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <button onClick={onToggle} className="w-full text-left group">
      <div className="bg-card/40 backdrop-blur border border-border rounded-lg p-4 hover:bg-card/60 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{title}</h3>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        {expanded && <div className="mt-4 pt-4 border-t border-border">{children}</div>}
      </div>
    </button>
  )
}
