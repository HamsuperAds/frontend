<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto bg-white rounded-lg shadow">
                <!-- Header -->
                <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                    <h2 class="text-xl font-semibold">
                        {{ currentStep === 1 ? 'Create Ad' : 'Additional info: HP Laptop firefly G8' }}</h2>
                    <button @click="clearForm" class="text-sm hover:underline">Clear</button>
                </div>

                <!-- Step 3: Success Screen -->
                <div v-if="currentStep === 3" class="p-12">
                    <div class="text-center">
                        <!-- Success Icon -->
                        <div class="mx-auto w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M5 13l4 4L19 7">
                                </path>
                            </svg>
                        </div>

                        <!-- Success Message -->
                        <h3 class="text-xl text-gray-900 mb-2">Your ad has been submitted for review.</h3>
                        <p class="text-gray-600 mb-8">It will be live in a moment.</p>

                        <!-- Action Links -->
                        <div class="flex items-center justify-center gap-8">
                            <a href="/account/my-adverts"
                                class="text-gray-700 hover:text-gray-900 underline font-medium">
                                See my ads
                            </a>
                            <a href="/create-ad" class="text-gray-700 hover:text-gray-900 underline font-medium"
                                @click.prevent="resetForm">
                                Post another ad
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Step 1: Main Form -->
                <div v-else-if="currentStep === 1" class="p-6">
                    <form @submit.prevent="goToNextStep" class="space-y-4">
                        <!-- Title -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input v-model="adForm.title" type="text" placeholder="enter ad title"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                        </div>

                        <!-- Category and Subcategory -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select v-model="adForm.category"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required>
                                    <option value="">select category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="vehicles">Vehicles</option>
                                    <option value="real-estate">Real Estate</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                <select v-model="adForm.subcategory"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required>
                                    <option value="">select subcategory</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="phones">Phones</option>
                                    <option value="tablets">Tablets</option>
                                </select>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea v-model="adForm.description" placeholder="enter ad description" rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required></textarea>
                        </div>

                        <!-- Condition and Quantity -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                                <select v-model="adForm.condition"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required>
                                    <option value="">select condition</option>
                                    <option value="new">Brand New</option>
                                    <option value="used">Used</option>
                                    <option value="refurbished">Refurbished</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                <input v-model="adForm.quantity" type="number" placeholder="1" min="1"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required />
                            </div>
                        </div>

                        <!-- Photos -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                            <p class="text-xs text-gray-500 mb-2">Note: the first image will be used as the primary
                                image for the ad</p>
                            <div
                                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                <input type="file" multiple accept="image/*" class="hidden" id="photo-upload" />
                                <label for="photo-upload" class="cursor-pointer">
                                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-2" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <p class="text-gray-500 text-sm">Click to upload photos</p>
                                </label>
                            </div>
                        </div>

                        <!-- Price -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <div class="flex items-center gap-4">
                                <input v-model="adForm.price" type="number" placeholder="enter price"
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required />
                                <label class="flex items-center">
                                    <input v-model="adForm.negotiable" type="checkbox" class="mr-2" />
                                    <span class="text-sm text-gray-700">Negotiable</span>
                                </label>
                            </div>
                        </div>

                        <!-- Promotion -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Promotion</label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input v-model="adForm.promotion" type="radio" value="bronze" class="mr-2" />
                                    <span class="text-sm text-gray-700">Bronze (free)</span>
                                </label>
                                <label class="flex items-center">
                                    <input v-model="adForm.promotion" type="radio" value="silver" class="mr-2" />
                                    <span class="text-sm text-gray-700">Silver (₦4,500)</span>
                                </label>
                                <label class="flex items-center">
                                    <input v-model="adForm.promotion" type="radio" value="gold" class="mr-2" />
                                    <span class="text-sm text-gray-700">Gold (16,000)</span>
                                </label>
                            </div>
                            <button type="button" @click="showPricingDialog = true"
                                class="text-sm text-blue-600 hover:underline mt-2">
                                See pricing details
                            </button>
                        </div>

                        <!-- Next Button -->
                        <div class="flex justify-end pt-4">
                            <button type="submit"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                                Next
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Step 2: Additional Info -->
                <div v-else-if="currentStep === 2" class="p-6">
                    <div class="mb-6">
                        <p class="text-sm text-gray-700 mb-4">
                            Study shows that ads with more details give customers confidence and increases chance of
                            patronage.
                        </p>
                        <p class="text-sm text-gray-600">
                            In our dedication to make listing of ads easy for you, we have made this step optional. So,
                            you can skip and create your ad. You can always add the details later.
                        </p>
                    </div>

                    <form @submit.prevent="submitAd" class="space-y-4">
                        <!-- Brand and Model -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input v-model="additionalInfo.brand" type="text" placeholder="enter brand"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                <input v-model="additionalInfo.model" type="text" placeholder="enter model"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <!-- RAM and Screen Size -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">RAM (MB)</label>
                                <input v-model="additionalInfo.ram" type="text" placeholder="enter ram"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Screen size (inches)</label>
                                <input v-model="additionalInfo.screenSize" type="text" placeholder="enter screen size"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <!-- Storage Type and Size -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Storage type</label>
                                <select v-model="additionalInfo.storageType"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">select storage type</option>
                                    <option value="ssd">SSD</option>
                                    <option value="hdd">HDD</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Storage size (GB)</label>
                                <input v-model="additionalInfo.storageSize" type="text" placeholder="select subcategory"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <!-- Processor and Generation -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                                <input v-model="additionalInfo.processor" type="text" placeholder="enter processor"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Generation</label>
                                <input v-model="additionalInfo.generation" type="text" placeholder="enter generation"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <!-- YouTube Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Link to Youtube video
                                link</label>
                            <input v-model="additionalInfo.youtubeLink" type="url" placeholder="enter ad description"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-between pt-4">
                            <button type="button" @click="skipAndSubmit"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                Skip & Submit
                            </button>
                            <button type="submit"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                                Create Ad
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Pricing Details Dialog -->
        <div v-if="showPricingDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click.self="showPricingDialog = false">
            <div class="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold text-gray-900">Pricing Plans</h2>
                        <button @click="showPricingDialog = false" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Bronze Plan -->
                        <div class="border-2 border-blue-500 rounded-lg overflow-hidden">
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Bronze</h3>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z">
                                    </path>
                                </svg>
                            </div>
                            <div class="p-6 space-y-4">
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">On-top</span>
                                    <span class="text-blue-600 font-semibold">24hrs</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Auto Renew</span>
                                    <span class="text-blue-400">N/A</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">SRP Promotion</span>
                                    <span class="text-blue-400">N/A</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Email marketing</span>
                                    <span class="text-blue-400">N/A</span>
                                </div>
                            </div>
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <span class="font-semibold">Price:</span>
                                <span class="text-2xl font-bold">₦0</span>
                            </div>
                        </div>

                        <!-- Silver Plan -->
                        <div class="border-2 border-blue-500 rounded-lg overflow-hidden">
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Silver</h3>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z">
                                    </path>
                                </svg>
                            </div>
                            <div class="p-6 space-y-4">
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">On-top</span>
                                    <span class="text-blue-600 font-semibold">7 days</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Auto Renew</span>
                                    <span class="text-blue-600 font-semibold">24hrs</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">SRP Promotion</span>
                                    <span class="text-blue-600 font-semibold">3 days</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Email marketing</span>
                                    <span class="text-blue-400">N/A</span>
                                </div>
                            </div>
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <span class="font-semibold">Price:</span>
                                <span class="text-2xl font-bold">₦4,500</span>
                            </div>
                        </div>

                        <!-- Gold Plan -->
                        <div class="border-2 border-blue-500 rounded-lg overflow-hidden">
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Gold</h3>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                                    </path>
                                </svg>
                            </div>
                            <div class="p-6 space-y-4">
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">On-top</span>
                                    <span class="text-blue-600 font-semibold">30 days</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Auto Renew</span>
                                    <span class="text-blue-600 font-semibold">6hrs</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">SRP Promotion</span>
                                    <span class="text-blue-600 font-semibold">14 days</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Email marketing</span>
                                    <span class="text-blue-600 font-semibold">Yes</span>
                                </div>
                            </div>
                            <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                                <span class="font-semibold">Price:</span>
                                <span class="text-2xl font-bold">₦16,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const currentStep = ref(1)
