import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  clusterId: number;
  phase: number;
}

interface ParticleConfig {
  particleCount: number;
  connectionDistance: number;
  mouseRadius: number;
  baseSpeed: number;
  nodeRadius: number;
}

const CLUSTER_COLORS = [
  'rgba(212, 168, 83, 0.8)',   // gold
  'rgba(45, 212, 191, 0.8)',   // teal
  'rgba(96, 165, 250, 0.8)',   // blue
  'rgba(74, 222, 128, 0.8)',   // green
];

const MODES: Record<string, ParticleConfig> = {
  scattered: {
    particleCount: 150,
    connectionDistance: 120,
    mouseRadius: 150,
    baseSpeed: 0.3,
    nodeRadius: 2,
  },
  clustered: {
    particleCount: 300,
    connectionDistance: 80,
    mouseRadius: 150,
    baseSpeed: 0.2,
    nodeRadius: 1.5,
  },
  flowing: {
    particleCount: 250,
    connectionDistance: 150,
    mouseRadius: 150,
    baseSpeed: 0.4,
    nodeRadius: 1.5,
  },
  orbiting: {
    particleCount: 180,
    connectionDistance: 100,
    mouseRadius: 150,
    baseSpeed: 0.2,
    nodeRadius: 1.5,
  },
  calm: {
    particleCount: 100,
    connectionDistance: 120,
    mouseRadius: 150,
    baseSpeed: 0.1,
    nodeRadius: 2,
  },
};

const SECTION_MODES: Record<string, string> = {
  hero: 'scattered',
  about: 'scattered',
  skills: 'clustered',
  experience: 'flowing',
  certifications: 'orbiting',
  education: 'calm',
  footer: 'scattered',
};

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentConfigRef = useRef<ParticleConfig>({ ...MODES.scattered });
  const targetConfigRef = useRef<ParticleConfig>({ ...MODES.scattered });
  const animFrameRef = useRef<number>(0);
  const sectionModeRef = useRef<string>('scattered');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();

    function createParticles(config: ParticleConfig) {
      const count = isMobile ? Math.floor(config.particleCount / 2) : config.particleCount;
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.baseSpeed * 2,
          vy: (Math.random() - 0.5) * config.baseSpeed * 2,
          radius: config.nodeRadius,
          opacity: 0.4 + Math.random() * 0.4,
          clusterId: i % 8,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    }

    // Initialize particles
    particlesRef.current = createParticles(currentConfigRef.current);

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Setup intersection observer for sections
    const sectionIds = ['hero', 'about', 'skills', 'experience', 'certifications', 'education', 'footer'];
    const observerOptions = {
      rootMargin: '-50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const newMode = SECTION_MODES[sectionId] || 'scattered';
          if (newMode !== sectionModeRef.current) {
            sectionModeRef.current = newMode;
            targetConfigRef.current = { ...MODES[newMode] };
            if (isMobile) {
              targetConfigRef.current.particleCount = Math.floor(targetConfigRef.current.particleCount / 2);
            }
          }
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Smooth config interpolation
    function interpolateConfig() {
      const current = currentConfigRef.current;
      const target = targetConfigRef.current;
      const lerp = 0.05;

      current.particleCount += (target.particleCount - current.particleCount) * lerp;
      current.connectionDistance += (target.connectionDistance - current.connectionDistance) * lerp;
      current.mouseRadius += (target.mouseRadius - current.mouseRadius) * lerp;
      current.baseSpeed += (target.baseSpeed - current.baseSpeed) * lerp;
      current.nodeRadius += (target.nodeRadius - current.nodeRadius) * lerp;
    }

    function updateParticle(p: Particle, config: ParticleConfig, mode: string) {
      const clusterCount = 8;

      if (mode === 'flowing') {
        // Flowing river mode
        p.vy = Math.sin(p.x * 0.003 + p.phase) * config.baseSpeed;
        p.vx = config.baseSpeed * 0.8;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      } else if (mode === 'clustered') {
        // Clustered mode
        const clusterIndex = p.clusterId % clusterCount;
        const centerX = width * (0.1 + 0.8 * (clusterIndex % 4) / 3);
        const centerY = height * (0.3 + 0.4 * Math.sin(clusterIndex));

        p.vx += (centerX - p.x) * 0.0003;
        p.vy += (centerY - p.y) * 0.0003;

        // Add random motion
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        // Dampen and cap velocity
        p.vx *= 0.99;
        p.vy *= 0.99;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = config.baseSpeed * 3;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      } else if (mode === 'orbiting') {
        // Orbiting mode - particles in elliptical orbits
        const orbitIndex = p.clusterId % 4;
        const orbitSpeed = 0.005 + orbitIndex * 0.002;
        p.phase += orbitSpeed;

        const centerX = width / 2;
        const centerY = height / 2;
        const orbitRadiusX = Math.min(width, height) * (0.15 + orbitIndex * 0.08);
        const orbitRadiusY = orbitRadiusX * 0.6;

        // Add offset based on clusterId for variety
        const offsetAngle = (p.clusterId / 8) * Math.PI * 2;

        p.x = centerX + Math.cos(p.phase + offsetAngle) * orbitRadiusX;
        p.y = centerY + Math.sin(p.phase + offsetAngle) * orbitRadiusY;
      } else {
        // Scattered and calm modes - random walk
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
    }

    function draw() {
      const config = currentConfigRef.current;
      const mode = sectionModeRef.current;

      // Interpolate config
      interpolateConfig();

      // Clear canvas
      ctx!.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Adjust particle count if needed
      const targetCount = Math.floor(config.particleCount);
      if (particles.length < targetCount) {
        for (let i = particles.length; i < targetCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.baseSpeed * 2,
            vy: (Math.random() - 0.5) * config.baseSpeed * 2,
            radius: config.nodeRadius,
            opacity: 0.4 + Math.random() * 0.4,
            clusterId: i % 8,
            phase: Math.random() * Math.PI * 2,
          });
        }
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
      }

      // Update and draw connections first (behind nodes)
      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i], config, mode);

        // Mouse repulsion
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mdx = particles[i].x - mx;
        const mdy = particles[i].y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < config.mouseRadius && mDist > 0) {
          const force = (1 - mDist / config.mouseRadius) * 0.5;
          particles[i].vx += (mdx / mDist) * force;
          particles[i].vy += (mdy / mDist) * force;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const opacity = (1 - dist / config.connectionDistance) * 0.15;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let nodeColor = 'rgba(212, 168, 83, 0.8)';

        if (mode === 'clustered') {
          nodeColor = CLUSTER_COLORS[p.clusterId % 4];
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = nodeColor;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = nodeColor;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
      }, 200);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
