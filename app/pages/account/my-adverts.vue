<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 class="text-xl font-semibold">My Adverts</h2>
            <span class="text-sm">({{ totalCount }})</span>
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
                    <tr v-if="isLoading">
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            <Icon name="svg-spinners:ring-resize" class="w-8 h-8 mx-auto mb-2" />
                            Loading adverts...
                        </td>
                    </tr>
                    <tr v-else-if="adverts.length === 0">
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            No adverts found matching your search.
                        </td>
                    </tr>
                    <tr v-for="(advert, index) in adverts" :key="advert.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                        <td class="px-6 py-4">
                            <NuxtLink :to="`/ad-details?id=${advert.id}`">
                                <div class="flex items-center gap-3">
                                    <img :src="advert.primary_image?.image_path || '/images/placeholder.png'"
                                        :alt="advert.title" class="w-12 h-12 object-cover rounded" />
                                    <div class="">
                                        <span class="text-sm font-medium text-gray-900 line-clamp-1">{{ advert.title
                                            }}</span>
                                        <!-- show ad price -->
                                        <span class="text-sm text-gray-600 block">₦{{
                                            Number(advert.price).toLocaleString()
                                            }}</span>
                                    </div>
                                </div>
                            </NuxtLink>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm text-gray-600">{{ advert.promotion_plan?.name }}/{{
                                advert.subcategory?.name }}</span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-xs px-2 py-1 rounded-full uppercase font-semibold"
                                :class="statusClasses[advert.status.toLowerCase()]">
                                {{ advert.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(advert.created_at) }}</td>
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
        <div v-if="totalPages > 1" class="flex items-center justify-between p-6 border-t font-medium">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="flex items-center text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Prev
            </button>
            <span class="text-sm text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="flex items-center text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
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
                    <button @click="confirmDelete" :disabled="isDeleting"
                        class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 flex items-center justify-center">
                        <Icon v-if="isDeleting" name="svg-spinners:ring-resize" class="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <PricingPlansDialog v-model="showPricingDialog" />
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { PromotionPlan } from '~/types/promotionPlan';

definePageMeta({
    layout: 'profile'
})

const isLoading = ref(true)
const isDeleting = ref(false)
const searchQuery = ref('')
const activeDropdown = ref<number | null>(null)
const showDeleteConfirm = ref(false)
const selectedAdvert = ref<any>(null)
const showPricingDialog = ref(false)

const adverts = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalCount = ref(0)
const perPage = ref(10)

const statusClasses: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    unavailable: 'bg-gray-100 text-gray-700',
    rejected: 'bg-red-100 text-red-700'
}
const appResourceStore = useAppResourceInfoStore();
const plans = computed(() => appResourceStore.promotionPlans as PromotionPlan[]);

const fetchAds = async (page = 1) => {
    isLoading.value = true
    try {
        const response = await useApi().fetchGet<{
            success: boolean;
            data: {
                current_page: number;
                data: any[];
                last_page: number;
                total: number;
                per_page: number;
            };
        }>(`/my-ads?per_page=${perPage.value}&page=${page}`)

        if (response.success) {
            adverts.value = response.data.data
            currentPage.value = response.data.current_page
            totalPages.value = response.data.last_page
            totalCount.value = response.data.total
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to fetch adverts')
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await fetchAds()
})

watch(searchQuery, () => {
    // Simple local filtering if needed, or trigger new API fetch with search param
    // For now, let's stick to initial fetch
})

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    fetchAds(page)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB')
}

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index
}

const editAdvert = (advert: any) => {
    console.log('Edit advert:', advert)
    activeDropdown.value = null
    // Navigate to edit page
    navigateTo(`/account/edit-ad/${advert.id}`)
}

const promoteAdvert = async (advert: any) => {
    console.log('Promote advert:', advert);
    showPricingDialog.value = true;
    if (plans.value.length === 0) {
        await appResourceStore.fetchPromotionPlans();
    }
    activeDropdown.value = null
}

const showDeleteDialog = (advert: any) => {
    selectedAdvert.value = advert
    showDeleteConfirm.value = true
    activeDropdown.value = null
}

const confirmDelete = async () => {
    if (!selectedAdvert.value || isDeleting.value) return

    isDeleting.value = true
    try {
        const response = await useApi().fetchDelete<{
            success: boolean;
            message: string;
        }>(`/ads/${selectedAdvert.value.id}`)

        if (response.success) {
            toast.success(response.message || 'Advert deleted successfully')
            fetchAds(currentPage.value) // Refresh current page
            showDeleteConfirm.value = false
            selectedAdvert.value = null
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to delete advert')
    } finally {
        isDeleting.value = false
    }
}
</script>
