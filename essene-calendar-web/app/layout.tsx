import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Calendar, Clock, Sparkles, BookOpen, Home } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Essene Calendar | Ancient 364-Day Solar Calendar",
  description: "Interactive Essene Calendar based on the Dead Sea Scrolls with prophecy timeline, date conversion, and festival calendar.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Calendar className="w-6 h-6 text-accent" />
                <span>Essene Calendar</span>
              </Link>
              
              <div className="flex gap-6">
                <Link href="/" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <Link href="/calendar" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </Link>
                <Link href="/timeline" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </Link>
                <Link href="/converter" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Converter</span>
                </Link>
                <Link href="/festivals" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Festivals</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main>{children}</main>
        
        <footer className="border-t border-border bg-card/30 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">About</h3>
                <p className="text-muted-foreground">
                  The 364-day solar calendar used by the Essenes, the ancient Jewish sect that wrote the Dead Sea Scrolls.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/calendar" className="hover:text-accent">Interactive Calendar</Link></li>
                  <li><Link href="/timeline" className="hover:text-accent">Prophecy Timeline</Link></li>
                  <li><Link href="/converter" className="hover:text-accent">Date Converter</Link></li>
                  <li><Link href="/festivals" className="hover:text-accent">Festival Calendar</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Historical Sources</h3>
                <p className="text-muted-foreground text-sm">
                  Based on scholarly research of the Dead Sea Scrolls and the 364-day calendar system discovered at Qumran.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Essene Calendar. Educational and research tool.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
