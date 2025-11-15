"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"
import { gregorianToEssene, esseneToGregorian, formatEsseneDate, MONTH_NAMES } from "@/lib/calendar-logic"

export default function ConverterPage() {
  const [gregorianInput, setGregorianInput] = useState("")
  const [esseneYear, setEsseneYear] = useState("")
  const [esseneMonth, setEsseneMonth] = useState("")
  const [esseneDay, setEsseneDay] = useState("")
  const [result, setResult] = useState<string>("")

  const handleGregorianConvert = () => {
    try {
      const date = new Date(gregorianInput)
      if (isNaN(date.getTime())) {
        setResult("Invalid date format. Use YYYY-MM-DD")
        return
      }
      const esseneDate = gregorianToEssene(date)
      setResult(`Essene Date: ${formatEsseneDate(esseneDate)}\\nDay of Week: ${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][esseneDate.dayOfWeek]}${esseneDate.festivalName ? `\\nFestival: ${esseneDate.festivalName}` : ''}`)
    } catch (error) {
      setResult("Error converting date. Please check your input.")
    }
  }

  const handleEsseneConvert = () => {
    try {
      const year = parseInt(esseneYear)
      const month = parseInt(esseneMonth)
      const day = parseInt(esseneDay)
      
      if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
        setResult("Invalid Essene date. Check year, month (1-12), and day (1-31)")
        return
      }
      
      const gregorianDate = esseneToGregorian(year, month, day)
      setResult(`Gregorian Date: ${gregorianDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\\nDay of Week: ${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][gregorianDate.getDay()]}`)
    } catch (error) {
      setResult("Error converting date. Please check your input.")
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Date Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert dates between the Gregorian and Essene calendar systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Gregorian to Essene */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Gregorian → Essene</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gregorian Date</label>
                <input
                  type="date"
                  value={gregorianInput}
                  onChange={(e) => setGregorianInput(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button onClick={handleGregorianConvert} className="w-full">
                Convert to Essene
              </Button>
            </div>
          </div>

          {/* Essene to Gregorian */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Essene → Gregorian</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Essene Year (AM)</label>
                <input
                  type="number"
                  value={esseneYear}
                  onChange={(e) => setEsseneYear(e.target.value)}
                  placeholder="e.g., 6025"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Month (1-12)</label>
                  <input
                    type="number"
                    value={esseneMonth}
                    onChange={(e) => setEsseneMonth(e.target.value)}
                    placeholder="1-12"
                    min="1"
                    max="12"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Day (1-31)</label>
                  <input
                    type="number"
                    value={esseneDay}
                    onChange={(e) => setEsseneDay(e.target.value)}
                    placeholder="1-31"
                    min="1"
                    max="31"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <Button onClick={handleEsseneConvert} className="w-full">
                Convert to Gregorian
              </Button>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-accent/10 border border-accent rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg">Conversion Result</h3>
            </div>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
