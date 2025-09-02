import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.tagName.toLowerCase() === "button" || 
                       target.tagName.toLowerCase() === "a" ||
                       !!target.closest("button") || 
                       !!target.closest("a") ||
                       target.classList.contains("view-project") ||
                       !!target.closest(".view-project");
      
      setIsHovering(isButton);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousemove", updateHoverState);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousemove", updateHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  // Don't render on mobile/touch devices
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor - always visible with circle */}
      <div 
        className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transition-all duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -16,
          top: -16,
          width: isHovering ? '50px' : '32px',
          height: isHovering ? '50px' : '32px',
          backgroundColor: "white",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
      />
      
      {/* Small ball cursor - always visible */}
      <div 
        className={`fixed pointer-events-none z-[9999] rounded-full bg-primary transition-all duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -4,
          top: -4,
          width: '8px',
          height: '8px',
        }}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none !important;
          }
          a, button, [role="button"], .clickable, .view-project {
            cursor: none !important;
          }
          .project-modal {
            z-index: 49;
          }
          .project-modal button {
            cursor: pointer !important;
          }
          .view-project {
            position: relative;
            z-index: 40;
          }
          
          /* Ensure real cursor is hidden but custom cursor shows */
          * {
            cursor: none !important;
          }
          
          /* Override for mobile devices */
          @media (pointer: coarse) {
            body, a, button, [role="button"], .clickable, .view-project, * {
              cursor: auto !important;
            }
          }
        `
      }} />
    </>
  );
};