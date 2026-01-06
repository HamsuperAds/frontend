<template>
    <div class="profile-layout">
        <!-- Navbar -->
        <NavBar :showSearch="false" />

        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left Sidebar -->
                <aside class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow p-6">
                        <!-- User Profile -->
                        <div class="text-center mb-6">
                            <!-- Avatar Image or Default Icon -->
                            <div v-if="user?.avatar" class="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                                <img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`"
                                    class="w-full h-full object-cover" />
                            </div>
                            <div v-else
                                class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 class="font-bold text-gray-900">{{ user?.first_name }} {{ user?.last_name }}</h3>
                            <p class="text-sm text-gray-500">{{ user?.phone_number || 'No phone number' }}</p>
                        </div>

                        <!-- Navigation Links -->
                        <nav class="space-y-1">
                            <NuxtLink to="/account"
                                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                                :class="isActive('/account') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Personal Details
                            </NuxtLink>

                            <NuxtLink to="/account/my-adverts"
                                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                                :class="isActive('/account/my-adverts') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z">
                                    </path>
                                </svg>
                                My Adverts
                            </NuxtLink>

                            <NuxtLink to="/account/feedback"
                                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                                :class="isActive('/account/feedback') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Feedback
                            </NuxtLink>

                            <NuxtLink to="/account/change-password"
                                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                                :class="isActive('/account/change-password') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Change Password
                            </NuxtLink>

                            <NuxtLink to="/account/delete"
                                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                                :class="isActive('/account/delete') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Delete My Account
                            </NuxtLink>

                            <button @click="useLogout()"
                                class="w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Logout
                            </button>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-3">
                    <slot />
                </main>
            </div>
        </div>

        <!-- Footer -->
        <PageFooter />
    </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'

const route = useRoute()
const { $getUser } = useNuxtApp()
const user = $getUser()

const isActive = (path: string) => {
    if (path === '/account') {
        return route.path === '/account'
    }
    return route.path.startsWith(path)
}
</script>

<style scoped>
.profile-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
}
</style>
