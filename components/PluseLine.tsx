export default function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 40 H360 L400 40 L420 12 L445 68 L470 40 L500 40 L520 25 L540 40 H1200"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        className="animate-pulseLine"
      />
    </svg>
  );
}
