<template>
    <nav class="bg-blue-500 text-white px-4 py-3">
        <div class="container mx-auto flex items-center justify-between">
            <!-- Logo -->
            <div class="text-xl font-bold">
                HamSuper
            </div>

            <!-- Search Section -->
            <div class="flex-1 max-w-2xl mx-8">
                <div class="flex">
                    <select
                        class="bg-white text-gray-800 px-4 py-2 rounded-l-md border-r border-gray-300 focus:outline-none">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Vehicles</option>
                        <option>Real Estate</option>
                    </select>
                    <div class="relative flex-1">
                        <input type="text" placeholder="Search..."
                            class="w-full px-4 py-2 text-gray-800 focus:outline-none" />
                        <button class="absolute right-0 top-0 h-full px-4 bg-gray-100 hover:bg-gray-200 rounded-r-md">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Side Icons -->
            <div class="flex items-center space-x-4">
                <!-- Heart Icon -->
                <button class="hover:text-blue-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                        </path>
                    </svg>
                </button>

                <!-- Bell Icon -->
                <button class="hover:text-blue-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                        </path>
                    </svg>
                </button>

                <!-- Message Icon -->
                <button class="hover:text-blue-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                </button>

                <!-- User Icon -->
                <button class="hover:text-blue-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </button>

                <!-- Sell for Free Button -->
                <button
                    class="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors">
                    Sell for Free
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
</script>

<style scoped></style>