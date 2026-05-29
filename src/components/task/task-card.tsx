"use client";

import React from "react";

export type NoteType = "neutral" | "idea" | "process" | "success" | "warning";

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  isPinned?: boolean;
  completed?: boolean;
  noteType?: NoteType;
  tags?: string[];
  onToggleComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskCard({
  id,
  title,
  description,
  dueDate,
  isPinned = false,
  completed = false,
  noteType = "neutral",
  tags = [],
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  // Map note types to classes defined in our theme
  const noteTypeClasses = {
    neutral: "bg-note-neutral border-secondary/15 text-on-surface",
    idea: "bg-note-idea border-note-idea/80 text-[#5c4000]",
    process: "bg-note-process border-note-process/80 text-[#0f3b5c]",
    success: "bg-note-success border-note-success/80 text-[#134e1b]",
    warning: "bg-note-warning border-note-warning/80 text-[#7a1a1a]",
  };

  return (
    <div
      className={`paper-card p-5 rounded shadow-ambient flex flex-col gap-3 min-h-[160px] relative ${noteTypeClasses[noteType]}`}
    >
      {/* Decorative Pushpin */}
      {isPinned && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div className="pushpin" />
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-start justify-between gap-2 mt-1">
        <label className="flex items-start gap-2.5 cursor-pointer select-none flex-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete?.(id)}
            className="custom-checkbox mt-0.5 shrink-0"
          />
          <span
            className={`font-semibold text-base leading-tight transition-all duration-150 ${
              completed ? "line-through opacity-50" : ""
            }`}
          >
            {title}
          </span>
        </label>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-secondary/40 hover:text-error transition-colors p-1 rounded hover:bg-secondary/5 cursor-pointer -mt-1 -mr-1"
            title="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          className={`text-sm leading-relaxed flex-1 font-normal opacity-85 whitespace-pre-line ${
            completed ? "opacity-40" : ""
          }`}
        >
          {description}
        </p>
      )}

      {/* Footer Meta Details */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-secondary/5 mt-auto text-xs font-medium">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/80 border border-secondary/20 px-2 py-0.5 rounded-sm tracking-wider uppercase text-[10px] text-secondary font-bold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Due Date */}
        {dueDate && (
          <span className="text-secondary/60 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
