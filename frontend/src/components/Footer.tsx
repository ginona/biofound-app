import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          biofound<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">About</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} biofound
        </p>
      </div>
    </footer>
  );
}
