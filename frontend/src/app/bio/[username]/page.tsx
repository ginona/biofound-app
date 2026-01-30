import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header, Footer, ProfileBackground } from "@/components";
import { fetchApi } from "@/lib/api";
import { CreatorProfile } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://biofound.app";

const CATEGORY_GRADIENTS: Record<string, string> = {
  fitness: "linear-gradient(135deg, #22c55e, #06b6d4)",
  cosplay: "linear-gradient(135deg, #ec4899, #6366f1)",
  artist: "linear-gradient(135deg, #f97316, #ef4444)",
  music: "linear-gradient(135deg, #ef4444, #a855f7)",
  gaming: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
  lifestyle: "linear-gradient(135deg, #06b6d4, #22c55e)",
  education: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  professional: "linear-gradient(135deg, #64748b, #475569)",
  model: "linear-gradient(135deg, #ec4899, #fb7185)",
  other: "linear-gradient(135deg, #8b5cf6, #a855f7)",
};

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

function generateJsonLd(creator: CreatorProfile) {
  const sameAs: string[] = [];
  if (creator.linkInstagram) sameAs.push(creator.linkInstagram);
  if (creator.linkTwitter) sameAs.push(creator.linkTwitter);
  if (creator.linkOnlyfans) sameAs.push(creator.linkOnlyfans);
  if (creator.linkWebsite) sameAs.push(creator.linkWebsite);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: creator.displayName,
    url: `${BASE_URL}/bio/${creator.username}`,
    jobTitle: `${creator.category} Creator`,
  };

  if (creator.longBio) {
    jsonLd.description = creator.longBio;
  } else if (creator.bio) {
    jsonLd.description = creator.bio;
  }

  if (creator.city || creator.country) {
    const address: Record<string, string> = {
      "@type": "PostalAddress",
    };
    if (creator.city) address.addressLocality = creator.city;
    if (creator.country) address.addressCountry = creator.country;
    jsonLd.address = address;
  }

  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return jsonLd;
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { username } = await params;
  const creator = await getCreator(username);

  if (!creator) {
    return {
      title: "Creator Not Found | BioFound",
      description: "This creator profile does not exist.",
      robots: { index: false, follow: false },
    };
  }

  // Build title with fallback
  const location = creator.city && creator.country
    ? ` in ${creator.city}`
    : "";
  const title = creator.seoTitle ||
    `${creator.displayName} - ${creator.category} Creator${location} | BioFound`;

  // Build description with fallback
  const description = creator.seoDescription ||
    (creator.longBio ? creator.longBio.substring(0, 160) : null) ||
    (creator.bio ? creator.bio.substring(0, 160) : null) ||
    `Discover ${creator.displayName}, a ${creator.category} creator on BioFound.`;

  // Build keywords from tags
  const keywords = creator.tags?.length
    ? [...creator.tags, creator.category, "creator", "onlyfans", "content creator"].join(", ")
    : `${creator.category}, creator, onlyfans, content creator`;

  const url = `${BASE_URL}/bio/${username}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: creator.displayName }],
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "BioFound",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { username } = await params;
  const creator = await getCreator(username);

  if (!creator) {
    notFound();
  }

  const jsonLd = generateJsonLd(creator);
  const hasLinks =
    creator.linkInstagram ||
    creator.linkTwitter ||
    creator.linkOnlyfans ||
    creator.linkWebsite;

  const avatarGradient = CATEGORY_GRADIENTS[creator.category.toLowerCase()] || CATEGORY_GRADIENTS.other;
  const hasTags = creator.tags && creator.tags.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileBackground theme={creator.backgroundTheme ?? 0} category={creator.category} />
      <Header />

      <main className="flex-1 pt-16 sm:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 relative" style={{ zIndex: 1 }}>
        <article className="max-w-2xl mx-auto relative">
          {/* Floating Avatar */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg"
            style={{ background: avatarGradient }}
          >
            {creator.displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl pt-16 sm:pt-18 pb-5 sm:pb-6 px-5 sm:px-6 text-left">
            {/* Header Info */}
            <div className="text-center mb-5">
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                {creator.displayName}
              </h1>
              <p className="text-sm text-muted-foreground">@{creator.username}</p>
              {creator.city && creator.country && (
                <p className="text-xs text-muted-foreground mt-1">
                  {creator.city}, {creator.country}
                </p>
              )}
            </div>

            {/* Bio Section */}
            <section className="mb-5">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {creator.longBio || creator.bio || "No bio available."}
              </p>
            </section>

            {/* Tags Section (with category as first tag) */}
            <section className="mb-5">
              <ul className="flex flex-wrap gap-2">
                <li className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground">
                  {creator.category}
                </li>
                {hasTags && creator.tags!.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {/* Links Section */}
            {hasLinks && (
              <section className="pt-4 border-t border-border">
                <ul className="space-y-2">
                  {creator.linkOnlyfans && (
                    <li>
                      <a
                        href={creator.linkOnlyfans}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-between min-h-11 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
                      >
                        Subscribe on OnlyFans
                        <span className="text-primary-foreground/80">&#8599;</span>
                      </a>
                    </li>
                  )}

                  {creator.linkInstagram && (
                    <li>
                      <a
                        href={creator.linkInstagram}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-between min-h-11 px-4 bg-secondary border border-border rounded-xl text-sm text-foreground hover:bg-secondary/80"
                      >
                        <span className="font-medium">Instagram</span>
                        <span className="text-muted-foreground">&#8599;</span>
                      </a>
                    </li>
                  )}

                  {creator.linkTwitter && (
                    <li>
                      <a
                        href={creator.linkTwitter}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-between min-h-11 px-4 bg-secondary border border-border rounded-xl text-sm text-foreground hover:bg-secondary/80"
                      >
                        <span className="font-medium">Twitter / X</span>
                        <span className="text-muted-foreground">&#8599;</span>
                      </a>
                    </li>
                  )}

                  {creator.linkWebsite && (
                    <li>
                      <a
                        href={creator.linkWebsite}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-between min-h-11 px-4 bg-secondary border border-border rounded-xl text-sm text-foreground hover:bg-secondary/80"
                      >
                        <span className="font-medium">Website</span>
                        <span className="text-muted-foreground">&#8599;</span>
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
