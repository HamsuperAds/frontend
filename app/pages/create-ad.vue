<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto bg-white rounded-lg shadow">
                <!-- Header -->
                <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                    <h2 class="text-xl font-semibold flex items-center">
                        <Icon v-if="currentStep === 2" @click="currentStep--" name="heroicons:chevron-left"
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
                        <!-- Place -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Place/town</label>
                            <input v-model="adForm.place" type="text" placeholder="enter ad title"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                            <span v-if="adFormHasError && adFormRules.place.hasError" class="errorText">{{
                                adFormRules.place.message }}</span>
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
                            <span v-if="adFormHasError && adFormRules?.images?.hasError" class="errorText">{{
                                adFormRules.images.message }}</span>
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

                    <form @submit.prevent="submitAd(false)" class="space-y-4">
                        <!-- Loading State -->
                        <div v-if="subcategoryAttributesLoading" class="text-sm text-gray-500 py-4 text-center">
                            Loading attributes...
                        </div>

                        <!-- No Attributes Message -->
                        <div v-else-if="subcategoryAttributes.length === 0"
                            class="text-sm text-gray-500 py-4 text-center">
                            No additional attributes for this subcategory.
                        </div>

                        <!-- Dynamic Attribute Fields -->
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="attr in subcategoryAttributes" :key="attr.id">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    {{ attr.name }}
                                    <span v-if="attr.unit" class="text-gray-500 font-normal">({{ attr.unit }})</span>
                                </label>

                                <!-- String type: text input -->
                                <input v-if="attr.type === 'string'" v-model="additionalInfo[attr.slug]" type="text"
                                    :placeholder="'enter ' + attr.name.toLowerCase()" :minlength="attr.rules?.minLength"
                                    :maxlength="attr.rules?.maxLength"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                <!-- Number type: number input -->
                                <input v-else-if="attr.type === 'number'" v-model="additionalInfo[attr.slug]"
                                    type="number" :placeholder="'enter ' + attr.name.toLowerCase()"
                                    :min="attr.rules?.min" :max="attr.rules?.max"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                <!-- Select type: dropdown -->
                                <select v-else-if="attr.type === 'select'" v-model="additionalInfo[attr.slug]"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">select {{ attr.name.toLowerCase() }}</option>
                                    <option v-for="option in attr.options" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>

                                <!-- Text type: textarea -->
                                <textarea v-else-if="attr.type === 'text'" v-model="additionalInfo[attr.slug]" rows="3"
                                    :placeholder="'enter ' + attr.name.toLowerCase()" :minlength="attr.rules?.minLength"
                                    :maxlength="attr.rules?.maxLength"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div v-if="submitError"
                            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {{ submitError }}
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-between pt-4">
                            <button type="button" @click="skipAndSubmit()" :disabled="isSubmitting"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <Icon v-if="isSubmitting && isSkipSubmit" name="svg-spinners:ring-resize"
                                    class="w-5 h-5" />
                                Skip & Submit
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <Icon v-if="isSubmitting && !isSkipSubmit" name="svg-spinners:ring-resize"
                                    class="w-5 h-5" />
                                <template v-else>
                                    Create Ad
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </template>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <PricingPlansDialog v-model="showPricingDialog" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCategories } from '~/composables/useCategories';
import { useStates } from '~/composables/useStates';
import type { PromotionPlan } from '~/types/promotionPlan';
import type { SubcategoryAttribute } from '~/types/subcategoryAttribute';

const appResourceInfoStore = useAppResourceInfoStore();
const currentStep = ref(1)
const showPricingDialog = ref(false)
const validate = useValidate();

const { categories, loading: categoriesLoading, fetchCategories } = useCategories()
const { states, loading: statesLoading, fetchStates } = useStates()

const promotionPlans = ref<PromotionPlan[]>([])
const promotionPlansLoading = ref(false)



const fetchPromotionPlans = async () => {
    promotionPlansLoading.value = true
    promotionPlans.value = await appResourceInfoStore.fetchPromotionPlans() as PromotionPlan[];
    promotionPlansLoading.value = false
}

onMounted(async () => {
    await Promise.all([
        fetchCategories(),
        fetchStates(),
        fetchPromotionPlans()
    ])
    if (adForm.value.subcategory_id) {
        fetchSubcategoryAttributes(adForm.value.subcategory_id);
    }
})

