<template>
  <div class="relative max-w-xs" @mouseleave="handleMouseLeftCategory">
    <aside class=" bg-white rounded-lg shadow-sm p-4 max-h-[90vh] overflow-y-auto custom-scroll">
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
      <div v-else-if="categories.length > 0" class="space-y-2">
        <!-- Category Item -->
        <div v-for="category in categories" :key="category.id" class="relative group"
          @mouseenter="hoveredCategory = category.id">
          <div class="flex items-center gap-3 justify-between hover:bg-gray-50 rounded-md cursor-pointer p-2">
            <div class="flex gap-2 items-center flex-1 min-w-0">
              <img :src="category.image" :alt="category.name" class="w-10 h-10 object-contain flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-sm mb-0 truncate">{{ category.name }}</p>
                <span class="text-xs text-gray-600 block">{{ category.adsCount.toLocaleString() }} ads</span>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </div>
        <!-- Subcategories Dropdown -->
        <div v-if="targetCategory && targetCategory.subcategories.length > 0" @mouseleave="handleMouseLeftSubcategory"
          v-show="hoveredCategory === targetCategory.id" @mouseenter="handleMouseEnteredSubcategory"
          class="absolute left-full top-0 bg-white rounded-lg shadow-lg p-4 z-50 w-72 max-h-[90vh] overflow-y-auto custom-scroll">
          <h3 class="font-semibold text-sm mb-3 text-gray-800">{{ targetCategory.name }} Subcategories</h3>
          <div class="space-y-1">
            <div v-for="subcategory in targetCategory.subcategories" :key="subcategory.id"
              class="flex items-center justify-between hover:bg-gray-50 rounded-md cursor-pointer p-2"
              @click="navigateTo(`/search?subcategory=${subcategory.slug}`)">
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <img :src="subcategory.image" :alt="subcategory.name" class="w-8 h-8 object-contain flex-shrink-0" />
                <span class="text-sm truncate">{{ subcategory.name }}</span>
              </div>
              <span class="text-xs text-gray-500 flex-shrink-0 ml-2">{{ subcategory.adsCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8 text-gray-500">
        <p>No categories available</p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useApi } from '#imports';
import { ref } from 'vue';
import type { Category } from '~/types';

import { useAppResourceInfoStore } from '~/stores/appResourceInfo';

// Track which category is being hovered
const hoveredCategory = ref<number | null>(null)
const isShowingSubcategory = ref(false);
function handleMouseLeftSubcategory() {
  isShowingSubcategory.value = false
  hoveredCategory.value = null
}
function handleMouseLeftCategory() {
  setTimeout(() => {
    if (!isShowingSubcategory.value) {
      hoveredCategory.value = null
    }
  }, 500);
}
function handleMouseEnteredSubcategory() {
  isShowingSubcategory.value = true
}

const appResourceInfoStore = useAppResourceInfoStore()
const pending = ref(false)

// Fetch categories from API if not already in store
if (appResourceInfoStore.categories.length === 0) {
  pending.value = true
  const { data } = await useApi().get<{
    success: boolean
    data: Category[]
  }>('/categories', {
    requiresAuth: false
  })

  if (data.value?.data) {
    appResourceInfoStore.setCategories(data.value.data)
  }
  pending.value = false
}

// Use the fetched data or fallback to empty array
const categories = computed(() => appResourceInfoStore.categories || [])
const targetCategory = computed(() => categories.value.find((c: Category) => c.id == hoveredCategory.value))
</script>

<style></style>