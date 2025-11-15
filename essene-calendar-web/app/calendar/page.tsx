"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getMonthData,
  getToday,
  MONTH_NAMES,
  DAY_NAMES,
  type EsseneDate
} from "@/lib/calendar-logic"

export default function CalendarPage() {
  const today = getToday()
  const [currentYear, setCurrentYear] = useState(today.year)
  const [currentMonth, setCurrentMonth] = useState(today.month)
  const [selectedDate, setSelectedDate] = useState<EsseneDate>(today)

  const monthData = getMonthData(currentYear, currentMonth)
  
  // Get the first day's day of week to offset the grid
  const firstDayOfWeek = monthData[0]?.dayOfWeek || 0
  
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }
  
  const goToToday = () => {
    setCurrentYear(today.year)
    setCurrentMonth(today.month)
    setSelectedDate(today)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{MONTH_NAMES[currentMonth - 1]} {currentYear} AM</h2>
                  <p className="text-sm text-muted-foreground">Essene Calendar</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    <HomeIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {DAY_NAMES.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                
                {/* Actual days */}
                {monthData.map(date => {
                  const isToday = date.year === today.year && date.month === today.month && date.day === today.day
                  const isSelected = date.year === selectedDate.year && date.month === selectedDate.month && date.day === selectedDate.day
                  
                  return (
                    <button
                      key={`${date.year}-${date.month}-${date.day}`}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        aspect-square p-2 rounded-lg border transition-all
                        ${isToday ? 'border-accent bg-accent/10 font-bold' : 'border-border'}
                        ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-card hover:bg-card/50'}
                        ${date.specialDayType === 'sabbath' ? 'bg-secondary/20' : ''}
                        ${date.specialDayType === 'festival' ? 'bg-accent/30 border-accent' : ''}
                        ${date.specialDayType === 'tekufah' ? 'bg-primary/10' : ''}
                      `}
                    >
                      <div className="text-sm">{date.day}</div>
                      {date.festivalName && (
                        <div className="text-[10px] mt-1 leading-tight">{date.festivalName}</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Selected Date</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Essene Date</div>
                  <div className="font-semibold">{MONTH_NAMES[selectedDate.month - 1]} {selectedDate.day}, {selectedDate.year} AM</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gregorian Date</div>
                  <div className="font-semibold">{selectedDate.gregorianDate.toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Day of Week</div>
                  <div className="font-semibold">{DAY_NAMES[selectedDate.dayOfWeek]}</div>
                </div>
                {selectedDate.isSpecialDay && (
                  <div>
                    <div className="text-muted-foreground">Special Day</div>
                    <div className="font-semibold text-accent">{selectedDate.festivalName || selectedDate.specialDayType}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent/30 border border-accent rounded" />
                  <span>Festival</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-secondary/20 border border-border rounded" />
                  <span>Sabbath</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 border border-border rounded" />
                  <span>Tekufah (Season Transition)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent/10 border border-accent rounded" />
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
