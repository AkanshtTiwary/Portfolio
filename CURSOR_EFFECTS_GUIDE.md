/**
 * CURSOR-INTERACTIVE TEXT ANIMATIONS - SHOWCASE & INTEGRATION
 * 
 * The signature effects that made Pretext famous:
 * - Text that follows and reacts to cursor movement
 * - Words that organize around magnetic fields
 * - Characters that repel or attract
 * - Information clouds that orbit the cursor
 */

// ============================================================================
// 1. SIMPLE CHARACTER FLOW (Medium Difficulty)
// ============================================================================
/*
// In a new section component:
import CursorTextFlow from '../components/animations/CursorTextFlow';

export const HeroWithCursorFlow = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <CursorTextFlow
        text="INTERACTIVE TEXT"
        fontSize={72}
        effectRadius={150}
        animationType="attract" // or 'repel', 'orbit', 'elastic'
        highlightColor="#FF0000"
      />
    </section>
  );
};
*/

// ============================================================================
// 2. TEXT WARPING WITH CANVAS (Advanced)
// ============================================================================
/*
// Create a full-page effect:
import CursorTextWarp from '../components/animations/CursorTextWarp';

export const WarpingTextSection = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl text-white">Hover below for text warping effect</h1>
      
      <CursorTextWarp
        text="WARPING TEXT EFFECT"
        fontSize={64}
        glowColor="#FF0000"
        distortionAmount={50}
      />
      
      <p className="text-gray-400 max-w-md text-center">
        Text morphs and distorts around your cursor creating a magnetic field effect
      </p>
    </div>
  );
};
*/

// ============================================================================
// 3. ORBITING TECH STACK (Very Impressive)
// ============================================================================
/*
// Showcase your skills in an interactive way:
import CursorInfoCloud from '../components/animations/CursorInfoCloud';

const myTechStack = [
  { label: 'REACT', color: '#61dafb' },
  { label: 'TYPESCRIPT', color: '#3178c6' },
  { label: 'THREE.JS', color: '#ffffff' },
  { label: 'FRAMER MOTION', color: '#0055ff' },
  { label: 'TAILWIND', color: '#06b6d4' },
  { label: 'WEBGL', color: '#ff6b6b' },
  { label: 'PRETEXT', color: '#FF0000' },
  { label: 'NODE.JS', color: '#68a063' }
];

export const TechStackShowcase = () => {
  return (
    <CursorInfoCloud
      items={myTechStack}
      orbitRadius={220}
      fontSize={18}
    />
  );
};
*/

// ============================================================================
// 4. INTERACTIVE PARAGRAPH TEXT (ULTIMATE EFFECT)
// ============================================================================
/*
// For an About or Philosophy section:
import CursorTextMatrix from '../components/animations/CursorTextMatrix';

export const InteractiveAbout = () => {
  const aboutText = `
    I believe in creating interactive experiences that respond to user input.
    My approach combines cutting-edge web technologies with thoughtful design.
    Every interaction should feel natural and delightful.
    Type your own text below or let me create a custom version for you.
    The cursor becomes a tool for exploration and discovery.
  `;

  return (
    <CursorTextMatrix
      text={aboutText}
      fontSize={24}
      magneticRadius={200}
    />
  );
};
*/

// ============================================================================
// 5. COMBINE MULTIPLE EFFECTS IN SEQUENCE
// ============================================================================
/*
export const FullPageCursorExperience = () => {
  return (
    <div className="bg-black">
      {/* Hero with text flow */}
      <section className="min-h-screen">
        <CursorTextFlow
          text="WELCOME TO MY PORTFOLIO"
          fontSize={80}
          effectRadius={150}
          animationType="attract"
        />
      </section>

      {/* Tech stack orbit */}
      <section>
        <CursorInfoCloud
          items={techStack}
          orbitRadius={200}
        />
      </section>

      {/* About section with warping */}
      <section>
        <CursorTextWarp
          text="HOVER FOR EFFECT"
          fontSize={56}
          distortionAmount={45}
        />
      </section>

      {/* Interactive text matrix */}
      <section>
        <CursorTextMatrix
          text="Your story here..."
          magneticRadius={200}
        />
      </section>
    </div>
  );
};
*/

// ============================================================================
// 6. CONFIGURATION GUIDE FOR EACH EFFECT
// ============================================================================

