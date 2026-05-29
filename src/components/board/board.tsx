"use client";

import React from "react";
import { TaskCard, TaskCardProps } from "../task/task-card";

interface BoardProps {
  tasks: TaskCardProps[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export function Board({
  tasks,
  onToggleComplete,
  onDelete,
  emptyMessage = "No sticky notes pinned in this category. Click 'New Sticky Note' to pin one!",
}: BoardProps) {
  // Sort tasks: pinned first, then incomplete first
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-6 bg-surface overflow-y-auto">
      {/* Board Title & Meta */}
      <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Pinboard Workspace
          </h1>
          <p className="text-xs text-secondary/60 font-semibold mt-1">
            Organize ideas, tasks, and achievements on a soft office layout.
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider bg-surface-container-high px-3 py-1.5 rounded-sm border border-secondary/15">
          {tasks.length} {tasks.length === 1 ? "Note" : "Notes"} Active
        </span>
      </div>

      {/* Main Grid */}
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16 px-4 text-center border-2 border-dashed border-secondary/15 rounded bg-surface-container-low">
          <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary/40"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </div>
          <p className="text-sm font-semibold text-secondary/80 max-w-sm leading-relaxed">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
