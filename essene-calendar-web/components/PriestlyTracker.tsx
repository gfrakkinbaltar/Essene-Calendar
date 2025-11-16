import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Calendar, BookOpen, Info } from 'lucide-react';
import {
  PRIESTLY_COURSES,
  generateWeeklyRotation,
  getCourseDetails,
  getPriestlyServiceInfo,
  getPriestlyHistoricalContext,
  type WeeklyRotation,
} from '@/lib/priestlyData';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PriestlyTracker() {
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const weeklyRotations = generateWeeklyRotation();
  const selectedCourseDetails = getCourseDetails(selectedCourse);
  const monthNames = [
    'Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
    'Tishri', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar'
  ];

  // Get rotations for selected course
  const courseRotations = weeklyRotations.filter(r => r.courseNumber === selectedCourse);

  // Get rotations for selected month
  const monthRotations = weeklyRotations.filter(r => r.month === selectedMonth);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Priestly Course Tracker (Mishmarot)
            </h2>
            <p className="text-sm text-muted-foreground">
              The Essene calendar maintained a precise rotation of the 24 priestly courses throughout the year. 
              Each course served for exactly one week, creating a perfect mathematical system: 52 weeks × 24 courses = 
              1,248 days, allowing for exactly <strong className="text-foreground">3 complete cycles per 364-day year</strong>.
            </p>
          </div>
        </div>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30 h-auto">
          <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">All Courses</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2 py-3">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2 py-3">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Details</span>
          </TabsTrigger>
        </TabsList>

        {/* All Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              The 24 Priestly Courses
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRIESTLY_COURSES.map((course) => (
                <div
                  key={course.number}
                  onClick={() => setSelectedCourse(course.number)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCourse === course.number
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-muted/20 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {course.number}. {course.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {course.hebrewName}
                      </p>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: course.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Patriarch: {course.patriarch}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Selected Course Details */}
          <Card className="p-6 bg-primary/5 border-primary/30">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedCourseDetails.color }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Course {selectedCourseDetails.number}: {selectedCourseDetails.name}
                </h3>
                <p className="text-sm text-foreground mb-3">
                  {selectedCourseDetails.description}
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="text-foreground">Hebrew Name:</strong>{' '}
                    <span className="text-muted-foreground">{selectedCourseDetails.hebrewName}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Patriarch:</strong>{' '}
                    <span className="text-muted-foreground">{selectedCourseDetails.patriarch}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Biblical Reference:</strong>{' '}
                    <span className="text-muted-foreground">{selectedCourseDetails.biblicalReference}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Service Schedule for Selected Course */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Service Schedule - Course {selectedCourseDetails.number}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This course serves 3 times per year, once in each cycle of the calendar year.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {courseRotations.map((rotation, index) => (
                <div key={index} className="p-4 bg-muted/20 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary/10 border-primary/30">
                      Cycle {Math.ceil(rotation.week / 24)}
                    </Badge>
                    <Badge variant="outline">Week {rotation.week}</Badge>
                  </div>
                  <p className="font-semibold text-foreground mb-1">
                    {rotation.monthName} {rotation.startDay}-{rotation.endDay}
                  </p>
                  {rotation.specialObservance && (
                    <p className="text-xs text-primary font-medium">
                      ★ {rotation.specialObservance}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Monthly Course Schedule
              </h3>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month} (Month {index + 1})
                  </option>
                ))}
              </select>
            </div>

            <ScrollArea className="h-96 pr-4">
              <div className="space-y-3">
                {monthRotations.map((rotation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/20 border border-border rounded-lg hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          Week {rotation.week}: {rotation.courseName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {rotation.monthName} {rotation.startDay}-{rotation.endDay}
                        </p>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getCourseColor(rotation.courseNumber) }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {rotation.hebrewName} • Patriarch: {rotation.patriarch}
                    </p>
                    {rotation.specialObservance && (
                      <Badge className="bg-primary/20 border-primary/30 text-primary text-xs">
                        ★ {rotation.specialObservance}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          {/* Priestly Service Info */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Priestly Service in the Essene Calendar
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {getPriestlyServiceInfo()}
                </p>
              </div>
            </div>
          </Card>

          {/* Historical Context */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Historical Context
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {getPriestlyHistoricalContext()}
                </p>
              </div>
            </div>
          </Card>

          {/* Course Rotation Pattern */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Course Rotation Pattern
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 border border-border rounded-lg">
                <p className="font-semibold text-foreground mb-2">Mathematical Perfection</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>52 weeks per year × 24 priestly courses = 1,248 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>364-day year ÷ 1,248 days = exactly 3 complete cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Each course serves exactly 3 times per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Same courses serve on the same festivals every year</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-muted/20 border border-border rounded-lg">
                <p className="font-semibold text-foreground mb-2">Theological Significance</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Perfect equality: every priest serves the same number of times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Divine order: the rotation reflects God's perfect design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Predictability: no human discretion in course assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Separation: the Essenes maintained their own priestly order</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Cycle Information */}
          <Card className="p-6 bg-primary/5 border-primary/30">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Three-Cycle System
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((cycle) => (
                <div key={cycle} className="p-4 bg-background border border-primary/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Cycle {cycle}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Weeks {(cycle - 1) * 24 + 1}-{cycle * 24}
                  </p>
                  <div className="space-y-1">
                    {PRIESTLY_COURSES.map((course) => (
                      <div
                        key={course.number}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: course.color }}
                        />
                        <span>{course.number}. {course.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to get course color
function getCourseColor(courseNumber: number): string {
  return PRIESTLY_COURSES[courseNumber - 1].color;
}
