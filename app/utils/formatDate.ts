export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Format: "May 14, 2025 at 12:25 PM"
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}
