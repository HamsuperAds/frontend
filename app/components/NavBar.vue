<template>
    <nav class="bg-blue-600 text-white" :class="showSearch ? 'rounded-b-xl' : ''">
        <!-- Upper Section -->
        <div class="px-6 py-4 shadow">
            <div class="container mx-auto flex items-center"
                :class="isVerifyPaymentPage ? 'justify-center' : 'justify-between'">
                <!-- Logo -->
                <NuxtLink to="/" class="text-xl font-bold hover:opacity-90 transition-opacity">
                    HamSuper
                </NuxtLink>

                <!-- Right Side Icons and Button -->
                <div v-if="!isVerifyPaymentPage" class="flex items-center gap-4">
                    <!-- Desktop Icons -->
                    <div class="hidden md:flex items-center space-x-6">
                        <template v-if="$isLoggedIn()">
                            <!-- Heart Icon -->
                            <button @click="navigateTo('/account/favorites')"
                                class="hover:opacity-80 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                </svg>
                            </button>
                            <!-- Bell Icon -->
                            <button @click="isNotificationsOpen = true"
                                class="hover:opacity-80 transition-opacity relative">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                    </path>
                                </svg>
                                <!-- Unread dot -->
                                <span v-if="unreadCount > 0"
                                    class="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-blue-600">
                                </span>
                            </button>
                            <!-- Message Icon -->
                            <button @click="navigateTo('/messages')" class="hover:opacity-80 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </button>
                        </template>

                        <!-- User Icon -->
                        <button @click="navigateTo('/auth/login')" class="hover:opacity-80 transition-opacity">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Sell for Free Button -->
                    <button @click="navigateTo('/create-ad')"
                        class="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors text-sm md:text-base whitespace-nowrap">
                        Sell for Free
                    </button>

                    <!-- Mobile Menu Button -->
                    <div class="relative md:hidden">
                        <button @click="isMenuOpen = !isMenuOpen"
                            class="p-2 hover:bg-blue-700 rounded-lg transition-colors">
                            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <!-- Mobile Dropdown -->
                        <div v-show="isMenuOpen"
                            class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 text-gray-800 border border-gray-100 origin-top-right">
                            <template v-if="$isLoggedIn()">
                                <a @click="navigateTo('/account/favorites'); isMenuOpen = false"
                                    class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                    <span>Favorites</span>
                                </a>
                                <a @click="isNotificationsOpen = true; isMenuOpen = false"
                                    class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer relative">
                                    <div class="relative">
                                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                            </path>
                                        </svg>
                                        <span v-if="unreadCount > 0"
                                            class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white">
                                        </span>
                                    </div>
                                    <span>Notifications</span>
                                </a>
                                <a @click="navigateTo('/messages'); isMenuOpen = false"
                                    class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    <span>Messages</span>
                                </a>
                            </template>

                            <a @click="navigateTo('/auth/login'); isMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>Account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Lower Section - Search -->
        <div v-if="showSearch" class="px-6 pb-6">
            <div class="container mx-auto flex justify-center py-20">
                <form @submit.prevent="handleSearch" class="flex w-full max-w-2xl">
                    <!-- Location Button -->
                    <button type="button" @click="showLocationModal = true"
                        class="bg-white text-gray-800 px-2 md:px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-1 md:gap-2">
                        <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="truncate max-w-12 md:max-w-24">{{ selectedLocationText }}</span>
                    </button>

                    <!-- Search Input -->
                    <div class="relative flex-1">
                        <input v-model="searchQuery" type="text" placeholder="Search"
                            class="w-full bg-white px-4 py-3 rounded-r-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <button v-if="loadingSuggestions" type="submit" disabled
                            class="absolute right-0 top-0 h-full px-4 hover:bg-gray-50 rounded-r-md transition-colors cursor-default">
                            <svg class="w-5 h-5 text-gray-600 animate-ping" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>

                        <!-- Search Suggestions Dropdown -->
                        <div v-if="showSuggestions && suggestions.length > 0"
                            class="absolute top-full left-0 right-0 bg-white divide-y shadow-lg rounded-b-md z-50 mt-1 border border-gray-100 max-h-96 overflow-y-auto">
                            <div v-for="category in suggestions" :key="category.id"
                                @click="handleSuggestionClick(category)"
                                class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none flex items-center justify-between group text-black">
                                <div class="">
                                    <span class="font-medium text-gray-900">{{ searchQuery }}</span>
                                    <span class="text-gray-500"> in </span>
                                    <span
                                        class="text-blue-600 text-sm md:text-base font-medium group-hover:text-blue-700">{{
                                            category.name
                                        }}</span>
                                </div>
                                <span class="text-xs text-gray-400">{{ category.results_count }} results</span>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Location Modal -->
                <LocationModal :is-open="showLocationModal" @close="showLocationModal = false"
                    @select="handleLocationSelect" />
            </div>
        </div>

        <!-- Notifications Sheet -->
        <NotificationsSheet v-model:is-open="isNotificationsOpen" :unread-count="unreadCount"
            @refresh-count="fetchUnreadCount" />
    </nav>

