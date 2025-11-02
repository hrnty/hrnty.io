
export interface Task {
  id: string;
  name: string;
}

export interface Log {
  id: string;
  taskId: string;
  startTime: number; // Unix timestamp in milliseconds
  endTime: number; // Unix timestamp in milliseconds
  duration: number; // Duration in seconds
  comment: string;
}
