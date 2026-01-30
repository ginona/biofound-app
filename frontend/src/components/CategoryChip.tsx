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
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
      }`}
    >
      {category}
    </Link>
  );
}
