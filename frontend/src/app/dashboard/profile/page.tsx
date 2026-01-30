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
        <p className="text-gray-500">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>

      <div className="max-w-lg">
        <EditProfileForm profile={profile} backendToken={session.backendToken} />
      </div>
    </div>
  );
}
