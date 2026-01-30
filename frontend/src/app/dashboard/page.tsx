import Link from "next/link";
import { auth } from "@/auth";
import { fetchWithAuth } from "@/lib/api";
import { CreatorProfile } from "@/lib/types";

async function getProfile(backendToken: string): Promise<CreatorProfile | null> {
  try {
    return await fetchWithAuth<CreatorProfile>("/profile", backendToken);
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  const profile = session?.backendToken
    ? await getProfile(session.backendToken)
    : null;

  if (!profile) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href={`/bio/${profile.username}`}
          className="text-sm text-blue-600 hover:text-blue-700"
          target="_blank"
        >
          View Public Profile &rarr;
        </Link>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.displayName}
            </h2>
            <p className="text-gray-500">@{profile.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{profile.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">
              {profile.city && profile.country
                ? `${profile.city}, ${profile.country}`
                : "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Links</p>
            <p className="font-medium">
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
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/profile"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Edit Profile</h3>
          <p className="text-sm text-gray-500">
            Update your bio, links, and other details
          </p>
        </Link>

        <Link
          href="/directory"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Browse Directory</h3>
          <p className="text-sm text-gray-500">
            Discover other creators in your niche
          </p>
        </Link>
      </div>
    </div>
  );
}
