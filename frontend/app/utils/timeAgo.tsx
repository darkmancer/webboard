export function timeAgo(isoDateString: string): string {
  const date = new Date(isoDateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 5) {
    return "just now";
  }
  if (diffSec < 60) {
    return `${diffSec} sec${diffSec > 1 ? "s" : ""} ago`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} mo.${diffMonths > 1 ? "s" : ""} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}
