import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from '../../animations/gsapConfig';

interface PreloaderProps {
  onComplete: () => void;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTransition;
  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 5.0 + uTime * 0.4) * 0.6 + noise(uv * 12.0 - uTime * 0.2) * 0.4;
    float dist = length(uv - vec2(0.5)) * 1.15;
    float mask = dist * 0.55 + n * 0.45;

    float threshold = uTransition * 1.25;
    float alpha = smoothstep(threshold - 0.12, threshold + 0.04, mask);
    float edge = smoothstep(threshold - 0.16, threshold - 0.02, mask) - alpha;

    vec3 voidBlack = vec3(0.03, 0.03, 0.03);
    vec3 crimsonEdge = vec3(0.84, 0.015, 0.027) * 2.2;
    vec3 finalColor = mix(voidBlack, crimsonEdge, clamp(edge * 2.5, 0.0, 1.0));

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [statusLabel, setStatusLabel] = useState('INITIALIZING KERNEL & SYSTEMS...');

  useEffect(() => {
    let completed = false;
    let rafId: number | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;

    const finishLoading = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    // Fail-safe hard timeout so the visitor is never blocked even if WebGL or GSAP stalls
    const safetyTimer = window.setTimeout(finishLoading, 2600);

    // Optional WebGL Dissolve Shader Setup
    const uniforms = {
      uTransition: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 }
    };

    try {
      if (canvasRef.current) {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance'
        });
        const isSmallViewport = window.innerWidth < 768;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallViewport ? 1.0 : 1.5));

        geometry = new THREE.PlaneGeometry(2, 2);
        material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms,
          transparent: true,
          depthTest: false,
          depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const clock = new THREE.Clock();
        const renderLoop = () => {
          if (completed || !renderer) return;
          if (!document.hidden) {
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
          }
          rafId = requestAnimationFrame(renderLoop);
        };
        renderLoop();
      }
    } catch {
      // Graceful fallback if WebGL is disabled
    }

    const progressObj = { val: 0 };
    let lastStatusBucket = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        finishLoading();
      }
    });

    tl.to(progressObj, {
      val: 100,
      duration: 1.45,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.floor(progressObj.val);
        if (counterRef.current) {
          counterRef.current.textContent = String(current).padStart(3, '0');
        }
        if (barRef.current) {
          barRef.current.style.width = `${current}%`;
        }
        if (current > 35 && current <= 75 && lastStatusBucket !== 1) {
          lastStatusBucket = 1;
          setStatusLabel('MOUNTING NETWORK & SECURITY TELEMETRY...');
        } else if (current > 75 && lastStatusBucket !== 2) {
          lastStatusBucket = 2;
          setStatusLabel('AJAY SHARITRA // READY');
        }
      }
    });

    tl.to(
      counterRef.current,
      {
        yPercent: -25,
        opacity: 0,
        duration: 0.42,
        ease: 'power3.in'
      },
      '-=0.1'
    );

    tl.to(
      uniforms.uTransition,
      {
        value: 1,
        duration: 0.7,
        ease: 'power2.inOut'
      },
      '<'
    );

    tl.to(
      containerRef.current,
      {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.out'
      },
      '-=0.35'
    );

    return () => {
      window.clearTimeout(safetyTimer);
      tl.kill();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[2000] flex flex-col justify-between bg-[#050505] text-[#f5f5f5] select-none overflow-hidden px-4 sm:px-6 md:px-14 py-6 sm:py-8 min-h-dvh-safe safe-top-pad safe-bottom-pad"
      aria-live="polite"
      aria-label="Loading Ajay Sharitra Portfolio"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top System Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#d60407] live-crimson-dot shrink-0" />
          <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-white/80 truncate">
            AJAY SHARITRA // SYSTEMS PORTFOLIO
          </span>
        </div>
        <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#d60407] shrink-0">
          TVL · IN
        </span>
      </div>

      {/* Center Oversized Counter */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div
          ref={counterRef}
          className="font-serif-accent text-[clamp(4.75rem,24vw,22rem)] leading-[0.82] tracking-tighter text-[#d60407] drop-shadow-[0_0_50px_rgba(214,4,7,0.35)]"
        >
          000
        </div>
        <div className="font-mono-tech text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] sm:tracking-[0.35em] uppercase text-white/60 mt-4 text-center">
          SOFTWARE · SYSTEMS · SECURITY
        </div>
      </div>

      {/* Bottom Progress Bar & Telemetry */}
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-center gap-2 mb-3 font-mono-tech text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-white/60">
          <span className="truncate">{statusLabel}</span>
          <span className="text-[#d60407] shrink-0">SYS.BOOT // v2.6</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#d60407] transition-none"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
