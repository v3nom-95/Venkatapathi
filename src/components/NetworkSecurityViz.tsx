import { useEffect, useRef } from 'react';
import { animate, utils, stagger } from 'animejs';

interface NetworkSecurityVizProps {
  type: 'red' | 'blue' | 'ai';
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
    } else if (type === 'ai') {
      // AI & ML - Advanced Neural Network animation
      animate('.nn-node', {
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
        duration: 2000,
        delay: stagger(100, { grid: [3, 3], from: 'center' }),
        loop: true,
        ease: 'easeInOutSine',
      });

      animate('.nn-path', {
        strokeDashoffset: [20, 0],
        opacity: [0.2, 0.5, 0.2],
        duration: 3000,
        loop: true,
        ease: 'linear',
      });

      animate('.brain-core', {
        scale: [1, 1.1, 1],
        filter: ['blur(0px) brightness(1)', 'blur(2px) brightness(1.2)', 'blur(0px) brightness(1)'],
        duration: 4000,
        loop: true,
        ease: 'easeInOutQuad',
      });

      animate('.brain-ring', {
        rotate: 360,
        duration: 10000,
        loop: true,
        ease: 'linear',
      });

      animate('.data-float', {
        translateY: () => utils.random(-20, 20),
        translateX: () => utils.random(-20, 20),
        opacity: [0.1, 0.4, 0.1],
        duration: () => utils.random(3000, 5000),
        delay: stagger(200),
        loop: true,
        direction: 'alternate',
        ease: 'easeInOutQuad',
      });

      animate('.firing-dot', {
        opacity: [0, 1, 0],
        duration: 500,
        loop: true,
        ease: 'linear',
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
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
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

  if (type === 'ai') {
    return (
      <div ref={containerRef} className="relative w-full h-[300px] bg-black/5 rounded-2xl overflow-hidden border border-primary/10">
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(188 100% 50%)" />
              <stop offset="50%" stopColor="hsl(210 100% 50%)" />
              <stop offset="100%" stopColor="hsl(270 100% 60%)" />
            </linearGradient>
            <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background data particles */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={`p-${i}`}
              className="data-float"
              cx={utils.random(0, 300)}
              cy={utils.random(0, 200)}
              r={utils.random(0.5, 1.5)}
              fill="hsl(188 100% 50% / 0.2)"
            />
          ))}

          {/* Neural Network Connections (Synapses) */}
          <g opacity="0.4">
            {/* Input to Hidden 1 */}
            <path className="nn-path" d="M40 70 L110 50" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M40 70 L110 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M40 130 L110 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M40 130 L110 150" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />

            {/* Hidden 1 to Hidden 2 */}
            <path className="nn-path" d="M110 50 L180 50" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 50 L180 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 100 L180 50" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 100 L180 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 100 L180 150" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 150 L180 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M110 150 L180 150" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />

            {/* Hidden 2 to Output */}
            <path className="nn-path" d="M180 50 L250 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M180 100 L250 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
            <path className="nn-path" d="M180 150 L250 100" stroke="url(#aiGradient)" strokeWidth="0.5" fill="none" />
          </g>

          {/* Active Synapse Firings */}
          <circle className="firing-dot" r="1.5" fill="white" filter="url(#aiGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M40 70 L110 100 L180 100 L250 100" />
          </circle>
          <circle className="firing-dot" r="1.5" fill="white" filter="url(#aiGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M40 130 L110 100 L180 50 L250 100" />
          </circle>

          {/* Layer Labels */}
          <text x="40" y="170" fill="hsl(188 100% 50% / 0.5)" fontSize="6" textAnchor="middle" fontFamily="monospace">INPUT</text>
          <text x="145" y="185" fill="hsl(210 100% 50% / 0.5)" fontSize="6" textAnchor="middle" fontFamily="monospace">HIDDEN LAYERS</text>
          <text x="250" y="145" fill="hsl(270 100% 60% / 0.5)" fontSize="6" textAnchor="middle" fontFamily="monospace">OUTPUT</text>

          {/* Nodes */}
          {/* Input Layer */}
          <circle className="nn-node input-node" cx="40" cy="70" r="4" fill="hsl(188 100% 50%)" filter="url(#aiGlow)" />
          <circle className="nn-node input-node" cx="40" cy="130" r="4" fill="hsl(188 100% 50%)" filter="url(#aiGlow)" />

          {/* Hidden Layer 1 */}
          <circle className="nn-node hidden-node" cx="110" cy="50" r="5" fill="hsl(210 100% 50%)" />
          <circle className="nn-node hidden-node" cx="110" cy="100" r="5" fill="hsl(210 100% 50%)" />
          <circle className="nn-node hidden-node" cx="110" cy="150" r="5" fill="hsl(210 100% 50%)" />

          {/* Hidden Layer 2 */}
          <circle className="nn-node hidden-node" cx="180" cy="50" r="5" fill="hsl(210 100% 50%)" />
          <circle className="nn-node hidden-node" cx="180" cy="100" r="5" fill="hsl(210 100% 50%)" />
          <circle className="nn-node hidden-node" cx="180" cy="150" r="5" fill="hsl(210 100% 50%)" />

          {/* Output Layer (Brain) */}
          <g className="brain-container" filter="url(#aiGlow)">
            <circle className="brain-core" cx="250" cy="100" r="18" fill="url(#aiGradient)" opacity="0.8" />
            <text x="250" y="106" fill="white" fontSize="16" textAnchor="middle" fontFamily="monospace" className="brain-icon">🧠</text>
            <circle className="brain-ring" cx="250" cy="100" r="22" fill="none" stroke="url(#aiGradient)" strokeWidth="1" strokeDasharray="5 3" />
          </g>

          <text x="150" y="25" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            NEURAL ENGINE ACTIVE
          </text>
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
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
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
