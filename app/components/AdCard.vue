<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    @click="navigateToDetails">
    <!-- Product Image -->
    <div class="aspect-video bg-gray-200 relative">
      <img :src="ad?.primaryImage?.image_path || 'https://via.placeholder.com/400x300?text=No+Image'" :alt="ad.title"
        class="w-full h-full object-cover" @error="handleImageError">
      <div v-if="ad.promotion_plan?.slug !== 'bronze'"
        class="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs capitalize"
        :class="ad.promotion_plan?.slug === 'silver' ? 'bg-yellow-500' : 'bg-blue-500'">
        {{ ad.promotion_plan?.name }}
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <div class="text-blue-600 font-bold text-lg mb-1">₦{{ Number(ad.price).toLocaleString() }}</div>
      <h3 class="font-semibold text-gray-800 mb-2">{{ ad.title }}</h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ ad.description }}</p>

      <!-- Location and Date -->
      <div class="flex items-center justify-between text-xs text-gray-500">
        <div class="flex items-center space-x-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"></path>
          </svg>
          <span>{{ ad.place }}, {{ ad.state?.name }}</span>
        </div>
        <span>{{ formatDate(ad.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '#app';
import type { PropType } from 'vue';
import type { Ad } from '~/types'

const props = defineProps({
  ad: {
    type: Object as PropType<Ad>,
    required: true
  }
});

const navigateToDetails = () => {
  navigateTo(`/ad-details?id=${props.ad.id}`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x300?text=No+Image'
}
</script>

<style></style>