<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-2xl mx-auto px-4">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Seller Verification Request</h1>
                <p class="text-gray-600">Complete the verification process to become a verified seller and build trust
                    with buyers.</p>
            </div>

            <!-- Progress Indicator -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div v-for="(step, index) in steps" :key="index" class="flex items-center">
                        <div class="flex items-center">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                :class="currentStep > index
                                    ? 'bg-green-500 text-white'
                                    : currentStep === index
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-600'">
                                {{ currentStep > index ? '✓' : index + 1 }}
                            </div>
                            <span class="ml-2 text-sm font-medium"
                                :class="currentStep >= index ? 'text-gray-900' : 'text-gray-500'">
                                {{ step.title }}
                            </span>
                        </div>
                        <div v-if="index < steps.length - 1" class="w-16 h-0.5 mx-4"
                            :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'"></div>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <form @submit.prevent="handleSubmit">
                    <!-- Step 1: Business Information -->
                    <div v-if="currentStep === 0" class="space-y-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                            <input v-model="formData.business_name" type="text"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="errors.business_name ? 'border-red-300' : ''"
                                placeholder="Enter your business name" maxlength="255" required />
                            <p v-if="errors.business_name" class="text-red-500 text-xs mt-1">{{ errors.business_name }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                            <textarea v-model="formData.business_address" rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="errors.business_address ? 'border-red-300' : ''"
                                placeholder="Enter your complete business address" maxlength="1000" required></textarea>
                            <p v-if="errors.business_address" class="text-red-500 text-xs mt-1">{{
                                errors.business_address }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Phone Number *</label>
                            <input v-model="formData.business_phone_number" type="tel"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="errors.business_phone_number ? 'border-red-300' : ''"
                                placeholder="Enter business phone number (e.g., +2348012345678, 08012345678)"
                                @blur="validateBusinessPhone" required />
                            <p v-if="errors.business_phone_number" class="text-red-500 text-xs mt-1">{{
                                errors.business_phone_number }}</p>
                            <p class="text-gray-500 text-xs mt-1">Must be a valid Nigerian phone number and different
                                from your account phone</p>
                        </div>
                    </div>

                    <!-- Step 2: ID Type Selection -->
                    <div v-if="currentStep === 1" class="space-y-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">ID Type Selection</h2>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-4">Select ID Type *</label>
                            <div class="space-y-3">
                                <label v-for="idType in idTypes" :key="idType.value"
                                    class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                                    :class="formData.id_type === idType.value ? 'border-blue-500 bg-blue-50' : ''">
                                    <input v-model="formData.id_type" type="radio" :value="idType.value"
                                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" required />
                                    <span class="ml-3 text-sm font-medium text-gray-900">{{ idType.label }}</span>
                                </label>
                            </div>
                            <p v-if="errors.id_type" class="text-red-500 text-xs mt-1">{{ errors.id_type }}</p>
                        </div>
                    </div>

                    <!-- Step 3: Document Upload -->
                    <div v-if="currentStep === 2" class="space-y-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Document Upload</h2>

                        <!-- Government ID -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Government ID Image *</label>
                            <FileUpload @file-selected="(file) => handleFileSelect('government_id', file)"
                                :preview="filePreviews.government_id" :error="errors.government_id" accept="image/*"
                                :max-size="5 * 1024 * 1024"
                                placeholder="Upload your government ID (max 5MB, min 300x300px)" />
                        </div>

                        <!-- Business Certificate -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Registration
                                Certificate *</label>
                            <FileUpload @file-selected="(file) => handleFileSelect('business_cert', file)"
                                :preview="filePreviews.business_cert" :error="errors.business_cert" accept="image/*"
                                :max-size="5 * 1024 * 1024"
                                placeholder="Upload business registration certificate (max 5MB, min 300x300px)" />
                        </div>

                        <!-- Proof of Address -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Proof of Business Address
                                *</label>
                            <FileUpload @file-selected="(file) => handleFileSelect('proof_of_address', file)"
                                :preview="filePreviews.proof_of_address" :error="errors.proof_of_address"
                                accept="image/*" :max-size="5 * 1024 * 1024"
                                placeholder="Upload proof of business address (max 5MB, min 300x300px)" />
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <button v-if="currentStep > 0" type="button" @click="previousStep"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Previous
                        </button>
                        <div v-else></div>

                        <button v-if="currentStep < steps.length - 1" type="button" @click="nextStep"
                            :disabled="!canProceed"
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Next
                        </button>
                        <button v-else type="submit" :disabled="isSubmitting || !canSubmit"
                            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                            <span v-if="isSubmitting"
                                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'profile'
})

const steps = [
    { title: 'Business Info', key: 'business' },
    { title: 'ID Type', key: 'id_type' },
    { title: 'Documents', key: 'documents' }
]

const idTypes = [
    { value: 'drivers_license', label: "Driver's License" },
    { value: 'voters_card', label: 'Permanent Voter\'s Card' },
    { value: 'national_id', label: 'National ID Number' }
]

const currentStep = ref(0)
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

const filePreviews = ref({
    government_id: null as string | null,
    business_cert: null as string | null,
    proof_of_address: null as string | null
})

// Load saved form data
onMounted(() => {
    const saved = localStorage.getItem('verification-form-data')
    if (saved) {
        try {
            const parsedData = JSON.parse(saved)
            Object.assign(formData.value, parsedData)
        } catch (e) {
            console.error('Failed to load saved form data:', e)
        }
    }
})

