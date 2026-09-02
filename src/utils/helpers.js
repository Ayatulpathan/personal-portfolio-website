export function formatDate(dateString) {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  
  // Format YYYY-MM or ISO timestamp
  try {
    const parts = dateString.split("-");
    if (parts.length === 2) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  } catch (e) {
    return dateString;
  }
  return dateString;
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function generateId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}
