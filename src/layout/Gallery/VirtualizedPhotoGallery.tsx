import React, { useMemo } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images, { getOptimizedImageUrl } from '@/layout/Gallery/Images.ts';
import OptimizedImage from '@/components/OptimizedImage.tsx';
import { useVirtualScroll, useViewportSize } from '@/hooks/useVirtualScroll';
import styled from '@emotion/styled';

// Styled components
const GalleryContainer = styled.div`
  height: 70vh; /* Fixed height for virtual scrolling */
  overflow-y: auto;
  position: relative;
  padding: 0 4px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a1a1a1;
    }
  }
`;

const VirtualContent = styled.div<{ totalHeight: number }>`
  height: ${props => props.totalHeight}px;
  position: relative;
`;

const VirtualItem = styled.div<{ offsetTop: number; visible: boolean }>`
  position: absolute;
  top: ${props => props.offsetTop}px;
  width: calc(33.333% - 5.33px);
  height: 150px;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
  
  &:nth-of-type(3n+1) {
    left: 0;
  }
  
  &:nth-of-type(3n+2) {
    left: calc(33.333% + 2.67px);
  }
  
  &:nth-of-type(3n) {
    left: calc(66.666% + 5.33px);
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
  font-size: 14px;
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-top-color: #666;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const VirtualizedPhotoGallery: React.FC = () => {
  const viewportSize = useViewportSize();
  
  // Cấu hình virtual scroll
  const virtualScrollConfig = useMemo(() => ({
    itemHeight: 150, // Height của mỗi ảnh
    containerHeight: Math.min(viewportSize.height * 0.7, 600), // 70vh hoặc max 600px
    itemsPerRow: 3,
    overscan: 3 // Render thêm 3 items buffer
  }), [viewportSize.height]);

  const {
    virtualItems,
    totalHeight,
    scrollElementRef,
    startIndex,
    endIndex
  } = useVirtualScroll(images.length, virtualScrollConfig);



  const memoizedImages = useMemo(() => images, []);

  return (
    <Gallery>
      <GalleryContainer ref={scrollElementRef}>
        <VirtualContent totalHeight={totalHeight}>
          {virtualItems.map((virtualRow) => {
            const imageIndex = virtualRow.index;
            const image = memoizedImages[imageIndex];
            
            if (!image) return null;

            // Tính toán column position
            const columnIndex = imageIndex % 3;
            
            return (
              <VirtualItem
                key={imageIndex}
                offsetTop={virtualRow.offsetTop}
                visible={imageIndex >= startIndex && imageIndex <= endIndex}
                style={{
                  left: `${columnIndex * 33.333 + columnIndex * 0.8}%`
                }}
              >
                <Item
                  cropped
                  original={image.source}
                  thumbnail={getOptimizedImageUrl(image.source, 150, 60)}
                  width={image.width}
                  height={image.height}
                >
                  {({ ref, open }) => (
                    <OptimizedImage
                      style={{
                        cursor: 'pointer',
                        objectFit: 'cover',
                        width: '100%',
                        height: '150px',
                        borderRadius: '8px',
                        transition: 'transform 0.2s ease-in-out',
                      }}
                      alt={image.alt}
                      src={image.source}
                      width={100}
                      height={150}
                      priority={imageIndex < 6} // 6 ảnh đầu được ưu tiên
                      quality={65}
                      sizes="(max-width: 768px) 33vw, 120px"
                      ref={ref as React.MutableRefObject<HTMLImageElement>}
                      onClick={open}
                    />
                  )}
                </Item>
              </VirtualItem>
            );
          })}
          
          {/* Loading indicator cho những ảnh đang load */}
          {startIndex > 0 && (
            <LoadingIndicator style={{ top: '10px' }}>
              Đang tải thêm ảnh...
            </LoadingIndicator>
          )}
        </VirtualContent>
      </GalleryContainer>
    </Gallery>
  );
};

export default VirtualizedPhotoGallery;