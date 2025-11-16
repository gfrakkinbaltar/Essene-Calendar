import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingDown, AlertCircle, Info } from 'lucide-react';
import {
  calculateSeasonalDrift,
  calculateDriftOverTime,
  calculateFestivalDrift,
  formatEsseneDate,
  getEquinoxCorrectionStrategy,
  type DriftData,
  type FestivalGregorianDate,
} from '@/lib/gregorianConverter';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CalendarComparison() {
  const [selectedYear, setSelectedYear] = useState(50);
  const [baseGregorianYear] = useState(-150); // 150 BCE
  
  const driftData = calculateSeasonalDrift(selectedYear);
  const festivalDates = calculateFestivalDrift(selectedYear, baseGregorianYear);
  const driftOverTime = calculateDriftOverTime(1, 200);
  
  // Calculate percentage of year drifted
  const driftPercentage = (driftData.cumulativeDrift / 365.2422) * 100;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Gregorian Calendar Comparison
            </h2>
            <p className="text-sm text-muted-foreground">
              The Essene 364-day calendar is <strong className="text-foreground">1.2422 days shorter</strong> than 
              the actual solar year (365.2422 days). This causes festivals to drift earlier in the seasons over time, 
              creating significant astronomical challenges for long-term calendar maintenance.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Year Selector */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Select Year for Analysis</h3>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/10 border-primary/30">
              Year {selectedYear}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Slider
              value={[selectedYear]}
              onValueChange={(value) => setSelectedYear(value[0])}
              min={1}
              max={200}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Year 1</span>
              <span>Year 100</span>
              <span>Year 200</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(1)}
              className="bg-transparent"
            >
              Year 1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(50)}
              className="bg-transparent"
            >
              Year 50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(100)}
              className="bg-transparent"
            >
              Year 100
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(200)}
              className="bg-transparent"
            >
              Year 200
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Current Drift Analysis */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-foreground">Cumulative Drift</h3>
          </div>
          <p className="text-3xl font-bold text-primary mb-1">
            {driftData.cumulativeDrift.toFixed(2)} days
          </p>
          <p className="text-sm text-muted-foreground">
            {driftData.seasonalShift}
          </p>
        </Card>
        
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Equinox Position</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {driftData.equinoxDate}
          </p>
          <p className="text-sm text-muted-foreground">
            Spring equinox in Essene calendar
          </p>
        </Card>
        
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-[oklch(0.60_0.12_160)]" />
            <h3 className="font-semibold text-foreground">Drift Percentage</h3>
          </div>
          <p className="text-3xl font-bold text-[oklch(0.60_0.12_160)] mb-1">
            {driftPercentage.toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">
            Of solar year drifted
          </p>
        </Card>
      </div>
      
      {/* Festival Drift Table */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Festival Dates in Year {selectedYear}
          </h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p className="text-sm">
                Shows how major festivals would align with Gregorian calendar dates, 
                assuming Year 1 begins at spring equinox (March 20, 150 BCE).
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Festival</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Essene Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Gregorian Date</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Total Drift</th>
              </tr>
            </thead>
            <tbody>
              {festivalDates.map((festival, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">
                    {festival.festivalName}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {festival.esseneDate.split(',')[0]}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {festival.gregorianDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <Badge variant="outline" className="bg-destructive/10 border-destructive/30 text-destructive">
                      -{festival.drift} days
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Drift Over Time Visualization */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Cumulative Drift Over 200 Years
        </h3>
        
        <div className="space-y-2">
          {driftOverTime.map((data, index) => {
            const barWidth = (data.cumulativeDrift / 250) * 100; // Max 250 days for scale
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground w-20">Year {data.esseneYear}</span>
                  <span className="text-foreground font-medium">
                    {data.cumulativeDrift.toFixed(1)} days
                  </span>
                </div>
                <div className="h-6 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-destructive rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(barWidth, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">After 200 years:</strong> The calendar drifts approximately{' '}
            <strong className="text-destructive">{driftOverTime[driftOverTime.length - 1].cumulativeDrift.toFixed(0)} days</strong>{' '}
            (~{Math.floor(driftOverTime[driftOverTime.length - 1].cumulativeDrift / 30)} months) earlier. 
            Festivals originally celebrated in spring would occur in winter.
          </p>
        </div>
      </Card>
      
      {/* Correction Mechanism */}
      <Card className="p-6 bg-primary/5 border-primary/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Possible Correction Mechanism
            </h3>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              {getEquinoxCorrectionStrategy()}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Historical evidence:</strong> Some scholars suggest the Essenes 
              may have reset their calendar at the spring equinox, effectively "correcting" the drift through 
              astronomical observation rather than mathematical intercalation. This would maintain the calendar's 
              theological purity while addressing practical seasonal alignment.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Comparison with Lunar Calendar */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Why Reject the Lunar Calendar?
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-destructive/5 border border-destructive/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Lunar-Solar Calendar Issues</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Requires human intercalation (adding months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Festival dates vary by day of week annually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>~10 day annual drift from solar year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Associated with pagan moon worship</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">364-Day Calendar Advantages</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Perfect mathematical structure (7 × 52)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Festivals always on same weekday</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>No human intervention required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Reflects divine perfection and order</span>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground italic">
            From the Book of Jubilees: "There will be people who carefully observe the moon... 
            it is corrupt with respect to the seasons" (6:36-37)
          </p>
        </div>
      </Card>
    </div>
  );
}
