import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import AppLayout from './layouts/AppLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tasks/create", element: <CreateTaskPage /> },
      { path: "tasks/edit/:id", element: <EditTaskPage /> },
      { path: "tasks/:id", element: <TaskPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
