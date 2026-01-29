<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-2xl mx-auto px-4">
            <!-- Loading State -->
            <div v-if="pending" class="bg-white rounded-lg shadow-sm p-8 text-center">
                <div
                    class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4">
                </div>
                <p class="text-gray-600">Loading verification request...</p>
            </div>

            <!-- No Request or Cannot Resubmit -->
            <div v-else-if="!verificationRequest?.data || !verificationRequest.data.can_resubmit"
                class="bg-white rounded-lg shadow-sm p-8 text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-600" />
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Cannot Resubmit</h1>
                <p class="text-gray-600 mb-6">
                    {{
                        !verificationRequest?.data ?
                            'No verification request found.' :
                            'This request cannot be resubmitted at this time.'
                    }}
                </p>
                <NuxtLink to="/account/verification-status"
                    class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Status
                </NuxtLink>
            </div>

            <!-- Resubmission Form -->
            <div v-else class="space-y-6">
                <!-- Header -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Resubmit Verification Request</h1>
                    <p class="text-gray-600">Update your verification information to address the issues mentioned in the
                        rejection.</p>
                </div>

                <!-- Rejection Reasons -->
                <div v-if="verificationRequest.data.rejection_reasons"
                    class="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 class="text-lg font-semibold text-red-900 mb-3">Issues to Address</h2>
                    <ul class="space-y-2">
                        <li v-for="(reason, field) in verificationRequest.data.rejection_reasons" :key="field"
                            class="flex items-start gap-2">
                            <Icon name="heroicons:exclamation-triangle"
                                class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <strong class="text-red-900">{{ formatFieldName(field) }}:</strong>
                                <span class="text-red-700 ml-1">{{ reason }}</span>
                            </div>
                        </li>
                    </ul>

                    <div v-if="verificationRequest.data.user_message"
                        class="mt-4 p-3 bg-white border border-red-200 rounded">
                        <p class="text-sm text-gray-700">
                            <strong>Additional feedback:</strong> {{ verificationRequest.data.user_message }}
                        </p>
                    </div>
                </div>

                <!-- Form -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <form @submit.prevent="handleSubmit">
                        <div class="space-y-6">
                            <!-- Business Information -->
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>

                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Business Name *
                                            <span v-if="hasRejectionReason('business_name')"
                                                class="text-red-600 text-xs ml-1">(Needs correction)</span>
                                        </label>
                                        <input v-model="formData.business_name" type="text"
                                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            :class="[
                                                errors.business_name ? 'border-red-300' : 'border-gray-300',
                                                hasRejectionReason('business_name') ? 'bg-red-50' : ''
                                            ]" placeholder="Enter your business name" maxlength="255" required />
                                        <p v-if="errors.business_name" class="text-red-500 text-xs mt-1">{{
                                            errors.business_name }}</p>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Business Address *
                                            <span v-if="hasRejectionReason('business_address')"
                                                class="text-red-600 text-xs ml-1">(Needs correction)</span>
                                        </label>
                                        <textarea v-model="formData.business_address" rows="4"
                                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            :class="[
                                                errors.business_address ? 'border-red-300' : 'border-gray-300',
                                                hasRejectionReason('business_address') ? 'bg-red-50' : ''
                                            ]" placeholder="Enter your complete business address" maxlength="1000"
                                            required></textarea>
                                        <p v-if="errors.business_address" class="text-red-500 text-xs mt-1">{{
                                            errors.business_address }}</p>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Business Phone Number *
                                            <span v-if="hasRejectionReason('business_phone_number')"
                                                class="text-red-600 text-xs ml-1">(Needs correction)</span>
                                        </label>
                                        <input v-model="formData.business_phone_number" type="tel"
                                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            :class="[
                                                errors.business_phone_number ? 'border-red-300' : 'border-gray-300',
                                                hasRejectionReason('business_phone_number') ? 'bg-red-50' : ''
                                            ]" placeholder="Enter business phone number" required />
                                        <p v-if="errors.business_phone_number" class="text-red-500 text-xs mt-1">{{
                                            errors.business_phone_number }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ID Type -->
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 mb-4">ID Type</h2>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-4">
                                        Select ID Type *
                                        <span v-if="hasRejectionReason('id_type')"
                                            class="text-red-600 text-xs ml-1">(Needs correction)</span>
                                    </label>
                                    <div class="space-y-3">
                                        <label v-for="idType in idTypes" :key="idType.value"
                                            class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                                            :class="[
                                                formData.id_type === idType.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200',
                                                hasRejectionReason('id_type') ? 'bg-red-50' : ''
                                            ]">
                                            <input v-model="formData.id_type" type="radio" :value="idType.value"
                                                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                required />
                                            <span class="ml-3 text-sm font-medium text-gray-900">{{ idType.label
                                                }}</span>
                                        </label>
                                    </div>
                                    <p v-if="errors.id_type" class="text-red-500 text-xs mt-1">{{ errors.id_type }}</p>
                                </div>
                            </div>

                            <!-- Document Upload -->
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
                                <p class="text-sm text-gray-600 mb-4">Only upload new documents if you need to replace
                                    the rejected ones.</p>

                                <div class="space-y-6">
                                    <!-- Government ID -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Government ID Image
                                            <span v-if="hasRejectionReason('government_id')"
                                                class="text-red-600 text-xs ml-1">(Needs replacement)</span>
                                        </label>

                                        <!-- Current Image -->
                                        <div v-if="verificationRequest.data.images?.government_id && !formData.government_id"
                                            class="mb-3">
                                            <p class="text-xs text-gray-600 mb-2">Current image:</p>
                                            <img :src="verificationRequest.data.images.government_id"
                                                alt="Current Government ID"
                                                class="w-32 h-24 object-cover rounded border border-gray-200" />
                                        </div>

                                        <FileUpload @file-selected="(file) => handleFileSelect('government_id', file)"
                                            :preview="filePreviews.government_id" :error="errors.government_id"
                                            accept="image/*" :max-size="5 * 1024 * 1024"
                                            :placeholder="hasRejectionReason('government_id') ? 'Upload new government ID (required)' : 'Upload new government ID (optional)'" />
                                    </div>

                                    <!-- Business Certificate -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Business Registration Certificate
                                            <span v-if="hasRejectionReason('business_cert')"
                                                class="text-red-600 text-xs ml-1">(Needs replacement)</span>
                                        </label>

                                        <!-- Current Image -->
                                        <div v-if="verificationRequest.data.images?.business_cert && !formData.business_cert"
                                            class="mb-3">
                                            <p class="text-xs text-gray-600 mb-2">Current image:</p>
                                            <img :src="verificationRequest.data.images.business_cert"
                                                alt="Current Business Certificate"
                                                class="w-32 h-24 object-cover rounded border border-gray-200" />
                                        </div>

                                        <FileUpload @file-selected="(file) => handleFileSelect('business_cert', file)"
                                            :preview="filePreviews.business_cert" :error="errors.business_cert"
                                            accept="image/*" :max-size="5 * 1024 * 1024"
                                            :placeholder="hasRejectionReason('business_cert') ? 'Upload new business certificate (required)' : 'Upload new business certificate (optional)'" />
                                    </div>

                                    <!-- Proof of Address -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Proof of Business Address
                                            <span v-if="hasRejectionReason('proof_of_address')"
                                                class="text-red-600 text-xs ml-1">(Needs replacement)</span>
                                        </label>

                                        <!-- Current Image -->
                                        <div v-if="verificationRequest.data.images?.proof_of_address && !formData.proof_of_address"
                                            class="mb-3">
                                            <p class="text-xs text-gray-600 mb-2">Current image:</p>
                                            <img :src="verificationRequest.data.images.proof_of_address"
                                                alt="Current Proof of Address"
                                                class="w-32 h-24 object-cover rounded border border-gray-200" />
                                        </div>

                                        <FileUpload
                                            @file-selected="(file) => handleFileSelect('proof_of_address', file)"
                                            :preview="filePreviews.proof_of_address" :error="errors.proof_of_address"
                                            accept="image/*" :max-size="5 * 1024 * 1024"
                                            :placeholder="hasRejectionReason('proof_of_address') ? 'Upload new proof of address (required)' : 'Upload new proof of address (optional)'" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <NuxtLink to="/account/verification-status"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </NuxtLink>

                            <button type="submit" :disabled="isSubmitting || !hasChanges"
                                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                                <span v-if="isSubmitting"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                {{ isSubmitting ? 'Resubmitting...' : 'Resubmit Request' }}
                            </button>
                        </div>
                    </form>
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

