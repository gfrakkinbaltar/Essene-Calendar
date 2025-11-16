import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Filter,
  Clock,
  AlertCircle,
  Star,
  BookOpen,
  Zap,
} from 'lucide-react';
import {
  PROPHETIC_TIMELINE,
  PROPHECY_TYPES,
  HISTORICAL_ERAS,
  IMPORTANCE_LEVELS,
  applyFilters,
  searchTimeline,
  getProphecyTypes,
  getHistoricalEras,
  type ProphecyType,
  type HistoricalEra,
  type EschatologicalImportance,
} from '@/lib/enhancedTimelineData';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function EnhancedTimeline() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProphecyTypes, setSelectedProphecyTypes] = useState<ProphecyType[]>([]);
  const [selectedEras, setSelectedEras] = useState<HistoricalEra[]>([]);
  const [selectedImportance, setSelectedImportance] = useState<EschatologicalImportance[]>([]);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const allProphecyTypes = getProphecyTypes();
  const allEras = getHistoricalEras();

  // Apply filters and search
  const filteredEvents = useMemo(() => {
    let events = applyFilters(
      selectedProphecyTypes.length > 0 ? selectedProphecyTypes : undefined,
      selectedEras.length > 0 ? selectedEras : undefined,
      selectedImportance.length > 0 ? selectedImportance : undefined
    );

    if (searchQuery) {
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.some(detail =>
          detail.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return events;
  }, [selectedProphecyTypes, selectedEras, selectedImportance, searchQuery]);

  const toggleProphecyType = (type: ProphecyType) => {
    setSelectedProphecyTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleEra = (era: HistoricalEra) => {
    setSelectedEras(prev =>
      prev.includes(era)
        ? prev.filter(e => e !== era)
        : [...prev, era]
    );
  };

  const toggleImportance = (importance: EschatologicalImportance) => {
    setSelectedImportance(prev =>
      prev.includes(importance)
        ? prev.filter(i => i !== importance)
        : [...prev, importance]
    );
  };

  const clearAllFilters = () => {
    setSelectedProphecyTypes([]);
    setSelectedEras([]);
    setSelectedImportance([]);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedProphecyTypes.length > 0 ||
    selectedEras.length > 0 ||
    selectedImportance.length > 0 ||
    searchQuery.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Prophetic Timeline Explorer
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore the Essene apocalyptic worldview through an interactive timeline spanning from creation to eschaton. 
              Filter by prophecy type, historical era, and eschatological importance to discover the theological framework 
              that guided the Qumran community.
            </p>
          </div>
        </div>
      </Card>

      {/* Search Bar */}
      <Card className="p-4 bg-card border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search prophecies, events, or themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/20 border-border"
          />
        </div>
      </Card>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Prophecy Type Filters */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Prophecy Type</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allProphecyTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleProphecyType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedProphecyTypes.includes(type)
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: PROPHECY_TYPES[type].color }}
                />
                {PROPHECY_TYPES[type].label}
              </button>
            ))}
          </div>
        </Card>

        {/* Historical Era Filters */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Historical Era</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allEras.map(era => (
              <button
                key={era}
                onClick={() => toggleEra(era)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedEras.includes(era)
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                }`}
              >
                {HISTORICAL_ERAS[era].label}
              </button>
            ))}
          </div>
        </Card>

        {/* Eschatological Importance Filters */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Eschatological Importance</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['critical', 'major', 'minor'] as const).map(importance => (
              <button
                key={importance}
                onClick={() => toggleImportance(importance)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedImportance.includes(importance)
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: IMPORTANCE_LEVELS[importance].color }}
                />
                {IMPORTANCE_LEVELS[importance].label}
              </button>
            ))}
          </div>
        </Card>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground hover:bg-muted/40 transition-colors"
          >
            Clear All Filters ({filteredEvents.length} results)
          </button>
        )}
      </div>

      {/* Results Summary */}
      <Card className="p-4 bg-primary/5 border-primary/30">
        <p className="text-sm text-foreground">
          Showing <strong>{filteredEvents.length}</strong> of <strong>{PROPHETIC_TIMELINE.length}</strong> prophetic events
          {hasActiveFilters && ' (filtered)'}
        </p>
      </Card>

      {/* Timeline Events */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="p-4 bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() =>
                  setExpandedEventId(
                    expandedEventId === event.id ? null : event.id
                  )
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: HISTORICAL_ERAS[event.era].color,
                        }}
                      />
                      <h3 className="font-semibold text-foreground">
                        {event.title}
                      </h3>
                      {event.importance === 'critical' && (
                        <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {event.prophecyTypes.map(type => (
                        <Badge
                          key={type}
                          variant="outline"
                          className="bg-muted/20 border-border text-xs"
                        >
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mr-1"
                            style={{ backgroundColor: PROPHECY_TYPES[type].color }}
                          />
                          {PROPHECY_TYPES[type].label}
                        </Badge>
                      ))}
                      <Badge
                        variant="outline"
                        className="bg-muted/20 border-border text-xs"
                      >
                        {HISTORICAL_ERAS[event.era].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-muted/20 border-border text-xs"
                        style={{
                          backgroundColor: `${IMPORTANCE_LEVELS[event.importance].color}20`,
                          borderColor: IMPORTANCE_LEVELS[event.importance].color,
                          color: IMPORTANCE_LEVELS[event.importance].color,
                        }}
                      >
                        {IMPORTANCE_LEVELS[event.importance].label}
                      </Badge>
                    </div>

                    {event.yearRange && (
                      <p className="text-xs text-muted-foreground">
                        <strong>Period:</strong> {event.yearRange[0]} - {event.yearRange[1]} BCE
                      </p>
                    )}
                  </div>

                  <div className="text-muted-foreground flex-shrink-0">
                    {expandedEventId === event.id ? '▼' : '▶'}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedEventId === event.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-2">
                        Details
                      </h4>
                      <ul className="space-y-1">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {event.biblicalReferences.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">
                          Biblical References
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.biblicalReferences.map((ref, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {ref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.deadSeaScrollReferences &&
                      event.deadSeaScrollReferences.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">
                            Dead Sea Scrolls References
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {event.deadSeaScrollReferences.map((ref, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-primary/10 border-primary/30 text-xs"
                              >
                                {ref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {event.cosmicSignificance && (
                      <div className="p-3 bg-primary/5 border border-primary/30 rounded-lg">
                        <p className="text-sm text-foreground">
                          <strong>Cosmic Significance:</strong> {event.cosmicSignificance}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-8 bg-card border-border text-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                No events match your filters. Try adjusting your search criteria.
              </p>
            </Card>
          )}
        </div>
      </ScrollArea>

      {/* Legend */}
      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-3">Legend</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-2">Prophecy Types</p>
            <div className="space-y-1">
              {allProphecyTypes.slice(0, 4).map(type => (
                <div key={type} className="flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: PROPHECY_TYPES[type].color }}
                  />
                  <span className="text-muted-foreground">
                    {PROPHECY_TYPES[type].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Importance Levels</p>
            <div className="space-y-1">
              {(['critical', 'major', 'minor'] as const).map(importance => (
                <div key={importance} className="flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
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
