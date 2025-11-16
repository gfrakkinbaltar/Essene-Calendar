import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Filter,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
} from 'lucide-react';
import {
  OLD_TESTAMENT_PROPHECIES,
  ESSENE_FULFILLMENTS,
  getFulfillmentsByProphecy,
  getProphecyById,
  searchProphecies,
  type FulfillmentStatus,
} from '@/lib/prophecyFulfillments';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const STATUS_CONFIG: Record<
  FulfillmentStatus,
  { label: string; color: string; icon: React.ReactNode; description: string }
> = {
  fulfilled: {
    label: 'Fulfilled',
    color: '#4ECDC4',
    icon: <CheckCircle className="w-4 h-4" />,
    description: 'Prophecy has been fulfilled according to Essene interpretation'
  },
  partial: {
    label: 'Partial',
    color: '#F39C12',
    icon: <Clock className="w-4 h-4" />,
    description: 'Partially fulfilled; awaits complete fulfillment'
  },
  unfulfilled: {
    label: 'Unfulfilled',
    color: '#E74C3C',
    icon: <AlertCircle className="w-4 h-4" />,
    description: 'Awaits fulfillment in the eschaton'
  },
  ongoing: {
    label: 'Ongoing',
    color: '#9B59B6',
    icon: <Zap className="w-4 h-4" />,
    description: 'Continuously being fulfilled'
  }
};

