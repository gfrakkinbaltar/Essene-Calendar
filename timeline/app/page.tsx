import TimelineView from "@/components/timeline-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Essene Calendar Prophecy Timeline",
  description: "An interactive timeline of prophecies based on the Essene Calendar",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-900">
      <TimelineView />
    </main>
  )
}
