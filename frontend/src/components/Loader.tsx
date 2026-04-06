import type { ReactNode } from "react";

type LoaderProps = {
  className?: string;
  children?: ReactNode;
};

export default function Loader({ className = "", children = "Loading..." }: LoaderProps) {
  return (
    <div className={`text-white ${className}`.trim()} role="status" aria-live="polite">
      {children}
    </div>
  );
}
