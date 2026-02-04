<template>
    <div class="min-h-screen bg-gray-50">

        <div class="container mx-auto px-2 md:px-4 py-6">
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Sidebar -->
                <AdCategories />

                <!-- Main Content -->
                <main class="flex-1">
                    <!-- Loading State -->
                    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                            <div class="aspect-video bg-gray-200 rounded mb-4"></div>
                            <div class="h-4 bg-gray-200 rounded mb-2"></div>
                            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p class="text-red-600">Failed to load ads. Please try again later.</p>
                    </div>

                    <!-- Product Grid -->
                    <div v-else-if="ads.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        <AdCard v-for="ad in ads" :ad="ad" :key="ad.id"
                            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" />
                    </div>

                    <!-- Empty State -->
                    <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p class="text-gray-500">No ads available at the moment.</p>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useApi } from '#imports';
import type { Ad } from '~/types';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';
definePageMeta({
    auth: false
});

// Fetch ads from API
const appResourceInfoStore = useAppResourceInfoStore()

// Fetch ads from API
const { data: adsData, pending, error } = await useApi().get<{
    success: boolean
    data: {
        data: Ad[]
        current_page: number
        total: number
    }
}>('/ads', {
    requiresAuth: false
})

const isFiltering = ref(false)
const isLoading = computed(() => pending.value || isFiltering.value)

const fetchAds = async () => {
    try {
        isFiltering.value = true
        error.value = null
        let endpoint = '/ads'
        const query: Record<string, any> = {}

        if (appResourceInfoStore.lga) {
            endpoint = '/ads/search'
            query.lga_id = appResourceInfoStore.lga.id
        } else if (appResourceInfoStore.state) {
            endpoint = '/ads/search'
            query.state_id = appResourceInfoStore.state.id
        }

        const data = await useApi().fetchGet<{
            success: boolean
            data: {
                data: Ad[]
                current_page: number
                total: number
            }
        }>(endpoint, {
            params: query,
            requiresAuth: false
        })

        if (data) {
            adsData.value = data
        }
    } catch (err) {
        console.error('Error fetching ads:', err)
        error.value = err as any
    } finally {
        isFiltering.value = false
    }
}

watch(() => [appResourceInfoStore.state, appResourceInfoStore.lga], async () => {
    await fetchAds()
}, { deep: true })

// Use the fetched data or fallback to empty array
const ads = computed(() => adsData.value?.data?.data || [])
</script>

<style scoped></style>