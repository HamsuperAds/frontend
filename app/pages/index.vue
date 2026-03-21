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
import { computed, onMounted, watch } from 'vue';
import { useApi } from '#imports';
import type { Ad } from '~/types';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';

useSeoMeta({
  title: 'Classified ads in its best. Easy, safe & affordable',
  description: 'Buy and sell items quickly, safely, and affordably on Hamsuper. Browse thousands of classified ads in your area.'
})

definePageMeta({
    auth: false
});

// Fetch ads from API
const appResourceInfoStore = useAppResourceInfoStore();
const perPage = ref(18);

/** Stable string key for the current location selection, used to validate the cache. */
const currentLocationKey = () => {
    if (appResourceInfoStore.lga) return `lga:${appResourceInfoStore.lga.slug}`
    if (appResourceInfoStore.state) return `state:${appResourceInfoStore.state.slug}`
    return ''
}

// Initial fetch configuration based on store state
const getAdsConfig = () => {
    let endpoint = '/ads?per_page=' + perPage.value
    const query: Record<string, any> = {}

    if (appResourceInfoStore.lga) {
        endpoint = '/ads/search?per_page=' + perPage.value
        query.lga_id = appResourceInfoStore.lga.id
    } else if (appResourceInfoStore.state) {
        endpoint = '/ads/search?per_page=' + perPage.value
        query.state_id = appResourceInfoStore.state.id
    }
    return { endpoint, query }
}

const { endpoint: initialEndpoint, query: initialQuery } = getAdsConfig()

// Fetch ads from API (Initial load)
const { data: adsData, pending, error } = await useApi().get<{
    success: boolean
    data: {
        data: Ad[]
        current_page: number
        total: number
    }
}>(initialEndpoint, {
    params: initialQuery,
    requiresAuth: false
})

const isFiltering = ref(false)
const isLoading = computed(() => pending.value || isFiltering.value)

const fetchAds = async () => {
    try {
        isFiltering.value = true
        error.value = null
        let endpoint = '/ads?per_page=' + perPage.value
        const query: Record<string, any> = {}

        if (appResourceInfoStore.lga) {
            endpoint = '/ads/search?per_page=' + perPage.value
            query.lga_id = appResourceInfoStore.lga.id
        } else if (appResourceInfoStore.state) {
            endpoint = '/ads/search?per_page=' + perPage.value
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
            // Save to store cache so back-navigation is instant
            appResourceInfoStore.setHomepageAds(data.data?.data || [], currentLocationKey())
        }
    } catch (err) {
        console.error('Error fetching ads:', err)
        error.value = err as any
    } finally {
        isFiltering.value = false
    }
}

// Cache the initial server-fetched ads (first page load, no back-nav)
// so the store is populated even before any onMounted or watch runs.
if (adsData.value?.data?.data?.length) {
    appResourceInfoStore.setHomepageAds(adsData.value.data.data, currentLocationKey())
}

watch(() => [appResourceInfoStore.state, appResourceInfoStore.lga], async () => {
    await fetchAds()
}, { deep: true })

// On mount (including back-navigation): use the store cache if valid,
// otherwise re-fetch. This avoids an API call on every back-navigation.
onMounted(() => {
    const cacheKey = currentLocationKey()
    const cacheIsValid =
        appResourceInfoStore.homepageAdsLocationKey === cacheKey &&
        appResourceInfoStore.homepageAds.length > 0

    if (cacheIsValid) {
        // Patch the reactive adsData so the template renders from cache immediately
        if (adsData.value) {
            adsData.value.data = {
                ...adsData.value.data,
                data: appResourceInfoStore.homepageAds,
            }
        }
    } else if (appResourceInfoStore.state || appResourceInfoStore.lga) {
        // Location is set but no valid cache — fetch from API
        fetchAds()
    }
})

// Use the fetched data or fallback to empty array
const ads = computed(() => adsData.value?.data?.data || [])
</script>

<style scoped></style>