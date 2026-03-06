const STORAGE_KEY = "ep_recently_viewed";
const MAX_ITEMS = 8;

export function addRecentlyViewed(productId: string): void {
  try {
    const ids = getRecentlyViewedIds();
    const filtered = ids.filter(id => id !== productId);
    filtered.unshift(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

export function getRecentlyViewedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
