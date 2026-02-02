import type { Category, Subcategory } from './category';
import type { State, LGA } from './location';
import type { PromotionPlan } from './promotionPlan';
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
  is_negotiable: boolean;
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
  promotion_plan?: PromotionPlan;
  additional_info: Record<string, any> | null;
  is_liked: boolean;
}
