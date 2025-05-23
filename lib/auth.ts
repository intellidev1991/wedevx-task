import { User } from "@/types";

const MOCK_USER: User = {
  id: "1",
  email: "admin@alma.ai",
  name: "Admin",
  role: "admin",
};

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  if (email === "admin@alma.com" && password === "password123") {
    return MOCK_USER;
  }
  return null;
}

export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;

  const userJson = localStorage.getItem("user");
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

export function setUserStorage(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearUserStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
}

export function isAuthenticated(): boolean {
  return getUserFromStorage() !== null;
}
