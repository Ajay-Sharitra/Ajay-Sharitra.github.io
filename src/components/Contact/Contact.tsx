import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../../data/profile';
import { gsap } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ContactProps {
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function Contact({
  isDrawerOpen,
  onOpenDrawer,
  onCloseDrawer,
  onCursorHover
}: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('Software Engineering / Custom System');
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.contact-title-line');
        gsap.fromTo(
          lines,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 84%'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!drawerRef.current) return;
    gsap.killTweensOf(drawerRef.current);

    if (isDrawerOpen) {
      gsap.set(drawerRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.fromTo(
        drawerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power4.inOut' }
      );
    } else {
      gsap.to(drawerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.45,
        ease: 'power4.inOut',
        onComplete: () => {
          if (drawerRef.current) {
            gsap.set(drawerRef.current, { visibility: 'hidden', pointerEvents: 'none' });
          }
        }
      });
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawerOpen, onCloseDrawer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry [${inquiryCategory}] — ${senderName || 'Collaborator'}`
    );
    const body = encodeURIComponent(
      `Hello Ajay,\n\nName: ${senderName}\nEmail: ${senderEmail}\nCategory: ${inquiryCategory}\n\nMessage:\n${messageBody}\n`
    );
    window.location.href = `mailto:${PROFILE.contacts.email}?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppDispatch = () => {
    const text = encodeURIComponent(
      `Hello Ajay, I am ${senderName || 'reaching out from your portfolio'}.\nTopic: ${inquiryCategory}\nDetails: ${messageBody || 'Let us connect.'}`
    );
    window.open(`https://wa.me/919488001018?text=${text}`, '_blank');
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative w-full bg-[#050505] text-[#f5f5f5] py-20 sm:py-28 md:py-44 border-t border-white/10 overflow-hidden"
      >
        {/* Ambient Crimson Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(153, 0, 0, 0.35) 0%, rgba(5, 5, 5, 0) 65%)'
          }}
        />

        <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
          {/* Top Index */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-10 sm:mb-16">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-mono-tech text-xs text-[#d60407]">08 // INITIATE</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                DIRECT CHANNELS &amp; COLLABORATION
              </span>
            </div>
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#d60407]">
              AVAILABLE FOR CONTRACTS &amp; ROLES
            </span>
          </div>

          {/* Center Cinematic Headline & Ring Trigger */}
          <div className="flex flex-col items-center text-center py-6 sm:py-8 md:py-16">
            <h2
              ref={headlineRef}
              className="uppercase leading-[0.88] tracking-tight max-w-6xl select-none"
            >
              <span className="block overflow-hidden">
                <span className="contact-title-line block font-display text-[clamp(2.15rem,7.8vw,8.2rem)] text-[#f5f5f5]">
                  LET&apos;S BUILD
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="contact-title-line block font-display text-[clamp(2.15rem,7.8vw,8.2rem)] text-[#f5f5f5]">
                  SOMETHING <span className="font-serif-accent text-[#d60407] lowercase">meaningful.</span>
                </span>
              </span>
            </h2>

            <p className="mt-6 sm:mt-8 text-sm sm:text-lg md:text-xl text-[#b8b8b8] max-w-2xl leading-relaxed px-2">
              Have an interesting technical challenge, a software idea or an opportunity to
              collaborate? Let&apos;s connect.
            </p>

            {/* Rotating Crimson Ring CTA Button */}
            <div className="mt-10 sm:mt-14 relative flex items-center justify-center">
              <button
                onClick={onOpenDrawer}
                onMouseEnter={() => onCursorHover(true, 'DISPATCH')}
                onMouseLeave={() => onCursorHover(false)}
                className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center bg-[#080808] border border-[#d60407]/50 hover:bg-[#d60407] transition-all duration-500 shadow-[0_0_50px_rgba(214,4,7,0.3)]"
              >
                <img
                  src="/assets/reference/ring.avif"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain scale-[1.5] sm:scale-[1.55] opacity-75 group-hover:scale-[1.68] transition-transform duration-500 animate-spin-slow pointer-events-none"
                />
                <span className="relative z-10 font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/70 group-hover:text-black">
                  INITIATE
                </span>
                <span className="relative z-10 font-serif-accent text-2xl sm:text-3xl text-[#d60407] group-hover:text-white mt-0.5">
                  Connect
                </span>
              </button>
            </div>
          </div>

          {/* Direct Contact Channels Grid (Email, LinkedIn, GitHub, Resume, WhatsApp) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-white/15">
            {/* 1. Email */}
            <a
              href={`mailto:${PROFILE.contacts.email}`}
              onMouseEnter={() => onCursorHover(true, 'EMAIL')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-5 sm:p-6 bg-[#0c0c0c] border border-white/12 hover:border-[#d60407] transition-all group flex flex-col justify-between min-h-[120px]"
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                <span>01 // EMAIL</span>
                <span>↗</span>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg uppercase text-white group-hover:text-[#d60407] transition-colors">
                  Direct Mail
                </div>
                <div className="font-mono-tech text-xs text-white/65 truncate mt-1">
                  {PROFILE.contacts.email}
                </div>
              </div>
            </a>

            {/* 2. LinkedIn */}
            <a
              href={PROFILE.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorHover(true, 'LINKEDIN')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-5 sm:p-6 bg-[#0c0c0c] border border-white/12 hover:border-[#d60407] transition-all group flex flex-col justify-between min-h-[120px]"
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                <span>02 // LINKEDIN</span>
                <span>↗</span>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg uppercase text-white group-hover:text-[#d60407] transition-colors">
                  Professional Network
                </div>
                <div className="font-mono-tech text-xs text-white/65 mt-1">
                  Ajay Sharitra .B
                </div>
              </div>
            </a>

            {/* 3. GitHub */}
            <a
              href={PROFILE.contacts.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorHover(true, 'GITHUB')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-5 sm:p-6 bg-[#0c0c0c] border border-white/12 hover:border-[#d60407] transition-all group flex flex-col justify-between min-h-[120px]"
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                <span>03 // GITHUB</span>
                <span>↗</span>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg uppercase text-white group-hover:text-[#d60407] transition-colors">
                  Code &amp; Releases
                </div>
                <div className="font-mono-tech text-xs text-white/65 mt-1">
                  github.com/Ajay-Sharitra
                </div>
              </div>
            </a>

            {/* 4. Resume Download / Dossier */}
            <a
              href="/Ajay_Sharitra_Resume.html"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorHover(true, 'RESUME')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-5 sm:p-6 bg-[#0c0c0c] border border-white/12 hover:border-[#d60407] transition-all group flex flex-col justify-between min-h-[120px]"
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                <span>04 // RESUME / CV</span>
                <span>↓</span>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg uppercase text-white group-hover:text-[#d60407] transition-colors">
                  Technical Dossier
                </div>
                <div className="font-mono-tech text-xs text-white/65 mt-1">
                  View &amp; Print PDF
                </div>
              </div>
            </a>

            {/* 5. Direct WhatsApp / Phone */}
            <a
              href={PROFILE.contacts.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorHover(true, 'WHATSAPP')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-5 sm:p-6 bg-[#d60407]/15 border border-[#d60407]/50 hover:bg-[#d60407] transition-all group flex flex-col justify-between min-h-[120px] sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#f5f5f5]">
                <span>05 // WHATSAPP</span>
                <span>↗</span>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg uppercase text-white">
                  Instant Dispatch
                </div>
                <div className="font-mono-tech text-xs text-white/85 mt-1">
                  {PROFILE.contacts.primaryPhone}
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Slide-Over Crimson Contact Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Direct Contact Form"
        data-lenis-prevent
        className="fixed top-0 right-0 z-[2400] w-full lg:w-[46vw] h-dvh-safe bg-[#850000] text-white px-5 sm:px-10 md:px-12 py-6 sm:py-10 overflow-y-auto invisible pointer-events-none shadow-[-30px_0_90px_rgba(0,0,0,0.9)] safe-top-pad safe-bottom-pad"
      >
        <img
          src="/assets/reference/contact-bg.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#6b0000]/70 to-black/90 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col justify-between min-h-full space-y-8 sm:space-y-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/25 pb-4 sm:pb-5">
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/80">
              DIRECT DISPATCH // AJAY SHARITRA
            </span>
            <button
              onClick={onCloseDrawer}
              className="w-11 h-11 rounded-full border border-white/40 bg-black/30 hover:bg-white hover:text-black flex items-center justify-center transition-colors shrink-0"
              aria-label="Close Contact Drawer"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.88] tracking-tight">
              GET IN <span className="font-serif-accent block text-white lowercase">touch</span>
            </h3>
            <p className="font-mono-tech text-[11px] sm:text-xs tracking-[0.15em] uppercase text-white/75 mt-3">
              NO TICKET QUEUES. DIRECT ENGINEERING COMMUNICATION.
            </p>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="contact-sender-name"
                className="block font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/75 mb-2"
              >
                YOUR NAME OR ORGANIZATION
              </label>
              <input
                id="contact-sender-name"
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="NAME / COMPANY"
                className="w-full bg-transparent border-b border-white/40 focus:border-white py-3 text-sm font-mono-tech text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-sender-email"
                className="block font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/75 mb-2"
              >
                YOUR EMAIL ADDRESS
              </label>
              <input
                id="contact-sender-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b border-white/40 focus:border-white py-3 text-sm font-mono-tech text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-inquiry-domain"
                className="block font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/75 mb-2"
              >
                TECHNICAL DOMAIN
              </label>
              <select
                id="contact-inquiry-domain"
                value={inquiryCategory}
                onChange={(e) => setInquiryCategory(e.target.value)}
                className="w-full bg-black/60 border border-white/30 px-4 py-3 text-xs font-mono-tech uppercase tracking-wider text-white focus:outline-none min-h-[44px]"
              >
                <option value="Software Engineering / Custom System">
                  Software Engineering / Custom System
                </option>
                <option value="Day Soft / LedgeSoft / Commercial Licensing">
                  Day Soft / LedgeSoft Licensing
                </option>
                <option value="IT Infrastructure & Cisco Networking">
                  IT Infrastructure &amp; Cisco Networking
                </option>
                <option value="Cybersecurity & Vulnerability Audit">
                  Cybersecurity &amp; Vulnerability Audit
                </option>
                <option value="Full-Time Engineering Opportunity">
                  Full-Time Engineering Role / Collaboration
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message-body"
                className="block font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/75 mb-2"
              >
                PROJECT BRIEF OR MESSAGE
              </label>
              <textarea
                id="contact-message-body"
                rows={4}
                required
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="DESCRIBE YOUR CHALLENGE, IDEA, OR OPPORTUNITY..."
                className="w-full bg-transparent border-b border-white/40 focus:border-white py-3 text-sm font-mono-tech text-white placeholder:text-white/40 focus:outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <button
                type="submit"
                className="px-6 py-4 bg-white text-black hover:bg-black hover:text-white font-mono-tech text-xs tracking-[0.2em] uppercase font-bold transition-colors text-center"
              >
                SEND VIA EMAIL ↗
              </button>
              <button
                type="button"
                onClick={handleWhatsAppDispatch}
                className="px-6 py-4 bg-black/60 hover:bg-black text-white border border-white/40 font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors text-center"
              >
                SEND VIA WHATSAPP ↗
              </button>
            </div>
          </form>

          {/* Direct Details Footer */}
          <div className="pt-5 border-t border-white/20 flex flex-wrap justify-between gap-3 font-mono-tech text-xs text-white/80">
            <div className="break-all">{PROFILE.contacts.email}</div>
            <div>{PROFILE.contacts.primaryPhone}</div>
          </div>
        </div>
      </div>
    </>
  );
}
