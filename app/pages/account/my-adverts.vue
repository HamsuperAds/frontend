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
                <button v-if="searchQuery.length > 0" @click="clearSearch"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
                <button v-else class="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div class="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <button
                            class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <template v-if="activeFilter">
                                <Icon name="heroicons:funnel" class="w-4 h-4" />
                                <span>{{ getFilterLabel() }}</span>
                                <button @click.stop="clearFilter" class="ml-1 text-gray-400 hover:text-gray-600">
                                    <Icon name="heroicons:x-mark" class="w-4 h-4" />
                                </button>
                            </template>
                            <template v-else>
                                <Icon name="heroicons:funnel" class="w-4 h-4" />
                                <span>Filter</span>
                                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
                            </template>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-48">
                        <!-- Status Section -->
                        <div class="px-2 py-1.5 text-xs font-semibold text-gray-500">Status</div>
                        <DropdownMenuItem @click="applyFilter('status', 'active')">
                            <Icon name="heroicons:check-circle" class="w-4 h-4 mr-2" />
                            Active Ads
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="applyFilter('status', 'suspended')">
                            <Icon name="heroicons:pause-circle" class="w-4 h-4 mr-2" />
                            Suspended Ads
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="applyFilter('status', 'sold')">
                            <Icon name="heroicons:currency-dollar" class="w-4 h-4 mr-2" />
                            Sold Ads
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="applyFilter('status', 'pending')">
                            <Icon name="heroicons:clock" class="w-4 h-4 mr-2" />
                            Pending Ads
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <!-- Promotion Type Section -->
                        <div class="px-2 py-1.5 text-xs font-semibold text-gray-500">Promotion Type</div>
                        <DropdownMenuItem @click="applyFilter('promotion_type', 'bronze')">
                            <Icon name="heroicons:star" class="w-4 h-4 mr-2 text-amber-700" />
                            Bronze Ads
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="applyFilter('promotion_type', 'silver')">
                            <Icon name="heroicons:star" class="w-4 h-4 mr-2 text-gray-400" />
                            Silver Ads
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="applyFilter('promotion_type', 'gold')">
                            <Icon name="heroicons:star" class="w-4 h-4 mr-2 text-yellow-500" />
                            Gold Ads
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
                            <span class="text-sm text-gray-600">{{ advert.promotionPlan?.name }}/{{
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
                            <template v-if="promotingAdId === advert.id">
                                <div class="p-2 flex justify-center text-blue-600">
                                    <Icon name="svg-spinners:ring-resize" class="w-5 h-5" />
                                </div>
                            </template>
                            <DropdownMenu v-else>
                                <DropdownMenuTrigger as-child>
                                    <button class="text-gray-400 hover:text-gray-600">
                                        <Icon name="heroicons:ellipsis-vertical" class="w-5 h-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem @click="editAdvert(advert)">
                                        <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="promoteAdvert(advert)"
                                        :disabled="advert.promotionPlan?.slug !== 'bronze'"
                                        :title="advert.promotionPlan?.slug !== 'bronze' ? 'Already promoted' : ''">
                                        <Icon name="heroicons:bolt" class="w-4 h-4 mr-2" />
                                        Promote
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="showDeleteDialog(advert)"
                                        class="text-red-600 focus:text-red-600">
                                        <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                    You are about to delete this ad (<span class="font-semibold">{{ selectedAdvert?.title }}</span>).
                    This
                    action is permanent and cannot
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
        <PricingPlansDialog v-model="showPricingDialog" :selected-plan-id="selectedAdvert?.promotion_plan?.id"
            @select="handlePlanSelection" />

        <EditAdSheet v-model:isOpen="showEditSheet" :ad="editingAd" @success="handleEditSuccess" />
    </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { toast } from 'vue-sonner';
import type { PromotionPlan } from '~/types/promotionPlan';

definePageMeta({
    layout: 'profile'
})

const isLoading = ref(true)
const isDeleting = ref(false)
const searchQuery = ref('')
const showDeleteConfirm = ref(false)
const selectedAdvert = ref<any>(null)
const showPricingDialog = ref(false)
const showEditSheet = ref(false)
const editingAd = ref<any>(null)

const adverts = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalCount = ref(0)
const perPage = ref(10)

// Filter state
const activeFilter = ref<{ type: 'status' | 'promotion_type'; value: string } | null>(null)

const statusClasses: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    unavailable: 'bg-gray-100 text-gray-700',
    rejected: 'bg-red-100 text-red-700'
}
const appResourceStore = useAppResourceInfoStore();
const plans = computed(() => appResourceStore.promotionPlans as PromotionPlan[]);

const fetchAds = async (page = 1, query = '', filterType = '', filterValue = '') => {
    isLoading.value = true
    try {
        let url = `/my-ads?per_page=${perPage.value}&page=${page}`
        if (query) {
            url += `&query=${encodeURIComponent(query)}`
        }
        if (filterType && filterValue) {
            url += `&${filterType}=${encodeURIComponent(filterValue)}`
        }

        const response = await useApi().fetchGet<{
            success: boolean;
            data: {
                current_page: number;
                data: any[];
                last_page: number;
                total: number;
                per_page: number;
            };
        }>(url)

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

// Debounced search with VueUse
watchDebounced(
    searchQuery,
    (newQuery) => {
        // Reset to page 1 when searching
        if (newQuery.length > 2) {
            fetchAds(
                1,
                newQuery,
                activeFilter.value?.type || '',
                activeFilter.value?.value || ''
            )
        } else if (newQuery.length === 0) {
            // Fetch without query when user clears input
            fetchAds(
                1,
                '',
                activeFilter.value?.type || '',
                activeFilter.value?.value || ''
            )
        }
    },
    { debounce: 500 }
)

const clearSearch = () => {
    searchQuery.value = ''
}

const applyFilter = (type: 'status' | 'promotion_type', value: string) => {
    activeFilter.value = { type, value }
    fetchAds(
        1,
        searchQuery.value.length > 2 ? searchQuery.value : '',
        type,
        value
    )
}

const clearFilter = () => {
    activeFilter.value = null
    fetchAds(
        1,
        searchQuery.value.length > 2 ? searchQuery.value : ''
    )
}

const getFilterLabel = () => {
    if (!activeFilter.value) return 'Filter'
    const labels = {
        status: {
            active: 'Active Ads',
            suspended: 'Suspended Ads',
            sold: 'Sold Ads',
            pending: 'Pending Ads'
        },
        promotion_type: {
            bronze: 'Bronze Ads',
            silver: 'Silver Ads',
            gold: 'Gold Ads'
        }
    }
    return labels[activeFilter.value.type][activeFilter.value.value] || 'Filter'
}

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    // Pass current search query and filter when changing pages
    fetchAds(
        page,
        searchQuery.value.length > 2 ? searchQuery.value : '',
        activeFilter.value?.type || '',
        activeFilter.value?.value || ''
    )
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB')
}

const editAdvert = (advert: any) => {
    editingAd.value = advert
    showEditSheet.value = true
}

const handleEditSuccess = () => {
    fetchAds(currentPage.value)
}

const promotingAdId = ref<string | null>(null)

const promoteAdvert = async (advert: any) => {
    selectedAdvert.value = advert;
    if (plans.value.length === 0) {
        await appResourceStore.fetchPromotionPlans();
    }
    showPricingDialog.value = true;
}

const handlePlanSelection = async (plan: PromotionPlan) => {
    if (plan.slug === 'bronze') {
        showPricingDialog.value = false
        return
    }

    if (!selectedAdvert.value) return

    showPricingDialog.value = false
    const adId = selectedAdvert.value.id
    promotingAdId.value = adId

    try {
        const response = await useApi().fetchPost<{
            success: boolean;
            message: string;
            data: {
                payment_url: string;
            };
        }>('/ads/promote', {
            ad_id: adId,
            promotion_plan_id: plan.id
        })

        if (response.success && response.data.payment_url) {
            toast.success('Redirecting to payment...')
            window.location.href = response.data.payment_url!
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to initiate promotion')
    } finally {
        promotingAdId.value = null
        selectedAdvert.value = null // Reset selected advert after attempt
    }
}

const showDeleteDialog = (advert: any) => {
    selectedAdvert.value = advert
    showDeleteConfirm.value = true
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
