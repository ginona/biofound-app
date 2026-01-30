import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components";
import { fetchApi } from "@/lib/api";
import { CreatorProfile } from "@/lib/types";

interface CreatorPageProps {
  params: Promise<{ username: string }>;
}

async function getCreator(username: string): Promise<CreatorProfile | null> {
  try {
    return await fetchApi<CreatorProfile>(`/bio/${username}`);
  } catch {
    return null;
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { username } = await params;
  const creator = await getCreator(username);

  if (!creator) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link
            href="/directory"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            &larr; Back to Directory
          </Link>

          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {creator.displayName}
                </h1>
                <p className="text-gray-500">@{creator.username}</p>
              </div>
            </div>

            {/* Category & Location */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {creator.category}
              </span>
              {creator.city && creator.country && (
                <span className="text-gray-500 text-sm py-1">
                  {creator.city}, {creator.country}
                </span>
              )}
            </div>

            {/* Bio */}
            {creator.bio && (
              <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                {creator.bio}
              </p>
            )}

            {/* Tags */}
            {creator.tags && creator.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Links
              </h2>

              {creator.linkInstagram && (
                <a
                  href={creator.linkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-pink-500 font-medium">Instagram</span>
                </a>
              )}

              {creator.linkTwitter && (
                <a
                  href={creator.linkTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-blue-500 font-medium">Twitter</span>
                </a>
              )}

              {creator.linkOnlyfans && (
                <a
                  href={creator.linkOnlyfans}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-blue-400 font-medium">OnlyFans</span>
                </a>
              )}

              {creator.linkWebsite && (
                <a
                  href={creator.linkWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 font-medium">Website</span>
                </a>
              )}

              {!creator.linkInstagram &&
                !creator.linkTwitter &&
                !creator.linkOnlyfans &&
                !creator.linkWebsite && (
                  <p className="text-gray-400 text-sm">No links added yet</p>
                )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
