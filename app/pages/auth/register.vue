<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div class="w-full max-w-md">
            <!-- Registration Form -->
            <div v-if="!showVerification" class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">User Account Creation</h2>
                    <p class="text-sm text-gray-600 mt-1">Create an account for an upgraded experience</p>
                </div>

                <form @submit.prevent="handleCreateAccount" class="space-y-4">
                    <!-- Error Message -->
                    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                    </div>
                    <!-- First Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">First name</label>
                        <input v-model="formData.firstName" type="text" placeholder="enter your first name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required />
                    </div>

                    <!-- Last Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                        <input v-model="formData.lastName" type="text" placeholder="enter your surname"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required />
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="formData.email" type="email" placeholder="enter your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required />
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div class="relative">
                            <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="enter password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                                required />
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

                    <!-- Phone Number -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                        <input v-model="formData.phoneNumber" type="tel" placeholder="enter your phone number"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>

                    <!-- Create Account Button -->
                    <button type="submit" :disabled="registerFormHasError || isLoading"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Creating account...' : 'Create account' }}
                    </button>
                </form>

                <!-- Sign In Link -->
                <div class="mt-4 text-center text-sm">
                    <span class="text-gray-600">Already have an account?</span>
                    <a href="/auth/login" class="text-blue-500 hover:text-blue-600 font-medium ml-1">Sign in</a>
                </div>

                <!-- Google Sign In -->
                <div class="mt-4 flex justify-center">
                    <GoogleSignIn />
                </div>
            </div>

            <!-- Verification Code -->
            <div v-else class="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-8">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Verify account</h2>
                    <p class="text-sm text-gray-600 mt-1">Just one last step</p>
                </div>

                <div class="text-center mb-6">
                    <p class="text-sm text-gray-600 mb-4">
                        Enter the verification code that was sent to<br />
                        your email ({{ formData.email }})
                    </p>

                    <!-- Verification Code Inputs -->
                    <div class="flex justify-center mb-6">
                        <InputOTP v-model="verificationCode" :maxlength="5" :pattern="REGEXP_ONLY_DIGITS"
                            @complete="handleVerify">
                            <InputOTPGroup>
                                <InputOTPSlot v-for="(_, i) in 5" :key="i" :index="i" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <!-- Verify Error Message -->
                    <div v-if="verifyErrorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p class="text-sm text-red-600">{{ verifyErrorMessage }}</p>
                    </div>

                    <!-- Verify Button -->
                    <button @click="handleVerify" :disabled="isVerifying || verificationCode.length < 5"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <svg v-if="isVerifying" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isVerifying ? 'Verifying...' : 'Verify' }}
                    </button>

                    <!-- Resend Code -->
                    <div class="mt-4 text-sm text-gray-600">
                        <p>Didn't get the verification code? It may take a while.</p>
                        <div class="mt-1 flex items-center justify-center gap-1">
                            <button @click="handleResendCode" :disabled="resendCountdown > 0 || isResending"
                                class="text-blue-500 hover:text-blue-600 font-medium disabled:text-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-1">
                                <svg v-if="isResending" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isResending ? 'Sending...' : 'Resend Code' }}
                            </button>
                            <span v-if="resendCountdown > 0" class="text-gray-400">
                                ({{ resendCountdown }}s)
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Register - Hamsuper',
  description: 'Create a new Hamsuper account to start buying and selling.'
})
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'vue-input-otp'
import { toast } from 'vue-sonner'
const { getSession } = useAuth();
const { setToken } = useAuthState();

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/account",
    },
});
const showVerification = ref(false)
const showPassword = ref(false)
const validate = useValidate();
const registerFormHasError = ref(true);
const isLoading = ref(false)
const errorMessage = ref('')
const isVerifying = ref(false)
const verifyErrorMessage = ref('')
const isResending = ref(false)
const resendCountdown = ref(0)
const verificationCode = ref('')
let resendCountdownInterval: ReturnType<typeof setInterval> | null = null
let nextResendDuration = 60 // After first resend, countdown is 60s

