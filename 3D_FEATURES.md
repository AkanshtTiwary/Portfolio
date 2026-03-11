# 🎮 3D Features Documentation

## Overview

Your F1 Portfolio now includes stunning 3D animations powered by **Three.js** and **React Three Fiber**!

## 🏎️ 3D Components

### 1. **Rotating F1 Car**
- **Location**: Hero section (top right on desktop)
- **Features**:
  - Auto-rotating 3D F1 car model
  - Spinning wheels
  - Metallic materials with reflections
  - Dynamic lighting (headlights, exhaust glow)
  - Floating animation
  - Distortion effects

### 2. **Driver Capsule Animation**
- **Location**: About section
- **Features**:
  - Capsule opens automatically after 1 second
  - Driver figure emerges from pod
  - Interactive - you can rotate and zoom
  - Smoke/steam effects
  - Accent lighting
  - Floating animation

### 3. **3D Gallery**
- **Location**: New dedicated section
- **Features**:
  - Switch between Car and Driver views
  - Full interactive controls:
    - **Drag** to rotate
    - **Scroll** to zoom in/out
    - **Auto-rotate** enabled
  - Professional racing floor grid
  - Dynamic shadows
  - Environment reflections

## 🎨 Customization

### Change Car Colors
Edit `/src/components/3d/F1Car3D.jsx`:
```jsx
// Line ~22: Main body color
<MeshDistortMaterial color="#E10600" ... />

// Line ~29: Nose cone
<meshStandardMaterial color="#E10600" ... />
```

### Adjust Animation Speed
Edit rotation speed in `F1Car3D.jsx`:
```jsx
// Line ~14: Car rotation speed
carRef.current.rotation.y += delta * 0.3; // Lower = slower

// Line ~19: Wheel spin speed  
wheel.rotation.x += delta * 2; // Higher = faster
```

### Modify Driver Colors
Edit `/src/components/3d/DriverCapsule3D.jsx`:
```jsx
// Line ~64: Helmet color
<meshStandardMaterial color="#E10600" ... />

// Line ~84: Racing suit
<meshStandardMaterial color="#15151E" ... />
```

## 🔧 Technical Details

### Libraries Used
- **three** (v0.160+): 3D rendering engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions

### Performance
- Models are optimized with lower polygon counts
- Auto-rotation uses requestAnimationFrame for 60fps
- Suspense boundaries prevent layout shift
- Responsive - hides on mobile to save resources

### File Structure
```
src/components/3d/
├── F1Car3D.jsx          # F1 car model
├── DriverCapsule3D.jsx  # Driver capsule animation
├── Scene3D.jsx          # Basic scene wrapper
└── Showcase3D.jsx       # Full gallery scene
```

## 🎯 Adding Custom 3D Models

To use your own .glb/.gltf 3D models:

1. Install model loader:
```bash
npm install @react-three/drei
```

2. Place models in `/public/models/`

3. Use in component:
```jsx
import { useGLTF } from '@react-three/drei';

function CustomModel() {
  const { scene } = useGLTF('/models/your-model.glb');
  return <primitive object={scene} />;
}
```

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (best performance)
- ✅ Firefox
- ✅ Safari (may have minor shader differences)
- ⚠️ Mobile: 3D disabled on small screens for performance

## 🚀 Performance Tips

1. **Reduce polygon count** for mobile
2. **Use instancing** for repeated elements
3. **Optimize materials** (reduce reflections)
4. **Lazy load** 3D components
5. **Use lower quality shadows** on mobile

## 📱 Responsive Behavior

- **Desktop**: Full 3D experience
- **Tablet**: Interactive 3D gallery only
- **Mobile**: Static images/fallbacks (3D hidden)

## 🎨 Color Palette

The 3D models use your F1 theme:
- **Red**: `#E10600` (Ferrari Red)
- **Black**: `#15151E` (Carbon Black)  
- **Blue**: `#001f3f` (Cockpit tint)
- **Gray**: `#1a1a1a` (Tires)

---

**Tip**: Visit the **3D Gallery** section to interact with the models in full detail!

Lights out and away we go! 🏁
