"use client";

import { useActionState, useState } from "react";
import { CreatorProfile, ProfileLink, LinkType } from "@/lib/types";
import { updateProfile } from "./actions";

// Whitelist of allowed domains grouped by platform type
const ALLOWED_DOMAINS: Record<string, { type: LinkType; label: string; domains: string[] }> = {
  // Social Media
  instagram: {
    type: "instagram",
    label: "Instagram",
    domains: ["instagram.com", "www.instagram.com"],
  },
  twitter: {
    type: "twitter",
    label: "Twitter / X",
    domains: ["twitter.com", "www.twitter.com", "x.com", "www.x.com"],
  },
  tiktok: {
    type: "tiktok",
    label: "TikTok",
    domains: ["tiktok.com", "www.tiktok.com", "vm.tiktok.com"],
  },
  youtube: {
    type: "youtube",
    label: "YouTube",
    domains: ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"],
  },
  twitch: {
    type: "twitch",
    label: "Twitch",
    domains: ["twitch.tv", "www.twitch.tv"],
  },
  linkedin: {
    type: "linkedin",
    label: "LinkedIn",
    domains: ["linkedin.com", "www.linkedin.com"],
  },
  facebook: {
    type: "website",
    label: "Facebook",
    domains: ["facebook.com", "www.facebook.com", "fb.com", "m.facebook.com"],
  },
  threads: {
    type: "website",
    label: "Threads",
    domains: ["threads.net", "www.threads.net"],
  },
  snapchat: {
    type: "website",
    label: "Snapchat",
    domains: ["snapchat.com", "www.snapchat.com"],
  },
  pinterest: {
    type: "website",
    label: "Pinterest",
    domains: ["pinterest.com", "www.pinterest.com", "pin.it"],
  },
  reddit: {
    type: "website",
    label: "Reddit",
    domains: ["reddit.com", "www.reddit.com"],
  },
  // Content/Creator Platforms
  onlyfans: {
    type: "onlyfans",
    label: "OnlyFans",
    domains: ["onlyfans.com", "www.onlyfans.com"],
  },
  fansly: {
    type: "fansly",
    label: "Fansly",
    domains: ["fansly.com", "www.fansly.com"],
  },
  patreon: {
    type: "website",
    label: "Patreon",
    domains: ["patreon.com", "www.patreon.com"],
  },
  kofi: {
    type: "website",
    label: "Ko-fi",
    domains: ["ko-fi.com", "www.ko-fi.com"],
  },
  buymeacoffee: {
    type: "website",
    label: "Buy Me a Coffee",
    domains: ["buymeacoffee.com", "www.buymeacoffee.com"],
  },
  cafecito: {
    type: "website",
    label: "Cafecito",
    domains: ["cafecito.app", "www.cafecito.app"],
  },
  gumroad: {
    type: "website",
    label: "Gumroad",
    domains: ["gumroad.com", "www.gumroad.com"],
  },
  linktree: {
    type: "website",
    label: "Linktree",
    domains: ["linktr.ee", "www.linktr.ee"],
  },
  beacons: {
    type: "website",
    label: "Beacons",
    domains: ["beacons.ai", "www.beacons.ai"],
  },
  // Professional
  github: {
    type: "github",
    label: "GitHub",
    domains: ["github.com", "www.github.com"],
  },
  behance: {
    type: "website",
    label: "Behance",
    domains: ["behance.net", "www.behance.net"],
  },
  dribbble: {
    type: "website",
    label: "Dribbble",
    domains: ["dribbble.com", "www.dribbble.com"],
  },
  medium: {
    type: "website",
    label: "Medium",
    domains: ["medium.com", "www.medium.com"],
  },
  substack: {
    type: "website",
    label: "Substack",
    domains: ["substack.com"],
  },
  // Music
  spotify: {
    type: "website",
    label: "Spotify",
    domains: ["spotify.com", "www.spotify.com", "open.spotify.com"],
  },
  soundcloud: {
    type: "website",
    label: "SoundCloud",
    domains: ["soundcloud.com", "www.soundcloud.com"],
  },
  bandcamp: {
    type: "website",
    label: "Bandcamp",
    domains: ["bandcamp.com"],
  },
  applemusic: {
    type: "website",
    label: "Apple Music",
    domains: ["music.apple.com"],
  },
  // Messaging (profile links)
  discord: {
    type: "website",
    label: "Discord",
    domains: ["discord.gg", "discord.com", "www.discord.com"],
  },
  telegram: {
    type: "website",
    label: "Telegram",
    domains: ["t.me", "telegram.me"],
  },
};

function getDomainFromUrl(url: string): string | null {
  try {
    const normalized = url.includes("://") ? url : `https://${url}`;
    const urlObj = new URL(normalized);
    return urlObj.hostname.toLowerCase();
  } catch {
    return null;
  }
}

