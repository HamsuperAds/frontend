export interface NotificationPreference {
  id: string;
  user_id: string;
  ad_created: boolean;
  transaction_created: boolean;
  transaction_status_changed: boolean;
  account_created: boolean;
  account_delete_requested: boolean;
  ad_promotion_expired: boolean;
  password_changed: boolean;
  new_message_received: boolean;
  new_feedback_received: boolean;
  email_enabled: boolean;
  database_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  phone_number: string;
  phone_number_verified_at: string | null;
  gender: string | null;
  country: string | null;
  state_id: number | null;
  lga_id: number | null;
  town: string | null;
  date_of_birth: string | null;
  verified: boolean;
  avatar: string | null;
  device_token: string | null;
  notification_preference: NotificationPreference | null;
  adsCount: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
