import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function AnimatedParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 6,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 dark:bg-white/10"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `particle ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5" />
      <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
