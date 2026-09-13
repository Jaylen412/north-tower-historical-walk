# North Tower — An Everyday World

Interactive historical interpretation of the World Trade Center North Tower, circa 2000–early 2001.

## Quick Start

### Requirements
- Python 3

### Running the Tour

1. Extract this entire archive.
2. Run the tour:
   ```bash
   python3 run-tour.py    # On Windows: py run-tour.py
   ```
3. Your browser opens automatically. Keep the server window open while exploring.

> **Important:** Do not open `world/index.html` directly. The tour uses ES modules and requires a local web server.

The tour runs entirely on your computer. Internet access is only used for fonts and historical source links.

## Controls

### PS5 Controller

Pair the controller in your device's Bluetooth settings, then press × to connect.

| Input | Action |
|-------|--------|
| Left stick | Move around the space |
| Click L3 | Toggle running (2× walking speed) |
| Right stick | Look around |
| × | Enter / interact / select |
| ○ | Close panel |
| △ | Checkpoint menu |
| Options | Guide and settings |
| L1 / R1 | Previous / next checkpoint |
| D-pad or left stick (menu) | Move highlighted selection |
| Left/right (menu) | Adjust sliders and graphics |
| Right stick (menu) | Scroll panel text |

> The browser must expose a standard controller mapping. A wired connection is an alternative.

### Keyboard & Mouse

| Input | Action |
|-------|--------|
| **W A S D** or arrow keys | Walk |
| Drag mouse | Look around |
| Click the world | Capture mouse cursor |
| **E** | Interact / enter |
| **G** | Checkpoints menu |
| **Escape** | Release mouse / pause |

### Touch Devices

- Use on-screen movement arrows to walk
- Drag to look around
- Tap to interact

Use **Performance** graphics setting in Guide & Controls if the scene runs slowly.

## About This Interpretation

### Scope

Three walkable spaces:
- **Lobby** — Grand arrival and the life of the complex
- **Office Level** — A representative workplace around 2000
- **Windows on the World** — Upper-floor dining spaces (Floors 106–107)

An abbreviated elevator cabin connects these spaces. Eight sourced checkpoints include discussion prompts about work, architecture, and community at the towers.

### Accuracy Notes

This is a **functional 3D prototype**, not a hyper-realistic or surveyed architectural replica.

**Approximate elements:**
- Circulation, room proportions, and furnishings
- Elevator routing and travel time
- Planting and decorative details
- The distant city backdrop
- The office is not a documented tenant's suite
- The restaurant is not a measured reconstruction of the 1996 refurbishment

**Not included:**
- The public observation deck (which was in the South Tower)
- Attack simulation or related content

**Data persistence:** Visited checkpoints and user preferences are saved only in this browser's local storage.

## Historical Sources

- [9/11 Memorial & Museum: World Trade Center History](https://www.911memorial.org/learn/resources/digital-exhibitions/world-trade-center-history)
- [World Trade Center Facts and Figures](https://www.911memorial.org/learn/resources/digital-exhibitions/world-trade-center-history/world-trade-center-facts-and-figures)
- [Snapshots of Work Life](https://www.911memorial.org/learn/resources/digital-exhibitions/world-trade-center-history/snapshots-work-life)
- [Recovered Window / Window Design](https://collection.911memorial.org/Detail/objects/6980/rel/1)
- [Windows on the World: Restaurant History](https://collection.911memorial.org/Detail/objects/117745/rel/1)

## Credits & Licenses

### Photography

**North Tower Lobby, August 19, 2000**
- Source: [Smurfy / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:World_Trade_Center_lobby,_08-19-2000.png)
- License: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- The distributed source photo includes existing retouching (chain removed, lights desaturated, brightness adjusted). No additional changes have been made to the packaged image. Photo license remains CC BY-SA 3.0.

### Software

**Three.js r180** and bundled components are licensed under the MIT License. See `world/THREE-LICENSE.txt` for details.
