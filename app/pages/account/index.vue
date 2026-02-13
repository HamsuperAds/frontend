<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Personal Details</h2>
        </div>

        <!-- Form Content -->
        <div class="p-6">
            <div class="flex justify-center mb-6">
                <div class="relative group cursor-pointer" @click="handleAvatarClick">
                    <!-- Avatar Image or Default Icon -->
                    <div v-if="avatarUrl" class="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                        <img :src="avatarUrl" :alt="`${formData.first_name} ${formData.last_name}`"
                            class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div
                        class="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <!-- Hidden File Input -->
                    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="onAvatarChange" />
                </div>
            </div>

            <form @submit.prevent="handleSave" class="max-w-md mx-auto space-y-4">
                <!-- First Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input v-model="formData.first_name" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John" />
                    <span v-if="formDataHasError && formDataRules.first_name.hasError" class="errorText">{{
                        formDataRules.first_name.message }}</span>
                </div>

                <!-- Last Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input v-model="formData.last_name" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Doe" />
                    <span v-if="formDataHasError && formDataRules.last_name.hasError" class="errorText">{{
                        formDataRules.last_name.message }}</span>
                </div>

                <!-- Phone Number -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <input v-model="formData.phone_number" :readonly="$getUser()!.phone_number_verified_at != null"
                        type="tel"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="08023234345" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input v-model="formData.email" readonly type="email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="johndoe@example.com" />
                </div>

                <!-- Location -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div class="flex gap-2 mb-2">
                        <select v-model="formData.state_id"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">select state</option>
                            <option v-for="state in states" :key="state.id" :value="state.id">
                                {{ state.name }}
                            </option>
                        </select>
                        <select v-model="formData.lga_id" :disabled="!formData.state_id"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400">
                            <option value="">select lga</option>
                            <option v-for="lga in lgas" :key="lga.id" :value="lga.id">
                                {{ lga.name }}
                            </option>
                        </select>
                        <span v-if="formDataHasError && formDataRules.lga_id.hasError" class="errorText">{{
                            formDataRules.lga_id.message }}</span>
                    </div>
                    <input v-model="formData.town" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Town" />
                    <span v-if="formDataHasError && formDataRules.town.hasError" class="errorText">{{
                        formDataRules.town.message }}</span>
                </div>

                <!-- Date of Birth -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
                    <input v-model="formData.date_of_birth" type="date"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="21/04/1998" />
                    <span v-if="formDataHasError && formDataRules.date_of_birth.hasError" class="errorText">{{
                        formDataRules.date_of_birth.message }}</span>
                </div>

                <!-- Gender -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select v-model="formData.gender"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <!-- Save Button -->
                <div class="pt-4">
                    <Button type="submit" :disabled="formDataHasError || isSubmitting || !hasChanges" class="w-full">
                        <Icon v-if="isSubmitting" name="svg-spinners:ring-resize" class="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

import { definePageMeta, onMounted, computed, ref } from '#imports'
import { useStates } from '~/composables/useStates'
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'profile'
})

const { $getUser } = useNuxtApp()
const user = $getUser()
const validate = useValidate();

const { states, fetchStates } = useStates()

onMounted(() => {
    fetchStates()
})

const formDataHasError = ref(false)
const formData = ref<Record<string, any>>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    email: user?.email || '',
    state_id: user?.state_id || '',
    lga_id: user?.lga_id || '',
    date_of_birth: user?.date_of_birth || '',
    town: user?.town || '',
    gender: user?.gender?.toLowerCase() || '',
    avatar: null,
})
const formDataRules = ref<Record<string, any>>({
    first_name: { minLength: 2, maxLength: 255 },
    last_name: { minLength: 2, maxLength: 255 },
    phone_number: { minLength: 10, maxLength: 15 },
    email: { minLength: 5, maxLength: 255 },
    lga_id: { min: 1, max: 774, customMessage: 'Please select an LGA' },
    date_of_birth: { type: 'date', maxDate: '2008-01-01' },
    town: { minLength: 2, maxLength: 100 },
    avatar: { type: 'image' },
})
const checkAdForm = () => {
    formDataRules.value = validate(formData.value, formDataRules.value);
    formDataHasError.value = false;
    for (const field in formDataRules.value) {
        if (formDataRules.value[field]?.hasError || !formData.value[field]) {
            if (field == 'avatar' && !formData.value.avatar) {
                continue;
            }
            formDataHasError.value = true;
            console.log(`${field} is invalid`, formDataRules.value[field])
            break;
        }
    }
}
watch(formData.value, () => {
    checkAdForm()
})

const lgas = computed(() => {
    const selectedState = states.value.find(s => s.id === Number(formData.value.state_id))
    return selectedState?.lgas || []
})

const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const avatarPreview = ref<string | null>(null)

const handleAvatarClick = () => {
    fileInput.value?.click()
}

const onAvatarChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        const file = target.files[0]
        formData.value.avatar = file
        avatarPreview.value = URL.createObjectURL(file)
        checkAdForm()
    }
}

const avatarUrl = computed(() => avatarPreview.value || user?.avatar || null)

// Change detection logic
const hasChanges = computed(() => {
    // Check if fields changed
    const fieldsToCompare = [
        'first_name', 'last_name', 'phone_number', 'email',
        'state_id', 'lga_id', 'date_of_birth', 'town', 'gender'
    ]

    const changedFields = fieldsToCompare.some(field => {
        const currentValue = formData.value[field]
        let initialValue = user?.[field]

        // Special handling for numeric IDs and gender case
        if (field === 'state_id' || field === 'lga_id') {
            return Number(currentValue) !== Number(initialValue)
        }
        if (field === 'gender') {
            return currentValue?.toLowerCase() !== initialValue?.toLowerCase()
        }

        // Convert null/undefined to empty string for comparison
        return (currentValue || '') !== (initialValue || '')
    })

    // Check if avatar changed
    const avatarChanged = !!formData.value.avatar

    return changedFields || avatarChanged
})

const handleSave = async () => {
    if (formDataHasError.value || isSubmitting.value || !hasChanges.value) return

    isSubmitting.value = true

    try {
        const payload = new FormData()

        // Only append changed fields
        const fieldsToCompare = [
            'first_name', 'last_name', 'phone_number', 'email',
            'state_id', 'lga_id', 'date_of_birth', 'town', 'gender'
        ]

        fieldsToCompare.forEach(field => {
            const currentValue = formData.value[field]
            let initialValue = user?.[field]

            let changed = false
            if (field === 'state_id' || field === 'lga_id') {
                changed = Number(currentValue) !== Number(initialValue)
            } else if (field === 'gender') {
                changed = currentValue?.toLowerCase() !== initialValue?.toLowerCase()
            } else {
                changed = (currentValue || '') !== (initialValue || '')
            }

            if (changed && currentValue !== null && currentValue !== '') {
                payload.append(field, currentValue.toString())
            }
        })

        // Add avatar if changed
        if (formData.value.avatar instanceof File) {
            payload.append('avatar', formData.value.avatar)
        }

        const response = await useApi().fetchPost<{
            status: string;
            data: any;
            message?: string;
        }>('/auth/update-profile', payload)

        if (response.status === 'success' || response.data) {
            toast.success(response.message || 'Profile updated successfully')
            // Optionally refresh user data here or emit event
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to update profile')
        console.error('Update profile error:', error)
    } finally {
        isSubmitting.value = false
    }
}
</script>
