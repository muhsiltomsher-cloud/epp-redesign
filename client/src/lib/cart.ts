const STORAGE_KEY = "ep_cart";

export interface CartItem {
  productId: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addToCart(productId: string, qty: number = 1): CartItem[] {
  try {
    const items = getCart();
    const existing = items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ productId, quantity: qty });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
    return items;
  } catch {
    return [];
  }
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
