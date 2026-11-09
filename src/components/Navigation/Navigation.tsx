import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '../../data/profile';
import { gsap } from '../../animations/gsapConfig';

interface NavigationProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (sectionId: string) => void;
  onOpenContactDrawer: () => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'expertise', label: 'EXPERTISE', num: '03' },
  { id: 'arsenal', label: 'ARSENAL', num: '04' },
  { id: 'work', label: 'PROJECTS', num: '05' },
  { id: 'experience', label: 'EXPERIENCE', num: '06' },
  { id: 'lab', label: 'TECH LAB', num: '07' },
  { id: 'contact', label: 'CONTACT', num: '08' }
];

const CROSSHAIR_SVG = (
  <svg width="14" height="14" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 11.8077V10.1923H9.69231V0.5H11.3077V10.1923H21V11.8077H11.3077V21.5H9.69231V11.8077H0Z"
      fill="currentColor"
    />
  </svg>
);

export default function Navigation({
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  onOpenContactDrawer,
  onCursorHover
}: NavigationProps) {
  const [localTime, setLocalTime] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: PROFILE.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setLocalTime(`${formatted} IST`);
      } catch {
        setLocalTime('IST UTC+5:30');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !barsRef.current) return;
    const bars = barsRef.current.querySelectorAll('.crimson-bar-slice');
    const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');

    gsap.killTweensOf([bars, links]);

    if (mobileMenuOpen) {
      gsap.set(mobileMenuRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: 'right center' },
        { scaleX: 1, duration: 0.55, stagger: 0.04, ease: 'power4.inOut' }
      );
      gsap.fromTo(
        links,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.035, delay: 0.18, ease: 'power3.out' }
      );
    } else {
      gsap.to(links, {
        yPercent: -60,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      });
      gsap.to(bars, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.45,
        stagger: 0.03,
        delay: 0.08,
        ease: 'power4.inOut',
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { visibility: 'hidden', pointerEvents: 'none' });
          }
        }
      });
    }
  }, [mobileMenuOpen]);

  // Keyboard Escape to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggleMobileMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, onToggleMobileMenu]);

  const handleNavClick = (id: string) => {
    onToggleMobileMenu(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Fixed Top Navigation Shell */}
      <header className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none px-4 sm:px-6 md:px-10 pt-4 sm:pt-5 pb-3 flex items-start justify-between safe-top-pad">
        {/* Top-Left Brand Monogram & Live Telemetry */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => onCursorHover(true, 'TOP')}
            onMouseLeave={() => onCursorHover(false)}
            className="group relative flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none min-h-[44px]"
            aria-label="Ajay Sharitra Home"
          >
            <div className="w-11 h-11 border border-white/20 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center group-hover:border-[#d60407] group-hover:bg-[#d60407] transition-all duration-300 shrink-0">
              <span className="font-display text-sm tracking-tighter text-white group-hover:text-black font-bold">
                AS
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#f5f5f5] group-hover:text-[#d60407] transition-colors">
                AJAY SHARITRA
              </span>
              <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em] text-white/55">
                {PROFILE.cityCode} // {localTime}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Minimal Editorial Navigation (Reference Site Style) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-start gap-12 pointer-events-auto bg-[#050505]/75 backdrop-blur-md border border-white/10 px-6 py-3.5"
        >
          <ul className="grid grid-cols-4 gap-x-7 gap-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="flex items-center">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => onCursorHover(true, item.label)}
                    onMouseLeave={() => onCursorHover(false)}
                    className={`group flex items-center gap-1.5 text-left transition-all duration-300 ${
                      isActive ? 'text-[#d60407]' : 'text-[#f5f5f5]/80 hover:text-[#d60407]'
                    }`}
                  >
                    <span className="font-mono-tech text-[9px] text-white/35 group-hover:text-[#d60407]">
                      {item.num}
                    </span>
                    <span
                      className={`text-xs tracking-[0.14em] uppercase transition-all duration-300 ${
                        isActive
                          ? 'font-serif-accent text-sm text-[#d60407]'
                          : 'font-display group-hover:translate-x-0.5'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`text-[#d60407] transition-transform duration-300 ${
                        isActive
                          ? 'scale-90 rotate-0 opacity-100'
                          : 'scale-0 rotate-45 opacity-0 group-hover:scale-90 group-hover:rotate-0 group-hover:opacity-100'
                      }`}
                    >
                      {CROSSHAIR_SVG}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="h-8 w-[1px] bg-white/10 self-center" />

          {/* Social & Direct Dispatch */}
          <div className="flex items-center gap-4 self-center">
            <a
              href={PROFILE.contacts.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorHover(true, 'GITHUB')}
              onMouseLeave={() => onCursorHover(false)}
              className="font-mono-tech text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-[#d60407] transition-colors"
            >
              GITHUB ↗
            </a>
            <button
              onClick={onOpenContactDrawer}
              onMouseEnter={() => onCursorHover(true, 'DISPATCH')}
              onMouseLeave={() => onCursorHover(false)}
              className="px-3.5 py-1.5 bg-[#d60407] hover:bg-[#990000] text-white font-mono-tech text-[10px] tracking-[0.18em] uppercase transition-colors"
            >
              DIRECT BRIEF
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet Compact Menu Trigger */}
        <button
          onClick={() => onToggleMobileMenu((prev) => !prev)}
          className={`lg:hidden pointer-events-auto relative z-[2300] h-11 px-3.5 border transition-colors duration-300 flex items-center justify-center gap-2.5 focus:outline-none ${
            mobileMenuOpen
              ? 'border-black/30 bg-white text-black'
              : 'border-white/20 bg-[#080808]/90 backdrop-blur-md text-white'
          }`}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-overlay"
        >
          <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase">
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div className="flex flex-col items-center justify-center gap-1.5 w-5">
            <span
              className={`w-5 h-[1.5px] transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[3.75px] bg-black' : 'bg-white'
              }`}
            />
            <span
              className={`w-5 h-[1.5px] transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[3.75px] bg-black' : 'bg-white'
              }`}
            />
          </div>
        </button>
      </header>

      {/* Floating Bottom-Right Live Connect Badge (Reference Site `.cta-connect` style) */}
      <button
        onClick={onOpenContactDrawer}
        onMouseEnter={() => onCursorHover(true, 'CONNECT')}
        onMouseLeave={() => onCursorHover(false)}
        className="fixed right-3.5 sm:right-5 md:right-8 bottom-4 sm:bottom-6 z-[950] flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-[#080808]/92 hover:bg-[#d60407] text-[#f5f5f5] hover:text-black border border-white/25 hover:border-[#d60407] backdrop-blur-md transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.65)] min-h-[44px]"
        aria-label="Open Direct Contact Drawer"
      >
        <div className="relative w-7 h-8 sm:w-8 sm:h-9 overflow-hidden bg-black border border-[#d60407]/40 shrink-0">
          <img
            src="/assets/portraits/ajay-crimson-hero.jpg"
            alt="Ajay Sharitra"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="text-left pr-0.5 sm:pr-1">
          <div className="flex items-center gap-1.5 font-mono-tech text-[8px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/75 group-hover:text-black/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d60407] group-hover:bg-black live-crimson-dot shrink-0" />
            <span>ONLINE // IST</span>
          </div>
          <div className="font-display text-[11px] sm:text-xs tracking-[0.1em] uppercase mt-0.5">
            Let&apos;s Connect
          </div>
        </div>
      </button>

      {/* Mobile Full-Screen Crimson Sliced Navigation Overlay (Reference Site `.navigation-menu` style) */}
      <div
        id="mobile-navigation-overlay"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        data-lenis-prevent
        className="fixed inset-0 z-[2200] pointer-events-none invisible overflow-y-auto overflow-x-hidden flex flex-col justify-between px-5 sm:px-10 pt-20 pb-8 min-h-dvh-safe safe-bottom-pad"
      >
        {/* 5 Horizontal Crimson Bars Background */}
        <div ref={barsRef} className="fixed inset-0 flex flex-col z-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div key={idx} className="crimson-bar-slice flex-1 w-full bg-[#b80306] border-b border-black/10" />
          ))}
        </div>

        <div className="relative z-10 my-auto py-4">
          <div className="font-mono-tech text-[10px] sm:text-xs tracking-[0.22em] uppercase text-black/75 mb-4 sm:mb-6">
            NAVIGATION DIRECTORY // AJAY SHARITRA
          </div>
          <nav aria-label="Mobile Section Links" className="flex flex-col gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-nav-item w-full group flex items-center justify-between text-left py-2 sm:py-2.5 border-b border-black/15 transition-colors min-h-[46px] ${
                      isActive ? 'text-white' : 'text-black hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-mono-tech text-xs opacity-70">{item.num}</span>
                      <span
                        className={`text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none ${
                          isActive ? 'font-serif-accent text-white' : 'font-display'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest">
                      {isActive && <span>ACTIVE</span>}
                      {CROSSHAIR_SVG}
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="relative z-10 border-t border-black/25 pt-5 mt-4 flex flex-col sm:flex-row justify-between gap-4 text-black">
          <div>
            <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase opacity-75">
              DIRECT DISPATCH
            </div>
            <a
              href={`mailto:${PROFILE.contacts.email}`}
              className="font-display text-base sm:text-lg underline block mt-1 break-all"
            >
              {PROFILE.contacts.email}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono-tech text-xs tracking-[0.15em] uppercase">
            <a
              href={PROFILE.contacts.github}
              target="_blank"
              rel="noreferrer"
              className="underline py-1"
            >
              GITHUB ↗
            </a>
            <a
              href={PROFILE.contacts.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="underline py-1"
            >
              WHATSAPP ↗
            </a>
            <a
              href="/Ajay_Sharitra_Resume.html"
              target="_blank"
              rel="noreferrer"
              className="underline py-1"
            >
              RESUME ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
