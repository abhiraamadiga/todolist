"use client";

import React, { useState } from "react";
import { Sidebar, FilterOption } from "../components/sidebar/sidebar";
import { Board } from "../components/board/board";
import { CalendarView } from "../components/calendar/calendar-view";
import { Task, NoteType } from "../types";
import { createNewTask } from "../features/tasks";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../features/tasks/taskApi";
import { filterTasks, calculateFilterCounts } from "../features/filters";
import { Button } from "../components/ui/button";

export default function Home() {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeView, setActiveView] = useState<"board" | "calendar">("board"); // default to board (list view) on reload!
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState("work");
  const [formNoteType, setFormNoteType] = useState<NoteType>("neutral");
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formDueDate, setFormDueDate] = useState("");
  const [formDueTime, setFormDueTime] = useState("");

  // Handlers
  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask({ id, completed: !task.completed });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const task = createNewTask(
      formTitle,
      formDesc,
      formCategory,
      formNoteType,
      formIsPinned,
      formDueDate,
      formDueTime
    );

    createTask(task);
    
    // Reset form
    setFormTitle("");
    setFormDesc("");
    setFormCategory("work");
    setFormNoteType("neutral");
    setFormIsPinned(false);
    setFormDueDate("");
    setFormDueTime("");
    setIsFormOpen(false);
  };

  // Filter stats
  const counts = calculateFilterCounts(tasks);
  const filteredTasks = filterTasks(tasks, activeFilter);

  const filters: FilterOption[] = [
    {
      id: "all",
      name: "All Notes",
      count: counts.all,
    },
    {
      id: "work",
      name: "Work Tasks",
      count: counts.work,
    },
    {
      id: "personal",
      name: "Personal",
      count: counts.personal,
    },
    {
      id: "brainstorm",
      name: "Brainstorming",
      count: counts.brainstorm,
    },
    {
      id: "completed",
      name: "Completed",
      count: counts.completed,
    }
  ];

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pinned: tasks.filter((t) => t.isPinned).length,
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        filters={filters}
        activeFilterId={activeFilter}
        onFilterChange={setActiveFilter}
        onAddTaskClick={() => setIsFormOpen(true)}
        stats={stats}
      />

      {/* Main workspace Desk / Pinboard */}
      {isLoading ? (
        <div className="flex-1 bg-surface flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {/* Spinning Custom Pin */}
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce shadow-pin">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <p className="text-sm font-bold tracking-widest uppercase text-secondary/60">
              Polishing desk surface...
            </p>
          </div>
        </div>
      ) : activeView === "board" ? (
        <Board
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          emptyMessage={
            activeFilter === "completed"
              ? "No finished items on the board. Make checkmarks on sticky notes to file them under completed!"
              : `No sticky notes under '${activeFilter}'. Press 'New Task' to pin one on the desk.`
          }
        />
      ) : (
        <CalendarView
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onAddTaskClick={() => setIsFormOpen(true)}
        />
      )}

      {/* Sticky Floating Action Button (FAB) matching the mockup */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#af101a] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#920c14] fab-button z-40 cursor-pointer"
        title="Pin a new sticky note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {/* Task Creation Modal Form (Sticky Form Blank) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#31302db3] backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded p-6 md:p-8 max-w-md w-full shadow-ambient relative animate-scale-up border border-secondary/15">
            {/* Decorative tack header */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
              <div className="pushpin" />
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-secondary/10 mb-5">
              <div>
                <h3 className="font-bold text-lg text-on-surface">
                  Add Note to Desk
                </h3>
                <p className="text-[10px] tracking-wider uppercase font-bold text-secondary/50">
                  New Blank Slip
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-secondary/50 hover:text-on-surface p-1 rounded hover:bg-secondary/5 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            </div>

            <form onSubmit={handleAddTask} className="flex flex-col gap-5">
              {/* Form Input: Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                  Subject / Heading
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter a brief label..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-secondary/20 focus:border-primary pb-1.5 text-sm font-semibold outline-none transition-colors text-on-surface placeholder:text-secondary/40 placeholder:font-normal"
                />
              </div>

              {/* Form Input: Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                  Details / Content
                </label>
                <textarea
                  placeholder="Draft details or bullet points..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-secondary/5 border-b-2 border-secondary/20 focus:border-primary p-2 text-sm outline-none transition-all rounded-t-sm text-on-surface placeholder:text-secondary/40 resize-none"
                />
              </div>

              {/* Two Column Selector */}
              <div className="grid grid-cols-2 gap-4">
                {/* Form Input: Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                    Category Tab
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-secondary/20 pb-1.5 text-sm font-semibold outline-none cursor-pointer text-on-surface"
                  >
                    <option value="work">Work Tasks</option>
                    <option value="personal">Personal</option>
                    <option value="brainstorm">Brainstorming</option>
                  </select>
                </div>

                {/* Form Input: Note Color Theme */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                    Paper Color
                  </label>
                  <select
                    value={formNoteType}
                    onChange={(e) => setFormNoteType(e.target.value as NoteType)}
                    className="w-full bg-transparent border-b-2 border-secondary/20 pb-1.5 text-sm font-semibold outline-none cursor-pointer text-on-surface"
                  >
                    <option value="neutral">Neutral White</option>
                    <option value="idea">Idea Yellow</option>
                    <option value="process">Process Blue</option>
                    <option value="success">Success Green</option>
                    <option value="warning">Warning Red</option>
                  </select>
                </div>
              </div>

              {/* Two Column Date & Time Selector */}
              <div className="grid grid-cols-2 gap-4">
                {/* Form Input: Due Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                    Target Due Date
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-secondary/20 pb-1.5 text-sm font-semibold outline-none cursor-pointer text-on-surface"
                  />
                </div>

                {/* Form Input: Due Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/70">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={formDueTime}
                    onChange={(e) => setFormDueTime(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-secondary/20 pb-1.5 text-sm font-semibold outline-none cursor-pointer text-on-surface"
                  />
                </div>
              </div>

              {/* Pin Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                <input
                  type="checkbox"
                  checked={formIsPinned}
                  onChange={(e) => setFormIsPinned(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="text-xs font-semibold text-secondary/90">
                  Pin to top of workspace (Featured)
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-secondary/10">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFormOpen(false)}
                >
                  Discard
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Pin Note
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
