import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface ReactiveCharacterProps {
  className?: string;
}

export const ReactiveCharacter = ({ className = '' }: ReactiveCharacterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isTyping, setIsTyping] = useState(true);
  const [blink, setBlink] = useState(false);

  // Track mouse position relative to character
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 500);

    return () => clearInterval(typingInterval);
  }, []);

  // Initial animations
  useEffect(() => {
    animate('.character-part', {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      delay: stagger(50),
      ease: 'outExpo',
    });

    animate('.floating-code', {
      translateY: [20, -20],
      opacity: [0, 1, 0],
      duration: 3000,
      delay: stagger(500),
      loop: true,
      ease: 'inOutSine',
    });

    animate('.coffee-steam', {
      translateY: [0, -15],
      opacity: [0.8, 0],
      scale: [1, 1.5],
      duration: 2000,
      delay: stagger(300),
      loop: true,
      ease: 'outSine',
    });
  }, []);

  // Calculate eye position based on mouse
  const eyeOffsetX = (mousePos.x - 0.5) * 6;
  const eyeOffsetY = (mousePos.y - 0.5) * 4;

  // Calculate head tilt
  const headRotation = (mousePos.x - 0.5) * 10;
  const headTiltY = (mousePos.y - 0.5) * 5;

  return (
    <div ref={containerRef} className={`relative w-full h-[500px] ${className}`}>
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px hsl(142 100% 50% / 0.2))' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd5b8" />
            <stop offset="100%" stopColor="#f5c4a8" />
          </linearGradient>
          <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(142 100% 50% / 0.3)" />
            <stop offset="100%" stopColor="hsl(188 100% 50% / 0.1)" />
          </linearGradient>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d2d44" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <ellipse 
          cx="200" 
          cy="250" 
          rx="180" 
          ry="200" 
          fill="url(#screenGlow)" 
          className="character-part"
        />

        {/* Desk */}
        <rect 
          x="50" y="380" 
          width="300" height="20" 
          rx="3"
          fill="#1a1a2e" 
          stroke="hsl(142 100% 50% / 0.3)"
          strokeWidth="1"
          className="character-part"
        />

        {/* Laptop base */}
        <path
          d="M100 380 L120 340 L280 340 L300 380 Z"
          fill="#2d2d44"
          stroke="hsl(188 100% 50% / 0.3)"
          strokeWidth="1"
          className="character-part"
        />

        {/* Laptop screen */}
        <g className="character-part">
          <rect 
            x="110" y="260" 
            width="180" height="80" 
            rx="5"
            fill="#0a0a15"
            stroke="hsl(142 100% 50% / 0.5)"
            strokeWidth="2"
          />
          {/* Screen content - code lines */}
          <g className="code-lines">
            <rect x="120" y="270" width="60" height="4" rx="2" fill="hsl(142 100% 50% / 0.8)" />
            <rect x="120" y="280" width="100" height="4" rx="2" fill="hsl(188 100% 50% / 0.6)" />
            <rect x="130" y="290" width="80" height="4" rx="2" fill="hsl(270 100% 60% / 0.5)" />
            <rect x="130" y="300" width="50" height="4" rx="2" fill="hsl(142 100% 50% / 0.6)" />
            <rect x="120" y="310" width="70" height="4" rx="2" fill="hsl(0 100% 60% / 0.5)" />
            <rect x="120" y="320" width="40" height="4" rx="2" fill="hsl(188 100% 50% / 0.7)" />
            {/* Blinking cursor */}
            <rect 
              x="170" y="320" 
              width="8" height="4" 
              rx="1"
              fill="hsl(142 100% 50%)"
              opacity={isTyping ? 1 : 0}
              className="transition-opacity duration-100"
            />
          </g>
        </g>

        {/* Body/Hoodie */}
        <g 
          className="character-part"
          style={{ 
            transform: `rotate(${headRotation * 0.3}deg)`,
            transformOrigin: '200px 350px',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <ellipse 
            cx="200" cy="360" 
            rx="70" ry="40"
            fill="url(#hoodieGradient)"
          />
          {/* Hoodie details */}
          <path
            d="M160 340 Q200 360 240 340"
            fill="none"
            stroke="hsl(142 100% 50% / 0.3)"
            strokeWidth="1"
          />
        </g>

        {/* Arms */}
        <g className="character-part">
          {/* Left arm */}
          <path
            d="M130 360 Q110 350 120 340"
            fill="none"
            stroke="url(#hoodieGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Right arm */}
          <path
            d="M270 360 Q290 350 280 340"
            fill="none"
            stroke="url(#hoodieGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </g>

        {/* Hands on keyboard */}
        <g className="character-part">
          <ellipse 
            cx="140" cy="345" rx="12" ry="8"
            fill="url(#skinGradient)"
            style={{ 
              transform: isTyping ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.1s ease'
            }}
          />
          <ellipse 
            cx="260" cy="345" rx="12" ry="8"
            fill="url(#skinGradient)"
            style={{ 
              transform: !isTyping ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.1s ease'
            }}
          />
        </g>

        {/* Head group - follows mouse */}
        <g 
          style={{ 
            transform: `rotate(${headRotation}deg) translateY(${headTiltY}px)`,
            transformOrigin: '200px 200px',
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Neck */}
          <rect 
            x="185" y="235" 
            width="30" height="25"
            fill="url(#skinGradient)"
            className="character-part"
          />

          {/* Head */}
          <ellipse 
            cx="200" cy="180" 
            rx="55" ry="65"
            fill="url(#skinGradient)"
            className="character-part"
          />

          {/* Hair */}
          <path
            d="M145 160 Q150 100 200 95 Q250 100 255 160 Q250 130 200 125 Q150 130 145 160"
            fill="url(#hairGradient)"
            className="character-part"
          />
          
          {/* Side hair */}
          <ellipse cx="150" cy="170" rx="10" ry="25" fill="url(#hairGradient)" className="character-part" />
          <ellipse cx="250" cy="170" rx="10" ry="25" fill="url(#hairGradient)" className="character-part" />

          {/* Ears */}
          <ellipse 
            cx="145" cy="180" rx="8" ry="12"
            fill="url(#skinGradient)"
            className="character-part"
          />
          <ellipse 
            cx="255" cy="180" rx="8" ry="12"
            fill="url(#skinGradient)"
            className="character-part"
          />

          {/* Headphones */}
          <g className="character-part" filter="url(#softGlow)">
            <path
              d="M145 155 Q140 120 200 110 Q260 120 255 155"
              fill="none"
              stroke="#2d2d44"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <ellipse cx="145" cy="175" rx="12" ry="18" fill="#1a1a2e" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="2" />
            <ellipse cx="255" cy="175" rx="12" ry="18" fill="#1a1a2e" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="2" />
            {/* LED on headphones */}
            <circle cx="145" cy="175" r="3" fill="hsl(142 100% 50%)" filter="url(#glow)" />
            <circle cx="255" cy="175" r="3" fill="hsl(142 100% 50%)" filter="url(#glow)" />
          </g>

          {/* Eyes */}
          <g className="character-part">
            {/* Left eye socket */}
            <ellipse cx="175" cy="180" rx="18" ry="12" fill="#fff" />
            {/* Right eye socket */}
            <ellipse cx="225" cy="180" rx="18" ry="12" fill="#fff" />
            
            {/* Left pupil - follows mouse */}
            <circle 
              cx={175 + eyeOffsetX} 
              cy={180 + eyeOffsetY} 
              r={blink ? 1 : 8}
              fill="#1a1a2e"
              style={{ transition: 'r 0.1s ease' }}
            />
            {/* Right pupil - follows mouse */}
            <circle 
              cx={225 + eyeOffsetX} 
              cy={180 + eyeOffsetY} 
              r={blink ? 1 : 8}
              fill="#1a1a2e"
              style={{ transition: 'r 0.1s ease' }}
            />
            
            {/* Eye glint */}
            <circle cx={173 + eyeOffsetX * 0.5} cy={177 + eyeOffsetY * 0.5} r="3" fill="#fff" opacity="0.8" />
            <circle cx={223 + eyeOffsetX * 0.5} cy={177 + eyeOffsetY * 0.5} r="3" fill="#fff" opacity="0.8" />
            
            {/* Screen reflection in eyes */}
            <circle cx={177 + eyeOffsetX} cy={183 + eyeOffsetY} r="2" fill="hsl(142 100% 50% / 0.5)" />
            <circle cx={227 + eyeOffsetX} cy={183 + eyeOffsetY} r="2" fill="hsl(142 100% 50% / 0.5)" />
          </g>

          {/* Eyebrows */}
          <g className="character-part">
            <path
              d={`M158 ${165 + (mousePos.y - 0.5) * 3} Q175 ${160 + (mousePos.y - 0.5) * 5} 192 ${165 + (mousePos.y - 0.5) * 3}`}
              fill="none"
              stroke="url(#hairGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M208 ${165 + (mousePos.y - 0.5) * 3} Q225 ${160 + (mousePos.y - 0.5) * 5} 242 ${165 + (mousePos.y - 0.5) * 3}`}
              fill="none"
              stroke="url(#hairGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Nose */}
          <path
            d="M200 185 L195 205 Q200 210 205 205 L200 185"
            fill="none"
            stroke="#e8b090"
            strokeWidth="2"
            className="character-part"
          />

          {/* Mouth */}
          <path
            d={`M185 225 Q200 ${isTyping ? 228 : 232} 215 225`}
            fill="none"
            stroke="#c89080"
            strokeWidth="3"
            strokeLinecap="round"
            className="character-part"
          />

          {/* Glasses */}
          <g className="character-part" filter="url(#softGlow)">
            <rect x="155" y="168" width="40" height="28" rx="5" fill="none" stroke="hsl(188 100% 50% / 0.6)" strokeWidth="2" />
            <rect x="205" y="168" width="40" height="28" rx="5" fill="none" stroke="hsl(188 100% 50% / 0.6)" strokeWidth="2" />
            <line x1="195" y1="180" x2="205" y2="180" stroke="hsl(188 100% 50% / 0.6)" strokeWidth="2" />
            {/* Glass reflection */}
            <rect x="158" y="171" width="15" height="4" rx="2" fill="hsl(188 100% 50% / 0.2)" />
            <rect x="208" y="171" width="15" height="4" rx="2" fill="hsl(188 100% 50% / 0.2)" />
          </g>
        </g>

        {/* Coffee mug */}
        <g className="character-part">
          <rect x="320" y="355" width="25" height="30" rx="3" fill="#2d2d44" stroke="hsl(142 100% 50% / 0.3)" strokeWidth="1" />
          <path d="M345 360 Q360 365 345 380" fill="none" stroke="#2d2d44" strokeWidth="4" />
          {/* Coffee */}
          <ellipse cx="332" cy="360" rx="10" ry="3" fill="#4a3728" />
          {/* Steam */}
          <path className="coffee-steam" d="M325 350 Q328 340 325 330" fill="none" stroke="hsl(0 0% 80% / 0.5)" strokeWidth="2" strokeLinecap="round" />
          <path className="coffee-steam" d="M332 350 Q335 338 332 325" fill="none" stroke="hsl(0 0% 80% / 0.4)" strokeWidth="2" strokeLinecap="round" />
          <path className="coffee-steam" d="M339 350 Q342 342 339 332" fill="none" stroke="hsl(0 0% 80% / 0.3)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating code snippets */}
        <g filter="url(#glow)">
          <text className="floating-code" x="60" y="200" fill="hsl(142 100% 50%)" fontSize="12" fontFamily="monospace">{'<code>'}</text>
          <text className="floating-code" x="300" y="150" fill="hsl(188 100% 50%)" fontSize="10" fontFamily="monospace">const x = 42;</text>
          <text className="floating-code" x="50" y="300" fill="hsl(270 100% 60%)" fontSize="11" fontFamily="monospace">{'{ }'}</text>
          <text className="floating-code" x="320" y="250" fill="hsl(142 100% 50%)" fontSize="10" fontFamily="monospace">=&gt;</text>
          <text className="floating-code" x="70" y="130" fill="hsl(0 100% 60%)" fontSize="9" fontFamily="monospace">npm run</text>
          <text className="floating-code" x="290" y="300" fill="hsl(188 100% 50%)" fontSize="11" fontFamily="monospace">async</text>
        </g>

        {/* Binary rain effect */}
        <g opacity="0.3">
          {[...Array(8)].map((_, i) => (
            <text
              key={i}
              className="floating-code"
              x={50 + i * 45}
              y="450"
              fill="hsl(142 100% 50%)"
              fontSize="8"
              fontFamily="monospace"
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </text>
          ))}
        </g>
      </svg>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-primary/30">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-xs text-primary">coding...</span>
      </div>
    </div>
  );
};
