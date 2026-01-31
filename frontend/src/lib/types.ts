export type LinkType =
  | "instagram"
  | "twitter"
  | "tiktok"
  | "onlyfans"
  | "fansly"
  | "youtube"
  | "twitch"
  | "linkedin"
  | "github"
  | "website"
  | "custom";

export interface ProfileLink {
  type: LinkType;
  url: string;
  label?: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio: string | null;
  category: string;
  tags: string[] | null;
  city: string | null;
  country: string | null;
  links: ProfileLink[];
  // SEO Fields
  seoTitle: string | null;
  seoDescription: string | null;
  longBio: string | null;
  // Theme
  backgroundTheme: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProfileExistsResponse {
  exists: boolean;
}
