import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-lg font-bold text-gray-900">
            BioFound
          </Link>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BioFound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
