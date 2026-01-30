import { Header, Footer, CreatorCard, CategoryChip } from "@/components";
import { fetchApi } from "@/lib/api";
import { CreatorProfile, PaginatedResult } from "@/lib/types";

const CATEGORIES = [
  "Model",
  "Fitness",
  "Cosplay",
  "Artist",
  "Music",
  "Gaming",
  "Lifestyle",
  "Education",
  "Other",
];

interface DirectoryPageProps {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

async function getCreators(
  category?: string,
  q?: string,
  page?: string
): Promise<PaginatedResult<CreatorProfile>> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  if (page) params.set("page", page);

  try {
    return await fetchApi<PaginatedResult<CreatorProfile>>(
      `/directory?${params.toString()}`
    );
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
  }
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const { category, q, page } = params;
  const result = await getCreators(category, q, page);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Creator Directory
          </h1>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <CategoryChip category="All" active={!category} />
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                category={cat}
                active={category === cat}
              />
            ))}
          </div>

          {/* Results */}
          {result.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {result.data.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No creators found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          {/* Pagination Info */}
          {result.meta.totalPages > 1 && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Page {result.meta.page} of {result.meta.totalPages} ({result.meta.total} creators)
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
