<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Change Password</h2>
        </div>

        <!-- Form Content -->
        <div class="p-6">
            <form @submit.prevent="handleSubmit" class="max-w-md mx-auto space-y-4">
                <!-- Old Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <div class="relative">
                        <input v-model="formData.old_password" :type="showOldPassword ? 'text' : 'password'"
                            placeholder="enter old password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required />
                        <button type="button" @click="showOldPassword = !showOldPassword"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg v-if="!showOldPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                </path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <span v-if="formDataHasError && formDataRules.old_password.hasError" class="errorText">{{
                        formDataRules.old_password.message }}</span>
                </div>

                <!-- New Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div class="relative">
                        <input v-model="formData.new_password" :type="showNewPassword ? 'text' : 'password'"
                            placeholder="enter new password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required />
                        <button type="button" @click="showNewPassword = !showNewPassword"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                </path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <span v-if="formDataHasError && formDataRules.new_password.hasError" class="errorText">{{
                        formDataRules.new_password.message }}</span>
                </div>

                <!-- Confirm Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input v-model="formData.confirm_password" type="password" placeholder="repeat new password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                    <span v-if="formDataHasError && formDataRules.confirm_password.hasError" class="errorText">{{
                        formDataRules.confirm_password.message }}</span>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                    <Button type="submit" :disabled="formDataHasError || isSubmitting">
                        <Icon v-if="isSubmitting" name="svg-spinners:ring-resize" class="w-4 h-4 mr-2" />
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useApi } from '~/composables/useApi';

definePageMeta({
    layout: 'profile'
})

const showOldPassword = ref(false)
const showNewPassword = ref(false)
const { $getUser } = useNuxtApp()
const user = $getUser()
const validate = useValidate();

const formDataHasError = ref(true)
const isSubmitting = ref(false)

const formData = ref<Record<string, any>>({
    email: user?.email || '',
    old_password: '',
    new_password: '',
    confirm_password: ''
})

const formDataRules = ref<Record<string, any>>({
    old_password: { minLength: 8, maxLength: 255 },
    new_password: { minLength: 8, maxLength: 255 },
    confirm_password: { hasError: false, message: '' }
})

const checkPasswordForm = () => {
    formDataRules.value = validate(formData.value, formDataRules.value);

    // Manual check for confirm password match
    if (formData.value.new_password && formData.value.confirm_password && formData.value.new_password !== formData.value.confirm_password) {
        formDataRules.value.confirm_password.hasError = true;
        formDataRules.value.confirm_password.message = 'Passwords do not match';
    } else {
        formDataRules.value.confirm_password.hasError = false;
        formDataRules.value.confirm_password.message = '';
    }

    formDataHasError.value = false;
    for (const field in formDataRules.value) {
        if (formDataRules.value[field]?.hasError || !formData.value[field]) {
            formDataHasError.value = true;
            break;
        }
    }
}

watch(formData.value, () => {
    checkPasswordForm()
})

const handleSubmit = async () => {
    if (formDataHasError.value || isSubmitting.value) return;

    isSubmitting.value = true;
    try {
        const response = await useApi().fetchPost<{
            status: string;
            message?: string;
        }>('/auth/change-password', formData.value);

        if (response.status === 'success' || response.status === 'true') {
            toast.success(response.message || 'Password changed successfully!');
            // Reset form
            formData.value.old_password = '';
            formData.value.new_password = '';
            formData.value.confirm_password = '';
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to change password');
    } finally {
        isSubmitting.value = false;
    }
}
</script>
