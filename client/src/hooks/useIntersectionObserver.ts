import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] => {
  const { root = null, rootMargin = "0px", threshold = 0, once = false } = options;
  
  const targetRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (once && observer && target) {
              observer.unobserve(target);
            }
          } else if (!once) {
            setIsIntersecting(false);
          }
        });
      },
      { root, rootMargin, threshold }
    );
    
    observer.observe(target);
    
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [root, rootMargin, threshold, once]);
  
  return [targetRef, isIntersecting];
};
