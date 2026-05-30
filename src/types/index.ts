export type NoteType = "neutral" | "idea" | "process" | "success" | "warning";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  isPinned: boolean;
  completed: boolean;
  noteType: NoteType;
  tags: string[];
  createdAt: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}
