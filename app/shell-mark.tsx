// Scallop line mark, inherits text color
export default function ShellMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden>
      <path d="M24 39 7.5 21.5C7 12 14.5 6 24 6s17 6 16.5 15.5Z" />
      <path d="M24 39 11.5 11.5M24 39 17.5 7.6M24 39V6M24 39l6.5-31.4M24 39l12.5-27.5" />
      <path d="M18.5 39h11l-2 4h-7Z" />
    </svg>
  );
}
