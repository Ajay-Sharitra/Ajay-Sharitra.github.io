import React from 'react';
import { PROFILE } from '../../data/profile';

interface FooterProps {
  onBackToTop: () => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function Footer({ onBackToTop, onCursorHover }: FooterProps) {
  return (
    <footer
      id="footer"
      className="relative w-full min-h-[60vh] sm:min-h-[72vh] flex flex-col justify-between overflow-hidden select-none pt-14 sm:pt-16 pb-20 sm:pb-12 px-4 sm:px-6 md:px-12 border-t border-white/15 safe-bottom-pad"
      style={{
        background: 'linear-gradient(-6deg, #d60407 0%, #6b0000 28%, #050505 68%)'
      }}
    >
      {/* Top Row: Identity & Quick Links */}
      <div className="relative z-10 max-w-[1560px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        <div>
          <div className="font-mono-tech text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#d60407]">
            {PROFILE.fullName} // PORTFOLIO
          </div>
          <p className="font-mono-tech text-xs text-white/65 mt-1">
            {PROFILE.location} · {PROFILE.certification}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono-tech text-xs tracking-[0.18em] uppercase">
          <a
            href={PROFILE.contacts.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorHover(true, 'GITHUB')}
            onMouseLeave={() => onCursorHover(false)}
            className="text-white/85 hover:text-white transition-colors py-1"
          >
            GITHUB ↗
          </a>
          <a
            href={PROFILE.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorHover(true, 'LINKEDIN')}
            onMouseLeave={() => onCursorHover(false)}
            className="text-white/85 hover:text-white transition-colors py-1"
          >
            LINKEDIN ↗
          </a>
          <a
            href={`mailto:${PROFILE.contacts.email}`}
            onMouseEnter={() => onCursorHover(true, 'EMAIL')}
            onMouseLeave={() => onCursorHover(false)}
            className="text-white/85 hover:text-white transition-colors py-1"
          >
            EMAIL ↗
          </a>
          <a
            href="/Ajay_Sharitra_Resume.html"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorHover(true, 'RESUME')}
            onMouseLeave={() => onCursorHover(false)}
            className="text-white/85 hover:text-white transition-colors py-1"
          >
            RESUME ↗
          </a>
          <button
            onClick={onBackToTop}
            onMouseEnter={() => onCursorHover(true, 'TOP')}
            onMouseLeave={() => onCursorHover(false)}
            className="px-4 py-2.5 bg-black/75 hover:bg-black text-white border border-white/25 transition-colors min-h-[42px]"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>

      {/* Center Oversized Scrolling Finale Rail */}
      <div className="relative z-10 my-auto py-8 sm:py-12 overflow-hidden">
        <div className="animate-marquee-rail flex items-center whitespace-nowrap">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-display text-[clamp(3.2rem,14vw,15rem)] uppercase tracking-tight text-white mx-6 sm:mx-8 leading-none">
                AJAY SHARITRA
              </span>
              <span className="font-serif-accent text-[clamp(3.5rem,15vw,16rem)] text-black/90 mx-6 sm:mx-8 leading-none">
                Software. Systems. Security.
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal & Architecture Bar */}
      <div className="relative z-10 max-w-[1560px] mx-auto w-full pt-6 border-t border-black/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-mono-tech text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/85">
        <div>© {new Date().getFullYear()} AJAY SHARITRA .B · ALL RIGHTS RESERVED</div>
        <div>BUILT WITH REACT 19 · TYPESCRIPT · GSAP · THREE.JS · LENIS</div>
      </div>
    </footer>
  );
}
