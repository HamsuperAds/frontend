import { ref, computed } from 'vue';
import { useApi } from './useApi';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
import type { Category } from '~/types';

export const useCategories = () => {
    const appResourceInfoStore = useAppResourceInfoStore();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const categories = computed(() => appResourceInfoStore.categories);

    const fetchCategories = async () => {
        if (appResourceInfoStore.categories.length > 0) return;

        loading.value = true;
        error.value = null;

        try {
            const { data } = await useApi().fetchGet<{
                success: boolean;
                data: Category[];
            }>('/categories', {
                requiresAuth: false
            });

            if (data) {
                appResourceInfoStore.setCategories(data);
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch categories';
            console.error('Error fetching categories:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        categories,
        loading,
        error,
        fetchCategories
    };
};
