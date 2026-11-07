import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Project } from '../data/projects';

interface WebGLOrbitCanvasProps {
  projects: Project[];
  currentIndex: number;
  onSelectProject: (index: number) => void;
  onOpenProject: (project: Project) => void;
  onHoverCard?: (hovering: boolean) => void;
  isOverlayOpen?: boolean;
}


export default function WebGLOrbitCanvas({
  projects,
  currentIndex,
  onSelectProject,
  onOpenProject,
  onHoverCard,
  isOverlayOpen = false,
}: WebGLOrbitCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Keep callback refs stable to prevent Three.js scene destruction on re-render
  const onSelectProjectRef = useRef(onSelectProject);
  const onOpenProjectRef = useRef(onOpenProject);
  const onHoverCardRef = useRef(onHoverCard);
  const isOverlayOpenRef = useRef(isOverlayOpen);
  const currentIndexRef = useRef(currentIndex);
  const setExternalAngleRef = useRef<((idx: number) => void) | null>(null);

  useEffect(() => {
    onSelectProjectRef.current = onSelectProject;
  }, [onSelectProject]);

  useEffect(() => {
    onOpenProjectRef.current = onOpenProject;
  }, [onOpenProject]);

  useEffect(() => {
    onHoverCardRef.current = onHoverCard;
  }, [onHoverCard]);

  useEffect(() => {
    isOverlayOpenRef.current = isOverlayOpen;
  }, [isOverlayOpen]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    if (setExternalAngleRef.current) {
      setExternalAngleRef.current(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xcee49f, 2.5);
    dirLight.position.set(5, 8, 10);
    scene.add(dirLight);

    const greenPoint = new THREE.PointLight(0xcee49f, 2.8, 22);
    greenPoint.position.set(0, -2, 6);
    scene.add(greenPoint);

    // 3. Orbit Group
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(0, 0, -0.4);
    scene.add(orbitGroup);

    const textureLoader = new THREE.TextureLoader();
    const cardGeometry = new THREE.PlaneGeometry(5.2, 3.25, 16, 16);
    const cardMeshes: THREE.Mesh[] = [];

    const radius = 6.8;
    const count = projects.length;
    const stepAngle = (Math.PI * 2) / count;

    projects.forEach((proj, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const texture = textureLoader.load(proj.cover);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);
      mesh.position.set(x, 0, z);
      // Face outward from cylinder center
      mesh.rotation.y = angle;

      mesh.userData = { index: i, project: proj };
      orbitGroup.add(mesh);
      cardMeshes.push(mesh);

      // Frame outline
      const edgeGeo = new THREE.EdgesGeometry(cardGeometry);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xcee49f,
        transparent: true,
        opacity: 0.35,
      });
      const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);
      wireframe.raycast = () => {};
      mesh.add(wireframe);
    });

    const getCardMeshFromHit = (hitObject: THREE.Object3D): THREE.Mesh | null => {
      let curr: THREE.Object3D | null = hitObject;
      while (curr) {
        if (curr.userData && curr.userData.project) {
          return curr as THREE.Mesh;
        }
        curr = curr.parent;
      }
      return null;
    };

    const setHighlight = (mesh: THREE.Mesh | null, active: boolean) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && 'emissive' in mat && mat.emissive && typeof mat.emissive.setHex === 'function') {
        mat.emissive.setHex(active ? 0x223311 : 0x000000);
      }
      mesh.scale.set(active ? 1.05 : 1, active ? 1.05 : 1, active ? 1.05 : 1);
    };

    // Initial angle
    const initialAngle = -(currentIndexRef.current / count) * Math.PI * 2;
    let currentRotationY = initialAngle;
    let targetRotationY = initialAngle;
    let targetTiltX = 0;
    let currentTiltX = 0;
    let velocityY = 0;

    // External jump to project
    setExternalAngleRef.current = (idx: number) => {
      targetRotationY = -(idx / count) * Math.PI * 2;
    };

    // 4. Fluid 1:1 Pointer Tracking, Inertia Momentum & Snapping
    let isPointerDown = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastActiveIndex = currentIndexRef.current;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh: THREE.Mesh | null = null;

    const dom = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (isOverlayOpenRef.current) return;
      isPointerDown = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      velocityY = 0;

      try {
        dom.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isOverlayOpenRef.current) return;

      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isPointerDown) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        if (Math.hypot(e.clientX - startX, e.clientY - startY) > 5) {
          hasMoved = true;
        }

        // Direct responsive rotation tracking (cards move in real-time with finger/mouse)
        const radPerPixel = (Math.PI * 2) / (window.innerWidth * 0.9);
        const rotationDelta = deltaX * radPerPixel;

        currentRotationY += rotationDelta;
        targetRotationY = currentRotationY;
        velocityY = rotationDelta * 0.85;

        targetTiltX = Math.max(-0.25, Math.min(0.25, targetTiltX + deltaY * 0.0015));

        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        targetTiltX = -mouse.y * 0.1;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;

      try {
        dom.releasePointerCapture(e.pointerId);
      } catch {}

      // If user did not drag, treat as a clean click!
      if (!hasMoved && !isOverlayOpenRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cardMeshes, true);
        if (intersects.length > 0) {
          const hit = getCardMeshFromHit(intersects[0].object);
          if (hit && hit.userData?.project) {
            const { index, project } = hit.userData;
            if (hoveredMesh) {
              setHighlight(hoveredMesh, false);
              hoveredMesh = null;
            }
            onHoverCardRef.current?.(false);
            onSelectProjectRef.current(index);
            onOpenProjectRef.current(project);
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (isOverlayOpenRef.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const rad = (Math.sign(delta) * Math.min(Math.abs(delta), 100)) / 450;
      targetRotationY -= rad;
      velocityY = -rad * 0.2;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: true });

    // 5. Render Loop with High-Craft Physics
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (isOverlayOpenRef.current) {
        if (hoveredMesh) {
          setHighlight(hoveredMesh, false);
          hoveredMesh = null;
        }
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
        return;
      }

      // Physics update
      if (!isPointerDown) {
        // Apply inertia momentum
        if (Math.abs(velocityY) > 0.0005) {
          targetRotationY += velocityY;
          currentRotationY += velocityY;
          velocityY *= 0.91; // Smooth friction decay
        } else {
          velocityY = 0;
          // Gently snap to nearest card when stopped
          const nearestCardIndex = Math.round(-targetRotationY / stepAngle);
          const snapTarget = -nearestCardIndex * stepAngle;
          targetRotationY += (snapTarget - targetRotationY) * 0.08;
          currentRotationY += (targetRotationY - currentRotationY) * 0.12;

          // Notify index sync when aligned with front card
          const activeIndex = ((nearestCardIndex % count) + count) % count;
          if (activeIndex !== lastActiveIndex) {
            lastActiveIndex = activeIndex;
            onSelectProjectRef.current(activeIndex);
          }
        }
      }

      currentTiltX += (targetTiltX - currentTiltX) * 0.1;
      orbitGroup.rotation.y = currentRotationY;
      orbitGroup.rotation.x = currentTiltX;

      // Subtle float animation
      const elapsedTime = clock.getElapsedTime();
      cardMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsedTime * 1.5 + idx * 1.25) * 0.14;
      });

      // Hover raycasting (active only when stationary)
      if (!isPointerDown && !hasMoved && Math.abs(velocityY) < 0.005) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cardMeshes, true);

        if (intersects.length > 0) {
          const hit = getCardMeshFromHit(intersects[0].object);
          if (hit && hoveredMesh !== hit) {
            if (hoveredMesh) {
              setHighlight(hoveredMesh, false);
            }
            hoveredMesh = hit;
            setHighlight(hit, true);
            onHoverCardRef.current?.(true);
          }
        } else if (hoveredMesh) {
          setHighlight(hoveredMesh, false);
          hoveredMesh = null;
          onHoverCardRef.current?.(false);
        }
      } else if (hoveredMesh) {
        setHighlight(hoveredMesh, false);
        hoveredMesh = null;
        onHoverCardRef.current?.(false);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);

      cardMeshes.forEach((m) => {
        (m.material as THREE.Material).dispose();
        m.geometry.dispose();
      });
      cardGeometry.dispose();
      renderer.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, [projects]);

  return (
    <div
      className="fixed inset-0 z-10 select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    >
      <div ref={mountRef} className="w-full h-full" />
      <div className="blend mono absolute top-[calc(70*var(--px))] left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-60">
        DRAG OR SCROLL TO ROTATE 3D ORBIT · CLICK TO EXPLORE PROJECT
      </div>
    </div>
  );
}

