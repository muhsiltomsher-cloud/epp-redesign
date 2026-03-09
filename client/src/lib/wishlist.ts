const STORAGE_KEY = "ep_wishlist";

export function getWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function toggleWishlist(productId: string): boolean {
  try {
    const ids = getWishlist();
    const index = ids.indexOf(productId);
    if (index > -1) {
      ids.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("wishlist-updated"));
      return false;
    } else {
      ids.push(productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("wishlist-updated"));
      return true;
    }
  } catch {
    return false;
  }
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().includes(productId);
}
