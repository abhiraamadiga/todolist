# Tactile Board — Modern Office To-Do List

A premium, visually-rich, office-desk-themed task and goal organizer built with a clean tactile paper aesthetic. Designed to streamline daily workflows by pinning customized, context-colored task notes to an interactive desktop workspace.

---

## Premium Tactile Design System

The application mimics a physical office pinboard using modern design system tokens:
* **Sticky Note Archetypes:** Customizable note backgrounds corresponding to task priorities and categories (Neutral, Process, Success, Warning, Idea).
* **Workspace Pins:** Featured and pinned tasks physically display decorative pushpin indicators.
* **Layout Transitions:** Micro-interactions, including hover state elevations and scaling modular frames, enhance overall engagement.
* **Multi-View Desk:** Allows toggling between a responsive Task Board grid and a monthly Calendar Grid.

---

## Tech Stack and Architecture

Built to satisfy modern enterprise frontend requirements:
* **Framework:** Next.js 16 (App Router) & React 19.
* **Type Safety:** TypeScript with comprehensive, error-free strict checking.
* **Styling:** Tailwind CSS v4 utilizing HSL color definitions.
* **State Management:** Redux Toolkit (RTK) for centralized UI filters and application views.
* **Data Fetching:** RTK Query with tag-based cache invalidation for automated list refreshes on CRUD operations.
* **Mock Backend:** JSON Server for lightweight API simulation.

---

## Key Features

* **Full CRUD Operations:** Support for task creation, list fetching, status toggle, description updates, and deletion.
* **Automated Refetching:** Automatic cache invalidation ensures the view refreshes instantly upon state changes.
* **Category Sorting:** Sidebar sorting with live counters across defined categories (Work, Personal, Brainstorm, Completed).
* **Deadline Schedulers:** Custom date and AM/PM time configurations for individual task deadlines.

---

## Directory Structure

```text
src/
├── app/
│   ├── globals.css      # Custom design tokens, transitions, and keyframes
│   ├── layout.tsx       # Root layout wrapping global providers and typography
│   ├── page.tsx         # Primary controller and task coordinator view
│   └── providers.tsx    # Next.js Provider wrapper for Redux store
├── components/
│   ├── board/
│   │   └── board.tsx    # Board grid display container
│   ├── calendar/
│   │   └── calendar-view.tsx # Monthly calendar tasks layout
│   ├── sidebar/
│   │   └── sidebar.tsx  # Dynamic sidebar filters and stats
│   ├── task/
│   │   └── task-card.tsx # Sticky note archetype component
│   └── ui/
│       └── button.tsx   # Typed reusable button elements
├── features/
│   ├── filter/
│   │   └── filterSlice.ts # Redux slice for search & filter UI state
│   ├── filters/
│   │   └── index.ts     # Task sorting & metric helpers
│   └── tasks/
│       ├── index.ts     # Task factories and sorters
│       └── taskApi.ts   # RTK Query slice (CRUD endpoint definitions)
├── store/
│   ├── hooks.ts         # Type-safe useSelector & useDispatch hooks
│   └── store.ts         # Main store configuration
└── types/
    └── index.ts         # Domain types and custom interfaces
```

---

## Installation & Getting Started

### 1. Install Dependencies
Clone the repository and install all required node packages:
```bash
npm install
```

### 2. Start Database Mock Server
Start the local JSON Server to mock the backend endpoints:
```bash
npx json-server --port 3001 --watch db.json
```

### 3. Run Development Server
Start the Next.js local server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to access the application.

---

## Quality Assurance

To verify strict static types across all features, run:
```bash
npx tsc --noEmit
```

---

## Author

Designed and implemented by **Abhiraam Adiga**.
