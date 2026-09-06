import { useState, useEffect, useCallback } from 'react';

export type AdminRole = 'owner' | 'coach' | 'staff';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  lastLogin?: string;
  loginCount?: number;
}

const TOKEN_KEY = 'challengers_jwt';
const REMEMBER_KEY = 'challengers_remember';

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

function storeToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_KEY, 'true');
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
}

function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return getStoredToken();
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchMe = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return null;
    }
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        clearStoredToken();
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return null;
      }
      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return data.user;
    } catch {
      clearStoredToken();
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = useCallback(async (token: string, remember: boolean) => {
    storeToken(token, remember);
    await fetchMe();
  }, [fetchMe]);

  const logout = useCallback(async () => {
    const token = getStoredToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch { /* ignore */ }
    }
    clearStoredToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    getToken: getStoredToken,
    role: user?.role ?? null,
    isOwner: user?.role === 'owner',
    isCoach: user?.role === 'coach' || user?.role === 'owner',
  };
}
