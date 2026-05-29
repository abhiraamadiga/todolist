"use client";

import { Task, NoteType } from "../types";

const LOCAL_STORAGE_KEY = "tactile-board-tasks";

// Default seed tasks matching the user mockup dates in October 2023
const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Brand Discovery",
    description: "Brainstorming and research for brand elements, core messaging, and design narratives.",
    dueDate: "2023-10-02",
    isPinned: true,
    completed: false,
    noteType: "idea",
    tags: ["BRAND", "IDEAS"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "work",
  },
  {
    id: "2",
    title: "Logo Sketching",
    description: "Initial hand-drawn sketches for visual brand identity marks.",
    dueDate: "2023-10-06",
    isPinned: false,
    completed: false,
    noteType: "process",
    tags: ["SKETCH", "DESIGN"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "work",
  },
  {
    id: "3",
    title: "Design Review",
    description: "Stakeholder sit-down to go over high-fidelity mockups and visual guidelines.",
    dueDate: "2023-10-07",
    isPinned: true,
    completed: false,
    noteType: "warning",
    tags: ["REVIEW"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "work",
  },
  {
    id: "4",
    title: "Final Export",
    description: "Package final creative assets and SVG formats for handover.",
    dueDate: "2023-10-09",
    isPinned: true,
    completed: false,
    noteType: "success",
    tags: ["EXPORT"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "work",
  },
  {
    id: "5",
    title: "STUDIO CLOSED",
    description: "Office closed for national holidays. Enjoy the long break!",
    dueDate: "2023-10-14",
    isPinned: false,
    completed: false,
    noteType: "neutral",
    tags: ["HOLIDAY"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "personal",
  },
  {
    id: "6",
    title: "Client Pitch",
    description: "Pitch finalized concepts and identity slides to stakeholders.",
    dueDate: "2023-10-22",
    isPinned: false,
    completed: false,
    noteType: "idea",
    tags: ["PITCH", "CLIENT"],
    createdAt: new Date("2023-10-01").toISOString(),
    category: "brainstorm",
  },
];

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
