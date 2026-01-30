"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface NavMenuProps {
  isLoggedIn: boolean;
}

export function NavMenu({ isLoggedIn }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        <Link
          href="/directory"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Directory
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth/signin"
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium"
          >
            Sign In
          </Link>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-card border-b border-border md:hidden">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/directory"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
            >
              Directory
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-muted-foreground hover:text-foreground py-2 text-left transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-center mt-2"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
