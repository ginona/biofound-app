import { MetadataRoute } from "next";
import { PaginatedResult, CreatorProfile } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://biofound.app";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function getAllCreators(): Promise<CreatorProfile[]> {
  try {
    // Fetch all creators with a high limit for sitemap
    const res = await fetch(`${API_URL}/directory?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) return [];

    const data: PaginatedResult<CreatorProfile> = await res.json();
    return data.data;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const creators = await getAllCreators();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/directory`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic creator profile pages
  const creatorPages: MetadataRoute.Sitemap = creators.map((creator) => ({
    url: `${BASE_URL}/bio/${creator.username}`,
    lastModified: new Date(creator.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...creatorPages];
}
