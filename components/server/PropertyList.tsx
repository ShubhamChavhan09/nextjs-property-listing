import PropertyCard from "../client/PropertyCard";
import { favoriteProperty } from "@/lib/actions";
import { Property } from "@/lib/types";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavorite={favoriteProperty}
        />
      ))}
    </div>
  );
}
