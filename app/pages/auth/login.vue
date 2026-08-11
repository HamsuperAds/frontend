<template>
    <div class="bg-gray-50 flex items-center justify-center py-12 px-4">
        <div class="w-full max-w-md">
            <!-- Sign In Form -->
            <div v-if="!showForgotPassword && !showOTPVerification && !showResetPassword"
                class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Sign in</h2>
                    <p class="text-sm text-gray-600 mt-1">Login to personalize your experience</p>
                </div>

                <form @submit.prevent="handleSignIn" class="space-y-4">
                    <!-- Error Message -->
                    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                        <!-- contact support link -->
                        <a href="/contact-us" class="text-sm text-blue-600">Contact support</a>
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="loginData.email" type="email" placeholder="enter your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            :disabled="isLoading" required />
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div class="relative">
                            <input v-model="loginData.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="enter password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                                :disabled="isLoading" required />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
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

                    <!-- Sign In Button -->
                    <button type="submit" :disabled="isLoading || isSignInDisabled"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </form>

                <!-- Forgot Password Link -->
                <div class="mt-4 text-center">
                    <button @click="showForgotPassword = true" class="text-sm text-gray-700 hover:text-gray-900">
                        Forgot password?
                    </button>
                </div>

                <!-- Sign Up Link -->
                <div class="mt-2 text-center text-sm">
                    <span class="text-gray-600">Don't have an account?</span>
                    <a href="/auth/register" class="text-blue-500 hover:text-blue-600 font-medium ml-1">Sign up</a>
                </div>

                <!-- Google Sign In -->
                <div class="mt-4 flex justify-center">
                    <GoogleSignIn />
                </div>
            </div>

            <!-- Forgot Password / Request Token -->
            <div v-else-if="showForgotPassword && !showOTPVerification && !showResetPassword"
                class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Request Token</h2>
                    <p class="text-sm text-gray-600 mt-1">
                        Provide a registered email to request<br />password reset OTP
                    </p>
                </div>

                <form @submit.prevent="handleSendOTP" class="space-y-4">
                    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                    </div>
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="resetEmail" type="email" placeholder="enter your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            :disabled="isLoading" required />
                    </div>

                    <!-- Send OTP Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Sending OTP...' : 'Send OTP' }}
                    </button>
                </form>

                <!-- Back to Sign In -->
                <div class="mt-4 text-center">
                    <button @click="showForgotPassword = false; showOTPVerification = false; showResetPassword = false"
                        class="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Sign in
                    </button>
                </div>
            </div>

            <!-- OTP Verification -->
            <div v-else-if="showOTPVerification && !showResetPassword"
                class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Verify OTP</h2>
                    <p class="text-sm text-gray-600 mt-1">Just one last step</p>
                </div>

                <div class="text-center mb-6">
                    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                    </div>

                    <p class="text-sm text-gray-600 mb-4">
                        Enter the verification code that was sent to<br />
                        your email ({{ resetEmail }})
                    </p>

                    <!-- Verification Code Inputs -->
                    <div class="flex justify-center gap-2 mb-6">
                        <input v-for="(digit, index) in verificationCode" :key="index"
                            :ref="el => setCodeInput(index, el as HTMLInputElement | null)"
                            v-model="verificationCode[index]" type="text" maxlength="1"
                            class="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            @input="handleCodeInput(index, $event)"
                            @keydown.backspace="handleBackspace(index, $event)" />
                    </div>

                    <!-- Verify Button -->
                    <button @click="handleVerifyOTP" :disabled="isLoading || verificationCode.join('').length < 5"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Verifying...' : 'Verify' }}
                    </button>

                    <!-- Resend Code -->
                    <div class="mt-4 text-sm text-gray-600">
                        <p>Didn't get the verification code? It may take a while.</p>
                        <button @click="handleResendOTP" :disabled="isResending || resendCountdown > 0"
                            class="text-blue-500 hover:text-blue-600 font-medium mt-1 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isResending ? 'Resending code ...' : resendCountdown > 0 ? `Resend code in
                            ${resendCountdown}s` : 'Resend Code' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Reset Password -->
            <div v-else class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Reset password</h2>
                    <p class="text-sm text-gray-600 mt-1">
                        Provide a registered email to request<br />password reset OTP
                    </p>
                </div>

                <form @submit.prevent="handleResetPassword" class="space-y-4">
                    <!-- New Password -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div class="relative">
                            <input v-model="newPasswordData.newPassword" :type="showNewPassword ? 'text' : 'password'"
                                placeholder="enter new password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                                required />
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
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
                        <input v-model="newPasswordData.confirmPassword" type="password"
                            placeholder="enter same as above"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required />
                    </div>

                    <!-- Reset Password Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Resetting...' : 'Reset password' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Login - Hamsuper',
    description: 'Log in to your Hamsuper account to manage ads, messages, and more.'
})
import { definePageMeta } from '#imports';
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';
const { getSession } = useAuth();
const { setToken } = useAuthState();

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/account",
    },
});
const showForgotPassword = ref(false)
const showOTPVerification = ref(false)
const showResetPassword = ref(false)
const showPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const loginData = ref({
    email: 'garba.okeke25@hamsuper.test',
    password: '12345678',
})

const resetEmail = ref('')
const resetOtp = ref('')
const verificationCode = ref(['', '', '', '', ''])
const codeInputs = ref<(HTMLInputElement | null)[]>([])

const newPasswordData = ref({
    newPassword: '',
    confirmPassword: '',
})

const isLoading = ref(false)
const isResending = ref(false)
const resendCountdown = ref(0)
let resendCountdownInterval: ReturnType<typeof setInterval> | null = null
const errorMessage = ref('')

const isSignInDisabled = computed(() => {
    const emailPattern = /^\S+@\S+\.\S+$/
    return !emailPattern.test(loginData.value.email.trim()) || loginData.value.password.length < 6
})
const RESEND_OTP_EXPIRES_KEY = 'forgotPasswordResendExpiresAt'

const startResendCountdown = (seconds: number) => {
    if (resendCountdownInterval) {
        clearInterval(resendCountdownInterval)
    }
    resendCountdown.value = seconds
    if (import.meta.client) {
        const expiresAt = Date.now() + seconds * 1000
        localStorage.setItem(RESEND_OTP_EXPIRES_KEY, expiresAt.toString())
    }

    resendCountdownInterval = setInterval(() => {
        resendCountdown.value -= 1
        if (resendCountdown.value <= 0 && resendCountdownInterval) {
            clearInterval(resendCountdownInterval)
            resendCountdownInterval = null
            if (import.meta.client) {
                localStorage.removeItem(RESEND_OTP_EXPIRES_KEY)
            }
        }
    }, 1000)
}

const handleSignIn = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        // Call login API
        const response = await useApi().fetchPost<{
            status: string
            message: string
            data: {
                id: string
                first_name: string
                last_name: string
                email: string
                token: string
            }
        }>('/auth/sign-in', {
            email: loginData.value.email,
            password: loginData.value.password
        }, { requiresAuth: false })

        if (response.status === 'success' && response.data.token) {
            setToken(response.data.token);
            await getSession();
            // Store token in localStorage
            if (import.meta.client) {
                localStorage.setItem('authToken', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            // Redirect to account page using window.location for a full page reload
            window.location.href = '/account'
        }
    } catch (error: any) {
        console.error('Login error:', error)
        const message = error.data?.message || ''
        if (message === 'Account not verified') {
            const userInfoStore = useUserInfoStore()
            userInfoStore.loginEmail = loginData.value.email
            navigateTo('/auth/register')
            return
        }
        errorMessage.value = message || 'Invalid email or password. Please try again.'
    } finally {
        isLoading.value = false
    }
}

const handleSendOTP = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/send-otp', {
            email: resetEmail.value,
            action: 'password_reset',
        }, { requiresAuth: false })

        if (response.status === 'success') {
            toast.success(response.message || 'OTP sent to your email.')
            showForgotPassword.value = false
            showOTPVerification.value = true
            showResetPassword.value = false
            startResendCountdown(60)
        }
    } catch (error: any) {
        console.error('Send OTP error:', error)
        errorMessage.value =
            error.data?.message ||
            error.data?.errors?.email?.[0] ||
            'Failed to send OTP. Please try again.'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    if (!import.meta.client) return

    const storedExpiresAt = localStorage.getItem(RESEND_OTP_EXPIRES_KEY)
    if (!storedExpiresAt) return

    const expiresAt = Number(storedExpiresAt)
    if (!expiresAt || Number.isNaN(expiresAt)) {
        localStorage.removeItem(RESEND_OTP_EXPIRES_KEY)
        return
    }

    const remainingMs = expiresAt - Date.now()
    if (remainingMs > 0) {
        startResendCountdown(Math.ceil(remainingMs / 1000))
    } else {
        localStorage.removeItem(RESEND_OTP_EXPIRES_KEY)
    }
})

const handleResendOTP = async () => {
    if (resendCountdown.value > 0) return

    try {
        isResending.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/send-otp', {
            email: resetEmail.value,
            action: 'password_reset',
        }, { requiresAuth: false })

        if (response.status === 'success') {
            toast.success(response.message || 'Verification code resent to your email.')
            startResendCountdown(60)
        }
    } catch (error: any) {
        console.error('Resend OTP error:', error)
        errorMessage.value =
            error.data?.message ||
            error.data?.errors?.email?.[0] ||
            'Failed to resend code. Please try again.'
    } finally {
        isResending.value = false
    }
}

const setCodeInput = (index: number, el: HTMLInputElement | null) => {
    codeInputs.value[index] = el
}

const handleCodeInput = (index: number, event: Event) => {
    const input = event.target as HTMLInputElement
    const value = input.value

    if (value && index < 4) {
        // Move to next input
        codeInputs.value[index + 1]?.focus()
    }
}

const handleBackspace = (index: number, event: KeyboardEvent) => {
    if (!verificationCode.value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        codeInputs.value[index - 1]?.focus()
    }
}

const handleVerifyOTP = async () => {
    const code = verificationCode.value.join('')
    if (code.length < 5) {
        errorMessage.value = 'Please enter the full verification code.'
        return
    }

    try {
        isLoading.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/verify-otp', {
            email: resetEmail.value,
            otp: code,
            action: 'password_reset',
        }, { requiresAuth: false })

        if (response.status === 'success') {
            resetOtp.value = code
            showOTPVerification.value = false
            showResetPassword.value = true
        }
    } catch (error: any) {
        console.error('Verify OTP error:', error)
        errorMessage.value =
            error.data?.message ||
            error.data?.errors?.otp?.[0] ||
            'OTP verification failed. Please try again.'
    } finally {
        isLoading.value = false
    }
}

const handleResetPassword = async () => {
    if (newPasswordData.value.newPassword !== newPasswordData.value.confirmPassword) {
        errorMessage.value = 'Passwords do not match.'
        return
    }

    try {
        isLoading.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/change-password', {
            email: resetEmail.value,
            otp: resetOtp.value,
            new_password: newPasswordData.value.newPassword,
        }, { requiresAuth: false })

        if (response.status === 'success') {
            loginData.value.email = resetEmail.value
            loginData.value.password = ''
            showResetPassword.value = false
            showOTPVerification.value = false
            showForgotPassword.value = false
            toast.success(response.message || 'Password updated successfully. Please sign in.')
        }
    } catch (error: any) {
        console.error('Reset password error:', error)
        errorMessage.value =
            error.data?.message ||
            error.data?.errors?.new_password?.[0] ||
            'Unable to reset password. Please try again.'
    } finally {
        isLoading.value = false
    }
}

onBeforeUnmount(() => {
    if (resendCountdownInterval) {
        clearInterval(resendCountdownInterval)
    }
})
</script>
