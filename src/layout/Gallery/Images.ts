import image01 from '@/assets/images/01.webp'
import image02 from '@/assets/images/02.webp'
import image03 from '@/assets/images/03.webp'
import image04 from '@/assets/images/04.webp'
import image05 from '@/assets/images/05.webp'
import image06 from '@/assets/images/06.webp'
import image07 from '@/assets/images/07.webp'
import image08 from '@/assets/images/08.webp'
import image09 from '@/assets/images/09.webp'

export interface ImageItem {
  alt: string;
  source: string;
  width: number;
  height: number;
  priority?: boolean; // Đánh dấu ảnh ưu tiên load trước
  blurDataURL?: string; // Base64 blur placeholder
}

// Utility để tạo URL optimized cho Vercel
export const getOptimizedImageUrl = (
  originalUrl: string, 
  width: number, 
  quality: number = 75
): string => {
  // Nếu đang trong production (Vercel)
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    // Sử dụng Vercel Image Optimization
    return `/_next/image?url=${encodeURIComponent(originalUrl)}&w=${width}&q=${quality}`;
  }
  
  // Local development - trả về ảnh gốc
  return originalUrl;
};

const images: ImageItem[] = [   /* 이미지 경로를 리스트로 저장 */
  {
    alt: 'image01',
    source: image01,
    width: 640,
    height: 960,
    priority: true // 3 ảnh đầu sẽ được load trước
  },
  {
    alt: 'image02',
    source: image02,
    width: 640,
    height: 960,
    priority: true
  },
  {
    alt: 'image03',
    source: image03,
    width: 640,
    height: 960,
    priority: true
  },
  {
    alt: 'image04',
    source: image04,
    width: 640,
    height: 960
  },
  {
    alt: 'image05',
    source: image05,
    width: 640,
    height: 960
  },
  {
    alt: 'image06',
    source: image06,
    width: 640,
    height: 960
  },
  {
    alt: 'image07',
    source: image07,
    width: 640,
    height: 960
  },
  {
    alt: 'image08',
    source: image08,
    width: 640,
    height: 960
  },
  {
    alt: 'image09',
    source: image09,
    width: 640,
    height: 960
  }
];

export default images;