import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

export const HackerScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the hacker silhouette
    animate('.hacker-body', {
      translateY: [-3, 3],
      duration: 2000,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    // Typing animation for hands
    animate('.hacker-hands', {
      translateY: [-1, 1],
      duration: 150,
      alternate: true,
      loop: true,
      ease: 'linear',
    });

    // Screen flicker
    animate('.screen-content', {
      opacity: [1, 0.8, 1, 0.9, 1],
      duration: 100,
      loop: true,
      delay: () => utils.random(2000, 5000),
    });

    // Animate code lines
    animate('.code-line', {
      translateX: [-200, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(100, { start: 0 }),
      loop: true,
      loopDelay: 3000,
    });

    // Floating data particles
    animate('.data-particle', {
      translateY: () => utils.random(-50, 50),
      translateX: () => utils.random(-30, 30),
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      duration: () => utils.random(2000, 4000),
      delay: () => utils.random(0, 2000),
      loop: true,
      ease: 'inOutQuad',
    });

    // Pulse effect on monitor
    animate('.monitor-glow', {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });

    // Animate binary stream
    animate('.binary-stream', {
      translateY: ['-100%', '100%'],
      duration: 8000,
      loop: true,
      ease: 'linear',
    });

  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto h-80 md:h-96">
      {/* Background glow */}
      <div className="monitor-glow absolute inset-0 bg-primary/20 rounded-full blur-[80px]" />
      
      {/* Binary streams */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="binary-stream absolute font-mono text-xs text-primary/60 whitespace-nowrap"
            style={{
              left: `${15 + i * 18}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {'01101001 01001000 01100001 01100011 01101011 '.repeat(10)}
          </div>
        ))}
      </div>

      {/* Data particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="data-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className={`w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-neon-red'
            }`} />
          </div>
        ))}
      </div>

      {/* Hacker scene SVG */}
      <svg
        viewBox="0 0 400 300"
        className="relative z-10 w-full h-full"
        fill="none"
      >
        {/* Desk */}
        <rect x="50" y="240" width="300" height="8" fill="hsl(220, 15%, 15%)" rx="2" />
        
        {/* Monitor */}
        <g className="monitor">
          {/* Monitor stand */}
          <rect x="185" y="180" width="30" height="60" fill="hsl(220, 15%, 12%)" rx="2" />
          <rect x="165" y="232" width="70" height="8" fill="hsl(220, 15%, 15%)" rx="2" />
          
          {/* Monitor body */}
          <rect x="100" y="60" width="200" height="130" fill="hsl(220, 15%, 10%)" rx="8" stroke="hsl(220, 15%, 20%)" strokeWidth="2" />
          
          {/* Screen */}
          <rect x="110" y="70" width="180" height="110" fill="hsl(220, 20%, 4%)" rx="4" />
          
          {/* Screen content */}
          <g className="screen-content">
            {/* Terminal header */}
            <rect x="115" y="75" width="170" height="20" fill="hsl(220, 15%, 12%)" rx="2" />
            <circle cx="125" cy="85" r="3" fill="hsl(0, 100%, 60%)" />
            <circle cx="135" cy="85" r="3" fill="hsl(45, 100%, 60%)" />
            <circle cx="145" cy="85" r="3" fill="hsl(142, 100%, 50%)" />
            
            {/* Code lines */}
            <g className="code-lines">
              <rect className="code-line" x="120" y="100" width="80" height="4" fill="hsl(142, 100%, 50%)" opacity="0.8" rx="1" />
              <rect className="code-line" x="120" y="110" width="120" height="4" fill="hsl(188, 100%, 50%)" opacity="0.6" rx="1" />
              <rect className="code-line" x="130" y="120" width="60" height="4" fill="hsl(270, 100%, 60%)" opacity="0.7" rx="1" />
              <rect className="code-line" x="130" y="130" width="100" height="4" fill="hsl(142, 100%, 50%)" opacity="0.5" rx="1" />
              <rect className="code-line" x="120" y="140" width="90" height="4" fill="hsl(188, 100%, 50%)" opacity="0.8" rx="1" />
              <rect className="code-line" x="120" y="150" width="70" height="4" fill="hsl(0, 100%, 60%)" opacity="0.6" rx="1" />
              <rect className="code-line" x="130" y="160" width="110" height="4" fill="hsl(142, 100%, 50%)" opacity="0.7" rx="1" />
            </g>
            
            {/* Blinking cursor */}
            <rect x="120" y="170" width="8" height="3" fill="hsl(142, 100%, 50%)" rx="1">
              <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
            </rect>
          </g>
          
          {/* Screen glow */}
          <rect x="110" y="70" width="180" height="110" fill="url(#screenGlow)" rx="4" opacity="0.3" />
        </g>
        
        {/* Hacker silhouette */}
        <g className="hacker-body">
          {/* Chair */}
          <ellipse cx="200" cy="280" rx="40" ry="8" fill="hsl(220, 15%, 12%)" />
          <rect x="185" y="240" width="30" height="45" fill="hsl(220, 15%, 15%)" rx="4" />
          
          {/* Body */}
          <path
            d="M160 200 Q160 180, 180 170 L220 170 Q240 180, 240 200 L240 240 L160 240 Z"
            fill="hsl(220, 20%, 8%)"
          />
          
          {/* Hoodie */}
          <path
            d="M165 190 Q165 175, 180 165 L220 165 Q235 175, 235 190 L235 210 L165 210 Z"
            fill="hsl(220, 15%, 12%)"
          />
          
          {/* Hood */}
          <path
            d="M175 155 Q200 140, 225 155 L225 170 Q200 180, 175 170 Z"
            fill="hsl(220, 15%, 12%)"
          />
          
          {/* Head (in shadow) */}
          <ellipse cx="200" cy="150" rx="25" ry="28" fill="hsl(220, 20%, 6%)" />
          
          {/* Glasses reflection */}
          <g opacity="0.8">
            <rect x="182" y="145" width="15" height="8" fill="hsl(142, 100%, 50%)" opacity="0.3" rx="2">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="203" y="145" width="15" height="8" fill="hsl(188, 100%, 50%)" opacity="0.3" rx="2">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </rect>
          </g>
          
          {/* Arms */}
          <path
            d="M165 190 Q145 200, 140 215 L150 225 Q155 210, 170 205"
            fill="hsl(220, 15%, 12%)"
          />
          <path
            d="M235 190 Q255 200, 260 215 L250 225 Q245 210, 230 205"
            fill="hsl(220, 15%, 12%)"
          />
          
          {/* Hands on keyboard */}
          <g className="hacker-hands">
            <ellipse cx="155" cy="228" rx="12" ry="8" fill="hsl(30, 20%, 25%)" />
            <ellipse cx="245" cy="228" rx="12" ry="8" fill="hsl(30, 20%, 25%)" />
          </g>
        </g>
        
        {/* Keyboard */}
        <rect x="140" y="225" width="120" height="15" fill="hsl(220, 15%, 10%)" rx="3" />
        <g opacity="0.5">
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x={145 + i * 9}
              y="228"
              width="7"
              height="4"
              fill={i % 3 === 0 ? 'hsl(142, 100%, 50%)' : 'hsl(220, 15%, 25%)'}
              rx="1"
            >
              <animate
                attributeName="fill"
                values={i % 2 === 0 ? 'hsl(220, 15%, 25%);hsl(142, 100%, 50%);hsl(220, 15%, 25%)' : 'hsl(142, 100%, 50%);hsl(220, 15%, 25%);hsl(142, 100%, 50%)'}
                dur="0.3s"
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
        
        {/* Coffee cup */}
        <g>
          <rect x="320" y="225" width="20" height="15" fill="hsl(220, 15%, 18%)" rx="2" />
          <path d="M340 228 Q348 232, 340 238" stroke="hsl(220, 15%, 25%)" strokeWidth="2" fill="none" />
          {/* Steam */}
          <path d="M325 220 Q328 215, 325 210" stroke="hsl(220, 10%, 40%)" strokeWidth="1" fill="none" opacity="0.5">
            <animate attributeName="d" values="M325 220 Q328 215, 325 210;M325 220 Q322 215, 325 210;M325 220 Q328 215, 325 210" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M330 218 Q333 212, 330 206" stroke="hsl(220, 10%, 40%)" strokeWidth="1" fill="none" opacity="0.4">
            <animate attributeName="d" values="M330 218 Q333 212, 330 206;M330 218 Q327 212, 330 206;M330 218 Q333 212, 330 206" dur="2.5s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Ambient light from screen */}
        <ellipse cx="200" cy="200" rx="120" ry="80" fill="url(#ambientLight)" opacity="0.15" />
        
        {/* Definitions */}
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(142, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(142, 100%, 50%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ambientLight" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(142, 100%, 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(142, 100%, 50%)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Status text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-primary/60">
        <span className="inline-block animate-pulse">●</span> Active Session
      </div>
    </div>
  );
};
