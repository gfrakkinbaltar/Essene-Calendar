#!/bin/bash

# Essene Calendar Launcher Script
# Simple launcher that handles dependencies and runs the application

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CALENDAR_SCRIPT="$SCRIPT_DIR/essene_calendar_enhanced.py"

# Check if the main script exists
if [ ! -f "$CALENDAR_SCRIPT" ]; then
    echo "Error: essene_calendar.py not found in $SCRIPT_DIR"
    echo "Please ensure all files are in the same directory."
    exit 1
fi

# Check Python 3
if ! command -v python3 >/dev/null 2>&1; then
    echo "Error: Python 3 is required but not installed."
    echo "Please install Python 3 using your package manager."
    exit 1
fi

# Check tkinter
if ! python3 -c "import tkinter" >/dev/null 2>&1; then
    echo "Error: tkinter (GUI toolkit) is not available."
    echo "Please install it using:"
    echo "  Ubuntu/Debian: sudo apt install python3-tk"
    echo "  Fedora/RHEL:   sudo dnf install python3-tkinter"
    echo "  Arch Linux:    sudo pacman -S tk"
    echo "  openSUSE:      sudo zypper install python3-tk"
    exit 1
fi

# Run the application
echo "Starting Essene Calendar..."
python3 "$CALENDAR_SCRIPT"