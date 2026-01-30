"use client";

import { useActionState } from "react";
import { createProfile } from "./actions";

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

interface OnboardingFormProps {
  backendToken: string;
}

export function OnboardingForm({ backendToken }: OnboardingFormProps) {
  const [state, formAction, pending] = useActionState(
    createProfile.bind(null, backendToken),
    { error: null, success: false }
  );

  if (state.success) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <meta httpEquiv="refresh" content="0;url=/dashboard" />
        <p className="text-gray-600">Profile created! Redirecting...</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white rounded-xl p-6 shadow-sm">
      {state.error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            pattern="^[a-z0-9_]+$"
            minLength={3}
            maxLength={30}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="yourname"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lowercase letters, numbers, and underscores only
          </p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Your Name"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Select a category</option>
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
            Bio (optional)
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City (optional)
            </label>
            <input
              type="text"
              id="city"
              name="city"
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country (optional)
            </label>
            <input
              type="text"
              id="country"
              name="country"
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full mt-6 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {pending ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
}
