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
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input v-model="form.email" type="email" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input v-model="form.subject" type="text" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How can we help?" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea v-model="form.message" rows="4" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your inquiry..."></textarea>
                    </div>

                    <button type="submit" :disabled="submitting"
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
definePageMeta({
    auth: false,
});
const form = ref({
    email: '',
    subject: '',
    message: ''
})

const submitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
    submitting.value = true
    // Simulate API call
    console.log('Contact form submission:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000))

    submitting.value = false
    submitted.value = true
    form.value = { email: '', subject: '', message: '' }

    setTimeout(() => {
        submitted.value = false
    }, 3000)
}
</script>
