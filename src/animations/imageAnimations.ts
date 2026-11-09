import { gsap } from './gsapConfig';

export function animateClipReveal(
  element: Element | null,
  options?: {
    trigger?: Element | string;
    start?: string;
    duration?: number;
    delay?: number;
  }
) {
  if (!element) return null;
  const { trigger, start = 'top 80%', duration = 1.4, delay = 0 } = options || {};

  return gsap.fromTo(
    element,
    {
      clipPath: 'inset(100% 0% 0% 0%)',
      scale: 1.12
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration,
      delay,
      ease: 'power4.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none'
          }
        : undefined
    }
  );
}

export function animateImageParallax(
  imageElement: Element | null,
  triggerElement: Element | null,
  yPercentRange = 16
) {
  if (!imageElement || !triggerElement) return null;

  return gsap.fromTo(
    imageElement,
    { yPercent: -yPercentRange },
    {
      yPercent: yPercentRange,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
}
