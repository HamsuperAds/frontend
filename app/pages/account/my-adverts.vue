<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 class="text-xl font-semibold">My Adverts</h2>
            <span class="text-sm">(23)</span>
        </div>

        <!-- Search and Filter -->
        <div class="p-6 border-b flex items-center gap-4">
            <div class="relative flex-1 max-w-md">
                <input v-model="searchQuery" type="text" placeholder="Search adverts"
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
            <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                    </path>
                </svg>
                Filter
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S/N</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Advert</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-for="(advert, index) in adverts" :key="index" class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm">{{ index + 1 }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <img :src="advert.image" :alt="advert.title" class="w-12 h-12 object-cover rounded" />
                                <span class="text-sm font-medium text-gray-900">{{ advert.title }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm text-gray-600">{{ advert.type }}</span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm text-gray-600">{{ advert.status }}</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ advert.created }}</td>
                        <td class="px-6 py-4">
                            <div class="relative">
                                <button @click="toggleDropdown(index)" class="text-gray-400 hover:text-gray-600">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                                        </path>
                                    </svg>
                                </button>
                                <div v-if="activeDropdown === index"
                                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-10">
                                    <button @click="editAdvert(advert)"
                                        class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                            </path>
                                        </svg>
                                        Edit
                                    </button>
                                    <button @click="promoteAdvert(advert)"
                                        class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        Promote
                                    </button>
                                    <button @click="showDeleteDialog(advert)"
                                        class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between p-6 border-t">
            <button class="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Prev
            </button>
            <button class="flex items-center text-sm text-gray-600 hover:text-gray-900">
                Next
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>

        <!-- Delete Dialog -->
        <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="showDeleteConfirm = false">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-2">Delete Ad</h3>
                <p class="text-sm text-gray-600 mb-6">
                    You are about to delete this ad ({{ selectedAdvert?.title }}). This action is permanent and cannot
                    be undone
                </p>
                <div class="flex gap-3">
                    <button @click="showDeleteConfirm = false"
                        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button @click="confirmDelete"
                        class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'profile'
})

const searchQuery = ref('')
const activeDropdown = ref<number | null>(null)
const showDeleteConfirm = ref(false)
const selectedAdvert = ref<any>(null)

const adverts = ref([
    {
        title: 'HP Elitebook GB 16gb RAM 254GB SSD',
        type: 'Bronze',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles.png'
    },
    {
        title: 'Qlinq Motorcycle 2024 Black',
        type: 'Silver',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles1.png'
    },
    {
        title: 'Samsung Galaxy S25 4gb RAM',
        type: 'Gold',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles2.png'
    },
    {
        title: 'HP Elitebook GB 16gb RAM 254GB',
        type: 'Bronze',
        status: 'Unavailable',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles3.png'
    },
    {
        title: 'Toyota Camry 2012 Black',
        type: 'Silver',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles.png'
    },
    {
        title: 'Canadian Solar Panel 450watts',
        type: 'Gold',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles1.png'
    },
    {
        title: 'Oraim H210 earpod, 5hr listening time',
        type: 'Gold',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles2.png'
    },
    {
        title: 'Sharp AR2340 # in-one printer',
        type: 'Silver',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles3.png'
    },
    {
        title: 'HP high resolution A4 scanner',
        type: 'Bronze',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles.png'
    },
    {
        title: 'HP Elitebook GB 16gb RAM 254GB SSD',
        type: 'Bronze',
        status: 'Available',
        created: '23/04/2025',
        image: '/images/temp/electric-motorcycles1.png'
    }
])

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index
}

const editAdvert = (advert: any) => {
    console.log('Edit advert:', advert)
    activeDropdown.value = null
}

const promoteAdvert = (advert: any) => {
    console.log('Promote advert:', advert)
    activeDropdown.value = null
}

const showDeleteDialog = (advert: any) => {
    selectedAdvert.value = advert
    showDeleteConfirm.value = true
    activeDropdown.value = null
}

const confirmDelete = () => {
    adverts.value = adverts.value.filter(a => a !== selectedAdvert.value)
    showDeleteConfirm.value = false
    selectedAdvert.value = null
}
</script>
