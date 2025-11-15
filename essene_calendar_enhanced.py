#!/usr/bin/env python3
"""
Essene Calendar - Enhanced Modern GUI Application
A beautiful implementation of the ancient Hebrew solar calendar with advanced features
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import datetime
import calendar
from pathlib import Path
import json

class EsseneCalendar:
    """Essene Calendar calculations"""
    
    MONTH_NAMES = [
        "Nisan", "Iyyar", "Sivan", "Tammuz", "Av", "Elul",
        "Tishrei", "Marcheshvan", "Kislev", "Tevet", "Shevat", "Adar"
    ]
    
    MONTH_DAYS = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31]
    
    FESTIVALS = {
        (1, 14): ("Passover", "🕯️"),
        (1, 15): ("Unleavened Bread (Day 1)", "🍞"),
        (1, 21): ("Last Day of Unleavened Bread", "🍞"),
        (3, 15): ("Feast of Weeks (Shavuot)", "🌾"),
        (3, 22): ("Festival of New Wine", "🍷"),
        (5, 3): ("Festival of New Oil", "🫒"),
        (7, 1): ("Feast of Trumpets", "🎺"),
        (7, 10): ("Yom Kippur", "🙏"),
        (7, 15): ("Sukkot (Day 1)", "🏕️"),
        (7, 22): ("Last Day of Sukkot", "🏕️")
    }
    
    TEKUFAH_DAYS = {
        (3, 31): "Summer Transition",
        (6, 31): "Autumn Transition", 
        (9, 31): "Winter Transition",
        (12, 31): "Spring Transition"
    }
    
    def get_vernal_equinox(self, year):
        return datetime.date(year, 3, 20)
    
    def get_year_start(self, year):
        equinox = self.get_vernal_equinox(year)
        days_ahead = (2 - equinox.weekday()) % 7
        if days_ahead < 0:
            days_ahead += 7
        return equinox + datetime.timedelta(days=days_ahead)
    
    def gregorian_to_essene(self, gregorian_date):
        year_start = self.get_year_start(gregorian_date.year)
        if gregorian_date < year_start:
            year_start = self.get_year_start(gregorian_date.year - 1)
        
        days_diff = (gregorian_date - year_start).days
        
        if days_diff < 0 or days_diff >= 364:
            if days_diff < 0:
                year_start = self.get_year_start(gregorian_date.year - 1)
                days_diff = (gregorian_date - year_start).days
            else:
                year_start = self.get_year_start(gregorian_date.year + 1)
                days_diff = (gregorian_date - year_start).days
        
        day_count = 0
        for month in range(12):
            month_days = self.MONTH_DAYS[month]
            if days_diff < day_count + month_days:
                return (gregorian_date.year, month + 1, days_diff - day_count + 1)
            day_count += month_days
        
        return (gregorian_date.year, 12, 31)
    
    def essene_to_gregorian(self, essene_year, essene_month, essene_day):
        year_start = self.get_year_start(essene_year)
        days_offset = sum(self.MONTH_DAYS[:essene_month - 1]) + (essene_day - 1)
        return year_start + datetime.timedelta(days=days_offset)
    
    def get_month_days(self, year, month):
        month_days = self.MONTH_DAYS[month - 1]
        year_start = self.get_year_start(year)
        days_offset = sum(self.MONTH_DAYS[:month - 1])
        first_day_date = year_start + datetime.timedelta(days=days_offset)
        first_day_weekday = first_day_date.weekday()
        return month_days, first_day_weekday
    
    def is_festival(self, month, day):
        return (month, day) in self.FESTIVALS
    
    def is_tekufah(self, month, day):
        return (month, day) in self.TEKUFAH_DAYS
    
    def get_festival_name(self, month, day):
        if (month, day) in self.FESTIVALS:
            return self.FESTIVALS[(month, day)][0]
        return ""
    
    def get_festival_emoji(self, month, day):
        if (month, day) in self.FESTIVALS:
            return self.FESTIVALS[(month, day)][1]
        return ""
    
    def get_tekufah_name(self, month, day):
        return self.TEKUFAH_DAYS.get((month, day), "")
    
    def get_weekday_name(self, year, month, day):
        gregorian_date = self.essene_to_gregorian(year, month, day)
        return gregorian_date.strftime("%A")
    
    def get_upcoming_festivals(self, from_date, count=5):
        """Get next N festivals from given date"""
        festivals = []
        year, month, day = self.gregorian_to_essene(from_date)
        
        checked = 0
        while len(festivals) < count and checked < 400:
            day += 1
            if day > self.MONTH_DAYS[month - 1]:
                day = 1
                month += 1
                if month > 12:
                    month = 1
                    year += 1
            
            if self.is_festival(month, day):
                greg_date = self.essene_to_gregorian(year, month, day)
                festival_name = self.get_festival_name(month, day)
                emoji = self.get_festival_emoji(month, day)
                festivals.append((greg_date, festival_name, emoji, month, day))
            
            checked += 1
        
        return festivals


class ModernEsseneCalendarApp:
    """Enhanced modern calendar application"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Essene Calendar - Enhanced")
        self.root.geometry("1600x950")
        
        # Modern color scheme
        self.colors = {
            'bg': '#0f172a',
            'surface': '#1e293b',
            'surface_light': '#334155',
            'surface_hover': '#475569',
            'primary': '#3b82f6',
            'primary_dark': '#2563eb',
            'secondary': '#8b5cf6',
            'text': '#f1f5f9',
            'text_muted': '#94a3b8',
            'border': '#334155',
            'festival': '#dc2626',
            'sabbath': '#7c3aed',
            'today': '#10b981',
            'tekufah': '#f59e0b',
            'success': '#22c55e',
            'warning': '#eab308'
        }
        
        self.root.configure(bg=self.colors['bg'])
        
        # Initialize calendar
        self.calendar = EsseneCalendar()
        self.current_year = datetime.date.today().year
        self.current_month = 1
        self.selected_date = None
        self.view_mode = 'month'  # 'month' or 'year'
        
        # Load saved notes
        self.notes_file = Path.home() / '.essene_calendar_notes.json'
        self.notes = self.load_notes()
        
        # Configure styles
        self.setup_styles()
        
        # Create UI
        self.create_ui()
        self.update_calendar()
        
        # Center window
        self.root.update_idletasks()
        x = (self.root.winfo_screenwidth() // 2) - (1600 // 2)
        y = (self.root.winfo_screenheight() // 2) - (950 // 2)
        self.root.geometry(f'1600x950+{x}+{y}')
        
        # Keyboard shortcuts
        self.root.bind('<Left>', lambda e: self.change_month(-1))
        self.root.bind('<Right>', lambda e: self.change_month(1))
        self.root.bind('<Up>', lambda e: self.change_year(-1))
        self.root.bind('<Down>', lambda e: self.change_year(1))
        self.root.bind('<Home>', lambda e: self.go_to_today())
        self.root.bind('<Control-e>', lambda e: self.export_calendar())
        self.root.bind('<Control-f>', lambda e: self.show_festivals())
    
    def load_notes(self):
        """Load saved notes from file"""
        if self.notes_file.exists():
            try:
                with open(self.notes_file, 'r') as f:
                    return json.load(f)
            except:
                return {}
        return {}
    
    def save_notes(self):
        """Save notes to file"""
        try:
            with open(self.notes_file, 'w') as f:
                json.dump(self.notes, f, indent=2)
        except Exception as e:
            print(f"Error saving notes: {e}")
    
    def setup_styles(self):
        """Configure modern ttk styles"""
        style = ttk.Style()
        style.theme_use('default')
        
        style.configure('.',
                       background=self.colors['bg'],
                       foreground=self.colors['text'],
                       borderwidth=0,
                       font=('Inter', 10))
        
        style.configure('TFrame', background=self.colors['bg'])
        style.configure('TLabel',
                       background=self.colors['bg'],
                       foreground=self.colors['text'],
                       font=('Inter', 10))
    
    def create_ui(self):
        """Create enhanced UI layout"""
        # Main container
        main_container = tk.Frame(self.root, bg=self.colors['bg'])
        main_container.pack(fill=tk.BOTH, expand=True, padx=40, pady=30)
        
        # Header with view toggle
        self.create_header(main_container)
        
        # Content area
        content = tk.Frame(main_container, bg=self.colors['bg'])
        content.pack(fill=tk.BOTH, expand=True, pady=(20, 0))
        
        # Left panel - Calendar (65% width)
        left_panel = tk.Frame(content, bg=self.colors['bg'])
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 20))
        
        # Right panel - Enhanced sidebar (35% width)
        right_panel = tk.Frame(content, bg=self.colors['bg'], width=500)
        right_panel.pack(side=tk.RIGHT, fill=tk.Y)
        right_panel.pack_propagate(False)
        
        self.create_calendar_panel(left_panel)
        self.create_enhanced_sidebar(right_panel)
    
    def create_header(self, parent):
        """Create enhanced header with search"""
        header = tk.Frame(parent, bg=self.colors['bg'])
        header.pack(fill=tk.X, pady=(0, 20))
        
        # Left side - Title
        title_frame = tk.Frame(header, bg=self.colors['bg'])
        title_frame.pack(side=tk.LEFT)
        
        title = tk.Label(title_frame,
                        text="Essene Calendar",
                        font=('Inter', 28, 'bold'),
                        bg=self.colors['bg'],
                        fg=self.colors['text'])
        title.pack(anchor=tk.W)
        
        subtitle = tk.Label(title_frame,
                           text="Ancient Hebrew Solar Calendar • 364 Days • 52 Weeks",
                           font=('Inter', 12),
                           bg=self.colors['bg'],
                           fg=self.colors['text_muted'])
        subtitle.pack(anchor=tk.W, pady=(2, 0))
        
        # Right side - Navigation and controls
        nav_frame = tk.Frame(header, bg=self.colors['bg'])
        nav_frame.pack(side=tk.RIGHT)
        
        # Month/Year display
        self.month_year_label = tk.Label(nav_frame,
                                         text="",
                                         font=('Inter', 16, 'bold'),
                                         bg=self.colors['bg'],
                                         fg=self.colors['text'])
        self.month_year_label.pack(side=tk.TOP, pady=(0, 10))
        
        # Navigation buttons
        nav_buttons = tk.Frame(nav_frame, bg=self.colors['bg'])
        nav_buttons.pack()
        
        btn_config = {
            'font': ('Inter', 12),
            'bg': self.colors['surface'],
            'fg': self.colors['text'],
            'bd': 0,
            'padx': 12,
            'pady': 6,
            'cursor': 'hand2',
            'activebackground': self.colors['surface_light'],
            'activeforeground': self.colors['text']
        }
        
        tk.Button(nav_buttons, text="‹‹", command=lambda: self.change_year(-1), **btn_config).pack(side=tk.LEFT, padx=2)
        tk.Button(nav_buttons, text="‹", command=lambda: self.change_month(-1), **btn_config).pack(side=tk.LEFT, padx=2)
        tk.Button(nav_buttons, text="Today", command=self.go_to_today,
                 bg=self.colors['primary'], fg='white',
                 font=('Inter', 11, 'bold'), bd=0, padx=16, pady=6,
                 cursor='hand2', activebackground=self.colors['primary_dark']).pack(side=tk.LEFT, padx=8)
        tk.Button(nav_buttons, text="›", command=lambda: self.change_month(1), **btn_config).pack(side=tk.LEFT, padx=2)
        tk.Button(nav_buttons, text="››", command=lambda: self.change_year(1), **btn_config).pack(side=tk.LEFT, padx=2)
    
    def create_calendar_panel(self, parent):
        """Create modern calendar grid with mini month indicators"""
        # Card container
        card = tk.Frame(parent, bg=self.colors['surface'], highlightthickness=0)
        card.pack(fill=tk.BOTH, expand=True)
        
        # Inner padding
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Weekday headers
        header_frame = tk.Frame(inner, bg=self.colors['surface'])
        header_frame.pack(fill=tk.X, pady=(0, 10))
        
        weekdays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]
        
        for day in weekdays:
            day_header = tk.Label(header_frame,
                                 text=day.upper(),
                                 font=('Inter', 11, 'bold'),
                                 bg=self.colors['surface'],
                                 fg=self.colors['text_muted'],
                                 width=10)
            day_header.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        # Calendar grid
        self.calendar_grid = []
        grid_container = tk.Frame(inner, bg=self.colors['surface'])
        grid_container.pack(fill=tk.BOTH, expand=True)
        
        for row in range(6):
            row_frame = tk.Frame(grid_container, bg=self.colors['surface'])
            row_frame.pack(fill=tk.BOTH, expand=True)
            week_row = []
            
            for col in range(7):
                day_cell = self.create_day_cell(row_frame, row, col)
                day_cell.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=2, pady=2)
                week_row.append(day_cell)
            
            self.calendar_grid.append(week_row)
    
    def create_day_cell(self, parent, row, col):
        """Create enhanced day cell with note indicator"""
        cell = tk.Frame(parent, bg=self.colors['bg'], cursor='hand2')
        
        # Container for day content
        content = tk.Frame(cell, bg=self.colors['bg'])
        content.pack(fill=tk.BOTH, expand=True)
        
        # Day number
        day_label = tk.Label(content,
                            text="",
                            font=('Inter', 14),
                            bg=self.colors['bg'],
                            fg=self.colors['text'],
                            width=4,
                            height=2)
        day_label.pack()
        
        # Note indicator (small dot)
        note_indicator = tk.Label(content,
                                 text="•",
                                 font=('Inter', 16, 'bold'),
                                 bg=self.colors['bg'],
                                 fg=self.colors['secondary'])
        
        # Festival emoji
        emoji_label = tk.Label(content,
                              text="",
                              font=('Inter', 12),
                              bg=self.colors['bg'])
        
        # Store references
        cell.day_label = day_label
        cell.note_indicator = note_indicator
        cell.emoji_label = emoji_label
        
        # Click binding
        cell.bind('<Button-1>', lambda e, r=row, c=col: self.on_day_click(r, c))
        day_label.bind('<Button-1>', lambda e, r=row, c=col: self.on_day_click(r, c))
        
        # Right-click for quick note
        cell.bind('<Button-3>', lambda e, r=row, c=col: self.quick_note(r, c))
        day_label.bind('<Button-3>', lambda e, r=row, c=col: self.quick_note(r, c))
        
        # Hover effect
        def on_enter(e):
            if cell.day_label.cget('text'):
                current_bg = cell.cget('bg')
                if current_bg == self.colors['bg']:
                    cell.configure(bg=self.colors['surface_hover'])
                    content.configure(bg=self.colors['surface_hover'])
                    cell.day_label.configure(bg=self.colors['surface_hover'])
                    cell.note_indicator.configure(bg=self.colors['surface_hover'])
                    cell.emoji_label.configure(bg=self.colors['surface_hover'])
        
        def on_leave(e):
            if cell.day_label.cget('text'):
                self.update_calendar()
        
        cell.bind('<Enter>', on_enter)
        cell.bind('<Leave>', on_leave)
        
        return cell
    
    def create_enhanced_sidebar(self, parent):
        """Create enhanced sidebar with upcoming festivals and stats"""
        # Scrollable container
        canvas = tk.Canvas(parent, bg=self.colors['bg'], highlightthickness=0)
        scrollbar = tk.Scrollbar(parent, orient=tk.VERTICAL, command=canvas.yview,
                                bg=self.colors['surface'], troughcolor=self.colors['bg'])
        scrollable = tk.Frame(canvas, bg=self.colors['bg'])
        
        scrollable.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=scrollable, anchor=tk.NW)
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Selected date info
        self.create_date_info_card(scrollable)
        
        # Upcoming festivals
        self.create_upcoming_festivals_card(scrollable)
        
        # Calendar stats
        self.create_stats_card(scrollable)
        
        # Conversion tool
        self.create_conversion_card(scrollable)
        
        # Quick actions
        self.create_actions_card(scrollable)
    
    def create_date_info_card(self, parent):
        """Date info card"""
        card = tk.Frame(parent, bg=self.colors['surface'])
        card.pack(fill=tk.X, pady=(0, 15), padx=5)
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(inner,
                text="Selected Date",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        self.selected_date_label = tk.Label(inner,
                                           text="Click a date to view details",
                                           font=('Inter', 12),
                                           bg=self.colors['surface'],
                                           fg=self.colors['text_muted'],
                                           wraplength=420,
                                           justify=tk.LEFT)
        self.selected_date_label.pack(anchor=tk.W, pady=(0, 10))
        
        # Details
        details = tk.Frame(inner, bg=self.colors['surface'])
        details.pack(fill=tk.X, pady=(10, 0))
        
        self.essene_label = self.create_info_row(details, "Essene:")
        self.gregorian_label = self.create_info_row(details, "Gregorian:")
        self.weekday_label = self.create_info_row(details, "Weekday:")
        
        # Festival/Note section
        self.festival_frame = tk.Frame(inner, bg=self.colors['festival'])
        self.festival_label = tk.Label(self.festival_frame,
                                      text="",
                                      font=('Inter', 11, 'bold'),
                                      bg=self.colors['festival'],
                                      fg='white',
                                      wraplength=420)
        self.festival_label.pack(padx=12, pady=8)
        
        # Note display
        self.note_display = tk.Text(inner,
                                    height=3,
                                    font=('Inter', 10),
                                    bg=self.colors['bg'],
                                    fg=self.colors['text'],
                                    wrap=tk.WORD,
                                    relief=tk.FLAT,
                                    bd=0,
                                    padx=10,
                                    pady=8)
    
    def create_upcoming_festivals_card(self, parent):
        """Upcoming festivals card"""
        card = tk.Frame(parent, bg=self.colors['surface'])
        card.pack(fill=tk.X, pady=(0, 15), padx=5)
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(inner,
                text="Upcoming Festivals",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        self.festivals_list_frame = tk.Frame(inner, bg=self.colors['surface'])
        self.festivals_list_frame.pack(fill=tk.X)
        
        self.update_upcoming_festivals()
    
    def update_upcoming_festivals(self):
        """Update upcoming festivals list"""
        for widget in self.festivals_list_frame.winfo_children():
            widget.destroy()
        
        festivals = self.calendar.get_upcoming_festivals(datetime.date.today(), 5)
        
        for greg_date, name, emoji, month, day in festivals:
            days_until = (greg_date - datetime.date.today()).days
            
            item = tk.Frame(self.festivals_list_frame, bg=self.colors['bg'])
            item.pack(fill=tk.X, pady=4)
            
            item_inner = tk.Frame(item, bg=self.colors['bg'])
            item_inner.pack(fill=tk.X, padx=12, pady=10)
            
            # Emoji and name
            header = tk.Frame(item_inner, bg=self.colors['bg'])
            header.pack(fill=tk.X)
            
            tk.Label(header,
                    text=f"{emoji}",
                    font=('Inter', 16),
                    bg=self.colors['bg']).pack(side=tk.LEFT, padx=(0, 8))
            
            tk.Label(header,
                    text=name,
                    font=('Inter', 11, 'bold'),
                    bg=self.colors['bg'],
                    fg=self.colors['text'],
                    anchor=tk.W).pack(side=tk.LEFT, fill=tk.X, expand=True)
            
            # Date info
            if days_until == 0:
                time_str = "Today"
                color = self.colors['success']
            elif days_until == 1:
                time_str = "Tomorrow"
                color = self.colors['warning']
            else:
                time_str = f"In {days_until} days"
                color = self.colors['text_muted']
            
            tk.Label(item_inner,
                    text=f"{time_str} • {greg_date.strftime('%b %d, %Y')}",
                    font=('Inter', 9),
                    bg=self.colors['bg'],
                    fg=color).pack(anchor=tk.W, pady=(4, 0))
    
    def create_stats_card(self, parent):
        """Calendar statistics card"""
        card = tk.Frame(parent, bg=self.colors['surface'])
        card.pack(fill=tk.X, pady=(0, 15), padx=5)
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(inner,
                text="Calendar Info",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        # Calculate stats
        today = datetime.date.today()
        essene_today = self.calendar.gregorian_to_essene(today)
        year_start = self.calendar.get_year_start(essene_today[0])
        days_into_year = (today - year_start).days + 1
        weeks_into_year = days_into_year // 7 + 1
        
        stats = [
            ("Year Progress", f"{days_into_year}/364 days"),
            ("Week", f"{weeks_into_year}/52"),
            ("Current Month", f"{self.calendar.MONTH_NAMES[essene_today[1]-1]}"),
            ("Days in Month", f"{self.calendar.MONTH_DAYS[essene_today[1]-1]} days"),
            ("Year Start", year_start.strftime("%b %d, %Y"))
        ]
        
        for label, value in stats:
            row = tk.Frame(inner, bg=self.colors['surface'])
            row.pack(fill=tk.X, pady=3)
            
            tk.Label(row,
                    text=label,
                    font=('Inter', 9, 'bold'),
                    bg=self.colors['surface'],
                    fg=self.colors['text_muted'],
                    width=15,
                    anchor=tk.W).pack(side=tk.LEFT)
            
            tk.Label(row,
                    text=value,
                    font=('Inter', 10),
                    bg=self.colors['surface'],
                    fg=self.colors['text'],
                    anchor=tk.W).pack(side=tk.LEFT)
    
    def create_conversion_card(self, parent):
        """Date conversion tool"""
        card = tk.Frame(parent, bg=self.colors['surface'])
        card.pack(fill=tk.X, pady=(0, 15), padx=5)
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(inner,
                text="Date Conversion",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        # Gregorian to Essene
        tk.Label(inner,
                text="Gregorian → Essene",
                font=('Inter', 10, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(0, 5))
        
        g_frame = tk.Frame(inner, bg=self.colors['surface'])
        g_frame.pack(fill=tk.X, pady=(0, 5))
        
        self.gregorian_entry = tk.Entry(g_frame,
                                        font=('Inter', 11),
                                        bg=self.colors['bg'],
                                        fg=self.colors['text'],
                                        insertbackground=self.colors['text'],
                                        relief=tk.FLAT,
                                        bd=0)
        self.gregorian_entry.pack(fill=tk.X, ipady=8, ipadx=10)
        self.gregorian_entry.insert(0, datetime.date.today().strftime("%Y-%m-%d"))
        self.gregorian_entry.bind('<Return>', lambda e: self.convert_gregorian())
        
        tk.Button(g_frame,
                 text="Convert",
                 command=self.convert_gregorian,
                 font=('Inter', 10, 'bold'),
                 bg=self.colors['primary'],
                 fg='white',
                 bd=0,
                 padx=16,
                 pady=8,
                 cursor='hand2',
                 activebackground=self.colors['primary_dark']).pack(pady=(10, 0))
        
        self.gregorian_result = tk.Label(inner,
                                         text="",
                                         font=('Inter', 10),
                                         bg=self.colors['surface'],
                                         fg=self.colors['text_muted'],
                                         wraplength=420)
        self.gregorian_result.pack(anchor=tk.W, pady=(5, 15))
        
        # Essene to Gregorian
        tk.Label(inner,
                text="Essene → Gregorian",
                font=('Inter', 10, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(0, 5))
        
        e_frame = tk.Frame(inner, bg=self.colors['surface'])
        e_frame.pack(fill=tk.X)
        
        self.essene_entry = tk.Entry(e_frame,
                                     font=('Inter', 11),
                                     bg=self.colors['bg'],
                                     fg=self.colors['text'],
                                     insertbackground=self.colors['text'],
                                     relief=tk.FLAT,
                                     bd=0)
        self.essene_entry.pack(fill=tk.X, ipady=8, ipadx=10)
        self.essene_entry.bind('<Return>', lambda e: self.convert_essene())
        
        tk.Button(e_frame,
                 text="Convert",
                 command=self.convert_essene,
                 font=('Inter', 10, 'bold'),
                 bg=self.colors['primary'],
                 fg='white',
                 bd=0,
                 padx=16,
                 pady=8,
                 cursor='hand2',
                 activebackground=self.colors['primary_dark']).pack(pady=(10, 0))
        
        self.essene_result = tk.Label(inner,
                                      text="",
                                      font=('Inter', 10),
                                      bg=self.colors['surface'],
                                      fg=self.colors['text_muted'],
                                      wraplength=420)
        self.essene_result.pack(anchor=tk.W, pady=(5, 0))
    
    def create_actions_card(self, parent):
        """Quick actions card"""
        card = tk.Frame(parent, bg=self.colors['surface'])
        card.pack(fill=tk.X, padx=5, pady=(0, 20))
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.X, padx=20, pady=20)
        
        btn_style = {
            'font': ('Inter', 11),
            'bg': self.colors['bg'],
            'fg': self.colors['text'],
            'bd': 0,
            'pady': 12,
            'cursor': 'hand2',
            'activebackground': self.colors['surface_light']
        }
        
        tk.Button(inner, text="📅 All Festivals",
                 command=self.show_festivals, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(inner, text="💾 Export Calendar",
                 command=self.export_calendar, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(inner, text="📊 Compare Calendars",
                 command=self.compare_calendars, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(inner, text="⌨️ Keyboard Shortcuts",
                 command=self.show_shortcuts, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(inner, text="ℹ️ About",
                 command=self.show_about, **btn_style).pack(fill=tk.X)
    
    def create_info_row(self, parent, label_text):
        """Create info row"""
        row = tk.Frame(parent, bg=self.colors['surface'])
        row.pack(fill=tk.X, pady=4)
        
        tk.Label(row,
                text=label_text,
                font=('Inter', 9, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text_muted'],
                width=12,
                anchor=tk.W).pack(side=tk.LEFT)
        
        value_label = tk.Label(row,
                              text="",
                              font=('Inter', 10),
                              bg=self.colors['surface'],
                              fg=self.colors['text'],
                              anchor=tk.W)
        value_label.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        return value_label
    
    def update_calendar(self):
        """Update calendar with enhanced features"""
        month_name = self.calendar.MONTH_NAMES[self.current_month - 1]
        self.month_year_label.config(text=f"{month_name} {self.current_year}")
        
        # Clear calendar
        for row in self.calendar_grid:
            for cell in row:
                cell.day_label.config(text="")
                cell.emoji_label.config(text="")
                cell.note_indicator.pack_forget()
                cell.configure(bg=self.colors['bg'])
                for widget in cell.winfo_children():
                    if hasattr(widget, 'winfo_children'):
                        for child in widget.winfo_children():
                            child.configure(bg=self.colors['bg'])
        
        # Get month data
        month_days, first_weekday = self.calendar.get_month_days(self.current_year, self.current_month)
        start_col = first_weekday
        current_day = 1
        
        # Fill calendar
        for row in range(6):
            for col in range(7):
                if current_day > month_days:
                    break
                
                if row == 0 and col < start_col:
                    continue
                
                cell = self.calendar_grid[row][col]
                cell.day_label.config(text=str(current_day))
                
                # Default styling
                bg_color = self.colors['bg']
                fg_color = self.colors['text']
                font = ('Inter', 14)
                
                # Check if today
                today_essene = self.calendar.gregorian_to_essene(datetime.date.today())
                if (self.current_year, self.current_month, current_day) == today_essene:
                    bg_color = self.colors['today']
                    fg_color = 'white'
                    font = ('Inter', 14, 'bold')
                
                # Check if festival
                if self.calendar.is_festival(self.current_month, current_day):
                    bg_color = self.colors['festival']
                    fg_color = 'white'
                    font = ('Inter', 14, 'bold')
                    emoji = self.calendar.get_festival_emoji(self.current_month, current_day)
                    cell.emoji_label.config(text=emoji, bg=bg_color)
                    cell.emoji_label.pack()
                
                # Check if Sabbath
                weekday = (start_col + col - start_col + (row * 7)) % 7
                if weekday == 3:  # Saturday
                    if not self.calendar.is_festival(self.current_month, current_day):
                        bg_color = self.colors['sabbath']
                        fg_color = 'white'
                
                # Check if Tekufah
                if self.calendar.is_tekufah(self.current_month, current_day):
                    bg_color = self.colors['tekufah']
                    fg_color = 'white'
                    font = ('Inter', 14, 'bold')
                
                # Apply styling
                cell.configure(bg=bg_color)
                for widget in cell.winfo_children():
                    if hasattr(widget, 'winfo_children'):
                        widget.configure(bg=bg_color)
                        for child in widget.winfo_children():
                            child.configure(bg=bg_color, fg=fg_color, font=font)
                
                # Check for notes
                note_key = f"{self.current_year}-{self.current_month:02d}-{current_day:02d}"
                if note_key in self.notes:
                    cell.note_indicator.pack()
                
                current_day += 1
    
    def change_month(self, delta):
        self.current_month += delta
        if self.current_month > 12:
            self.current_month = 1
            self.current_year += 1
        elif self.current_month < 1:
            self.current_month = 12
            self.current_year -= 1
        self.update_calendar()
        self.update_upcoming_festivals()
    
    def change_year(self, delta):
        self.current_year += delta
        self.update_calendar()
        self.update_upcoming_festivals()
    
    def go_to_today(self):
        today_essene = self.calendar.gregorian_to_essene(datetime.date.today())
        self.current_year, self.current_month, day = today_essene
        self.update_calendar()
        self.show_date_info(today_essene[0], today_essene[1], today_essene[2])
    
    def on_day_click(self, row, col):
        cell = self.calendar_grid[row][col]
        day_text = cell.day_label.cget('text')
        
        if day_text.strip():
            day = int(day_text)
            self.show_date_info(self.current_year, self.current_month, day)
    
    def quick_note(self, row, col):
        """Quick note on right-click"""
        cell = self.calendar_grid[row][col]
        day_text = cell.day_label.cget('text')
        
        if day_text.strip():
            day = int(day_text)
            note_key = f"{self.current_year}-{self.current_month:02d}-{day:02d}"
            
            # Simple dialog
            dialog = tk.Toplevel(self.root)
            dialog.title("Quick Note")
            dialog.geometry("400x200")
            dialog.configure(bg=self.colors['bg'])
            dialog.transient(self.root)
            dialog.grab_set()
            
            # Center dialog
            dialog.update_idletasks()
            x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 200
            y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 100
            dialog.geometry(f"+{x}+{y}")
            
            frame = tk.Frame(dialog, bg=self.colors['surface'])
            frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
            
            tk.Label(frame,
                    text=f"Note for {self.calendar.MONTH_NAMES[self.current_month-1]} {day}",
                    font=('Inter', 12, 'bold'),
                    bg=self.colors['surface'],
                    fg=self.colors['text']).pack(pady=(0, 10))
            
            text = tk.Text(frame,
                          height=5,
                          font=('Inter', 10),
                          bg=self.colors['bg'],
                          fg=self.colors['text'],
                          wrap=tk.WORD,
                          relief=tk.FLAT,
                          bd=0,
                          padx=10,
                          pady=8)
            text.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
            
            if note_key in self.notes:
                text.insert('1.0', self.notes[note_key])
            
            def save_note():
                note_text = text.get('1.0', tk.END).strip()
                if note_text:
                    self.notes[note_key] = note_text
                elif note_key in self.notes:
                    del self.notes[note_key]
                self.save_notes()
                self.update_calendar()
                dialog.destroy()
            
            btn_frame = tk.Frame(frame, bg=self.colors['surface'])
            btn_frame.pack()
            
            tk.Button(btn_frame,
                     text="Save",
                     command=save_note,
                     font=('Inter', 10, 'bold'),
                     bg=self.colors['primary'],
                     fg='white',
                     bd=0,
                     padx=20,
                     pady=8,
                     cursor='hand2').pack(side=tk.LEFT, padx=5)
            
            tk.Button(btn_frame,
                     text="Cancel",
                     command=dialog.destroy,
                     font=('Inter', 10),
                     bg=self.colors['surface_light'],
                     fg=self.colors['text'],
                     bd=0,
                     padx=20,
                     pady=8,
                     cursor='hand2').pack(side=tk.LEFT, padx=5)
    
    def show_date_info(self, year, month, day):
        """Display selected date with notes"""
        month_name = self.calendar.MONTH_NAMES[month - 1]
        self.selected_date_label.config(
            text=f"{month_name} {day}, {year}",
            fg=self.colors['text'],
            font=('Inter', 13, 'bold')
        )
        
        self.essene_label.config(text=f"{year}-{month:02d}-{day:02d}")
        gregorian_date = self.calendar.essene_to_gregorian(year, month, day)
        self.gregorian_label.config(text=gregorian_date.strftime("%Y-%m-%d"))
        weekday = self.calendar.get_weekday_name(year, month, day)
        self.weekday_label.config(text=weekday)
        
        # Festival info
        festival_name = self.calendar.get_festival_name(month, day)
        emoji = self.calendar.get_festival_emoji(month, day)
        
        if festival_name:
            self.festival_label.config(text=f"{emoji} {festival_name}")
            self.festival_frame.config(bg=self.colors['festival'])
            self.festival_label.config(bg=self.colors['festival'])
            self.festival_frame.pack(fill=tk.X, pady=(10, 0))
        elif self.calendar.is_tekufah(month, day):
            tekufah_name = self.calendar.get_tekufah_name(month, day)
            self.festival_label.config(text=f"🌱 {tekufah_name}")
            self.festival_frame.config(bg=self.colors['tekufah'])
            self.festival_label.config(bg=self.colors['tekufah'])
            self.festival_frame.pack(fill=tk.X, pady=(10, 0))
        else:
            self.festival_frame.pack_forget()
        
        # Show note if exists
        note_key = f"{year}-{month:02d}-{day:02d}"
        if note_key in self.notes:
            self.note_display.delete('1.0', tk.END)
            self.note_display.insert('1.0', self.notes[note_key])
            self.note_display.pack(fill=tk.X, pady=(10, 0))
        else:
            self.note_display.pack_forget()
    
    def convert_gregorian(self):
        try:
            date_str = self.gregorian_entry.get()
            gregorian_date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
            essene_date = self.calendar.gregorian_to_essene(gregorian_date)
            
            month_name = self.calendar.MONTH_NAMES[essene_date[1] - 1]
            result = f"✓ {month_name} {essene_date[2]}, {essene_date[0]}"
            self.gregorian_result.config(text=result, fg=self.colors['success'])
            
            self.current_year, self.current_month, _ = essene_date
            self.update_calendar()
            self.show_date_info(*essene_date)
        except ValueError:
            self.gregorian_result.config(text="✗ Invalid format (use YYYY-MM-DD)", 
                                        fg=self.colors['festival'])
    
    def convert_essene(self):
        try:
            date_str = self.essene_entry.get()
            year, month, day = map(int, date_str.split('-'))
            
            if month < 1 or month > 12 or day < 1 or day > self.calendar.MONTH_DAYS[month - 1]:
                raise ValueError()
            
            gregorian_date = self.calendar.essene_to_gregorian(year, month, day)
            result = f"✓ {gregorian_date.strftime('%Y-%m-%d (%A)')}"
            self.essene_result.config(text=result, fg=self.colors['success'])
        except (ValueError, IndexError):
            self.essene_result.config(text="✗ Invalid format (use YYYY-MM-DD)", 
                                     fg=self.colors['festival'])
    
    def export_calendar(self):
        """Enhanced export with notes"""
        filename = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("Markdown", "*.md"), ("All files", "*.*")],
            title="Export Essene Calendar"
        )
        
        if filename:
            try:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(f"# ESSENE CALENDAR - YEAR {self.current_year}\n")
                    f.write("=" * 70 + "\n\n")
                    f.write("Ancient Hebrew Solar Calendar • 364 Days • 52 Weeks\n")
                    f.write("Based on Dead Sea Scrolls\n\n")
                    
                    for month in range(1, 13):
                        month_name = self.calendar.MONTH_NAMES[month - 1]
                        f.write(f"\n## {month_name}\n")
                        f.write("-" * 50 + "\n\n")
                        
                        month_days = self.calendar.MONTH_DAYS[month - 1]
                        for day in range(1, month_days + 1):
                            gregorian_date = self.calendar.essene_to_gregorian(
                                self.current_year, month, day)
                            weekday = gregorian_date.strftime("%A")
                            
                            line = f"{day:2d}. {weekday:9s} | {gregorian_date.strftime('%Y-%m-%d')}"
                            
                            # Add festival
                            festival = self.calendar.get_festival_name(month, day)
                            emoji = self.calendar.get_festival_emoji(month, day)
                            if festival:
                                line += f" | {emoji} {festival}"
                            
                            # Add tekufah
                            if self.calendar.is_tekufah(month, day):
                                tekufah = self.calendar.get_tekufah_name(month, day)
                                line += f" | 🌱 {tekufah}"
                            
                            # Add note
                            note_key = f"{self.current_year}-{month:02d}-{day:02d}"
                            if note_key in self.notes:
                                line += f"\n    NOTE: {self.notes[note_key]}"
                            
                            f.write(line + "\n")
                
                messagebox.showinfo("Export Complete",
                                   f"Calendar exported successfully!\n\n{filename}",
                                   parent=self.root)
            except Exception as e:
                messagebox.showerror("Export Error",
                                    f"Failed to export: {str(e)}",
                                    parent=self.root)
    
    def show_festivals(self):
        """Enhanced festivals window"""
        window = tk.Toplevel(self.root)
        window.title("Essene Festivals")
        window.geometry("800x650")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 400
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 325
        window.geometry(f"+{x}+{y}")
        
        container = tk.Frame(window, bg=self.colors['bg'])
        container.pack(fill=tk.BOTH, expand=True, padx=30, pady=30)
        
        tk.Label(container,
                text="Essene Festivals",
                font=('Inter', 24, 'bold'),
                bg=self.colors['bg'],
                fg=self.colors['text']).pack(pady=(0, 10))
        
        tk.Label(container,
                text="All festivals fall on the same weekday every year",
                font=('Inter', 12),
                bg=self.colors['bg'],
                fg=self.colors['text_muted']).pack(pady=(0, 20))
        
        card = tk.Frame(container, bg=self.colors['surface'])
        card.pack(fill=tk.BOTH, expand=True)
        
        canvas = tk.Canvas(card, bg=self.colors['surface'], highlightthickness=0)
        scrollbar = tk.Scrollbar(card, orient=tk.VERTICAL, command=canvas.yview)
        scrollable = tk.Frame(canvas, bg=self.colors['surface'])
        
        scrollable.bind("<Configure>", 
                       lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=scrollable, anchor=tk.NW)
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        inner = tk.Frame(scrollable, bg=self.colors['surface'])
        inner.pack(fill=tk.BOTH, padx=25, pady=25)
        
        festivals = sorted(self.calendar.FESTIVALS.items(),
                          key=lambda x: (x[0][0], x[0][1]))
        
        for (month, day), (name, emoji) in festivals:
            month_name = self.calendar.MONTH_NAMES[month - 1]
            gregorian_date = self.calendar.essene_to_gregorian(
                self.current_year, month, day)
            weekday = gregorian_date.strftime("%A")
            
            item = tk.Frame(inner, bg=self.colors['bg'])
            item.pack(fill=tk.X, pady=6)
            
            item_inner = tk.Frame(item, bg=self.colors['bg'])
            item_inner.pack(fill=tk.X, padx=15, pady=12)
            
            header = tk.Frame(item_inner, bg=self.colors['bg'])
            header.pack(fill=tk.X)
            
            tk.Label(header,
                    text=emoji,
                    font=('Inter', 20),
                    bg=self.colors['bg']).pack(side=tk.LEFT, padx=(0, 10))
            
            info = tk.Frame(header, bg=self.colors['bg'])
            info.pack(side=tk.LEFT, fill=tk.X, expand=True)
            
            tk.Label(info,
                    text=name,
                    font=('Inter', 14, 'bold'),
                    bg=self.colors['bg'],
                    fg=self.colors['text'],
                    anchor=tk.W).pack(fill=tk.X)
            
            tk.Label(info,
                    text=f"{month_name} {day} • Always {weekday}",
                    font=('Inter', 11),
                    bg=self.colors['bg'],
                    fg=self.colors['text_muted'],
                    anchor=tk.W).pack(fill=tk.X, pady=(2, 0))
            
            tk.Label(info,
                    text=f"Gregorian: {gregorian_date.strftime('%Y-%m-%d')}",
                    font=('Inter', 9),
                    bg=self.colors['bg'],
                    fg=self.colors['text_muted'],
                    anchor=tk.W).pack(fill=tk.X, pady=(2, 0))
    
    def compare_calendars(self):
        """Compare Essene with Gregorian calendar"""
        window = tk.Toplevel(self.root)
        window.title("Calendar Comparison")
        window.geometry("900x700")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 450
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 350
        window.geometry(f"+{x}+{y}")
        
        container = tk.Frame(window, bg=self.colors['bg'])
        container.pack(fill=tk.BOTH, expand=True, padx=30, pady=30)
        
        tk.Label(container,
                text="Calendar Systems Comparison",
                font=('Inter', 24, 'bold'),
                bg=self.colors['bg'],
                fg=self.colors['text']).pack(pady=(0, 20))
        
        # Comparison data
        comparisons = [
            ("Calendar Type", "Essene", "Gregorian"),
            ("Days per Year", "364 (fixed)", "365 or 366"),
            ("Weeks per Year", "52 (exact)", "~52.14"),
            ("Basis", "Solar", "Solar"),
            ("Leap Years", "None", "Every 4 years*"),
            ("Month Count", "12", "12"),
            ("Month Lengths", "30 or 31 days", "28-31 days"),
            ("Week Alignment", "Perfect", "Varies"),
            ("Date Consistency", "Same weekday yearly", "Shifts yearly"),
            ("Origin", "Dead Sea Scrolls", "Roman/Christian"),
            ("Year Start", "Wed after equinox", "January 1"),
        ]
        
        # Create table
        card = tk.Frame(container, bg=self.colors['surface'])
        card.pack(fill=tk.BOTH, expand=True)
        
        inner = tk.Frame(card, bg=self.colors['surface'])
        inner.pack(fill=tk.BOTH, padx=25, pady=25)
        
        # Header row
        header = tk.Frame(inner, bg=self.colors['bg'])
        header.pack(fill=tk.X, pady=(0, 5))
        
        for i, text in enumerate(["Feature", "Essene", "Gregorian"]):
            tk.Label(header,
                    text=text,
                    font=('Inter', 12, 'bold'),
                    bg=self.colors['bg'],
                    fg=self.colors['text'],
                    width=20 if i == 0 else 25,
                    anchor=tk.W).pack(side=tk.LEFT, padx=5)
        
        # Data rows
        for feature, essene, gregorian in comparisons:
            row = tk.Frame(inner, bg=self.colors['bg'])
            row.pack(fill=tk.X, pady=3)
            
            tk.Label(row,
                    text=feature,
                    font=('Inter', 10, 'bold'),
                    bg=self.colors['bg'],
                    fg=self.colors['text_muted'],
                    width=20,
                    anchor=tk.W).pack(side=tk.LEFT, padx=5)
            
            tk.Label(row,
                    text=essene,
                    font=('Inter', 10),
                    bg=self.colors['bg'],
                    fg=self.colors['primary'],
                    width=25,
                    anchor=tk.W).pack(side=tk.LEFT, padx=5)
            
            tk.Label(row,
                    text=gregorian,
                    font=('Inter', 10),
                    bg=self.colors['bg'],
                    fg=self.colors['text'],
                    width=25,
                    anchor=tk.W).pack(side=tk.LEFT, padx=5)
    
    def show_shortcuts(self):
        """Show keyboard shortcuts"""
        window = tk.Toplevel(self.root)
        window.title("Keyboard Shortcuts")
        window.geometry("600x500")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        window.grab_set()
        
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 300
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 250
        window.geometry(f"+{x}+{y}")
        
        container = tk.Frame(window, bg=self.colors['surface'])
        container.pack(fill=tk.BOTH, expand=True, padx=30, pady=30)
        
        tk.Label(container,
                text="⌨️ Keyboard Shortcuts",
                font=('Inter', 20, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(pady=(0, 20))
        
        shortcuts = [
            ("Navigation", ""),
            ("←", "Previous month"),
            ("→", "Next month"),
            ("↑", "Previous year"),
            ("↓", "Next year"),
            ("Home", "Go to today"),
            ("", ""),
            ("Actions", ""),
            ("Ctrl+E", "Export calendar"),
            ("Ctrl+F", "View festivals"),
            ("Right-click date", "Quick note"),
        ]
        
        for key, description in shortcuts:
            if not key:
                tk.Frame(container, height=10, bg=self.colors['surface']).pack()
                continue
            
            if not description:
                tk.Label(container,
                        text=key,
                        font=('Inter', 12, 'bold'),
                        bg=self.colors['surface'],
                        fg=self.colors['primary']).pack(anchor=tk.W, pady=(10, 5))
            else:
                row = tk.Frame(container, bg=self.colors['surface'])
                row.pack(fill=tk.X, pady=3)
                
                tk.Label(row,
                        text=key,
                        font=('Inter', 11, 'bold'),
                        bg=self.colors['bg'],
                        fg=self.colors['text'],
                        width=15,
                        relief=tk.FLAT,
                        bd=0,
                        padx=10,
                        pady=5).pack(side=tk.LEFT, padx=(0, 15))
                
                tk.Label(row,
                        text=description,
                        font=('Inter', 10),
                        bg=self.colors['surface'],
                        fg=self.colors['text_muted'],
                        anchor=tk.W).pack(side=tk.LEFT, fill=tk.X, expand=True)
    
    def show_about(self):
        """Enhanced about dialog"""
        window = tk.Toplevel(self.root)
        window.title("About Essene Calendar")
        window.geometry("700x600")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        window.grab_set()
        
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 350
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 300
        window.geometry(f"+{x}+{y}")
        
        container = tk.Frame(window, bg=self.colors['surface'])
        container.pack(fill=tk.BOTH, expand=True, padx=40, pady=40)
        
        tk.Label(container,
                text="📅",
                font=('Inter', 48),
                bg=self.colors['surface']).pack(pady=(0, 10))
        
        tk.Label(container,
                text="Essene Calendar",
                font=('Inter', 28, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(pady=(0, 5))
        
        tk.Label(container,
                text="Ancient Hebrew Solar Calendar",
                font=('Inter', 14),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(pady=(0, 30))
        
        about_text = """The Essene Calendar is based on the 364-day solar calendar used by the Essenes, the ancient Jewish sect that wrote the Dead Sea Scrolls.

KEY FEATURES:
• 364 days = 52 perfect weeks
• 12 months: 8 of 30 days, 4 of 31 days  
• Fixed calendar - dates fall on same weekday yearly
• Begins Wednesday after vernal equinox
• All festivals on consistent weekdays

HISTORICAL BACKGROUND:
The Essenes lived near the Dead Sea (150 BCE - 70 CE). Their unique calendar was discovered in the Dead Sea Scrolls at Qumran and represents an alternative to mainstream Hebrew lunar calendars.

ENHANCED FEATURES:
✓ Modern, intuitive interface
✓ Date conversion tools
✓ Personal notes on any date
✓ Upcoming festivals view
✓ Calendar statistics
✓ Export functionality
✓ Keyboard shortcuts

This application provides historically accurate implementation based on scholarly research of calendrical texts from Qumran."""
        
        text = tk.Text(container,
                      wrap=tk.WORD,
                      font=('Inter', 10),
                      bg=self.colors['surface'],
                      fg=self.colors['text'],
                      relief=tk.FLAT,
                      bd=0,
                      height=18)
        text.pack(fill=tk.BOTH, expand=True, pady=(0, 20))
        text.insert('1.0', about_text)
        text.config(state=tk.DISABLED)
        
        tk.Button(container,
                 text="Close",
                 command=window.destroy,
                 font=('Inter', 11, 'bold'),
                 bg=self.colors['primary'],
                 fg='white',
                 bd=0,
                 padx=30,
                 pady=10,
                 cursor='hand2',
                 activebackground=self.colors['primary_dark']).pack()
    
    def run(self):
        """Run the application"""
        self.root.mainloop()


if __name__ == "__main__":
    app = ModernEsseneCalendarApp()
    app.run()
