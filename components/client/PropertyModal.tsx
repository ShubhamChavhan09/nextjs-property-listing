"use client";

import { useCallback, useEffect } from "react";
import { Property } from "@/lib/types";
import Image from "next/image";

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({
  property,
  onClose,
}: PropertyModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [handleEscape]);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {property.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-video relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Price</p>
                  <p className="font-semibold">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-semibold">{property.location}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold capitalize">{property.status}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Beds</p>
                  <p className="font-semibold">{property.specs.beds}</p>
                </div>
                <div>
                  <p className="text-gray-600">Baths</p>
                  <p className="font-semibold">{property.specs.baths}</p>
                </div>
                <div>
                  <p className="text-gray-600">Area</p>
                  <p className="font-semibold">{property.specs.area} sqft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
