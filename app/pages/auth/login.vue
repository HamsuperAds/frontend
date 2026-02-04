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
                <div class="mt-4">
                    <button type="button"
                        class="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z">
                            </path>
                            <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z">
                            </path>
                            <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z">
                            </path>
                            <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z">
                            </path>
                        </svg>
                        <span class="text-gray-700 font-medium">Google</span>
                    </button>
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
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="resetEmail" type="email" placeholder="enter your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required />
                    </div>

                    <!-- Send OTP Button -->
                    <button type="submit"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6">
                        Send OTP
                    </button>
                </form>

                <!-- Resend Link -->
                <div class="mt-4 text-center text-sm">
                    <span class="text-gray-600">Didn't get token?</span>
                    <button @click="handleResendOTP" class="text-blue-500 hover:text-blue-600 font-medium ml-1">
                        Resend
                    </button>
                </div>

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
                    <p class="text-sm text-gray-600 mb-4">
                        Enter the verification code that was sent to<br />
                        your email ({{ resetEmail }})
                    </p>

                    <!-- Verification Code Inputs -->
                    <div class="flex justify-center gap-2 mb-6">
                        <input v-for="(digit, index) in verificationCode" :key="index"
                            :ref="el => (codeInputs[index] = el)" v-model="verificationCode[index]" type="text"
                            maxlength="1"
                            class="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            @input="handleCodeInput(index, $event)"
                            @keydown.backspace="handleBackspace(index, $event)" />
                    </div>

                    <!-- Verify Button -->
                    <button @click="handleVerifyOTP"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        Verify
                    </button>

                    <!-- Resend Code -->
                    <div class="mt-4 text-sm text-gray-600">
                        <p>Didn't get the verification code? It may take a while.</p>
                        <button @click="handleResendOTP" class="text-blue-500 hover:text-blue-600 font-medium mt-1">
                            Resend Code
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

                                        import { navigateTo } from '#app';

                                        import { useApi } from '#imports';
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
                    <button type="submit"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6">
                        Reset password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
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
    email: 'chiamaka.nnadi10@hamsuper.com',
    password: '12345678',
})

const resetEmail = ref('')
const verificationCode = ref(['', '', '', '', ''])
const codeInputs = ref<(HTMLInputElement | null)[]>([])

const newPasswordData = ref({
    newPassword: '',
    confirmPassword: '',
})

const isLoading = ref(false)
const errorMessage = ref('')

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
            if (process.client) {
                localStorage.setItem('authToken', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            // Redirect to account page using window.location for a full page reload
            window.location.href = '/account'
        }
    } catch (error: any) {
        console.error('Login error:', error)
        errorMessage.value = error.data?.message || 'Invalid email or password. Please try again.'
    } finally {
        isLoading.value = false
    }
}

const handleSendOTP = () => {
    // Here you would make an API call to send OTP
    console.log('Sending OTP to:', resetEmail.value)
    // Show OTP verification screen
    showForgotPassword.value = false
    showOTPVerification.value = true
}

const handleResendOTP = () => {
    // Here you would make an API call to resend OTP
    console.log('Resending OTP to:', resetEmail.value)
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

const handleVerifyOTP = () => {
    const code = verificationCode.value.join('')
    if (code.length === 5) {
        // Here you would verify the code with your API
        console.log('Verifying code:', code)
        // On success, show reset password screen
        showOTPVerification.value = false
        showResetPassword.value = true
    }
}

const handleResetPassword = () => {
    if (newPasswordData.value.newPassword !== newPasswordData.value.confirmPassword) {
        alert('Passwords do not match!')
        return
    }
    // Here you would make an API call to reset the password
    console.log('Resetting password')
    // On success, redirect to login
    showResetPassword.value = false
    showForgotPassword.value = false
}
</script>
