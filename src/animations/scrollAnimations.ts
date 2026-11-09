import { gsap } from './gsapConfig';

export function animateSVGPaths(
  paths: NodeListOf<SVGGeometryElement> | SVGGeometryElement[],
  trigger: Element | string
) {
  paths.forEach((path) => {
    if (typeof path.getTotalLength === 'function') {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    }
  });

  return gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 2.2,
    stagger: 0.08,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger,
      start: 'top 75%',
      end: 'bottom 30%',
      scrub: 0.8
    }
  });
}
