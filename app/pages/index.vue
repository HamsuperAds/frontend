<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navbar -->
        <NavBar />

        <div class="container mx-auto px-4 py-6">
            <div class="flex gap-6">
                <!-- Sidebar -->
                <aside class="w-64 bg-white rounded-lg shadow-sm p-4">
                    <div class="space-y-4">
                        <!-- Category Item -->
                        <div v-for="category in categories" :key="category.name"
                            class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                            <CategoryIcon :type="category.icon" />
                            <span class="text-gray-700 text-sm">{{ category.name }}</span>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="flex-1">
                    <!-- Product Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="product in products" :key="product.id"
                            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <!-- Product Image -->
                            <div class="aspect-video bg-gray-200 relative">
                                <img :src="product.image" :alt="product.title" class="w-full h-full object-cover">
                                <div class="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                    {{ product.category }}
                                </div>
                            </div>

                            <!-- Product Info -->
                            <div class="p-4">
                                <div class="text-blue-600 font-bold text-lg mb-1">{{ product.price }}</div>
                                <h3 class="font-semibold text-gray-800 mb-2">{{ product.title }}</h3>
                                <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>

                                <!-- Location and Date -->
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <div class="flex items-center space-x-1">
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <span>{{ product.location }}</span>
                                    </div>
                                    <span>{{ product.date }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-blue-500 text-white mt-12">
            <div class="container mx-auto px-4 py-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Social -->
                    <div>
                        <h3 class="font-semibold mb-4">Socials</h3>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-blue-200">Facebook</a></li>
                            <li><a href="#" class="hover:text-blue-200">Instagram</a></li>
                            <li><a href="#" class="hover:text-blue-200">Hamsuper Twitter</a></li>
                        </ul>
                    </div>

                    <!-- Company Info -->
                    <div>
                        <h3 class="font-semibold mb-4">Company Info</h3>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-blue-200">About Hamsuper</a></li>
                            <li><a href="#" class="hover:text-blue-200">Terms & Conditions</a></li>
                            <li><a href="#" class="hover:text-blue-200">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-blue-200">FAQ</a></li>
                            <li><a href="#" class="hover:text-blue-200">Contact Us</a></li>
                        </ul>
                    </div>

                    <!-- Our Apps -->
                    <div>
                        <h3 class="font-semibold mb-4">Our Apps</h3>
                        <div class="space-y-2">
                            <a href="#" class="block">
                                <img src="/images/google-play.svg" alt="Google Play" class="h-10">
                            </a>
                            <a href="#" class="block">
                                <img src="/images/app-store.svg" alt="App Store" class="h-10">
                            </a>
                        </div>
                    </div>
                </div>

                <div class="border-t border-blue-400 mt-8 pt-4 text-center text-sm">
                    © 2024 Hamsuper.com
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// Sample data - replace with actual API calls
const categories = [
    { name: 'Vehicles', icon: 'vehicles' },
    { name: 'Mobile Phones & Tablets', icon: 'phone' },
    { name: 'Properties', icon: 'home' },
    { name: 'Home Appliances', icon: 'tv' },
    { name: 'Beauty & Personal Care', icon: 'beauty' },
    { name: 'Fashion', icon: 'default' },
    { name: 'Services', icon: 'default' },
    { name: 'Jobs', icon: 'default' },
    { name: 'Animals & Pets', icon: 'default' },
    { name: 'Food & Agriculture', icon: 'default' },
    { name: 'Repair & Construction', icon: 'default' }
]

const products = [
    {
        id: 1,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$45,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Brand New',
        image: '/images/placeholder.svg'
    },
    {
        id: 2,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$1,045,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Brand New',
        image: '/images/placeholder.svg'
    },
    {
        id: 3,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$45,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Used',
        image: '/images/placeholder.svg'
    },
    {
        id: 4,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$45,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Brand New',
        image: '/images/placeholder.svg'
    },
    {
        id: 5,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$45,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Used',
        image: '/images/placeholder.svg'
    },
    {
        id: 6,
        title: 'New Motorcycle 2022 Blue',
        price: 'N$1,845',
        description: 'This is a rechargeable bike that can go a 200 km on a single charge',
        location: 'Windhoek East',
        date: '3 hrs ago',
        category: 'Used',
        image: '/images/placeholder.svg'
    }
]
</script>

<style scoped></style>