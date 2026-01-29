<template>
    <div class="space-y-3">
        <!-- Upload Area -->
        <div class="relative">
            <input ref="fileInput" type="file" :accept="accept" @change="handleFileChange"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

            <div class="border-2 border-dashed rounded-lg p-6 text-center transition-colors" :class="[
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
                error ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
            ]" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop">

                <Icon name="heroicons:cloud-arrow-up" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p class="text-sm text-gray-600 mb-2">{{ placeholder }}</p>
                <p class="text-xs text-gray-500">Drag and drop or click to browse</p>
            </div>
        </div>

        <!-- Preview -->
        <div v-if="preview" class="relative">
            <img :src="preview" alt="Preview" class="w-full h-48 object-cover rounded-lg border border-gray-200" />
            <button type="button" @click="removeFile"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>

        <!-- File Info -->
        <div v-if="selectedFile" class="text-xs text-gray-500">
            {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    accept?: string
    maxSize?: number
    placeholder?: string
    preview?: string | null
    error?: string
}>()

const emit = defineEmits<{
    'file-selected': [file: File | null]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const selectedFile = ref<File | null>(null)

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] || null
    processFile(file)
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const file = event.dataTransfer?.files[0] || null
    processFile(file)
}

const processFile = (file: File | null) => {
    selectedFile.value = file
    emit('file-selected', file)
}

const removeFile = () => {
    selectedFile.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
    emit('file-selected', null)
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>