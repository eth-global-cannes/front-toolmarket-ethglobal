export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
      bg-orange-600 text-white px-4 py-2 rounded-md z-50 
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
      transition-all duration-200"
    >
      Skip to main content
    </a>
  );
}
