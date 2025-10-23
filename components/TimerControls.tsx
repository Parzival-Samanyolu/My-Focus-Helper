import React from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './Icons';

interface TimerControlsProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ isActive, onStartPause, onReset }) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={onStartPause}
        className="px-8 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-lg font-semibold uppercase tracking-wider shadow-[0_4px_14px_rgba(251,191,36,0.2)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.25)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        {isActive ? <PauseIcon/> : <PlayIcon />}
        <span>{isActive ? 'Pause' : 'Start'}</span>
      </button>
      <button
        onClick={onReset}
        className="p-3 bg-stone-700/80 text-stone-300 rounded-full hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75 transition-all duration-300 transform hover:rotate-90"
        aria-label="Reset Timer"
      >
        <ResetIcon />
      </button>
    </div>
  );
};

export default TimerControls;