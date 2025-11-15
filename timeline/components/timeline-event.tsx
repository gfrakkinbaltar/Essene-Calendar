"use client"

import { ChevronDown } from "lucide-react"
import type { ProphecyEvent } from "@/lib/prophecy-data"

interface TimelineEventProps {
  event: ProphecyEvent
  index: number
  isExpanded: boolean
  onToggle: () => void
}

export default function TimelineEvent({ event, index, isExpanded, onToggle }: TimelineEventProps) {
  const isEven = index % 2 === 0

  return (
    <div className={`flex gap-8 items-start ${isEven ? "flex-row" : "flex-row-reverse"}`}>
      {/* Content */}
      <div className="flex-1">
        <button onClick={onToggle} className="w-full text-left group">
          <div className="bg-card/40 backdrop-blur border border-border rounded-lg p-6 hover:bg-card/60 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-accent text-sm font-semibold mb-1">{event.annusMundi} AM</div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            <p className="text-muted-foreground text-sm mb-3">{event.summary}</p>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                  event.category === "covenant"
                    ? "bg-chart-1/50 text-chart-1"
                    : event.category === "judgment"
                      ? "bg-destructive/50 text-destructive"
                      : event.category === "restoration"
                        ? "bg-chart-3/50 text-chart-3"
                        : "bg-chart-2/50 text-chart-2"
                }`}
              >
                {event.category}
              </span>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{event.description}</p>
                </div>

                {event.significance && (
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded">
                    <p className="text-accent text-xs font-semibold mb-1">Significance:</p>
                    <p className="text-accent/80 text-sm">{event.significance}</p>
                  </div>
                )}

                {event.theologicalTheme && (
                  <div className="p-3 bg-chart-1/10 border border-chart-1/20 rounded">
                    <p className="text-chart-1 text-xs font-semibold mb-1">Theological Theme:</p>
                    <p className="text-chart-1/80 text-sm">{event.theologicalTheme}</p>
                  </div>
                )}

                {event.historicalContext && (
                  <div className="p-3 bg-chart-2/10 border border-chart-2/20 rounded">
                    <p className="text-chart-2 text-xs font-semibold mb-1">Historical Context:</p>
                    <p className="text-chart-2/80 text-sm">{event.historicalContext}</p>
                  </div>
                )}

                {event.archaeologicalEvidence && (
                  <div className="p-3 bg-chart-3/10 border border-chart-3/20 rounded">
                    <p className="text-chart-3 text-xs font-semibold mb-1">Archaeological Evidence:</p>
                    <p className="text-chart-3/80 text-sm">{event.archaeologicalEvidence}</p>
                  </div>
                )}

                {event.scholarlyInterpretation && (
                  <div className="p-3 bg-muted/30 border border-border/50 rounded">
                    <p className="text-foreground text-xs font-semibold mb-1">Scholarly Interpretation:</p>
                    <p className="text-muted-foreground/80 text-sm">{event.scholarlyInterpretation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 z-10 ${
            event.category === "covenant"
              ? "bg-chart-1 border-chart-1"
              : event.category === "judgment"
                ? "bg-destructive border-destructive"
                : event.category === "restoration"
                  ? "bg-chart-3 border-chart-3"
                  : "bg-chart-2 border-chart-2"
          }`}
        />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1" />
    </div>
  )
}