function detectPlatformFromDomain(url: string): { platform: string; type: LinkType; label: string } | null {
  const domain = getDomainFromUrl(url);
  if (!domain) return null;

  for (const [platform, config] of Object.entries(ALLOWED_DOMAINS)) {
    if (config.domains.some(d => domain === d || domain.endsWith(`.${d}`))) {
      return { platform, type: config.type, label: config.label };
    }
  }
  return null;
}

function isAllowedDomain(url: string): boolean {
  return detectPlatformFromDomain(url) !== null;
}

function normalizeUrl(url: string): string {
  if (!url) return url;
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const CATEGORIES = [
  "Model",
  "Fitness",
  "Cosplay",
  "Artist",
  "Music",
  "Gaming",
  "Lifestyle",
  "Education",
  "Professional",
  "Other",
];

const BACKGROUND_THEMES = [
  { value: 0, label: "Aurora", description: "Flowing gradient (Spotify style)" },
  { value: 1, label: "Mesh", description: "Organic blobs (Apple style)" },
  { value: 2, label: "Carbon", description: "Dark tech (Tesla/NASA vibe)" },
  { value: 3, label: "Noise", description: "Film grain (retro aesthetic)" },
  { value: 4, label: "Glass", description: "Frosted glass effect" },
];

interface EditProfileFormProps {
  profile: CreatorProfile;
  backendToken: string;
}

export function EditProfileForm({ profile, backendToken }: EditProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile.bind(null, backendToken),
    { error: null, success: false }
  );

  const [longBioLength, setLongBioLength] = useState(profile.longBio?.length || 0);
  const [seoTitleLength, setSeoTitleLength] = useState(profile.seoTitle?.length || 0);
  const [seoDescLength, setSeoDescLength] = useState(profile.seoDescription?.length || 0);

  const [links, setLinks] = useState<ProfileLink[]>(profile.links || []);
  const [linkErrors, setLinkErrors] = useState<Record<number, string>>({});
  const MAX_LINKS = 3;

  const addLink = () => {
    if (links.length < MAX_LINKS) {
      setLinks([...links, { type: "website", url: "" }]);
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
    // Clear error for this index and shift remaining errors
    const newErrors: Record<number, string> = {};
    Object.entries(linkErrors).forEach(([key, value]) => {
      const idx = parseInt(key);
      if (idx < index) newErrors[idx] = value;
      else if (idx > index) newErrors[idx - 1] = value;
    });
    setLinkErrors(newErrors);
  };

  const updateLink = (index: number, field: keyof ProfileLink, value: string) => {
    const newLinks = [...links];
    if (field === "type") {
      newLinks[index] = { ...newLinks[index], type: value as LinkType };
    } else if (field === "url") {
      // Auto-detect platform from URL
      const detected = detectPlatformFromDomain(value);
      if (detected) {
        newLinks[index] = { ...newLinks[index], url: value, type: detected.type };
        // Clear error if valid
        setLinkErrors(prev => {
          const next = { ...prev };
          delete next[index];
          return next;
        });
      } else {
        newLinks[index] = { ...newLinks[index], url: value };
      }
    } else {
      newLinks[index] = { ...newLinks[index], [field]: value };
    }
    setLinks(newLinks);
  };

  const normalizeUrlOnBlur = (index: number) => {
    const newLinks = [...links];
    const url = newLinks[index].url;
    if (!url.trim()) {
      // Clear error if empty
      setLinkErrors(prev => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      return;
    }

    const normalized = normalizeUrl(url);
    newLinks[index] = { ...newLinks[index], url: normalized };

    // Validate domain
    if (!isAllowedDomain(normalized)) {
      setLinkErrors(prev => ({ ...prev, [index]: "This platform is not allowed. Please use a supported platform." }));
    } else {
      setLinkErrors(prev => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      // Update type based on detected platform
      const detected = detectPlatformFromDomain(normalized);
      if (detected) {
        newLinks[index] = { ...newLinks[index], type: detected.type };
      }
    }
    setLinks(newLinks);
  };

  const hasLinkErrors = Object.keys(linkErrors).length > 0;

  const [openSections, setOpenSections] = useState({ profile: true, social: false, seo: false });
  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const sectionHeaderClass =
    "w-full flex items-center justify-between gap-3 py-4 text-left font-semibold text-foreground text-sm sm:text-base cursor-pointer";

  return (
    <form
      key={profile.updatedAt}
      action={formAction}
      className="w-full max-w-2xl mx-auto bg-card rounded-xl border border-border overflow-hidden"
    >
      {(state.error || state.success) && (
        <div
          className={`py-2.5 px-4 text-center text-sm ${
            state.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
          }`}
          role={state.error ? "alert" : "status"}
        >
          {state.error ?? "Profile updated successfully"}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {/* Section: Edit profile (expanded by default, can collapse) */}
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => toggle("profile")}
            className={sectionHeaderClass}
            aria-expanded={openSections.profile}
          >
            <span>Edit profile</span>
            <Chevron open={openSections.profile} />
          </button>
          <div className={openSections.profile ? "space-y-4 pb-6" : "hidden"}>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={profile.username}
            disabled
            className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">Username cannot be changed</p>
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            required
            maxLength={100}
            defaultValue={profile.displayName}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={profile.category}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="backgroundTheme"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Background Style
          </label>
          <select
            id="backgroundTheme"
            name="backgroundTheme"
            defaultValue={String(profile.backgroundTheme ?? 0)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {BACKGROUND_THEMES.map((theme) => (
              <option key={theme.value} value={String(theme.value)}>
                {theme.label} - {theme.description}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Choose how your public profile background looks
          </p>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={500}
            defaultValue={profile.bio || ""}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              maxLength={100}
              defaultValue={profile.city || ""}
              className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              maxLength={100}
              defaultValue={profile.country || ""}
              className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>
          </div>
        </div>

        {/* Section: Social Links */}
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => toggle("social")}
            className={sectionHeaderClass}
            aria-expanded={openSections.social}
          >
            <span>Links ({links.length}/{MAX_LINKS})</span>
            <Chevron open={openSections.social} />
          </button>
          <div className={openSections.social ? "space-y-3 pb-6" : "hidden"}>
            {/* Hidden input to serialize links for form submission */}
            <input type="hidden" name="links" value={JSON.stringify(links)} />

            {links.map((link, index) => (
              <div key={index} className="space-y-1">
                <div className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(index, "url", e.target.value)}
                    onBlur={() => normalizeUrlOnBlur(index)}
                    placeholder="instagram.com/username"
                    className={`flex-1 px-3 py-2 border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      linkErrors[index]
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove link"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {linkErrors[index] && (
                  <p className="text-xs text-destructive">{linkErrors[index]}</p>
                )}
                {!linkErrors[index] && link.url && detectPlatformFromDomain(link.url) && (
                  <p className="text-xs text-muted-foreground">
                    Detected: {detectPlatformFromDomain(link.url)?.label}
                  </p>
                )}
              </div>
            ))}

            {links.length < MAX_LINKS && (
              <button
                type="button"
                onClick={addLink}
                className="w-full py-2.5 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
              >
                + Add Link
              </button>
            )}

            <p className="text-xs text-muted-foreground">
              Supported: Instagram, Twitter/X, TikTok, YouTube, Twitch, LinkedIn, GitHub, OnlyFans, Fansly, Patreon, Ko-fi, Cafecito, Spotify, Discord, Telegram, and more.
            </p>
          </div>
        </div>

        {/* Section: SEO Optimization */}
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => toggle("seo")}
            className={sectionHeaderClass}
            aria-expanded={openSections.seo}
          >
            <span>SEO Optimization</span>
            <Chevron open={openSections.seo} />
          </button>
          <div className={openSections.seo ? "pt-1 pb-6" : "hidden"}>
          <p className="text-sm text-muted-foreground mb-4">
            Optimize how your profile appears in Google search results
          </p>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="longBio"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Extended Bio
              </label>
              <textarea
                id="longBio"
                name="longBio"
                required
                minLength={100}
                rows={6}
                defaultValue={profile.longBio || ""}
                onChange={(e) => setLongBioLength(e.target.value.length)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                placeholder="Detailed description with keywords people might search for..."
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  This is the main content Google will index
                </p>
                <p className={`text-xs ${longBioLength >= 100 ? "text-primary" : "text-muted-foreground"}`}>
                  {longBioLength}/100 {longBioLength >= 100 && "✓"}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="seoTitle"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                SEO Title <span className="text-muted-foreground font-normal">(optional - auto-generated if empty)</span>
              </label>
              <input
                type="text"
                id="seoTitle"
                name="seoTitle"
                maxLength={60}
                defaultValue={profile.seoTitle || ""}
                onChange={(e) => setSeoTitleLength(e.target.value.length)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Your Name - What You Do | BioFound"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  How your profile title appears in Google
                </p>
                <p className={`text-xs ${seoTitleLength > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                  {seoTitleLength}/60
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="seoDescription"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                SEO Description <span className="text-muted-foreground font-normal">(optional - auto-generated if empty)</span>
              </label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                maxLength={160}
                rows={3}
                defaultValue={profile.seoDescription || ""}
                onChange={(e) => setSeoDescLength(e.target.value.length)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                placeholder="Brief description of your services and specialties"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  The preview text shown in Google results
                </p>
                <p className={`text-xs ${seoDescLength > 160 ? "text-destructive" : "text-muted-foreground"}`}>
                  {seoDescLength}/160
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>

      <div className="p-4 sm:p-6 border-t border-border">
        <button
          type="submit"
          disabled={pending || hasLinkErrors}
          className="w-full py-3 sm:py-3.5 bg-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer text-sm sm:text-base"
        >
          {pending ? "Saving..." : hasLinkErrors ? "Fix link errors to save" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
