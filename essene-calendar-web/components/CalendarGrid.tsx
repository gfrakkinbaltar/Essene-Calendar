import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {
  getDaysInMonth,
  getMonthName,
  getFestivalForDate,
  isSabbath,
  getDayOfWeek,
  MONTHS,
  type Festival,
} from '@/lib/calendarData';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CalendarGridProps {
  selectedMonth?: number;
  onMonthChange?: (month: number) => void;
}

export default function CalendarGrid({ selectedMonth = 1, onMonthChange }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedMonth);
  
  const handleMonthChange = (newMonth: number) => {
    if (newMonth < 1) newMonth = 12;
    if (newMonth > 12) newMonth = 1;
    setCurrentMonth(newMonth);
    onMonthChange?.(newMonth);
  };
  
  const daysInMonth = getDaysInMonth(currentMonth);
  const monthName = getMonthName(currentMonth);
  const monthData = MONTHS.find(m => m.number === currentMonth);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const renderDay = (day: number) => {
    const festival = getFestivalForDate(currentMonth, day);
    const isSabbathDay = isSabbath(currentMonth, day);
    const dayOfWeek = getDayOfWeek(currentMonth, day);
    
    const dayClasses = `
      relative p-3 rounded-lg border transition-all duration-200 cursor-pointer
      hover:border-primary/50 hover:bg-muted/50
      ${festival ? 'border-primary/70 bg-primary/5' : 'border-border'}
      ${isSabbathDay ? 'ring-1 ring-[oklch(0.55_0.15_220)]/40' : ''}
    `;
    
    const content = (
      <div className={dayClasses}>
        <div className="flex items-start justify-between">
          <span className="text-lg font-semibold text-foreground">{day}</span>
          {festival && (
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: festival.color }}
            />
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{dayOfWeek.slice(0, 3)}</div>
        {festival && (
          <div className="mt-2 text-xs font-medium text-primary truncate">
            {festival.name}
          </div>
        )}
        {isSabbathDay && !festival && (
          <div className="mt-2 text-xs text-[oklch(0.55_0.15_220)]">
            Sabbath
          </div>
        )}
      </div>
    );
    
    if (festival) {
      return (
        <Tooltip key={day}>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent className="max-w-sm p-4 bg-card border-border">
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">{festival.name}</h4>
              {festival.hebrewName && (
                <p className="text-sm text-muted-foreground">{festival.hebrewName}</p>
              )}
              <p className="text-sm">{festival.description}</p>
              {festival.biblicalReference && (
                <p className="text-xs text-muted-foreground italic">
                  {festival.biblicalReference}
                </p>
              )}
              <p className="text-sm text-primary/80 mt-2">{festival.significance}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }
    
    return <div key={day}>{content}</div>;
  };
  
  return (
    <Card className="p-6 bg-card border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {monthName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {monthData?.hebrewName} • Month {currentMonth} • {monthData?.season}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthChange(currentMonth - 1)}
            className="bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthChange(currentMonth + 1)}
            className="bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => renderDay(day))}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Major Festival</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.60_0.12_160)]" />
            <span className="text-muted-foreground">Secondary Festival</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.55_0.15_220)]" />
            <span className="text-muted-foreground">Sabbath</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.60_0.14_280)]" />
            <span className="text-muted-foreground">Prophetic Marker</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
