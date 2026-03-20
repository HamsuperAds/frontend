import { ref, computed } from 'vue';
import { useApi } from './useApi';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
import type { Category } from '~/types';

export const useCategories = () => {
    const appResourceInfoStore = useAppResourceInfoStore();
    const loading = ref(false);
    const countsRefreshing = ref(false);
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

    /**
     * Refetch categories with an optional location filter to get
     * location-relevant active_ads_count values.
     * Does NOT show the full loading skeleton — only updates counts.
     */
    const refetchCategoryCounts = async (params?: { state?: string; lga?: string }) => {
        countsRefreshing.value = true;
        error.value = null;

        try {
            const query: Record<string, string> = {};
            if (params?.lga) {
                query.lga = params.lga;
            } else if (params?.state) {
                query.state = params.state;
            }

            const { data } = await useApi().fetchGet<{
                success: boolean;
                data: Category[];
            }>('/categories', {
                params: query,
                requiresAuth: false
            });

            if (data) {
                appResourceInfoStore.setCategories(data);
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch categories';
            console.error('Error fetching categories:', err);
        } finally {
            countsRefreshing.value = false;
        }
    };

    return {
        categories,
        loading,
        countsRefreshing,
        error,
        fetchCategories,
        refetchCategoryCounts,
    };
};
