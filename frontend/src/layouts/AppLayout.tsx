import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white p-8">
      <header className="mb-8 flex shrink-0 justify-between gap-4 text-3xl font-bold">
        <Link to="/">TaskBoard</Link>
        <Link to="/tasks/create">Create</Link>
      </header>
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
