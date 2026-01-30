"use client";

import { useActionState, useState } from "react";
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
  "Professional",
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
  const [longBioLength, setLongBioLength] = useState(0);

  if (state.success) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border text-center">
        <meta httpEquiv="refresh" content="2;url=/dashboard" />
        <p className="text-foreground font-semibold mb-2">Profile created!</p>
        <p className="text-sm text-muted-foreground">
          Tip: Go to your dashboard to add SEO title and description for even better Google rankings.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Redirecting...</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-card rounded-xl p-6 border border-border">
      {state.error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-foreground mb-1.5"
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
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="yourname"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Lowercase letters, numbers, and underscores only
          </p>
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
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Your Name"
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
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Bio (optional)
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label
            htmlFor="longBio"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Extended Bio <span className="text-muted-foreground font-normal">(helps you get discovered on Google)</span>
          </label>
          <textarea
            id="longBio"
            name="longBio"
            required
            minLength={100}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            placeholder="Write a detailed description of what you do, your specialties, and what makes you unique. Include keywords people might search for (e.g., 'cosplay creator', 'wedding photographer Buenos Aires', 'fitness coach'). Minimum 100 characters."
            onChange={(e) => setLongBioLength(e.target.value.length)}
          />
          <p className={`text-xs mt-1 ${longBioLength >= 100 ? "text-primary" : "text-muted-foreground"}`}>
            {longBioLength}/100 characters {longBioLength >= 100 && "✓"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              City (optional)
            </label>
            <input
              type="text"
              id="city"
              name="city"
              maxLength={100}
              className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Country (optional)
            </label>
            <input
              type="text"
              id="country"
              name="country"
              maxLength={100}
              className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {pending ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
}
