<template>
    <div class="min-h-screen bg-gray-50 pb-12">
        <!-- Header Section -->
        <div class="bg-blue-600 h-48 relative">
            <div class="container mx-auto px-4 py-6">
                <div class="flex justify-between items-center text-white">
                    <button @click="$router.back()" class="p-2 hover:bg-blue-700 rounded-full transition">
                        <Icon name="heroicons:chevron-left" class="w-6 h-6" />
                    </button>
                    <h1 class="text-lg font-semibold">Seller Profile</h1>
                    <button class="p-2 hover:bg-blue-700 rounded-full transition">
                        <Icon name="heroicons:share" class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Seller Profile Card -->
        <div class="container mx-auto px-4 -mt-20">
            <div class="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center relative z-10">
                <!-- Avatar -->
                <div class="flex justify-center -mt-16 mb-4 relative">
                    <div class="relative">
                        <img :src="seller.avatar" :alt="seller.name"
                            class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md" />
                        <div v-if="seller.isVerified"
                            class="absolute bottom-0 right-0 bg-yellow-400 text-white p-1 rounded-full border-2 border-white">
                            <Icon name="heroicons:check-badge" class="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <!-- Name & Location -->
                <h2 class="text-xl font-bold text-gray-900 mb-1">{{ seller.name }}</h2>
                <div class="flex items-center justify-center text-gray-500 text-sm mb-6">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                    {{ seller.location }}
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-xl p-3">
                        <div class="text-gray-500 text-xs mb-1">Member since</div>
                        <div class="font-semibold text-gray-900">{{ seller.memberSince }}</div>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-3">
                        <div class="text-gray-500 text-xs mb-1">Response</div>
                        <div class="font-semibold text-gray-900">{{ seller.responseRate }}</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                    <button
                        class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <Icon name="heroicons:phone" class="w-5 h-5" />
                        Call Seller
                    </button>
                    <button
                        class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition text-blue-600">
                        <Icon name="heroicons:chat-bubble-oval-left" class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Listings Section -->
        <div class="container mx-auto px-4 mt-8">
            <!-- Tabs -->
            <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-4">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                    class="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                    :class="activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'">
                    {{ tab.label }}
                </button>
            </div>

            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-gray-900">Active Listings</h3>
                <button class="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>

            <!-- Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AdCard v-for="ad in filteredAds" :key="ad.id" :ad="ad" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ad } from '~/types/ad';

definePageMeta({
    auth: false,
});
// Dummy Seller Data
const seller = ref({
    name: 'Alexander Thompson',
    location: 'Nkwa, Abia',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    isVerified: true,
    memberSince: 'Oct 2022',
    responseRate: 'Fast'
});

// Tabs
const activeTab = ref('all');
const tabs = [
    { id: 'all', label: 'All Ads (42)' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'real-estate', label: 'Real Estate' }
];

// Mock Ads Data
const generateMockAd = (id: string, title: string, price: string, plan: string, imagePart: string, category: string): any => ({
    id,
    title,
    price,
    description: 'Brand new condition, 32GB RAM, 1TB SSD. Original receipt available.',
    place: 'Lagos, Ikeja',
    state: { name: 'Lagos' },
    created_at: new Date(Date.now() - Math.random() * 100000000).toISOString(),
    primary_image: { image_path: `https://loremflickr.com/400/300/${imagePart}?random=${id}` },
    promotion_plan: plan ? { slug: plan, name: plan.toUpperCase() } : { slug: 'bronze', name: 'Bronze' },
    category_id: category // Simplistic category mapping
});

const ads = ref([
    generateMockAd('1', 'Apple MacBook Pro 14"', '1200000', 'gold', 'laptop', 'electronics'),
    generateMockAd('2', 'Premium Leather Watch', '45000', 'silver', 'watch', 'fashion'),
    generateMockAd('3', 'Sony Noise Cancelling Headphones', '125000', 'bronze', 'headphones', 'electronics'),
    generateMockAd('4', 'Toyota Camry 2021', '8500000', 'gold', 'car', 'vehicles'),
    generateMockAd('5', '3 Bedroom Apartment', '45000000', 'silver', 'house', 'real-estate'),
    generateMockAd('6', 'Nike Air Jordan 1', '85000', 'bronze', 'sneakers', 'fashion'),
]);

const filteredAds = computed(() => {
    if (activeTab.value === 'all') return ads.value;
    return ads.value.filter(ad => ad.category_id === activeTab.value);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
