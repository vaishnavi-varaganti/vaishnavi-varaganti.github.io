import { gsap } from 'gsap';

export function fireConfetti() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.backgroundColor = 'transparent';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '9999';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);

  const particleCount = 15;
  const particles = [];

  // Updated colors for purple–teal theme
  const colors = [
    '#9B5CF6', // purple
    '#2DD4BF', // teal
    '#8B5CF6', // soft lavender
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 15 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 10px 2px ${particle.style.backgroundColor}`;
    particle.style.opacity = '0';

    overlay.appendChild(particle);
    particles.push(particle);

    const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
    const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 100;

    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;

    gsap.set(particle, { 
      x: startX, 
      y: startY,
      scale: 0,
      opacity: 0
    });

    gsap.to(particle, {
      duration: 0.8 + Math.random() * 0.5,
      x: startX + (Math.random() - 0.5) * 200,
      y: startY + (Math.random() - 0.5) * 200,
      scale: Math.random() * 1.5 + 0.5,
      opacity: 1,
      ease: "power2.out",
      delay: Math.random() * 0.3,
      onComplete: () => {
        gsap.to(particle, {
          duration: 1 + Math.random() * 1,
          x: endX,
          y: endY,
          scale: 0,
          opacity: 0,
          ease: "power1.inOut",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    });
  }

  const pulse = document.createElement('div');
  pulse.style.position = 'absolute';
  pulse.style.top = '50%';
  pulse.style.left = '50%';
  pulse.style.transform = 'translate(-50%, -50%)';
  pulse.style.width = '50px';
  pulse.style.height = '50px';
  pulse.style.borderRadius = '50%';
  pulse.style.boxShadow = '0 0 0 0 rgba(155, 92, 246, 0.7)';
  pulse.style.backgroundColor = 'rgba(45, 212, 191, 0.3)';

  overlay.appendChild(pulse);

  gsap.to(pulse, {
    duration: 1.5,
    width: '300px',
    height: '300px',
    opacity: 0,
    boxShadow: '0 0 0 100px rgba(155, 92, 246, 0)',
    ease: "power2.out",
    onComplete: () => {
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1500);
    }
  });
}
