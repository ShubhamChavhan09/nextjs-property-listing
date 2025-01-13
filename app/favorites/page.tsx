import { Suspense } from "react";
import { getFavoriteProperties } from "@/lib/actions";
import FavoritesList from "@/components/server/FavoritesList";
import Loading from "./loading";

export const metadata = {
  title: "My Favorites | Property Platform",
  description: "View your favorite properties",
};

export default async function FavoritesPage() {
  const favorites = await getFavoriteProperties();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Properties</h1>
      <Suspense fallback={<Loading />}>
        <FavoritesList properties={favorites} />
      </Suspense>
    </main>
  );
}
