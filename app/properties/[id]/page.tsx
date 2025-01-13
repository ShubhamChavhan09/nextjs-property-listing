import { Metadata } from "next";
import { getProperty } from "@/lib/actions";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getProperty(params.id);

  return {
    title: `${property.title} | Property Platform`,
    description: property.description,
    openGraph: {
      images: [{ url: property.images[0] }],
    },
  };
}
export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="aspect-video relative mb-4">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="font-semibold">Location</h2>
          <p>{property.location}</p>
        </div>
        <div>
          <h2 className="font-semibold">Price</h2>
          <p>${property.price.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="font-semibold">Specs</h2>
          <p>
            {property.specs.beds} beds, {property.specs.baths} baths
          </p>
          <p>{property.specs.area} sqft</p>
        </div>
        <div>
          <h2 className="font-semibold">Status</h2>
          <p className="capitalize">{property.status}</p>
        </div>
      </div>
    </div>
  );
}
