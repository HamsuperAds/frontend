<template>
    <div class="min-h-screen bg-gray-50">

        <div class="container mx-auto px-4 py-6">
            <div class="flex gap-6">
                <!-- Sidebar -->
                <AdCategories />

                <!-- Main Content -->
                <main class="flex-1">
                    <!-- Loading State -->
                    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div v-else-if="ads.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
import { computed } from 'vue';
import { useApi } from '#imports';
import type { Ad } from '~/types';

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

// Use the fetched data or fallback to empty array
const ads = computed(() => adsData.value?.data?.data || [])
</script>

<style scoped></style>