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
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-semibold tracking-tight text-foreground">
            biofound<span className="text-primary">.</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-muted-foreground hover:text-foreground"
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
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
