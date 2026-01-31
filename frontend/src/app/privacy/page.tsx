import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Privacy Policy | biofound.",
  description: "Privacy policy, data collection practices, content moderation, and terms of use for biofound.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-8 pb-16 px-4">
        <article className="max-w-2xl mx-auto prose prose-sm prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 31, 2026
          </p>

          {/* Introduction */}
          <p>
            This Privacy Policy describes how biofound. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you use our website and services. By using biofound., you agree to the collection and use of information in accordance with this policy.
          </p>

          {/* Data Collection */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            1. Data Collection
          </h2>
          <p>We collect the following types of information:</p>
          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Account Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email address (from Google OAuth)</li>
            <li>Name (from Google OAuth, optional to display)</li>
            <li>Profile picture (from Google OAuth, optional)</li>
            <li>Unique user identifier</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Profile Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Username and display name you choose</li>
            <li>Bio and description content</li>
            <li>Category and tags you select</li>
            <li>City and country (optional)</li>
            <li>Links to external platforms (Instagram, Twitter, OnlyFans, website)</li>
            <li>SEO metadata you provide</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Automatically Collected Data</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address and approximate location</li>
            <li>Browser type and device information</li>
            <li>Pages visited and time spent</li>
            <li>Referral source</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          {/* Third-party Services */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            2. Third-Party Services
          </h2>
          <p>We use the following third-party services that may collect and process your data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Google OAuth:</strong> For authentication. Google receives information about your login activity. See{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Vercel:</strong> Hosts our frontend application. See{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                Vercel&apos;s Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Railway:</strong> Hosts our backend services and database. See{" "}
              <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer">
                Railway&apos;s Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Cloudflare:</strong> Provides CDN and security services. See{" "}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
                Cloudflare&apos;s Privacy Policy
              </a>.
            </li>
          </ul>

          {/* User Rights */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            3. Your Rights (GDPR & CCPA)
          </h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
            <li><strong>Objection:</strong> Object to certain processing of your data</li>
            <li><strong>Restriction:</strong> Request limited processing of your data</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@biofound.app">privacy@biofound.app</a>. We will respond within 30 days.
          </p>
          <p>
            To delete your account and all associated data, you can do so from your dashboard settings or by contacting us directly.
          </p>

          {/* Content Policy & Moderation */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            4. Content Policy & Moderation
          </h2>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Prohibited Content</h3>
          <p>The following content is strictly prohibited on biofound.:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Content involving minors in any sexual or suggestive context</li>
            <li>Non-consensual intimate imagery (&quot;revenge porn&quot;)</li>
            <li>Content depicting or promoting illegal activities</li>
            <li>Harassment, hate speech, or discrimination</li>
            <li>Impersonation of other individuals or brands</li>
            <li>Spam, scams, or fraudulent content</li>
            <li>Malware, phishing links, or malicious content</li>
            <li>Doxxing or sharing private information without consent</li>
            <li>Content that violates intellectual property rights</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Automated Moderation</h3>
          <p>
            We use automated systems to detect and filter prohibited content, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Profanity and slur detection filters</li>
            <li>Pattern matching for spam and scam content</li>
            <li>Detection of suspicious URLs and links</li>
            <li>Analysis of repetitive or bot-like behavior</li>
          </ul>
          <p className="mt-2">
            Automated systems may flag content for manual review or automatically reject submissions that clearly violate our policies.
          </p>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Manual Review</h3>
          <p>
            Our team may manually review profiles and content that are flagged by automated systems, reported by users, or selected for random quality checks. We reserve the right to remove content or suspend accounts at our discretion.
          </p>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Reporting Violations</h3>
          <p>
            If you encounter content that violates our policies, please report it to{" "}
            <a href="mailto:abuse@biofound.app">abuse@biofound.app</a> with:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The URL of the offending profile</li>
            <li>A description of the violation</li>
            <li>Any supporting evidence</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Enforcement & Suspensions</h3>
          <p>Violations of our content policy may result in:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Content removal without notice</li>
            <li>Temporary account suspension</li>
            <li>Permanent account termination</li>
            <li>Reporting to law enforcement when required by law</li>
          </ul>
          <p className="mt-2">
            We are not obligated to provide warnings before taking action. Repeat offenders will be permanently banned.
          </p>

          {/* Age Requirements */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            5. Age Requirements
          </h2>
          <p>
            <strong>You must be at least 18 years old to use biofound.</strong>
          </p>
          <p>
            By creating an account, you confirm that you are at least 18 years of age. We do not knowingly collect information from individuals under 18. If we discover that a user is under 18, we will immediately terminate their account and delete all associated data.
          </p>
          <p>
            If you believe a user is under 18, please report them immediately to{" "}
            <a href="mailto:abuse@biofound.app">abuse@biofound.app</a>.
          </p>

          {/* Liability Disclaimers */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            6. Liability Disclaimers
          </h2>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">User-Generated Content</h3>
          <p>
            biofound. is a platform for user-generated content. We do not create, endorse, verify, or guarantee the accuracy of any content posted by users. Users are solely responsible for the content they post and the consequences of posting it.
          </p>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">External Links</h3>
          <p>
            Profiles on biofound. may contain links to external websites, including adult content platforms. We are not responsible for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The content, accuracy, or safety of external websites</li>
            <li>The privacy practices of external websites</li>
            <li>Any transactions or interactions on external websites</li>
            <li>Any damages resulting from visiting external links</li>
          </ul>
          <p className="mt-2">
            Click external links at your own risk. We recommend reviewing the terms and privacy policies of any external site you visit.
          </p>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">No Warranties</h3>
          <p>
            biofound. is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties that the service will be uninterrupted, secure, or error-free</li>
            <li>Warranties regarding the accuracy or reliability of any content</li>
            <li>Warranties that your profile will appear in search engine results</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, biofound. and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the service.
          </p>

          {/* Policy Changes */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Posting the new policy on this page</li>
            <li>Updating the &quot;Last updated&quot; date</li>
            <li>Sending an email notification for significant changes (optional)</li>
          </ul>
          <p className="mt-2">
            Your continued use of biofound. after any changes constitutes acceptance of the updated policy.
          </p>

          {/* Contact */}
          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">
            8. Contact Us
          </h2>
          <p>If you have questions about this Privacy Policy or our practices, contact us at:</p>
          <ul className="list-none pl-0 space-y-1 mt-2">
            <li>
              <strong>General inquiries:</strong>{" "}
              <a href="mailto:hello@biofound.app">hello@biofound.app</a>
            </li>
            <li>
              <strong>Privacy requests:</strong>{" "}
              <a href="mailto:privacy@biofound.app">privacy@biofound.app</a>
            </li>
            <li>
              <strong>Report abuse:</strong>{" "}
              <a href="mailto:abuse@biofound.app">abuse@biofound.app</a>
            </li>
          </ul>

          {/* Back to home */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="text-sm text-primary hover:underline"
            >
              &larr; Back to home
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
