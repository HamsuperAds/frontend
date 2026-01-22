import type { State, LGA } from "./location";

export interface Seller {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  verified: boolean;
  adsCount: number;
  state: State;
  lga: LGA;
  member_since: string;
  last_seen: string;
  created_at: string;
}

export interface SellerResponse {
  success: boolean;
  data: Seller;
}
