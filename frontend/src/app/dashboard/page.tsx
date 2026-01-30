import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchWithAuth } from "@/lib/api";
import { CreatorProfile, ProfileExistsResponse } from "@/lib/types";

async function getProfile(backendToken: string): Promise<CreatorProfile | null> {
  try {
    return await fetchWithAuth<CreatorProfile>("/profile", backendToken);
  } catch {
    return null;
  }
}

async function checkProfileExists(backendToken: string): Promise<boolean> {
  try {
    const { exists } = await fetchWithAuth<ProfileExistsResponse>(
      "/profile/exists",
      backendToken
    );
    return exists;
  } catch {
    return false;
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.backendToken) {
    redirect("/auth/signin");
  }

  const profile = await getProfile(session.backendToken);

  // If no profile, check if it exists and redirect to onboarding if needed
  if (!profile) {
    const exists = await checkProfileExists(session.backendToken);
    if (!exists) {
      redirect("/onboarding");
    }
    // Profile exists but failed to load - show error
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Unable to load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <Link
          href={`/bio/${profile.username}`}
          className="text-sm text-primary hover:underline"
          target="_blank"
        >
          View Public Profile &rarr;
        </Link>
      </div>

      {/* Profile Summary */}
      <div className="bg-card rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-semibold text-muted-foreground">
            {profile.displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {profile.displayName}
            </h2>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium text-foreground">{profile.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium text-foreground">
              {profile.city && profile.country
                ? `${profile.city}, ${profile.country}`
                : "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Links</p>
            <p className="font-medium text-foreground">
              {[
                profile.linkInstagram,
                profile.linkTwitter,
                profile.linkOnlyfans,
                profile.linkWebsite,
              ].filter(Boolean).length}{" "}
              added
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium text-foreground">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/profile"
          className="bg-card rounded-xl p-6 border border-border block"
        >
          <h3 className="font-semibold text-foreground mb-1">Edit Profile</h3>
          <p className="text-sm text-muted-foreground">
            Update your bio, links, and other details
          </p>
        </Link>

        <Link
          href="/directory"
          className="bg-card rounded-xl p-6 border border-border block"
        >
          <h3 className="font-semibold text-foreground mb-1">Browse Directory</h3>
          <p className="text-sm text-muted-foreground">
            Discover other creators in your niche
          </p>
        </Link>
      </div>
    </div>
  );
}
