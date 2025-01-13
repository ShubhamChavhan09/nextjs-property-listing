export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  specs: {
    beds: number;
    baths: number;
    area: number;
  };
  images: string[];
  status: "available" | "sold" | "pending";
  description: string;
  isFavorite?: boolean;
}

export interface FilterParams {
  q?: string;
  price?: string;
  beds?: string;
  status?: string;
  [key: string]: string | undefined;
}