</template>

<script setup lang="ts">
defineProps<{
    showSearch?: boolean
}>()

import { useRoute } from '#app';
const route = useRoute();
const isVerifyPaymentPage = computed(() => route.path === '/verify-payment' || route.name === 'verify-payment');

const isMenuOpen = ref(false)
const isNotificationsOpen = ref(false)
const unreadCount = ref(0)

const fetchUnreadCount = async () => {
    if (!useNuxtApp().$isLoggedIn()) return
    try {
        const { data } = await useApi().fetchGet<{ success: boolean, data: { unread_count: number } }>('/notifications/unread-count')
        if (data) {
            unreadCount.value = data.unread_count
        }
    } catch (error) {
        console.error('Error fetching unread count:', error)
    }
}

onMounted(() => {
    fetchUnreadCount()
    // Optional: Refresh periodically
    const interval = setInterval(fetchUnreadCount, 60000) // Every minute
    onBeforeUnmount(() => clearInterval(interval))
})

const searchQuery = ref('')
const showLocationModal = ref(false)
const selectedStateSlug = ref<string | null>(null)
const selectedLgaSlug = ref<string | null>(null)
const selectedLocationName = ref<string>('All Regions')

const selectedLocationText = computed(() => selectedLocationName.value)

const suggestions = ref<any[]>([])
const showSuggestions = ref(false)
let debounceTimer: any = null;
const loadingSuggestions = ref(false);

const handleLocationSelect = ({ stateSlug, lgaSlug }: { stateSlug: string; lgaSlug?: string }) => {
    selectedStateSlug.value = stateSlug
    selectedLgaSlug.value = lgaSlug || null

    // Update display text (capitalize first letter of each word)
    if (lgaSlug) {
        selectedLocationName.value = lgaSlug.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    } else {
        selectedLocationName.value = stateSlug.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
        if (newQuery.length > 2) {
            loadingSuggestions.value = true;
            try {
                const { data } = await useApi().fetchGet<{
                    success: boolean,
                    data: {
                        categories: any[]
                    }
                }>('/ads/search-suggestions', {
                    params: { q: newQuery },
                    requiresAuth: false
                })

                if (data && data.categories) {
                    suggestions.value = data.categories
                    showSuggestions.value = suggestions.value.length > 0
                } else {
                    suggestions.value = []
                    showSuggestions.value = false
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                suggestions.value = []
                showSuggestions.value = false
            } finally {
                loadingSuggestions.value = false;
            }
        } else {
            suggestions.value = []
            showSuggestions.value = false
        }
    }, 300)
})

const handleSuggestionClick = async (category: any) => {
    showSuggestions.value = false

    const query: Record<string, string> = {
        query: searchQuery.value,
        category: category.slug
    }

    if (selectedStateSlug.value) {
        query.state = selectedStateSlug.value
    }

    if (selectedLgaSlug.value) {
        query.lga = selectedLgaSlug.value
    }

    await navigateTo({
        path: '/search',
        query
    })
}

const handleSearch = () => {
    // Disabled generic enter/button search
    console.log('Search via enter/button disabled. Please use suggestions.')
}
</script>

<style scoped></style>