const showPricingDialog = ref(false)

const adForm = ref({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    condition: '',
    quantity: 1,
    price: '',
    negotiable: false,
    promotion: 'bronze'
});
const adFormRules = ref<Record<string, any>>({
    title: { minLength: 2, maxLength: 50 },
    category: { minLength: 2, maxLength: 50 },
    subcategory: { minLength: 2, maxLength: 50 },
    description: { minLength: 2, maxLength: 50 },
    condition: { minLength: 2, maxLength: 50 },
    quantity: { minLength: 2, maxLength: 50 },
    price: { minLength: 2, maxLength: 50 },
    negotiable: { minLength: 2, maxLength: 50 },
    promotion: { minLength: 2, maxLength: 50 },
});

const additionalInfo = ref({
    brand: '',
    model: '',
    ram: '',
    screenSize: '',
    storageType: '',
    storageSize: '',
    processor: '',
    generation: '',
    youtubeLink: ''
})

const clearForm = () => {
    if (currentStep.value === 1) {
        formData.value = {
            title: '',
            category: '',
            subcategory: '',
            description: '',
            condition: '',
            quantity: 1,
            price: '',
            negotiable: false,
            promotion: 'bronze'
        }
    } else {
        additionalInfo.value = {
            brand: '',
            model: '',
            ram: '',
            screenSize: '',
            storageType: '',
            storageSize: '',
            processor: '',
            generation: '',
            youtubeLink: ''
        }
    }
}

const goToNextStep = () => {
    currentStep.value = 2
}

const skipAndSubmit = () => {
    submitAd()
}

const submitAd = () => {
    console.log('Submitting ad:', { ...formData.value, ...additionalInfo.value })
    currentStep.value = 3
}

const resetForm = () => {
    formData.value = {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        condition: '',
        quantity: 1,
        price: '',
        negotiable: false,
        promotion: 'bronze'
    }
    additionalInfo.value = {
        brand: '',
        model: '',
        ram: '',
        screenSize: '',
        storageType: '',
        storageSize: '',
        processor: '',
        generation: '',
        youtubeLink: ''
    }
    currentStep.value = 1
}
</script>
