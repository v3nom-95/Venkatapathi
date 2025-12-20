import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

interface NetworkSecurityVizProps {
  type: 'red' | 'blue';
}

export const NetworkSecurityViz = ({ type }: NetworkSecurityVizProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (type === 'red') {
      // Red Team - Attack visualization
      animate('.attack-pulse', {
        scale: [1, 2, 1],
        opacity: [0.8, 0, 0.8],
        duration: 2000,
        delay: (el, i) => i * 400,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.attack-line', {
        strokeDashoffset: [50, 0],
        opacity: [0, 1, 0],
        duration: 1500,
        delay: (el, i) => i * 300,
        loop: true,
        ease: 'linear',
      });

      animate('.target-node', {
        scale: [1, 1.2, 1],
        duration: 800,
        delay: (el, i) => i * 200,
        loop: true,
        ease: 'inOutBack',
      });

      animate('.exploit-arrow', {
        translateX: [0, 40],
        opacity: [1, 0],
        duration: 1000,
        delay: (el, i) => i * 500,
        loop: true,
        ease: 'inExpo',
      });
    } else {
      // Blue Team - Defense visualization
      animate('.shield-pulse', {
        scale: [1, 1.3, 1],
        opacity: [0.6, 0.2, 0.6],
        duration: 2500,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.scan-line', {
        rotate: [0, 360],
        duration: 4000,
        loop: true,
        ease: 'linear',
      });

      animate('.firewall-bar', {
        scaleY: () => [0.5, utils.random(0.7, 1), 0.5],
        duration: 800,
        delay: (el, i) => i * 100,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.alert-dot', {
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
        duration: 1500,
        delay: (el, i) => i * 600,
        loop: true,
        ease: 'inOutSine',
      });
    }
  }, [type]);

  if (type === 'red') {
    return (
      <div ref={containerRef} className="relative w-full h-[300px]">
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 100% 60%)" />
              <stop offset="100%" stopColor="hsl(0 100% 40%)" />
            </linearGradient>
            <filter id="redGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Attacker */}
          <g filter="url(#redGlow)">
            <circle cx="30" cy="100" r="15" fill="url(#redGradient)" />
            <text x="30" y="105" fill="white" fontSize="12" textAnchor="middle" fontFamily="monospace">☠</text>
            <circle className="attack-pulse" cx="30" cy="100" r="15" fill="none" stroke="hsl(0 100% 60%)" strokeWidth="2" />
          </g>

          {/* Attack lines */}
          <line className="attack-line" x1="50" y1="100" x2="100" y2="60" stroke="hsl(0 100% 60%)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="attack-line" x1="50" y1="100" x2="100" y2="100" stroke="hsl(0 100% 60%)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="attack-line" x1="50" y1="100" x2="100" y2="140" stroke="hsl(0 100% 60%)" strokeWidth="2" strokeDasharray="5 5" />

          {/* Exploit arrows */}
          <polygon className="exploit-arrow" points="70,98 80,100 70,102" fill="hsl(0 100% 60%)" />
          <polygon className="exploit-arrow" points="65,58 75,60 65,62" fill="hsl(0 100% 60%)" />
          <polygon className="exploit-arrow" points="65,138 75,140 65,142" fill="hsl(0 100% 60%)" />

          {/* Target nodes */}
          <rect className="target-node" x="100" y="50" width="30" height="20" rx="3" fill="hsl(220 20% 20%)" stroke="hsl(0 100% 60% / 0.5)" strokeWidth="1" />
          <rect className="target-node" x="100" y="90" width="30" height="20" rx="3" fill="hsl(220 20% 20%)" stroke="hsl(0 100% 60% / 0.5)" strokeWidth="1" />
          <rect className="target-node" x="100" y="130" width="30" height="20" rx="3" fill="hsl(220 20% 20%)" stroke="hsl(0 100% 60% / 0.5)" strokeWidth="1" />

          {/* Network */}
          <line x1="130" y1="60" x2="170" y2="100" stroke="hsl(220 15% 30%)" strokeWidth="1" />
          <line x1="130" y1="100" x2="170" y2="100" stroke="hsl(220 15% 30%)" strokeWidth="1" />
          <line x1="130" y1="140" x2="170" y2="100" stroke="hsl(220 15% 30%)" strokeWidth="1" />

          {/* Server */}
          <rect x="170" y="80" width="40" height="40" rx="5" fill="hsl(220 20% 15%)" stroke="hsl(0 100% 60% / 0.3)" strokeWidth="2" />
          <text x="190" y="105" fill="hsl(0 100% 60%)" fontSize="10" textAnchor="middle" fontFamily="monospace">SRV</text>

          {/* Data breach effect */}
          <line className="attack-line" x1="210" y1="100" x2="280" y2="100" stroke="hsl(0 100% 60%)" strokeWidth="2" strokeDasharray="8 4" />
          <text x="280" y="95" fill="hsl(0 100% 60%)" fontSize="8" fontFamily="monospace">DATA</text>
          <text x="280" y="110" fill="hsl(0 100% 60%)" fontSize="8" fontFamily="monospace">EXFIL</text>

          {/* Labels */}
          <text x="30" y="135" fill="hsl(0 100% 60%)" fontSize="8" textAnchor="middle" fontFamily="monospace">Attacker</text>
          <text x="115" y="175" fill="hsl(220 10% 55%)" fontSize="7" textAnchor="middle" fontFamily="monospace">Vulnerable Nodes</text>
        </svg>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[300px]">
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(188 100% 50%)" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" />
          </linearGradient>
          <filter id="blueGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central shield */}
        <g filter="url(#blueGlow)">
          <polygon points="150,40 185,60 185,100 150,120 115,100 115,60" fill="url(#blueGradient)" opacity="0.8" />
          <polygon className="shield-pulse" points="150,40 185,60 185,100 150,120 115,100 115,60" fill="none" stroke="hsl(188 100% 50%)" strokeWidth="2" />
          <text x="150" y="85" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">🛡</text>
        </g>

        {/* Scanning radar */}
        <g className="scan-line" style={{ transformOrigin: '150px 80px' }}>
          <line x1="150" y1="80" x2="150" y2="30" stroke="hsl(188 100% 50% / 0.5)" strokeWidth="2" />
          <path d="M150 80 L140 30 L160 30 Z" fill="hsl(188 100% 50% / 0.1)" />
        </g>

        {/* Firewall bars */}
        <g transform="translate(30, 150)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <rect
              key={i}
              className="firewall-bar"
              x={i * 25}
              y={0}
              width="18"
              height="30"
              fill="url(#blueGradient)"
              opacity="0.6"
              style={{ transformOrigin: `${i * 25 + 9}px 30px` }}
            />
          ))}
          <text x="112" y="45" fill="hsl(188 100% 50%)" fontSize="8" textAnchor="middle" fontFamily="monospace">FIREWALL ACTIVITY</text>
        </g>

        {/* Threat detection alerts */}
        <circle className="alert-dot" cx="60" cy="60" r="5" fill="hsl(142 100% 50%)" />
        <text x="60" y="75" fill="hsl(142 100% 50%)" fontSize="6" textAnchor="middle" fontFamily="monospace">SAFE</text>

        <circle className="alert-dot" cx="240" cy="60" r="5" fill="hsl(45 100% 50%)" />
        <text x="240" y="75" fill="hsl(45 100% 50%)" fontSize="6" textAnchor="middle" fontFamily="monospace">WARN</text>

        <circle className="alert-dot" cx="60" cy="120" r="5" fill="hsl(188 100% 50%)" />
        <text x="60" y="135" fill="hsl(188 100% 50%)" fontSize="6" textAnchor="middle" fontFamily="monospace">SCAN</text>

        <circle className="alert-dot" cx="240" cy="120" r="5" fill="hsl(142 100% 50%)" />
        <text x="240" y="135" fill="hsl(142 100% 50%)" fontSize="6" textAnchor="middle" fontFamily="monospace">OK</text>

        {/* Status text */}
        <text x="150" y="15" fill="hsl(188 100% 50%)" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">DEFENSE ACTIVE</text>
      </svg>
    </div>
  );
};
