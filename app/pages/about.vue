<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">About Hamsuper</h1>

        <div class="prose prose-blue max-w-none">
            <section class="mb-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p class="text-gray-600 leading-relaxed">
                    At Hamsuper, our mission is to create the most trusted and efficient classified ads platform in
                    Nigeria. We aim to connect buyers and sellers seamlessly, providing a safe and user-friendly
                    environment for everyone to trade goods and services.
                </p>
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Why Choose Hamsuper?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div class="bg-blue-50 p-6 rounded-xl">
                        <div class="text-blue-600 mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2">Verified Ads</h3>
                        <p class="text-sm text-gray-600">We prioritize your safety with our dedicated verification
                            processes.</p>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-xl">
                        <div class="text-blue-600 mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2">Fast Response</h3>
                        <p class="text-sm text-gray-600">Connect with potential buyers or sellers instantly using our
                            messaging system.</p>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-xl">
                        <div class="text-blue-600 mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2">Free Posting</h3>
                        <p class="text-sm text-gray-600">Post your ads for free and reach thousands of potential
                            customers daily.</p>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
                <ol class="list-decimal list-inside space-y-4 text-gray-600">
                    <li class="pl-2"><span class="font-bold text-gray-900">Post an Ad:</span> Take clear photos of your
                        item, write a catchy description, and set your price.</li>
                    <li class="pl-2"><span class="font-bold text-gray-900">Get Contacted:</span> Interested buyers will
                        message you or call you through the platform.</li>
                    <li class="pl-2"><span class="font-bold text-gray-900">Close the Deal:</span> Meet in a safe public
                        place, verify the item, and receive your payment.</li>
                </ol>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
});
</script>
