<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between mt-8">
            <h2 class="text-xl font-semibold">Frequently Asked Questions</h2>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 0C3.64615 0 0 3.12615 0 7.07692C0 8.94154 0.836308 10.6142 2.15385 11.8652C1.99365 12.2839 1.76626 12.6736 1.48062 13.0191C1.10203 13.4783 0.683803 13.9033 0.230769 14.2892C0.131395 14.369 0.0592145 14.4776 0.0241901 14.6001C-0.0108342 14.7226 -0.00697617 14.8529 0.0352319 14.9731C0.0774399 15.0933 0.155917 15.1975 0.259833 15.2712C0.363749 15.3449 0.487981 15.3845 0.615385 15.3846C1.97846 15.3846 2.95877 15.3692 3.84615 15.1348C4.64 14.9243 5.32246 14.4837 6.01908 13.8652C6.65292 14.0172 7.30708 14.1538 8 14.1538C12.3538 14.1538 16 11.0277 16 7.07692C16 3.12615 12.3538 0 8 0ZM8 1.23077C11.7692 1.23077 14.7692 3.88923 14.7692 7.07692C14.7692 10.2646 11.7692 12.9231 8 12.9231C7.32985 12.9231 6.63385 12.8074 6 12.6345C5.89864 12.609 5.79246 12.6097 5.69146 12.6366C5.59047 12.6636 5.498 12.7158 5.42277 12.7883C4.73046 13.4523 4.22031 13.7618 3.53846 13.9422C3.22462 14.0252 2.61908 14.0055 2.192 14.0388C2.27815 13.9415 2.35877 13.8898 2.44246 13.7883C2.92615 13.1975 3.36738 12.5729 3.50031 11.8652C3.51862 11.759 3.5087 11.6498 3.47155 11.5486C3.4344 11.4474 3.37131 11.3578 3.28862 11.2886C1.99938 10.224 1.23077 8.73169 1.23077 7.07692C1.23077 3.88923 4.23077 1.23077 8 1.23077ZM6.82708 3.63446C6.71876 3.65877 6.61903 3.71193 6.53846 3.78831L5.61539 4.65415L6.44246 5.55754L7.17292 4.86523H8.65354L9.23077 5.52V6.424L7.65354 7.48123C7.56923 7.53864 7.50052 7.61611 7.45358 7.70666C7.40664 7.79721 7.38294 7.89802 7.38462 8V9.23077H8.61539V8.34585L10.1926 7.28862C10.277 7.23115 10.3458 7.15358 10.3927 7.06291C10.4397 6.97224 10.4633 6.87132 10.4615 6.76923V5.28862C10.4607 5.13988 10.4061 4.99647 10.3077 4.88492L9.38462 3.84615C9.32717 3.78006 9.25629 3.72699 9.1767 3.69049C9.09711 3.65398 9.01064 3.63488 8.92308 3.63446H6.96123C6.91665 3.62957 6.87166 3.62957 6.82708 3.63446ZM7.38462 9.84615V11.0769H8.61539V9.84615H7.38462Z"
                    fill="#F4F4F9" />
            </svg>
        </div>

        <!-- Search -->
        <div class="p-6 border-b">
            <div class="relative max-w-md mx-auto">
                <input v-model="searchQuery" type="text" placeholder="Search faqs..."
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <button v-if="searchQuery" @click="searchQuery = ''"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
                <button v-else class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
            <div v-if="searchQuery" class="text-center mt-2 text-sm text-gray-600">
                {{ filteredFaqs.length }} FAQs found
            </div>
        </div>

        <!-- FAQ List -->
        <div class="p-6">
            <div v-if="loading" class="space-y-4 animate-pulse">
                <div v-for="i in 6" :key="i" class="h-12 bg-gray-100 rounded-lg"></div>
            </div>

            <div v-else-if="filteredFaqs.length === 0" class="text-center py-8 text-gray-500">
                No FAQs found matching your search.
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Left Column -->
                <div class="space-y-2">
                    <div v-for="(faq, index) in leftColumnFaqs" :key="faq.id" class="border border-gray-200 rounded-lg">
                        <button @click="toggleFaq(faq.id)"
                            class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                            <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                            <svg class="w-5 h-5 text-gray-500 transition-transform"
                                :class="{ 'rotate-180': faq.isOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="faq.isOpen" class="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-2">
                    <div v-for="(faq, index) in rightColumnFaqs" :key="faq.id"
                        class="border border-gray-200 rounded-lg">
                        <button @click="toggleFaq(faq.id)"
                            class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                            <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                            <svg class="w-5 h-5 text-gray-500 transition-transform"
                                :class="{ 'rotate-180': faq.isOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="faq.isOpen" class="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '#imports';
import type { Faq } from '~/types';

definePageMeta({
    auth: false,
});

// Start with empty state
interface FaqWithState extends Faq {
    isOpen: boolean;
}

const searchQuery = ref('');
const faqs = ref<FaqWithState[]>([]);
const loading = ref(true);

const fetchFaqs = async () => {
    loading.value = true;
    try {
        const response = await useApi().fetchGet<{ success: boolean, data: Faq[] }>('/faqs', {
            requiresAuth: false // Assuming faqs are public
        });

        if (response && response.success) {
            faqs.value = response.data.map((faq, index) => ({
                ...faq,
                isOpen: index === 0 // Open first one by default, or all closed
            }));
        }
    } catch (error) {
        console.error('Error fetching FAQs:', error);
    } finally {
        loading.value = false;
    }
}

// Filter FAQs based on search query
const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqs.value;

    const query = searchQuery.value.toLowerCase();
    return faqs.value.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
});

// split into two columns
const leftColumnFaqs = computed(() => {
    return filteredFaqs.value.filter((_, index) => index % 2 === 0);
});

const rightColumnFaqs = computed(() => {
    return filteredFaqs.value.filter((_, index) => index % 2 !== 0);
});

const toggleFaq = (id: number) => {
    const faq = faqs.value.find(f => f.id === id);
    if (faq) {
        faq.isOpen = !faq.isOpen;
    }
}

onMounted(() => {
    fetchFaqs();
});
</script>