const adForm = ref<Record<string, any>>({
    title: 'Test Ad',
    category_id: '1',
    subcategory_id: '2',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    state_id: '1',
    lga_id: '2',
    place: 'Nkwa',
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
    place: { minLength: 3, maxLength: 100 },
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
    if (adForm.value.images.length == 0) {
        adFormHasError.value = true;
        adFormRules.value.images = { hasError: true, message: 'Please select at least one image' };
    } else {
        adFormRules.value.images = { hasError: false, message: '' };
    }
}
watch(adForm.value, () => {
    checkAdForm()
})

// Subcategory attributes (dynamic additional info)
const subcategoryAttributes = ref<SubcategoryAttribute[]>([]);
const subcategoryAttributesLoading = ref(false);
const additionalInfo = ref<Record<string, any>>({});

const fetchSubcategoryAttributes = async (subcategoryId: string | number) => {
    if (!subcategoryId) {
        subcategoryAttributes.value = [];
        additionalInfo.value = {};
        return;
    }

    subcategoryAttributesLoading.value = true;
    try {
        const { data } = await useApi().fetchGet<{
            success: boolean;
            data: SubcategoryAttribute[];
        }>(`/subcategories/${subcategoryId}/attributes`, {
            requiresAuth: false
        });
        if (data) {
            subcategoryAttributes.value = data;
            // Initialize additionalInfo with empty values for each attribute
            const newAdditionalInfo: Record<string, any> = {};
            data.forEach((attr) => {
                newAdditionalInfo[attr.slug] = '';
            });
            additionalInfo.value = newAdditionalInfo;
        }
    } catch (err) {
        console.error('Error fetching subcategory attributes:', err);
    } finally {
        subcategoryAttributesLoading.value = false;
    }
};

// Watch for subcategory changes to fetch attributes
watch(() => adForm.value.subcategory_id, (newSubcategoryId) => {
    fetchSubcategoryAttributes(newSubcategoryId);
});

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
        // Reset all attribute values to empty strings
        Object.keys(additionalInfo.value).forEach((key) => {
            additionalInfo.value[key] = '';
        });
    }
}

const goToNextStep = () => {
    currentStep.value = 2
}

// Submit state
const isSubmitting = ref(false);
const isSkipSubmit = ref(false);
const submitError = ref('');

const skipAndSubmit = () => {
    isSkipSubmit.value = true;
    submitAd(true);
}

const submitAd = async (skipDetails = false) => {
    submitError.value = '';
    isSubmitting.value = true;
    if (!skipDetails) {
        isSkipSubmit.value = false;
    }

    try {
        // Build FormData for the request
        const formData = new FormData();

        // Add form fields using a loop
        for (const key in adForm.value) {
            const value = adForm.value[key];

            if (key === 'images') {
                // Add images properly
                (value as File[]).forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
            } else if (typeof value === 'boolean') {
                // Convert boolean to 1 or 0
                formData.append(key, value ? '1' : '0');
            } else if (value !== null && value !== undefined) {
                // Add other basic fields
                formData.append(key, value.toString());
            }
        }

        // Handle additional info - filter out empty values
        if (!skipDetails) {
            console.log('adding additional info', additionalInfo);
            const filteredAdditionalInfo: Record<string, any> = {};
            let hasValidInfo = false;

            Object.entries(additionalInfo.value).forEach(([key, value]) => {
                if (value !== null && value !== '' && value !== undefined) {
                    filteredAdditionalInfo[key] = value;
                    hasValidInfo = true;
                }
            });

            // Only add additional_info if there are non-empty values
            if (hasValidInfo) {
                console.log('adding additional info');
                formData.append('additional_info', JSON.stringify(filteredAdditionalInfo));
            }
        }

        // Make API call
        await useApi().fetchPost<{
            success: boolean;
            message: string;
            data: any;
        }>('/ads', formData);
        console.log(formData);

        // Success - move to step 3
        currentStep.value = 3;
    } catch (error: any) {
        // Handle error
        const errorMessage = error?.data?.message || error?.message || 'An error occurred while creating the ad. Please try again.';
        submitError.value = errorMessage;
        console.error('Error creating ad:', error);
    } finally {
        isSubmitting.value = false;
    }
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
    // Reset attributes and additionalInfo
    subcategoryAttributes.value = [];
    additionalInfo.value = {};
    currentStep.value = 1
}
</script>
