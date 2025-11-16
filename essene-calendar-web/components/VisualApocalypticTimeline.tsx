import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ZoomIn,
  ZoomOut,
  Filter,
  Info,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import {
  PROPHETIC_TIMELINE,
  PROPHECY_TYPES,
  HISTORICAL_ERAS,
  IMPORTANCE_LEVELS,
  type PropheticEvent,
} from '@/lib/enhancedTimelineData';
import {
  EVENT_RELATIONSHIPS,
  RELATIONSHIP_DESCRIPTIONS,
  TIMELINE_POSITIONS,
  normalizeTimelinePosition,
  getEventRelationships,
  type EventRelationship,
} from '@/lib/timelineRelationships';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TIMELINE_HEIGHT = 800;
const SVG_WIDTH = 1400;
const SVG_HEIGHT = 1000;
const PADDING = 60;

export default function VisualApocalypticTimeline() {
  const [zoom, setZoom] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRelationshipType, setSelectedRelationshipType] = useState<
    EventRelationship['relationshipType'] | null
  >(null);
  const [highlightedEventIds, setHighlightedEventIds] = useState<Set<string>>(
    new Set()
  );

  // Calculate timeline bounds
  const timelineYears = Object.values(TIMELINE_POSITIONS);
  const minYear = Math.min(...timelineYears);
  const maxYear = Math.max(...timelineYears);

  // Normalize positions for SVG
  const eventPositions = useMemo(() => {
    const positions: Record<
      string,
      { x: number; y: number; event: PropheticEvent }
    > = {};

    PROPHETIC_TIMELINE.forEach((event, index) => {
      const year = TIMELINE_POSITIONS[event.id] || 0;
      const x = normalizeTimelinePosition(
        year,
        minYear,
        maxYear,
        SVG_WIDTH - 2 * PADDING
      );
      const y = PADDING + (index % 2) * 400 + Math.floor(index / 2) * 80;

      positions[event.id] = {
        x: x + PADDING,
        y: Math.min(y, SVG_HEIGHT - 100),
        event,
      };
    });

    return positions;
  }, []);

  // Handle event selection and highlighting
  const handleEventClick = (eventId: string) => {
    setSelectedEventId(selectedEventId === eventId ? null : eventId);

    // Highlight connected events
    const relationships = getEventRelationships(eventId);
    const connected = new Set<string>([eventId]);
    relationships.forEach(rel => {
      connected.add(rel.fromEventId);
      connected.add(rel.toEventId);
    });
    setHighlightedEventIds(connected);
  };

  const handleRelationshipFilter = (
    type: EventRelationship['relationshipType'] | null
  ) => {
    setSelectedRelationshipType(
      selectedRelationshipType === type ? null : type
    );
  };

  // Filter relationships based on selection
  const visibleRelationships = useMemo(() => {
    let filtered = EVENT_RELATIONSHIPS;

    if (selectedEventId) {
      filtered = filtered.filter(
        rel =>
          rel.fromEventId === selectedEventId ||
          rel.toEventId === selectedEventId
      );
    }

    if (selectedRelationshipType) {
      filtered = filtered.filter(
        rel => rel.relationshipType === selectedRelationshipType
      );
    }

    return filtered;
  }, [selectedEventId, selectedRelationshipType]);

  // Get selected event details
  const selectedEvent = selectedEventId
    ? PROPHETIC_TIMELINE.find(e => e.id === selectedEventId)
    : null;

  const selectedEventRelationships = selectedEventId
    ? getEventRelationships(selectedEventId)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Visual Apocalyptic Timeline
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore the interconnected prophetic events spanning from creation to eschaton. 
              Click on events to see their relationships and connections. The timeline shows 
              causal chains, fulfillments, and parallel prophecies that shaped Essene expectations.
            </p>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="p-4 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Relationship Type Filter
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 rounded-lg bg-muted/20 border border-border hover:border-primary/50 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 rounded-lg bg-muted/20 border border-border hover:border-primary/50 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(RELATIONSHIP_DESCRIPTIONS).map(([type, desc]) => (
              <button
                key={type}
                onClick={() =>
                  handleRelationshipFilter(
                    type as EventRelationship['relationshipType']
                  )
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedRelationshipType === type
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: desc.color }}
                />
                {desc.label}
              </button>
            ))}
          </div>

          {(selectedEventId || selectedRelationshipType) && (
            <button
              onClick={() => {
                setSelectedEventId(null);
                setSelectedRelationshipType(null);
                setHighlightedEventIds(new Set());
              }}
              className="w-full px-4 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground hover:bg-muted/40 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </Card>

      {/* SVG Timeline Visualization */}
      <Card className="p-4 bg-card border-border overflow-auto">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
          <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            className="bg-muted/5 rounded-lg border border-border/50"
          >
            {/* Timeline axis */}
            <line
              x1={PADDING}
              y1={TIMELINE_HEIGHT / 2}
              x2={SVG_WIDTH - PADDING}
              y2={TIMELINE_HEIGHT / 2}
              stroke="#FFD700"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Era markers */}
            {Object.entries(HISTORICAL_ERAS).map(([era, eraData]) => {
              const eraEvents = PROPHETIC_TIMELINE.filter(e => e.era === era);
              if (eraEvents.length === 0) return null;

              const eraYears = eraEvents
                .map(e => TIMELINE_POSITIONS[e.id] || 0)
                .filter(y => y !== 0);
              if (eraYears.length === 0) return null;

              const minEraYear = Math.min(...eraYears);
              const maxEraYear = Math.max(...eraYears);

              const x1 = normalizeTimelinePosition(
                minEraYear,
                minYear,
                maxYear,
                SVG_WIDTH - 2 * PADDING
              );
              const x2 = normalizeTimelinePosition(
                maxEraYear,
                minYear,
                maxYear,
                SVG_WIDTH - 2 * PADDING
              );

              return (
                <g key={era}>
                  <rect
                    x={x1 + PADDING}
                    y={TIMELINE_HEIGHT / 2 - 20}
                    width={Math.max(x2 - x1, 20)}
                    height="40"
                    fill={eraData.color}
                    opacity="0.1"
                  />
                  <text
                    x={x1 + PADDING + (x2 - x1) / 2}
                    y={TIMELINE_HEIGHT / 2 - 25}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#999"
                    opacity="0.6"
                  >
                    {eraData.label}
                  </text>
                </g>
              );
            })}

            {/* Relationship connections */}
            {visibleRelationships.map(rel => {
              const fromPos = eventPositions[rel.fromEventId];
              const toPos = eventPositions[rel.toEventId];

              if (!fromPos || !toPos) return null;

              const isHighlighted =
                highlightedEventIds.has(rel.fromEventId) ||
                highlightedEventIds.has(rel.toEventId);

              return (
                <g key={`${rel.fromEventId}-${rel.toEventId}`}>
                  <path
                    d={`M ${fromPos.x} ${fromPos.y} Q ${(fromPos.x + toPos.x) / 2} ${Math.min(fromPos.y, toPos.y) - 100} ${toPos.x} ${toPos.y}`}
                    stroke={RELATIONSHIP_DESCRIPTIONS[rel.relationshipType].color}
                    strokeWidth={isHighlighted ? 3 : 1.5}
                    fill="none"
                    opacity={isHighlighted ? 0.8 : 0.3}
                    strokeDasharray={
                      rel.relationshipType === 'foreshadowing' ? '5,5' : 'none'
                    }
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${toPos.x},${toPos.y} ${toPos.x - 8},${toPos.y - 6} ${toPos.x - 8},${toPos.y + 6}`}
                    fill={RELATIONSHIP_DESCRIPTIONS[rel.relationshipType].color}
                    opacity={isHighlighted ? 0.8 : 0.3}
                  />
                </g>
              );
            })}

            {/* Event nodes */}
            {PROPHETIC_TIMELINE.map(event => {
              const pos = eventPositions[event.id];
              if (!pos) return null;

              const isSelected = selectedEventId === event.id;
              const isHighlighted = highlightedEventIds.has(event.id);
              const radius = isSelected ? 12 : isHighlighted ? 10 : 8;

              return (
                <g
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Glow effect for selected */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={radius + 6}
                      fill={PROPHECY_TYPES[event.prophecyTypes[0]].color}
                      opacity="0.2"
                    />
                  )}

                  {/* Main node */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius}
                    fill={PROPHECY_TYPES[event.prophecyTypes[0]].color}
                    stroke={
                      event.importance === 'critical'
                        ? '#FFD700'
                        : event.importance === 'major'
                          ? '#FF8C00'
                          : '#999'
                    }
                    strokeWidth={isSelected ? 3 : 2}
                    opacity={
                      !selectedEventId || isHighlighted ? 1 : 0.4
                    }
                  />

                  {/* Label */}
                  <text
                    x={pos.x}
                    y={pos.y + radius + 20}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#E0E0E0"
                    opacity={!selectedEventId || isHighlighted ? 1 : 0.4}
                    className="pointer-events-none"
                  >
                    {event.title.substring(0, 20)}
                  </text>

                  {/* Year label */}
                  <text
                    x={pos.x}
                    y={pos.y + radius + 35}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#999"
                    opacity={!selectedEventId || isHighlighted ? 0.7 : 0.3}
                    className="pointer-events-none"
                  >
                    {TIMELINE_POSITIONS[event.id]} BCE/CE
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      {/* Selected Event Details */}
      {selectedEvent && (
        <Card className="p-6 bg-primary/5 border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {selectedEvent.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedEventId(null);
                  setHighlightedEventIds(new Set());
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Event metadata */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">Era</p>
                <Badge variant="outline" className="bg-muted/20 border-border">
                  {HISTORICAL_ERAS[selectedEvent.era].label}
                </Badge>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Importance</p>
                <Badge
                  variant="outline"
                  className="bg-muted/20 border-border"
                  style={{
                    backgroundColor: `${IMPORTANCE_LEVELS[selectedEvent.importance].color}20`,
                    borderColor: IMPORTANCE_LEVELS[selectedEvent.importance].color,
                    color: IMPORTANCE_LEVELS[selectedEvent.importance].color,
                  }}
                >
                  {IMPORTANCE_LEVELS[selectedEvent.importance].label}
                </Badge>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Prophecy Types</p>
                <div className="flex flex-wrap gap-1">
                  {selectedEvent.prophecyTypes.map(type => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="text-xs"
                    >
                      {PROPHECY_TYPES[type].label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Relationships */}
            {selectedEventRelationships.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Connected Events ({selectedEventRelationships.length})
                </h4>
                <div className="space-y-2">
                  {selectedEventRelationships.map(rel => {
                    const otherEventId =
                      rel.fromEventId === selectedEventId
                        ? rel.toEventId
                        : rel.fromEventId;
                    const otherEvent = PROPHETIC_TIMELINE.find(
                      e => e.id === otherEventId
                    );

                    if (!otherEvent) return null;

                    const isFrom = rel.fromEventId === selectedEventId;

                    return (
                      <div
                        key={`${rel.fromEventId}-${rel.toEventId}`}
                        className="p-3 bg-muted/20 border border-border rounded-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              backgroundColor:
                                RELATIONSHIP_DESCRIPTIONS[rel.relationshipType]
                                  .color,
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">
                              {isFrom ? '→' : '←'}{' '}
                              {RELATIONSHIP_DESCRIPTIONS[rel.relationshipType].label}:{' '}
                              {otherEvent.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {rel.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs flex-shrink-0"
                          >
                            {rel.strength}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Legend */}
      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Legend</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-3">Relationship Types</p>
            <div className="space-y-2">
              {Object.entries(RELATIONSHIP_DESCRIPTIONS).map(([type, desc]) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: desc.color }}
                  />
                  <span className="text-muted-foreground">{desc.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Event Importance</p>
            <div className="space-y-2">
              {(['critical', 'major', 'minor'] as const).map(importance => (
                <div key={importance} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: IMPORTANCE_LEVELS[importance].color,
                    }}
                  />
                  <span className="text-muted-foreground">
                    {IMPORTANCE_LEVELS[importance].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
