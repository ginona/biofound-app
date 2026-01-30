"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface ActionState {
  error: string | null;
  success: boolean;
}

export async function createProfile(
  backendToken: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = formData.get("username") as string;
  const displayName = formData.get("displayName") as string;
  const category = formData.get("category") as string;
  const bio = formData.get("bio") as string;
  const longBio = formData.get("longBio") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${backendToken}`,
      },
      body: JSON.stringify({
        username,
        displayName,
        category,
        bio: bio || undefined,
        longBio: longBio || undefined,
        city: city || undefined,
        country: country || undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.message || "Failed to create profile", success: false };
    }

    return { error: null, success: true };
  } catch {
    return { error: "Network error. Please try again.", success: false };
  }
}
