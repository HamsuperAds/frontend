<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 class="text-xl font-semibold">My Feedback</h2>
            <div class="flex gap-2">
                <button @click="filterType = 'received'" class="px-4 py-1 rounded text-sm"
                    :class="filterType === 'received' ? 'bg-white text-blue-500' : 'bg-blue-600 hover:bg-blue-700'">
                    Received({{ stats.received_count }})
                </button>
                <button @click="filterType = 'sent'" class="px-4 py-1 rounded text-sm"
                    :class="filterType === 'sent' ? 'bg-white text-blue-500' : 'bg-blue-600 hover:bg-blue-700'">
                    Sent({{ stats.sent_count }})
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto mt-8">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="feedbacks.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
                <div class="bg-gray-100 rounded-full p-4 mb-4">
                    <Icon name="heroicons:inbox" class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-900">No feedbacks yet</h3>
                <p class="text-gray-500 mt-1">When you receive or send feedback, it will appear here.</p>
            </div>

            <table v-else class="w-full">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S/N</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-for="(feedback, index) in feedbacks" :key="feedback.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm">{{ index + 1 }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <img :src="getTargetUser(feedback)?.avatar || '/images/placeholder-user.png'"
                                    class="w-8 h-8 rounded-full object-cover">
                                <span class="text-sm font-medium text-gray-900">{{ getTargetUser(feedback)?.first_name
                                    }} {{
                                        getTargetUser(feedback)?.last_name }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-500 line-clamp-2 max-w-xs" :title="feedback.message">{{
                                feedback.message }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">
                                {{ filterType === 'sent' ? 'Sent' : 'Received' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm">
                            <div class="flex items-center text-yellow-500">
                                <Icon name="heroicons:star-solid" class="w-4 h-4 mr-1" />
                                <span class="text-gray-700">{{ feedback.rating }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(feedback.created_at) }}</td>
                        <td class="px-6 py-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <button class="text-gray-400 hover:text-gray-600">
                                        <Icon name="heroicons:ellipsis-vertical" class="w-5 h-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem @click="editFeedback(feedback)">
                                        <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="replyFeedback(feedback)"
                                        :disabled="filterType === 'sent'">
                                        <Icon name="heroicons:chat-bubble-left-right" class="w-4 h-4 mr-2" />
                                        Reply
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="showDeleteDialog(feedback)"
                                        :disabled="filterType === 'received'" class="text-red-600 focus:text-red-600">
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
        <div v-if="lastPage > 1" class="flex items-center justify-between p-6 border-t">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="flex items-center text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Prev
            </button>
            <span class="text-sm text-gray-500">Page {{ currentPage }} of {{ lastPage }}</span>
            <button @click="nextPage" :disabled="currentPage === lastPage"
                class="flex items-center text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>

        <!-- Reply Dialog -->
        <div v-if="showReplyDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="showReplyDialog = false">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-2">{{ selectedFeedback?.seller }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ selectedFeedback?.message }}</p>
                <div class="flex items-center gap-2 mb-4 text-sm">
                    <button class="flex items-center text-blue-600">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z">
                            </path>
                        </svg>
                        Like
                    </button>
                    <button class="flex items-center text-gray-600">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                        </svg>
                        Reply
                    </button>
                    <button class="flex items-center text-gray-600">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                        Edit
                    </button>
                    <span class="text-blue-600">👍 2</span>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                    <textarea v-model="replyText" placeholder="enter your reply"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"></textarea>
                </div>
                <button @click="submitReply" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Reply
                </button>
            </div>
        </div>

        <!-- Delete Dialog -->
        <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="showDeleteConfirm = false">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-2">Delete Feedback</h3>
                <p class="text-sm text-gray-600 mb-6">
                    You are about to delete this Feedback (by {{ selectedFeedback?.seller }}). This action is permanent
                    and cannot be undone
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

        <!-- Feedback Form Dialog -->
        <FeedbackFormDialog v-model:isOpen="showEditDialog" :feedback="selectedFeedback"
            @success="handleFeedbackSuccess" />
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'; // Assuming User type exists or I'll define a minimal one if not

definePageMeta({
    layout: 'profile'
})

// Types
interface FeedbackUser {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
}

interface Feedback {
    id: string;
    message: string;
    rating: number;
    created_at: string;
    from_user: FeedbackUser;
    to_user: FeedbackUser;
    replies: any[];
    [key: string]: any;
}

interface Stats {
    sent_count: number;
    received_count: number;
}

const filterType = ref<'sent' | 'received'>('sent')
const searchQuery = ref('')
const showReplyDialog = ref(false)
const showDeleteConfirm = ref(false)
const showEditDialog = ref(false)
const selectedFeedback = ref<Feedback | null>(null)
const replyText = ref('')
const isLoading = ref(false)
const currentPage = ref(1)
const lastPage = ref(1)

const feedbacks = ref<Feedback[]>([])
const stats = ref<Stats>({ sent_count: 0, received_count: 0 })


// Fetch Stats
const fetchStats = async () => {
    try {
        const response = await useApi().fetchGet<{ success: boolean; data: Stats }>('/my-user-feedbacks', {
            params: { type: 'stats' }
        })
        if (response.success) {
            stats.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch stats:', error)
    }
}

// Fetch Feedbacks
const fetchFeedbacks = async () => {
    isLoading.value = true
    try {
        const response = await useApi().fetchGet<{ success: boolean; data: { data: Feedback[]; current_page: number; last_page: number } }>('/my-user-feedbacks', {
            params: {
                type: filterType.value,
                page: currentPage.value
            }
        })

        if (response.success) {
            feedbacks.value = response.data.data
            currentPage.value = response.data.current_page
            lastPage.value = response.data.last_page
        }
    } catch (error) {
        console.error('Failed to fetch feedbacks:', error)
    } finally {
        isLoading.value = false
    }
}

// Watchers
watch(filterType, () => {
    currentPage.value = 1
    fetchFeedbacks()
})

watch(currentPage, () => {
    fetchFeedbacks()
})

// Format Date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

// Get Feedback Type (Positive/Negative/Neutral)
const getFeedbackType = (rating: number) => {
    if (rating >= 4) return 'Positive'
    if (rating <= 2) return 'Negative'
    return 'Neutral'
}

const getTargetUser = (feedback: Feedback) => {
    return filterType.value === 'received' ? feedback.from_user : feedback.to_user;
}

// Actions
const editFeedback = (feedback: Feedback) => {
    selectedFeedback.value = feedback
    showEditDialog.value = true
}

const handleFeedbackSuccess = () => {
    // Refresh the feedback list after successful edit
    fetchFeedbacks()
}

const replyFeedback = (feedback: Feedback) => {
    selectedFeedback.value = feedback
    showReplyDialog.value = true
}

const showDeleteDialog = (feedback: Feedback) => {
    selectedFeedback.value = feedback
    showDeleteConfirm.value = true
}

const submitReply = () => {
    console.log('Reply:', replyText.value)
    showReplyDialog.value = false
    replyText.value = ''
}

const confirmDelete = () => {
    if (selectedFeedback.value) {
        feedbacks.value = feedbacks.value.filter(f => f.id !== selectedFeedback.value!.id)
        showDeleteConfirm.value = false
        selectedFeedback.value = null
    }
}

const nextPage = () => {
    if (currentPage.value < lastPage.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

onMounted(() => {
    fetchStats()
    fetchFeedbacks()
})
</script>
