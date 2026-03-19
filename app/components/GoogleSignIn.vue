<template>
    <div v-if="isLoading" class="flex justify-center">
        <button type="button" disabled
            class="flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded shadow-sm opacity-70 cursor-not-allowed h-[40px] min-w-[200px]">
            <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <span class="text-gray-600 font-medium">Signing in...</span>
        </button>
    </div>
    <GoogleSignInButton v-else @success="handleGoogleSuccess" @error="handleGoogleError" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';
import { toast } from 'vue-sonner';

const { getSession } = useAuth();
const { setToken } = useAuthState();

const isLoading = ref(false);

async function handleGoogleSuccess(response: CredentialResponse) {
    isLoading.value = true;
    try {
        const res = await useApi().fetchPost<{
            status: string
            message: string
            data: {
                id: string
                first_name: string
                last_name: string
                email: string
                token: string
            }
        }>('/auth/google/mobile', { id_token: response.credential }, { requiresAuth: false });

        if (res.status === 'success' && res.data.token) {
            setToken(res.data.token);
            await getSession();

            // Redirect to account page using window.location for a full page reload
            window.location.href = '/account';
        }
    } catch (error: any) {
        console.error('Google login failed:', error);
        // Show error to user
        toast.error('Google sign-in failed. Please try again.');
        isLoading.value = false;
    }
}

function handleGoogleError() {
    toast.error('Google sign-in was cancelled or failed.');
    isLoading.value = false; // Just to be safe
}
</script>
