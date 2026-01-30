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
  linkInstagram: string | null;
  linkTwitter: string | null;
  linkOnlyfans: string | null;
  linkWebsite: string | null;
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
