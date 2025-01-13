import PropertyList from "./PropertyList";
import { Property } from "@/lib/types";

interface FavoritesListProps {
  properties: Property[];
}

export default function FavoritesList({ properties }: FavoritesListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No favorites yet</h2>
        <p className="text-gray-600 mb-6">
          Start adding properties to your favorites to see them here.
        </p>
        <a
          href="/properties"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Browse Properties
        </a>
      </div>
    );
  }

  return <PropertyList properties={properties} />;
}
