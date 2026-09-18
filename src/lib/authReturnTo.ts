/**
 * Helper to get and validate the return destination URL or path after authentication.
 */
export function safeReturnTo(fallback = "/dashboard"): string {
  try {
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo");

    if (returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")) {
      return returnTo;
    }
  } catch {
    // fallback if window is undefined or url parse error
  }
  return fallback;
}
