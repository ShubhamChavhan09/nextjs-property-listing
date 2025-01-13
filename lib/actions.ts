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
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800",
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
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
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
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    status: "pending",
    description: "Beautiful home in a quiet neighborhood with modern finishes.",
  },
  {
    id: "4",
    title: "Beachfront Condo",
    price: 600000,
    location: "Miami, FL",
    specs: { beds: 2, baths: 2, area: 1200 },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    status: "available",
    description:
      "Stunning oceanfront condo with panoramic views and resort-style amenities.",
  },
  {
    id: "5",
    title: "Mountain Retreat Cabin",
    price: 300000,
    location: "Denver, CO",
    specs: { beds: 2, baths: 1, area: 1100 },
    images: [
      "https://images.unsplash.com/photo-1542889601-399c4f3a8402?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    ],
    status: "available",
    description: "Charming cabin with mountain views and rustic charm.",
  },
  {
    id: "6",
    title: "Urban Loft Space",
    price: 850000,
    location: "Brooklyn, NY",
    specs: { beds: 1, baths: 2, area: 1500 },
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    ],
    status: "available",
    description:
      "Contemporary loft with high ceilings and industrial features.",
  },
  {
    id: "7",
    title: "Lakefront Property",
    price: 925000,
    location: "Seattle, WA",
    specs: { beds: 3, baths: 2, area: 2200 },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    status: "pending",
    description:
      "Gorgeous lakefront home with private dock and stunning views.",
  },
  {
    id: "8",
    title: "Desert Oasis Villa",
    price: 1100000,
    location: "Phoenix, AZ",
    specs: { beds: 4, baths: 3, area: 3000 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    status: "available",
    description: "Luxurious desert villa with pool and mountain views.",
  },
  {
    id: "9",
    title: "Historic Townhouse",
    price: 1400000,
    location: "Boston, MA",
    specs: { beds: 3, baths: 2.5, area: 2400 },
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      "https://images.unsplash.com/photo-1600566753375-17aef55115c9?w=800",
    ],
    status: "available",
    description: "Beautifully restored historic townhouse in prime location.",
  },
  {
    id: "10",
    title: "Modern Glass House",
    price: 2100000,
    location: "Los Angeles, CA",
    specs: { beds: 4, baths: 4, area: 3500 },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    status: "pending",
    description:
      "Architectural masterpiece with walls of glass and city views.",
  },
  {
    id: "11",
    title: "Waterfront Estate",
    price: 3200000,
    location: "Naples, FL",
    specs: { beds: 5, baths: 5.5, area: 4800 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    ],
    status: "available",
    description:
      "Magnificent estate with private beach access and luxury amenities.",
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
