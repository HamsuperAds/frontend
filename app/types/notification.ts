export interface NotificationData {
    type: string;
    message: string;
    transaction_id?: string;
    transaction_reference?: string;
    old_status?: string;
    new_status?: string;
    amount?: string;
    ad_id?: string;
    ad_title?: string;
    ad_price?: string;
    user_id?: string;
    changed_at?: string;
}

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationResponse {
    success: boolean;
    data: {
        current_page: number;
        data: Notification[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

export interface UnreadCountResponse {
    success: boolean;
    data: {
        unread_count: number;
    };
}
