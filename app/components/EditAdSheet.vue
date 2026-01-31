<template>
    <Sheet :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <SheetContent side="right" class="w-full sm:max-w-2xl overflow-y-auto custom-scroll">
            <SheetHeader>
                <SheetTitle>
                    <div class="flex items-center">
                        <Icon v-if="currentStep === 2" @click="currentStep--" name="heroicons:chevron-left"
                            class="w-6 h-6 mr-2 cursor-pointer" />
                        {{ currentStep === 1 ? 'Edit Ad' : 'Additional Info' }}
                    </div>
                </SheetTitle>
            </SheetHeader>

            <section class="p-4">
                <!-- Step 1: Main Form -->
                <div v-if="currentStep === 1" class="mt-6">
                    <form @submit.prevent="goToNextStep" class="space-y-4">
                        <!-- Title -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input v-model="editForm.title" type="text" placeholder="enter ad title"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                        </div>
                        <!-- Category and Subcategory -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select v-model="editForm.category_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required @change="editForm.subcategory_id = ''">
                                    <option value="">select category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                <select v-model="editForm.subcategory_id" :disabled="!editForm.category_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required>
                                    <option value="">select subcategory</option>
                                    <option v-for="sub in subcategories" :key="sub.id" :value="sub.id">
                                        {{ sub.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea v-model="editForm.description" placeholder="enter ad description" rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required></textarea>
                        </div>
                        <!-- State and LGA -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select v-model="editForm.state_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required @change="editForm.lga_id = ''">
                                    <option value="">select state</option>
                                    <option v-for="state in states" :key="state.id" :value="state.id">
                                        {{ state.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Local govt. area</label>
                                <select v-model="editForm.lga_id" :disabled="!editForm.state_id"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required>
                                    <option value="">select lga</option>
                                    <option v-for="lga in lgas" :key="lga.id" :value="lga.id">
                                        {{ lga.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- Place -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Place/town</label>
                            <input v-model="editForm.place" type="text" placeholder="enter place"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                        </div>
                        <!-- Photos -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                            <p class="text-xs text-gray-500 mb-2">Note: the first image will be used as the primary
                                image
                                for the ad</p>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <!-- Existing Images -->
                                <div v-for="(image, index) in existingImages" :key="'existing-' + image.id"
                                    class="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                    <img :src="image.image_path" :alt="'Image ' + (index + 1)"
                                        class="w-full h-full object-cover" />
                                    <button type="button" @click="removeExistingImage(index)"
                                        class="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full px-1 transition-colors">
                                        <Icon name="heroicons:x-mark" class="w-4 h-4 text-white" />
                                    </button>
                                    <span v-if="index === 0 && newImages.length === 0"
                                        class="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Primary</span>
                                </div>
                                <!-- New Images -->
                                <div v-for="(preview, index) in newImagePreviews" :key="'new-' + preview.id"
                                    class="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                    <img :src="preview.url" :alt="'New Image ' + (index + 1)"
                                        class="w-full h-full object-cover" />
                                    <button type="button" @click="removeNewImage(index)"
                                        class="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full px-1 transition-colors">
                                        <Icon name="heroicons:x-mark" class="w-4 h-4 text-white" />
                                    </button>
                                    <span v-if="index === 0 && existingImages.length === 0"
                                        class="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Primary</span>
                                </div>
                                <!-- Upload Button -->
                                <div
                                    class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer aspect-square flex flex-col items-center justify-center">
                                    <input type="file" multiple accept="image/*" class="hidden" id="edit-photo-upload"
                                        @change="handleImageSelect" />
                                    <label for="edit-photo-upload" class="cursor-pointer flex flex-col items-center">
                                        <Icon name="heroicons:photo" class="w-12 h-12 text-gray-400 mb-2" />
                                        <p class="text-gray-500 text-sm">Add photos</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Price -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <div class="flex items-center gap-4">
                                <input v-model="editForm.price" type="number" placeholder="enter price"
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required />
                                <label class="flex items-center">
                                    <input v-model="editForm.negotiable" type="checkbox" class="mr-2" />
                                    <span class="text-sm text-gray-700">Negotiable</span>
                                </label>
                            </div>
                        </div>
                        <!-- Promotion Plan (Read-only) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Promotion</label>
                            <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <p class="text-sm text-gray-700">
                                    <span class="font-medium">{{ ad?.promotionPlan?.name || 'Bronze' }}</span>
                                    <span class="text-gray-500 ml-2">(Use 'Promote Ad' action to change plan)</span>
                                </p>
                            </div>
                        </div>
                        <!-- Error Message -->
                        <div v-if="submitError"
                            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {{ submitError }}
                        </div>
                        <!-- Next Button -->
                        <div class="flex justify-end pt-4">
                            <Button type="submit"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                                Next
                                <Icon name="lucide:arrow-right" class="h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                </div>
                <!-- Step 2: Additional Info -->
                <div v-else-if="currentStep === 2" class="mt-6">
                    <div class="mb-6">
                        <p class="text-sm text-gray-700 mb-4">
                            Update additional details for your ad to increase buyer confidence.
                        </p>
                    </div>
                    <form @submit.prevent="submitEdit(false)" class="space-y-4">
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
                            <button type="button" @click="submitEdit(true)" :disabled="isSubmitting || !hasChanges"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <Icon v-if="isSubmitting && isSkipSubmit" name="svg-spinners:ring-resize"
                                    class="w-5 h-5" />
                                Skip & Update
                            </button>
                            <button type="submit" :disabled="isSubmitting || !hasChanges"
                                class="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <Icon v-if="isSubmitting && !isSkipSubmit" name="svg-spinners:ring-resize"
                                    class="w-5 h-5" />
                                Update Ad
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCategories } from '~/composables/useCategories';
import { useStates } from '~/composables/useStates';
import type { SubcategoryAttribute } from '~/types/subcategoryAttribute';
import { toast } from 'vue-sonner';

const props = defineProps<{
    isOpen: boolean
    ad: any | null
}>()

const emit = defineEmits<{
    'update:isOpen': [value: boolean]
    'success': [void]
}>()

const currentStep = ref(1)
const isSubmitting = ref(false)
const isSkipSubmit = ref(false)
const submitError = ref('')

const { categories, fetchCategories } = useCategories()
const { states, fetchStates } = useStates()

// Edit form state
const editForm = ref<Record<string, any>>({
    title: '',
    category_id: '',
    subcategory_id: '',
    description: '',
    state_id: '',
    lga_id: '',
    place: '',
    price: '',
    negotiable: false,
})

// Image handling
interface ImagePreview {
    id: string
    url: string
    file: File
}

const existingImages = ref<any[]>([])
const deletedImageIds = ref<string[]>([])
const newImages = ref<File[]>([])
const newImagePreviews = ref<ImagePreview[]>([])

// Subcategory attributes
const subcategoryAttributes = ref<SubcategoryAttribute[]>([])
const subcategoryAttributesLoading = ref(false)
const additionalInfo = ref<Record<string, any>>({})

// Original state for change detection
const originalForm = ref<Record<string, any>>({})
const originalAdditionalInfo = ref<Record<string, any>>({})

const hasChanges = computed(() => {
    const formChanged = JSON.stringify(editForm.value) !== JSON.stringify(originalForm.value)

    // Clean up empty values for comparison as they might differ in representation but mean the same
    // But for simplicity, direct comparison works if populate is consistent
    const infoChanged = JSON.stringify(additionalInfo.value) !== JSON.stringify(originalAdditionalInfo.value)

    const imagesChanged = deletedImageIds.value.length > 0 || newImages.value.length > 0

    return formChanged || infoChanged || imagesChanged
})

// Computed
const subcategories = computed(() => {
    if (!editForm.value.category_id) return []
    const category = categories.value.find(c => c.id === Number(editForm.value.category_id))
    return category ? category.subcategories : []
})

const lgas = computed(() => {
    if (!editForm.value.state_id) return []
    const state = states.value.find(s => s.id === Number(editForm.value.state_id))
    return state ? state.lgas : []
})

// Watch for ad changes to populate form
watch(() => props.ad, (newAd) => {
    if (newAd) {
        populateForm(newAd)
    }
}, { immediate: true })

// Watch for subcategory changes to fetch attributes
watch(() => editForm.value.subcategory_id, (newSubcategoryId) => {
    if (newSubcategoryId) {
        fetchSubcategoryAttributes(newSubcategoryId)
    }
})

const populateForm = (ad: any) => {
    editForm.value = {
        title: ad.title || '',
        category_id: ad.subcategory?.category_id || '',
        subcategory_id: ad.subcategory_id || '',
        description: ad.description || '',
        state_id: ad.state_id || '',
        lga_id: ad.lga_id || '',
        place: ad.place || '',
        price: ad.price || '',
        negotiable: ad.negotiable || false,
    }

    // Set existing images
    existingImages.value = ad.images ? [...ad.images] : []
    deletedImageIds.value = []
    newImages.value = []
    newImagePreviews.value = []

    // Set additional info if available
    if (ad.additional_info) {
        additionalInfo.value = { ...ad.additional_info }
    } else {
        additionalInfo.value = {}
    }

    // Set original state
    originalForm.value = JSON.parse(JSON.stringify(editForm.value))
    originalAdditionalInfo.value = JSON.parse(JSON.stringify(additionalInfo.value))

    // Reset step
    currentStep.value = 1
    submitError.value = ''
}

const handleImageSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    const files = Array.from(input.files)
    files.forEach((file) => {
        const preview: ImagePreview = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: URL.createObjectURL(file),
            file: file,
        }
        newImagePreviews.value.push(preview)
        newImages.value.push(file)
    })

    // Reset input
    input.value = ''
}

const removeExistingImage = (index: number) => {
    const image = existingImages.value[index]
    if (image && image.id) {
        deletedImageIds.value.push(image.id)
    }
    existingImages.value.splice(index, 1)
}

const removeNewImage = (index: number) => {
    const preview = newImagePreviews.value[index]
    if (preview) {
        URL.revokeObjectURL(preview.url)
    }
    newImagePreviews.value.splice(index, 1)
    newImages.value.splice(index, 1)
}

const fetchSubcategoryAttributes = async (subcategoryId: string | number) => {
    if (!subcategoryId) {
        subcategoryAttributes.value = []
        return
    }

    subcategoryAttributesLoading.value = true
    try {
        const { data } = await useApi().fetchGet<{
            success: boolean
            data: SubcategoryAttribute[]
        }>(`/subcategories/${subcategoryId}/attributes`, {
            requiresAuth: false
        })
        if (data) {
            subcategoryAttributes.value = data
            // Preserve existing additional_info values or initialize empty
            const newAdditionalInfo: Record<string, any> = {}
            data.forEach((attr) => {
                newAdditionalInfo[attr.slug] = additionalInfo.value[attr.slug] || ''
            })
            additionalInfo.value = newAdditionalInfo

            // Update original additional info structure if it was empty/different
            // We need to re-sync originalAdditionalInfo if we loaded new structure so we don't count structure change as user change
            // BUT, only if we are just loading for the first time or if the values haven't been touched yet.
            // Actually, populateForm sets originalAdditionalInfo.
            // If user changes subcategory, attributes change, that IS a change.
            // If we are just loading attributes for the existing subcategory on mount/watch, 
            // the populateForm might have run before attributes loaded.

            if (JSON.stringify(originalAdditionalInfo.value) === '{}' && Object.keys(newAdditionalInfo).length > 0) {
                // First load for existing ad, sync original if keys match values in editForm?
                // Wait, populateForm sets additionalInfo from ad.additional_info.
                // If ad.additional_info was partial, we just filled the rest with ''.
                // logic: re-sync original if we just hydrated it. 

                // Simpler approach: update originalAdditionalInfo to match the hydrated structure 
                // respecting the values from ad.additional_info
                originalAdditionalInfo.value = JSON.parse(JSON.stringify(newAdditionalInfo))
            }
        }
    } catch (err) {
        console.error('Error fetching subcategory attributes:', err)
    } finally {
        subcategoryAttributesLoading.value = false
    }
}

const goToNextStep = () => {
    currentStep.value = 2
}

const submitEdit = async (skipDetails = false) => {
    submitError.value = ''
    isSubmitting.value = true
    if (skipDetails) {
        isSkipSubmit.value = true
    } else {
        isSkipSubmit.value = false
    }

    try {
        // Build FormData
        const formData = new FormData()
        formData.append('_method', 'PUT')

        // Add form fields
        for (const key in editForm.value) {
            const value = editForm.value[key]
            if (key === 'negotiable') {
                formData.append(key, value ? '1' : '0')
            } else if (value !== null && value !== undefined && value !== '') {
                formData.append(key, value.toString())
            }
        }

        // Add deleted image IDs
        if (deletedImageIds.value.length > 0) {
            deletedImageIds.value.forEach((id, index) => {
                formData.append(`deleted_images[${index}]`, id)
            })
        }

        // Add new images
        if (newImages.value.length > 0) {
            newImages.value.forEach((image, index) => {
                formData.append(`images[${index}]`, image)
            })
        }

        // Add additional info
        if (!skipDetails && subcategoryAttributes.value.length > 0) {
            const filteredAdditionalInfo: Record<string, any> = {}
            let hasValidInfo = false

            Object.entries(additionalInfo.value).forEach(([key, value]) => {
                if (value !== null && value !== '' && value !== undefined) {
                    filteredAdditionalInfo[key] = value
                    hasValidInfo = true
                }
            })

            if (hasValidInfo) {
                formData.append('additional_info', JSON.stringify(filteredAdditionalInfo))
            }
        }

        // Make API call
        const response = await useApi().fetchPost<{
            success: boolean
            message: string
            data: any
        }>(`/ads/${props.ad.id}`, formData)

        toast.success(response.message || 'Ad updated successfully!')

        // Close sheet after short delay
        setTimeout(() => {
            emit('success')
            emit('update:isOpen', false)
        }, 1000)

    } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'An error occurred while updating the ad'
        submitError.value = errorMessage
        toast.error(errorMessage)
        console.error('Error updating ad:', error)
    } finally {
        isSubmitting.value = false
    }
}

// Fetch data on mount
onMounted(async () => {
    await Promise.all([
        fetchCategories(),
        fetchStates()
    ])
})

// Clean up object URLs when sheet closes
watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        // Clean up new image previews
        newImagePreviews.value.forEach((preview) => {
            URL.revokeObjectURL(preview.url)
        })
    }
})
</script>
