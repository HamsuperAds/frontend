<template>
  <aside class="max-w-xs bg-white rounded-lg shadow-sm p-4 max-h-[90vh] overflow-y-scroll">
    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 5" :key="i" class="flex items-center gap-6 justify-between animate-pulse">
        <div class="flex gap-2 items-center">
          <div class="w-10 h-10 bg-gray-200 rounded"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-24"></div>
            <div class="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories List -->
    <div v-else-if="categories.length > 0" class="space-y-4 col-span-1 max-h-min border-none">
      <!-- Category Item -->
      <div v-for="category in categories" :key="category.id"
        class="flex items-center gap-6 justify-between space-x-3 hover:bg-gray-50 rounded-md cursor-pointer p-2">
        <div class="flex gap-2 items-center">
          <img :src="category.image" :alt="category.name" class="w-10 h-10 object-contain" />
          <div>
            <p class="text-sm mb-0">{{ category.name }}</p>
            <span class="text-xs text-gray-600 block">{{ category.adsCount.toLocaleString() }} ads</span>
          </div>
        </div>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-8 text-gray-500">
      <p>No categories available</p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useApi } from '#imports';
import type { Category } from '~/types';

// Fetch categories from API
const { data: categoriesData, pending, error } = await useApi().get<{
  success: boolean
  data: Category[]
}>('/categories', {
  requiresAuth: false
})

// Use the fetched data or fallback to empty array
const categories = computed(() => categoriesData.value?.data || [])
</script>

<style></style>