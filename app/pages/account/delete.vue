<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Delete My Account</h2>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="max-w-2xl mx-auto">
                <!-- Warning Card -->
                <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0">
                            <svg class="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-red-900 mb-3">Warning: This action cannot be undone!</h3>
                            <p class="text-red-800 mb-4">
                                Deleting your account is permanent and will result in the immediate loss of:
                            </p>
                            <ul class="space-y-2 text-red-800">
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span><strong>All your advertisements</strong> - including both regular and promoted
                                        ads</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span><strong>All feedback</strong> - both received and sent</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span><strong>All messages</strong> - your entire conversation history</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span><strong>Your profile information</strong> - all personal details and
                                        preferences</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span><strong>Access to your account</strong> - you will need to create a new
                                        account to use our services again</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Info Text -->
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <p class="text-gray-700 text-sm">
                        <strong>Please note:</strong> Once you delete your account, there is no way to recover your
                        data.
                        If you're experiencing issues, please consider contacting our support team instead.
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Cancel Button (Emphasized) -->
                    <button @click="handleCancel"
                        class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg text-lg">
                        Keep My Account
                    </button>

                    <!-- Delete Button -->
                    <button @click="showConfirmDialog = true"
                        class="flex-1 bg-white border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                        Delete Account
                    </button>
                </div>

                <!-- Additional Help -->
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Need help? <a href="/account/faqs" class="text-blue-600 hover:text-blue-700 font-medium">Visit
                            our FAQs</a> or
                        <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>

        <!-- Confirmation Dialog -->
        <div v-if="showConfirmDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click.self="showConfirmDialog = false">
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
                <div class="text-center mb-6">
                    <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Final Confirmation</h3>
                    <p class="text-gray-600 mb-4">
                        Are you absolutely sure you want to delete your account? This action is <strong>permanent and
                            irreversible</strong>.
                    </p>
                </div>

                <div class="flex flex-col gap-3">
                    <!-- Cancel Button (Emphasized) -->
                    <button @click="showConfirmDialog = false"
                        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                        No, Keep My Account
                    </button>

                    <!-- Confirm Delete Button -->
                    <button @click="confirmDelete"
                        class="w-full bg-white border border-red-600 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                        Yes, Delete Permanently
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

const showConfirmDialog = ref(false)

const handleCancel = () => {
    // Navigate back to account page or dashboard
    navigateTo('/account')
}

const confirmDelete = () => {
    // Here you would make an API call to delete the account
    console.log('Deleting account...')

    // Show success message and redirect to home
    alert('Your account has been deleted successfully.')

    // Clear any stored auth tokens/data
    // localStorage.removeItem('authToken')

    // Redirect to home page
    navigateTo('/')
}
</script>
