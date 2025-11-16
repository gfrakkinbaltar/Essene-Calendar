import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROPHETIC_TIMELINE, type PropheticMarker } from '@/lib/calendarData';
import { Clock, Sparkles } from 'lucide-react';

const categoryColors: Record<PropheticMarker['category'], string> = {
  creation: 'oklch(0.72 0.15 70)', // Gold
  patriarchs: 'oklch(0.60 0.12 160)', // Teal
  exodus: 'oklch(0.55 0.15 220)', // Blue
  temple: 'oklch(0.60 0.14 280)', // Purple
  exile: 'oklch(0.55 0.22 25)', // Red
  teacher: 'oklch(0.72 0.15 70)', // Gold
  eschaton: 'oklch(0.60 0.14 280)', // Purple
};

const categoryLabels: Record<PropheticMarker['category'], string> = {
  creation: 'Creation',
  patriarchs: 'Patriarchal Age',
  exodus: 'Exodus & Conquest',
  temple: 'Temple Period',
  exile: 'Exile & Oppression',
  teacher: 'Teacher of Righteousness',
  eschaton: 'End Times',
};

export default function PropheticTimeline() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Prophetic Timeline</h2>
          <p className="text-sm text-muted-foreground">
            From Creation to the Age to Come
          </p>
        </div>
      </div>
      
      <ScrollArea className="h-[600px] pr-4">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {PROPHETIC_TIMELINE.map((marker, index) => (
              <div key={marker.id} className="relative pl-16">
                {/* Timeline dot */}
                <div 
                  className="absolute left-3 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center"
                  style={{ backgroundColor: categoryColors[marker.category] }}
                >
                  {(marker.category === 'eschaton' && index === PROPHETIC_TIMELINE.length - 1) && (
                    <Sparkles className="w-3 h-3 text-background" />
                  )}
                </div>
                
                {/* Content */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-foreground">{marker.name}</h3>
                    <span 
                      className="text-xs px-2 py-1 rounded-full whitespace-nowrap"
                      style={{ 
                        backgroundColor: categoryColors[marker.category] + '20',
                        color: categoryColors[marker.category]
                      }}
                    >
                      {marker.year}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {marker.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-medium"
                      style={{ color: categoryColors[marker.category] }}
                    >
                      {categoryLabels[marker.category]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      
      {/* Category Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Timeline Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[key as PropheticMarker['category']] }}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
