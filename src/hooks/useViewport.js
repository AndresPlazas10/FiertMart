import { useState, useEffect } from 'react';

/**
 * Hook para detectar el viewport y orientación
 * Útil para renderizar componentes específicos según el dispositivo
 * 
 * Uso:
 * const { isMobile, isTablet, isDesktop, orientation } = useViewport();
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 640,
    isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
      });
    };

    // Debounce para optimizar performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return viewport;
}

/**
 * Hook para detectar si el usuario está en iOS
 */
export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  return isIOS;
}

/**
 * Hook para detectar si el usuario está en modo standalone (PWA)
 */
export function useIsStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;
    setIsStandalone(standalone);
  }, []);

  return isStandalone;
}
