# Essene Calendar Installation Guide

## Quick Install (Recommended)

1. **Download all files** to a directory
2. **Open terminal** in that directory
3. **Run the installer**:
   ```bash
   chmod +x install_essene_calendar.sh
   ./install_essene_calendar.sh
   ```
4. **Find "Essene Calendar"** in your application menu

## Alternative Methods

### Method 1: Simple Launcher
```bash
chmod +x run_essene_calendar.sh
./run_essene_calendar.sh
```

### Method 2: Direct Python Execution
```bash
python3 essene_calendar.py
```

## Dependencies

Most Linux distributions need:
```bash
# Ubuntu/Debian
sudo apt install python3-tk

# Fedora/RHEL  
sudo dnf install python3-tkinter

# Arch Linux
sudo pacman -S tk
```

## Files Included

- `essene_calendar.py` - Main application
- `install_essene_calendar.sh` - Automatic installer
- `run_essene_calendar.sh` - Simple launcher
- `essene-calendar.desktop` - Desktop entry
- `README.md` - Complete documentation
- `USAGE_EXAMPLES.md` - Usage examples and tutorials
- `requirements.txt` - Dependency information

## Getting Started

1. **Launch the application**
2. **Navigate** using ◄► for months, ◄◄►► for years
3. **Click dates** to see details
4. **Use conversion tools** at the bottom
5. **Export calendars** via File menu

## Need Help?

- Check `README.md` for full documentation
- See `USAGE_EXAMPLES.md` for practical examples
- Run installer to check dependencies automatically