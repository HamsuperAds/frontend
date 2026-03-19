<template>
    <GoogleSignInButton @success="handleGoogleSuccess" @error="handleGoogleError" />
</template>

<script setup lang="ts">
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';
import { toast } from 'vue-sonner';

const { getSession } = useAuth();
const { setToken } = useAuthState();

async function handleGoogleSuccess(response: CredentialResponse) {
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
        }>('/auth/google/mobile', { id_token: response.credential }, { requiresAuth: false })

        if (res.status === 'success' && res.data.token) {
            setToken(res.data.token)
            await getSession()

            // Store token in localStorage
            /* if (process.client) {
                localStorage.setItem('authToken', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data))
            } */

            // Redirect to account page using window.location for a full page reload
            window.location.href = '/account'
        }
    } catch (error: any) {
        console.error('Google login failed:', error)
        // Show error to user
        toast.error('Google sign-in failed. Please try again.')
    }
}

function handleGoogleError() {
    toast.error('Google sign-in was cancelled or failed.')
}
</script>