export default function ProphecyFulfillmentTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FulfillmentStatus | null>(
    null
  );
  const [selectedProphecyId, setSelectedProphecyId] = useState<string | null>(null);
  const [messinicOnly, setMessianicOnly] = useState(false);
  const [apocalypticOnly, setApocalypticOnly] = useState(false);

  // Filter prophecies
  const filteredProphecies = useMemo(() => {
    let prophecies = searchQuery
      ? searchProphecies(searchQuery)
      : OLD_TESTAMENT_PROPHECIES;

    if (messinicOnly) {
      const messianiProphecyIds = ESSENE_FULFILLMENTS.filter(f => f.messianic).map(
        f => f.prophecyId
      );
      prophecies = prophecies.filter(p => messianiProphecyIds.includes(p.id));
    }

    if (apocalypticOnly) {
      const apocalypticProphecyIds = ESSENE_FULFILLMENTS.filter(
        f => f.apocalyptic
      ).map(f => f.prophecyId);
      prophecies = prophecies.filter(p => apocalypticProphecyIds.includes(p.id));
    }

    if (selectedStatus) {
      const statusProphecyIds = ESSENE_FULFILLMENTS.filter(
        f => f.status === selectedStatus
      ).map(f => f.prophecyId);
      prophecies = prophecies.filter(p => statusProphecyIds.includes(p.id));
    }

    return prophecies;
  }, [searchQuery, selectedStatus, messinicOnly, apocalypticOnly]);

  // Get fulfillments for selected prophecy
  const selectedProphecy = selectedProphecyId
    ? getProphecyById(selectedProphecyId)
    : null;
  const selectedFulfillments = selectedProphecyId
    ? getFulfillmentsByProphecy(selectedProphecyId)
    : [];

  // Statistics
  const stats = useMemo(() => {
    const fulfilled = ESSENE_FULFILLMENTS.filter(f => f.status === 'fulfilled').length;
    const partial = ESSENE_FULFILLMENTS.filter(f => f.status === 'partial').length;
    const unfulfilled = ESSENE_FULFILLMENTS.filter(f => f.status === 'unfulfilled').length;
    const messianic = ESSENE_FULFILLMENTS.filter(f => f.messianic).length;
    const apocalyptic = ESSENE_FULFILLMENTS.filter(f => f.apocalyptic).length;

    return { fulfilled, partial, unfulfilled, messianic, apocalyptic };
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus(null);
    setMessianicOnly(false);
    setApocalypticOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedStatus ||
    messinicOnly ||
    apocalypticOnly;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Prophecy Fulfillment Tracker
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore Old Testament prophecies and how the Essenes believed they were fulfilled 
              through historical events. Cross-referenced with Dead Sea Scrolls pesharim interpretations 
              and theological commentary.
            </p>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Prophecies</p>
          <p className="text-2xl font-bold text-foreground">
            {OLD_TESTAMENT_PROPHECIES.length}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-1">Fulfilled</p>
          <p className="text-2xl font-bold" style={{ color: STATUS_CONFIG.fulfilled.color }}>
            {stats.fulfilled}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-1">Partial</p>
          <p className="text-2xl font-bold" style={{ color: STATUS_CONFIG.partial.color }}>
            {stats.partial}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-1">Messianic</p>
          <p className="text-2xl font-bold text-primary">{stats.messianic}</p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-1">Apocalyptic</p>
          <p className="text-2xl font-bold text-primary">{stats.apocalyptic}</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search prophecies by text, reference, or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/20 border-border"
            />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Fulfillment Status
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  ['fulfilled', 'partial', 'unfulfilled', 'ongoing'] as const
                ).map(status => (
                  <button
                    key={status}
                    onClick={() =>
                      setSelectedStatus(selectedStatus === status ? null : status)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedStatus === status
                        ? 'bg-primary text-primary-foreground border border-primary'
                        : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                    }`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: STATUS_CONFIG[status].color }}
                    />
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMessianicOnly(!messinicOnly)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    messinicOnly
                      ? 'bg-primary text-primary-foreground border border-primary'
                      : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  Messianic Prophecies
                </button>
                <button
                  onClick={() => setApocalypticOnly(!apocalypticOnly)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    apocalypticOnly
                      ? 'bg-primary text-primary-foreground border border-primary'
                      : 'bg-muted/30 text-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  Apocalyptic Prophecies
                </button>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground hover:bg-muted/40 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </Card>

      {/* Prophecies List and Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prophecies List */}
        <Card className="p-4 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Prophecies ({filteredProphecies.length})
          </h3>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-2">
              {filteredProphecies.map(prophecy => {
                const fulfillments = getFulfillmentsByProphecy(prophecy.id);
                const statusCount = fulfillments.reduce(
                  (acc, f) => {
                    acc[f.status] = (acc[f.status] || 0) + 1;
                    return acc;
                  },
                  {} as Record<FulfillmentStatus, number>
                );

                return (
                  <button
                    key={prophecy.id}
                    onClick={() =>
                      setSelectedProphecyId(
                        selectedProphecyId === prophecy.id ? null : prophecy.id
                      )
                    }
                    className={`w-full p-3 rounded-lg text-left transition-all border ${
                      selectedProphecyId === prophecy.id
                        ? 'bg-primary/10 border-primary/50'
                        : 'bg-muted/10 border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          {prophecy.biblicalReference}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {prophecy.text}
                        </p>
                        <p className="text-xs text-primary mt-1">{prophecy.theme}</p>
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        {Object.entries(statusCount).map(([status, count]) => (
                          <Badge
                            key={status}
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: `${STATUS_CONFIG[status as FulfillmentStatus].color}20`,
                              borderColor: STATUS_CONFIG[status as FulfillmentStatus].color,
                              color: STATUS_CONFIG[status as FulfillmentStatus].color,
                            }}
                          >
                            {count}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Selected Prophecy Details */}
        {selectedProphecy && (
          <Card className="p-6 bg-primary/5 border-primary/30">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {selectedProphecy.biblicalReference}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {selectedProphecy.book} {selectedProphecy.chapter}:{selectedProphecy.verses}
                </p>
                <p className="text-foreground leading-relaxed italic">
                  "{selectedProphecy.text}"
                </p>
                <Badge className="mt-3 bg-primary/20 text-primary border-primary/30">
                  {selectedProphecy.theme}
                </Badge>
              </div>

              {/* Fulfillments */}
              {selectedFulfillments.length > 0 ? (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Essene Fulfillments ({selectedFulfillments.length})
                  </h4>
                  <div className="space-y-4">
                    {selectedFulfillments.map((fulfillment, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-muted/20 border border-border rounded-lg space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {fulfillment.eventTitle}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {fulfillment.pesharReference}
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                                style={{
                                  backgroundColor: `${STATUS_CONFIG[fulfillment.status].color}20`,
                                  color: STATUS_CONFIG[fulfillment.status].color,
                                }}
                              >
                                {STATUS_CONFIG[fulfillment.status].icon}
                                {STATUS_CONFIG[fulfillment.status].label}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {STATUS_CONFIG[fulfillment.status].description}
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-foreground mb-1">
                            Essene Interpretation
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {fulfillment.esseneInterpretation}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-foreground mb-1">
                            Pesharim Commentary
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            "{fulfillment.pesharText}"
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="font-semibold text-foreground mb-1">
                              Theological Significance
                            </p>
                            <p className="text-muted-foreground">
                              {fulfillment.theologicalSignificance}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">
                              Historical Context
                            </p>
                            <p className="text-muted-foreground">
                              {fulfillment.historicalContext}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {fulfillment.messianic && (
                            <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                              Messianic
                            </Badge>
                          )}
                          {fulfillment.apocalyptic && (
                            <Badge variant="outline" className="text-xs bg-destructive/10 border-destructive/30">
                              Apocalyptic
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/20 border border-border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    No Essene fulfillment records found for this prophecy.
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Legend */}
      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Fulfillment Status Legend</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {(
            ['fulfilled', 'partial', 'unfulfilled', 'ongoing'] as const
          ).map(status => (
            <div key={status} className="flex items-start gap-3">
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: STATUS_CONFIG[status].color }}
              />
              <div>
                <p className="font-semibold text-foreground">
                  {STATUS_CONFIG[status].label}
                </p>
                <p className="text-muted-foreground text-xs">
                  {STATUS_CONFIG[status].description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
