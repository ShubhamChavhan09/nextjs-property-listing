"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Property } from "@/lib/types";
import PropertyModal from "./PropertyModal";
import { HeartIcon } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onFavorite: (id: string) => Promise<void>;
}

export default function PropertyCard({
  property,
  onFavorite,
}: PropertyCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => onFavorite(property.id));
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
        <div className="aspect-video relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity">
            <button
              onClick={handleFavorite}
              disabled={isPending}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <HeartIcon
                className={`h-6 w-6 ${
                  property.isFavorite
                    ? "text-red-500 fill-current"
                    : "text-gray-400"
                }`}
              />
            </button>
            <div className="absolute bottom-4 right-4 space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Quick View
              </button>
              <Link
                href={`/properties/${property.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-2">{property.location}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold">${property.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {property.specs.beds} beds • {property.specs.baths} baths
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <PropertyModal
          property={property}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
