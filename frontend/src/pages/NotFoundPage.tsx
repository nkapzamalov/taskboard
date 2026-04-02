import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <p className="text-[clamp(5rem,22vw,14rem)] font-black leading-none tracking-tight text-white/95">
        404
      </p>
      <p className="text-lg text-white/55">Page not found</p>
      <Link
        to="/"
        className="text-lg text-blue-400 underline-offset-4 transition-colors hover:text-blue-300 hover:underline"
      >
        Go back to homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;