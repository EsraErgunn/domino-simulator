# 🁣 3D Domino Simulator

An interactive 3D domino builder and chain-reaction simulator built with React, TypeScript, and a real-time physics engine. Place dominoes on a wooden table, aim the first tile, and watch the chain reaction unfold with realistic physics.

<!--
   DEMO GIF GOES HERE
  Replace the line below with your GIF once recorded (instructions in the repo).
  Example: ![Demo](./docs/demo.gif)
-->
![Domino Simulator Demo](./docs/demo.gif)

---

##  Features

- **Interactive 3D building** — Click on the table to place dominoes exactly where you want them.
- **Real-time physics** — Powered by the Rapier engine: gravity, collisions, friction, and momentum are all simulated.
- **Ghost preview** — A semi-transparent preview tile shows where the next domino will land before you commit.
- **Keyboard controls** — Move (WASD / arrows), rotate (Q / E), place (Enter), and undo (Ctrl+Z) for precise building.
- **Aim the first tile** — A visual direction arrow lets you choose which way the chain reaction starts.
- **Placement lock mode** — Toggle building on/off so you can rotate the camera freely without dropping tiles by accident.
- **Multiple camera views** — Switch between perspective, top, side, and close-up angles, plus optional auto-rotate.
- **Classic domino look** — Procedurally generated pip textures (0–6 dots) and a honey-oak wooden table, all drawn in code with zero image assets.

---

##  Tech Stack

| Tool | Purpose |
|------|---------|
| **React + TypeScript** | Component-based UI with full type safety |
| **Vite** | Lightning-fast dev server and build tooling |
| **@react-three/fiber** | Declarative React renderer for Three.js |
| **@react-three/drei** | Ready-made 3D helpers (OrbitControls, Grid) |
| **@react-three/rapier** | WASM-based physics engine for rigid bodies & collisions |
| **Zustand** | Lightweight, hooks-based state management |

---

##  Architecture

The app is organized into clean, focused layers with a single source of truth:

```
┌─────────────────────────────────────────┐
│  UI Layer (React Components)             │
│  UIControls · Scene · DominoPiece · etc. │
└─────────────────────────────────────────┘
                  ↓  ↑
┌─────────────────────────────────────────┐
│  State Layer (Zustand Store)            │
│  dominoes · isSimulating · ghost · views │
└─────────────────────────────────────────┘
        ↓                      ↓
┌──────────────────┐  ┌────────────────────┐
│  3D Rendering    │  │  Physics Engine    │
│  react-three-    │  │  react-three-      │
│  fiber + drei    │  │  rapier (Rapier)   │
└──────────────────┘  └────────────────────┘
```

A single `isSimulating` boolean flips every tile between `fixed` (build mode) and `dynamic` (physics active), cleanly separating the "build" and "run" phases.

### Project Structure

```
src/
├── store/
│   └── useDominoStore.ts     # Zustand store: all app state & actions
├── components/
│   ├── Scene.tsx             # Canvas, lights, physics world, camera
│   ├── DominoPiece.tsx       # Single domino: 3D mesh + rigid body
│   ├── BuildFloor.tsx        # Wooden table + click-to-place (raycasting)
│   ├── GhostDomino.tsx       # Semi-transparent placement preview
│   ├── DirectionArrow.tsx    # Visual aim indicator for the first tile
│   ├── CameraController.tsx  # Preset camera views
│   ├── KeyboardControls.tsx  # WASD / arrows / Q-E / Enter / Ctrl+Z
│   └── UIControls.tsx        # Control panel (start, clear, views, etc.)
├── utils/
│   ├── dominoTexture.ts      # Procedural domino pip faces (canvas)
│   └── woodTexture.ts        # Procedural wood grain texture (canvas)
├── App.tsx
└── main.tsx
```

---

##  Controls

| Input | Action |
|-------|--------|
| **Mouse click** | Place a domino on the table |
| **W A S D / Arrows** | Move the ghost preview |
| **Q / E** | Rotate the ghost preview |
| **Enter / Space** | Drop a domino at the preview position |
| **Ctrl + Z** | Undo the last placed domino |
| **Mouse drag** | Orbit the camera |
| **Mouse wheel** | Zoom in / out |

---

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/EsraErgunn/domino-simulator.git
cd domino-simulator/physics-domino

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

##  What I Learned

Building this project deepened my understanding of:

- **3D fundamentals** — coordinate systems, meshes vs. materials, cameras, and lighting.
- **Physics integration** — rigid bodies, colliders, impulses, damping, and tuning parameters for realistic motion.
- **Raycasting** — translating 2D mouse clicks into precise 3D world positions.
- **Procedural textures** — generating domino pips and wood grain entirely in code with the Canvas API.
- **State architecture** — using a single Zustand store as the source of truth across rendering and physics.

---

##  Possible Future Improvements

- Reset simulation to restore tiles to their built positions
- Sound effects on collision
- Save / load domino layouts
- Snap-to-grid alignment for cleaner lines
- Preset patterns (spirals, branches, staircases)



Built with  by [Esra Ergün](https://github.com/EsraErgunn)