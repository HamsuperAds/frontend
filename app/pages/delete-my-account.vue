<template>
    <div class="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-screen">
        <div class="w-full max-w-md">
            <!-- Main Form -->
            <div v-if="!showSuccess" class="bg-white rounded-lg shadow-lg border-2 border-red-300 p-8">
                <div class="mb-6">
                    <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 text-center">Delete My Account</h2>
                    <p class="text-sm text-gray-600 mt-2 text-center">
                        Request permanent deletion of your Hamsuper account
                    </p>
                </div>

                <!-- Info Box -->
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div class="text-xs text-yellow-800">
                            <p class="font-semibold mb-1">Important Information:</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>We'll send a secure deletion link to your email</li>
                                <li>Your account will be marked for deletion</li>
                                <li>Permanent removal occurs after 30 days</li>
                                <li>All data including ads and messages will be deleted</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- Error Message -->
                    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                            <span class="text-red-500">*</span>
                        </label>
                        <input v-model="email" type="email" placeholder="Enter your registered email address"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            :disabled="isLoading" required />
                        <p class="text-xs text-gray-500 mt-1">
                            Enter the email address associated with your account
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading || isSubmitDisabled"
                        class="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Sending Request...' : 'Request Account Deletion' }}
                    </button>
                </form>

                <!-- Additional Info -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <div class="text-center text-sm text-gray-600">
                        <p class="mb-2">Need help or have questions?</p>
                        <a href="/contact-us" class="text-blue-500 hover:text-blue-600 font-medium">Contact Support</a>
                    </div>
                </div>

                <!-- Back to Home -->
                <div class="mt-4 text-center">
                    <a href="/" class="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </a>
                </div>
            </div>

            <!-- Success Message -->
            <div v-else class="bg-white rounded-lg shadow-lg border-2 border-green-300 p-8">
                <div class="text-center">
                    <div class="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 class="text-2xl font-bold text-gray-900 mb-3">Deletion Link Sent!</h2>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p class="text-sm text-green-800 leading-relaxed">
                            We've sent a secure deletion link to <strong class="font-semibold">{{ email }}</strong>.
                            Please check your inbox and click the link to confirm your account deletion.
                        </p>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <p class="text-sm font-semibold text-gray-900 mb-2">Next Steps:</p>
                        <ol class="text-sm text-gray-600 space-y-2">
                            <li class="flex items-start gap-2">
                                <span
                                    class="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex-shrink-0">
                                    1
                                </span>
                                <span>Check your email inbox (and spam folder)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span
                                    class="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex-shrink-0">
                                    2
                                </span>
                                <span>Click the deletion link in the email</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span
                                    class="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex-shrink-0">
                                    3
                                </span>
                                <span>Your account will be marked for deletion</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span
                                    class="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex-shrink-0">
                                    4
                                </span>
                                <span>Permanent removal after 30 days</span>
                            </li>
                        </ol>
                    </div>

                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                        <p class="text-xs text-yellow-800">
                            <strong>Note:</strong> The deletion link expires in 24 hours. If you don't receive the email
                            within a few minutes, you can request a new link.
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button @click="resetForm"
                            class="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                            Request Another Link
                        </button>
                        <a href="/"
                            class="flex-1 bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm inline-flex items-center justify-center">
                            Return to Home
                        </a>
                    </div>

                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-xs text-gray-500">
                            Didn't request this? Please ignore this message or
                            <a href="/contact-us" class="text-blue-500 hover:text-blue-600">contact support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Delete My Account - Hamsuper',
    description: 'Request permanent deletion of your Hamsuper account. We\'ll send a secure link to your email to confirm the deletion.'
})
definePageMeta({
    auth: false,
});

const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const showSuccess = ref(false)

const isSubmitDisabled = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !emailPattern.test(email.value.trim())
})

const handleSubmit = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/request-account-deletion', {
            email: email.value.trim()
        }, { requiresAuth: false })

        if (response.status === 'success') {
            showSuccess.value = true
        }
    } catch (error: any) {
        console.error('Account deletion request error:', error)
        errorMessage.value =
            error.data?.message ||
            error.data?.errors?.email?.[0] ||
            'Failed to send deletion request. Please try again or contact support.'
    } finally {
        isLoading.value = false
    }
}

const resetForm = () => {
    email.value = ''
    errorMessage.value = ''
    showSuccess.value = false
    isLoading.value = false
}
</script>
