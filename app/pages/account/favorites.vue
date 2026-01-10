<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Favorite Ads</h2>
        </div>

        <!-- Content -->
        <div class="p-6">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-12">
                <Icon name="svg-spinners:ring-resize" class="w-8 h-8 mx-auto text-blue-500" />
                <p class="mt-2 text-gray-500">Loading favorites...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="favoriteAds.length === 0" class="text-center py-12">
                <Icon name="heroicons:heart" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <h3 class="text-lg font-medium text-gray-900">No favorites yet</h3>
                <p class="text-gray-500 mt-1">Ads you mark as favorite will appear here.</p>
                <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
                    Browse Ads
                </NuxtLink>
            </div>

            <!-- List -->
            <div v-else class="space-y-4">
                <div v-for="ad in favoriteAds" :key="ad.id"
                    class="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <!-- Image -->
                    <img :src="ad.primary_image?.image_path || '/images/placeholder.png'" :alt="ad.title"
                        class="w-32 h-32 object-cover rounded-lg" />

                    <!-- Content -->
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mb-2">
                                    {{ ad.status }}
                                </span>
                                <h3 class="font-semibold text-gray-900 line-clamp-1">{{ ad.title }}</h3>
                                <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ ad.description }}</p>
                            </div>
                            <div class="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">
                                ₦{{ Number(ad.price).toLocaleString() }}
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-3">
                            <div class="flex items-center text-gray-500 text-sm">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ ad.lga?.name }}, {{ ad.state?.name }}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <button @click="removeFavorite(ad.id)"
                                    class="flex items-center text-sm text-red-600 hover:text-red-700">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination (if needed later, implied by response list but currently API returns simpler list structure or similar to my-ads) -->
            <!-- The provided sample response for /liked-ads was { success: true, data: [...] } which is a flat list, not paginated object. -->
            <!-- So pagination UI is removed until pagination structure is confirmed or provided. -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({
    layout: 'profile'
})

const favoriteAds = ref<any[]>([])
const isLoading = ref(true)

const fetchFavorites = async () => {
    isLoading.value = true
    try {
        const response = await useApi().fetchGet<{ success: boolean; data: any[] }>('/liked-ads')
        if (response.success) {
            favoriteAds.value = response.data
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to fetch favorite ads')
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchFavorites()
})

const removeFavorite = async (id: string) => {
    // Placeholder removal logic - just removes from list as requested to use fetched data
    // Real implementation would likely call an API endpoint
    favoriteAds.value = favoriteAds.value.filter(ad => ad.id !== id)
    toast.success('Ad removed from favorites')
}
</script>
