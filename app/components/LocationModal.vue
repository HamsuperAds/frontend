<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
        <div class="flex min-h-screen items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>

            <!-- Modal -->
            <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                    <h2 class="text-xl font-semibold">Select Location</h2>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Content -->
                <div class="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <!-- Loading State -->
                    <div v-if="pending" class="space-y-3">
                        <div v-for="i in 5" :key="i" class="h-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <!-- States List -->
                    <div v-else-if="!selectedState" class="space-y-2">
                        <!-- All Regions Option -->
                        <div v-if="appResourceInfoStore.state" @click="clearSelection"
                            class="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors mb-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded text-blue-600">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-blue-900">All regions</div>
                                    <div class="text-sm text-blue-700">Show ads from everywhere</div>
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        <div v-for="state in states" :key="state.id"
                            @click="state.adsCount > 0 ? selectState(state) : null"
                            class="flex items-center justify-between p-3 rounded-lg border border-gray-200 transition-colors"
                            :class="state.adsCount > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50'">
                            <div class="flex items-center gap-3">
                                <!-- State Image or Icon -->
                                <div class="w-10 h-10 flex-shrink-0">
                                    <img v-if="state.image" :src="state.image" :alt="state.name"
                                        class="w-full h-full object-cover rounded" />
                                    <svg v-else class="w-full h-full text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900">{{ state.name }}</div>
                                    <div class="text-sm text-gray-500">{{ state.adsCount.toLocaleString() }} ads</div>
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    <!-- LGAs List -->
                    <div v-else class="space-y-2">
                        <!-- Back Button -->
                        <button @click="selectedState = null"
                            class="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to States
                        </button>

                        <!-- Whole State Option -->
                        <div @click="selectWholeState"
                            class="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer border-2 border-blue-300">
                            <div>
                                <div class="font-semibold text-blue-900">The whole {{ selectedState.name }}</div>
                                <div class="text-sm text-blue-700">{{ selectedState.adsCount.toLocaleString() }} ads
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        <!-- LGAs -->
                        <div v-for="lga in selectedState.lgas" :key="lga.id"
                            @click="lga.adsCount > 0 ? selectLGA(lga) : null"
                            class="flex items-center justify-between p-3 rounded-lg border border-gray-200 transition-colors"
                            :class="[
                                lga.adsCount > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50',
                                { 'bg-blue-50 border-blue-400': appResourceInfoStore.lga?.id === lga.id }
                            ]">
                            <div class="flex items-center gap-3">
                                <!-- LGA Image or Icon -->
                                <div class="w-10 h-10 flex-shrink-0">
                                    <img v-if="lga.image" :src="lga.image" :alt="lga.name"
                                        class="w-full h-full object-cover rounded" />
                                    <svg v-else class="w-full h-full text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900">{{ lga.name }}</div>
                                    <div class="text-sm text-gray-500">{{ lga.adsCount.toLocaleString() }} ads</div>
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStates } from '~/composables/useStates';
import type { State, LGA } from '~/types';
import { useAppResourceInfoStore } from '~/stores/appResourceInfo';

const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    close: []
    select: [{ stateSlug: string; lgaSlug?: string }]
}>()

const appResourceInfoStore = useAppResourceInfoStore()
const { states, loading: pending, fetchStates } = useStates()
const selectedState = ref<State | null>(null)

// Fetch states on mount
onMounted(async () => {
    await fetchStates();
})

const selectState = (state: State) => {
    selectedState.value = state
}

const clearSelection = () => {
    appResourceInfoStore.state = null
    appResourceInfoStore.lga = null
    emit('select', { stateSlug: '' })
    closeModal()
}

const selectWholeState = () => {
    if (selectedState.value) {
        appResourceInfoStore.setLocation(selectedState.value)
        emit('select', { stateSlug: selectedState.value.slug })
        closeModal()
    }
}

const selectLGA = (lga: LGA) => {
    if (selectedState.value) {
        appResourceInfoStore.setLocation(selectedState.value, lga)
        emit('select', {
            stateSlug: selectedState.value.slug,
            lgaSlug: lga.slug
        })
        closeModal()
    }
}

const closeModal = () => {
    selectedState.value = null
    emit('close')
}

// Reset selected state when modal closes
watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        selectedState.value = null
    } else {
        // Initialize from store if available
        if (appResourceInfoStore.state) {
            selectedState.value = appResourceInfoStore.state
        }
    }
})
</script>
