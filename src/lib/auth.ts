const STORAGE_KEY = "ep_auth";

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const SAMPLE_USER: UserProfile = {
  email: "customer@emiratespride.com",
  firstName: "Ahmed",
  lastName: "Al Maktoum",
  phone: "+971 50 123 4567",
};

export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function login(email: string, _password: string): UserProfile | null {
  // Sample login — accept any non-empty email/password
  if (!email || !_password) return null;
  const user: UserProfile = { ...SAMPLE_USER, email };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-updated"));
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("auth-updated"));
}

export function updateProfile(updates: Partial<UserProfile>): UserProfile | null {
  const user = getUser();
  if (!user) return null;
  const updated = { ...user, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("auth-updated"));
  return updated;
}
