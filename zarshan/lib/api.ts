/** Local backend (npm run dev on port 8000) */
const API_BASE_URL_LOCAL =
  process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:8000/api/v1";

/** Live backend on Railway */
const API_BASE_URL_LIVE =
  process.env.NEXT_PUBLIC_API_URL_LIVE || "https://smindruk.up.railway.app/api/v1";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/** Live frontend on Vercel */
const FRONTEND_URL_LIVE = process.env.NEXT_PUBLIC_FRONTEND_URL_LIVE || "https://smindruk.vercel.app";

/**
 * Picks the correct backend automatically:
 * - Browser on localhost  → local backend
 * - Browser on Vercel     → live Railway backend
 * - SSR on Vercel build   → live backend (NODE_ENV=production)
 * - SSR during next dev   → local backend
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return LOCAL_HOSTS.has(window.location.hostname) ? API_BASE_URL_LOCAL : API_BASE_URL_LIVE;
  }
  return process.env.NODE_ENV === "production" ? API_BASE_URL_LIVE : API_BASE_URL_LOCAL;
}

const ACCESS_TOKEN_KEY = "zarshan_access_token";
const REFRESH_TOKEN_KEY = "zarshan_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export class ApiRequestError extends Error {
  statusCode: number;
  errors: { field?: string; message: string }[];

  constructor(statusCode: number, message: string, errors: { field?: string; message: string }[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  auth?: boolean; // attach Bearer token (default: true)
  skipRetry?: boolean; // internal flag to avoid infinite refresh loops
}

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const baseUrl = getApiBaseUrl();

  if (!refreshPromise) {
    refreshPromise = fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) return false;
        const json = await res.json();
        setTokens(json.data.accessToken, json.data.refreshToken);
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function apiRequest<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = true, skipRetry = false, headers, ...rest } = options;

  const finalHeaders: HeadersInit = {
    ...(rest.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...headers,
  };

  if (auth) {
    const token = getAccessToken();
    if (token) {
      (finalHeaders as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers: finalHeaders,
  });

  // Access token expired — try a silent refresh once, then retry the original request.
  if (res.status === 401 && auth && !skipRetry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, skipRetry: true });
    }
    clearTokens();
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiRequestError(res.status, body?.message || res.statusText || "Request failed", body?.errors || []);
  }

  return (body?.data ?? body) as T;
}

export const api = {
  get: <T = unknown>(path: string, options?: RequestOptions) => apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T = unknown>(path: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, {
      ...options,
      method: "POST",
      body: data instanceof FormData ? data : data !== undefined ? JSON.stringify(data) : undefined,
    }),
  patch: <T = unknown>(path: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, {
      ...options,
      method: "PATCH",
      body: data instanceof FormData ? data : data !== undefined ? JSON.stringify(data) : undefined,
    }),
  delete: <T = unknown>(path: string, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};

export { API_BASE_URL_LOCAL, API_BASE_URL_LIVE, FRONTEND_URL_LIVE };
