import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FESTIVALS, type Festival } from '@/lib/calendarData';
import { Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const festivalTypeLabels: Record<Festival['type'], string> = {
  major: 'Major Festival',
  minor: 'Minor Festival',
  sabbath: 'Sabbath',
  prophetic: 'Prophetic Marker',
};

export default function FestivalOverview() {
  // Group festivals by type
  const majorFestivals = FESTIVALS.filter(f => f.type === 'major');
  const propheticMarkers = FESTIVALS.filter(f => f.type === 'prophetic');
  
  const renderFestival = (festival: Festival) => (
    <Card 
      key={festival.id} 
      className="p-4 bg-muted/20 border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{festival.name}</h3>
            <div 
              className="w-2 h-2 rounded-full flex-shrink-0" 
              style={{ backgroundColor: festival.color }}
            />
          </div>
          {festival.hebrewName && (
            <p className="text-sm text-muted-foreground mb-2">{festival.hebrewName}</p>
          )}
        </div>
        <Badge variant="outline" className="whitespace-nowrap bg-transparent">
          Month {festival.month}, Day {festival.day}
        </Badge>
      </div>
      
      <p className="text-sm text-foreground mb-3">{festival.description}</p>
      
      {festival.biblicalReference && (
        <p className="text-xs text-muted-foreground italic mb-2">
          📖 {festival.biblicalReference}
        </p>
      )}
      
      <div className="pt-3 border-t border-border">
        <p className="text-sm text-primary/90">
          <strong>Significance:</strong> {festival.significance}
        </p>
      </div>
    </Card>
  );
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Festival Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Sacred celebrations and holy days throughout the year
          </p>
        </div>
      </div>
      
      <ScrollArea className="h-[700px] pr-4">
        <div className="space-y-8">
          {/* Major Festivals */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Major Festivals</h3>
            </div>
            <div className="space-y-4">
              {majorFestivals.map(renderFestival)}
            </div>
          </div>
          
          {/* Prophetic Markers */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[oklch(0.60_0.14_280)]" />
              <h3 className="text-xl font-semibold text-foreground">Prophetic Markers</h3>
            </div>
            <div className="space-y-4">
              {propheticMarkers.map(renderFestival)}
            </div>
          </div>
          
          {/* The Three Shavuot Cycle */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              The Three Shavuot Festivals
            </h3>
            <Card className="p-4 bg-primary/5 border-primary/30">
              <p className="text-sm text-foreground mb-4">
                A unique innovation of the Essene calendar was the expansion of the biblical Shavuot (Pentecost) 
                into <strong>three harvest festivals</strong> separated by 50-day intervals, creating a 
                <strong> 150-day cycle</strong> of covenant renewal and agricultural sanctification.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Festival of New Wheat</h4>
                    <p className="text-sm text-muted-foreground">
                      Sivan 15 (Month 3, Day 15) - Traditional Pentecost, 50 days from Omer offering
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-muted-foreground">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="px-3 text-xs">50 days</span>
                  <div className="flex-1 border-t border-dashed border-border" />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.60_0.12_160)]/20 flex items-center justify-center text-[oklch(0.60_0.12_160)] font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Festival of New Wine</h4>
                    <p className="text-sm text-muted-foreground">
                      Av 3 (Month 5, Day 3) - Celebration of wine harvest
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-muted-foreground">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="px-3 text-xs">50 days</span>
                  <div className="flex-1 border-t border-dashed border-border" />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.60_0.12_160)]/20 flex items-center justify-center text-[oklch(0.60_0.12_160)] font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Festival of New Oil</h4>
                    <p className="text-sm text-muted-foreground">
                      Elul 22 (Month 6, Day 22) - Celebration of olive oil harvest
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-primary/20">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Biblical Basis:</strong> While the Torah only prescribes 
                  the wheat offering (Leviticus 23:15-21), the Essenes expanded this to include wine and oil 
                  based on Numbers 18:12 which mentions "grain, wine, and oil" as gifts to the priests. 
                  The Temple Scroll provides the detailed framework for these additional festivals.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
