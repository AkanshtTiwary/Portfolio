/**
 * PRETEXT INTEGRATION GUIDE
 * 
 * This guide shows how to integrate Pretext into your portfolio for
 * better animations, zero layout thrashing, and improved performance.
 */

// ============================================================================
// 1. REPLACE HERO SECTION TEXT ANIMATION
// ============================================================================
/*
// In Hero.jsx, replace this:
<motion.h1
  className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.5 }}
>
  AKANSH <span className="text-f1-red">TIWARY</span>
</motion.h1>

// With this:
import PretextTextReveal from '../animations/PretextTextReveal';
<PretextTextReveal 
  text="AKANSH TIWARY"
  fontSize={96}
  color="#ffffff"
  strokeColor="#FF0000"
  staggerDelay={0.08}
  className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
/>
*/

// ============================================================================
// 2. USE CANVAS ANIMATIONS FOR HIGH-PERFORMANCE SECTIONS
// ============================================================================
/*
// In Experience.jsx or Projects.jsx, add:
import CanvasTextAnimation from '../animations/CanvasTextAnimation';

<section>
  <CanvasTextAnimation 
    text="MY PROJECTS"
    width={600}
    height={150}
    fontSize={72}
    animationType="wave"
    color="#ffffff"
    strokeColor="#FF0000"
  />
  
  {/* Your project cards below */}
</section>
*/

// ============================================================================
// 3. MEASURE TEXT BEFORE COMPLEX ANIMATIONS
// ============================================================================
/*
// Import the hook:
import { getPretextMetrics, getCharacterMetrics } from '../../hooks/usePretext';

// Use in your component:
useEffect(() => {
  const setupAnimations = async () => {
    // Get overall text dimensions
    const metrics = await getPretextMetrics('FULL STACK DEVELOPER', 48);
    console.log('Text width:', metrics.width);
    console.log('Text height:', metrics.height);
    
    // Get character-by-character metrics for staggered animations
    const charMetrics = await getCharacterMetrics('FULL STACK DEVELOPER', 48);
    console.log('Character positions:', charMetrics);
  };
  
  setupAnimations();
}, []);
*/

// ============================================================================
// 4. PREVENT LAYOUT THRASHING IN COUNTERS
// ============================================================================
/*
// In useCountUp.js, use Pretext to measure numbers without DOM calls:
import { getPretextMetrics } from '../hooks/usePretext';

export const useCountUp = (target, duration = 1000) => {
  const ref = useRef(null);
  
  useEffect(() => {
    // Measure the target number first with Pretext
    // This prevents getBoundingClientRect() calls during animation
    const setupAndAnimate = async () => {
      const metrics = await getPretextMetrics(String(target), 32);
      
      // Now animate safely without layout reflows
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        
        if (ref.current) {
          ref.current.textContent = current;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    setupAndAnimate();
  }, [target, duration]);
  
  return ref;
};
*/

// ============================================================================
// 5. CREATE SVG TEXT PATHS WITH PRETEXT
// ============================================================================
/*
// Create animated text along SVG paths:
import { measure } from 'pretext';

const SvgTextPath = ({ text, pathId }) => {
  const [length, setLength] = useState(0);
  
  useEffect(() => {
    const getLength = async () => {
      const metrics = await measure({ text, fontSize: 24 });
      setLength(metrics.width);
    };
    getLength();
  }, [text]);
  
  return (
    <svg viewBox="0 0 1000 200">
      <defs>
        <path id={pathId} d="M 50,100 Q 500,50 950,100" fill="none" />
      </defs>
      <text>
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
};
*/

// ============================================================================
// 6. COMBINE WITH YOUR 3D SCENE
// ============================================================================
/*
// In Scene3D.jsx or 3D components:
import { measure } from 'pretext';
import { CanvasTexture } from 'three';

// Create 3D text texture without DOM measurements
const create3DTextTexture = async (text, options = {}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Measure text with Pretext (no layout thrashing)
  const metrics = await measure({
    text,
    fontSize: options.fontSize || 64,
    fontFamily: options.fontFamily || 'Space Grotesk'
  });
  
  canvas.width = metrics.width + 40;
  canvas.height = metrics.height + 40;
  
  ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = `bold ${options.fontSize || 64}px Space Grotesk`;
  ctx.fillStyle = options.color || '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  return new CanvasTexture(canvas);
};

// Use in your Three.js mesh
mesh.material.map = await create3DTextTexture('3D TEXT');
*/

// ============================================================================
// 7. ANIMATED COUNTER WITH PRETEXT
// ============================================================================
/*
// Enhanced counter that measures width before animation:
import { usePretext } from '../hooks/usePretext';

const AdvancedCounter = ({ label, target = 100, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const { measurements } = usePretext(String(target) + suffix, { fontSize: 36 });
  
  useEffect(() => {
    let start = 0;
    const increment = target / 100;
    
    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    
    return () => clearInterval(counter);
  }, [target]);
  
  return (
    <div style={{ width: measurements?.width || 'auto' }}>
      <div className="text-4xl font-bold text-f1-red">
        {count}{suffix}
      </div>
      <p className="text-gray-300">{label}</p>
    </div>
  );
};
*/

// ============================================================================
// KEY BENEFITS OF PRETEXT
// ============================================================================
/*
✅ ZERO LAYOUT THRASHING
   - Avoid expensive getBoundingClientRect() calls
   - No offsetHeight/offsetWidth measurements
   - Text animation measurements happen off-thread

✅ PERFECT PRECISION
   - Uses browser's native font engine
   - Works with all fonts and languages
   - Accurate metrics for complex layouts

✅ MULTI-FORMAT RENDERING
   - DOM (your current approach)
   - Canvas (high performance)
   - SVG (vector animations)
   - Future: Server-side rendering

✅ PERFORMANCE GAINS
   - 60fps animations without frame drops
   - Ideal for 3D text integration
   - Scales to many animated elements

✅ AI-FRIENDLY
   - Text measurement logic is predictable
   - Great for iterative animation design
   - Works well with code generation
*/

// ============================================================================
// QUICK START EXAMPLES
// ============================================================================

// Example 1: Simple character-by-character reveal
export function SimpleCharacterReveal({ text }) {
  return (
    <div className="flex gap-1">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// Example 2: Measured text box for centering
export async function MeasuredTextBox({ text }) {
  const { getPretextMetrics } = await import('../hooks/usePretext');
  const metrics = await getPretextMetrics(text, 32);
  
  return (
    <div 
      style={{
        width: metrics.width,
        height: metrics.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid red'
      }}
    >
      {text}
    </div>
  );
}

export default {
  title: "PRETEXT INTEGRATION GUIDE",
  description: "Learn how to use Pretext for better animations and zero layout thrashing"
};
