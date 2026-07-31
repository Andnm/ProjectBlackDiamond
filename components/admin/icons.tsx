export function EditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M16.862 4.487a2.1 2.1 0 0 1 2.97 2.97L9.06 18.229l-4.243 1.06 1.06-4.243L16.862 4.487Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m15 6.5 2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c2.5 2.4 3.9 5.4 3.9 8.5s-1.4 6.1-3.9 8.5c-2.5-2.4-3.9-5.4-3.9-8.5S9.5 5.9 12 3.5Z" />
      <path d="M3.8 9.5h16.4M3.8 14.5h16.4" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.8 12.1a2 2 0 0 1-2 1.9H9.8a2 2 0 0 1-2-1.9L7 7h10Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
