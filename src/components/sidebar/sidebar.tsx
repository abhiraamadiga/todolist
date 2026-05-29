"use client";

import React from "react";

export interface FilterOption {
  id: string;
  name: string;
  count?: number;
  icon?: React.ReactNode;
}

interface SidebarProps {
  activeView: "board" | "calendar";
  onViewChange: (view: "board" | "calendar") => void;
  filters: FilterOption[];
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  onAddTaskClick?: () => void;
  stats?: {
    total: number;
    completed: number;
    pinned: number;
  };
}

export function Sidebar({
  activeView,
  onViewChange,
  filters,
  activeFilterId,
  onFilterChange,
  onAddTaskClick,
  stats = { total: 0, completed: 0, pinned: 0 },
}: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-[#fcf9f4] border-b md:border-b-0 md:border-r border-[#e4beba] flex flex-col p-5 justify-between min-h-screen select-none shrink-0">
      
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        
        {/* Branding */}
        <div className="flex flex-col">
          <h2 className="font-extrabold text-2xl tracking-tight text-[#af101a] leading-none">
            To-Do List
          </h2>
          <p className="text-[11px] tracking-wider font-semibold text-secondary/60 mt-1">
            Abhiraam Adiga
          </p>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex flex-col gap-2">
          
          {/* Task Board Tab */}
          <button
            onClick={() => onViewChange("board")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeView === "board"
                ? "bg-[#cfe6f2] text-[#005f7b] shadow-sm"
                : "text-[#4c616c] hover:bg-secondary/5"
            }`}
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
              className={activeView === "board" ? "text-[#005f7b]" : "text-secondary/70"}
            >
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
            Task Board
          </button>

          {/* Categories sub-menu (Only show when Board is active) */}
          {activeView === "board" && (
            <div className="flex flex-col gap-1 pl-6 py-1 border-l-2 border-[#cfe6f2] ml-6 animate-fade-in">
              {filters.map((filter) => {
                const isActive = filter.id === activeFilterId;
                return (
                  <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-surface-container text-on-surface font-semibold"
                        : "text-secondary/75 hover:text-on-surface"
                    }`}
                  >
                    <span>{filter.name}</span>
                    {filter.count !== undefined && (
                      <span className="text-[10px] text-secondary/60">
                        ({filter.count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Calendar Tab */}
          <button
            onClick={() => onViewChange("calendar")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeView === "calendar"
                ? "bg-[#cfe6f2] text-[#005f7b] shadow-sm"
                : "text-[#4c616c] hover:bg-secondary/5"
            }`}
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
              className={activeView === "calendar" ? "text-[#005f7b]" : "text-secondary/70"}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Calendar
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 mt-auto">
        
        {/* Quick Add Button */}
        {onAddTaskClick && (
          <button
            onClick={onAddTaskClick}
            className="w-full bg-[#af101a] hover:bg-[#920c14] text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Task
          </button>
        )}

      </div>

    </aside>
  );
}
