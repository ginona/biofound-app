"use client";

import { useActionState } from "react";
import { CreatorProfile } from "@/lib/types";
import { updateProfile } from "./actions";

const CATEGORIES = [
  "Model",
  "Fitness",
  "Cosplay",
  "Artist",
  "Music",
  "Gaming",
  "Lifestyle",
  "Education",
  "Other",
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

  return (
    <form action={formAction} className="bg-white rounded-xl p-6 border border-gray-200">
      {state.error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Profile updated successfully
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={profile.username}
            disabled
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={profile.category}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={500}
            defaultValue={profile.bio || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              maxLength={100}
              defaultValue={profile.city || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              maxLength={100}
              defaultValue={profile.country || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <hr className="my-6" />

        <h3 className="font-medium text-gray-900">Social Links</h3>

        <div>
          <label
            htmlFor="linkInstagram"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Instagram URL
          </label>
          <input
            type="url"
            id="linkInstagram"
            name="linkInstagram"
            defaultValue={profile.linkInstagram || ""}
            placeholder="https://instagram.com/yourname"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="linkTwitter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Twitter URL
          </label>
          <input
            type="url"
            id="linkTwitter"
            name="linkTwitter"
            defaultValue={profile.linkTwitter || ""}
            placeholder="https://twitter.com/yourname"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="linkOnlyfans"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            OnlyFans URL
          </label>
          <input
            type="url"
            id="linkOnlyfans"
            name="linkOnlyfans"
            defaultValue={profile.linkOnlyfans || ""}
            placeholder="https://onlyfans.com/yourname"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="linkWebsite"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL
          </label>
          <input
            type="url"
            id="linkWebsite"
            name="linkWebsite"
            defaultValue={profile.linkWebsite || ""}
            placeholder="https://yourwebsite.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full mt-6 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
