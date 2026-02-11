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
                <h1 class="text-lg md:text-3xl font-bold text-gray-900 text-center mb-8">
                    Search results for "{{ route.query.query || 'all items' }}"
                </h1>
                <p v-if="totalResults > 0" class="text-center text-gray-600 -mt-6 mb-8">{{ totalResults }} results found
                </p>
            </template>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Mobile Filters & Subcategories (Visible only on lg:hidden) -->
                <div class="lg:hidden space-y-4 mb-4">
                    <!-- Subcategories Grid -->
                    <div v-if="sidebarSubcategories.length > 0" class="overflow-x-auto pb-2">
                        <div class="flex gap-2 min-w-max">
                            <a v-for="sub in sidebarSubcategories" :key="sub.id" href="#"
                                @click.prevent="sub.adsCount > 0 ? navigateTo(`/search?subcategory=${sub.slug}`) : null"
                                class="flex flex-col items-center w-24 space-y-2 group">
                                <div class="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border group-hover:border-blue-500 transition-colors"
                                    :class="route.query.subcategory === sub.slug ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                                    <img v-if="sub.image" :src="sub.image" :alt="sub.name"
                                        class="w-full h-full object-cover">
                                    <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </div>
                                <span class="text-xs text-center text-gray-700 font-medium leading-tight line-clamp-2"
                                    :class="route.query.subcategory === sub.slug ? 'text-blue-600' : ''">
                                    {{ sub.name }}
                                </span>
                            </a>
                        </div>
                    </div>

                    <!-- Filter Bar -->
                    <div class="flex gap-3 pt-2 overflow-x-auto pb-1">
                        <AdLocations class="shrink-0" @change="handleLocationChange" />

                        <!-- Price Dropdown -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <button
                                    class="flex items-center gap-2 bg-white border border-gray-300 px-4 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0">
                                    <span>Price range</span>
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7">
                                        </path>
                                    </svg>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                                <div class="space-y-4">
                                    <h3 class="font-medium text-gray-900">Price Range</h3>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div>
                                            <label class="text-xs text-gray-500 mb-1 block">Min Price</label>
                                            <input type="number" v-model="minPrice" placeholder="Min"
                                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                                        </div>
                                        <div>
                                            <label class="text-xs text-gray-500 mb-1 block">Max Price</label>
                                            <input type="number" v-model="maxPrice" placeholder="Max"
                                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                                        </div>
                                    </div>
                                    <div class="flex justify-between pt-2">
                                        <button @click="clearPriceFilter"
                                            class="text-sm text-gray-600 hover:text-gray-900">Clear</button>
                                        <button @click="applyPriceFilter"
                                            class="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700">Apply</button>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <!-- Sidebar Filters (Desktop) -->
                <aside class="hidden lg:col-span-1 lg:block">
                    <!-- Categories -->
                    <div class="bg-white rounded-lg shadow mb-6">
                        <div class="bg-blue-500 text-white px-4 py-3 rounded-t-lg font-semibold">
                            {{ sidebarCategoryName || 'Category' }}
                        </div>
                        <div class="p-4 space-y-2">
                            <div v-if="loadingSidebar" class="space-y-2 animate-pulse">
                                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div v-else-if="sidebarSubcategories.length > 0">
                                <a v-for="sub in displayedSubcategories" :key="sub.id"
                                    @click.prevent="sub.adsCount > 0 ? navigateTo(`/search?subcategory=${sub.slug}`) : null"
                                    href="#" :class="[
                                        route.query.subcategory === sub.slug ? 'font-bold' : '',
                                        sub.adsCount === 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : route.query.subcategory !== sub.slug ? 'text-gray-700 hover:text-blue-600' : ''
                                    ]" class="block text-sm mb-2">
                                    {{ sub.name }} ({{ sub.adsCount }})
                                </a>

                                <button v-if="sidebarSubcategories.length > 7"
                                    @click="showAllSubcategories = !showAllSubcategories"
                                    class="text-blue-600 text-sm font-medium hover:underline focus:outline-none mt-2">
                                    {{ showAllSubcategories ? 'Show less' : `Show all ${sidebarSubcategories.length}` }}
                                </button>
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                No subcategories available
                            </div>
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="bg-white rounded-lg shadow mb-6 p-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Location</h3>
                        <AdLocations class="border rounded-lg -py-1" @change="handleLocationChange" />
                    </div>

                    <!-- Price -->
                    <div class="bg-white rounded-lg shadow mb-6 p-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Price</h3>
                        <div class="flex items-center space-x-2">
                            <input type="number" placeholder="Min" v-model="minPrice"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span class="text-gray-500">-</span>
                            <input type="number" placeholder="Max" v-model="maxPrice"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="flex justify-end mt-3 gap-2">
                            <button v-if="minPrice || maxPrice" @click="clearPriceFilter"
                                class="border border-gray-300 text-gray-600 text-sm px-4 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                                Clear
                            </button>
                            <button @click="applyPriceFilter" :disabled="!minPrice && !maxPrice" :class="[
                                !minPrice && !maxPrice
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                            ]" class="border text-sm px-4 py-1 rounded-lg transition-colors">
                                Apply
                            </button>
                        </div>
                    </div>

                    <!-- Condition -->
                    <!-- <div class="bg-white rounded-lg shadow p-4">
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
                    </div> -->
                </aside>

                <!-- Search Results -->
                <div class="lg:col-span-3 space-y-4">
                    <!-- View Toggle Toolbar -->
                    <div v-if="!loading && searchResults.length > 0" class="flex justify-end mb-4">
                        <div class="flex items-center bg-white rounded-lg shadow-sm p-1 border">
                            <button @click="viewMode = 'rows'" class="p-2 rounded transition-colors"
                                :class="viewMode === 'rows' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'"
                                title="List View">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                            <button @click="viewMode = 'grid'" class="p-2 rounded transition-colors"
                                :class="viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'"
                                title="Grid View">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="loading" class="space-y-4">
                        <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow p-4 animate-pulse flex gap-4">
                            <div class="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
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

                    <!-- Results List (Rows) -->
                    <div v-if="viewMode === 'rows'" class="space-y-4">
                        <NuxtLink v-for="result in searchResults" :key="result.id"
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
                                        <div class="block md:flex items-start justify-between mb-1 md:mb-2">
                                            <div>
                                                <span
                                                    class="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2">
                                                    {{ result.status }}
                                                </span>
                                                <h3
                                                    class="font-semibold text-gray-900 mb-1 text-sm md:text-lg leading-tight md:leading-normal">
                                                    {{ result.title }}</h3>
                                            </div>
                                            <div class="text-blue-600 font-bold text-lg md:text-xl">₦{{
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

                    <!-- Results Grid -->
                    <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <AdCard v-for="result in searchResults" :key="result.id" :ad="result" />
                    </div>
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
import AdCard from '~/components/AdCard.vue';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

definePageMeta({
    auth: false
});

const route = useRoute();
const searchResults = ref<Ad[]>([]);
const totalResults = ref(0);
const loading = ref(false);
const viewMode = ref<'rows' | 'grid'>('rows');

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
        if (route.query.min_price) queryParams.min_price = route.query.min_price;
        if (route.query.max_price) queryParams.max_price = route.query.max_price;

        const response = await useApi().fetchGet<{
            success: boolean,
            data: {
                data: Ad[],
                total: number
            }
        }>('/ads/search', {
            params: queryParams,
            requiresAuth: false
        });

        if (response && response.success) {
            searchResults.value = response.data.data;
            totalResults.value = response.data.total;

            // If category search (explicit or inferred), fetch subcategories for sidebar
            // We use the category of the first ad result if available
            if (searchResults.value.length > 0) {
                const firstAd = searchResults.value[0] as any; // Cast to avoid type error if Ad type incomplete
                if (firstAd.category_id) {
                    await fetchSidebarCategory(firstAd.category_id);
                }
            }
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

const sidebarSubcategories = ref<any[]>([]); // Dynamic subcategories
const sidebarCategoryName = ref('');
const loadingSidebar = ref(false);
const showAllSubcategories = ref(false);

const displayedSubcategories = computed(() => {
    if (showAllSubcategories.value) {
        return sidebarSubcategories.value;
    }
    return sidebarSubcategories.value.slice(0, 7);
});

const fetchSidebarCategory = async (categoryId: number) => {
    loadingSidebar.value = true;
    try {
        const response = await useApi().fetchGet<{
            success: boolean,
            data: {
                name: string,
                subcategories: any[]
            }
        }>(`/categories/${categoryId}`, {
            requiresAuth: false
        });

        if (response && response.success && response.data) {
            sidebarCategoryName.value = response.data.name;
            sidebarSubcategories.value = response.data.subcategories;
        }
    } catch (error) {
        console.error('Error fetching sidebar category:', error);
    } finally {
        loadingSidebar.value = false;
    }
}

// Initial fetch
onMounted(() => {
    fetchResults();
});

// Watch for route changes to re-fetch
watch(() => route.query, () => {
    fetchResults();
});

const handleLocationChange = async ({ state, lga }: { state: string; lga?: string }) => {
    const query: Record<string, any> = { ...route.query, state };
    if (lga) {
        query.lga = lga;
    } else {
        delete query.lga;
    }
    await navigateTo({
        path: '/search',
        query
    });
};

const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const applyPriceFilter = async () => {
    const query: Record<string, any> = { ...route.query };

    // Handle maxPrice without minPrice case
    if (maxPrice.value !== null && (minPrice.value === null || minPrice.value === undefined)) {
        minPrice.value = 0;
    }

    if (minPrice.value !== null) {
        query.min_price = minPrice.value;
    } else {
        delete query.min_price;
    }

    if (maxPrice.value !== null) {
        query.max_price = maxPrice.value;
    } else {
        delete query.max_price;
    }

    await navigateTo({
        path: '/search',
        query
    });
}

const clearPriceFilter = async () => {
    minPrice.value = null;
    maxPrice.value = null;

    const query: Record<string, any> = { ...route.query };
    delete query.min_price;
    delete query.max_price;

    await navigateTo({
        path: '/search',
        query
    });
}

// Initialize price inputs from route query
watch(() => route.query, (newQuery) => {
    if (newQuery.min_price) minPrice.value = Number(newQuery.min_price);
    if (newQuery.max_price) maxPrice.value = Number(newQuery.max_price);
}, { immediate: true });
</script>
