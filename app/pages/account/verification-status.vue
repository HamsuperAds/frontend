<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-4xl mx-auto px-4">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Verification Status</h1>
                <p class="text-gray-600">Track your seller verification request status and manage your application.</p>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="bg-white rounded-lg shadow-sm p-8 text-center">
                <div
                    class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4">
                </div>
                <p class="text-gray-600">Loading verification status...</p>
            </div>

            <!-- No Request Found -->
            <div v-else-if="!verificationRequest?.data" class="bg-white rounded-lg shadow-sm p-8 text-center">
                <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h1 class="text-2xl font-bold text-gray-900 mb-2">No Verification Request</h1>
                <p class="text-gray-600 mb-6">You haven't submitted a verification request yet.</p>
                <NuxtLink to="/account/verification-request"
                    class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Submit Verification Request
                </NuxtLink>
            </div>

            <!-- Verification Request Details -->
            <div v-else class="space-y-6">
                <!-- Status Header -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h1 class="text-2xl font-bold text-gray-900">Verification Status</h1>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full"
                                :class="getStatusColor(verificationRequest.data.status.value)">
                            </div>
                            <span class="text-sm font-medium"
                                :class="getStatusTextColor(verificationRequest.data.status.value)">
                                {{ verificationRequest.data.status.label }}
                            </span>
                        </div>
                    </div>

                    <div v-if="verificationRequest.data.status.value === 'approved'"
                        class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <Icon name="heroicons:check-badge" class="w-8 h-8 text-green-600" />
                            <div>
                                <h3 class="font-semibold text-green-900">Congratulations!</h3>
                                <p class="text-green-700">Your seller verification has been approved. You are now a
                                    verified seller!</p>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="verificationRequest.data.status.value === 'rejected'"
                        class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                            <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600 mt-1" />
                            <div class="flex-1">
                                <h3 class="font-semibold text-red-900 mb-2">Verification Rejected</h3>
                                <p class="text-red-700 mb-4">Your verification request has been rejected. Please review
                                    the issues below and resubmit your request.</p>

                                <!-- Rejection Reasons -->
                                <div v-if="verificationRequest.data.rejection_reasons" class="space-y-2 mb-4">
                                    <h4 class="font-medium text-red-900">Issues to address:</h4>
                                    <ul class="list-disc list-inside space-y-1">
                                        <li v-for="(reason, field) in verificationRequest.data.rejection_reasons"
                                            :key="field" class="text-red-700 text-sm">
                                            <strong>{{ formatFieldName(field) }}:</strong> {{ reason }}
                                        </li>
                                    </ul>
                                </div>

                                <!-- Admin Message -->
                                <div v-if="verificationRequest.data.user_message"
                                    class="bg-white border border-red-200 rounded p-3 mb-4">
                                    <p class="text-sm text-gray-700">
                                        <strong>Additional feedback:</strong> {{ verificationRequest.data.user_message
                                        }}
                                    </p>
                                </div>

                                <!-- Resubmit Button -->
                                <button v-if="verificationRequest.data.can_resubmit" @click="navigateToResubmit"
                                    class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                    Resubmit Request
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="verificationRequest.data.status.value === 'pending'"
                        class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-600" />
                            <div>
                                <h3 class="font-semibold text-yellow-900">Pending Review</h3>
                                <p class="text-yellow-700">Your verification request is in queue for review. We'll
                                    notify you once it's processed.</p>
                                <p class="text-yellow-600 text-sm mt-1">Expected processing time: 3-5 business days</p>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="verificationRequest.data.status.value === 'under_review'"
                        class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <Icon name="heroicons:eye" class="w-6 h-6 text-blue-600" />
                            <div>
                                <h3 class="font-semibold text-blue-900">Under Review</h3>
                                <p class="text-blue-700">Our team is currently reviewing your verification documents.
                                </p>
                                <p class="text-blue-600 text-sm mt-1">We'll update you soon with the results.</p>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="verificationRequest.data.status.value === 'resubmitted'"
                        class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <Icon name="heroicons:arrow-path" class="w-6 h-6 text-orange-600" />
                            <div>
                                <h3 class="font-semibold text-orange-900">Resubmitted</h3>
                                <p class="text-orange-700">Your updated verification request has been resubmitted and is
                                    pending review.</p>
                                <p class="text-orange-600 text-sm mt-1">Expected processing time: 2-3 business days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Request Details -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Request Details</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-medium text-gray-900 mb-2">Business Information</h3>
                            <div class="space-y-2 text-sm">
                                <div>
                                    <span class="text-gray-600">Business Name:</span>
                                    <span class="ml-2 text-gray-900">{{ verificationRequest.data.business_name }}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">Phone Number:</span>
                                    <span class="ml-2 text-gray-900">{{ verificationRequest.data.business_phone_number
                                        }}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">ID Type:</span>
                                    <span class="ml-2 text-gray-900">{{ verificationRequest.data.id_type.label }}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 class="font-medium text-gray-900 mb-2">Timeline</h3>
                            <div class="space-y-2 text-sm">
                                <div>
                                    <span class="text-gray-600">Submitted:</span>
                                    <span class="ml-2 text-gray-900">{{
                                        formatDate(verificationRequest.data.submitted_at) }}</span>
                                </div>
                                <div v-if="verificationRequest.data.reviewed_at">
                                    <span class="text-gray-600">Reviewed:</span>
                                    <span class="ml-2 text-gray-900">{{ formatDate(verificationRequest.data.reviewed_at)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h3 class="font-medium text-gray-900 mb-2">Business Address</h3>
                        <p class="text-sm text-gray-700">{{ verificationRequest.data.business_address }}</p>
                    </div>
                </div>

                <!-- Uploaded Documents -->
                <div v-if="verificationRequest.data.images" class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div v-if="verificationRequest.data.images.government_id">
                            <h3 class="font-medium text-gray-900 mb-2">Government ID</h3>
                            <img :src="verificationRequest.data.images.government_id" alt="Government ID"
                                class="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                                @click="openImageModal(verificationRequest.data.images.government_id, 'Government ID')" />
                        </div>

                        <div v-if="verificationRequest.data.images.business_cert">
                            <h3 class="font-medium text-gray-900 mb-2">Business Certificate</h3>
                            <img :src="verificationRequest.data.images.business_cert" alt="Business Certificate"
                                class="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                                @click="openImageModal(verificationRequest.data.images.business_cert, 'Business Certificate')" />
                        </div>

                        <div v-if="verificationRequest.data.images.proof_of_address">
                            <h3 class="font-medium text-gray-900 mb-2">Proof of Address</h3>
                            <img :src="verificationRequest.data.images.proof_of_address" alt="Proof of Address"
                                class="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                                @click="openImageModal(verificationRequest.data.images.proof_of_address, 'Proof of Address')" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Modal -->
        <div v-if="imageModal.show"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            @click="closeImageModal">
            <div class="max-w-4xl max-h-full">
                <div class="bg-white rounded-lg p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">{{ imageModal.title }}</h3>
                        <button @click="closeImageModal" class="text-gray-500 hover:text-gray-700">
                            <Icon name="heroicons:x-mark" class="w-6 h-6" />
                        </button>
                    </div>
                    <img :src="imageModal.src" :alt="imageModal.title"
                        class="max-w-full max-h-96 object-contain mx-auto" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { VerificationRequest, VerificationGetResponse } from '~/types/verification'

definePageMeta({
    layout: 'profile'
})

const { data: verificationRequest, pending, error, refresh } = await useApi().get<VerificationGetResponse>('/verification-requests/my-request', {
    server: false,
    default: () => null,
    onResponseError() {
        // Handle 404 errors (no request found)
        return null
    }
})

const imageModal = ref({
    show: false,
    src: '',
    title: ''
})

// Handle 404 error (no request found)
if (error.value?.statusCode === 404) {
    // Already handled by onResponseError
}

const getStatusColor = (status: string) => {
    const colors = {
        pending: 'bg-yellow-400',
        under_review: 'bg-blue-400',
        approved: 'bg-green-400',
        rejected: 'bg-red-400',
        resubmitted: 'bg-orange-400'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-400'
}

const getStatusTextColor = (status: string) => {
    const colors = {
        pending: 'text-yellow-700',
        under_review: 'text-blue-700',
        approved: 'text-green-700',
        rejected: 'text-red-700',
        resubmitted: 'text-orange-700'
    }
    return colors[status as keyof typeof colors] || 'text-gray-700'
}

const formatFieldName = (field: string) => {
    const fieldNames = {
        business_name: 'Business Name',
        business_address: 'Business Address',
        business_phone_number: 'Business Phone',
        id_type: 'ID Type',
        government_id: 'Government ID',
        business_cert: 'Business Certificate',
        proof_of_address: 'Proof of Address'
    }
    return fieldNames[field as keyof typeof fieldNames] || field
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const navigateToResubmit = () => {
    navigateTo('/account/verification-resubmit')
}

const openImageModal = (src: string, title: string) => {
    imageModal.value = {
        show: true,
        src,
        title
    }
}

const closeImageModal = () => {
    imageModal.value.show = false
}

// Auto-refresh every 30 seconds if status is pending or under review
const shouldAutoRefresh = computed(() => {
    return verificationRequest.value?.data?.status.value === 'pending' ||
        verificationRequest.value?.data?.status.value === 'under_review'
})

let refreshInterval: number | null = null

onMounted(() => {
    if (shouldAutoRefresh.value) {
        refreshInterval = setInterval(() => {
            refresh()
        }, 1000 * 60 * 5) // 5 minutes
    }
})

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
    }
})

watch(shouldAutoRefresh, (newValue: boolean) => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
        refreshInterval = null
    }

    if (newValue) {
        refreshInterval = setInterval(() => {
            refresh()
        }, 1000 * 60 * 5)
    }
})
</script>