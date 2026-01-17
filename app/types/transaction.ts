import type { Ad } from "./ad";
import type { PromotionPlan } from "./promotionPlan";

export interface Transaction {
    id: string;
    ad_id: string;
    user_id: string;
    promotion_plan_id: string;
    amount: string;
    reference: string;
    paystack_reference: string;
    status: string;
    payment_method: string;
    payment_channel: string;
    approved_by: string | null;
    admin_comment: string | null;
    description: string;
    metadata: {
        ad_id: string;
        ad_title: string;
        new_plan: string;
        old_plan: string;
        access_code: string;
        payment_url: string;
    };
    paid_at: string;
    expires_at: string | null;
    is_expired: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    ad?: Ad;
    promotion_plan?: PromotionPlan;
}
