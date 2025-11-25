<template>
    <div class="min-h-screen bg-gray-50">

        <div class="container mx-auto px-4 py-6">
            <div class="flex gap-6">
                <!-- Sidebar -->
                <AdCategories />

                <!-- Main Content -->
                <main class="flex-1">
                    <!-- Product Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AdCard v-for="ad in ads" :ad="ad" :key="ad.id"
                            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ad } from '~/types';

// Sample data - replace with actual API calls

const ads = [
    {
        id: 1,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 2,
        title: 'New Motorcycle 2022 Blue',
        price: 1045845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 3,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 4,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Brand New',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 45845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    },
    {
        id: 6,
        title: 'New Motorcycle 2022 Blue',
        price: 1845,
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        condition: 'Used',
        image: '/images/temp/electric-motorcycles.png',
        category: '',
        subcategory: '',
        status: 'available'
    }
] as unknown as Ad[];
</script>

<style scoped></style>