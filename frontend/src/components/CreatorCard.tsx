import Link from "next/link";
import { CreatorProfile } from "@/lib/types";

interface CreatorCardProps {
  creator: CreatorProfile;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link
      href={`/bio/${creator.username}`}
      className="block bg-card border border-border rounded-xl p-4 min-w-[200px]"
    >
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-muted-foreground mb-3">
        {creator.displayName?.charAt(0)?.toUpperCase() ?? "?"}
      </div>

      <h3 className="font-semibold text-foreground truncate">
        {creator.displayName}
      </h3>

      <p className="text-sm text-muted-foreground mb-2">{creator.category}</p>

      {creator.bio && (
        <p className="text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>
      )}

      {creator.city && creator.country && (
        <p className="text-xs text-muted-foreground mt-2">
          {creator.city}, {creator.country}
        </p>
      )}
    </Link>
  );
}
