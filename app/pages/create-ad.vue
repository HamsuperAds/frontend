<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto bg-white rounded-lg shadow">
                <!-- Header -->
                <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                    <h2 class="text-xl font-semibold flex items-center">
                        <Icon v-if="currentStep !== 1" @click="currentStep--" name="heroicons:chevron-left"
                            class="w-6 h-6 mr-2" />
                        {{ currentStep === 1 ? 'Create Ad' : 'Additional info: ' + adForm.title }}
                    </h2>
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
                            <span v-if="adFormHasError && adFormRules.title.hasError" class="errorText">{{
                                adFormRules.title.message }}</span>
                        </div>

                        <!-- Category and Subcategory -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select v-model="adForm.category_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required @change="adForm.subcategory_id = ''">
                                    <option value="">select category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                                <span v-if="adFormHasError && adFormRules.category_id.hasError" class="errorText">{{
                                    adFormRules.category_id.message }}</span>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                <select v-model="adForm.subcategory_id" :disabled="!adForm.category_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required>
                                    <option value="">select subcategory</option>
                                    <option v-for="sub in subcategories" :key="sub.id" :value="sub.id">
                                        {{ sub.name }}
                                    </option>
                                </select>
                                <span v-if="adFormHasError && adFormRules.subcategory_id.hasError" class="errorText">{{
                                    adFormRules.subcategory_id.message }}</span>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea v-model="adForm.description" placeholder="enter ad description" rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required></textarea>
                            <span v-if="adFormHasError && adFormRules.description.hasError" class="errorText">{{
                                adFormRules.description.message }}</span>
                        </div>

                        <!-- State and lga -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select v-model="adForm.state_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required @change="adForm.lga_id = ''">
                                    <option value="">select state</option>
                                    <option v-for="state in states" :key="state.id" :value="state.id">
                                        {{ state.name }}
                                    </option>
                                </select>
                                <span v-if="adFormHasError && adFormRules.state_id.hasError" class="errorText">{{
                                    adFormRules.state_id.message }}</span>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Local govt. area</label>
                                <select v-model="adForm.lga_id" :disabled="!adForm.state_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required>
                                    <option value="">select lga</option>
                                    <option v-for="lga in lgas" :key="lga.id" :value="lga.id">
                                        {{ lga.name }}
                                    </option>
                                </select>
                                <span v-if="adFormHasError && adFormRules.lga_id.hasError" class="errorText">{{
                                    adFormRules.lga_id.message }}</span>
                            </div>
                        </div>

                        <!-- Condition and Quantity -->
                        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div> -->

                        <!-- Photos -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                            <p class="text-xs text-gray-500 mb-2">Note: the first image will be used as the primary
                                image for the ad</p>
                            <div id="adImages" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <!-- Image Previews -->
                                <div v-for="(preview, index) in imagePreviews" :key="preview.id"
                                    class="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                    <img :src="preview.url" :alt="'Image ' + (index + 1)"
                                        class="w-full h-full object-cover" />
                                    <button type="button" @click="removeImage(index)"
                                        class="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full px-1 transition-colors">
                                        <Icon name="heroicons:x-mark" class="w-4 h-4 text-white" />
                                    </button>
                                    <span v-if="index === 0"
                                        class="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Primary</span>
                                </div>
                                <!-- Upload Button -->
                                <div
                                    class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer aspect-square flex flex-col items-center justify-center">
                                    <input type="file" multiple accept="image/*" class="hidden" id="photo-upload"
                                        @change="handleImageSelect" />
                                    <label for="photo-upload" class="cursor-pointer flex flex-col items-center">
                                        <svg class="w-12 h-12 text-gray-400 mb-2" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <p class="text-gray-500 text-sm">Click to upload</p>
                                    </label>
                                </div>
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
                            <span v-if="adFormHasError && adFormRules.price.hasError" class="errorText">{{
                                adFormRules.price.message }}</span>
                        </div>

                        <!-- Promotion plan -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Promotion</label>
                            <div v-if="promotionPlansLoading" class="text-sm text-gray-500">Loading plans...</div>
                            <div v-else class="space-y-2">
                                <label v-for="plan in promotionPlans" :key="plan.id" class="flex items-center">
                                    <input v-model="adForm.promotion_plan_id" type="radio" :value="plan.id"
                                        class="mr-2" />
                                    <span class="text-sm text-gray-700">{{ plan.name }} ({{ Number(plan.price) === 0 ?
                                        'free' : '₦' + Number(plan.price).toLocaleString() }})</span>
                                </label>
                            </div>
                            <button type="button" @click="showPricingDialog = true"
                                class="text-sm text-blue-600 hover:underline mt-2">
                                See pricing details
                            </button>
                        </div>

                        <!-- Next Button -->
                        <div class="flex justify-end pt-4">
                            <Button type="submit"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                                :disabled="adFormHasError">
                                Next
                                <Icon name="lucide:arrow-right" class="h-5 w-5" />
                            </Button>
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
                        <div v-for="plan in promotionPlans" :key="plan.id" class="border-2 rounded-lg overflow-hidden"
                            :style="{ borderColor: plan.color }">
                            <div class="text-white px-6 py-4 flex items-center justify-between"
                                :style="{ backgroundColor: plan.color }">
                                <h3 class="text-xl font-bold">{{ plan.name }}</h3>
                                <img :src="plan.icon" :alt="plan.name" class="w-6 h-6" />
                            </div>
                            <div class="p-6 space-y-4">
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">On-top</span>
                                    <span class="font-semibold" :style="{ color: plan.color }">{{
                                        formatDuration(plan.on_top_duration_hours) }}</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Auto Renew</span>
                                    <span class="font-semibold"
                                        :class="plan.auto_renew_interval_hours ? '' : 'text-gray-400'"
                                        :style="plan.auto_renew_interval_hours ? { color: plan.color } : {}">{{
                                            plan.auto_renew_interval_hours ? formatDuration(plan.auto_renew_interval_hours)
                                                : 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">SRP Promotion</span>
                                    <span class="font-semibold" :class="plan.srp_promotion_days ? '' : 'text-gray-400'"
                                        :style="plan.srp_promotion_days ? { color: plan.color } : {}">{{
                                            plan.srp_promotion_days ? plan.srp_promotion_days + ' days' : 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b">
                                    <span class="text-gray-700">Email marketing</span>
                                    <span class="font-semibold"
                                        :class="plan.email_marketing_enabled ? '' : 'text-gray-400'"
                                        :style="plan.email_marketing_enabled ? { color: plan.color } : {}">{{
                                            plan.email_marketing_enabled ? 'Yes' : 'N/A' }}</span>
                                </div>
                            </div>
                            <div class="text-white px-6 py-4 flex items-center justify-between"
                                :style="{ backgroundColor: plan.color }">
                                <span class="font-semibold">Price:</span>
                                <span class="text-2xl font-bold">{{ Number(plan.price) === 0 ? 'Free' : '₦' +
                                    Number(plan.price).toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCategories } from '~/composables/useCategories';
import { useStates } from '~/composables/useStates';
import type { PromotionPlan } from '~/types/promotionPlan';

const currentStep = ref(1)
const showPricingDialog = ref(false)
const validate = useValidate();

const { categories, loading: categoriesLoading, fetchCategories } = useCategories()
const { states, loading: statesLoading, fetchStates } = useStates()

const promotionPlans = ref<PromotionPlan[]>([])
const promotionPlansLoading = ref(false)

const formatDuration = (hours: number) => {
    if (hours >= 24) {
        const days = Math.floor(hours / 24)
        return days + (days === 1 ? ' day' : ' days')
    }
    return hours + 'hrs'
}

const fetchPromotionPlans = async () => {
    promotionPlansLoading.value = true
    try {
        const { data } = await useApi().fetchGet<{
            success: boolean;
            data: any[];
        }>('/promotion-plans', {
            requiresAuth: false
        })
        if (data) {
            promotionPlans.value = data
            if (data.length > 0) {
                adForm.value.promotion_plan_id = data[0].id
            }
        }
    } catch (err) {
        console.error('Error fetching promotion plans:', err)
    } finally {
        promotionPlansLoading.value = false
    }
}

onMounted(async () => {
    await Promise.all([
        fetchCategories(),
        fetchStates(),
        fetchPromotionPlans()
    ])
})

const adForm = ref<Record<string, any>>({
    title: 'Test Ad',
    category_id: '1',
    subcategory_id: '2',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    state_id: '1',
    lga_id: '2',
    price: '1000',
    negotiable: false,
    promotion_plan_id: '',
    images: [],
    primary_image_index: 0,
});
const adFormHasError = ref(true);

// Image preview handling
interface ImagePreview {
    id: string;
    url: string;
    file: File;
}
const imagePreviews = ref<ImagePreview[]>([]);

const handleImageSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    files.forEach((file) => {
        const preview: ImagePreview = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: URL.createObjectURL(file),
            file: file,
        };
        imagePreviews.value.push(preview);
        adForm.value.images.push(file);
    });

    // Reset input to allow selecting the same file again
    input.value = '';
};

const removeImage = (index: number) => {
    const preview = imagePreviews.value[index];
    if (preview) {
        // Revoke the object URL to free memory
        URL.revokeObjectURL(preview.url);
    }
    imagePreviews.value.splice(index, 1);
    adForm.value.images.splice(index, 1);
};

const subcategories = computed(() => {
    if (!adForm.value.category_id) return []
    const category = categories.value.find(c => c.id === Number(adForm.value.category_id))
    return category ? category.subcategories : []
})

const lgas = computed(() => {
    if (!adForm.value.state_id) return []
    const state = states.value.find(s => s.id === Number(adForm.value.state_id))
    return state ? state.lgas : []
})

const adFormRules = ref<Record<string, any>>({
    title: { minLength: 5, maxLength: 100 },
    category_id: { min: 1, max: 16 },
    subcategory_id: { min: 1, max: 200, customMessage: 'Please select a Subcategory' },
    description: { minLength: 5, maxLength: 500 },
    state_id: { min: 1, max: 37 },
    lga_id: { min: 1, max: 774, customMessage: 'Please select an LGA' },
    price: { min: 5, max: 100000000 },
});

const checkAdForm = () => {
    adFormRules.value = validate(adForm.value, adFormRules.value);
    adFormHasError.value = false;
    for (const field in adFormRules.value) {
        if (adFormRules.value[field]?.hasError || !adForm.value[field]) {
            adFormHasError.value = true;
            break;
        }
    }
}
watch(adForm.value, () => {
    checkAdForm()
})

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

const clearImagePreviews = () => {
    // Revoke all object URLs to free memory
    imagePreviews.value.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
    });
    imagePreviews.value = [];
};

const clearForm = () => {
    if (currentStep.value === 1) {
        clearImagePreviews();
        adForm.value = {
            title: '',
            category_id: '',
            subcategory_id: '',
            description: '',
            state_id: 1,
            lga_id: '',
            price: '',
            negotiable: false,
            promotion: 'bronze',
            images: []
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
    console.log('Submitting ad:', { ...adForm.value, ...additionalInfo.value })
    currentStep.value = 3
}

const resetForm = () => {
    clearImagePreviews();
    adForm.value = {
        title: '',
        category_id: '',
        subcategory_id: '',
        description: '',
        state_id: 1,
        lga_id: '',
        price: '',
        negotiable: false,
        promotion: 'bronze',
        images: []
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
