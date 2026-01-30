import { auth } from "@/auth";
import { fetchWithAuth } from "@/lib/api";
import { CreatorProfile } from "@/lib/types";
import { EditProfileForm } from "./EditProfileForm";

async function getProfile(backendToken: string): Promise<CreatorProfile | null> {
  try {
    return await fetchWithAuth<CreatorProfile>("/profile", backendToken);
  } catch {
    return null;
  }
}

export default async function EditProfilePage() {
  const session = await auth();
  const profile = session?.backendToken
    ? await getProfile(session.backendToken)
    : null;

  if (!profile || !session?.backendToken) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-foreground mb-8">Edit Profile</h1>

      <div className="max-w-2xl mx-auto w-full">
        <EditProfileForm profile={profile} backendToken={session.backendToken} />
      </div>
    </div>
  );
}
