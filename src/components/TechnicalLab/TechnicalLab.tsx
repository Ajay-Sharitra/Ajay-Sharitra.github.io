import React, { useState, useEffect, useRef } from 'react';
import { LAB_EXPERIMENTS, LabExperiment } from '../../data/experience';
import { gsap } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TechnicalLabProps {
  onCursorHover: (hovering: boolean, label?: string) => void;
}

const SAMPLE_TOKENS = ['<BOS>', 'def', 'forward', '(self,', 'q,', 'k,', 'v):'];

const ATTENTION_MATRIX: number[][] = [
  [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.18, 0.82, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.09, 0.64, 0.27, 0.0, 0.0, 0.0, 0.0],
  [0.05, 0.28, 0.45, 0.22, 0.0, 0.0, 0.0],
  [0.04, 0.14, 0.36, 0.18, 0.28, 0.0, 0.0],
  [0.03, 0.12, 0.31, 0.14, 0.22, 0.18, 0.0],
  [0.03, 0.1, 0.29, 0.12, 0.19, 0.16, 0.11]
];

export default function TechnicalLab({ onCursorHover }: TechnicalLabProps) {
  const [selectedExpId, setSelectedExpId] = useState<string>(LAB_EXPERIMENTS[0].id);
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(6);
  const [selectedVlan, setSelectedVlan] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.lab-card-item');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeExperiment: LabExperiment =
    LAB_EXPERIMENTS.find((e) => e.id === selectedExpId) || LAB_EXPERIMENTS[0];

  const vlans = [
    { id: 'VLAN 10 // EOFFICE', subnet: '10.10.10.0/24', policy: 'STRICT ACL · DSC AUTH', status: 'ONLINE' },
    { id: 'VLAN 20 // R&D LAB', subnet: '10.10.20.0/24', policy: 'ISOLATED SANDBOX · OSPF', status: 'ISOLATED' },
    { id: 'VLAN 30 // DB CLUSTER', subnet: '10.10.30.0/24', policy: 'PORT 5432/3306 ONLY', status: 'HARDENED' }
  ];

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-[#f5f5f5] py-20 sm:py-28 md:py-40 border-t border-white/10 overflow-hidden"
    >
      {/* Engineering Lab Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #d60407 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 128px 128px, 128px 128px'
        }}
      />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-6 sm:pb-8 mb-10 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-mono-tech text-xs text-[#d60407]">07 // ENGINEERING LAB</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                EXPERIMENTATION &amp; RESEARCH
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6vw,6.2rem)] uppercase leading-[0.88] tracking-tight">
              TECHNICAL <span className="font-serif-accent text-[#d60407] lowercase">laboratory</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d60407]/15 border border-[#d60407]/40 font-mono-tech text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#d60407]">
              EXPERIMENTAL R&amp;D // DISTINCT FROM PRODUCTION
            </div>
            <p className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed">
              Where technical curiosity is tested—building custom LLMs and Transformer Q·K·V
              attention mechanisms in PyTorch, auditing hashes with Hashcat, and simulating Cisco
              packet topologies.
            </p>
          </div>
        </div>

        {/* 4 Lab Experiment Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-12">
          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                onMouseEnter={() => onCursorHover(true, exp.code)}
                onMouseLeave={() => onCursorHover(false)}
                className={`lab-card-item text-left p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#d60407]/12 border-[#d60407] shadow-[0_0_35px_rgba(214,4,7,0.2)]'
                    : 'bg-[#0b0b0b] border-white/12 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                      {exp.code}
                    </span>
                    <span className="font-mono-tech text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 bg-black border border-white/15 text-white/70">
                      {exp.status}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg uppercase tracking-tight text-white leading-snug mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed line-clamp-3">
                    {exp.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest">
                  <span className={isSelected ? 'text-[#d60407]' : 'text-white/45'}>
                    {isSelected ? '● BENCH ACTIVE' : 'LOAD BENCH'}
                  </span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Laboratory Workbench */}
        <div className="bg-[#0b0b0b] border border-white/15 p-4 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            {/* Left 5 Columns: Technical Specification & Deep Dive */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="px-3 py-1 bg-[#d60407] text-white font-mono-tech text-[10px] tracking-[0.2em] uppercase">
                  {activeExperiment.code}
                </span>
                <span className="font-mono-tech text-xs text-white/60 uppercase tracking-wider">
                  {activeExperiment.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-none">
                {activeExperiment.title}
              </h3>

              <p className="text-sm sm:text-base text-[#c4c4c4] leading-relaxed">
                {activeExperiment.technicalDeepDive}
              </p>

              {/* Telemetry Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/10">
                {activeExperiment.parameters.map((param, idx) => (
                  <div key={idx} className="p-3.5 bg-black/70 border border-white/10">
                    <div className="font-mono-tech text-[9px] tracking-[0.18em] uppercase text-white/45">
                      {param.label}
                    </div>
                    <div className="font-mono-tech text-xs text-[#d60407] mt-1">{param.value}</div>
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeExperiment.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-tech text-[10px] uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/15 text-white/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 7 Columns: Interactive Technical Diagram / Simulator */}
            <div className="lg:col-span-7 bg-[#060606] border border-white/15 p-4 sm:p-6 md:p-8 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5 sm:pb-4 mb-5 sm:mb-6 font-mono-tech text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase">
                <span className="text-[#d60407]">
                  INTERACTIVE SCHEMATIC // {activeExperiment.diagramType.toUpperCase()}
                </span>
                <span className="text-white/50">LIVE TELEMETRY</span>
              </div>

              {/* DIAGRAM 01: Transformer Self-Attention (Query, Key, Value) */}
              {activeExperiment.diagramType === 'attention-qkv' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111] p-3.5 sm:p-4 border border-white/10">
                    <div className="min-w-0">
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d60407]">
                        SCALED DOT-PRODUCT SELF-ATTENTION
                      </div>
                      <div className="font-mono-tech text-[11px] sm:text-xs text-white/85 mt-0.5 break-words">
                        Attention(Q, K, V) = softmax((Q · Kᵀ) / √dₖ) · V
                      </div>
                    </div>
                    <span className="font-mono-tech text-[10px] text-white/50 uppercase shrink-0">
                      TAP QUERY TOKEN ↓
                    </span>
                  </div>

                  {/* Token Selector Row */}
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/55 mb-2">
                      QUERY TOKEN SEQUENCE (TAP TO INSPECT CAUSAL ATTENTION WEIGHTS):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_TOKENS.map((tok, idx) => (
                        <button
                          key={tok}
                          onClick={() => setActiveTokenIdx(idx)}
                          className={`px-3 py-2 font-mono-tech text-xs border transition-all min-h-[40px] ${
                            activeTokenIdx === idx
                              ? 'bg-[#d60407] border-[#d60407] text-white'
                              : 'bg-[#111] border-white/15 text-white/75 hover:border-[#d60407]/60'
                          }`}
                        >
                          {tok}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QKV Tensor Projections & Causal Attention Distribution */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                    <div className="p-3.5 sm:p-4 bg-[#0e0e0e] border border-[#d60407]/40">
                      <div className="font-mono-tech text-[10px] text-[#d60407] uppercase">
                        QUERY VECTOR (Q = X · W_Q)
                      </div>
                      <div className="font-mono-tech text-xs text-white mt-1">
                        Token: &ldquo;{SAMPLE_TOKENS[activeTokenIdx]}&rdquo; (pos {activeTokenIdx})
                      </div>
                      <div className="font-mono-tech text-[10px] text-white/45 mt-1">
                        Shape: [1, n_heads=8, d_k=64]
                      </div>
                    </div>
                    <div className="p-3.5 sm:p-4 bg-[#0e0e0e] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-white/70 uppercase">
                        KEY MATRIX (K = X · W_K)
                      </div>
                      <div className="font-mono-tech text-xs text-white mt-1">
                        Causal Context: 0 .. {activeTokenIdx}
                      </div>
                      <div className="font-mono-tech text-[10px] text-white/45 mt-1">
                        Future positions masked (-∞)
                      </div>
                    </div>
                    <div className="p-3.5 sm:p-4 bg-[#0e0e0e] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-white/70 uppercase">
                        VALUE AGGREGATION (V = X · W_V)
                      </div>
                      <div className="font-mono-tech text-xs text-white mt-1">
                        Weighted Context Sum
                      </div>
                      <div className="font-mono-tech text-[10px] text-white/45 mt-1">
                        Output Residual Stream
                      </div>
                    </div>
                  </div>

                  {/* Attention Weight Bars */}
                  <div className="space-y-2.5 pt-2">
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/60">
                      SOFTMAX ATTENTION WEIGHTS FOR &ldquo;{SAMPLE_TOKENS[activeTokenIdx]}&rdquo;:
                    </div>
                    {SAMPLE_TOKENS.map((tok, kIdx) => {
                      const weight = ATTENTION_MATRIX[activeTokenIdx][kIdx] ?? 0;
                      const pct = Math.round(weight * 100);
                      const isMasked = kIdx > activeTokenIdx;
                      return (
                        <div key={tok} className="flex items-center gap-2 sm:gap-3 font-mono-tech text-xs">
                          <span className="w-16 sm:w-24 text-white/85 truncate shrink-0">{tok}</span>
                          <div className="flex-1 h-3 bg-white/5 border border-white/10 overflow-hidden">
                            <div
                              className="h-full bg-[#d60407] transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-16 sm:w-20 text-right text-[10px] sm:text-[11px] text-white/60 shrink-0">
                            {isMasked ? 'MASKED' : `${pct}%`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DIAGRAM 02: Cybersecurity & Hashcat / OSINT Pipeline */}
              {activeExperiment.diagramType === 'security-hash' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    <div className="p-4 bg-[#111] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-[#d60407] uppercase">
                        PHASE 01 // OSINT RECON
                      </div>
                      <p className="text-xs text-white/80 mt-2">
                        Surface enumeration, DNS/WHOIS footprinting, exposed document metadata, and
                        service banner inspection.
                      </p>
                    </div>
                    <div className="p-4 bg-[#111] border border-[#d60407]/50">
                      <div className="font-mono-tech text-[10px] text-[#d60407] uppercase">
                        PHASE 02 // HASHCAT AUDIT
                      </div>
                      <p className="text-xs text-white/80 mt-2">
                        Dictionary + rule-based and mask attacks evaluating credential entropy against
                        SHA-256 / NTLM / bcrypt hashes.
                      </p>
                    </div>
                    <div className="p-4 bg-[#111] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-[#d60407] uppercase">
                        PHASE 03 // REMEDIATION
                      </div>
                      <p className="text-xs text-white/80 mt-2">
                        Enforcing salted key derivation, strict multi-tier RBAC, and firewall ACL
                        lockdown.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-black border border-white/15 font-mono-tech text-[11px] sm:text-xs space-y-2 text-white/80 overflow-x-auto">
                    <div className="text-[#d60407] break-all">
                      $ hashcat -m 1400 -a 3 hashes.txt ?u?l?l?l?l?d?d?s --status
                    </div>
                    <div className="text-white/50">
                      Hash.Mode........: 1400 (SHA2-256) | Session..........: security_audit_lab
                    </div>
                    <div className="text-white/50">
                      Status...........: Auditing Entropy Thresholds &amp; Salted KDF Resilience
                    </div>
                    <div className="text-emerald-400 pt-1">
                      [VERIFIED] Production SQLite &amp; RBAC tables hardened with salted cryptographic hashes.
                    </div>
                  </div>
                </div>
              )}

              {/* DIAGRAM 03: Cisco Multi-VLAN Network Topology */}
              {activeExperiment.diagramType === 'network-topology' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="font-mono-tech text-xs text-white/70">
                    SELECT INSTITUTIONAL VLAN SEGMENT TO INSPECT ROUTING &amp; ACL POLICY:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {vlans.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVlan(idx)}
                        className={`p-4 text-left border transition-all ${
                          selectedVlan === idx
                            ? 'bg-[#d60407]/15 border-[#d60407]'
                            : 'bg-[#111] border-white/12'
                        }`}
                      >
                        <div className="font-mono-tech text-xs text-[#d60407]">{v.id}</div>
                        <div className="font-mono-tech text-xs text-white mt-1">{v.subnet}</div>
                        <div className="font-mono-tech text-[10px] text-white/50 mt-1">
                          {v.policy}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 sm:p-5 bg-black border border-white/15 font-mono-tech text-[11px] sm:text-xs space-y-2">
                    <div className="text-[#d60407]">
                      CISCO IOS // 802.1Q TRUNK &amp; OSPF AREA 0.0.0.0
                    </div>
                    <div className="text-white/80">
                      Active Segment: {vlans[selectedVlan].id} ({vlans[selectedVlan].subnet})
                    </div>
                    <div className="text-white/60">
                      Firewall Policy: {vlans[selectedVlan].policy} | State: {vlans[selectedVlan].status}
                    </div>
                  </div>
                </div>
              )}

              {/* DIAGRAM 04: Hardware ESC/POS & Automation */}
              {activeExperiment.diagramType === 'hardware-pos' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    <div className="p-4 bg-[#111] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-[#d60407]">01 // INPUT</div>
                      <div className="font-display text-base uppercase text-white mt-1">
                        Bilingual UI / File Stream
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Tamil/English POS transaction or Outlook .msg / PDF binary buffer.
                      </p>
                    </div>
                    <div className="p-4 bg-[#111] border border-[#d60407]/50">
                      <div className="font-mono-tech text-[10px] text-[#d60407]">02 // ENGINE</div>
                      <div className="font-display text-base uppercase text-white mt-1">
                        Python / TypeScript Core
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        SQLite WAL commit + ESC/POS hex command encoder or MIME/DOCX parser.
                      </p>
                    </div>
                    <div className="p-4 bg-[#111] border border-white/15">
                      <div className="font-mono-tech text-[10px] text-[#d60407]">03 // OUTPUT</div>
                      <div className="font-display text-base uppercase text-white mt-1">
                        58/80mm Thermal / EXE
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Instant USB/Bluetooth thermal receipt dispatch or local Desktop file output.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
