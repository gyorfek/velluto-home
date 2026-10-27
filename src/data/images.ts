/** Pre-optimized WebP images in /public/images (replace the placeholders, keep the file names). */
export const HERO_IMG = {
  src: '/images/hero-1800.webp',
  srcset: '/images/hero-1200.webp 1200w, /images/hero-1800.webp 1800w, /images/hero-2400.webp 2400w',
  sizes: '(min-width: 1024px) 50vw, 100vw',
};

export const towelImg = (base: string) => ({
  src: `/images/${base}-800.webp`,
  srcset: `/images/${base}-400.webp 400w, /images/${base}-800.webp 800w`,
  sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw',
});

export const SAMPLE_IMG = {
  src: '/images/sample-pack-1400.webp',
  srcset: '/images/sample-pack-700.webp 700w, /images/sample-pack-1400.webp 1400w',
  sizes: '(min-width: 1024px) 45vw, 100vw',
};
