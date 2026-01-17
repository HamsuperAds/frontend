<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 class="text-xl font-semibold">Transactions</h2>
            <span class="text-sm">({{ totalCount }})</span>
        </div>

        <!-- Search and Filter -->
        <div class="p-6 border-b flex items-center gap-4">
            <div class="relative flex-1 max-w-md">
                <input v-model="searchQuery" type="text" placeholder="Search transactions"
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
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-if="isLoading">
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            <Icon name="svg-spinners:ring-resize" class="w-8 h-8 mx-auto mb-2" />
                            Loading transactions...
                        </td>
                    </tr>
                    <tr v-else-if="transactions.length === 0">
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            No transactions found.
                        </td>
                    </tr>
                    <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ transaction.reference }}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            <div class="max-w-xs truncate" :title="transaction.description">
                                {{ transaction.description }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm font-semibold text-gray-900">
                            ₦{{ Number(transaction.amount).toLocaleString() }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600 capitalize">
                            {{ transaction.payment_method }}
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-xs px-2 py-1 rounded-full uppercase font-semibold"
                                :class="statusClasses[transaction.status.toLowerCase()] || 'bg-gray-100 text-gray-700'">
                                {{ transaction.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            {{ formatDate(transaction.created_at) }}
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
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue-sonner';
import type { Transaction } from '~/types/transaction';

definePageMeta({
    layout: 'profile'
})

const isLoading = ref(true)
const transactions = ref<Transaction[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const totalCount = ref(0)
const perPage = ref(15)

const statusClasses: Record<string, string> = {
    successful: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700'
}

const fetchTransactions = async (page = 1) => {
    isLoading.value = true
    try {
        const response = await useApi().fetchGet<{
            success: boolean;
            data: {
                current_page: number;
                data: Transaction[];
                last_page: number;
                total: number;
                per_page: number;
            };
        }>(`/transactions?page=${page}`)

        if (response.success) {
            transactions.value = response.data.data
            currentPage.value = response.data.current_page
            totalPages.value = response.data.last_page
            totalCount.value = response.data.total
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to fetch transactions')
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchTransactions()
})

watch(searchQuery, () => {
    // Implement search logic later
})

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    fetchTransactions(page)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>