onMounted(() => {
    const userInfoStore = useUserInfoStore()
    if (userInfoStore.loginEmail) {
        formData.value.email = userInfoStore.loginEmail
        showVerification.value = true
        startResendCountdown(30)
        userInfoStore.loginEmail = ''
    }
})

const formData = ref<Record<string, any>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
})
const registerFormRules = ref<Record<string, any>>({
    firstName: { minLength: 2, maxLength: 50 },
    lastName: { minLength: 2, maxLength: 50 },
    email: { minLength: 5, maxLength: 100 },
    password: { minLength: 5, maxLength: 100 },
    phoneNumber: { type: 'tel' },
});

const checkAdForm = () => {
    registerFormRules.value = validate(formData.value, registerFormRules.value);
    registerFormHasError.value = false;
    for (const field in registerFormRules.value) {
        if ((registerFormRules.value[field]?.hasError || !formData.value[field]) && (field !== 'phoneNumber' || (field === 'phoneNumber' && formData.value[field]))) {
            registerFormHasError.value = true;
            break;
        }
    }
}
watch(formData.value, () => {
    checkAdForm()
})


const handleCreateAccount = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        const response = await useApi().fetchPost<{
            status: string
            message: string
            data: {
                first_name: string
                last_name: string
                email: string
                id: string
                updated_at: string
                created_at: string
                avatar: string
            }
        }>('/auth/signup', {
            first_name: formData.value.firstName,
            last_name: formData.value.lastName,
            email: formData.value.email,
            password: formData.value.password,
            phone_number: formData.value.phoneNumber
                ? (formData.value.phoneNumber.replace(/^(\+|0)+/, '').startsWith('234')
                    ? formData.value.phoneNumber.replace(/^(\+|0)+/, '')
                    : '234' + formData.value.phoneNumber.replace(/^(\+|0)+/, ''))
                : undefined,
        }, { requiresAuth: false })

        if (response.status === 'success') {
            showVerification.value = true
            startResendCountdown(30) // First countdown is 30s
        }
    } catch (error: any) {
        console.error('Registration error:', error)
        errorMessage.value = error.data?.message || 'Account creation failed. Please try again.'
    } finally {
        isLoading.value = false
    }
}

const handleVerify = async () => {
    if (verificationCode.value.length < 5) return

    try {
        isVerifying.value = true
        verifyErrorMessage.value = ''

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
        }>('/auth/verify-otp', {
            email: formData.value.email,
            otp: verificationCode.value,
        }, { requiresAuth: false })

        if (response.status === 'success' && response.data.token) {
            setToken(response.data.token)
            await getSession()

            if (process.client) {
                localStorage.setItem('authToken', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            window.location.href = '/account'
        }
    } catch (error: any) {
        console.error('OTP verification error:', error)
        verifyErrorMessage.value = error.data?.message || 'OTP verification failed. Please try again.'
    } finally {
        isVerifying.value = false
    }
}

const startResendCountdown = (seconds: number) => {
    if (resendCountdownInterval) clearInterval(resendCountdownInterval)
    resendCountdown.value = seconds
    resendCountdownInterval = setInterval(() => {
        resendCountdown.value--
        if (resendCountdown.value <= 0) {
            if (resendCountdownInterval) clearInterval(resendCountdownInterval)
            resendCountdownInterval = null
        }
    }, 1000)
}

const handleResendCode = async () => {
    try {
        isResending.value = true

        const response = await useApi().fetchPost<{
            status: string
            message: string
        }>('/auth/send-otp', {
            email: formData.value.email,
            action: 'email_verification',
        }, { requiresAuth: false })

        if (response.status === 'success') {
            toast.success(response.message || 'Verification code sent to your email.')
            startResendCountdown(nextResendDuration)
            nextResendDuration = 60 // Subsequent resends always use 60s
        }
    } catch (error: any) {
        console.error('Resend OTP error:', error)
        toast.error(error.data?.message || 'Failed to resend code. Please try again.')
    } finally {
        isResending.value = false
    }
}

onBeforeUnmount(() => {
    if (resendCountdownInterval) clearInterval(resendCountdownInterval)
})
</script>
