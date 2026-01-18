<template>
    <div class="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-gray-50 p-4">
        <div class="text-center">
            <template v-if="isVerifying">
                <Icon name="svg-spinners:90-ring-with-bg" class="w-16 h-16 text-blue-500 mb-6 mx-auto" />
                <h2 class="text-xl font-semibold text-gray-900">Verifying your payment...</h2>
                <p class="text-gray-500 mt-2">Please wait while we confirm your transaction</p>
            </template>
            <template v-else-if="isSuccess">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">Payment successfully verified</h2>
                <p class="text-gray-500 mt-2">Your ad promotion is now active.</p>

                <div class="mt-8">
                    <NuxtLink to="/account/my-adverts"
                        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Go to My Adverts
                    </NuxtLink>
                </div>
            </template>
            <template v-else>
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">Verification Failed</h2>
                <p class="text-gray-500 mt-2">{{ errorMessage || 'Could not verify your payment.' }} <NuxtLink
                        to="/contact-us" class="text-blue-600 hover:underline">Contact support</NuxtLink>
                </p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
    auth: false,
});

const route = useRoute()
const isVerifying = ref(true)
const isSuccess = ref(false)
const errorMessage = ref('')

const verifyPayment = async () => {
    isVerifying.value = true
    const reference = route.query.reference || route.query.trxref

    if (!reference) {
        isVerifying.value = false
        isSuccess.value = false
        return
    }

    try {
        const response = await useApi().fetchPost<{
            success: boolean,
            message: string,
            data: any
        }>(`/transactions/${reference}/verify`, {})

        if (response.success) {
            isSuccess.value = true
            localStorage.setItem('justVerifiedPayment', 'true')
        } else {
            isSuccess.value = false
            errorMessage.value = response.message || 'Verification failed'
        }
    } catch (error: any) {
        isSuccess.value = false
        errorMessage.value = error?.data?.message || 'Verification failed'
    } finally {
        isVerifying.value = false
    }
}

onMounted(() => {
    verifyPayment()
})
</script>
