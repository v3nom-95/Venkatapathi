import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

export const CyberOrb = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rotate rings
    animate('.orb-ring', {
      rotate: 360,
      duration: () => utils.random(8000, 15000),
      loop: true,
      ease: 'linear',
    });

    // Pulse core
    animate('.orb-core', {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });

    // Float particles
    animate('.orb-particle', {
      translateY: () => utils.random(-20, 20),
      translateX: () => utils.random(-20, 20),
      opacity: [0.3, 1, 0.3],
      duration: () => utils.random(2000, 4000),
      delay: () => utils.random(0, 1000),
      loop: true,
      ease: 'inOutQuad',
    });

    // Data streams
    animate('.data-stream', {
      strokeDashoffset: [0, -200],
      duration: 3000,
      loop: true,
      ease: 'linear',
      delay: stagger(300),
    });

  }, []);

  return (
    <div ref={orbRef} className="relative w-64 h-64">
      {/* Glow background */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[50px] animate-pulse" />
      
      {/* Orb SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        {/* Core */}
        <circle
          className="orb-core"
          cx="100"
          cy="100"
          r="30"
          fill="url(#coreGradient)"
        />
        
        {/* Inner glow */}
        <circle
          cx="100"
          cy="100"
          r="35"
          fill="none"
          stroke="hsl(142, 100%, 50%)"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Rotating rings */}
        <g className="orb-ring" style={{ transformOrigin: '100px 100px' }}>
          <ellipse
            cx="100"
            cy="100"
            rx="50"
            ry="20"
            fill="none"
            stroke="hsl(188, 100%, 50%)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.6"
          />
        </g>
        
        <g className="orb-ring" style={{ transformOrigin: '100px 100px', transform: 'rotate(60deg)' }}>
          <ellipse
            cx="100"
            cy="100"
            rx="60"
            ry="25"
            fill="none"
            stroke="hsl(142, 100%, 50%)"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.4"
          />
        </g>
        
        <g className="orb-ring" style={{ transformOrigin: '100px 100px', transform: 'rotate(-45deg)' }}>
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="30"
            fill="none"
            stroke="hsl(270, 100%, 60%)"
            strokeWidth="1"
            strokeDasharray="10 8"
            opacity="0.3"
          />
        </g>
        
        {/* Data streams */}
        <path
          className="data-stream"
          d="M100 30 Q130 50, 100 100 Q70 150, 100 170"
          fill="none"
          stroke="hsl(142, 100%, 50%)"
          strokeWidth="2"
          strokeDasharray="10 10"
          opacity="0.6"
        />
        <path
          className="data-stream"
          d="M30 100 Q50 70, 100 100 Q150 130, 170 100"
          fill="none"
          stroke="hsl(188, 100%, 50%)"
          strokeWidth="2"
          strokeDasharray="10 10"
          opacity="0.5"
        />
        
        {/* Particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 45;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;
          return (
            <circle
              key={i}
              className="orb-particle"
              cx={x}
              cy={y}
              r="3"
              fill={i % 2 === 0 ? 'hsl(142, 100%, 50%)' : 'hsl(188, 100%, 50%)'}
            />
          );
        })}
        
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="hsl(220, 15%, 20%)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        
        {/* Hex pattern */}
        <g opacity="0.2">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 75;
            const y1 = 100 + Math.sin(rad) * 75;
            const x2 = 100 + Math.cos(rad) * 90;
            const y2 = 100 + Math.sin(rad) * 90;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(142, 100%, 50%)"
                strokeWidth="1"
              />
            );
          })}
        </g>
        
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(142, 100%, 70%)" />
            <stop offset="50%" stopColor="hsl(142, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(188, 100%, 40%)" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Labels */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-primary/60">
        NEURAL_CORE
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-secondary/60">
        v3nom95.sys
      </div>
    </div>
  );
};
