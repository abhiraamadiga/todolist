import { Task } from "../types";
import { getStoredTasks, saveStoredTasks } from "../store";

/**
 * Service module simulating async task fetch operations.
 * This is easily swappable with server actions or REST API calls later.
 */
export const TaskService = {
  async getAllTasks(): Promise<Task[]> {
    // Simulate minor network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredTasks();
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    saveStoredTasks(tasks);
  },
};
