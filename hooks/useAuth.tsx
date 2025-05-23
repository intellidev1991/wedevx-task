"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import {
  getUserFromStorage,
  setUserStorage,
  clearUserStorage,
  login,
} from "@/lib/auth";

// ApiContext definition
interface ApiContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  setUser: (user: User | null) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <ApiContext.Provider value={auth}>{children}</ApiContext.Provider>;
}

export function useAuth() {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useAuth must be used within an ApiProvider");
  return context;
}

// Internal hook for auth logic
function useProvideAuth(): ApiContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getUserFromStorage();
    setUser(loggedInUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        setUserStorage(user);
        setUser(user);
        router.push("/admin");
        return { success: true };
      }
      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    clearUserStorage();
    setUser(null);
    router.push("/login");
  };

  return { user, loading, signIn, signOut, setUser };
}
