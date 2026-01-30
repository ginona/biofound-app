"use server";

import { revalidatePath } from "next/cache";

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
  const linkInstagram = formData.get("linkInstagram") as string;
  const linkTwitter = formData.get("linkTwitter") as string;
  const linkOnlyfans = formData.get("linkOnlyfans") as string;
  const linkWebsite = formData.get("linkWebsite") as string;

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
        linkInstagram: linkInstagram || undefined,
        linkTwitter: linkTwitter || undefined,
        linkOnlyfans: linkOnlyfans || undefined,
        linkWebsite: linkWebsite || undefined,
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
