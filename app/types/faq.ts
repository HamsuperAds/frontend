export interface Faq {
    id: number;
    question: string;
    answer: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string; // deleted_at can be null, but typically frontend only sees active ones, or we can add it if needed. kept simple for now based on sample.
    // adding isOpen for UI state, optional or extended type in component
}
