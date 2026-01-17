import type { Ad } from "./ad";
import type { User } from "./user";

export interface Conversation {
    ad: Ad;
    other_user: User;
    unread_count: number;
    latest_message: ChatMessage;
}

export interface ChatMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    ad_id: string;
    message: string;
    is_delivered: boolean;
    is_read: boolean;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
    sender?: User;
    receiver?: User;
    ad?: Ad;
}

export interface ConversationResponse {
    success: boolean;
    data: Conversation[];
}

export interface ChatResponse {
    success: boolean;
    data: ChatMessage[];
}
