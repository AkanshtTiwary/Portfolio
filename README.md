# 🚀 Developer Portfolio

A professional developer portfolio with modern, high-performance visual design and interactive 3D elements.

## ✨ Features

- Professional portfolio layout with modern design principles
- 🎮 3D Interactive Models (Vehicle showcase, professional styling)
- Smooth animations with Framer Motion
- Smooth scrolling with Lenis
- Technical skills dashboard
- Project showcase section
- Professional timeline and experience
- Contact form

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

## 🚀 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📄 Add Resume PDF

- Place your resume file at `public/assets/resume.pdf`
- The "Download Resume" button in the Experience section will automatically serve this file

## 🎮 3D Features

This portfolio includes stunning 3D visualizations:

### Interactive 3D Models
- **Vehicle Showcase** - Rotating professional model in Hero section
- **Professional Styling** - Animated professional look in gallery section
- **3D Gallery** - Dedicated section with full interactive controls

### Controls
- **Drag** to rotate models
- **Scroll** to zoom in/out
- **Auto-rotate** for professional presentation

See [3D_FEATURES.md](3D_FEATURES.md) for detailed documentation.

## 🎨 Professional Color Scheme

The portfolio uses a professional red accent color scheme:
- Red: #E10600 (Primary accent)
- Black: #15151E (Dark background)
- Silver: #C0C0C0 (Secondary accent)
- Gold: #FFD700 (Highlight)

## 📁 Structure

- `/components/layout` - Navigation, Footer, Loader
- `/components/sections` - Hero, About, Skills, Projects, Experience, Contact
- `/components/3d` - **3D Models and scenes**
- `/components/animations` - Reusable animation components
- `/components/ui` - Reusable UI components
- `/assets/data` - Projects, skills, experience data
- `/hooks` - Custom React hooks
