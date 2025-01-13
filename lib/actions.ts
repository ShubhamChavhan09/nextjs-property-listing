"use server";

import { Property, FilterParams } from "./types";
import { revalidatePath } from "next/cache";
import { favoritesDb } from "./db";

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 750000,
    location: "Downtown, New York",
    specs: { beds: 2, baths: 2, area: 1200 },
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    status: "available",
    description:
      "Luxurious apartment in the heart of downtown with amazing city views.",
  },
  {
    id: "2",
    title: "Suburban Family Home",
    price: 1250000,
    location: "Westchester, NY",
    specs: { beds: 4, baths: 3, area: 2800 },
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    status: "pending",
    description:
      "Spacious family home with a large backyard and modern amenities.",
  },

  {
    id: "3",
    title: "Cozy Suburban Home",
    price: 450000,
    location: "Austin, TX",
    specs: { beds: 3, baths: 2, area: 1800 },
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    status: "pending",
    description: "Beautiful home in a quiet neighborhood with modern finishes.",
  },
  {
    id: "4",
    title: "Beachfront Condo",
    price: 600000,
    location: "Miami, FL",
    specs: { beds: 2, baths: 2, area: 1200 },
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    status: "available",
    description:
      "Stunning oceanfront condo with panoramic views and resort-style amenities.",
  },
];

export async function getProperty(id: string): Promise<Property> {
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  if (!property) throw new Error("Property not found");

  return {
    ...property,
    isFavorite: favoritesDb.has(id),
  };
}

export async function searchProperties(
  params: FilterParams
): Promise<Property[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filtered = [...MOCK_PROPERTIES];

  if (params.q) {
    const search = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (params.price) {
    const [min, max] = params.price.split("-").map(Number);
    filtered = filtered.filter((p) =>
      max ? p.price >= min && p.price <= max : p.price >= min
    );
  }

  return filtered.map((p) => ({
    ...p,
    isFavorite: favoritesDb.has(p.id),
  }));
}

export async function favoriteProperty(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (favoritesDb.has(id)) {
    favoritesDb.delete(id);
  } else {
    favoritesDb.add(id);
  }

  revalidatePath("/properties");
  revalidatePath("/favorites");
}

export async function getFavoriteProperties(): Promise<Property[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const favoriteProperties = MOCK_PROPERTIES.filter((property) =>
    favoritesDb.has(property.id)
  ).map((property) => ({
    ...property,
    isFavorite: true,
  }));

  return favoriteProperties;
}
