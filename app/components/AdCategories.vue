<template>
  <div class="relative w-full md:max-w-xs" @mouseleave="handleMouseLeftCategory">
    <!-- Desktop View -->
    <aside class="hidden md:block bg-white rounded-lg shadow-sm p-4 max-h-[90vh] overflow-y-auto custom-scroll">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
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
      <div v-else-if="categories && categories.length > 0" class="space-y-2">
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
              class="flex items-center justify-between rounded-md p-2 transition-colors"
              :class="subcategory.adsCount > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
              @click="subcategory.adsCount > 0 && navigateTo(`/search?subcategory=${subcategory.slug}`)">
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

    <!-- Mobile View -->
    <div class="md:hidden">
      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-2 animate-pulse">
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div class="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div v-else-if="categories && categories.length > 0" class="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <div v-for="category in categories" :key="category.id" @click="openMobileSubcategories(category)"
          class="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm text-center cursor-pointer hover:bg-gray-50 transition-colors">
          <img :src="category.image" :alt="category.name" class="w-8 h-8 object-contain mb-2" />
          <p class="text-xs font-medium text-gray-700 leading-tight line-clamp-2">{{ category.name }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-4 text-gray-500 bg-white rounded-lg shadow-sm">
        <p>No categories available</p>
      </div>

      <!-- Mobile Subcategories Modal -->
      <div v-if="showMobileDialog"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
        @click.self="closeMobileSubcategories">
        <div
          class="bg-white w-full max-w-sm rounded-t-xl sm:rounded-xl max-h-[80vh] flex flex-col slide-up-enter-active">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <h3 class="font-semibold text-gray-900">{{ selectedMobileCategory?.name }}</h3>
            <button @click="closeMobileSubcategories" class="p-1 hover:bg-gray-100 rounded-full">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto p-4 custom-scroll">
            <div class="space-y-1">
              <div v-for="subcategory in selectedMobileCategory?.subcategories" :key="subcategory.id"
                class="flex items-center justify-between rounded-md p-3 transition-colors"
                :class="subcategory.adsCount > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
                @click="subcategory.adsCount > 0 && handleMobileSubcategoryClick(subcategory)">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <img :src="subcategory.image" :alt="subcategory.name" class="w-8 h-8 object-contain flex-shrink-0" />
                  <span class="text-sm font-medium text-gray-700">{{ subcategory.name }}</span>
                </div>
                <span class="text-xs text-gray-500 flex-shrink-0 ml-2">{{ subcategory.adsCount }}</span>
              </div>
            </div>
            <div v-if="!selectedMobileCategory?.subcategories?.length" class="text-center py-8 text-gray-500">
              <p>No subcategories found</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useCategories } from '~/composables/useCategories';
import type { Category } from '~/types';

const hoveredCategory = ref<number | null>(null)
const isShowingSubcategory = ref(false);

// Mobile Dialog Logic
const showMobileDialog = ref(false)
const selectedMobileCategory = ref<Category | null>(null)

const openMobileSubcategories = (category: Category) => {
  selectedMobileCategory.value = category
  showMobileDialog.value = true
}

const closeMobileSubcategories = () => {
  showMobileDialog.value = false
  setTimeout(() => {
    selectedMobileCategory.value = null
  }, 200)
}

const handleMobileSubcategoryClick = (subcategory: any) => {
  navigateTo(`/search?subcategory=${subcategory.slug}`)
  closeMobileSubcategories()
}

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

const { categories, loading, fetchCategories } = useCategories()

// Fetch categories on mount
onMounted(async () => {
  await fetchCategories();
})

const targetCategory = computed(() => categories.value.find((c: Category) => c.id == hoveredCategory.value))
</script>

<style></style>