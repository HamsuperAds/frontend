<template>
    <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <DialogContent class="max-w-md">
            <DialogHeader>
                <DialogTitle>{{ isEditMode ? 'Edit Feedback' : 'Add Feedback' }}</DialogTitle>
            </DialogHeader>

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
                        <button v-for="star in 5" :key="star" type="button" @click="formData.rating = star"
                            class="text-2xl transition-colors hover:scale-110"
                            :class="star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'">
                            ★
                        </button>
                        <span class="ml-2 text-sm text-gray-600">({{ formData.rating }} star{{
                            formData.rating !== 1 ? 's' : '' }})</span>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Feedback *</label>
                    <textarea v-model="formData.comment" rows="4" class="w-full p-2 border rounded-md transition-colors"
                        :class="commentError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
                        placeholder="Share your experience... (10-1000 characters)" :disabled="isSubmitting"></textarea>
                    <div class="flex justify-between items-center mt-1">
                        <p v-if="commentError" class="text-red-500 text-xs">{{ commentError }}</p>
                        <p class="text-gray-500 text-xs ml-auto">{{ formData.comment.trim().length }}/1000
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
                    <button type="button" @click="$emit('update:isOpen', false)"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    isOpen: boolean
    feedback?: {
        id: string
        rating: number
        message: string
    } | null
    toUserId?: string
}>()

const emit = defineEmits<{
    'update:isOpen': [value: boolean]
    'success': [void]
}>()

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const formData = ref({
    rating: 5,
    comment: ''
})

const originalFeedback = ref({
    rating: 5,
    comment: ''
})

const isEditMode = computed(() => !!props.feedback)

// Form validation
const isFormValid = computed(() => {
    const commentValid = formData.value.comment.trim().length >= 10 &&
        formData.value.comment.trim().length <= 1000
    const ratingValid = formData.value.rating >= 1 && formData.value.rating <= 5

    if (isEditMode.value) {
        // In edit mode, at least one field must change
        const commentChanged = formData.value.comment.trim() !== originalFeedback.value.comment
        const ratingChanged = formData.value.rating !== originalFeedback.value.rating
        return (commentValid && ratingValid) && (commentChanged || ratingChanged)
    }

    return commentValid && ratingValid
})

const commentError = computed(() => {
    const length = formData.value.comment.trim().length
    if (length === 0) return ''
    if (length < 10) return 'Feedback message must be at least 10 characters.'
    if (length > 1000) return 'Feedback message must not exceed 1000 characters.'
    return ''
})

// Watch for prop changes to populate form
watch(() => props.feedback, (newFeedback) => {
    if (newFeedback) {
        formData.value = {
            rating: newFeedback.rating,
            comment: newFeedback.message
        }
        originalFeedback.value = {
            rating: newFeedback.rating,
            comment: newFeedback.message
        }
    } else {
        formData.value = {
            rating: 5,
            comment: ''
        }
        originalFeedback.value = {
            rating: 5,
            comment: ''
        }
    }
    errorMessage.value = ''
    successMessage.value = ''
}, { immediate: true })

// Watch for dialog close to reset form
watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        // Reset form when dialog closes
        formData.value = {
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
})

const submitFeedback = async () => {
    if (!isFormValid.value || isSubmitting.value) return

    // Clear previous messages
    errorMessage.value = ''
    successMessage.value = ''
    isSubmitting.value = true

    try {
        let response

        if (isEditMode.value && props.feedback) {
            // Update existing feedback - only send changed fields
            const updateData: any = {}

            if (formData.value.comment.trim() !== originalFeedback.value.comment) {
                updateData.message = formData.value.comment.trim()
            }

            if (formData.value.rating !== originalFeedback.value.rating) {
                updateData.rating = formData.value.rating
            }

            response = await useApi().fetchPut(`/user-feedbacks/${props.feedback.id}`, updateData)
        } else {
            // Create new feedback
            if (!props.toUserId) {
                errorMessage.value = 'Missing recipient information'
                return
            }
            response = await useApi().fetchPost('/user-feedbacks', {
                to_user_id: props.toUserId,
                message: formData.value.comment.trim(),
                rating: formData.value.rating
            })
        }

        successMessage.value = `Feedback ${isEditMode.value ? 'updated' : 'submitted'} successfully!`

        // Emit success event and close dialog after a delay
        setTimeout(() => {
            emit('success')
            emit('update:isOpen', false)
        }, 1000)

    } catch (error: any) {
        console.error(`Error ${isEditMode.value ? 'updating' : 'submitting'} feedback:`, error)

        // Handle different error types
        if (error.response?.status === 422) {
            const errorData = error.response.data
            if (errorData.message) {
                errorMessage.value = errorData.message
            } else if (errorData.errors) {
                const errors = []
                if (errorData.errors.message) errors.push(...errorData.errors.message)
                if (errorData.errors.rating) errors.push(...errorData.errors.rating)
                if (errorData.errors.to_user_id) errors.push(...errorData.errors.to_user_id)
                errorMessage.value = errors.join(' ')
            } else {
                errorMessage.value = 'Invalid data provided. Please check your input.'
            }
        } else if (error.response?.status === 401) {
            errorMessage.value = 'Please log in to submit feedback.'
        } else if (error.response?.status === 403) {
            errorMessage.value = 'You are not authorized to perform this action.'
        } else if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message
        } else if (error.message) {
            errorMessage.value = error.message
        } else {
            errorMessage.value = `Failed to ${isEditMode.value ? 'update' : 'submit'} feedback. Please try again.`
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>
