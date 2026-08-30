export default function Squiggle({ children, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-2 w-full text-fg"
      >
        <path
          d="M0,6 Q8,1 16,6 T32,6 T48,6 T64,6 T80,6 T96,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
