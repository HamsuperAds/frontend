import type { Category, Subcategory } from './category';
import type { State, LGA } from './location';
import type { User } from './user';

export interface AdImage {
  id: string;
  ad_id: string;
  image_path: string;
  is_primary: boolean;
  dimensions: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ad {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  category_id: number;
  subcategory_id: number;
  state_id: number;
  lga_id: number;
  price: string;
  place: string;
  description: string;
  promotion_plan_id: string | number | null;
  impressions: number;
  views: number;
  likes: number;
  status: string;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  location: string;
  user: User;
  category: Category;
  subcategory: Subcategory;
  state: State;
  lga: LGA;
  images: AdImage[];
  primary_image: AdImage;
  promotion_type?: string;
  phone_tablet: any | null;
  electronic: any | null;
  vehicle: any | null;
  property: any | null;
  home_appliance: any | null;
  health_beauty: any | null;
  fashion: any | null;
  sports_arts_outdoor: any | null;
  need_employment: any | null;
  vacancy: any | null;
  babies_kid: any | null;
  animals_pet: any | null;
  commercial_equipment_tool: any | null;
  repair_construction: any | null;
  is_liked: boolean;
}