const idTypes = [
    { value: 'drivers_license', label: "Driver's License" },
    { value: 'voters_card', label: 'Permanent Voter\'s Card' },
    { value: 'national_id', label: 'National ID Number' }
]

const { data: verificationRequest, pending } = await useApi().get<VerificationGetResponse>('/verification-requests/my-request', {
    server: false,
    default: () => null,
    onResponseError() {
        // Handle 404 errors (no request found)
        return null
    }
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref({
    business_name: '',
    business_address: '',
    business_phone_number: '',
    id_type: '',
    government_id: null as File | null,
    business_cert: null as File | null,
    proof_of_address: null as File | null
})

const originalData = ref({
    business_name: '',
    business_address: '',
    business_phone_number: '',
    id_type: ''
})

const filePreviews = ref({
    government_id: null as string | null,
    business_cert: null as string | null,
    proof_of_address: null as string | null
})

// Initialize form with existing data
watchEffect(() => {
    if (verificationRequest.value?.data) {
        const data = verificationRequest.value.data
        formData.value.business_name = data.business_name
        formData.value.business_address = data.business_address
        formData.value.business_phone_number = data.business_phone_number
        formData.value.id_type = data.id_type.value

        // Store original data for comparison
        originalData.value = {
            business_name: data.business_name,
            business_address: data.business_address,
            business_phone_number: data.business_phone_number,
            id_type: data.id_type.value
        }
    }
})

const hasRejectionReason = (field: string) => {
    return verificationRequest.value?.data?.rejection_reasons?.[field]
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

const hasChanges = computed(() => {
    // Check if any text fields have changed
    const textFieldsChanged =
        formData.value.business_name !== originalData.value.business_name ||
        formData.value.business_address !== originalData.value.business_address ||
        formData.value.business_phone_number !== originalData.value.business_phone_number ||
        formData.value.id_type !== originalData.value.id_type

    // Check if any files have been uploaded
    const filesUploaded =
        formData.value.government_id !== null ||
        formData.value.business_cert !== null ||
        formData.value.proof_of_address !== null

    return textFieldsChanged || filesUploaded
})

const handleFileSelect = (field: string, file: File | null) => {
    if (file) {
        // Validate file
        if (file.size > 5 * 1024 * 1024) {
            errors.value[field] = 'File size must be less than 5MB'
            return
        }

        if (!file.type.startsWith('image/')) {
            errors.value[field] = 'File must be an image'
            return
        }

        // Validate image dimensions
        const img = new Image()
        img.onload = () => {
            if (img.width < 300 || img.height < 300) {
                errors.value[field] = 'Image must be at least 300x300 pixels'
                return
            }

            // Clear error and set file
            delete errors.value[field]
                ; (formData.value as any)[field] = file

            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                ; (filePreviews.value as any)[field] = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }

        img.src = URL.createObjectURL(file)
    } else {
        ; (formData.value as any)[field] = null
            ; (filePreviews.value as any)[field] = null
    }
}

const handleSubmit = async () => {
    if (!hasChanges.value || isSubmitting.value) return

    isSubmitting.value = true
    errors.value = {}

    try {
        const formDataToSend = new FormData()

        // Only include changed fields
        if (formData.value.business_name !== originalData.value.business_name) {
            formDataToSend.append('business_name', formData.value.business_name)
        }
        if (formData.value.business_address !== originalData.value.business_address) {
            formDataToSend.append('business_address', formData.value.business_address)
        }
        if (formData.value.business_phone_number !== originalData.value.business_phone_number) {
            formDataToSend.append('business_phone_number', formData.value.business_phone_number)
        }
        if (formData.value.id_type !== originalData.value.id_type) {
            formDataToSend.append('id_type', formData.value.id_type)
        }

        // Include new files
        if (formData.value.government_id) {
            formDataToSend.append('government_id', formData.value.government_id)
        }
        if (formData.value.business_cert) {
            formDataToSend.append('business_cert', formData.value.business_cert)
        }
        if (formData.value.proof_of_address) {
            formDataToSend.append('proof_of_address', formData.value.proof_of_address)
        }

        await useApi().fetchPut('/verification-requests/resubmit', formDataToSend)

        const { toast } = await import('vue-sonner')
        toast.success('Verification request resubmitted successfully!')

        // Redirect to status page
        navigateTo('/account/verification-status')

    } catch (error: any) {
        console.error('Verification resubmission error:', error)

        const { toast } = await import('vue-sonner')

        if (error.response?.status === 422) {
            const errorData = error.response.data
            if (errorData.errors) {
                errors.value = errorData.errors
                toast.error('Please fix the validation errors')
            } else {
                toast.error(errorData.message || 'Validation failed')
            }
        } else {
            toast.error('Failed to resubmit verification request. Please try again.')
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>