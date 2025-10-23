import React, { useState } from 'react';
import type { Task, TaskPriority } from '../types';
import { DeleteIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDelete = () => {
    setIsExiting(true);
    // Wait for the animation to complete before removing the item from the state
    setTimeout(() => {
      onDelete(task.id);
    }, 300); 
  };
  
  const priorityColorClass: Record<TaskPriority, string> = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-green-500',
  };

  return (
    <li
      className={`relative flex items-center justify-between pl-5 pr-3 py-3 rounded-lg group transition-all duration-300 ease-in-out transform hover:-translate-y-px hover:shadow-lg hover:shadow-black/25 overflow-hidden
      ${task.completed ? 'bg-stone-800/40' : 'bg-stone-700/50'}
      ${isExiting ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'}`}
    >
       <div className={`absolute left-0 top-0 h-full w-1.5 transition-opacity ${priorityColorClass[task.priority]} ${task.completed ? 'opacity-40' : 'opacity-90'}`}></div>

      <div className="flex items-center gap-3 min-w-0">
        <div 
            onClick={() => onToggle(task.id)}
            className="relative w-5 h-5 flex-shrink-0 cursor-pointer"
            aria-checked={task.completed}
            role="checkbox"
            tabIndex={0}
            onKeyDown={(e) => e.key === ' ' || e.key === 'Enter' ? onToggle(task.id) : null}
        >
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
              className="opacity-0 absolute w-full h-full cursor-pointer"
              aria-hidden="true"
              tabIndex={-1}
            />
            <span className={`absolute inset-0 rounded-full border-2 transition-all duration-200
              ${task.completed ? 'bg-amber-600 border-amber-500' : 'bg-stone-600 border-stone-500 group-hover:border-amber-500'}`}
            >
              <svg
                className={`w-full h-full text-white transition-transform duration-200 ease-in-out transform ${task.completed ? 'scale-100' : 'scale-0'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
        </div>
        <label
          onClick={() => onToggle(task.id)}
          className={`text-stone-200 transition-all duration-300 truncate cursor-pointer ${task.completed ? 'line-through text-stone-500' : 'group-hover:text-stone-100'}`}
        >
          {task.text}
        </label>
      </div>
      <button
        onClick={handleDelete}
        className="text-stone-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 pl-2 transform translate-x-2 group-hover:translate-x-0 duration-200"
        aria-label={`Delete task: ${task.text}`}
      >
        <DeleteIcon />
      </button>
    </li>
  );
};

export default TaskItem;