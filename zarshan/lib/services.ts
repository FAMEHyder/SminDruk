import { api, getApiBaseUrl } from "@/lib/api";
import type {
  ApiAnalyticsTotals,
  ApiMedia,
  ApiNotification,
  ApiPagePost,
  ApiPlatform,
  ApiPost,
  ApiPostStats,
  ApiSecretKeyPost,
  ApiTrendingMeta,
  ApiConnectedPage,
  ApiSocialAccount,
  ApiUser,
  ApiWorkspace,
  PostStatus,
  PostType,
} from "@/types/api";

// ---------- Auth ----------
export interface RegisterResult {
  user: ApiUser;
  emailSent: boolean;
  /** Only present when no SMTP is configured on the backend yet (local/dev convenience). */
  devVerificationCode?: string;
}

export const authApi = {
  register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
    api.post<RegisterResult>("/auth/register", data, { auth: false }),

  login: (data: { email: string; password: string }) =>
    api.post<{ user: ApiUser; accessToken: string; refreshToken: string }>("/auth/login", data, {
      auth: false,
    }),

  logout: (refreshToken: string) => api.post("/auth/logout", { refreshToken }),

  forgotPassword: (email: string) =>
    api.post<{ emailSent: boolean; devResetToken?: string }>(
      "/auth/forgot-password",
      { email },
      { auth: false }
    ),

  resetPassword: (data: { token: string; password: string }) =>
    api.post("/auth/reset-password", data, { auth: false }),

  verifyEmail: (data: { email: string; code: string }) =>
    api.post<{ user: ApiUser; accessToken: string; refreshToken: string }>("/auth/verify-email", data, {
      auth: false,
    }),

  resendVerification: (email: string) =>
    api.post<{ emailSent: boolean; devVerificationCode?: string }>(
      "/auth/resend-verification",
      { email },
      { auth: false }
    ),
};

// ---------- Users ----------
export const userApi = {
  me: () => api.get<ApiUser>("/users/me"),
  updateProfile: (data: { firstName?: string; lastName?: string; bio?: string }) =>
    api.patch<ApiUser>("/users/me", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch("/users/me/password", data),
  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append("avatar", file);
    return api.post<ApiUser>("/users/me/avatar", form);
  },
};

// ---------- Workspaces ----------
export const workspaceApi = {
  list: () => api.get<ApiWorkspace[]>("/workspaces"),
  create: (data: { name: string; description?: string }) => api.post<ApiWorkspace>("/workspaces", data),
  invite: (workspaceId: string, data: { email: string; role: "admin" | "editor" | "viewer" }) =>
    api.post(`/workspaces/${workspaceId}/invite`, data),
};

// ---------- Teams ----------
export const teamApi = {
  members: (workspaceId: string) => api.get(`/teams/${workspaceId}`),
};

// ---------- Posts ----------
export const postApi = {
  stats: (workspaceId: string) => api.get<ApiPostStats>(`/posts/stats?workspaceId=${workspaceId}`),
  pageLinks: (workspaceId: string, page = 1, limit = 100) =>
    api.get<ApiPagePost[]>(`/posts/page-links?workspaceId=${workspaceId}&page=${page}&limit=${limit}`),
  list: (params: { workspaceId: string; status?: PostStatus; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    query.set("workspaceId", params.workspaceId);
    if (params.status) query.set("status", params.status);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    return api.get<ApiPost[]>(`/posts?${query.toString()}`);
  },
  create: (data: {
    workspaceId: string;
    type: PostType;
    content: string;
    platforms: ApiPlatform[];
    mediaIds?: string[];
    socialAccountIds?: string[];
    scheduledAt?: string;
    status?: PostStatus;
  }) => api.post<ApiPost>("/posts", data),
  publishNow: (id: string) => api.post<ApiPost>(`/posts/${id}/publish`),
  remove: (id: string) => api.delete(`/posts/${id}`),
};

// ---------- Media ----------
export const mediaApi = {
  upload: (workspaceId: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("workspaceId", workspaceId);
    return api.post<ApiMedia>("/media/upload", form);
  },
  list: (workspaceId: string) => api.get<ApiMedia[]>(`/media?workspaceId=${workspaceId}`),
};

// ---------- AI ----------
export const aiApi = {
  caption: (data: { prompt: string; tone?: string; platform?: string }) =>
    api.post<{ caption: string }>("/ai/caption", data),
  hashtags: (data: { prompt: string }) => api.post<{ hashtags: string }>("/ai/hashtags", data),
  rewrite: (data: { text: string; tone?: string }) => api.post<{ rewritten: string }>("/ai/rewrite", data),
  translate: (data: { text: string; targetLanguage: string }) =>
    api.post<{ translated: string }>("/ai/translate", data),
  contentIdeas: (data: { prompt: string }) => api.post<{ ideas: string }>("/ai/content-ideas", data),
};

// ---------- Analytics ----------
export const analyticsApi = {
  report: (params: { workspaceId: string; period?: "daily" | "weekly" | "monthly" }) => {
    const query = new URLSearchParams({ workspaceId: params.workspaceId, period: params.period || "daily" });
    return api.get<{ records: unknown[]; totals: ApiAnalyticsTotals }>(`/analytics?${query.toString()}`);
  },
};

// ---------- Social Accounts ----------
export const socialAccountApi = {
  list: (workspaceId: string) => api.get<ApiSocialAccount[]>(`/social-accounts?workspaceId=${workspaceId}`),
  disconnect: (id: string) => api.delete(`/social-accounts/${id}`),
  /**
   * Facebook Pages use a plain browser redirect (Facebook itself redirects back
   * to our API, not to this SPA), so this returns a URL to navigate to rather
   * than making a fetch call — the workspace/user id travel in the query string.
   */
  facebookConnectUrl: (workspaceId: string, userId: string, connectMode: "manage" | "trending" = "manage") =>
    `${getApiBaseUrl()}/social-accounts/facebook/connect?workspaceId=${workspaceId}&userId=${userId}&connectMode=${connectMode}`,
};

// ---------- Connected Pages (Trending dataset) ----------
export const connectedPageApi = {
  trendingMeta: () => api.get<ApiTrendingMeta>("/connected-pages/trending-meta"),
  list: (workspaceId: string) =>
    api.get<{ pages: ApiConnectedPage[]; maxPageNumber: number }>(`/connected-pages?workspaceId=${workspaceId}`),
  bulkPost: (data: {
    workspaceId: string;
    secretKey: string;
    content: string;
    fromPage: number;
    toPage: number;
    category?: string;
    postType?: "text" | "photo" | "video" | "reel" | "story";
    scheduledAt?: string;
    mediaId?: string;
  }) => api.post("/connected-pages/bulk-post", data),
  fetchPostsBySecretKey: (secretKey: string) =>
    api.post<ApiSecretKeyPost[]>("/connected-pages/posts/fetch", { secretKey }),
  disconnect: (id: string) => api.delete(`/connected-pages/${id}`),
};

// ---------- Notifications ----------
export const notificationApi = {
  list: () => api.get<ApiNotification[]>("/notifications"),
  markAllRead: () => api.patch("/notifications/read-all"),
};
