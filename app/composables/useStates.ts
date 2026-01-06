import { ref, computed } from 'vue';
import { useApi } from './useApi';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
import type { State } from '~/types';

export const useStates = () => {
    const appResourceInfoStore = useAppResourceInfoStore();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const states = computed(() => appResourceInfoStore.states || []);

    const fetchStates = async () => {
        // Only fetch if states are not already in store
        if (appResourceInfoStore.states.length > 0) return;

        loading.value = true;
        error.value = null;

        try {
            const data = await useApi().fetchGet<State[]>('/states', {
                requiresAuth: false
            });

            if (data) {
                appResourceInfoStore.setStates(data.data);
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch states';
            console.error('Error fetching states:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        states,
        loading,
        error,
        fetchStates
    };
};
