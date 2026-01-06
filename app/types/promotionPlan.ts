export interface PromotionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  icon: string;
  color: string;
  on_top_duration_hours: number;
  auto_renew_interval_hours: number | null;
  srp_promotion_days: number | null;
  email_marketing_enabled: boolean;
  is_active: boolean;
  display_order: number;
  adsCount: number;
  created_by: string;
  previous_version_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
