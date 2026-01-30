import Link from "next/link";
import { Header, Footer } from "@/components";

const NICHES = [
  "Fitness",
  "Cosplay",
  "Gaming",
  "Art",
  "Lifestyle",
  "Music",
  "Fashion",
  "ASMR",
];

/** Real search-style queries people type on Google (educational, not fake data). */
const SEARCH_EXAMPLES = [
  "fitness creator [city]",
  "cosplay onlyfans",
  "gaming streamer patreon",
  "artist commissions [niche]",
];

const BENEFITS = [
  {
    title: "Privacy First",
    description: "Your real identity stays hidden. Only share what you want.",
  },
  {
    title: "SEO Optimized",
    description: "Your profile is built so it can appear when people search on Google.",
  },
  {
    title: "Organic Discovery",
    description: "Get found by people who are already searching for creators like you.",
  },
  {
    title: "Simple Analytics",
    description: "See how your profile performs from your dashboard.",
  },
];

const FEATURES = [
  "Custom profile URL",
  "Google-friendly page",
  "Niche and location",
  "Links to your platforms",
  "Free forever",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero: Badge + headline + subheadline + 2 CTAs + problem/solution box */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
              For creators
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
              Your profile appears when people search on Google
            </h1>
            <p className="text-sm text-muted-foreground text-balance mb-8 max-w-xl mx-auto">
              One simple page with your bio and links. We make it visible to search engines so fans can find you—no ads, no paid promotion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg"
              >
                Create Your Profile
              </Link>
              <a
                href="#how-it-works"
                className="px-5 py-2.5 border border-border bg-transparent font-medium rounded-lg text-foreground"
              >
                How it works
              </a>
            </div>
            {/* Problem / solution box */}
            <div className="border border-border bg-secondary/50 rounded-lg p-5 text-left max-w-lg mx-auto">
              <p className="text-sm font-medium text-foreground mb-1">Problem</p>
              <p className="text-sm text-muted-foreground mb-4">
                People search on Google for creators in your niche, but small or new creators rarely show up.
              </p>
              <p className="text-sm font-medium text-foreground mb-1">What we do</p>
              <p className="text-sm text-muted-foreground">
                We give you a single profile page built so Google can index it. When someone searches, your page can appear—and they can subscribe from there.
              </p>
            </div>
          </div>
        </section>

        {/* Categories: horizontal chips */}
        <section className="px-4 py-12 md:py-16 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold tracking-tight text-center mb-2">Categories</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Pick your niche</p>
            <div className="flex flex-wrap justify-center gap-2">
              {NICHES.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Search Examples: real Google-style searches (educational) */}
        <section className="px-4 py-12 md:py-16 border-t border-border bg-secondary/40">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold tracking-tight text-center mb-2">Searches people actually make</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              These are the kinds of queries people type on Google. Your BioFound profile can show up for searches like these in your niche and location.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEARCH_EXAMPLES.map((query) => (
                <div
                  key={query}
                  className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                >
                  &ldquo;{query}&rdquo;
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works: 3 steps */}
        <section id="how-it-works" className="px-4 py-12 md:py-16 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold tracking-tight text-center mb-2">How it works</h2>
            <p className="text-sm text-muted-foreground text-center mb-10">Three steps</p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Create your profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your bio, links, niche, and location. No personal info required.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">We make it visible to Google</h3>
                  <p className="text-sm text-muted-foreground">
                    Your page is built so search engines can index it. When people search, you can show up.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fans find you</h3>
                  <p className="text-sm text-muted-foreground">
                    Organic traffic: no ads to buy. People discover you when they search.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits: 4 cards, no decorative icons */}
        <section className="px-4 py-12 md:py-16 border-t border-border bg-secondary/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold tracking-tight text-center mb-2">Why use BioFound</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Privacy and organic growth</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-5 border border-border bg-card rounded-lg"
                >
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA: card with features checklist */}
        <section className="px-4 py-12 md:py-16 border-t border-border">
          <div className="max-w-xl mx-auto">
            <div className="p-6 md:p-8 border border-border bg-card rounded-lg text-center">
              <h2 className="text-xl font-semibold tracking-tight mb-2">Ready to get discovered?</h2>
              <p className="text-sm text-muted-foreground mb-6">Free. No ads. Just your profile on Google.</p>
              <ul className="space-y-2 mb-6 text-left text-sm text-foreground">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary" aria-hidden>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signin"
                className="block w-full px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg"
              >
                Create Your Profile
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
