<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Breadcrumb -->
        <div class="bg-white border-b">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center text-sm text-gray-600 space-x-2">
                    <a href="/" class="hover:text-blue-600">All ads</a>
                    <span>›</span>
                    <a href="#" class="hover:text-blue-600">Vehicles</a>
                    <span>›</span>
                    <span class="text-gray-900">254 results for <strong>tyre</strong></span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-6 py-8">
            <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">
                Search results for "tyre"
            </h1>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Sidebar Filters -->
                <aside class="lg:col-span-1">
                    <!-- Categories -->
                    <div class="bg-white rounded-lg shadow mb-6">
                        <div class="bg-blue-500 text-white px-4 py-3 rounded-t-lg font-semibold">
                            Categories
                        </div>
                        <div class="p-4 space-y-2">
                            <div class="font-semibold text-gray-900 mb-2">Vehicles</div>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Cars (14,1053)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Commercial Vehicles (38m)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Car Accessories & Heavy Machinery (1753)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Motorcycles & Scooters (2m)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Trucks & Trailers (1m)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Vehicle Parts & Accessories (1983201)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Watercraft & Boats (1400)
                            </a>
                            <a href="#" class="block text-sm text-gray-700 hover:text-blue-600">
                                Auto Spares Services (5,442)
                            </a>
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="bg-white rounded-lg shadow mb-6 p-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Location</h3>
                        <select
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Regions</option>
                            <option>Region 1</option>
                            <option>Region 2</option>
                            <option>Region 3</option>
                        </select>
                    </div>

                    <!-- Price -->
                    <div class="bg-white rounded-lg shadow mb-6 p-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Price</h3>
                        <div class="flex items-center space-x-2">
                            <input type="number" placeholder="Min"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span class="text-gray-500">-</span>
                            <input type="number" placeholder="Max"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <!-- Condition -->
                    <div class="bg-white rounded-lg shadow p-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Condition</h3>
                        <div class="space-y-2">
                            <label class="flex items-center text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" class="mr-2" />
                                Brand New
                            </label>
                            <label class="flex items-center text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" class="mr-2" />
                                Used
                            </label>
                            <label class="flex items-center text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" class="mr-2" />
                                Refurbished
                            </label>
                        </div>
                    </div>
                </aside>

                <!-- Search Results -->
                <div class="lg:col-span-3 space-y-4">
                    <div v-for="(result, index) in searchResults" :key="index"
                        class="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                        @click="navigateTo(`/ad-details?id=${result.id}`)">
                        <div class="flex p-4 gap-4">
                            <!-- Image -->
                            <div class="w-32 h-32 flex-shrink-0">
                                <img :src="result.image" :alt="result.title"
                                    class="w-full h-full object-cover rounded-lg" />
                            </div>

                            <!-- Content -->
                            <div class="flex-1 flex flex-col justify-between">
                                <div>
                                    <div class="flex items-start justify-between mb-2">
                                        <div>
                                            <span
                                                class="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2">
                                                {{ result.condition }}
                                            </span>
                                            <h3 class="font-semibold text-gray-900 text-lg">{{ result.title }}</h3>
                                        </div>
                                        <div class="text-blue-600 font-bold text-xl">₦{{ result.price.toLocaleString()
                                        }}</div>
                                    </div>
                                    <p class="text-gray-600 text-sm mb-2">{{ result.description }}</p>
                                </div>
                                <div class="flex items-center text-gray-500 text-xs">
                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>{{ result.location }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: { auth: false }
});
const searchResults = [
    {
        id: 1,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles.png',
    },
    {
        id: 2,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles1.png',
    },
    {
        id: 3,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles2.png',
    },
    {
        id: 4,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles3.png',
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles.png',
    },
    {
        id: 6,
        title: 'New Motorcycle 2022 Blue',
        price: 645845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: '5th Mile, Enugu',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles1.png',
    },
]
</script>
