/**
 * Room ID utilities.
 *
 * Rules:
 *  - Lowercase alphanumeric, hyphens (-), and underscores (_) only
 *  - 1–50 characters
 */

/**
 * Generate a random 12-char lowercase alphanumeric room id.
 * ~4.7 × 10^18 possible values.
 */
export function generateRoomId() {
  // crypto.getRandomValues gives better entropy than Math.random
  const arr = new Uint8Array(12);
  crypto.getRandomValues(arr);
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(arr, (b) => chars[b % chars.length]).join("");
}

/**
 * Strip characters that are not allowed and lowercase the result.
 * Useful for suggesting a "fixed" version of an invalid room name.
 */
export function sanitizeRoomId(id) {
  return (id || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 50);
}
