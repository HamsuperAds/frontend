<template>
    <div v-if="lastPage > 1" class="flex justify-center items-center gap-4 mt-8">
        <button @click="$emit('page-change', currentPage - 1)" :disabled="!hasPrev"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="hasPrev
                ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'">
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
            Previous
        </button>

        <span class="text-sm text-gray-600">
            Page {{ currentPage }} of {{ lastPage }}
        </span>

        <button @click="$emit('page-change', currentPage + 1)" :disabled="!hasNext"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors" :class="hasNext
                ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'">
            Next
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    currentPage: number;
    lastPage: number;
    hasPrev: boolean;
    hasNext: boolean;
}>();

defineEmits<{
    (e: 'page-change', page: number): void;
}>();
</script>
