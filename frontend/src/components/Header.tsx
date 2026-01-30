import Link from "next/link";
import { auth } from "@/auth";

interface HeaderProps {
  hideAuthButton?: boolean;
}

export async function Header({ hideAuthButton = false }: HeaderProps) {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          BioFound
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/directory"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Directory
          </Link>

          {session ? (
            <Link
              href="/dashboard"
              className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 cursor-pointer"
            >
              Dashboard
            </Link>
          ) : (
            !hideAuthButton && (
              <Link
                href="/auth/signin"
                className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 cursor-pointer"
              >
                Sign In
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
