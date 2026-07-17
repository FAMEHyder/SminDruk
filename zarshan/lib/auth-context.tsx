"use client";

import * as React from "react";
import { clearTokens, getAccessToken, setTokens } from "@/lib/api";
import { authApi, userApi, workspaceApi, type RegisterResult } from "@/lib/services";
import type { ApiUser, ApiWorkspace } from "@/types/api";

interface AuthContextValue {
  user: ApiUser | null;
  workspace: ApiWorkspace | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<RegisterResult>;
  loginWithTokens: (accessToken: string, refreshToken: string, user: ApiUser) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  reloadSession: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const REFRESH_TOKEN_KEY = "zarshan_refresh_token";

/** Ensures the logged-in user always has at least one workspace to work in. */
async function ensureWorkspace(user: ApiUser): Promise<ApiWorkspace | null> {
  const workspaces = await workspaceApi.list();
  if (workspaces.length > 0) {
    return workspaces.find((w) => w._id === user.activeWorkspace) || workspaces[0];
  }
  return workspaceApi.create({ name: `${user.firstName}'s Workspace` });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<ApiUser | null>(null);
  const [workspace, setWorkspace] = React.useState<ApiWorkspace | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadSession = React.useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await userApi.me();
      setUser(me);
      const ws = await ensureWorkspace(me);
      setWorkspace(ws);
    } catch {
      clearTokens();
      setUser(null);
      setWorkspace(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = React.useCallback(async (email: string, password: string) => {
    const result = await authApi.login({ email, password });
    setTokens(result.accessToken, result.refreshToken);
    setUser(result.user);
    const ws = await ensureWorkspace(result.user);
    setWorkspace(ws);
  }, []);

  const register = React.useCallback(
    async (data: { firstName: string; lastName: string; email: string; password: string }) => {
      return authApi.register(data);
    },
    []
  );

  /** Used after email verification, which also returns fresh tokens. */
  const loginWithTokens = React.useCallback(async (accessToken: string, refreshToken: string, verifiedUser: ApiUser) => {
    setTokens(accessToken, refreshToken);
    setUser(verifiedUser);
    const ws = await ensureWorkspace(verifiedUser);
    setWorkspace(ws);
  }, []);

  const logout = React.useCallback(async () => {
    const refreshToken = typeof window !== "undefined" ? window.localStorage.getItem(REFRESH_TOKEN_KEY) : null;
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } catch {
      // best-effort — still clear local session even if the request fails
    }
    clearTokens();
    setUser(null);
    setWorkspace(null);
  }, []);

  const refreshUser = React.useCallback(async () => {
    const me = await userApi.me();
    setUser(me);
  }, []);

  const reloadSession = React.useCallback(async () => {
    setLoading(true);
    await loadSession();
  }, [loadSession]);

  const value = React.useMemo(
    () => ({ user, workspace, loading, login, register, loginWithTokens, logout, refreshUser, reloadSession }),
    [user, workspace, loading, login, register, loginWithTokens, logout, refreshUser, reloadSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
