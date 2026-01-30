import Link from "next/link";
import { CreatorProfile } from "@/lib/types";

interface CreatorCardProps {
  creator: CreatorProfile;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link
      href={`/bio/${creator.username}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow min-w-[200px]"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3" />

      <h3 className="font-semibold text-gray-900 truncate">
        {creator.displayName}
      </h3>

      <p className="text-sm text-gray-500 mb-2">{creator.category}</p>

      {creator.bio && (
        <p className="text-sm text-gray-600 line-clamp-2">{creator.bio}</p>
      )}

      {creator.city && creator.country && (
        <p className="text-xs text-gray-400 mt-2">
          {creator.city}, {creator.country}
        </p>
      )}
    </Link>
  );
}
