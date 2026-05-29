"use client";

import { Task, NoteType } from "../types";

const LOCAL_STORAGE_KEY = "tactile-board-tasks-v2";

// Start with a clean empty list, ready for Redux & RTK Query integration
const DEFAULT_TASKS: Task[] = [];

export function getStoredTasks(): Task[] {
  if (typeof window === "undefined") return DEFAULT_TASKS;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_TASKS;
  } catch (e) {
    console.error("Failed to read tasks from local storage", e);
    return DEFAULT_TASKS;
  }
}

export function saveStoredTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to local storage", e);
  }
}
