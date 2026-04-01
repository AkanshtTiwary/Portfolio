/**
 * ============================================================================
 * CURSOR + TEXT EFFECTS SYSTEM
 * Non-destructive overlay of magnetic cursor, heading/subtitle wave, and 
 * button magnetic effects
 * ============================================================================
 */

// ============================================================================
// MOBILE DETECTION
// ============================================================================
const isMobileDevice = () => window.matchMedia("(pointer: coarse)").matches;

// ============================================================================
// 1. CUSTOM CURSOR SYSTEM
// ============================================================================
function initCursorSystem() {
  if (isMobileDevice()) {
    return;
  }

  // Create style tag for cursor
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    body { cursor: none !important; }
  `;
  document.head.appendChild(styleTag);

  const cursorDot = document.createElement('div');
  cursorDot.id = 'cursor-dot';
  document.body.appendChild(cursorDot);

  const cursorRing = document.createElement('div');
  cursorRing.id = 'cursor-ring';
  document.body.appendChild(cursorRing);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Track actual mouse position
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = (mouseX - 5) + 'px';
    cursorDot.style.top = (mouseY - 5) + 'px';
  };

  document.addEventListener('mousemove', handleMouseMove);

  // Ring lerp tracking with requestAnimationFrame
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      // Pulse ring on scroll
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 300);
  });

  const lerpFactor = 0.08; // Adjust for snappier/smoother ring
  let ringScale = 1;
  let targetRingScale = 1;

  function animateCursorRing() {
    // Lerp ring position
    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;

    // Smooth scale transition
    ringScale += (targetRingScale - ringScale) * 0.15;

    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    cursorRing.style.transform = `translate(-50%, -50%) scale(${ringScale})`;

    requestAnimationFrame(animateCursorRing);
  }

  animateCursorRing();

  // Ring scales on hover over interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, [role="button"], input, textarea, select'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      targetRingScale = 1.6;
    });
    el.addEventListener('mouseleave', () => {
      targetRingScale = 1;
    });
  });

  // Particle trails
  let lastParticleTime = 0;
  const particleInterval = 80; // ms between particles

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > particleInterval) {
      createParticleDot(e.clientX, e.clientY);
      lastParticleTime = now;
    }
  });

  function createParticleDot(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    // Auto-remove after fade out
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}

// ============================================================================
// 2. MAGNETIC HEADING EFFECT (Apply to all headings)
// ============================================================================
function initMagneticHeading() {
  if (isMobileDevice()) return;

  // Find ALL headings throughout the page (but skip navbar, footer, etc.)
  const headings = document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6');

  if (headings.length === 0) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Process each heading
  headings.forEach((heading, headingIdx) => {
    // Skip if already processed
    if (heading.querySelector('.char')) {
      return;
    }

    const text = heading.textContent;
    const chars = text.match(/./gu) || [];

    // Build character spans
    const charSpans = chars.map((char, i) => {
      return `<span class="char" data-index="${i}">${char}</span>`;
    }).join('');

    heading.innerHTML = charSpans;
    const charElements = heading.querySelectorAll('.char');

    // Add mousemove listener for this specific heading
    document.addEventListener('mousemove', () => {
      charElements.forEach((char, index) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dx = mouseX - charCenterX;
        const dy = mouseY - charCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 120; // Interaction radius in px
        const maxDisplacement = 35; // Max push-away distance
        const maxRotation = 12; // Max rotation in degrees

        if (distance < radius) {
          const force = 1 - distance / radius; // 0 to 1
          const angle = Math.atan2(dy, dx);

          // Repel away from cursor
          const dispX = Math.cos(angle) * force * maxDisplacement;
          const dispY = Math.sin(angle) * force * maxDisplacement;

          char.style.transform = `translate(${dispX}px, ${dispY}px) rotate(${(angle * 180) / Math.PI * (force * maxRotation / 45)}deg)`;
          char.style.color = `hsl(0, 100%, 50%)`; // Red when close
        } else {
          char.style.transform = 'translate(0, 0) rotate(0deg)';
          char.style.color = ''; // Reset to inherited
        }
      });
    });

    // Spring back on mouse leave
    document.addEventListener('mouseleave', () => {
      charElements.forEach((char) => {
        char.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        char.style.transform = 'translate(0, 0) rotate(0deg)';
        char.style.color = '';

        setTimeout(() => {
          char.style.transition = '';
        }, 500);
      });
    });
  });
}

// ============================================================================
// 3. WAVE EFFECT ON ALL PARAGRAPHS
// ============================================================================
function initWaveSubtitle() {
  if (isMobileDevice()) return;

  // Find ALL paragraphs in main content
  const paragraphs = document.querySelectorAll('main p');

  if (paragraphs.length === 0) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let time = 0;

  // Continuous time increment
  setInterval(() => {
    time += 0.05;
  }, 16); // ~60fps

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Process each paragraph
  paragraphs.forEach((para, paraIdx) => {
    // Skip if already processed
    if (para.querySelector('.char')) {
      return;
    }

    const text = para.textContent;
    const chars = text.match(/./gu) || [];

    para.innerHTML = chars
      .map((char, i) => `<span class="char" data-index="${i}">${char}</span>`)
      .join('');

    const charElements = para.querySelectorAll('.char');

    function updateWave() {
      charElements.forEach((char, index) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dx = mouseX - charCenterX;
        const dy = mouseY - charCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 80; // Wave interaction radius
        const maxPush = 14; // Max upward displacement

        if (distance < radius) {
          const force = 1 - distance / radius;
          // Sine wave based on time + character index
          const wave = Math.sin(time + index * 0.2) * force * maxPush;

          char.style.transform = `translate(0, ${-wave}px)`;
        } else {
          char.style.transform = 'translate(0, 0)';
        }
      });

      requestAnimationFrame(updateWave);
    }

    // Smooth return on mouse leave
    document.addEventListener('mouseleave', () => {
      charElements.forEach((char) => {
        char.style.transition = 'transform 0.4s ease-out';
        char.style.transform = 'translate(0, 0)';

        setTimeout(() => {
          char.style.transition = '';
        }, 400);
      });
    });

    updateWave();
  });
}

// ============================================================================
// 4. MAGNETIC BUTTONS (requires GSAP) - Apply to all buttons
// ============================================================================
function initMagneticButtons() {
  if (isMobileDevice()) return;

  // Only run if GSAP is loaded
  if (typeof gsap === 'undefined') {
    return;
  }

  // Target ALL buttons throughout the site (but skip navbar buttons if needed)
  const buttons = document.querySelectorAll('main button, main a[href*="resume"], main a[role="button"]');

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((btn, idx) => {

    // Create inner span for text if not already present
    if (!btn.querySelector('.btn-text')) {
      const text = btn.innerHTML;
      btn.innerHTML = `<span class="btn-text">${text}</span>`;
    }

    const btnText = btn.querySelector('.btn-text');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    btn.addEventListener('mouseenter', () => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      // Continuous update on mousemove while hovering
      const handleHoverMove = () => {
        const dx = mouseX - btnCenterX;
        const dy = mouseY - btnCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 60; // Magnetic field radius
        const maxBtnShift = 12; // Button shift distance
        const maxTextShift = 5; // Text parallax distance

        if (distance < radius) {
          const force = 1 - distance / radius;
          const angle = Math.atan2(dy, dx);

          // Button shifts toward cursor
          const btnDispX = Math.cos(angle) * force * maxBtnShift;
          const btnDispY = Math.sin(angle) * force * maxBtnShift;

          // Text shifts opposite (parallax)
          const textDispX = -Math.cos(angle) * force * maxTextShift;
          const textDispY = -Math.sin(angle) * force * maxTextShift;

          gsap.to(btn, {
            x: btnDispX,
            y: btnDispY,
            duration: 0.1,
            overwrite: 'auto',
          });

          gsap.to(btnText, {
            x: textDispX,
            y: textDispY,
            duration: 0.1,
            overwrite: 'auto',
          });
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.15, overwrite: 'auto' });
          gsap.to(btnText, {
            x: 0,
            y: 0,
            duration: 0.15,
            overwrite: 'auto',
          });
        }
      };

      document.addEventListener('mousemove', handleHoverMove);

      btn.addEventListener(
        'mouseleave',
        () => {
          document.removeEventListener('mousemove', handleHoverMove);

          // Elastic snap back
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.75)',
          });

          gsap.to(btnText, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.75)',
          });
        },
        { once: true }
      );
    });
  });
}

// ============================================================================
// UTILITY: Wait for element to exist in DOM
// ============================================================================
function waitForElement(selector, maxWait = 5000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      
      if (Date.now() - startTime > maxWait) {
        resolve(null);
        return;
      }
      
      requestAnimationFrame(checkElement);
    };
    
    checkElement();
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
function initEffects() {
  // Wait for the hero section to be rendered by React
  waitForElement('#hero').then((heroSection) => {
    if (!heroSection) {
      return;
    }
    
    // Small delay to ensure all rendering is complete
    setTimeout(() => {
      initCursorSystem();
      initMagneticHeading();
      initWaveSubtitle();
      initMagneticButtons();
    }, 100);
  });
}

// Boot the effects immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEffects);
} else {
  initEffects();
}
