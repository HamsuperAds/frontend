<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
            <p class="text-lg text-gray-600">Got a question? We'd love to hear from you.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div class="space-y-8">
                <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                    <p class="text-gray-600">Our support team is available to help you with any issues or inquiries you
                        might have.</p>
                </div>

                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Email</p>
                            <p class="text-gray-900">support@hamsuper.com</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Office</p>
                            <p class="text-gray-900">Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input v-model="form.name" type="text" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name" />
                        <span v-if="formHasError && formRules.name.hasError" class="errorText">{{
                            formRules.name.message }}</span>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input v-model="form.email" type="email" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email" />
                        <span v-if="formHasError && formRules.email.hasError" class="errorText">{{
                            formRules.email.message }}</span>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input v-model="form.subject" type="text" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How can we help?" />
                        <span v-if="formHasError && formRules.subject.hasError" class="errorText">{{
                            formRules.subject.message }}</span>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea v-model="form.message" rows="4" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your inquiry..."></textarea>
                        <div class="flex justify-between mt-1">
                            <span v-if="formHasError && formRules.message.hasError" class="errorText">{{
                                formRules.message.message }}</span>
                            <span v-else></span>
                            <span class="text-xs text-gray-500 text-right">{{ form.message?.length || 0 }} / {{
                                formRules.message.maxLength }}</span>
                        </div>
                    </div>

                    <button type="submit" :disabled="submitting || formHasError"
                        class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        {{ submitting ? 'Sending...' : 'Send Message' }}
                    </button>

                    <p v-if="submitted" class="text-center text-green-600 font-medium">
                        Message sent successfully!
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useStorage } from '@vueuse/core'

definePageMeta({
    auth: false,
});
const validate = useValidate();
const form = ref<Record<string, any>>({
    name: '',
    email: '',
    subject: '',
    message: ''
})
const formRules = ref<Record<string, any>>({
    name: { minLength: 5, maxLength: 100 },
    email: { type: 'email' },
    subject: { minLength: 5, maxLength: 100 },
    message: { minLength: 15, maxLength: 1000 },
});
const formHasError = ref(true)
const checkForm = () => {
    formRules.value = validate(form.value, formRules.value);
    formHasError.value = false;
    for (const field in formRules.value) {
        if (formRules.value[field]?.hasError || !form.value[field]) {
            formHasError.value = true;
            break;
        }
    }
}
watch(form, () => {
    checkForm()
}, { deep: true })

const submitting = ref(false)
const submitted = ref(false)

const lastSubmission = useStorage('last_contact_submission', 0)

const handleSubmit = async () => {
    // Check rate limit (1 hour = 3600000 ms)
    const now = Date.now()
    if (now - lastSubmission.value < 3600000) {
        const last = Number(lastSubmission.value) || 0;
        const remainingMinutes = Math.ceil((3600000 - (now - last)) / 60000)
        const mins = remainingMinutes > 0 ? remainingMinutes : 60;
        toast.error(`Please wait ${mins} minutes before sending another message.`)
        return
    }

    submitting.value = true
    try {
        const response = await useApi().fetchPost<{
            success: boolean
            message: string
            data: any
        }>('/feedback', form.value, { requiresAuth: false })

        if (response.success) {
            submitted.value = true
            lastSubmission.value = Date.now()
            toast.success(response.message || 'Message sent successfully!')
            form.value = { name: '', email: '', subject: '', message: '' }

            // Trigger validation to reset/update UI
            checkForm()

            setTimeout(() => {
                submitted.value = false
            }, 3000)
        }
    } catch (error: any) {
        toast.error(error.message || error.data?.message || 'Failed to send message. Please try again.')
    } finally {
        submitting.value = false
    }
}
</script>
