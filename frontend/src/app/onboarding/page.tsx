import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchWithAuth } from "@/lib/api";
import { ProfileExistsResponse } from "@/lib/types";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.backendToken) {
    redirect("/auth/signin");
  }

  try {
    const { exists } = await fetchWithAuth<ProfileExistsResponse>(
      "/profile/exists",
      session.backendToken
    );
    if (exists) {
      redirect("/dashboard");
    }
  } catch {
    // Continue to show form
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600">
            Tell us about yourself to get discovered
          </p>
        </div>

        <OnboardingForm backendToken={session.backendToken} />
      </div>
    </div>
  );
}
