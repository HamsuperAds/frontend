<template>
    <div class="">
        <button type="button" @click="showLocationModal = true"
            class="bg-white text-gray-800 px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[180px]">
            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="truncate">{{ selectedLocationText }}</span>
        </button>
        <!-- Location Modal -->
        <LocationModal :is-open="showLocationModal" @close="showLocationModal = false" @select="handleLocationSelect" />
    </div>
</template>
<script setup lang="ts">
import LocationModal from "./LocationModal.vue";


const showLocationModal = ref(false)
const selectedStateSlug = ref<string | null>(null)
const selectedLgaSlug = ref<string | null>(null)
const selectedLocationName = ref<string>('All Regions')

const selectedLocationText = computed(() => selectedLocationName.value);

const emit = defineEmits(['change']);

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

    emit('change', { state: stateSlug, lga: lgaSlug });
}
</script>