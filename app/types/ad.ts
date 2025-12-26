export interface Ad {
  id: string | number;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  slug?: string;
  primary_image?: {
    image_path: string;
  };
  location: string;
  date: string;
  seller?: {
    id: string;
    name: string;
    rating?: number;
  };
  status: "available" | "sold" | "reserved" | "active";
  condition: "new" | "used" | "refurbished";
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
}
