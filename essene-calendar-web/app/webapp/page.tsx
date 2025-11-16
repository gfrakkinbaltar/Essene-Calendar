"use client"

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scroll, Calendar as CalendarIcon, Clock, Book, FileText, TrendingDown, Users, BookOpen } from 'lucide-react';
import CalendarGrid from '@/components/CalendarGrid';
import EnhancedTimeline from '@/components/EnhancedTimeline';
import VisualApocalypticTimeline from '@/components/VisualApocalypticTimeline';
import AboutSection from '@/components/AboutSection';
import FestivalOverview from '@/components/FestivalOverview';
import ResourcesSection from '@/components/ResourcesSection';
import CalendarComparison from '@/components/CalendarComparison';
import PriestlyTracker from '@/components/PriestlyTracker';
import ProphecyFulfillmentTracker from '@/components/ProphecyFulfillmentTracker';

export default function WebApp() {
  const [selectedMonth, setSelectedMonth] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30">
              <Scroll className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                The Essene Calendar - Web App
              </h1>
              <p className="text-sm text-muted-foreground">
                Sacred Time and Prophetic Vision of the Qumran Community
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Introduction */}
        <div className="mb-8 p-6 bg-card/30 border border-border rounded-lg">
          <p className="text-foreground leading-relaxed">
            Discovered among the Dead Sea Scrolls at Qumran, the <strong className="text-primary">364-day solar calendar</strong> represents 
            one of the most fascinating calendrical systems in ancient Judaism. This interactive application explores the mathematical precision, 
            theological significance, and apocalyptic worldview of the Yahad community who maintained this sacred timekeeping system 
            in opposition to the Jerusalem Temple establishment.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-muted/30 h-auto">
            <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="festivals" className="flex items-center gap-2 py-3">
              <Scroll className="w-4 h-4" />
              <span className="hidden sm:inline">Festivals</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2 py-3">
              <TrendingDown className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="priestly" className="flex items-center gap-2 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Priestly</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2 py-3">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="apocalyptic" className="flex items-center gap-2 py-3">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Apocalyptic</span>
            </TabsTrigger>
            <TabsTrigger value="fulfillment" className="flex items-center gap-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Prophecy</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 py-3">
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <CalendarGrid selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
          </TabsContent>

          <TabsContent value="festivals">
            <FestivalOverview />
          </TabsContent>

          <TabsContent value="comparison">
            <CalendarComparison />
          </TabsContent>

          <TabsContent value="priestly">
            <PriestlyTracker />
          </TabsContent>

          <TabsContent value="timeline">
            <EnhancedTimeline />
          </TabsContent>

          <TabsContent value="apocalyptic">
            <VisualApocalypticTimeline />
          </TabsContent>

          <TabsContent value="fulfillment">
            <ProphecyFulfillmentTracker />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
            <ResourcesSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
