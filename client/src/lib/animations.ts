import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize animations on elements with data-animate attribute - performance optimized
export const initAnimations = () => {
  // Track if animation frame is already scheduled
  let animationFrameScheduled = false;
  let lastScrollTime = 0;
  
  // Simple scroll animations with immediate reveal - debounced
  const animateOnScroll = () => {
    // Skip if already scheduled
    if (animationFrameScheduled) return;
    
    // Get current time
    const now = performance.now();
    
    // Skip if less than 100ms have passed since last scroll event (throttling)
    if (now - lastScrollTime < 100) return;
    
    // Update last scroll time
    lastScrollTime = now;
    
    // Schedule animation frame
    animationFrameScheduled = true;
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const animatedElements = document.querySelectorAll("[data-animate]:not(.animated)");
      
      animatedElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
          // Add class for CSS animations
          element.classList.add("animated");
          
          // Simple fade in for elements
          gsap.to(element, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
          });
        }
      });
      
      // Reset animation frame flag
      animationFrameScheduled = false;
    });
  };
  
  // Initialize scroll progress indicator and section dots - optimized
  const initScrollGraphics = () => {
    // Create container for scroll graphics
    const scrollGraphicsContainer = document.createElement('div');
    scrollGraphicsContainer.className = 'scroll-graphics-container';
    document.body.appendChild(scrollGraphicsContainer);

    // Create section dots container
    const sectionDotsContainer = document.createElement('div');
    sectionDotsContainer.className = 'section-dots';
    document.body.appendChild(sectionDotsContainer);

    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Create only a single glow element to improve performance
    const sectionGlow = document.createElement('div');
    sectionGlow.className = 'section-glow';
    document.body.appendChild(sectionGlow);

    // Create dots for each section
    sections.forEach((section, index) => {
      // Create dot
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.setAttribute('data-index', index.toString());
      sectionDotsContainer.appendChild(dot);
      
      // Add click event to dot
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Throttle variables
    let ticking = false;
    
    // Highlight active dot and show scroll indicator on scroll - throttled
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Add scrolled class to body when scrolled
          if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
          } else {
            document.body.classList.remove('scrolled');
          }
    
          // Find active section
          let activeIndex = 0;
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              activeIndex = index;
            }
          });
    
          // Highlight active dot
          document.querySelectorAll('.section-dot').forEach((dot, index) => {
            if (index === activeIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial setup
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (document.body.contains(scrollGraphicsContainer)) {
        document.body.removeChild(scrollGraphicsContainer);
      }
      if (document.body.contains(sectionDotsContainer)) {
        document.body.removeChild(sectionDotsContainer);
      }
      if (document.body.contains(sectionGlow)) {
        document.body.removeChild(sectionGlow);
      }
    };
  };
  
  // Initialize scroll animations
  animateOnScroll();
  
  // Listen for scroll events with passive flag for better performance
  window.addEventListener("scroll", animateOnScroll, { passive: true });
  
  // Initialize scroll graphics
  const cleanupScrollGraphics = initScrollGraphics();
  
  return () => {
    window.removeEventListener("scroll", animateOnScroll);
    cleanupScrollGraphics();
  };
};

// Animate skill bars with simplified, highly performant effects
export const animateSkillBars = () => {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    // Use a single timeline for better performance
    const timeline = gsap.timeline({
      defaults: {
        ease: "power1.out",
        duration: 0.5
      }
    });
    
    skillBars.forEach((bar, index) => {
      const width = bar.getAttribute("data-width");
      
      if (width) {
        // Add to timeline with minimal staggering
        timeline.to(bar, {
          scaleX: parseInt(width) / 100,
          delay: index < 5 ? index * 0.05 : 0.2 // Minimal delay for first 5, then fixed
        }, index < 5 ? index * 0.03 : 0.15); // Use position parameter for minimal staggering
      }
    });
  });
};

// Ultra-optimized hero section animation
export const animateHero = (element: HTMLElement) => {
  // Create animation only if element exists
  if (!element) return null;
  
  // Preselect elements to minimize DOM access
  const heroTitle = element.querySelector(".hero-title");
  const heroSubtitle = element.querySelector(".hero-subtitle");
  const heroDescription = element.querySelector(".hero-description");
  const heroCta = element.querySelector(".hero-cta");
  
  // Create elements array for batch animation (better performance)
  const elements = [heroTitle, heroSubtitle, heroDescription, heroCta].filter(Boolean);
  
  // Setup defaults for better performance
  const timeline = gsap.timeline({
    defaults: {
      y: 20,
      opacity: 0,
      duration: 0.4, // Shorter duration for faster animation
      ease: "power1.out",
    }
  });
  
  // Use staggerFrom for better performance on multiple elements
  timeline.staggerFrom(elements, 0.4, {}, 0.1);
    
  return timeline;
};

// Simplified project card animation
export const animateProjectCard = (card: HTMLElement) => {
  const image = card.querySelector(".project-image");
  
  // Basic hover effects only
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -5,
      boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power1.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  });
  
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      duration: 0.3,
      ease: "power1.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  });
};
