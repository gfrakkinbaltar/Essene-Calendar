"use client"

import { useState } from "react"
import TimelineEvent from "./timeline-event"
import TimelineFilter from "./timeline-filter"
import ResearchPanel from "./research-panel"
import { prophecyEvents, categories } from "@/lib/prophecy-data"

export default function TimelineView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showResearch, setShowResearch] = useState(false)

  const filteredEvents = selectedCategory
    ? prophecyEvents.filter((event) => event.category === selectedCategory)
    : prophecyEvents

  const sortedEvents = [...filteredEvents].sort((a, b) => a.annusMundi - b.annusMundi)

  const timelineStart = sortedEvents[0]?.annusMundi || 0
  const timelineEnd = sortedEvents[sortedEvents.length - 1]?.annusMundi || 7000
  const currentYear = 6025
  const positionPercent = ((currentYear - timelineStart) / (timelineEnd - timelineStart)) * 100

  return (
    <div className="min-h-screen pt-12 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">Essene Calendar</h1>
          <p className="text-lg text-muted-foreground mb-2">A timeline of prophecies spanning 7,000 years</p>
          <p className="text-sm text-muted-foreground">Anno Mundi (in the year of the world)</p>
          <button
            onClick={() => setShowResearch(!showResearch)}
            className="mt-4 px-4 py-2 rounded bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent text-sm font-medium transition-colors"
          >
            {showResearch ? "Hide Research" : "Show Research"}
          </button>
        </div>

        {showResearch && (
          <div className="mb-12 bg-card/30 rounded-lg p-6 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">Essene Calendar Research</h2>
            <ResearchPanel />
          </div>
        )}

        {/* Filter */}
        <TimelineFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-border" />

          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transform"
            style={{ top: `${positionPercent}%` }}
          >
            <div className="flex flex-col items-center gap-2 animate-pulse">
              {/* Outer glow ring */}
              <div className="absolute w-24 h-24 rounded-full border-4 border-primary/40 animate-ping" />
              {/* Main indicator circle */}
              <div className="w-16 h-16 rounded-full bg-primary/80 border-4 border-primary shadow-lg shadow-primary/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-background">YOU</div>
                  <div className="text-xs font-bold text-background leading-tight">ARE</div>
                  <div className="text-xs font-bold text-background leading-tight">HERE</div>
                </div>
              </div>
              {/* Pointer arrow */}
              <div className="text-primary text-3xl font-bold animate-bounce">▼</div>
            </div>
          </div>

          {/* Events */}
          <div className="space-y-8">
            {sortedEvents.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                isExpanded={expandedId === event.id}
                onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4">
          <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{sortedEvents.length}</div>
            <div className="text-sm text-muted-foreground">Key Events</div>
          </div>
          <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">7000</div>
            <div className="text-sm text-muted-foreground">Years Total</div>
          </div>
          <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">364</div>
            <div className="text-sm text-muted-foreground">Days/Year</div>
          </div>
        </div>
      </div>
    </div>
  )
}
