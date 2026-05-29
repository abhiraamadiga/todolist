import { Task, NoteType } from "../../types";

export function createNewTask(
  title: string,
  description: string,
  category: string,
  noteType: NoteType = "neutral",
  isPinned: boolean = false,
  dueDate?: string
): Task {
  return {
    id: Math.random().toString(36).substring(2, 11),
    title,
    description: description.trim() || undefined,
    dueDate: dueDate || undefined,
    isPinned,
    completed: false,
    noteType,
    tags: category ? [category.toUpperCase()] : [],
    createdAt: new Date().toISOString(),
    category,
  };
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
