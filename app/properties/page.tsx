import { Suspense } from "react";
import { searchProperties } from "@/lib/actions";
import PropertyList from "@/components/server/PropertyList";
import FilterPanel from "@/components/client/FilterPanel";
import Loading from "./loading";

export const metadata = {
  title: "Properties | Property Platform",
  description: "Browse our available properties",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const properties = await searchProperties(searchParams);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FilterPanel />
        <div className="md:col-span-3">
          <Suspense fallback={<Loading />}>
            <PropertyList properties={properties} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
