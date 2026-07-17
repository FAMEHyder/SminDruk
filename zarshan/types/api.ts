// Types mirroring the Zarshan backend API response shapes (see zarshan-backend/models).

export interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: "user" | "admin" | "superadmin";
  isEmailVerified: boolean;
  activeWorkspace?: string;
  createdAt: string;
}

export interface ApiWorkspace {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  owner: string;
  plan: "free" | "starter" | "professional" | "agency" | "enterprise";
  isActive: boolean;
  createdAt: string;
}

export type PostType = "text" | "image" | "carousel" | "video" | "reel" | "story";
export type PostStatus = "draft" | "scheduled" | "publishing" | "published" | "failed";
export type ApiPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "x"
  | "tiktok"
  | "pinterest"
  | "youtube"
  | "threads"
  | "bluesky"
  | "mastodon"
  | "google_business";

export interface ApiSocialAccount {
  _id: string;
  workspace: string;
  platform: ApiPlatform;
  accountId: string;
  accountName: string;
  category?: string;
  avatar?: string;
  status: "connected" | "disconnected" | "expired" | "error";
  lastSyncedAt?: string;
  createdAt: string;
}

export interface ApiPost {
  _id: string;
  workspace: string;
  createdBy: string;
  type: PostType;
  content: string;
  media: ApiMedia[] | string[];
  platforms: ApiPlatform[];
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  retryCount: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiMedia {
  _id: string;
  workspace: string;
  fileName: string;
  fileType: "image" | "video";
  mimeType: string;
  url: string;
  publicId: string;
  size?: number;
  width?: number;
  height?: number;
  createdAt: string;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ApiAnalyticsTotals {
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  impressions: number;
  clicks: number;
  followers: number;
}

export interface ApiNotification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiPostStats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
  failed: number;
  liveLinks: number;
}

export interface ApiPagePost {
  _id: string;
  workspace: string;
  post?: {
    _id: string;
    content?: string;
    type?: PostType;
    publishedAt?: string;
    status?: PostStatus;
  } | string;
  pageName: string;
  pageId: string;
  platformPostId?: string;
  postLink?: string;
  postContent?: string;
  success: boolean;
  error?: string;
  createdAt: string;
}

export interface ApiTrendingMeta {
  maxPageNumber: number;
  totalPages: number;
  categories: string[];
}

export interface ApiConnectedPage {
  _id: string;
  workspace: string;
  pageId: string;
  pageName: string;
  pageNumber: number;
  profilePicture?: string;
  category?: string;
  status: "connected" | "disconnected" | "expired" | "error";
  createdAt: string;
}

export interface ApiSecretKeyPost {
  _id: string;
  secretKey?: string;
  pageId: string;
  pageNumber?: number;
  pageName: string;
  pageDp?: string;
  postLink?: string;
  postContent?: string;
  platformPostId?: string;
  createdAt: string;
}
