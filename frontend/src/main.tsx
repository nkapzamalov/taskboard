import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "tasks/:id",
    element: <TaskPage />,
  },
  {
    path: "tasks/create",
    element: <CreateTaskPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
