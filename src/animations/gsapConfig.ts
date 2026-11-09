import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGSAPConfig() {
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
  });
}

export function refreshScrollTriggers() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

export { gsap, ScrollTrigger };
