import Link from "next/link";
import { auth } from "@/auth";
import { NavMenu } from "./NavMenu";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
          biofound<span className="text-primary">.</span>
        </Link>

        <NavMenu isLoggedIn={!!session} />
      </div>
    </header>
  );
}
