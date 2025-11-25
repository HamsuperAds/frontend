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
                        <input v-model="formData.oldPassword" :type="showOldPassword ? 'text' : 'password'"
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
                </div>

                <!-- New Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div class="relative">
                        <input v-model="formData.newPassword" :type="showNewPassword ? 'text' : 'password'"
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
                </div>

                <!-- Confirm Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input v-model="formData.confirmPassword" type="password" placeholder="repeat new password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                    <button type="submit"
                        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'profile'
})

const showOldPassword = ref(false)
const showNewPassword = ref(false)

const formData = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const handleSubmit = () => {
    if (formData.value.newPassword !== formData.value.confirmPassword) {
        alert('New passwords do not match!')
        return
    }
    // Here you would make an API call to change the password
    console.log('Changing password')
    alert('Password changed successfully!')
}
</script>
