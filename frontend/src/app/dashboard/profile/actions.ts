"use server";

import { revalidatePath } from "next/cache";
import { ProfileLink } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function updateProfile(
  backendToken: string,
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  const displayName = formData.get("displayName") as string;
  const category = formData.get("category") as string;
  const bio = formData.get("bio") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const linksJson = formData.get("links") as string;
  const longBio = formData.get("longBio") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const seoDescription = formData.get("seoDescription") as string;
  const backgroundTheme = formData.get("backgroundTheme") as string;

  // Parse and filter links (remove empty URLs)
  let links: ProfileLink[] = [];
  try {
    const parsed = JSON.parse(linksJson || "[]");
    links = parsed.filter((link: ProfileLink) => link.url && link.url.trim() !== "");
  } catch {
    links = [];
  }

  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${backendToken}`,
      },
      body: JSON.stringify({
        displayName,
        category,
        bio: bio || undefined,
        city: city || undefined,
        country: country || undefined,
        links,
        longBio: longBio || undefined,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
        backgroundTheme: backgroundTheme ? parseInt(backgroundTheme, 10) : undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.message || "Failed to update profile", success: false };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    return { error: null, success: true };
  } catch {
    return { error: "Network error. Please try again.", success: false };
  }
}
