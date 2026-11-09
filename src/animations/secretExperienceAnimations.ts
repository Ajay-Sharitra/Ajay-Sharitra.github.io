import { gsap } from './gsapConfig';

export interface HeroTransformationElements {
  section: HTMLElement | null;
  ignitionBloom: HTMLElement | null;
  lightSweep: HTMLElement | null;
  desktopBasePortrait: HTMLElement | null;
  desktopUnseenPortrait: HTMLElement | null;
  mobileBasePortrait: HTMLElement | null;
  mobileUnseenPortrait: HTMLElement | null;
  headlineWords: NodeListOf<Element> | Element[];
  introItems: NodeListOf<Element> | Element[];
  techIds: NodeListOf<Element> | Element[];
}

export interface HeroTransformationOptions {
  reducedMotion?: boolean;
  isMobile?: boolean;
  onComplete?: () => void;
}

/**
 * Plays a brief, controlled crimson ignition flash on the activation button
 * immediately upon user interaction.
 */
export function playTriggerActivationFlash(buttonEl: HTMLElement | null, reducedMotion = false) {
  if (!buttonEl || reducedMotion) return;
  gsap.killTweensOf(buttonEl);
  gsap.fromTo(
    buttonEl,
    {
      boxShadow: '0 0 36px rgba(214, 4, 7, 0.9), inset 0 0 18px rgba(214, 4, 7, 0.65)',
      borderColor: '#ff1e22'
    },
    {
      boxShadow: '0 0 18px rgba(214, 4, 7, 0.22), inset 0 0 0px rgba(214, 4, 7, 0)',
      borderColor: 'rgba(214, 4, 7, 0.45)',
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'boxShadow,borderColor'
    }
  );
}

/**
 * Dynamically morphs the Hero section IN-PLACE into the Unseen Crimson Identity state
 * (or back to the primary Hero state) without opening a separate modal/frame.
 */
