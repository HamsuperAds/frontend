export interface VerificationStatus {
  value: "pending" | "under_review" | "approved" | "rejected" | "resubmitted";
  label: string;
}

export interface IdType {
  value: "drivers_license" | "voters_card" | "national_id";
  label: string;
}

export interface VerificationImages {
  government_id: string;
  business_cert: string;
  proof_of_address: string;
}

export interface RejectionReasons {
  [key: string]: string;
}

export interface VerificationRequest {
  id: string;
  business_name: string;
  business_address: string;
  business_phone_number: string;
  id_type: IdType;
  status: VerificationStatus;
  images?: VerificationImages;
  rejection_reasons?: RejectionReasons;
  user_message?: string;
  can_resubmit: boolean;
  can_edit: boolean;
  submitted_at: string;
  reviewed_at?: string;
}

export interface VerificationSubmitResponse {
  message: string;
  data: {
    id: string;
    business_name: string;
    status: VerificationStatus;
    submitted_at: string;
  };
}

export interface VerificationGetResponse {
  data: VerificationRequest;
}

export interface VerificationFormData {
  business_name: string;
  business_address: string;
  business_phone_number: string;
  id_type: string;
  government_id: File | null;
  business_cert: File | null;
  proof_of_address: File | null;
}
