<template>
    <div class="min-h-screen bg-gray-50 pb-12">
        <!-- Header Section -->
        <div class="bg-blue-600 h-48 relative">
            <div class="container mx-auto px-4 py-6">
                <div class="flex justify-between items-center text-white">
                    <button @click="$router.back()" class="p-2 hover:bg-blue-700 rounded-full transition">
                        <Icon name="heroicons:chevron-left" class="w-6 h-6" />
                    </button>
                    <h1 class="text-lg font-semibold">Seller Profile</h1>
                    <button class="p-2 hover:bg-blue-700 rounded-full transition">
                        <Icon name="heroicons:share" class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Seller Profile Card -->
        <div class="container mx-auto px-4 -mt-20">
            <div v-if="pending" class="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center relative z-10">
                <div class="animate-pulse">
                    <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div class="h-6 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded mb-6"></div>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="h-16 bg-gray-200 rounded-xl"></div>
                        <div class="h-16 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>

            <div v-else-if="seller"
                class="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center relative z-10">
                <!-- Avatar -->
                <div class="flex justify-center -mt-16 mb-4 relative">
                    <div class="relative">
                        <img :src="seller.avatar" :alt="sellerName"
                            class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md" />
                        <div v-if="seller.verified"
                            class="absolute bottom-0 right-0 bg-yellow-400 text-white p-1 rounded-full border-2 border-white">
                            <Icon name="heroicons:check-badge" class="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <!-- Name & Location -->
                <h2 class="text-xl font-bold text-gray-900 mb-1">{{ sellerName }}</h2>
                <div class="flex items-center justify-center text-gray-500 text-sm mb-6">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                    {{ sellerLocation }}
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-xl p-3">
                        <div class="text-gray-500 text-xs mb-1">Member since</div>
                        <div class="font-semibold text-gray-900">{{ seller.member_since }}</div>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-3">
                        <div class="text-gray-500 text-xs mb-1">Last seen</div>
                        <div class="font-semibold text-gray-900">{{ seller.last_seen }}</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                    <button
                        class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <Icon name="heroicons:phone" class="w-5 h-5" />
                        Call Seller
                    </button>
                    <button
                        class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition text-blue-600">
                        <Icon name="heroicons:chat-bubble-oval-left" class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Listings Section -->
        <div class="container mx-auto px-4 mt-8">
            <!-- Tabs -->
            <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-4">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                    class="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                    :class="activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'">
                    {{ tab.label }}
                </button>
            </div>

            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-gray-900">Active Listings</h3>
                <button class="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>

            <!-- Grid -->
            <div v-if="adsPending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow-sm animate-pulse">
                    <div class="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div class="p-4">
                        <div class="h-4 bg-gray-200 rounded mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AdCard v-for="ad in filteredAds" :key="ad.id" :ad="ad" />
            </div>

            <!-- Pagination -->
            <div v-if="paginationData && paginationData.last_page > 1"
                class="flex justify-center items-center gap-4 mt-8">
                <button @click="goToPrevPage" :disabled="!paginationData.prev_page_url"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="paginationData.prev_page_url
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'">
                    <Icon name="heroicons:chevron-left" class="w-4 h-4" />
                    Previous
                </button>

                <span class="text-sm text-gray-600">
                    Page {{ paginationData.current_page }} of {{ paginationData.last_page }}
                </span>

                <button @click="goToNextPage" :disabled="!paginationData.next_page_url"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="paginationData.next_page_url
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'">
                    Next
                    <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ad } from '~/types/ad'
import type { Seller } from '~/types/seller'

definePageMeta({
    auth: false,
})

const route = useRoute()
const sellerId = route.params.id as string

// Fetch seller data from API
const { data: sellerData, pending } = await useApi().get<{
    success: boolean
    data: Seller
}>(`/seller/${sellerId}`, {
    requiresAuth: false
})

const seller = computed(() => sellerData.value?.data)

// Computed properties for display
const sellerName = computed(() => {
    if (!seller.value) return ''
    return `${seller.value.first_name} ${seller.value.last_name}`
})

const sellerLocation = computed(() => {
    if (!seller.value) return ''
    return `${seller.value.lga?.name}, ${seller.value.state?.name}`
})

// Pagination
const currentPage = ref(1)

// Fetch seller ads from API
const { data: sellerAdsData, pending: adsPending, refresh: refreshAds } = await useApi().get<{
    success: boolean
    data: {
        current_page: number
        data: Ad[]
        total: number
        last_page: number
        prev_page_url: string | null
        next_page_url: string | null
    }
}>(`/seller-ads/${sellerId}`, {
    requiresAuth: false,
    query: {
        page: currentPage
    }
})

const ads = computed(() => sellerAdsData.value?.data?.data || [])
const paginationData = computed(() => sellerAdsData.value?.data)

// Pagination methods
const goToPage = async (page: number) => {
    currentPage.value = page
    await refreshAds()
}

const goToPrevPage = () => {
    if (paginationData.value?.prev_page_url) {
        goToPage(currentPage.value - 1)
    }
}

const goToNextPage = () => {
    if (paginationData.value?.next_page_url) {
        goToPage(currentPage.value + 1)
    }
}

// Update tabs with real category counts
const tabs = computed(() => {
    const allAds = ads.value
    const categoryCount = (categorySlug: string) =>
        allAds.filter(ad => ad.category?.slug === categorySlug).length

    return [
        { id: 'all', label: `All Ads (${allAds.length})` },
        { id: 'vehicles', label: `Vehicles (${categoryCount('vehicles')})` },
        { id: 'electronics', label: `Electronics (${categoryCount('electronics')})` },
        { id: 'fashion', label: `Fashion (${categoryCount('fashion')})` },
        { id: 'real-estate', label: `Real Estate (${categoryCount('real-estate')})` }
    ]
})

// Tabs
const activeTab = ref('all')

const filteredAds = computed(() => {
    if (activeTab.value === 'all') return ads.value
    return ads.value.filter(ad => ad.category?.slug === activeTab.value)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
