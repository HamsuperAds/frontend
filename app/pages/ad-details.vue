<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Breadcrumb -->
        <div class="bg-white border-b">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center text-sm text-gray-600 space-x-2">
                    <a href="/" class="hover:text-blue-600">All ads</a>
                    <span>›</span>
                    <a href="#" class="hover:text-blue-600">Vehicles</a>
                    <span>›</span>
                    <a href="#" class="hover:text-blue-600">Motorcycles</a>
                    <span>›</span>
                    <span class="text-gray-900">New Motorcycle 2022 Blue</span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-6 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column - Images and Details -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Main Image -->
                    <div class="bg-white rounded-lg overflow-hidden shadow">
                        <img :src="selectedImage" alt="Motorcycle" class="w-full h-auto" />
                    </div>

                    <!-- Thumbnail Images -->
                    <div class="grid grid-cols-4 gap-4">
                        <img v-for="(image, index) in images" :key="index" :src="image" :alt="`Thumbnail ${index + 1}`"
                            class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                            :class="{ 'ring-2 ring-blue-500': selectedImage === image }"
                            @click="selectedImage = image" />
                    </div>

                    <!-- Title and Location -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-start justify-between mb-4">
                            <h1 class="text-2xl font-bold text-gray-900">New Motorcycle 2022 Blue</h1>
                            <button class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center text-gray-600 text-sm space-x-4">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                5th Mile, Enug.
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                23 views
                            </div>
                        </div>
                    </div>

                    <!-- Specifications -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Brand</div>
                                <div class="font-semibold text-gray-900">New</div>
                                <div class="text-xs text-gray-400 uppercase mt-1">CONDITION</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">QLink</div>
                                <div class="font-semibold text-gray-900">MAKE</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">XP 200</div>
                                <div class="font-semibold text-gray-900">CONDITION</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">2025</div>
                                <div class="font-semibold text-gray-900">YEAR OF MANUFACTURE</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Automatic</div>
                                <div class="font-semibold text-gray-900">TRANSMISSION</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Black</div>
                                <div class="font-semibold text-gray-900">COLOR</div>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <p class="text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debent qui quod aperiam
                            voluptatibus
                            odio labore magni pariatur lure-quae at harum nis, dolorum ut est, aliquid numquam assumenda
                            fugiat ipsum.
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
                        <div v-if="showPhoneNumber"
                            class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-1">Seller's Phone Number</div>
                            <a :href="`tel:${phoneNumber}`" class="text-xl font-bold text-blue-600 hover:text-blue-700">
                                {{ phoneNumber }}
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Price and Seller Info -->
                <div class="space-y-6">
                    <!-- Price Card -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-3xl font-bold text-gray-900">₦645,845</div>
                            <span class="text-xs text-gray-500">Fixed</span>
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
                            <div v-if="showPhoneNumber"
                                class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <div class="text-sm text-gray-600 mb-1">Seller's Phone Number</div>
                                <a :href="`tel:${phoneNumber}`"
                                    class="text-xl font-bold text-blue-600 hover:text-blue-700">
                                    {{ phoneNumber }}
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
                    <div class="bg-white rounded-lg p-6 shadow">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900">Hamsuper automobiles company Ltd</div>
                                <div class="text-sm text-gray-500">Verified</div>
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
const images = [
    '/images/temp/electric-motorcycles.png',
    '/images/temp/electric-motorcycles1.png',
    '/images/temp/electric-motorcycles2.png',
    '/images/temp/electric-motorcycles3.png',
]

const selectedImage = ref(images[0])
const showPhoneNumber = ref(false)
const phoneNumber = '+234 803 456 7890'
</script>
