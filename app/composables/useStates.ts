import { ref, computed } from 'vue';
import { useApi } from './useApi';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
import type { State } from '~/types';

export const useStates = () => {
    const appResourceInfoStore = useAppResourceInfoStore();
    const loading = computed(() => appResourceInfoStore.loading.states);
    const error = ref<string | null>(null);

    const states = computed(() => appResourceInfoStore.states || []);

    const fetchStates = async (params?: { category?: string, subcategory?: string }) => {
        const isFiltered = !!(params && (params.category || params.subcategory));
        
        // Use cached global unfiltered states to avoid useless API calls
        if (!isFiltered && appResourceInfoStore.unfilteredStates && appResourceInfoStore.unfilteredStates.length > 0) {
            appResourceInfoStore.setStates(appResourceInfoStore.unfilteredStates);
            return;
        }

        // Prevent simultaneous duplicate fetches, but bypass if we specifically need filtered data NOT matching current store
        if (!isFiltered && (appResourceInfoStore.states.length > 0 || appResourceInfoStore.loading.states)) {
             // If we already have unfiltered states active and we don't need filtered, return
             if (appResourceInfoStore.unfilteredStates && appResourceInfoStore.unfilteredStates.length > 0) return;
        }

        appResourceInfoStore.loading.states = true;
        error.value = null;

        try {
            const { data } = await useApi().fetchGet<{
                success: boolean;
                data: State[];
            }>('/states', {
                params,
                requiresAuth: false
            });

            if (data) {
                appResourceInfoStore.setStates(data);
                // When we fetch the global unfiltered list, cache it heavily!
                if (!isFiltered) {
                    appResourceInfoStore.unfilteredStates = data;
                }
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
