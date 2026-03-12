import { ref, computed } from 'vue';
import { useApi } from './useApi';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
import type { State } from '~/types';

export const useStates = () => {
    const appResourceInfoStore = useAppResourceInfoStore();
    const loading = computed(() => appResourceInfoStore.loading.states);
    const error = ref<string | null>(null);

    const states = computed(() => appResourceInfoStore.states || []);

    const fetchStates = async () => {
        // Only fetch if states are not already in store AND not currently loading
        if (appResourceInfoStore.states.length > 0 || appResourceInfoStore.loading.states) return;

        appResourceInfoStore.loading.states = true;
        error.value = null;

        try {
            const { data } = await useApi().fetchGet<{
                success: boolean;
                data: State[];
            }>('/states', {
                requiresAuth: false
            });

            if (data) {
                appResourceInfoStore.setStates(data);
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch states';
            console.error('Error fetching states:', err);
        } finally {
            appResourceInfoStore.loading.states = false;
        }
    };

    return {
        states,
        loading,
        error,
        fetchStates
    };
};
