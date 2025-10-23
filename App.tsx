import React, { useState, useEffect, useRef, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import TaskList from './components/TaskList';
import QuoteDisplay from './components/QuoteDisplay';
import Settings from './components/Settings';
import { GearIcon } from './components/Icons';
import { fetchMotivationalQuote } from './services/geminiService';
import { WORK_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION, SESSIONS_BEFORE_LONG_BREAK } from './constants';
import type { TimerMode, Task, TaskPriority } from './types';

const App: React.FC = () => {
  const [timerMode, setTimerMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(WORK_DURATION);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionCount, setSessionCount] = useState<number>(0);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [quote, setQuote] = useState<string>('');
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(true);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);


  const switchMode = useCallback((mode: TimerMode) => {
    setIsActive(false);
    setTimerMode(mode);
    switch (mode) {
      case 'shortBreak':
        setTimeLeft(SHORT_BREAK_DURATION);
        break;
      case 'longBreak':
        setTimeLeft(LONG_BREAK_DURATION);
        break;
      default:
        setTimeLeft(WORK_DURATION);
        break;
    }
  }, []);
  
  const playSound = () => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);

      if (soundEnabled) {
        playSound();
      }

      if (timerMode === 'work') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        if (newSessionCount % SESSIONS_BEFORE_LONG_BREAK === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('work');
      }
    }
    document.title = `${Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')} - Focus Helper`;
  }, [timeLeft, timerMode, sessionCount, switchMode, soundEnabled]);
  
  const getNewQuote = useCallback(async () => {
    setIsQuoteLoading(true);
    const fetchedQuote = await fetchMotivationalQuote();
    setQuote(fetchedQuote);
    setIsQuoteLoading(false);
  }, []);

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  const handleStartPause = () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch(e) {
        console.error("Web Audio API is not supported in this browser.");
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    switch (timerMode) {
      case 'work':
        setTimeLeft(WORK_DURATION);
        break;
      case 'shortBreak':
        setTimeLeft(SHORT_BREAK_DURATION);
        break;
      case 'longBreak':
        setTimeLeft(LONG_BREAK_DURATION);
        break;
    }
  };

  const handleAddTask = (text: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleClearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };
  
  const getModeButtonClass = (mode: TimerMode) => {
    return `px-4 py-2 rounded-md transition-colors text-sm font-medium ${
      timerMode === mode
        ? 'bg-amber-600 text-stone-900 font-bold'
        : 'bg-stone-700/50 hover:bg-stone-700 text-stone-300'
    }`;
  };
  
  const getTotalDuration = () => {
    switch (timerMode) {
      case 'work':
        return WORK_DURATION;
      case 'shortBreak':
        return SHORT_BREAK_DURATION;
      case 'longBreak':
        return LONG_BREAK_DURATION;
      default:
        return WORK_DURATION;
    }
  };
  
  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <main className="w-full max-w-lg mx-auto flex flex-col gap-8">
        <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl border border-stone-700 relative">
          <div className="absolute top-4 right-4 z-10">
            <button 
                onClick={() => setSettingsOpen(true)} 
                className="p-2 rounded-full text-stone-400 hover:bg-stone-700/80 hover:text-stone-100 transition-colors"
                aria-label="Open settings"
            >
                <GearIcon />
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 mb-6">
            <button onClick={() => switchMode('work')} className={getModeButtonClass('work')}>Work</button>
            <button onClick={() => switchMode('shortBreak')} className={getModeButtonClass('shortBreak')}>Short Break</button>
            <button onClick={() => switchMode('longBreak')} className={getModeButtonClass('longBreak')}>Long Break</button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <TimerDisplay timeLeft={timeLeft} totalDuration={getTotalDuration()} isActive={isActive} />
            <TimerControls
              isActive={isActive}
              onStartPause={handleStartPause}
              onReset={handleReset}
            />
          </div>
        </div>
        
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onClearCompleted={handleClearCompletedTasks}
        />
        
        <QuoteDisplay quote={quote} isLoading={isQuoteLoading} onNewQuote={getNewQuote} />
      </main>
       <footer className="text-center text-stone-500 mt-8 text-sm">
        <p>Built to help you find your flow.</p>
      </footer>
      <Settings 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
};

export default App;