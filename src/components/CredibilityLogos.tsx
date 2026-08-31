import React from 'react';

// Exact AAU USA Shield Logo
export const AAULogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shield Base */}
    <path
      d="M50 115 C20 95 8 65 8 20 C35 20 50 10 50 10 C50 10 65 20 92 20 C92 65 80 95 50 115 Z"
      fill="#FFFFFF"
      stroke="#0A2540"
      strokeWidth="3"
    />
    
    {/* Clip path for stripes & sash inside shield */}
    <g clipPath="url(#aau-shield-clip)">
      {/* Red & White Stripes */}
      <rect x="0" y="0" width="100" height="120" fill="#FFFFFF" />
      <rect x="18" y="0" width="9" height="120" fill="#D62828" />
      <rect x="36" y="0" width="9" height="120" fill="#D62828" />
      <rect x="55" y="0" width="9" height="120" fill="#D62828" />
      <rect x="73" y="0" width="9" height="120" fill="#D62828" />

      {/* Blue Diagonal Sash */}
      <polygon points="0,58 100,24 100,44 0,78" fill="#133863" />
      <text
        x="50"
        y="56"
        fill="#FFFFFF"
        fontSize="17"
        fontWeight="900"
        fontFamily="'Arial Black', sans-serif"
        textAnchor="middle"
        transform="rotate(-18.5 50 56)"
        letterSpacing="2"
      >
        USA
      </text>

      {/* Top AAU Banner */}
      <rect x="22" y="16" width="56" height="22" rx="3" fill="#FFFFFF" stroke="#133863" strokeWidth="2" />
      <text
        x="50"
        y="32"
        fill="#D62828"
        fontSize="14"
        fontWeight="900"
        fontFamily="'Arial Black', sans-serif"
        textAnchor="middle"
        letterSpacing="1"
      >
        AAU
      </text>
    </g>

    <defs>
      <clipPath id="aau-shield-clip">
        <path d="M50 113 C21 93 10 64 10 21 C36 21 50 12 50 12 C50 12 64 21 90 21 C90 64 79 93 50 113 Z" />
      </clipPath>
    </defs>
  </svg>
);

// Exact FIVB Logo
export const FIVBLogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* FIVB Gradient */}
    <defs>
      <linearGradient id="fivb-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="50%" stopColor="#1E5EA8" />
        <stop offset="100%" stopColor="#0B3C78" />
      </linearGradient>
    </defs>

    {/* Letter F */}
    <path
      d="M 25 15 L 68 15 L 68 28 L 42 28 L 42 42 L 64 42 L 64 54 L 42 54 L 42 75 L 25 75 Z"
      fill="url(#fivb-grad)"
    />

    {/* Letter I */}
    <path
      d="M 78 15 L 95 15 L 95 75 L 78 75 Z"
      fill="url(#fivb-grad)"
    />

    {/* Letter V */}
    <path
      d="M 103 15 L 121 15 L 133 55 L 145 15 L 163 15 L 142 75 L 124 75 Z"
      fill="url(#fivb-grad)"
    />

    {/* Letter B */}
    <path
      d="M 172 15 L 202 15 C 213 15 220 20 220 29 C 220 36 215 41 207 43 C 217 46 222 52 222 61 C 222 71 213 75 201 75 L 172 75 Z M 189 27 L 189 39 L 199 39 C 204 39 206 36 206 33 C 206 30 204 27 199 27 Z M 189 50 L 189 63 L 201 63 C 206 63 208 60 208 56.5 C 208 53 206 50 201 50 Z"
      fill="url(#fivb-grad)"
    />

    {/* Curved Blue Arc */}
    <path
      d="M 15 90 Q 120 70 225 90"
      stroke="#1E5EA8"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Subtitle */}
    <text
      x="120"
      y="108"
      fill="#133863"
      fontSize="8.5"
      fontWeight="700"
      fontFamily="sans-serif"
      textAnchor="middle"
      letterSpacing="1.2"
    >
      FÉDÉRATION INTERNATIONALE
    </text>
    <text
      x="120"
      y="122"
      fill="#133863"
      fontSize="8.5"
      fontWeight="700"
      fontFamily="sans-serif"
      textAnchor="middle"
      letterSpacing="1.2"
    >
      DE VOLLEYBALL
    </text>
  </svg>
);

// Exact NFHS Logo
export const NFHSLogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Blue/Navy Badge */}
    <rect x="10" y="8" width="140" height="74" rx="14" fill="#0C2340" />
    <text
      x="80"
      y="54"
      fill="#FFFFFF"
      fontSize="36"
      fontWeight="900"
      fontStyle="italic"
      fontFamily="'Arial Black', 'Impact', sans-serif"
      textAnchor="middle"
      letterSpacing="3"
    >
      NFHS
    </text>
    {/* Red bottom accent bar */}
    <rect x="24" y="64" width="112" height="5" rx="2.5" fill="#D62828" />
  </svg>
);

