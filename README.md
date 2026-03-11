# 🏎️ F1 Portfolio

An F1-themed developer portfolio with racing-inspired animations and **3D interactive models**.

## 🚀 Features

- F1-inspired design with racing aesthetics
- **🎮 3D Interactive Models** (Rotating F1 car, Driver capsule)
- Smooth animations with Framer Motion
- Smooth scrolling with Lenis
- Telemetry-style skill dashboard
- Grand Prix project showcase
- Racing career timeline

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- **Three.js + React Three Fiber** (3D Graphics)
- **@react-three/drei** (3D Helpers)
- Lenis (Smooth Scroll)
- React Icons
- Orbitron Font

## 📦 Installation

```bash
npm install
```

## 🏁 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🎮 3D Features

This portfolio includes stunning 3D animations:

### Interactive 3D Models
- **Rotating F1 Car** - Auto-rotating race car in the Hero section
- **Driver Capsule** - Animated driver emerging from pod in About section
- **3D Gallery** - Dedicated section with full interactive controls

### Controls
- **Drag** to rotate models
- **Scroll** to zoom in/out
- **Auto-rotate** for cinematic effect

See [3D_FEATURES.md](3D_FEATURES.md) for detailed documentation.

## 🎨 Theme

The portfolio uses F1 racing colors:
- Red: #E10600 (Ferrari Red)
- Black: #15151E (Carbon Black)
- Silver: #C0C0C0 (Mercedes Silver)
- Gold: #FFD700 (Championship Gold)

## 📁 Structure

- `/components/layout` - Navigation, Footer, Loader
- `/components/sections` - Hero, About, Skills, Projects, Experience, Contact
- `/components/3d` - **3D Models and scenes**
- `/components/animations` - Reusable animation components
- `/components/ui` - Reusable UI components
- `/assets/data` - Projects, skills, experience data
- `/hooks` - Custom React hooks
