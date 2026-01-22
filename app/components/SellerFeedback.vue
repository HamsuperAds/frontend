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
                        <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-4 h-4 text-gray-600" />
                        <span class="text-sm font-medium">All ({{ feedbackStats.total }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:star" class="w-4 h-4 text-yellow-500" />
                        <span class="text-sm font-medium text-gray-700">5 Stars ({{ feedbackStats.fiveStars }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400" />
                        <span class="text-sm font-medium text-gray-700">4 Stars ({{ feedbackStats.fourStars }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:star" class="w-4 h-4 text-yellow-300" />
                        <span class="text-sm font-medium text-gray-700">3 Stars ({{ feedbackStats.threeStars }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:star" class="w-4 h-4 text-orange-400" />
                        <span class="text-sm font-medium text-gray-700">1-2 Stars ({{ feedbackStats.lowStars }})</span>
                    </div>
                </div>

                <!-- Add Feedback Button -->
                <div class="mb-6">
                    <button v-if="!isEditMode" @click="toggleAddFeedback" :disabled="isSellerSelf"
                        class="px-3 py-2 rounded-lg text-sm font-medium border transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        :class="showAddForm
                            ? 'border-red-600 text-red-600 hover:bg-red-50'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
                        {{ showAddForm ? 'Cancel' : 'Add Feedback' }}
                    </button>
                </div>

                <!-- Add Feedback Form -->
                <div v-if="showAddForm" class="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 class="text-lg font-medium mb-4">{{ isEditMode ? 'Edit Feedback' : 'Add Feedback' }}</h3>

                    <!-- Success Message -->
                    <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p class="text-green-700 text-sm">{{ successMessage }}</p>
                    </div>

                    <!-- Error Message -->
                    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700 text-sm">{{ errorMessage }}</p>
                    </div>

                    <form @submit.prevent="submitFeedback">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                            <div class="flex items-center gap-1">
                                <button v-for="star in 5" :key="star" type="button" @click="newFeedback.rating = star"
                                    class="text-2xl transition-colors hover:scale-110"
                                    :class="star <= newFeedback.rating ? 'text-yellow-400' : 'text-gray-300'">
                                    ★
                                </button>
                                <span class="ml-2 text-sm text-gray-600">({{ newFeedback.rating }} star{{
                                    newFeedback.rating !== 1 ? 's' : '' }})</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Your Feedback *</label>
                            <textarea v-model="newFeedback.comment" rows="4"
                                class="w-full p-2 border rounded-md transition-colors"
                                :class="commentError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
                                placeholder="Share your experience with this seller... (10-1000 characters)"
                                :disabled="isSubmitting"></textarea>
                            <div class="flex justify-between items-center mt-1">
                                <p v-if="commentError" class="text-red-500 text-xs">{{ commentError }}</p>
                                <p class="text-gray-500 text-xs ml-auto">{{ newFeedback.comment.trim().length }}/1000
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button type="submit" :disabled="!isFormValid || isSubmitting"
                                class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                                <span v-if="isSubmitting"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span v-if="isSubmitting">{{ isEditMode ? 'Updating...' : 'Submitting...' }}</span>
                                <span v-else>{{ isEditMode ? 'Update Feedback' : 'Submit Feedback' }}</span>
                            </button>
                            <button v-if="isEditMode" type="button" @click="cancelEdit"
                                class="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Feedback List -->
                <div v-if="!showAddForm" class="space-y-4">
                    <div v-for="feedback in feedbacks" :key="feedback.id" class="p-4 border border-gray-200 rounded-lg">
                        <!-- User Info -->
                        <div class="flex items-center gap-3 mb-3">
                            <img :src="feedback.from_user.avatar"
                                :alt="`${feedback.from_user.first_name} ${feedback.from_user.last_name}`"
                                class="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h4 class="font-medium text-gray-900">{{ feedback.from_user.first_name }} {{
                                    feedback.from_user.last_name }}</h4>
                            </div>
                        </div>

                        <!-- Comment -->
                        <p class="text-gray-700 mb-3">{{ feedback.message }}</p>

                        <!-- Footer -->
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <div class="flex items-center gap-4">
                                <span>{{ formatDate(feedback.created_at) }}</span>
                                <div class="flex items-center gap-1">
                                    <div class="flex items-center">
                                        <span v-for="star in 5" :key="star" class="text-sm"
                                            :class="star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'">
                                            ★
                                        </span>
                                    </div>
                                    <span class="ml-1">{{ feedback.rating }} star{{ feedback.rating !== 1 ? 's' : ''
                                    }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <!-- Edit button - only show for user's own feedback -->
                                <button v-if="user && feedback.from_user.id === user.id" @click="editFeedback(feedback)"
                                    class="flex items-center gap-1 hover:text-blue-600 transition-colors p-1 rounded"
                                    title="Edit feedback">
                                    <Icon name="heroicons:pencil" class="w-4 h-4" />
                                </button>
                                <button class="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Icon name="heroicons:heart" class="w-4 h-4" />
                                    <span>{{ feedback.helpful_count || 0 }}</span>
                                </button>
                            </div>
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
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const editingFeedback = ref<string | null>(null)

// New feedback form
const newFeedback = ref({
    rating: 5,
    comment: ''
})

// Original feedback values for comparison
const originalFeedback = ref({
    rating: 5,
    comment: ''
})

// Check if we're in edit mode
const isEditMode = computed(() => editingFeedback.value !== null)

// Form validation - for edit mode, at least one field must change
const isFormValid = computed(() => {
    const commentValid = newFeedback.value.comment.trim().length >= 10 &&
        newFeedback.value.comment.trim().length <= 1000
    const ratingValid = newFeedback.value.rating >= 1 && newFeedback.value.rating <= 5

    if (isEditMode.value) {
        // In edit mode, at least one field must change
        const commentChanged = newFeedback.value.comment.trim() !== originalFeedback.value.comment
        const ratingChanged = newFeedback.value.rating !== originalFeedback.value.rating
        return (commentValid && ratingValid) && (commentChanged || ratingChanged)
    }

    return commentValid && ratingValid
})

const commentError = computed(() => {
    const length = newFeedback.value.comment.trim().length
    if (length === 0) return ''
    if (length < 10) return 'Feedback message must be at least 10 characters.'
    if (length > 1000) return 'Feedback message must not exceed 1000 characters.'
    return ''
})

// Fetch feedback from API
const { data: feedbackData, refresh } = await useApi().get<{
    success: boolean
    data: {
        current_page: number
        data: Array<{
            id: string
            from_user: {
                id: string
                first_name: string
                last_name: string
                avatar: string
            }
            message: string
            rating: number
            replies: Array<any>
            helpful_count: number
            unclear_count: number
            offensive_count: number
            created_at: string
        }>
        first_page_url: string
        from: number
        last_page: number
        last_page_url: string
        next_page_url: string | null
        path: string
        per_page: number
        prev_page_url: string | null
        to: number
        total: number
    }
}>(`/users/${props.sellerId}/feedbacks`, {
    requiresAuth: false,
    query: computed(() => ({
        page: currentPage.value
    }))
})

const feedbacks = computed(() => feedbackData.value?.data?.data || [])
const totalPages = computed(() => feedbackData.value?.data?.last_page || 1)

// Feedback stats based on ratings
const feedbackStats = computed(() => {
    const allFeedbacks = feedbacks.value
    const total = allFeedbacks.length
    const fiveStars = allFeedbacks.filter((f: any) => f.rating === 5).length
    const fourStars = allFeedbacks.filter((f: any) => f.rating === 4).length
    const threeStars = allFeedbacks.filter((f: any) => f.rating === 3).length
    const lowStars = allFeedbacks.filter((f: any) => f.rating <= 2).length

    return { total, fiveStars, fourStars, threeStars, lowStars }
})

// Methods
const toggleAddFeedback = () => {
    if (!user) {
        navigateTo('/auth/login')
        return
    }
    showAddForm.value = !showAddForm.value
    editingFeedback.value = null
    // Clear messages when toggling
    errorMessage.value = ''
    successMessage.value = ''
    // Reset form
    newFeedback.value = {
        rating: 5,
        comment: ''
    }
}

const editFeedback = (feedback: any) => {
    editingFeedback.value = feedback.id
    showAddForm.value = true
    // Populate form with existing values
    newFeedback.value = {
        rating: feedback.rating,
        comment: feedback.message
    }
    // Store original values for comparison
    originalFeedback.value = {
        rating: feedback.rating,
        comment: feedback.message
    }
    // Clear messages
    errorMessage.value = ''
    successMessage.value = ''
}

const cancelEdit = () => {
    editingFeedback.value = null
    showAddForm.value = false
    newFeedback.value = {
        rating: 5,
        comment: ''
    }
    originalFeedback.value = {
        rating: 5,
        comment: ''
    }
    errorMessage.value = ''
    successMessage.value = ''
}

const submitFeedback = async () => {
    if (!user || !isFormValid.value || isSubmitting.value) return

    // Clear previous messages
    errorMessage.value = ''
    successMessage.value = ''
    isSubmitting.value = true

    try {
        let response

        if (isEditMode.value) {
            console.log('this is an edit to feedback');
            // Update existing feedback - only send changed fields
            const updateData: any = {}

            if (newFeedback.value.comment.trim() !== originalFeedback.value.comment) {
                updateData.message = newFeedback.value.comment.trim()
            }

            if (newFeedback.value.rating !== originalFeedback.value.rating) {
                updateData.rating = newFeedback.value.rating
            }

            response = await useApi().put(`/user-feedbacks/${editingFeedback.value}`, updateData)
        } else {
            // Create new feedback
            response = await useApi().post('/user-feedbacks', {
                to_user_id: props.sellerId,
                message: newFeedback.value.comment.trim(),
                rating: newFeedback.value.rating
            })
        }

        // Check if the response indicates success
        console.log(response);
        if (response.status.value === 'error') {
            // Handle backend error response
            errorMessage.value = response.error.value?.data.message || `Failed to ${isEditMode.value ? 'update' : 'submit'} feedback.`
            return
        }

        successMessage.value = `Feedback ${isEditMode.value ? 'updated' : 'submitted'} successfully!`

        // Reset form after a delay
        setTimeout(() => {
            newFeedback.value = {
                rating: 5,
                comment: ''
            }
            originalFeedback.value = {
                rating: 5,
                comment: ''
            }
            editingFeedback.value = null
            showAddForm.value = false
            successMessage.value = ''
        }, 2000)

        // Refresh feedback data
        await refresh()
    } catch (error: any) {
        console.error(`Error ${isEditMode.value ? 'updating' : 'submitting'} feedback:`, error)

        // Handle different error types
        if (error.response?.status === 422) {
            const errorData = error.response.data
            if (errorData.message) {
                // Show the exact error message from backend
                errorMessage.value = errorData.message
            } else if (errorData.errors) {
                // Handle validation errors
                const errors = []
                if (errorData.errors.message) errors.push(...errorData.errors.message)
                if (errorData.errors.rating) errors.push(...errorData.errors.rating)
                if (errorData.errors.to_user_id) errors.push(...errorData.errors.to_user_id)
                errorMessage.value = errors.join(' ')
            } else {
                // Fallback for 422 without specific message
                errorMessage.value = 'Invalid data provided. Please check your input.'
            }
        } else if (error.response?.status === 401) {
            errorMessage.value = 'Please log in to submit feedback.'
            navigateTo('/auth/login')
        } else if (error.response?.status === 403) {
            errorMessage.value = 'You are not authorized to perform this action.'
        } else if (error.response?.data?.message) {
            // Handle any other error with a message from backend
            errorMessage.value = error.response.data.message
        } else if (error.message) {
            // Handle error message directly
            errorMessage.value = error.message
        } else {
            errorMessage.value = `Failed to ${isEditMode.value ? 'update' : 'submit'} feedback. Please try again.`
        }
    } finally {
        isSubmitting.value = false
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const prevPage = async () => {
    if (currentPage.value > 1) {
        currentPage.value--
        await refresh()
    }
}

const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        await refresh()
    }
}
</script>