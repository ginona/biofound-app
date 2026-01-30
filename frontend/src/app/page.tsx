import Link from "next/link";

const NICHES = [
  { name: "Fitness", gradient: "from-green-400 to-emerald-600" },
  { name: "Cosplay", gradient: "from-pink-400 to-rose-600" },
  { name: "Gaming", gradient: "from-purple-400 to-violet-600" },
  { name: "Art", gradient: "from-orange-400 to-amber-600" },
  { name: "Lifestyle", gradient: "from-cyan-400 to-teal-600" },
  { name: "Music", gradient: "from-red-400 to-pink-600" },
  { name: "Fashion", gradient: "from-fuchsia-400 to-purple-600" },
  { name: "ASMR", gradient: "from-blue-400 to-indigo-600" },
];

const SUCCESS_STORIES = [
  { username: "luna_fit", niche: "Fitness", country: "AR", flag: "🇦🇷", growth: 127 },
  { username: "cosplay_queen", niche: "Cosplay", country: "US", flag: "🇺🇸", growth: 89 },
  { username: "gamer_nova", niche: "Gaming", country: "BR", flag: "🇧🇷", growth: 156 },
  { username: "art_by_mia", niche: "Art", country: "ES", flag: "🇪🇸", growth: 73 },
  { username: "lifestyle_lux", niche: "Lifestyle", country: "UK", flag: "🇬🇧", growth: 94 },
  { username: "melody_waves", niche: "Music", country: "MX", flag: "🇲🇽", growth: 112 },
];

const BENEFITS = [
  {
    title: "Privacy First",
    description: "Your real identity stays hidden. Only share what you want.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "SEO Optimized",
    description: "We handle meta tags, structured data, and search rankings.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Organic Discovery",
    description: "Get found by fans actively searching for creators like you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Analytics",
    description: "Track impressions, clicks, and growth from your dashboard.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const FEATURES = [
  "Custom profile URL",
  "SEO meta tags",
  "Google indexing",
  "Basic analytics",
  "Niche categories",
  "Country targeting",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[oklch(0.85_0.18_130)] rounded-full blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[oklch(0.75_0.15_330)] rounded-full blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[oklch(0.85_0.18_130)] rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            biofound<span className="text-[oklch(0.85_0.18_130)]">.</span>
          </Link>
          <Link
            href="/auth/signin"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.85_0.18_130)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.85_0.18_130)]"></span>
              </span>
              <span className="text-xs font-semibold text-[oklch(0.85_0.18_130)]">NEW</span>
              <span className="text-xs text-zinc-400">Now in Early Access</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your fans are searching.{" "}
              <span className="bg-gradient-to-r from-[oklch(0.85_0.18_130)] to-[oklch(0.75_0.15_330)] bg-clip-text text-transparent">
                Let them find you.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get a public, SEO-optimized profile that ranks on Google—so new subscribers find you organically, not the other way around.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/auth/signin"
                className="px-8 py-4 bg-[oklch(0.85_0.18_130)] text-black font-semibold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(163,230,53,0.3)] transition-all duration-300 cursor-pointer"
              >
                Create Your Profile
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-zinc-700 text-white font-semibold rounded-2xl hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300 cursor-pointer"
              >
                See How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl md:text-4xl font-bold text-white">2.4M+</span>
                <span className="text-sm text-zinc-500 text-left leading-tight">Google<br />Impressions</span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-zinc-800" />
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl md:text-4xl font-bold text-[oklch(0.85_0.18_130)]">47%</span>
                <span className="text-sm text-zinc-500 text-left leading-tight">Avg.<br />Growth</span>
              </div>
            </div>
          </div>
        </section>

        {/* Niches Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Niches that rank</h2>
              <p className="text-zinc-400">Pick your category. Dominate Google.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {NICHES.map((niche) => (
                <div
                  key={niche.name}
                  className={`px-6 py-3 rounded-full bg-gradient-to-r ${niche.gradient} text-white font-medium text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default`}
                >
                  {niche.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="px-4 py-16 md:py-24 bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-zinc-400">Creators growing with organic search traffic</p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {SUCCESS_STORIES.map((story) => (
                <div
                  key={story.username}
                  className="flex-shrink-0 w-72 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:scale-105 transition-all duration-300 snap-start"
                >
                  {/* Avatar with gradient ring */}
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.85_0.18_130)] to-[oklch(0.75_0.15_330)] rounded-full p-0.5">
                      <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white font-semibold mb-1">@{story.username}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{story.niche}</span>
                    <span className="text-sm">{story.flag}</span>
                  </div>

                  <p className="text-[oklch(0.85_0.18_130)] font-bold text-lg">
                    +{story.growth}% <span className="text-zinc-500 font-normal text-sm">growth from Google</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-zinc-400">Three steps to organic growth</p>
            </div>

            <div className="relative">
              {/* Vertical gradient line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[oklch(0.85_0.18_130)] via-[oklch(0.75_0.15_330)] to-zinc-800 hidden md:block" />

              <div className="space-y-12 md:space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.85_0.18_130)] text-black font-bold text-lg mb-4 md:hidden">1</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Create Your Profile</h3>
                    <p className="text-zinc-400">Add your bio, links, and choose your niche. No personal info required.</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.85_0.18_130)] text-black font-bold text-lg z-10">1</div>
                  <div className="md:w-1/2 md:pl-12" />
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/2 md:pr-12" />
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.75_0.15_330)] text-white font-bold text-lg z-10">2</div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.75_0.15_330)] text-white font-bold text-lg mb-4 md:hidden">2</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Get Indexed</h3>
                    <p className="text-zinc-400">We optimize your page for Google. You show up when fans search.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.85_0.18_130)] to-[oklch(0.75_0.15_330)] text-black font-bold text-lg mb-4 md:hidden">3</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Grow Organically</h3>
                    <p className="text-zinc-400">Watch your subscriber count rise—without spending on ads.</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.85_0.18_130)] to-[oklch(0.75_0.15_330)] text-black font-bold text-lg z-10">3</div>
                  <div className="md:w-1/2 md:pl-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-16 md:py-24 bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Creators Love Us</h2>
              <p className="text-zinc-400">Built for your privacy and growth</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-[oklch(0.85_0.18_130)]/50 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-[oklch(0.85_0.18_130)] mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-zinc-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-lg mx-auto">
            <div className="relative p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-3xl text-center">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[oklch(0.75_0.15_330)] text-white text-xs font-bold rounded-full">
                POPULAR
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-2 mt-4">Ready to get discovered?</h2>

              <div className="my-8">
                <span className="text-5xl md:text-6xl font-bold text-white">Free</span>
                <p className="text-zinc-500 mt-1">forever</p>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300">
                    <svg className="w-5 h-5 text-[oklch(0.85_0.18_130)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signin"
                className="block w-full px-8 py-4 bg-[oklch(0.85_0.18_130)] text-black font-semibold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(163,230,53,0.3)] transition-all duration-300 cursor-pointer"
              >
                Create Your Profile
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold">
            biofound<span className="text-[oklch(0.85_0.18_130)]">.</span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} biofound
          </p>
        </div>
      </footer>
    </div>
  );
}
