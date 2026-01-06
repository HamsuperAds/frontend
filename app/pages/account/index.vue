<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
            <h2 class="text-xl font-semibold">Personal Details</h2>
        </div>

        <!-- Form Content -->
        <div class="p-6">
            <div class="flex justify-center mb-6">
                <div class="relative">
                    <!-- Avatar Image or Default Icon -->
                    <div v-if="avatarUrl" class="w-24 h-24 rounded-full overflow-hidden">
                        <img :src="avatarUrl" :alt="`${formData.firstName} ${formData.lastName}`"
                            class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <button
                        class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg border border-gray-200">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <form @submit.prevent="handleSave" class="max-w-md mx-auto space-y-4">
                <!-- First Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input v-model="formData.firstName" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John" />
                </div>

                <!-- Last Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input v-model="formData.lastName" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Doe" />
                </div>

                <!-- Phone Number -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <input v-model="formData.phoneNumber" readonly type="tel"
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
                    <div class="flex">
                        <select v-model="formData.state"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Enugu">Enugu</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Kano">Kano</option>
                        </select>
                        <select v-model="formData.lga"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Enugu">Enugu</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Kano">Kano</option>
                        </select>
                    </div>
                </div>

                <!-- Date of Birth -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
                    <input v-model="formData.dateOfBirth" type="date"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="21/04/1998" />
                </div>

                <!-- Gender -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select v-model="formData.gender"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <!-- Save Button -->
                <div class="pt-4">
                    <button type="submit"
                        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

import { definePageMeta } from '#imports'

definePageMeta({
    layout: 'profile'
})

const { $getUser } = useNuxtApp()
const user = $getUser()

const formData = ref({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phoneNumber: user?.phone_number || '',
    email: user?.email || '',
    location: user?.location || 'Enugu',
    dateOfBirth: user?.date_of_birth || '',
    gender: user?.gender || 'Male'
})

const avatarUrl = computed(() => user?.avatar || null)

const handleSave = () => {
    // Here you would make an API call to save the user's details
    console.log('Saving user details:', formData.value)
    // Show success message
    alert('Personal details saved successfully!')
}
</script>
