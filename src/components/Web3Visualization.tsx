import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

export const Web3Visualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate blockchain nodes
    animate('.blockchain-node', {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.5, 1, 0.5],
      duration: 2000,
      delay: (el, i) => i * 300,
      loop: true,
      ease: 'inOutSine',
    });

    // Animate connection lines
    animate('.connection-line', {
      strokeDashoffset: [100, 0],
      opacity: [0.2, 0.8, 0.2],
      duration: 3000,
      delay: (el, i) => i * 200,
      loop: true,
      ease: 'linear',
    });

    // Animate data packets
    animate('.data-packet', {
      translateX: (el, i) => {
        const paths = [[0, 100], [0, -80], [0, 60]];
        return paths[i % paths.length];
      },
      translateY: (el, i) => {
        const paths = [[0, -50], [0, 70], [0, -40]];
        return paths[i % paths.length];
      },
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      duration: 2500,
      delay: (el, i) => i * 500,
      loop: true,
      ease: 'inOutQuad',
    });

    // Animate central hub
    animate('.central-hub', {
      rotate: [0, 360],
      duration: 20000,
      loop: true,
      ease: 'linear',
    });

    // Animate hex rings
    animate('.hex-ring', {
      rotate: (el, i) => [0, i % 2 === 0 ? 360 : -360],
      duration: (el, i) => 15000 + i * 5000,
      loop: true,
      ease: 'linear',
    });

    // Pulse effect on smart contract
    animate('.smart-contract', {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 0 0 hsl(270 100% 60% / 0)',
        '0 0 20px 5px hsl(270 100% 60% / 0.5)',
        '0 0 0 0 hsl(270 100% 60% / 0)',
      ],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });
  }, []);

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px]"
        style={{ filter: 'drop-shadow(0 0 20px hsl(270 100% 60% / 0.3))' }}
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 100% 60%)" />
            <stop offset="100%" stopColor="hsl(300 100% 50%)" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(188 100% 50%)" />
            <stop offset="100%" stopColor="hsl(142 100% 50%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background hex pattern */}
        <g className="hex-ring" style={{ transformOrigin: '200px 200px' }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={`hex-${i}`}
              d="M200 60 L260 95 L260 165 L200 200 L140 165 L140 95 Z"
              fill="none"
              stroke="hsl(270 100% 60% / 0.2)"
              strokeWidth="1"
              transform={`rotate(${angle} 200 200)`}
            />
          ))}
        </g>

        {/* Connection lines */}
        <g filter="url(#glow)">
          <line className="connection-line" x1="200" y1="200" x2="100" y2="100" stroke="url(#purpleGradient)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="connection-line" x1="200" y1="200" x2="300" y2="100" stroke="url(#purpleGradient)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="connection-line" x1="200" y1="200" x2="100" y2="300" stroke="url(#cyanGradient)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="connection-line" x1="200" y1="200" x2="300" y2="300" stroke="url(#cyanGradient)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="connection-line" x1="200" y1="200" x2="50" y2="200" stroke="url(#purpleGradient)" strokeWidth="2" strokeDasharray="5 5" />
          <line className="connection-line" x1="200" y1="200" x2="350" y2="200" stroke="url(#cyanGradient)" strokeWidth="2" strokeDasharray="5 5" />
        </g>

        {/* Blockchain nodes */}
        <g filter="url(#glow)">
          <rect className="blockchain-node" x="80" y="80" width="40" height="40" rx="8" fill="url(#purpleGradient)" opacity="0.8" />
          <rect className="blockchain-node" x="280" y="80" width="40" height="40" rx="8" fill="url(#purpleGradient)" opacity="0.8" />
          <rect className="blockchain-node" x="80" y="280" width="40" height="40" rx="8" fill="url(#cyanGradient)" opacity="0.8" />
          <rect className="blockchain-node" x="280" y="280" width="40" height="40" rx="8" fill="url(#cyanGradient)" opacity="0.8" />
          <rect className="blockchain-node" x="30" y="180" width="40" height="40" rx="8" fill="url(#purpleGradient)" opacity="0.8" />
          <rect className="blockchain-node" x="330" y="180" width="40" height="40" rx="8" fill="url(#cyanGradient)" opacity="0.8" />
        </g>

        {/* Block labels */}
        <text x="100" y="105" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">Block</text>
        <text x="300" y="105" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">Block</text>
        <text x="100" y="305" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">Node</text>
        <text x="300" y="305" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">Node</text>

        {/* Data packets */}
        <circle className="data-packet" cx="150" cy="150" r="5" fill="hsl(270 100% 60%)" />
        <circle className="data-packet" cx="250" cy="150" r="5" fill="hsl(188 100% 50%)" />
        <circle className="data-packet" cx="200" cy="280" r="5" fill="hsl(142 100% 50%)" />

        {/* Central hub (Smart Contract) */}
        <g className="central-hub" style={{ transformOrigin: '200px 200px' }}>
          <polygon
            className="smart-contract"
            points="200,160 240,180 240,220 200,240 160,220 160,180"
            fill="url(#purpleGradient)"
            stroke="white"
            strokeWidth="2"
            filter="url(#glow)"
          />
        </g>
        <text x="200" y="205" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          ETH
        </text>

        {/* Floating ETH symbols */}
        <text className="blockchain-node" x="60" y="150" fill="hsl(270 100% 60%)" fontSize="14" fontFamily="monospace">Ξ</text>
        <text className="blockchain-node" x="340" y="150" fill="hsl(188 100% 50%)" fontSize="14" fontFamily="monospace">Ξ</text>
        <text className="blockchain-node" x="200" y="80" fill="hsl(142 100% 50%)" fontSize="14" fontFamily="monospace" textAnchor="middle">Ξ</text>
        <text className="blockchain-node" x="200" y="340" fill="hsl(270 100% 60%)" fontSize="14" fontFamily="monospace" textAnchor="middle">Ξ</text>
      </svg>
    </div>
  );
};
