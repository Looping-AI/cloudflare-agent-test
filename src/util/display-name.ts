/**
 * Pick the best available display name from Slack user fields.
 * Prefers display_name → real_name → name. Returns null if all are blank.
 */
export function pickDisplayName(
  displayName?: string | null,
  realName?: string | null,
  name?: string | null
): string | null {
  return displayName?.trim() || realName?.trim() || name?.trim() || null;
}
