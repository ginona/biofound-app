"use client";

import { useActionState, useState } from "react";
import { CreatorProfile } from "@/lib/types";
import { updateProfile } from "./actions";

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
            <span>Social Links</span>
            <Chevron open={openSections.social} />
          </button>
          <div className={openSections.social ? "space-y-4 pb-6" : "hidden"}>
            <div>
              <label
                htmlFor="linkInstagram"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Instagram URL
              </label>
              <input
                type="url"
                id="linkInstagram"
                name="linkInstagram"
                defaultValue={profile.linkInstagram || ""}
                placeholder="https://instagram.com/yourname"
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="linkTwitter"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Twitter URL
              </label>
              <input
                type="url"
                id="linkTwitter"
                name="linkTwitter"
                defaultValue={profile.linkTwitter || ""}
                placeholder="https://twitter.com/yourname"
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="linkOnlyfans"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                OnlyFans URL
              </label>
              <input
                type="url"
                id="linkOnlyfans"
                name="linkOnlyfans"
                defaultValue={profile.linkOnlyfans || ""}
                placeholder="https://onlyfans.com/yourname"
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="linkWebsite"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Website URL
              </label>
              <input
                type="url"
                id="linkWebsite"
                name="linkWebsite"
                defaultValue={profile.linkWebsite || ""}
                placeholder="https://yourwebsite.com"
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
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
          disabled={pending}
          className="w-full py-3 sm:py-3.5 bg-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer text-sm sm:text-base"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
