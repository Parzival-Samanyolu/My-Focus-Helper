import React from 'react';
import { RefreshIcon } from './Icons';

interface QuoteDisplayProps {
  quote: string;
  isLoading: boolean;
  onNewQuote: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, isLoading, onNewQuote }) => {
  return (
    <div className="text-center group">
      {isLoading ? (
        <blockquote className="relative px-8 h-16 flex items-center justify-center">
          <svg className="absolute top-0 left-0 w-8 h-8 text-stone-700/50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.333 22.667h4L15.333 18V9.333H5.333v9.334h4v4zM22.667 22.667h4L28.667 18V9.333H18.667v9.334h4v4z" />
          </svg>
          <div className="flex items-center space-x-1.5" aria-label="Loading quote...">
            <div className="h-2 w-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-stone-500 rounded-full animate-pulse"></div>
          </div>
          <svg className="absolute bottom-0 right-0 w-8 h-8 text-stone-700/50 transform -scale-x-100 -scale-y-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.333 22.667h4L15.333 18V9.333H5.333v9.334h4v4zM22.667 22.667h4L28.667 18V9.333H18.667v9.334h4v4z" />
          </svg>
        </blockquote>
      ) : (
        <blockquote className="relative px-8 min-h-[4rem] flex items-center justify-center">
          <svg className="absolute top-0 left-0 w-8 h-8 text-stone-700" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.333 22.667h4L15.333 18V9.333H5.333v9.334h4v4zM22.667 22.667h4L28.667 18V9.333H18.667v9.334h4v4z" />
          </svg>
          <p className="text-lg italic text-stone-300">"{quote}"</p>
           <svg className="absolute bottom-0 right-0 w-8 h-8 text-stone-700 transform -scale-x-100 -scale-y-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.333 22.667h4L15.333 18V9.333H5.333v9.334h4v4zM22.667 22.667h4L28.667 18V9.333H18.667v9.334h4v4z" />
          </svg>
        </blockquote>
      )}
       <button 
        onClick={onNewQuote}
        disabled={isLoading}
        className="mt-4 mx-auto flex items-center gap-2 text-stone-500 hover:text-amber-500 transition-all text-sm opacity-50 group-hover:opacity-100 disabled:opacity-25"
        >
        <RefreshIcon />
        New Quote
      </button>
    </div>
  );
};

export default QuoteDisplay;