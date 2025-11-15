import Link from "next/link"
import { Calendar, Clock, Sparkles, BookOpen, ArrowRight, Github } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-card to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent rounded-full text-accent text-sm font-semibold mb-6">
            ✨ Interactive Demo
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Experience the<br/>Essene Calendar
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A production-ready web application bringing the ancient 364-day solar calendar to life. 
            Built with Next.js, TypeScript, and modern web technologies.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/calendar" className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2">
              Launch Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="https://github.com/gaius/essene-calendar" className="px-8 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-card/50 transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              View Source
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-8">
              <Calendar className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Interactive Calendar</h3>
              <p className="text-muted-foreground mb-4">
                Navigate through months and years with full festival, Sabbath, and seasonal transition highlighting. 
                Accurate day-of-week calculations ensure perfect consistency year after year.
              </p>
              <Link href="/calendar" className="text-accent hover:underline inline-flex items-center gap-1">
                Try it now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <Clock className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Prophecy Timeline</h3>
              <p className="text-muted-foreground mb-4">
                Explore prophetic events from Creation (0 AM) to the Millennial Reign (7000 AM) with detailed 
                scholarly research, archaeological evidence, and theological themes from the Dead Sea Scrolls.
              </p>
              <Link href="/timeline" className="text-accent hover:underline inline-flex items-center gap-1">
                Explore timeline <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Date Converter</h3>
              <p className="text-muted-foreground mb-4">
                Seamlessly convert between Gregorian and Essene calendar systems with precision algorithms 
                based on vernal equinox calculations and historical research.
              </p>
              <Link href="/converter" className="text-accent hover:underline inline-flex items-center gap-1">
                Convert dates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Festival Calendar</h3>
              <p className="text-muted-foreground mb-4">
                Complete listings of all biblical festivals with their consistent weekday placements, 
                descriptions, and significance within the Essene theological framework.
              </p>
              <Link href="/festivals" className="text-accent hover:underline inline-flex items-center gap-1">
                View festivals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Built with Modern Tech</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'React'].map(tech => (
              <div key={tech} className="p-6 bg-background border border-border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">{tech}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-accent/10 border border-accent rounded-lg">
            <h3 className="font-bold text-lg mb-2">Production Ready</h3>
            <p className="text-muted-foreground">
              Fully typed with TypeScript, responsive design, optimized performance, and ready for deployment to Vercel or any modern hosting platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start experiencing the ancient Essene calendar system through modern technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/calendar" className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Launch Application
            </Link>
            <Link href="/" className="px-8 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-card/50 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
