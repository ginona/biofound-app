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
    <div className="min-h-screen bg-background py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Create Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself to get discovered
          </p>
        </div>

        <OnboardingForm backendToken={session.backendToken} />
      </div>
    </div>
  );
}
