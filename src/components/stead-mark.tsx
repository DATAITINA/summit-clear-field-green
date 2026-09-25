import { cn } from "@/lib/utils";

export function SteadMark({
  className,
  lit = false,
}: {
  className?: string;
  lit?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-end justify-center", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 12 28"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="2"
          height="18"
          rx="1"
          className={lit ? "fill-accent" : "fill-fg"}
        />
        <circle
          cx="6"
          cy="6"
          r="2.25"
          className={lit ? "fill-accent" : "fill-fg"}
        />
      </svg>
    </span>
  );
}
