import PropertyList from "@/components/server/PropertyList";
import getFavoriteProperties from "@/lib/actions";

export default async function FavoritesPage() {
  const favorites = await getFavoriteProperties();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Properties</h1>
      {favorites.length > 0 ? (
        <PropertyList properties={favorites} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No favorites yet</h2>
          <p className="text-gray-600 mb-6">
            Properties you favorite will appear here. Start browsing to find
            your dream home!
          </p>
          <a
            href="/properties"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Browse Properties
          </a>
        </div>
      )}
    </main>
  );
}
