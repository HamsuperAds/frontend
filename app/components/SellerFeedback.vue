<template>
    <Dialog :open="isOpen" @update:open="$emit('update:open', $event)">
        <DialogContent class="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
                <DialogTitle class="text-xl font-bold">Seller Feedback</DialogTitle>
            </DialogHeader>

            <div class="flex-1 overflow-y-auto custom-scroll">
                <!-- Feedback Stats -->
                <div class="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5 text-gray-600" />
                        <span class="font-medium">All ({{ feedbackStats.total }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:face-smile" class="w-5 h-5 text-green-600" />
                        <span class="font-medium text-green-600">Positive ({{ feedbackStats.positive }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:face-frown" class="w-5 h-5 text-red-600" />
                        <span class="font-medium text-red-600">Negative ({{ feedbackStats.negative }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:minus" class="w-5 h-5 text-yellow-600" />
                        <span class="font-medium text-yellow-600">Neutral ({{ feedbackStats.neutral }})</span>
                    </div>
                </div>

                <!-- Add Feedback Button -->
                <div class="mb-6">
                    <button @click="toggleAddFeedback" :disabled="isSellerSelf"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {{ showAddForm ? 'Cancel' : 'Add Feedback' }}
                    </button>
                </div>

                <!-- Add Feedback Form -->
                <div v-if="showAddForm" class="mb-6 p-4 border border-gray-200 rounded-lg">
                    <form @submit.prevent="submitFeedback">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                            <select v-model="newFeedback.type" class="w-full p-2 border border-gray-300 rounded-md">
                                <option value="positive">Positive</option>
                                <option value="neutral">Neutral</option>
                                <option value="negative">Negative</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                            <textarea v-model="newFeedback.comment" rows="4"
                                class="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Share your experience with this seller..." required></textarea>
                        </div>
                        <button type="submit"
                            class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Submit Feedback
                        </button>
                    </form>
                </div>

                <!-- Feedback List -->
                <div v-if="!showAddForm" class="space-y-4">
                    <div v-for="feedback in feedbacks" :key="feedback.id" class="p-4 border border-gray-200 rounded-lg">
                        <!-- User Info -->
                        <div class="flex items-center gap-3 mb-3">
                            <img :src="feedback.user.avatar" :alt="feedback.user.name"
                                class="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h4 class="font-medium text-gray-900">{{ feedback.user.name }}</h4>
                            </div>
                        </div>

                        <!-- Comment -->
                        <p class="text-gray-700 mb-3">{{ feedback.comment }}</p>

                        <!-- Footer -->
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <div class="flex items-center gap-4">
                                <span>{{ formatDate(feedback.created_at) }}</span>
                                <div class="flex items-center gap-1" :class="{
                                    'text-green-600': feedback.type === 'positive',
                                    'text-red-600': feedback.type === 'negative',
                                    'text-yellow-600': feedback.type === 'neutral'
                                }">
                                    <Icon :name="getFeedbackIcon(feedback.type)" class="w-4 h-4" />
                                    <span class="capitalize">{{ feedback.type }}</span>
                                </div>
                            </div>
                            <button class="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                <Icon name="heroicons:heart" class="w-4 h-4" />
                                <span>{{ feedback.likes }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="!showAddForm && totalPages > 1" class="flex justify-center items-center gap-4 mt-6">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="currentPage === 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
                        <Icon name="heroicons:chevron-left" class="w-4 h-4" />
                        Previous
                    </button>

                    <span class="text-sm text-gray-600">
                        Page {{ currentPage }} of {{ totalPages }}
                    </span>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="currentPage === totalPages
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
                        Next
                        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const props = defineProps<{
    isOpen: boolean
    sellerId: string
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const { $getUser } = useNuxtApp()
const user = $getUser()

// Check if current user is the seller
const isSellerSelf = computed(() => user?.id === props.sellerId)

// Feedback state
const showAddForm = ref(false)
const currentPage = ref(1)
const totalPages = ref(3)

// New feedback form
const newFeedback = ref({
    type: 'positive',
    comment: ''
})

// Mock feedback data
const feedbacks = ref([
    {
        id: 1,
        user: {
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?u=john'
        },
        comment: 'Excellent seller! Very responsive and the item was exactly as described. Fast delivery and great communication throughout.',
        type: 'positive',
        likes: 5,
        created_at: '2024-01-15T10:30:00Z'
    },
    {
        id: 2,
        user: {
            name: 'Sarah Wilson',
            avatar: 'https://i.pravatar.cc/150?u=sarah'
        },
        comment: 'Item was okay, nothing special. Delivery took longer than expected but seller was polite.',
        type: 'neutral',
        likes: 2,
        created_at: '2024-01-10T14:20:00Z'
    },
    {
        id: 3,
        user: {
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?u=mike'
        },
        comment: 'Not satisfied with the purchase. Item had some defects that were not mentioned in the description.',
        type: 'negative',
        likes: 1,
        created_at: '2024-01-08T09:15:00Z'
    },
    {
        id: 4,
        user: {
            name: 'Emma Brown',
            avatar: 'https://i.pravatar.cc/150?u=emma'
        },
        comment: 'Amazing experience! The seller went above and beyond to ensure I was satisfied. Highly recommended!',
        type: 'positive',
        likes: 8,
        created_at: '2024-01-05T16:45:00Z'
    },
    {
        id: 5,
        user: {
            name: 'David Lee',
            avatar: 'https://i.pravatar.cc/150?u=david'
        },
        comment: 'Good seller, fair prices. Transaction went smoothly without any issues.',
        type: 'positive',
        likes: 3,
        created_at: '2024-01-03T11:30:00Z'
    }
])

// Feedback stats
const feedbackStats = computed(() => {
    const total = feedbacks.value.length
    const positive = feedbacks.value.filter(f => f.type === 'positive').length
    const negative = feedbacks.value.filter(f => f.type === 'negative').length
    const neutral = feedbacks.value.filter(f => f.type === 'neutral').length

    return { total, positive, negative, neutral }
})

// Methods
const toggleAddFeedback = () => {
    if (!user) {
        navigateTo('/auth/login')
        return
    }
    showAddForm.value = !showAddForm.value
}

const submitFeedback = () => {
    if (!user) return

    const feedback = {
        id: Date.now(),
        user: {
            name: `${user.first_name} ${user.last_name}`,
            avatar: user.avatar || 'https://i.pravatar.cc/150?u=default'
        },
        comment: newFeedback.value.comment,
        type: newFeedback.value.type,
        likes: 0,
        created_at: new Date().toISOString()
    }

    feedbacks.value.unshift(feedback)

    // Reset form
    newFeedback.value = {
        type: 'positive',
        comment: ''
    }
    showAddForm.value = false
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const getFeedbackIcon = (type: string) => {
    switch (type) {
        case 'positive': return 'heroicons:face-smile'
        case 'negative': return 'heroicons:face-frown'
        case 'neutral': return 'heroicons:minus'
        default: return 'heroicons:minus'
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}
</script>