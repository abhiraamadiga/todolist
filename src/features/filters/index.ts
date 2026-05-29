import { Task } from "../../types";

export type FilterCategory = "all" | "work" | "personal" | "brainstorm" | "completed";

export function filterTasks(tasks: Task[], activeFilter: string): Task[] {
  if (activeFilter === "all") {
    return tasks;
  }
  if (activeFilter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks.filter((t) => t.category === activeFilter);
}

export function calculateFilterCounts(tasks: Task[]) {
  return {
    all: tasks.length,
    work: tasks.filter((t) => t.category === "work").length,
    personal: tasks.filter((t) => t.category === "personal").length,
    brainstorm: tasks.filter((t) => t.category === "brainstorm").length,
    completed: tasks.filter((t) => t.completed).length,
  };
}