// Exact USA Volleyball Logo (Flag Volleyball Ball + USA Volleyball wordmark)
export const USAVLogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 380 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* ── Left: Flag Volleyball Ball ── */}
    <g transform="translate(10, 10)">
      {/* Circle Clip */}
      <defs>
        <clipPath id="usav-ball-clip">
          <circle cx="55" cy="55" r="50" />
        </clipPath>
      </defs>

      {/* Ball boundary */}
      <circle cx="55" cy="55" r="50" fill="#FFFFFF" />

      <g clipPath="url(#usav-ball-clip)">
        {/* Navy Star Field (Top-Left / Left Panel) */}
        <path d="M 5,55 C 5,27 27,5 55,5 C 40,30 35,55 35,75 C 20,80 10,70 5,55 Z" fill="#0C2340" />
        <path d="M 5,55 C 5,27 27,5 55,5 C 55,25 45,60 15,95 C 8,85 5,70 5,55 Z" fill="#0C2340" />

        {/* Stars */}
        <g fill="#FFFFFF" transform="scale(0.8) translate(8, 8)">
          <polygon points="25,20 27,26 33,26 28,30 30,36 25,32 20,36 22,30 17,26 23,26" />
          <polygon points="40,16 41.5,21 46.5,21 42.5,24 44,29 40,26 36,29 37.5,24 33.5,21 38.5,21" />
          <polygon points="18,36 19.5,41 24.5,41 20.5,44 22,49 18,46 14,49 15.5,44 11.5,41 16.5,41" />
          <polygon points="34,34 35.5,39 40.5,39 36.5,42 38,47 34,44 30,47 31.5,42 27.5,39 32.5,39" />
          <polygon points="48,32 49.5,37 54.5,37 50.5,40 52,45 48,42 44,45 45.5,40 41.5,37 46.5,37" />
          <polygon points="26,52 27.5,57 32.5,57 28.5,60 30,65 26,62 22,65 23.5,60 19.5,57 24.5,57" />
          <polygon points="40,50 41.5,55 46.5,55 42.5,58 44,63 40,60 36,63 37.5,58 33.5,55 38.5,55" />
          <polygon points="16,68 17.5,73 22.5,73 18.5,76 20,81 16,78 12,81 13.5,76 9.5,73 14.5,73" />
          <polygon points="30,68 31.5,73 36.5,73 32.5,76 34,81 30,78 26,81 27.5,76 23.5,73 28.5,73" />
        </g>

        {/* Top-Right Red Curved Panel */}
        <path d="M 55,5 C 75,5 95,20 105,45 C 80,40 60,25 55,5 Z" fill="#BA0C2F" />
        
        {/* Right Red Curved Stripes */}
        <path d="M 52,22 C 68,36 88,48 105,45 C 105,60 98,75 88,88 C 72,70 56,50 46,30 C 48,27 50,24 52,22 Z" fill="#BA0C2F" />
        
        {/* Bottom Red Curved Swoop */}
        <path d="M 18,92 C 40,65 65,70 88,88 C 75,100 55,108 35,102 C 28,99 22,96 18,92 Z" fill="#BA0C2F" />
        <path d="M 35,102 C 55,108 75,102 95,85 C 85,102 65,108 40,108 C 30,108 20,106 12,100 C 20,103 28,103 35,102 Z" fill="#BA0C2F" />

        {/* Crisp Volleyball Seams */}
        <path d="M 55,5 C 75,5 95,20 105,45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <path d="M 52,22 C 68,36 88,48 105,45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <path d="M 46,30 C 56,50 72,70 88,88" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <path d="M 15,95 C 40,65 65,70 88,88" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      </g>
    </g>

    {/* ── Right: USA Volleyball Wordmark ── */}
    {/* USA in Bold Italic Crimson Red */}
    <text
      x="135"
      y="78"
      fill="#BA0C2F"
      fontSize="52"
      fontWeight="900"
      fontStyle="italic"
      fontFamily="'Arial Black', 'Trebuchet MS', sans-serif"
      letterSpacing="-1"
    >
      USA
    </text>

    {/* Volleyball in Bold Italic Navy Blue */}
    <text
      x="250"
      y="78"
      fill="#0C2340"
      fontSize="50"
      fontWeight="800"
      fontStyle="italic"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      letterSpacing="-0.5"
    >
      Volleyball
    </text>
  </svg>
);

