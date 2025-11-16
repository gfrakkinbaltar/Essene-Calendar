import Link from "next/link"
import { Calendar, Clock, Sparkles, BookOpen, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            The Essene Calendar
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Ancient 364-Day Solar Calendar
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore the calendar system used by the Essenes, the ancient Jewish sect that wrote the Dead Sea Scrolls.
            A perfect 364-day year divided into 52 weeks with no lunar observations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/webapp"
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              🌐 Launch Web App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/calendar"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              View Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/demo"
              className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-card/50 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Explore the Ancient Calendar</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Calendar Feature */}
            <Link href="/calendar" className="group p-6 bg-card border border-border rounded-lg hover:border-accent transition-all hover:scale-105">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-2">Interactive Calendar</h3>
              <p className="text-muted-foreground">
                Navigate the 364-day year with festivals, Sabbaths, and seasonal transitions highlighted.
              </p>
            </Link>

            {/* Timeline Feature */}
            <Link href="/timeline" className="group p-6 bg-card border border-border rounded-lg hover:border-accent transition-all hover:scale-105">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-2">Prophecy Timeline</h3>
              <p className="text-muted-foreground">
                Explore prophetic events from Creation to the Millennial Reign based on Essene calculations.
              </p>
            </Link>

            {/* Converter Feature */}
            <Link href="/converter" className="group p-6 bg-card border border-border rounded-lg hover:border-accent transition-all hover:scale-105">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-2">Date Converter</h3>
              <p className="text-muted-foreground">
                Convert dates between the Gregorian and Essene calendar systems with precision.
              </p>
            </Link>

            {/* Festivals Feature */}
            <Link href="/festivals" className="group p-6 bg-card border border-border rounded-lg hover:border-accent transition-all hover:scale-105">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-2">Festival Calendar</h3>
              <p className="text-muted-foreground">
                View all biblical festivals with their consistent weekday placement and significance.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8">The 364-Day Calendar System</h2>
          
          <div className="prose prose-invert mx-auto">
            <p className="text-lg text-muted-foreground text-center mb-8">
              The Essenes used a purely solar calendar of exactly 364 days, discovered in the Dead Sea Scrolls at Qumran.
              Unlike lunar calendars requiring constant adjustment, this system divides the year into perfect mathematical harmony.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">364</div>
                <div className="text-sm text-muted-foreground">Days per Year</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">52</div>
                <div className="text-sm text-muted-foreground">Perfect Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">12</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-background border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Every date falls on the same weekday annually</li>
                <li>✓ No lunar observations required</li>
                <li>✓ Perfect integration with biblical festivals</li>
                <li>✓ Four seasons of exactly 91 days (13 weeks) each</li>
                <li>✓ Based on Dead Sea Scroll manuscripts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