// CursorTextFlow Configuration:
const CursorTextFlowConfig = {
  // animationType: 'attract' - Characters pull toward cursor
  //               'repel'   - Characters push away from cursor
  //               'orbit'   - Characters orbit cursor
  //               'elastic' - Characters bounce from cursor
  
  // effectRadius: How far from cursor the effect applies (default: 150)
  // fontSize: Size of text (default: 48)
  // color: Default text color (default: '#ffffff')
  // highlightColor: Color when near cursor (default: '#FF0000')
};

// CursorTextWarp Configuration:
const CursorTextWarpConfig = {
  // distortionAmount: How much text warps (default: 40)
  //                   Increase for more dramatic effect
  // glowColor: Glow when text near cursor (default: '#FF0000')
  // fontSize: Text size (default: 56)
};

// CursorInfoCloud Configuration:
const CursorInfoCloudConfig = {
  // items: Array of { label: string, color: string }
  // orbitRadius: Distance items orbit from center (default: 200)
  //              Larger = more spread out
  // fontSize: Label size (default: 18)
};

// CursorTextMatrix Configuration:
const CursorTextMatrixConfig = {
  // magneticRadius: How far cursor effect reaches (default: 200)
  // fontSize: Text size (default: 20)
  // lineHeight: Space between lines (default: 2)
  // Note: Pass text as prop
};

// ============================================================================
// 7. ADVANCED: CREATE CUSTOM CURSOR EFFECT
// ============================================================================
/*
// You can combine these effects or create variants:

import { useEffect, useRef, useState } from 'react';

const CustomCursorEffect = ({ text }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Apply your custom physics/animation logic here
  // Use requestAnimationFrame for smooth animations
  
  return (
    <div ref={containerRef} className="w-full h-screen relative">
      {/* Your animated content */}
    </div>
  );
};

export default CustomCursorEffect;
*/

// ============================================================================
// 8. PERFORMANCE TIPS FOR CURSOR TRACKING
// ============================================================================
/*
✅ BEST PRACTICES:

1. Use requestAnimationFrame (not setInterval/setTimeout)
   - Syncs with browser refresh rate
   - Automatic pausing when tab not visible

2. Throttle mouse events if needed
   - Use custom hook to limit updates
   - Especially for complex calculations

3. Use Canvas for complex text effects
   - Much faster than DOM mutations
   - CursorTextWarp uses this approach

4. Cache measurements
   - Calculate once with Pretext
   - Reuse measurements in animation loop

5. Prototype with getCharacterMetrics()
   - Plan animation before rendering
   - Gets character positions from Pretext

AVOID:
❌ getBoundingClientRect() in every frame
❌ Creating new objects in animation loop
❌ Complex CSS calculations every frame
❌ Unnecessary re-renders (use useRef for position tracking)
*/

// ============================================================================
// 9. INTEGRATION EXAMPLE: FULL HERO SECTION
// ============================================================================
/*
import { motion } from 'framer-motion';
import CursorTextFlow from '../animations/CursorTextFlow';
import CursorInfoCloud from '../animations/CursorInfoCloud';

export const ModernHero = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black" />
      
      {/* Main interactive text */}
      <div className="relative z-10 h-96">
        <CursorTextFlow
          text="AKANSH TIWARY"
          fontSize={96}
          animationType="attract"
        />
      </div>

      {/* Tech stack showcase */}
      <div className="relative z-5 py-20">
        <h2 className="text-3xl text-center mb-12">Tech Stack</h2>
        <CursorInfoCloud orbitRadius={180} />
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button className="px-8 py-4 bg-f1-red text-white rounded-lg hover:scale-105">
          Explore My Work
        </button>
      </motion.div>
    </section>
  );
};
*/

// ============================================================================
// QUICK START: 5-MINUTE SETUP
// ============================================================================
/*
1. Import component:
   import CursorTextFlow from '../animations/CursorTextFlow';

2. Add to your JSX:
   <CursorTextFlow text="YOUR TEXT" fontSize={64} />

3. Customize:
   - Change animationType: 'attract', 'repel', 'orbit', 'elastic'
   - Adjust effectRadius for larger/smaller effect area
   - Change colors with color and highlightColor props

4. Combine with other sections:
   Stack multiple effects for immersive experience

5. Test performance:
   - Open DevTools Performance tab
   - Click record → move cursor → stop
   - Should maintain 60fps
*/

export default {
  title: "CURSOR-INTERACTIVE EFFECTS GUIDE",
  description: "Everything you need to implement Pretext's signature cursor-following effects",
  components: [
    'CursorTextFlow',
    'CursorTextWarp',
    'CursorInfoCloud',
    'CursorTextMatrix'
  ]
};
