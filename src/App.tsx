import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS, Project } from './data/projects';
import { initGSAPConfig, refreshScrollTriggers } from './animations/gsapConfig';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Preloader from './components/Preloader/Preloader';
import CustomCursor, { CustomCursorHandle } from './components/CustomCursor/CustomCursor';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Expertise from './components/Expertise/Expertise';
import TechStack from './components/TechStack/TechStack';
import Projects from './components/Projects/Projects';
import CaseStudies from './components/CaseStudies/CaseStudies';
import Experience from './components/Experience/Experience';
import TechnicalLab from './components/TechnicalLab/TechnicalLab';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secretExperienceOpen, setSecretExperienceOpen] = useState(false);

  const cursorApiRef = useRef<CustomCursorHandle | null>(null);

  // Only lock scrolling when a true modal/drawer overlay is open (Unseen mode is an in-place Hero state)
  const isOverlayLocked = selectedProject !== null || contactDrawerOpen || mobileMenuOpen;
  const { scrollTo } = useSmoothScroll(isOverlayLocked);

  useEffect(() => {
    initGSAPConfig();
  }, []);

  // Synchronize Case Study Overlay & Unseen Hero State with URL Hash & Browser History (Back/Forward button support)
  useEffect(() => {
    const syncFromLocation = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-study/')) {
        const slug = hash.replace('#case-study/', '').trim();
        const found = PROJECTS.find((p) => p.slug === slug);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      if (hash === '#unseen') {
        setSecretExperienceOpen(true);
        setSelectedProject(null);
        return;
      }
      setSelectedProject(null);
      setSecretExperienceOpen(false);
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const handleOpenSecretExperience = useCallback(() => {
    setMobileMenuOpen(false);
    setContactDrawerOpen(false);
    setSecretExperienceOpen(true);
    if (window.location.hash !== '#unseen') {
      window.history.pushState({ unseen: true }, '', '#unseen');
    }
  }, []);

  const handleCloseSecretExperience = useCallback(() => {
    setSecretExperienceOpen(false);
    if (window.location.hash === '#unseen') {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  // Zero-re-render cursor hover dispatcher
  const handleCursorHover = useCallback((hovering: boolean, label = 'VIEW') => {
    cursorApiRef.current?.setHover(hovering, label);
  }, []);

  const handleOpenCaseStudy = useCallback(
    (project: Project) => {
      handleCursorHover(false);
      setMobileMenuOpen(false);
      setSelectedProject(project);
      const targetHash = `#case-study/${project.slug}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState({ caseStudy: project.slug }, '', targetHash);
      }
    },
    [handleCursorHover]
  );

  const handleCloseCaseStudy = useCallback(() => {
    handleCursorHover(false);
    setSelectedProject(null);
    if (window.location.hash.startsWith('#case-study/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    refreshScrollTriggers();
  }, [handleCursorHover]);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      handleCursorHover(false);
      if (selectedProject) {
        setSelectedProject(null);
        if (window.location.hash.startsWith('#case-study/')) {
          window.history.pushState(null, '', window.location.pathname);
        }
      }
      setContactDrawerOpen(false);
      setMobileMenuOpen(false);
      setActiveSection(sectionId);
      scrollTo(`#${sectionId}`);
    },
    [selectedProject, scrollTo, handleCursorHover]
  );

  // Track active section during scroll using rAF-throttled handler
  useEffect(() => {
    const sectionIds = ['home', 'about', 'expertise', 'arsenal', 'work', 'experience', 'lab', 'contact'];
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection((prev) => (prev !== sectionIds[i] ? sectionIds[i] : prev));
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    refreshScrollTriggers();
  }, []);

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-clip bg-[#050505] text-[#f5f5f5] selection:bg-[#d60407] selection:text-white">
      {/* Subtle Film Grain */}
      <div className="film-grain" />

      {/* SECTION 01 — Cinematic Introduction Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom Precision Cursor (Zero React Re-renders) */}
      <CustomCursor cursorApiRef={cursorApiRef} />

      {/* Fixed Minimal Navigation & Mobile Overlay */}
      <Navigation
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
        onNavigate={handleNavigateSection}
        onOpenContactDrawer={() => {
          setMobileMenuOpen(false);
          setContactDrawerOpen(true);
        }}
        onCursorHover={handleCursorHover}
      />

      {/* Main Vertical Experience */}
      <main>
        {/* SECTION 02 — Hero Experience */}
        <Hero
          isReady={isLoaded}
          onExploreWork={() => handleNavigateSection('work')}
          onOpenContact={() => setContactDrawerOpen(true)}
          onCursorHover={handleCursorHover}
          isSecretOpen={secretExperienceOpen}
          onOpenSecret={handleOpenSecretExperience}
          onCloseSecret={handleCloseSecretExperience}
        />

        {/* SECTION 03 — About Me */}
        <About onCursorHover={handleCursorHover} />

        {/* SECTION 04 — Expertise */}
        <Expertise onCursorHover={handleCursorHover} />

        {/* SECTION 05 — Technical Arsenal */}
        <TechStack onCursorHover={handleCursorHover} />

        {/* SECTION 06 — Selected Projects */}
        <Projects
          onSelectProject={handleOpenCaseStudy}
          onCursorHover={handleCursorHover}
        />

        {/* SECTION 08 — Professional Experience */}
        <Experience onCursorHover={handleCursorHover} />

        {/* SECTION 09 — Experimentation / Technical Lab */}
        <TechnicalLab onCursorHover={handleCursorHover} />

        {/* SECTION 10 — Contact */}
        <Contact
          isDrawerOpen={contactDrawerOpen}
          onOpenDrawer={() => setContactDrawerOpen(true)}
          onCloseDrawer={() => setContactDrawerOpen(false)}
          onCursorHover={handleCursorHover}
        />
      </main>

      {/* Visually Powerful Footer */}
      <Footer
        onBackToTop={() => handleNavigateSection('home')}
        onCursorHover={handleCursorHover}
      />

      {/* SECTION 07 — Project Case Studies Fullscreen Overlay */}
      <CaseStudies
        project={selectedProject}
        onClose={handleCloseCaseStudy}
        onSelectProject={handleOpenCaseStudy}
        onCursorHover={handleCursorHover}
      />
    </div>
  );
}
