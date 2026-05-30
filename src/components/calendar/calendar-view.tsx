"use client";

import React, { useState } from "react";
import { Task } from "../../types";
import { TaskCard } from "../task/task-card";

// Helper to format 24h time string (e.g. "14:30") to 12h format (e.g. "2:30 PM")
function formatTime(timeStr?: string): string {
  if (!timeStr) return "";
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutesStr} ${ampm}`;
}

interface CalendarViewProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  onAddTaskClick?: () => void;
}

export function CalendarView({ tasks, onToggleComplete, onDeleteTask, onAddTaskClick }: CalendarViewProps) {
  // Start calendar view on current date and month dynamically!
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Navigate months or weeks
  const handlePrev = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      // Step backward by 7 days
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      // Step forward by 7 days
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    }
  };

  // Date math
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    // JS Date: 0 = Sun, 1 = Mon ...
    // We want: 0 = Mon, 1 = Tue ... 6 = Sun
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Generate grid days dynamically based on viewMode
  const gridCells = [];

  if (viewMode === "month") {
    // Padding days from previous month
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      gridCells.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        dateString: `${month === 0 ? year - 1 : year}-${String(month === 0 ? 12 : month).padStart(2, "0")}-${String(prevMonthDays - i).padStart(2, "0")}`
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      gridCells.push({
        dayNumber: i,
        isCurrentMonth: true,
        dateString: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      });
    }

    // Padding days for next month to complete the row grid (multiples of 7)
    const totalCellsNeeded = Math.ceil(gridCells.length / 7) * 7;
    const paddingNextMonth = totalCellsNeeded - gridCells.length;
    for (let i = 1; i <= paddingNextMonth; i++) {
      gridCells.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateString: `${month === 11 ? year + 1 : year}-${String(month === 11 ? 1 : month + 2).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      });
    }
  } else {
    // Week View Mode: Find the Monday of the current week containing currentDate
    const currentDayOfWeek = currentDate.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - daysToSubtract);

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      const cellYear = dayDate.getFullYear();
      const cellMonth = dayDate.getMonth();
      const cellDay = dayDate.getDate();

      gridCells.push({
        dayNumber: cellDay,
        isCurrentMonth: cellMonth === month,
        dateString: `${cellYear}-${String(cellMonth + 1).padStart(2, "0")}-${String(cellDay).padStart(2, "0")}`
      });
    }
  }

  // Highlights today's actual date dynamically in the calendar grid
  const isActualToday = (dateString: string) => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return dateString === todayStr;
  };

  // Helper to map tasks to their noteType styling classes inside calendar cell
  const getMiniNoteClasses = (task: Task) => {
    if (task.completed) {
      return "bg-note-success/90 border-[#dcfce7] text-[#134e1b] line-through opacity-70";
    }
    const noteClasses = {
      neutral: "bg-note-neutral border-secondary/15 text-on-surface",
      idea: "bg-note-idea border-[#fef08a] text-[#5c4000]",
      process: "bg-note-process border-[#e0f2fe] text-[#0f3b5c]",
      success: "bg-note-success border-[#dcfce7] text-[#134e1b]",
      warning: "bg-note-warning border-[#fee2e2] text-[#7a1a1a]",
    };
    return `${noteClasses[task.noteType]} shadow-sm`;
  };

  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-6 bg-surface overflow-y-auto">
      
      {/* Calendar Header Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e4beba]/60 pb-5 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">
            {monthNames[month]} {year}
          </h1>
          <p className="text-sm font-semibold text-secondary/60 mt-1">
            Organizing your creative roadmap
          </p>
        </div>

        {/* View Mode Toggle & Navigation controls */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          {/* Month / Week selection */}
          <div className="bg-[#ebe8e3] border border-[#e4beba]/40 p-0.5 rounded-lg flex shadow-sm">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === "month"
                  ? "bg-white text-on-surface shadow-xs"
                  : "text-secondary/60 hover:text-on-surface"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === "week"
                  ? "bg-white text-on-surface shadow-xs"
                  : "text-secondary/60 hover:text-on-surface"
              }`}
            >
              Week
            </button>
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 border border-[#e4beba]/50 hover:bg-secondary/5 rounded-lg text-secondary transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-[#e4beba]/50 hover:bg-secondary/5 rounded-lg text-secondary transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="border border-[#e4beba] rounded-xl overflow-hidden shadow-ambient bg-[#fcf9f4] flex-1 min-h-[500px] flex flex-col">
        {/* Mon-Sun Header bar */}
        <div className="grid grid-cols-7 border-b border-[#e4beba] bg-[#ebe8e3]/40 text-center py-3 text-xs font-extrabold uppercase tracking-widest text-[#4c616c]">
          {weekdayNames.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar grid cells */}
        <div className="grid grid-cols-7 flex-1 desk-paper-grid">
          {gridCells.map((cell, idx) => {
            // Find tasks matching date and sort them chronologically by dueTime
            const dayTasks = tasks
              .filter((t) => t.dueDate === cell.dateString)
              .sort((a, b) => {
                if (a.dueTime && b.dueTime) {
                  return a.dueTime.localeCompare(b.dueTime);
                }
                if (a.dueTime) return -1;
                if (b.dueTime) return 1;
                return 0;
              });
            const isToday = isActualToday(cell.dateString);
            
            return (
              <div
                key={`${cell.dateString}-${idx}`}
                className={`calendar-cell p-2 flex flex-col gap-1.5 transition-all min-h-[100px] select-none ${
                  isToday ? "border-2 border-[#af101a]! z-20 shadow-sm" : ""
                } ${!cell.isCurrentMonth ? "opacity-35" : ""}`}
              >
                {/* Date cell number label */}
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-bold ${
                      isToday ? "text-[#af101a] bg-[#af101a]/10 px-1.5 py-0.5 rounded-full font-black" : "text-[#4c616c]/70"
                    }`}
                  >
                    {cell.dayNumber}
                  </span>
                </div>

                {/* Date cell sticky tasks */}
                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[85px] pr-0.5">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`px-2 py-1.5 rounded border text-[10px] leading-tight font-semibold flex flex-col justify-between relative cursor-pointer paper-card transition-all ${getMiniNoteClasses(
                        task
                      )}`}
                      title={`${task.title} - Click to view details`}
                    >
                      {/* Red Pushed Pin anchor indicator */}
                      {task.isPinned && !task.completed && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#af101a] rounded-full shadow-[0_1px_2px_rgba(175,16,26,0.4)]" />
                      )}
                      
                      <span className="truncate pr-1 mt-0.5">{task.title}</span>
                      {task.dueTime && (
                        <span className="text-[8px] opacity-75 mt-0.5 font-bold self-start bg-black/5 px-1 rounded flex items-center gap-0.5 select-none shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {formatTime(task.dueTime)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Detail Modal Overlay */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-[#31302db3] backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="w-full max-w-sm relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-xs font-bold bg-black/25 px-3 py-1.5 rounded-full cursor-pointer hover:bg-black/40 transition-colors z-50"
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
              Close
            </button>

            <TaskCard
              {...selectedTask}
              onToggleComplete={(id) => {
                onToggleComplete(id);
                setSelectedTask((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
              }}
              onDelete={
                onDeleteTask
                  ? (id) => {
                      onDeleteTask(id);
                      setSelectedTask(null);
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
