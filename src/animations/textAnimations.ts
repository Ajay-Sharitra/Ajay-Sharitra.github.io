import { gsap } from './gsapConfig';

export function animateWordsReveal(
  elements: NodeListOf<Element> | Element[],
  options?: {
    trigger?: Element | string;
    start?: string;
    stagger?: number;
    duration?: number;
    delay?: number;
    fromRandom?: boolean;
  }
) {
  const {
    trigger,
    start = 'top 82%',
    stagger = 0.03,
    duration = 1.1,
    delay = 0,
    fromRandom = false
  } = options || {};

  return gsap.fromTo(
    elements,
    {
      yPercent: 115,
      opacity: 0,
      filter: 'blur(4px)'
    },
    {
      yPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger: fromRandom ? { each: stagger, from: 'random' } : stagger,
      ease: 'expo.out',
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

export function animateCharsReveal(
  elements: NodeListOf<Element> | Element[],
  options?: {
    trigger?: Element | string;
    start?: string;
    stagger?: number;
    duration?: number;
    delay?: number;
  }
) {
  const {
    trigger,
    start = 'top 80%',
    stagger = 0.02,
    duration = 1.2,
    delay = 0
  } = options || {};

  return gsap.fromTo(
    elements,
    {
      yPercent: 120,
      opacity: 0,
      rotateX: -45
    },
    {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      delay,
      stagger,
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
