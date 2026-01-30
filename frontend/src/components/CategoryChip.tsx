import Link from "next/link";

interface CategoryChipProps {
  category: string;
  active?: boolean;
}

export function CategoryChip({ category, active = false }: CategoryChipProps) {
  const href =
    category === "All"
      ? "/directory"
      : `/directory?category=${encodeURIComponent(category)}`;

  return (
    <Link
      href={href}
      className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {category}
    </Link>
  );
}
