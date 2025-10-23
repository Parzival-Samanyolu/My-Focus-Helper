import React from 'react';

export const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

export const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

export const ResetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.5a.75.75 0 00-.75.75v4.5l1.903-1.903a5.997 5.997 0 00-9.581 2.542.75.75 0 00.935.935A4.5 4.5 0 0112 6.75v-2.101a7.5 7.5 0 01-7.245 5.41z" clipRule="evenodd" />
  </svg>
);

export const DeleteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

export const RefreshIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.204 2.472l-.303.303a.75.75 0 01-1.06-1.06l.302-.303a5.5 5.5 0 019.204-2.472zM4.688 8.576a5.5 5.5 0 019.204-2.472l.303-.303a.75.75 0 011.06 1.06l-.302.303a5.5 5.5 0 01-9.204 2.472z" clipRule="evenodd" />
    </svg>
);

export const NoTasksIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

export const GearIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 01.447.882l-.048.158a8.28 8.28 0 01.373.293.75.75 0 01-.21 1.031l-.159.048a6.793 6.793 0 00.318.524.75.75 0 01-.341 1.002l-.15.056a6.79 6.79 0 00.22.569.75.75 0 01-.462.97l-.156.035a8.25 8.25 0 010 .584l.156.035a.75.75 0 01.462.97 6.79 6.79 0 00-.22.569l.15.056a.75.75 0 01.341 1.002 6.793 6.793 0 00-.318.524l.159.048a.75.75 0 01.21 1.031 8.28 8.28 0 01-.373.293l.048.158a.75.75 0 01-.882.447l-.16-.04a6.75 6.75 0 01-.527.275.75.75 0 01-.734-.09l-.145-.072a8.272 8.272 0 01-.584 0l-.145.072a.75.75 0 01-.734.09 6.75 6.75 0 01-.527-.275l-.16.04a.75.75 0 01-.882-.447l.048-.158a8.28 8.28 0 01-.373-.293.75.75 0 01.21-1.031l.159-.048a6.793 6.793 0 00-.318-.524.75.75 0 01.341-1.002l.15-.056a6.79 6.79 0 00-.22-.569.75.75 0 01.462-.97l.156-.035a8.25 8.25 0 010-.584l-.156-.035a.75.75 0 01-.462-.97 6.79 6.79 0 00.22-.569l-.15-.056a.75.75 0 01-.341-1.002 6.793 6.793 0 00.318-.524l-.159-.048a.75.75 0 01-.21-1.031 8.28 8.28 0 01.373-.293l-.048-.158a.75.75 0 01.447-.882l.16-.04a6.75 6.75 0 01.527-.275.75.75 0 01.734.09l.145.072a8.272 8.272 0 01.584 0l.145-.072a.75.75 0 01.734-.09 6.75 6.75 0 01.527.275l.16.04zM10 6.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z" clipRule="evenodd" />
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
);