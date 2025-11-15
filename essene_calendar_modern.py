#!/usr/bin/env python3
"""
Essene Calendar - Modern GUI Application
A beautiful implementation of the ancient Hebrew solar calendar
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import datetime
import calendar
from pathlib import Path

class EsseneCalendar:
    """Essene Calendar calculations"""
    
    MONTH_NAMES = [
        "Nisan", "Iyyar", "Sivan", "Tammuz", "Av", "Elul",
        "Tishrei", "Marcheshvan", "Kislev", "Tevet", "Shevat", "Adar"
    ]
    
    MONTH_DAYS = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31]
    
    FESTIVALS = {
        (1, 14): "Passover",
        (1, 15): "Unleavened Bread (Day 1)",
        (1, 21): "Last Day of Unleavened Bread",
        (3, 15): "Feast of Weeks (Shavuot)",
        (3, 22): "Festival of New Wine",
        (5, 3): "Festival of New Oil",
        (7, 1): "Feast of Trumpets",
        (7, 10): "Yom Kippur",
        (7, 15): "Sukkot (Day 1)",
        (7, 22): "Last Day of Sukkot"
    }
    
    TEKUFAH_DAYS = [(3, 31), (6, 31), (9, 31), (12, 31)]
    
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
        return self.FESTIVALS.get((month, day), "")
    
    def get_weekday_name(self, year, month, day):
        gregorian_date = self.essene_to_gregorian(year, month, day)
        return gregorian_date.strftime("%A")


class ModernEsseneCalendarApp:
    """Modern, beautiful calendar application"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Essene Calendar")
        self.root.geometry("1400x900")
        
        # Modern color scheme
        self.colors = {
            'bg': '#0f172a',           # Dark slate background
            'surface': '#1e293b',      # Card background
            'surface_light': '#334155', # Hover states
            'primary': '#3b82f6',      # Blue accent
            'primary_dark': '#2563eb',
            'text': '#f1f5f9',         # Light text
            'text_muted': '#94a3b8',   # Muted text
            'border': '#334155',       # Subtle borders
            'festival': '#dc2626',     # Red for festivals
            'sabbath': '#7c3aed',      # Purple for sabbath
            'today': '#10b981',        # Green for today
            'tekufah': '#f59e0b',      # Amber for seasonal
        }
        
        self.root.configure(bg=self.colors['bg'])
        
        # Initialize calendar
        self.calendar = EsseneCalendar()
        self.current_year = datetime.date.today().year
        self.current_month = 1
        self.selected_date = None
        
        # Configure styles
        self.setup_styles()
        
        # Create UI
        self.create_ui()
        self.update_calendar()
        
        # Center window
        self.root.update_idletasks()
        x = (self.root.winfo_screenwidth() // 2) - (1400 // 2)
        y = (self.root.winfo_screenheight() // 2) - (900 // 2)
        self.root.geometry(f'1400x900+{x}+{y}')
    
    def setup_styles(self):
        """Configure modern ttk styles"""
        style = ttk.Style()
        style.theme_use('default')
        
        # Configure base styles
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
        
        # Button styles
        style.configure('TButton',
                       background=self.colors['surface'],
                       foreground=self.colors['text'],
                       borderwidth=0,
                       focuscolor='none',
                       padding=(16, 8),
                       font=('Inter', 10))
        style.map('TButton',
                 background=[('active', self.colors['surface_light'])])
        
        # Primary button
        style.configure('Primary.TButton',
                       background=self.colors['primary'],
                       foreground='white',
                       padding=(16, 8),
                       font=('Inter', 10, 'bold'))
        style.map('Primary.TButton',
                 background=[('active', self.colors['primary_dark'])])
    
    def create_ui(self):
        """Create modern UI layout"""
        # Main container with padding
        main_container = tk.Frame(self.root, bg=self.colors['bg'])
        main_container.pack(fill=tk.BOTH, expand=True, padx=40, pady=30)
        
        # Header
        self.create_header(main_container)
        
        # Content area
        content = tk.Frame(main_container, bg=self.colors['bg'])
        content.pack(fill=tk.BOTH, expand=True, pady=(20, 0))
        
        # Left panel - Calendar (70% width)
        left_panel = tk.Frame(content, bg=self.colors['bg'])
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 20))
        
        # Right panel - Info sidebar (30% width)
        right_panel = tk.Frame(content, bg=self.colors['bg'], width=400)
        right_panel.pack(side=tk.RIGHT, fill=tk.Y)
        right_panel.pack_propagate(False)
        
        self.create_calendar_panel(left_panel)
        self.create_sidebar(right_panel)
    
    def create_header(self, parent):
        """Create modern header"""
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
                           text="Ancient Hebrew Solar Calendar • Dead Sea Scrolls",
                           font=('Inter', 12),
                           bg=self.colors['bg'],
                           fg=self.colors['text_muted'])
        subtitle.pack(anchor=tk.W, pady=(2, 0))
        
        # Right side - Navigation
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
        
        # Style for nav buttons
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
        """Create modern calendar grid"""
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
        
        for i, day in enumerate(weekdays):
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
        """Create individual day cell"""
        cell = tk.Frame(parent, bg=self.colors['bg'], cursor='hand2')
        
        # Day number
        day_label = tk.Label(cell,
                            text="",
                            font=('Inter', 14),
                            bg=self.colors['bg'],
                            fg=self.colors['text'],
                            width=4,
                            height=3)
        day_label.pack(fill=tk.BOTH, expand=True)
        
        # Store label reference
        cell.day_label = day_label
        
        # Click binding
        cell.bind('<Button-1>', lambda e, r=row, c=col: self.on_day_click(r, c))
        day_label.bind('<Button-1>', lambda e, r=row, c=col: self.on_day_click(r, c))
        
        # Hover effect
        def on_enter(e):
            if cell.day_label.cget('text'):
                current_bg = cell.cget('bg')
                if current_bg == self.colors['bg']:
                    cell.configure(bg=self.colors['surface'])
                    cell.day_label.configure(bg=self.colors['surface'])
        
        def on_leave(e):
            if cell.day_label.cget('text'):
                current_bg = cell.cget('bg')
                if current_bg == self.colors['surface']:
                    cell.configure(bg=self.colors['bg'])
                    cell.day_label.configure(bg=self.colors['bg'])
        
        cell.bind('<Enter>', on_enter)
        cell.bind('<Leave>', on_leave)
        day_label.bind('<Enter>', on_enter)
        day_label.bind('<Leave>', on_leave)
        
        return cell
    
    def create_sidebar(self, parent):
        """Create modern sidebar"""
        # Date info card
        info_card = tk.Frame(parent, bg=self.colors['surface'])
        info_card.pack(fill=tk.X, pady=(0, 15))
        
        info_inner = tk.Frame(info_card, bg=self.colors['surface'])
        info_inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(info_inner,
                text="Selected Date",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        self.selected_date_label = tk.Label(info_inner,
                                           text="No date selected",
                                           font=('Inter', 12),
                                           bg=self.colors['surface'],
                                           fg=self.colors['text_muted'],
                                           wraplength=340,
                                           justify=tk.LEFT)
        self.selected_date_label.pack(anchor=tk.W, pady=(0, 10))
        
        # Details
        details_frame = tk.Frame(info_inner, bg=self.colors['surface'])
        details_frame.pack(fill=tk.X, pady=(10, 0))
        
        self.essene_label = self.create_info_row(details_frame, "Essene Date:")
        self.gregorian_label = self.create_info_row(details_frame, "Gregorian:")
        self.weekday_label = self.create_info_row(details_frame, "Day:")
        
        # Festival indicator
        self.festival_frame = tk.Frame(info_inner, bg=self.colors['festival'])
        self.festival_label = tk.Label(self.festival_frame,
                                      text="",
                                      font=('Inter', 11, 'bold'),
                                      bg=self.colors['festival'],
                                      fg='white',
                                      wraplength=340)
        self.festival_label.pack(padx=12, pady=8)
        
        # Conversion tool card
        convert_card = tk.Frame(parent, bg=self.colors['surface'])
        convert_card.pack(fill=tk.X, pady=(0, 15))
        
        convert_inner = tk.Frame(convert_card, bg=self.colors['surface'])
        convert_inner.pack(fill=tk.X, padx=20, pady=20)
        
        tk.Label(convert_inner,
                text="Date Conversion",
                font=('Inter', 14, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(anchor=tk.W, pady=(0, 15))
        
        # Gregorian to Essene
        tk.Label(convert_inner,
                text="Gregorian to Essene",
                font=('Inter', 10, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(0, 5))
        
        g_frame = tk.Frame(convert_inner, bg=self.colors['surface'])
        g_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.gregorian_entry = tk.Entry(g_frame,
                                        font=('Inter', 11),
                                        bg=self.colors['bg'],
                                        fg=self.colors['text'],
                                        insertbackground=self.colors['text'],
                                        relief=tk.FLAT,
                                        bd=0)
        self.gregorian_entry.pack(fill=tk.X, ipady=8, ipadx=10)
        self.gregorian_entry.insert(0, datetime.date.today().strftime("%Y-%m-%d"))
        
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
        
        self.gregorian_result = tk.Label(convert_inner,
                                         text="",
                                         font=('Inter', 10),
                                         bg=self.colors['surface'],
                                         fg=self.colors['text_muted'],
                                         wraplength=340)
        self.gregorian_result.pack(anchor=tk.W, pady=(5, 15))
        
        # Essene to Gregorian
        tk.Label(convert_inner,
                text="Essene to Gregorian",
                font=('Inter', 10, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(0, 5))
        
        e_frame = tk.Frame(convert_inner, bg=self.colors['surface'])
        e_frame.pack(fill=tk.X)
        
        self.essene_entry = tk.Entry(e_frame,
                                     font=('Inter', 11),
                                     bg=self.colors['bg'],
                                     fg=self.colors['text'],
                                     insertbackground=self.colors['text'],
                                     relief=tk.FLAT,
                                     bd=0)
        self.essene_entry.pack(fill=tk.X, ipady=8, ipadx=10)
        
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
        
        self.essene_result = tk.Label(convert_inner,
                                      text="",
                                      font=('Inter', 10),
                                      bg=self.colors['surface'],
                                      fg=self.colors['text_muted'],
                                      wraplength=340)
        self.essene_result.pack(anchor=tk.W, pady=(5, 0))
        
        # Quick actions card
        actions_card = tk.Frame(parent, bg=self.colors['surface'])
        actions_card.pack(fill=tk.X)
        
        actions_inner = tk.Frame(actions_card, bg=self.colors['surface'])
        actions_inner.pack(fill=tk.X, padx=20, pady=20)
        
        btn_style = {
            'font': ('Inter', 11),
            'bg': self.colors['bg'],
            'fg': self.colors['text'],
            'bd': 0,
            'pady': 12,
            'cursor': 'hand2',
            'activebackground': self.colors['surface_light']
        }
        
        tk.Button(actions_inner, text="📅 View Festivals",
                 command=self.show_festivals, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(actions_inner, text="💾 Export Year",
                 command=self.export_calendar, **btn_style).pack(fill=tk.X, pady=(0, 8))
        tk.Button(actions_inner, text="ℹ️ About",
                 command=self.show_about, **btn_style).pack(fill=tk.X)
    
    def create_info_row(self, parent, label_text):
        """Create info row with label and value"""
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
        """Update calendar display with modern styling"""
        month_name = self.calendar.MONTH_NAMES[self.current_month - 1]
        self.month_year_label.config(text=f"{month_name} {self.current_year}")
        
        # Clear calendar
        for row in self.calendar_grid:
            for cell in row:
                cell.day_label.config(text="")
                cell.configure(bg=self.colors['bg'])
                cell.day_label.configure(bg=self.colors['bg'], fg=self.colors['text'])
        
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
                
                # Check if today
                today_essene = self.calendar.gregorian_to_essene(datetime.date.today())
                if (self.current_year, self.current_month, current_day) == today_essene:
                    cell.configure(bg=self.colors['today'])
                    cell.day_label.configure(bg=self.colors['today'], fg='white',
                                            font=('Inter', 14, 'bold'))
                
                # Check if festival
                if self.calendar.is_festival(self.current_month, current_day):
                    cell.configure(bg=self.colors['festival'])
                    cell.day_label.configure(bg=self.colors['festival'], fg='white',
                                            font=('Inter', 14, 'bold'))
                
                # Check if Sabbath (Saturday)
                weekday = (start_col + col - start_col + (row * 7)) % 7
                if weekday == 3:  # Saturday
                    if not self.calendar.is_festival(self.current_month, current_day):
                        cell.configure(bg=self.colors['sabbath'])
                        cell.day_label.configure(bg=self.colors['sabbath'], fg='white')
                
                # Check if Tekufah
                if self.calendar.is_tekufah(self.current_month, current_day):
                    cell.configure(bg=self.colors['tekufah'])
                    cell.day_label.configure(bg=self.colors['tekufah'], fg='white',
                                            font=('Inter', 14, 'bold'))
                
                current_day += 1
    
    def change_month(self, delta):
        """Navigate months"""
        self.current_month += delta
        if self.current_month > 12:
            self.current_month = 1
            self.current_year += 1
        elif self.current_month < 1:
            self.current_month = 12
            self.current_year -= 1
        self.update_calendar()
    
    def change_year(self, delta):
        """Navigate years"""
        self.current_year += delta
        self.update_calendar()
    
    def go_to_today(self):
        """Jump to today's date"""
        today_essene = self.calendar.gregorian_to_essene(datetime.date.today())
        self.current_year, self.current_month, day = today_essene
        self.update_calendar()
        self.show_date_info(today_essene[0], today_essene[1], today_essene[2])
    
    def on_day_click(self, row, col):
        """Handle day cell click"""
        cell = self.calendar_grid[row][col]
        day_text = cell.day_label.cget('text')
        
        if day_text.strip():
            day = int(day_text)
            self.show_date_info(self.current_year, self.current_month, day)
    
    def show_date_info(self, year, month, day):
        """Display selected date information"""
        month_name = self.calendar.MONTH_NAMES[month - 1]
        self.selected_date_label.config(
            text=f"{month_name} {day}, {year}",
            fg=self.colors['text'],
            font=('Inter', 13, 'bold')
        )
        
        # Essene date
        self.essene_label.config(text=f"{year}-{month:02d}-{day:02d}")
        
        # Gregorian date
        gregorian_date = self.calendar.essene_to_gregorian(year, month, day)
        self.gregorian_label.config(text=gregorian_date.strftime("%Y-%m-%d"))
        
        # Weekday
        weekday = self.calendar.get_weekday_name(year, month, day)
        self.weekday_label.config(text=weekday)
        
        # Festival info
        festival_name = self.calendar.get_festival_name(month, day)
        if festival_name:
            self.festival_label.config(text=f"🎉 {festival_name}")
            self.festival_frame.config(bg=self.colors['festival'])
            self.festival_label.config(bg=self.colors['festival'])
            self.festival_frame.pack(fill=tk.X, pady=(10, 0))
        elif self.calendar.is_tekufah(month, day):
            self.festival_label.config(text="🌱 Seasonal Transition (Tekufah)")
            self.festival_frame.config(bg=self.colors['tekufah'])
            self.festival_label.config(bg=self.colors['tekufah'])
            self.festival_frame.pack(fill=tk.X, pady=(10, 0))
        else:
            self.festival_frame.pack_forget()
    
    def convert_gregorian(self):
        """Convert Gregorian date to Essene"""
        try:
            date_str = self.gregorian_entry.get()
            gregorian_date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
            essene_date = self.calendar.gregorian_to_essene(gregorian_date)
            
            month_name = self.calendar.MONTH_NAMES[essene_date[1] - 1]
            result = f"{month_name} {essene_date[2]}, {essene_date[0]}"
            self.gregorian_result.config(text=result, fg=self.colors['primary'])
            
            self.current_year, self.current_month, _ = essene_date
            self.update_calendar()
            self.show_date_info(*essene_date)
        except ValueError:
            self.gregorian_result.config(text="Invalid format (use YYYY-MM-DD)", fg=self.colors['festival'])
    
    def convert_essene(self):
        """Convert Essene date to Gregorian"""
        try:
            date_str = self.essene_entry.get()
            year, month, day = map(int, date_str.split('-'))
            
            if month < 1 or month > 12 or day < 1 or day > self.calendar.MONTH_DAYS[month - 1]:
                raise ValueError()
            
            gregorian_date = self.calendar.essene_to_gregorian(year, month, day)
            result = gregorian_date.strftime("%Y-%m-%d (%A)")
            self.essene_result.config(text=result, fg=self.colors['primary'])
        except (ValueError, IndexError):
            self.essene_result.config(text="Invalid format (use YYYY-MM-DD)", fg=self.colors['festival'])
    
    def export_calendar(self):
        """Export calendar to text file"""
        filename = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
            title="Export Essene Calendar"
        )
        
        if filename:
            try:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(f"ESSENE CALENDAR - YEAR {self.current_year}\n")
                    f.write("=" * 60 + "\n\n")
                    
                    for month in range(1, 13):
                        month_name = self.calendar.MONTH_NAMES[month - 1]
                        f.write(f"\n{month_name}:\n")
                        f.write("-" * 40 + "\n")
                        
                        month_days = self.calendar.MONTH_DAYS[month - 1]
                        for day in range(1, month_days + 1):
                            gregorian_date = self.calendar.essene_to_gregorian(
                                self.current_year, month, day)
                            weekday = gregorian_date.strftime("%A")
                            festival = self.calendar.get_festival_name(month, day)
                            
                            line = f"  {day:2d} - {weekday:9s} - {gregorian_date.strftime('%Y-%m-%d')}"
                            if festival:
                                line += f" - {festival}"
                            if self.calendar.is_tekufah(month, day):
                                line += " - Seasonal Transition"
                            
                            f.write(line + "\n")
                
                messagebox.showinfo("Export Complete",
                                   f"Calendar exported successfully to:\n{filename}",
                                   parent=self.root)
            except Exception as e:
                messagebox.showerror("Export Error",
                                    f"Failed to export: {str(e)}",
                                    parent=self.root)
    
    def show_festivals(self):
        """Display festivals window"""
        window = tk.Toplevel(self.root)
        window.title("Essene Festivals")
        window.geometry("700x600")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        
        # Center window
        window.update_idletasks()
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 350
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 300
        window.geometry(f"+{x}+{y}")
        
        # Container
        container = tk.Frame(window, bg=self.colors['bg'])
        container.pack(fill=tk.BOTH, expand=True, padx=30, pady=30)
        
        # Header
        tk.Label(container,
                text="Essene Festivals",
                font=('Inter', 20, 'bold'),
                bg=self.colors['bg'],
                fg=self.colors['text']).pack(pady=(0, 20))
        
        # Card
        card = tk.Frame(container, bg=self.colors['surface'])
        card.pack(fill=tk.BOTH, expand=True)
        
        # Scrollable content
        canvas = tk.Canvas(card, bg=self.colors['surface'],
                          highlightthickness=0)
        scrollbar = tk.Scrollbar(card, orient=tk.VERTICAL,
                                command=canvas.yview)
        scrollable_frame = tk.Frame(canvas, bg=self.colors['surface'])
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor=tk.NW)
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Add festival list
        inner = tk.Frame(scrollable_frame, bg=self.colors['surface'])
        inner.pack(fill=tk.BOTH, padx=25, pady=25)
        
        festivals = sorted(self.calendar.FESTIVALS.items(),
                          key=lambda x: (x[0][0], x[0][1]))
        
        for (month, day), name in festivals:
            month_name = self.calendar.MONTH_NAMES[month - 1]
            gregorian_date = self.calendar.essene_to_gregorian(
                self.current_year, month, day)
            weekday = gregorian_date.strftime("%A")
            
            # Festival item
            item = tk.Frame(inner, bg=self.colors['bg'])
            item.pack(fill=tk.X, pady=8)
            
            item_inner = tk.Frame(item, bg=self.colors['bg'])
            item_inner.pack(fill=tk.X, padx=15, pady=12)
            
            tk.Label(item_inner,
                    text=name,
                    font=('Inter', 13, 'bold'),
                    bg=self.colors['bg'],
                    fg=self.colors['text']).pack(anchor=tk.W)
            
            tk.Label(item_inner,
                    text=f"{month_name} {day} • Always {weekday}",
                    font=('Inter', 10),
                    bg=self.colors['bg'],
                    fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(4, 0))
            
            tk.Label(item_inner,
                    text=f"Gregorian: {gregorian_date.strftime('%Y-%m-%d')}",
                    font=('Inter', 9),
                    bg=self.colors['bg'],
                    fg=self.colors['text_muted']).pack(anchor=tk.W, pady=(2, 0))
    
    def show_about(self):
        """Display about dialog"""
        window = tk.Toplevel(self.root)
        window.title("About Essene Calendar")
        window.geometry("650x500")
        window.configure(bg=self.colors['bg'])
        window.transient(self.root)
        window.grab_set()
        
        # Center window
        window.update_idletasks()
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - 325
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - 250
        window.geometry(f"+{x}+{y}")
        
        # Container
        container = tk.Frame(window, bg=self.colors['surface'])
        container.pack(fill=tk.BOTH, expand=True, padx=40, pady=40)
        
        tk.Label(container,
                text="Essene Calendar",
                font=('Inter', 24, 'bold'),
                bg=self.colors['surface'],
                fg=self.colors['text']).pack(pady=(0, 10))
        
        tk.Label(container,
                text="Ancient Hebrew Solar Calendar",
                font=('Inter', 14),
                bg=self.colors['surface'],
                fg=self.colors['text_muted']).pack(pady=(0, 30))
        
        about_text = """The Essene Calendar is based on the 364-day solar calendar used by the Essenes, the ancient Jewish sect that wrote the Dead Sea Scrolls.

Key Features:
• 364 days divided into 52 perfect weeks
• 12 months: 8 of 30 days, 4 of 31 days
• Fixed calendar - dates fall on same weekday yearly
• Begins Wednesday after vernal equinox
• All festivals on consistent weekdays

Historical Background:
The Essenes lived near the Dead Sea (150 BCE - 70 CE). Their calendar was discovered in the Dead Sea Scrolls at Qumran and represents an alternative to mainstream Hebrew lunar calendars.

This application provides an accurate implementation based on scholarly research of calendrical texts from Qumran."""
        
        text = tk.Text(container,
                      wrap=tk.WORD,
                      font=('Inter', 11),
                      bg=self.colors['surface'],
                      fg=self.colors['text'],
                      relief=tk.FLAT,
                      bd=0,
                      height=15)
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
