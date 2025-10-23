
export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: TaskPriority;
}