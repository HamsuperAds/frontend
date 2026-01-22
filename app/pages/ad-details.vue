<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Breadcrumb -->
        <div class="bg-white border-b">
            <div class="container mx-auto px-6 py-4">
                <div v-if="pending" class="h-5 bg-gray-200 rounded w-96 animate-pulse"></div>
                <div v-else-if="ad" class="flex items-center text-sm text-gray-600 space-x-2">
                    <a href="/" class="hover:text-blue-600">All ads</a>
                    <span>›</span>
                    <span class="hover:text-blue-600">{{ ad.category?.name }}</span>
                    <span>›</span>
                    <span class="hover:text-blue-600">{{ ad.subcategory?.name }}</span>
                    <span>›</span>
                    <span class="text-gray-900">{{ ad.title }}</span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-6 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column - Images and Details -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Loading State -->
                    <div v-if="pending" class="space-y-4">
                        <div class="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                        <div class="grid grid-cols-4 gap-4">
                            <div v-for="i in 4" :key="i" class="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p class="text-red-600">Failed to load ad details. Please try again.</p>
                    </div>

                    <!-- Main Image -->
                    <div v-else-if="ad" class="bg-white rounded-lg overflow-hidden shadow">
                        <img :src="selectedImage" :alt="ad.title" class="w-full h-auto" />
                    </div>

                    <!-- Thumbnail Images -->
                    <div v-if="ad && images.length > 1" class="grid grid-cols-4 gap-4">
                        <img v-for="(image, index) in images" :key="index" :src="image" :alt="`Thumbnail ${index + 1}`"
                            class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                            :class="{ 'ring-2 ring-blue-500': selectedImage === image }"
                            @click="selectedImage = image" />
                    </div>

                    <!-- Title and Location -->
                    <div v-if="ad" class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-start justify-between mb-4">
                            <h1 class="text-2xl font-bold text-gray-900">{{ ad.title }}</h1>
                            <button @click="toggleLike" :disabled="isLiking"
                                class="flex items-center gap-1 transition-colors" :class="[
                                    ad.is_liked ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                ]">
                                <Icon v-if="isLiking" name="svg-spinners:ring-resize" class="w-4 h-4" />
                                <SvgHeart v-else :fillColor="ad.is_liked ? 'blue' : 'white'" class="w-4 h-4"
                                    :strokeColor="ad.is_liked ? 'blue' : 'gray'" />
                                <span>{{ ad.likes }}</span>
                            </button>
                        </div>
                        <div class="flex justify-between items-center text-gray-600 text-sm space-x-4">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                {{ ad.place }}, {{ ad.state?.name }}
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                {{ ad.views || 0 }} views
                            </div>
                            <div class="text-xs text-gray-500">
                                Posted {{ formatDate(ad.created_at) }}
                            </div>
                        </div>
                    </div>

                    <!-- Ad Details -->
                    <div v-if="displayDetails.length > 0" class="bg-white rounded-lg p-6 shadow">
                        <h2 class="font-semibold text-gray-900 mb-4">Ad Details</h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div v-for="detail in displayDetails" :key="detail.label">
                                <div class="text-xs text-gray-400 uppercase mb-1">{{ detail.label }}</div>
                                <div class="font-semibold text-gray-900">{{ detail.value }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div v-if="ad" class="bg-white rounded-lg p-6 shadow">
                        <h2 class="font-semibold text-gray-900 mb-3">Description</h2>
                        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                            {{ ad.description }}
                        </p>
                    </div>

                    <!-- Contact Button (Mobile) -->
                    <div class="lg:hidden space-y-3">
                        <button @click="showPhoneNumber = true"
                            class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                                </path>
                            </svg>
                            Contact
                        </button>

                        <!-- Phone Number Display (Mobile) -->
                        <div v-if="showPhoneNumber && ad"
                            class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-1">Seller's Phone Number</div>
                            <a :href="`tel:${ad.user.phone_number}`"
                                class="text-xl font-bold text-blue-600 hover:text-blue-700">
                                {{ ad.user.phone_number }}
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Price and Seller Info -->
                <div class="space-y-6">
                    <!-- Price Card -->
                    <div v-if="ad" class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-3xl font-bold text-gray-900">₦{{ Number(ad.price).toLocaleString() }}</div>
                            <span class="text-xs text-gray-500 capitalize">{{ ad.promotion_type }}</span>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-3">
                            <button @click="showPhoneNumber = true"
                                class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center">
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                                    </path>
                                </svg>
                                Contact
                            </button>

                            <!-- Phone Number Display -->
                            <div v-if="showPhoneNumber && ad"
                                class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <div class="text-sm text-gray-600 mb-1">Seller's Phone Number</div>
                                <a :href="`tel:${ad.user.phone_number}`"
                                    class="text-xl font-bold text-blue-600 hover:text-blue-700">
                                    {{ ad.user.phone_number }}
                                </a>
                            </div>

                            <button
                                class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center">
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Chat
                            </button>
                        </div>
                    </div>

                    <!-- Seller Info -->
                    <div v-if="ad" class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-center mb-4">
                            <img v-if="ad.user.avatar" :src="ad.user.avatar" :alt="ad.user.first_name"
                                class="w-12 h-12 rounded-full object-cover mr-4" />
                            <div v-else
                                class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <NuxtLink :to="`/seller/${ad.user.id}`">
                                    <p class="font-semibold text-gray-900">{{ ad.user.first_name }} {{ ad.user.last_name
                                    }}</p>
                                </NuxtLink>
                                <div class="text-sm text-gray-500" v-if="ad.user.verified">
                                    <span class="text-green-600">✓</span> Verified
                                </div>
                            </div>
                        </div>
                        <button
                            class="w-full border border-red-500 text-red-500 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Report Seller
                        </button>
                    </div>

                    <!-- Safety Quotes -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="font-semibold text-gray-900 mb-4">Safety Quotes</h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">•</span>
                                <span>Avoid sending any prepayments</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">•</span>
                                <span>Meet with the seller at a safe public place</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">•</span>
                                <span>Inspect what you're going to buy to</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">•</span>
                                <span>Make sure it's what you need</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">•</span>
                                <span>Check all the docs and only pay if you're satisfied</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi, useAuth } from '#imports';
import { useRoute, useRouter } from 'vue-router';
import { definePageMeta, navigateTo } from '#imports';
import type { Ad } from '~/types';
import { toast } from 'vue-sonner';

definePageMeta({
    auth: false,
});

// Get ad ID from query string
const route = useRoute()
const adId = route.query.id as string

// Fetch ad details from API
const { data: adData, pending, error } = await useApi().get<{
    success: boolean
    data: Ad
}>(`/ads/${adId}`)

const ad = computed(() => adData.value?.data)

// Images handling
const images = computed(() => {
    if (!ad.value?.images || ad.value.images.length === 0) {
        return [ad.value?.primary_image?.image_path || 'https://via.placeholder.com/800x600?text=No+Image']
    }
    return ad.value.images.map(img => img.image_path)
})

const selectedImage = ref('')

// Set initial selected image when ad loads
watch(images, (newImages) => {
    if (newImages.length > 0 && !selectedImage.value) {
        selectedImage.value = newImages[0]
    }
}, { immediate: true })

const displayDetails = computed(() => {
    if (!ad.value?.additional_info) return [];

    return Object.entries(ad.value.additional_info)
        .filter(([key, value]) => {
            // Ignore fields with 'id'
            if (key.toLowerCase().includes('id')) return false;
            // Ignore internal metadata
            if (['created_at', 'updated_at', 'deleted_at'].includes(key)) return false;
            // Ignore null/undefined/empty values
            return value !== null && value !== undefined && value !== '';
        })
        .map(([key, value]) => {
            // Format label (snake_case to Title Case)
            const label = key
                .split('_')
                .map(word => {
                    // Handle special cases like RAM
                    if (word.toLowerCase() === 'ram') return 'RAM';
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');

            return { label, value };
        });
});

const isLiking = ref(false);
const { status } = useAuth();
const router = useRouter();

const toggleLike = async () => {
    if (status.value !== 'authenticated') {
        toast.error('Please login to like this ad');
        return navigateTo('/auth/login');
    }

    if (!ad.value || isLiking.value) return;

    isLiking.value = true;
    try {
        const response = await useApi().fetchPost<{
            success: boolean;
            message: string;
            is_liked: boolean;
            likes_count: number;
        }>(`/ads/${ad.value.id}/toggle-like`);

        if (response.success) {
            // Update local state
            if (adData.value) {
                adData.value.data.is_liked = response.is_liked;
                adData.value.data.likes = response.likes_count;
            }
            toast.success(response.message);
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to toggle like');
    } finally {
        isLiking.value = false;
    }
};

const showPhoneNumber = ref(false)

// Format date helper
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
