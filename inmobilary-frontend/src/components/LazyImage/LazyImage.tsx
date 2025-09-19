'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function LazyImage({
  src,
  alt = 'Imagen',
  width = 600,
  height = 400,
  className = '',
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const paddingBottom = (height / width) * 100;

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', maxWidth: `${width}px` }}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      aria-busy={!loaded}
    >
      <div style={{ width: '100%', paddingBottom: `${paddingBottom}%` }} />

      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          decoding="async"
          loading="lazy"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
