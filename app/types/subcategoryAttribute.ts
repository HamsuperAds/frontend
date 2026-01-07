export interface SubcategoryAttribute {
    id: number;
    name: string;
    slug: string;
    type: 'string' | 'select' | 'number' | 'text';
    options: string[] | null;
    unit: string | null;
    rules: {
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
    } | null;
    table_name: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
        subcategory_id: number;
        attribute_id: number;
    };
}
