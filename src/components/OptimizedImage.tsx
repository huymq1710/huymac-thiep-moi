import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useBlurPlaceholder } from '@/utils/blurPlaceholder';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Styled components
const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderDiv = styled.div<{ blurDataURL?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  
  ${props => props.blurDataURL ? `
    background-image: url(${props.blurDataURL});
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    transform: scale(1.1); /* Slight scale to hide blur edges */
  ` : `
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  `}

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const StyledImage = styled.img<{ isLoaded: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isLoaded ? 1 : 0};
`;

// Hook để detect device pixel ratio
const useDevicePixelRatio = () => {
  const [dpr, setDpr] = useState(typeof window !== 'undefined' ? window.devicePixelRatio : 1);
  
  useEffect(() => {
    const updateDpr = () => setDpr(window.devicePixelRatio);
    window.addEventListener('resize', updateDpr);
    return () => window.removeEventListener('resize', updateDpr);
  }, []);
  
  return dpr;
};

// Utility để generate responsive image URLs - ĐƠN GIẢN HÓA CHO DEV
const generateImageSizes = (originalSrc: string) => {
  // Trong development, chỉ trả về ảnh gốc
  return {
    src: originalSrc,
    srcSet: originalSrc
  };
};

const OptimizedImage: React.ForwardRefRenderFunction<HTMLImageElement, OptimizedImageProps> = (
  { src, alt, width, height, style, priority = false, quality = 75, sizes, onClick },
  ref
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images load immediately
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const dpr = useDevicePixelRatio();
  
  // Generate blur placeholder
  const { blurDataURL } = useBlurPlaceholder(src);

  // Intersection Observer để lazy load
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Preload khi cách viewport 100px
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate responsive image URLs - ĐƠN GIẢN CHO DEV
  const imageUrls = useMemo(() => {
    if (!isInView) return { src: '', srcSet: '' };
    
    return generateImageSizes(src);
  }, [src, isInView]);

  // Preload critical images
  useEffect(() => {
    if (priority && isInView) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrls.src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, isInView, imageUrls.src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <ImageContainer style={style} onClick={onClick} ref={imgRef}>
      {(!isLoaded || hasError) && (
        <PlaceholderDiv style={style} blurDataURL={blurDataURL}>
          {hasError && (
            <div style={{ 
              color: '#666', 
              fontSize: '12px', 
              textAlign: 'center',
              padding: '10px',
              position: 'relative',
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '4px'
            }}>
              ⚠️ Lỗi tải ảnh
            </div>
          )}
        </PlaceholderDiv>
      )}
      
      {isInView && !hasError && (
        <StyledImage
          ref={ref as React.MutableRefObject<HTMLImageElement>}
          src={imageUrls.src}
          srcSet={imageUrls.srcSet}
          sizes={sizes || `(max-width: 768px) 100vw, 50vw`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          isLoaded={isLoaded}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      )}
    </ImageContainer>
  );
};

export default React.forwardRef(OptimizedImage);