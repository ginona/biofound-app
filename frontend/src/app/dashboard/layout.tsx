import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { fetchWithAuth } from "@/lib/api";
import { ProfileExistsResponse } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.backendToken) {
    redirect("/auth/signin");
  }

  try {
    const { exists } = await fetchWithAuth<ProfileExistsResponse>(
      "/profile/exists",
      session.backendToken
    );
    if (!exists) {
      redirect("/onboarding");
    }
  } catch {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900">
            BioFound
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Edit Profile
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
