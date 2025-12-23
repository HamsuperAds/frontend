export interface LGA {
  id: number;
  state_id: number;
  name: string;
  slug: string;
  image: string | null;
  adsCount: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface State {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  adsCount: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  lgas: LGA[];
}