export function runHeroUnseenTransition(
  toUnseen: boolean,
  elements: HeroTransformationElements,
  options: HeroTransformationOptions = {}
): gsap.core.Timeline | null {
  const {
    section,
    ignitionBloom,
    lightSweep,
    desktopBasePortrait,
    desktopUnseenPortrait,
    mobileBasePortrait,
    mobileUnseenPortrait,
    headlineWords,
    introItems,
    techIds
  } = elements;

  const { reducedMotion = false, isMobile = false, onComplete } = options;

  if (!section) {
    onComplete?.();
    return null;
  }

  const targets = [
    ignitionBloom,
    lightSweep,
    desktopBasePortrait,
    desktopUnseenPortrait,
    mobileBasePortrait,
    mobileUnseenPortrait,
    ...(headlineWords ? Array.from(headlineWords) : []),
    ...(introItems ? Array.from(introItems) : []),
    ...(techIds ? Array.from(techIds) : [])
  ].filter(Boolean);

  gsap.killTweensOf(targets);

  const tl = gsap.timeline({
    defaults: { overwrite: 'auto' },
    onComplete: () => {
      onComplete?.();
    }
  });

  if (reducedMotion) {
    if (desktopBasePortrait) gsap.set(desktopBasePortrait, { opacity: toUnseen ? 0 : 1 });
    if (desktopUnseenPortrait) {
      gsap.set(desktopUnseenPortrait, {
        opacity: toUnseen ? 1 : 0,
        clipPath: toUnseen ? 'circle(125% at 50% 38%)' : 'circle(0% at 50% 38%)',
        WebkitClipPath: toUnseen ? 'circle(125% at 50% 38%)' : 'circle(0% at 50% 38%)',
        scale: 1
      });
    }
    if (mobileBasePortrait) gsap.set(mobileBasePortrait, { opacity: toUnseen ? 0 : 1 });
    if (mobileUnseenPortrait) {
      gsap.set(mobileUnseenPortrait, {
        opacity: toUnseen ? 1 : 0,
        clipPath: toUnseen ? 'circle(135% at 50% 42%)' : 'circle(0% at 50% 42%)',
        WebkitClipPath: toUnseen ? 'circle(135% at 50% 42%)' : 'circle(0% at 50% 42%)',
        scale: 1
      });
    }
    if (ignitionBloom) gsap.set(ignitionBloom, { opacity: toUnseen ? 0.55 : 0 });
    onComplete?.();
    return tl;
  }

  // 1. Crimson Ignition Bloom & Laser Sweep across the Hero section itself
  if (ignitionBloom) {
    if (toUnseen) {
      gsap.set(ignitionBloom, { opacity: 0, scale: 0.45 });
      tl.to(
        ignitionBloom,
        {
          opacity: 0.92,
          scale: 1.15,
          duration: 0.48,
          ease: 'power3.out'
        },
        0
      ).to(
        ignitionBloom,
        {
          opacity: 0.55,
          scale: 1,
          duration: 0.75,
          ease: 'sine.inOut'
        },
        0.48
      );
    } else {
      tl.to(
        ignitionBloom,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.65,
          ease: 'power3.inOut'
        },
        0
      );
    }
  }

  if (lightSweep) {
    gsap.set(lightSweep, { opacity: 0, scaleX: 0.15 });
    tl.to(
      lightSweep,
      {
        opacity: 0.9,
        scaleX: 1,
        duration: 0.42,
        ease: 'expo.out'
      },
      0.04
    ).to(
      lightSweep,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      },
      0.42
    );
  }

  // 2. Dynamic In-Place Portrait Morph (Desktop & Mobile Hero Portrait Layers)
  if (toUnseen) {
    if (desktopBasePortrait) {
      tl.to(
        desktopBasePortrait,
        {
          opacity: 0,
          scale: 0.96,
          filter: 'brightness(0.25) contrast(1.2)',
          duration: 0.75,
          ease: 'power3.inOut'
        },
        0.05
      );
    }

    if (desktopUnseenPortrait) {
      gsap.set(desktopUnseenPortrait, {
        clipPath: 'circle(0% at 50% 36%)',
        WebkitClipPath: 'circle(0% at 50% 36%)',
        scale: 1.09,
        opacity: 1,
        filter: 'brightness(0.35) contrast(1.25)'
      });
      tl.to(
        desktopUnseenPortrait,
        {
          clipPath: 'circle(125% at 50% 36%)',
          WebkitClipPath: 'circle(125% at 50% 36%)',
          scale: 1,
          filter: 'brightness(1.04) contrast(1.06)',
          duration: 1.05,
          ease: 'expo.inOut'
        },
        0.08
      );
    }

    if (mobileBasePortrait) {
      tl.to(
        mobileBasePortrait,
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.65,
          ease: 'power3.inOut'
        },
        0.05
      );
    }

    if (mobileUnseenPortrait) {
      gsap.set(mobileUnseenPortrait, {
        clipPath: 'circle(0% at 50% 42%)',
        WebkitClipPath: 'circle(0% at 50% 42%)',
        scale: 1.08,
        opacity: 1
      });
      tl.to(
        mobileUnseenPortrait,
        {
          clipPath: 'circle(135% at 50% 42%)',
          WebkitClipPath: 'circle(135% at 50% 42%)',
          scale: 1,
          duration: 0.95,
          ease: 'expo.inOut'
        },
        0.08
      );
    }
  } else {
    // Transition back from Unseen portrait to Base Hero portrait in-place
    if (desktopUnseenPortrait) {
      tl.to(
        desktopUnseenPortrait,
        {
          clipPath: 'circle(0% at 50% 36%)',
          WebkitClipPath: 'circle(0% at 50% 36%)',
          scale: 1.06,
          opacity: 0,
          duration: 0.85,
          ease: 'expo.inOut'
        },
        0.04
      );
    }

    if (desktopBasePortrait) {
      tl.to(
        desktopBasePortrait,
        {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1) contrast(1.04)',
          duration: 0.85,
          ease: 'power3.out'
        },
        0.12
      );
    }

    if (mobileUnseenPortrait) {
      tl.to(
        mobileUnseenPortrait,
        {
          clipPath: 'circle(0% at 50% 42%)',
          WebkitClipPath: 'circle(0% at 50% 42%)',
          scale: 1.06,
          opacity: 0,
          duration: 0.75,
          ease: 'expo.inOut'
        },
        0.04
      );
    }

    if (mobileBasePortrait) {
      tl.to(
        mobileBasePortrait,
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out'
        },
        0.12
      );
    }
  }

  // 3. Staggered Kinetic Typography & Telemetry Re-Reveal in the Hero
  if (headlineWords && headlineWords.length) {
    tl.fromTo(
      headlineWords,
      { yPercent: 85, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.055,
        ease: 'expo.out'
      },
      0.16
    );
  }

  if (introItems && introItems.length) {
    tl.fromTo(
      introItems,
      { y: isMobile ? 12 : 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out'
      },
      0.2
    );
  }

  if (techIds && techIds.length) {
    tl.fromTo(
      techIds,
      { x: isMobile ? 10 : 18, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out'
      },
      0.22
    );
  }

  return tl;
}
