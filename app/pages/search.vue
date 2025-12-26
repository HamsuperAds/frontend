<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Breadcrumb -->
        <div class="bg-white border-b">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center text-sm text-gray-600 space-x-2">
                    <a href="/" class="hover:text-blue-600">Home</a>
                    <span>›</span>
                    <span class="text-gray-900">Search Results</span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-6 py-8">
            <template v-if="!isSubcategorySearch">
                <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">
                    Search results for "{{ route.query.query || 'all items' }}"
                </h1>
                <p v-if="totalResults > 0" class="text-center text-gray-600 -mt-6 mb-8">{{ totalResults }} results found
                </p>
            </template>

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
                    <!-- Loading State -->
                    <div v-if="loading" class="space-y-4">
                        <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow p-4 animate-pulse flex gap-4">
                            <div class="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div class="flex-1 space-y-3">
                                <div class="flex justify-between">
                                    <div class="h-6 bg-gray-200 rounded w-1/3"></div>
                                    <div class="h-6 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div class="h-4 bg-gray-200 rounded w-full"></div>
                                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>

                    <!-- No Results -->
                    <div v-else-if="searchResults.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
                        <div class="mb-4 text-gray-400">
                            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                        <p class="text-gray-500">Try adjusting your search or filters to find what you're looking for.
                        </p>
                    </div>

                    <!-- Results List -->
                    <NuxtLink v-else v-for="result in searchResults" :key="result.id"
                        class="block bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                        :to="`/ad-details?id=${result.id}`">
                        <div class="flex p-4 gap-4">
                            <!-- Image -->
                            <div class="w-32 h-32 flex-shrink-0">
                                <img :src="result.primary_image?.image_path || '/images/placeholder.png'"
                                    :alt="result.title" class="w-full h-full object-cover rounded-lg" />
                            </div>

                            <!-- Content -->
                            <div class="flex-1 flex flex-col justify-between">
                                <div>
                                    <div class="flex items-start justify-between mb-2">
                                        <div>
                                            <span v-if="result.status === 'active'"
                                                class="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2">
                                                Active
                                            </span>
                                            <h3 class="font-semibold text-gray-900 text-lg">{{ result.title }}</h3>
                                        </div>
                                        <div class="text-blue-600 font-bold text-xl">₦{{
                                            Number(result.price).toLocaleString() }}</div>
                                    </div>
                                    <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ result.description }}</p>
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
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '#imports';
import type { Ad } from '~/types';

definePageMeta({
    auth: false
});

const route = useRoute();
const searchResults = ref<Ad[]>([]);
const totalResults = ref(0);
const loading = ref(false);

const isSubcategorySearch = ref(false);
const fetchResults = async () => {
    loading.value = true;
    try {
        const queryParams: Record<string, any> = {};

        if (route.query.query) queryParams.q = route.query.query;
        if (route.query.state) queryParams.state = route.query.state;
        if (route.query.lga) queryParams.lga = route.query.lga;
        if (route.query.subcategory) {
            queryParams.subcategory = route.query.subcategory;
            isSubcategorySearch.value = true;
        }
        if (route.query.category) queryParams.category = route.query.category;

        const { data } = await useApi().fetchGet<{
            success: boolean,
            data: {
                data: Ad[],
                total: number,
                current_page: number
            }
        }>('/ads/search', {
            params: queryParams,
            requiresAuth: false
        });

        if (data && data.data) {
            searchResults.value = data.data;
            totalResults.value = data.total;
        } else {
            searchResults.value = [];
            totalResults.value = 0;
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        searchResults.value = [];
        totalResults.value = 0;
    } finally {
        loading.value = false;
    }
};

// Initial fetch
onMounted(() => {
    fetchResults();
});

// Watch for route changes to re-fetch
watch(() => route.query, () => {
    fetchResults();
});
</script>
