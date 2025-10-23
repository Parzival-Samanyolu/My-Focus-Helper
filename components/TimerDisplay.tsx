import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  totalDuration: number;
  isActive: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalDuration, isActive }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // progress is 1 when full (timeLeft === totalDuration), 0 when empty (timeLeft === 0)
  const progress = totalDuration > 0 ? timeLeft / totalDuration : 0;
  
  const svgWidth = 300;
  const svgHeight = 300;

  // These values define the "liquid" area inside the cup
  const liquidMaxHeight = 105;
  const liquidYStart = 100;
  
  const liquidHeight = liquidMaxHeight * progress;
  const liquidY = liquidYStart + (liquidMaxHeight - liquidHeight);

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
      <svg className="absolute inset-0" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <defs>
            <radialGradient id="cupBodyGradient" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#FFFBF2" />
                <stop offset="100%" stopColor="#EADFCC" />
            </radialGradient>
            <radialGradient id="saucerGradient" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0%" stopColor="#F5EFE6" />
                <stop offset="100%" stopColor="#D6C6B3" />
            </radialGradient>
            <radialGradient id="coffeeSurfaceGradient">
                <stop offset="0%" stopColor="#6B4F43" />
                <stop offset="100%" stopColor="#4A342A" />
            </radialGradient>
            <linearGradient id="rimHighlightGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="5" stdDeviation="5" floodColor="#1c1411" floodOpacity="0.3"/>
            </filter>
             <clipPath id="cup-liquid-mask">
                <path d="M 78 100 C 78 100, 150 80, 222 100 V 205 C 222 205, 150 225, 78 205 Z" />
            </clipPath>
        </defs>

        {/* Saucer */}
        <g filter="url(#shadow)">
            <ellipse cx="150" cy="235" rx="80" ry="15" fill="url(#saucerGradient)" />
            <ellipse cx="150" cy="233" rx="35" ry="7" className="fill-black/10" />
        </g>
        
        {/* Cup body */}
        <path 
            d="M70 90 C 70 90, 150 70, 230 90 V 210 C 230 210, 150 230, 70 210 Z" 
            fill="url(#cupBodyGradient)"
        />
        <path 
            d="M70 90 C 70 90, 150 70, 230 90 C 230 90, 150 110, 70 90 Z" 
            className="fill-black/10"
        />


        {/* Coffee Liquid */}
        <g clipPath="url(#cup-liquid-mask)">
            <rect 
              x="75" 
              y={liquidY}
              width="150" 
              height={liquidHeight}
              className="fill-[#4A342A]"
              style={{ transition: 'y 0.3s ease-in-out, height 0.3s ease-in-out' }}
            />
             <ellipse
                cx="150"
                cy={liquidY}
                rx="72"
                ry="10"
                fill="url(#coffeeSurfaceGradient)"
                style={{ transition: 'cy 0.3s ease-in-out' }}
             />
        </g>
        
        {/* Cup outline, rim, and handle */}
        <g className="stroke-[#A89885] fill-none" strokeLinecap="round">
            <path d="M70 90 C 70 90, 150 70, 230 90 V 210 C 230 210, 150 230, 70 210 Z" strokeWidth="6" />
            <ellipse cx="150" cy="90" rx="80" ry="12" strokeWidth="6" />
            <path d="M 100 85 A 70 10 0 0 1 200 85" stroke="url(#rimHighlightGradient)" strokeWidth="4" />
            <path d="M230 120 C 265 125, 265 175, 230 180" strokeWidth="10" />
        </g>
        
        {/* Steam */}
        { timeLeft > 0 && isActive && (
            <g className="opacity-50" fill="none" stroke="white" strokeLinecap="round">
                <path d="M120 75 Q 130 55 140 75 T 160 75" strokeWidth="2.5" className="animate-steam1" />
                <path d="M170 80 Q 180 60 190 80 T 210 80" strokeWidth="2" className="animate-steam2" />
            </g>
        )}
      </svg>
      {/* Time text */}
      <div 
        className="relative text-6xl sm:text-7xl font-bold text-white z-10" 
        style={{ textShadow: '0px 2px 4px rgba(42, 31, 26, 0.7)' }}
      >
        <span>{String(minutes).padStart(2, '0')}</span>
        <span className={isActive ? 'animate-pulse' : ''}>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;