// Auto-save form data
watch(formData, (newData: any) => {
    const dataToSave = { ...newData }
    // Don't save file objects
    const { government_id, business_cert, proof_of_address, ...saveData } = dataToSave
    localStorage.setItem('verification-form-data', JSON.stringify(saveData))
}, { deep: true })

const canProceed = computed(() => {
    switch (currentStep.value) {
        case 0:
            return formData.value.business_name.trim() &&
                formData.value.business_address.trim() &&
                formData.value.business_phone_number.trim() &&
                validateNigerianPhone(formData.value.business_phone_number.trim())
        case 1:
            return formData.value.id_type
        case 2:
            return formData.value.government_id &&
                formData.value.business_cert &&
                formData.value.proof_of_address
        default:
            return false
    }
})

const canSubmit = computed(() => {
    return formData.value.business_name.trim() &&
        formData.value.business_address.trim() &&
        formData.value.business_phone_number.trim() &&
        formData.value.id_type &&
        formData.value.government_id &&
        formData.value.business_cert &&
        formData.value.proof_of_address
})

const nextStep = () => {
    if (canProceed.value && currentStep.value < steps.length - 1) {
        currentStep.value++
    }
}

const previousStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const validateNigerianPhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')

    // Nigerian phone number patterns:
    // 1. Starting with +234: +234XXXXXXXXX (14 digits total)
    // 2. Starting with 234: 234XXXXXXXXX (13 digits total)  
    // 3. Starting with 0: 0XXXXXXXXXX (11 digits total)
    // 4. Without country code: XXXXXXXXXX (10 digits total)

    // Check for +234 format
    if (phone.startsWith('+234')) {
        return cleanPhone.length === 14 && /^234[789][01]\d{8}$/.test(cleanPhone)
    }

    // Check for 234 format (without +)
    if (cleanPhone.startsWith('234')) {
        return cleanPhone.length === 13 && /^234[789][01]\d{8}$/.test(cleanPhone)
    }

    // Check for 0 format (local format)
    if (cleanPhone.startsWith('0')) {
        return cleanPhone.length === 11 && /^0[789][01]\d{8}$/.test(cleanPhone)
    }

    // Check for format without leading 0 or country code
    if (cleanPhone.length === 10) {
        return /^[789][01]\d{8}$/.test(cleanPhone)
    }

    return false
}

const validateBusinessPhone = () => {
    const phone = formData.value.business_phone_number.trim()

    if (!phone) {
        errors.value.business_phone_number = 'Business phone number is required'
        return false
    }

    if (!validateNigerianPhone(phone)) {
        errors.value.business_phone_number = 'Please enter a valid Nigerian phone number (e.g., +2348012345678, 08012345678)'
        return false
    }

    // Clear error if validation passes
    delete errors.value.business_phone_number
    return true
}

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

const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')

    // Format: 0XXXXXXXXXX (11 digits) -> +234XXXXXXXXXX
    if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
        return '+234' + cleanPhone.substring(1)
    }

    // Format: 234XXXXXXXXXX (13 digits) -> +234XXXXXXXXXX
    if (cleanPhone.startsWith('234') && cleanPhone.length === 13) {
        return '+' + cleanPhone
    }

    return phone
}

const handleSubmit = async () => {
    if (!canSubmit.value || isSubmitting.value) return

    isSubmitting.value = true
    errors.value = {}

    try {
        const formDataToSend = new FormData()
        formDataToSend.append('business_name', formData.value.business_name)
        formDataToSend.append('business_address', formData.value.business_address)

        // Format phone number before sending
        const formattedPhone = formatPhoneNumber(formData.value.business_phone_number)
        formDataToSend.append('business_phone_number', formattedPhone)

        formDataToSend.append('id_type', formData.value.id_type)

        if (formData.value.government_id) {
            formDataToSend.append('government_id', formData.value.government_id)
        }
        if (formData.value.business_cert) {
            formDataToSend.append('business_cert', formData.value.business_cert)
        }
        if (formData.value.proof_of_address) {
            formDataToSend.append('proof_of_address', formData.value.proof_of_address)
        }

        const response = await useApi().fetchPost('/verification-requests', formDataToSend)

        // Clear saved form data
        localStorage.removeItem('verification-form-data')

        const { toast } = await import('vue-sonner')
        toast.success('Verification request submitted successfully!')

        // Redirect to status page
        navigateTo('/account/verification-status')

    } catch (error: any) {
        console.error('Verification submission error:', error)

        const { toast } = await import('vue-sonner')

        if (error.response?.status === 422) {
            console.log('error response:', error.response);
            const errorData = error.response._data
            if (errorData.error === 'ACTIVE_REQUEST_EXISTS') {
                toast.error('You already have an active verification request')
                navigateTo('/account/verification-status')
            } else if (errorData.errors) {
                errors.value = errorData.errors
                toast.error('Please fix the validation errors')
                setTimeout(() => {
                    currentStep.value = 1;
                    setTimeout(() => {
                        currentStep.value = 0;
                    }, 500);
                }, 500);
            } else {
                toast.error(errorData.message || 'Validation failed')
            }
        } else {
            toast.error('Failed to submit verification request. Please try again.')
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>