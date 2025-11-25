<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Favorite Ads</h2>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="space-y-4">
                <div v-for="ad in favoriteAds" :key="ad.id"
                    class="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <!-- Image -->
                    <img :src="ad.image" :alt="ad.title" class="w-32 h-32 object-cover rounded-lg" />

                    <!-- Content -->
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mb-2">
                                    {{ ad.condition }}
                                </span>
                                <h3 class="font-semibold text-gray-900">{{ ad.title }}</h3>
                                <p class="text-sm text-gray-600 mt-1">{{ ad.description }}</p>
                            </div>
                            <div class="text-blue-600 font-bold text-lg">₦{{ ad.price.toLocaleString() }}</div>
                        </div>
                        <div class="flex items-center justify-between mt-3">
                            <div class="flex items-center text-gray-500 text-sm">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ ad.location }}</span>
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
                                <span class="text-sm text-gray-500">{{ ad.status }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between mt-6 pt-4 border-t">
                <button class="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                    Prev
                </button>
                <button class="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    Next
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'profile'
})

const favoriteAds = ref([
    {
        id: 1,
        title: 'New Motorcycle 2022 Blue',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        price: 645845,
        location: '9th Mile, Enugu',
        condition: 'Brand New',
        status: 'Available',
        image: '/images/temp/electric-motorcycles.png'
    },
    {
        id: 2,
        title: 'New Motorcycle 2022 Blue',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        price: 645845,
        location: '9th Mile, Enugu',
        condition: 'Brand New',
        status: 'Available',
        image: '/images/temp/electric-motorcycles1.png'
    },
    {
        id: 3,
        title: 'New Motorcycle 2022 Blue',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        price: 645845,
        location: '9th Mile, Enugu',
        condition: 'Brand New',
        status: 'Available',
        image: '/images/temp/electric-motorcycles2.png'
    },
    {
        id: 4,
        title: 'New Motorcycle 2022 Blue',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        price: 645845,
        location: '9th Mile, Enugu',
        condition: 'Brand New',
        status: 'Available',
        image: '/images/temp/electric-motorcycles3.png'
    }
])

const removeFavorite = (id: number) => {
    favoriteAds.value = favoriteAds.value.filter(ad => ad.id !== id)
}
</script>
