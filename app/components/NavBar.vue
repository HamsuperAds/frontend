<template>
    <nav class="bg-blue-600 text-white" :class="showSearch ? 'rounded-b-xl' : ''">
        <!-- Upper Section -->
        <div class="px-6 py-4 shadow">
            <div class="container mx-auto flex items-center justify-between">
                <!-- Logo -->
                <NuxtLink to="/" class="text-xl font-bold hover:opacity-90 transition-opacity">
                    HamSuper
                </NuxtLink>

                <!-- Right Side Icons and Button -->
                <div class="flex items-center space-x-6">
                    <!-- Heart Icon -->
                    <button @click="navigateTo('/account/favorites')" class="hover:opacity-80 transition-opacity">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                    </button>

                    <!-- Bell Icon -->
                    <button class="hover:opacity-80 transition-opacity">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                            </path>
                        </svg>
                    </button>

                    <!-- Message Icon -->
                    <button @click="navigateTo('/messages')" class="hover:opacity-80 transition-opacity">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                            </path>
                        </svg>
                    </button>

                    <!-- User Icon -->
                    <button @click="navigateTo('/auth/register')" class="hover:opacity-80 transition-opacity">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </button>

                    <!-- Sell for Free Button -->
                    <button @click="navigateTo('/create-ad')"
                        class="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors">
                        Sell for Free
                    </button>
                </div>
            </div>
        </div>

        <!-- Lower Section - Search -->
        <div v-if="showSearch" class="px-6 pb-6">
            <div class="container mx-auto flex justify-center py-20">
                <form @submit.prevent="handleSearch" class="flex w-full max-w-2xl">
                    <!-- Location Button -->
                    <button type="button" @click="showLocationModal = true"
                        class="bg-white text-gray-800 px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[180px]">
                        <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="truncate">{{ selectedLocationText }}</span>
                    </button>

                    <!-- Search Input -->
                    <div class="relative flex-1">
                        <input v-model="searchQuery" type="text" placeholder="Search"
                            class="w-full bg-white px-4 py-3 rounded-r-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <button type="submit"
                            class="absolute right-0 top-0 h-full px-4 hover:bg-gray-50 rounded-r-md transition-colors">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </form>

                <!-- Location Modal -->
                <LocationModal :is-open="showLocationModal" @close="showLocationModal = false"
                    @select="handleLocationSelect" />
            </div>
        </div>

    </nav>
</template>

<script setup lang="ts">
defineProps<{
    showSearch?: boolean
}>()

const searchQuery = ref('')
const showLocationModal = ref(false)
const selectedStateSlug = ref<string | null>(null)
const selectedLgaSlug = ref<string | null>(null)
const selectedLocationName = ref<string>('All Regions')

const selectedLocationText = computed(() => selectedLocationName.value)

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

const handleSearch = async () => {
    const query: Record<string, string> = {}

    if (searchQuery.value.trim()) {
        query.query = searchQuery.value.trim()
    }

    if (selectedStateSlug.value) {
        query.state = selectedStateSlug.value
    }

    if (selectedLgaSlug.value) {
        query.lga = selectedLgaSlug.value
    }

    console.log('Navigating to search with query:', query)

    await navigateTo({
        path: '/search',
        query
    })
}
</script>

<style scoped></style>