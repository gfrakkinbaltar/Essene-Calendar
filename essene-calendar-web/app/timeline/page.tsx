import TimelineView from "@/components/timeline-view"

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-900">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Prophecy Timeline</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore prophetic events from Creation to the Millennial Reign based on Essene calendar calculations and Dead Sea Scroll interpretations.
          </p>
        </div>
        <TimelineView />
      </div>
    </main>
  )
}
