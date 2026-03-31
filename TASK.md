Project: TaskBoard (Mini Jira / Trello)

Goal

Build a small but complete full-stack application that demonstrates strong software engineering fundamentals across both frontend and backend. The project should test React fundamentals, API design, state management, side effects, persistence, and clean separation of concerns.


High-Level Architecture

Build the project as two parts:
	•	Frontend: React application
	•	Backend: REST API for task management
	•	Persistence: database or in-memory storage with clear structure

Optional:
	•	Dockerize both services
	•	Add a shared README explaining architecture and trade-offs

Tech Requirements

Frontend
	•	React
	•	Functional components only
	•	UI framework allowed (e.g. MUI, Chakra UI, Ant Design, Tailwind, etc.)
	•	No external state management libraries (Redux, Zustand, MobX)

Backend

Use one of:
	•	Node.js + Express
	•	Java + Spring Boot
	•	Python + FastAPI / Flask

Backend must expose a REST API.

Data Storage

Choose one:
	•	PostgreSQL / MySQL / SQLite
	•	In-memory store for simpler version
	•	local JSON file only if clearly documented as a simplification

⸻

Core Domain

Task Entity

Each task must contain:
	•	id
	•	title
	•	status (todo | in-progress | done)
	•	createdAt

Nice to have:
	•	updatedAt

Optional:
	•	description
	•	assignee
	•	priority

⸻

Frontend Features

Task List
	•	Display a list of tasks
	•	Tasks grouped or filterable by status

CRUD Operations
	•	Create a task
	•	Edit task title
	•	Delete a task
	•	Change task status

State Management
	•	Tasks stored in top-level state or custom hook state
	•	Proper state lifting
	•	Controlled inputs for forms
	•	Clear separation between container/stateful components and presentational components

Filtering & Derived State
	•	Filter tasks by status
	•	Display task counts per status
	•	Use useMemo for derived values like filtered lists and counts

Side Effects
	•	Fetch tasks from backend on initial render
	•	Persist all mutations through backend API
	•	Handle loading state
	•	Handle empty state
	•	Handle error state gracefully

Performance Requirements
	•	Wrap TaskItem with React.memo
	•	Use useCallback for event handlers where appropriate
	•	Be able to explain when memoization is useful vs unnecessary

UX Requirements
	•	Optimistic updates
	•	Disable buttons during edit/save/delete requests
	•	Keyboard support:
	•	Enter to submit
	•	Escape to cancel edit

⸻

Backend Features

REST API Endpoints

Implement at minimum:
	•	GET /tasks → get all tasks
	•	GET /tasks/:id → get task by id
	•	POST /tasks → create task
	•	PUT /tasks/:id or PATCH /tasks/:id → update task title/status
	•	DELETE /tasks/:id → delete task

Optional:
	•	GET /tasks?status=todo
	•	GET /tasks/counts
	•	pagination support

Backend Responsibilities
	•	Validate request payloads
	•	Enforce valid status values
	•	Reject invalid titles (empty/null/too long)
	•	Return appropriate HTTP status codes
	•	Return consistent JSON response bodies
	•	Handle not-found cases cleanly
	•	Handle server errors gracefully

Suggested Response Format

You may return raw task objects, or standardize responses like:

{
  "data": {...},
  "error": null
}

or on failure:

{
  "data": null,
  "error": "Task not found"
}

Persistence

If using a real database:
	•	create a tasks table
	•	map task entity clearly
	•	store timestamps correctly

If using in-memory storage:
	•	document the trade-off clearly in README

⸻

Backend Best Practices
	•	Clear layering:
	•	controller / route layer
	•	service layer
	•	repository / data access layer
	•	Avoid putting all logic in routes/controllers
	•	Validate input before business logic
	•	Use DTO/request models if language/framework supports it
	•	Keep business logic separate from transport concerns
	•	Return meaningful errors and status codes

⸻

API Design Expectations
	•	GET /tasks returns list of tasks
	•	POST /tasks returns created task with generated id
	•	PATCH /tasks/:id supports partial updates
	•	DELETE /tasks/:id returns success status or deleted resource
	•	Invalid input returns 400
	•	Missing resource returns 404
	•	Unexpected failure returns 500

⸻

Full-Stack Behavior

The frontend should:
	•	load tasks from the backend on initial render but also implement pagination properly
	•	send API requests for create/edit/delete/status changes
	•	optimistically update UI where appropriate
	•	reconcile optimistic state if request fails

The backend should:
	•	act as source of truth
	•	validate and persist changes
	•	expose stable API contract

⸻

Error Handling

Frontend
	•	show loading UI while fetching
	•	show friendly error UI if request fails
	•	rollback optimistic changes when mutation fails

Backend
	•	validate input
	•	handle malformed payloads
	•	handle unknown task IDs
	•	prevent invalid status updates

⸻

Bonus Features (Optional)

Frontend
	•	Custom hook: useTasks
	•	Undo delete with 5-second timeout
	•	Debounced search
	•	Error Boundary
	•	Drag-and-drop between statuses

Backend
	•	Search tasks by title
	•	Sort by creation date
	•	Pagination
	•	Rate limiting
	•	Request logging
	•	Unit/integration tests
	•	OpenAPI / Swagger docs

DevOps / Project Setup
	•	Dockerfile for frontend
	•	Dockerfile for backend
	•	docker-compose.yml for app + database
	•	environment variables
	•	seed script for sample tasks

Good luck!
