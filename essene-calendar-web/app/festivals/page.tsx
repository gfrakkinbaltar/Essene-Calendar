import { FESTIVALS, MONTH_NAMES, DAY_NAMES } from "@/lib/calendar-logic"
import { BookOpen, Calendar } from "lucide-react"

export default function FestivalsPage() {
  const majorFestivals = FESTIVALS.filter(f => f.category === 'major')
  const specialFestivals = FESTIVALS.filter(f => f.category === 'special')

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Festival Calendar</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All biblical festivals fall on consistent weekdays in the Essene calendar, 
            demonstrating its perfect mathematical harmony with sacred time.
          </p>
        </div>

        {/* Major Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Major Festivals (Wednesdays)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {majorFestivals.map((festival) => (
              <div key={festival.name} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">{festival.name}</h3>
                    <p className="text-muted-foreground mb-3">{festival.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-1 font-semibold">{MONTH_NAMES[festival.month - 1]} {festival.day}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Day:</span>
                        <span className="ml-1 font-semibold">{DAY_NAMES[festival.dayOfWeek]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Special Festivals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {specialFestivals.map((festival) => (
              <div key={festival.name} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">{festival.name}</h3>
                    <p className="text-muted-foreground mb-3">{festival.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-1 font-semibold">{MONTH_NAMES[festival.month - 1]} {festival.day}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Day:</span>
                        <span className="ml-1 font-semibold">{DAY_NAMES[festival.dayOfWeek]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Box */}
        <div className="bg-accent/10 border border-accent rounded-lg p-6">
          <h3 className="font-bold text-xl mb-4">Festival Consistency</h3>
          <p className="text-muted-foreground">
            Unlike lunar calendars that require constant adjustment, the Essene calendar's 364-day structure ensures 
            that every festival falls on the same day of the week every year. This mathematical perfection was seen 
            by the Essenes as reflecting divine order and allowed priests to know their rotation schedules years in advance.
          </p>
        </div>
      </div>
    </div>
  )
}
