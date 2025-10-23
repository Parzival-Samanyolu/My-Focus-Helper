import React from 'react';
import { CloseIcon } from './Icons';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, soundEnabled, onToggleSound }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40 flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-stone-800 rounded-xl p-6 md:p-8 shadow-2xl border border-stone-700 w-full max-w-sm m-4 transition-transform transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-stone-200">Settings</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-stone-400 hover:bg-stone-700 hover:text-stone-100 transition-colors"
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="sound-toggle" className="text-stone-300">
              Sound Alerts
            </label>
            <button
                id="sound-toggle"
                role="switch"
                aria-checked={soundEnabled}
                onClick={onToggleSound}
                className={`${
                soundEnabled ? 'bg-amber-600' : 'bg-stone-600'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-800`}
            >
                <span
                aria-hidden="true"
                className={`${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;