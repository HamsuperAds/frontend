export interface FeedbackUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
  phone_number?: string;
  verified?: boolean;
}

export interface Feedback {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  rating: number;
  status: string;
  user_flag: string | null;
  helpful_count: number;
  unclear_count: number;
  offensive_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  from_user: FeedbackUser;
  replies: any[];
}

export interface FeedbackResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Feedback[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
