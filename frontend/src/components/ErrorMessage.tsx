type ErrorMessageProps = {
  message: string;
  /** banner: padded alert; compact: small text under controls; plain: simple red text */
  variant?: "banner" | "compact" | "plain";
  className?: string;
};

const variantClass: Record<NonNullable<ErrorMessageProps["variant"]>, string> = {
  banner: "text-red-500 p-4 bg-red-900/20 rounded",
  compact: "mt-2 text-sm text-red-400 bg-red-900/20 rounded px-3 py-2",
  plain: "text-red-500",
};

export default function ErrorMessage({
  message,
  variant = "banner",
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`${variantClass[variant]} ${className}`.trim()}
      role="alert"
    >
      {message}
    </div>
  );
}
