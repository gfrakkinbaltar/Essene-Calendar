import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, Download, ExternalLink } from 'lucide-react';

export default function ResourcesSection() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resources</h2>
          <p className="text-sm text-muted-foreground">
            Educational materials and primary sources
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Video Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Video Presentation</h3>
          </div>
          
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video 
              controls 
              className="w-full h-full"
              poster="/essene-video-poster.jpg"
            >
              <source src="/essene-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">The Essene's Rebel Calendar</strong> - 
            A comprehensive video presentation exploring the Qumran community's 364-day solar calendar, 
            its theological significance, and its role in Second Temple Judaism.
          </p>
        </div>
        
        {/* PDF Document */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Academic Document</h3>
          </div>
          
          <Card className="p-4 bg-muted/30 border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Essene 364-Day Calendar: Theological & Astronomical Foundations
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive academic analysis of the Essene calendar system, including mathematical structure, 
                  festival cycles, astronomical calculations, and theological implications. Essential reading for 
                  understanding the Qumran community's sacred timekeeping.
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="bg-transparent"
                  >
                    <a href="/essene-calendar-foundations.pdf" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View PDF
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="bg-transparent"
                  >
                    <a href="/essene-calendar-foundations.pdf" download>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-20 bg-primary/10 rounded border border-primary/30 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Additional Resources */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Further Reading</h3>
          
          <div className="space-y-3">
            <Card className="p-3 bg-muted/20 border-border">
              <h4 className="font-medium text-foreground text-sm mb-1">The Dead Sea Scrolls</h4>
              <p className="text-xs text-muted-foreground">
                Explore the original manuscripts discovered at Qumran, including calendrical texts, 
                the Temple Scroll, and the Book of Jubilees.
              </p>
            </Card>
            
            <Card className="p-3 bg-muted/20 border-border">
              <h4 className="font-medium text-foreground text-sm mb-1">Book of Enoch</h4>
              <p className="text-xs text-muted-foreground">
                Ancient Jewish apocalyptic text containing the earliest known reference to the 364-day calendar 
                and its astronomical foundations.
              </p>
            </Card>
            
            <Card className="p-3 bg-muted/20 border-border">
              <h4 className="font-medium text-foreground text-sm mb-1">Temple Scroll</h4>
              <p className="text-xs text-muted-foreground">
                Longest Dead Sea Scroll detailing the three Shavuot festivals (Wheat, Wine, Oil) 
                and comprehensive festival calendar.
              </p>
            </Card>
            
            <Card className="p-3 bg-muted/20 border-border">
              <h4 className="font-medium text-foreground text-sm mb-1">Damascus Document</h4>
              <p className="text-xs text-muted-foreground">
                Sectarian text describing the "Era of Wrath" and the emergence of the Teacher of Righteousness, 
                providing prophetic timeline calculations.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}
