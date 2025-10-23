import React, { useState, useMemo } from 'react';
import type { Task, TaskPriority } from '../types';
import TaskItem from './TaskItem';
import { NoTasksIcon } from './Icons';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (text: string, priority: TaskPriority) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onClearCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask, onClearCompleted }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const hasCompletedTasks = tasks.some(task => task.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim(), newPriority);
      setNewTaskText('');
      setNewPriority('medium');
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      onClearCompleted();
    }
  };

  const sortedTasks = useMemo(() => {
    const priorityOrder: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks]);

  const getPriorityButtonClass = (priority: TaskPriority) => {
    const base = `px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1`;
    if (newPriority === priority) {
        if (priority === 'high') return `${base} bg-red-500 text-white shadow-sm shadow-red-500/30`;
        if (priority === 'medium') return `${base} bg-amber-500 text-white shadow-sm shadow-amber-500/30`;
        if (priority === 'low') return `${base} bg-green-500 text-white shadow-sm shadow-green-500/30`;
    }
    return `${base} bg-stone-700/50 text-stone-300 hover:bg-stone-700`;
  };

  return (
    <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-stone-700 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-stone-200">My Tasks</h2>
        {hasCompletedTasks && (
            <button
                onClick={handleClear}
                className="text-sm text-stone-400 hover:text-amber-500 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md px-2 py-1"
            >
                Clear Completed
            </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow bg-stone-900/70 border border-stone-700 rounded-md px-4 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
          />
          <button
            type="submit"
            className="bg-amber-600 text-stone-900 px-4 py-2 rounded-md font-semibold hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 transition-colors shadow-sm hover:shadow-md hover:shadow-amber-500/20"
          >
            Add
          </button>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Priority:</span>
            <button type="button" onClick={() => setNewPriority('low')} className={getPriorityButtonClass('low')}>Low</button>
            <button type="button" onClick={() => setNewPriority('medium')} className={getPriorityButtonClass('medium')}>Medium</button>
            <button type="button" onClick={() => setNewPriority('high')} className={getPriorityButtonClass('high')}>High</button>
        </div>
      </form>
      <ul className="space-y-2">
        {tasks.length > 0 ? (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="text-stone-500 text-center py-8">
            <NoTasksIcon />
            <p className="mt-4 text-sm font-medium">No tasks yet. Add one to get started!</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TaskList;