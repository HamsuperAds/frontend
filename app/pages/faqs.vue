<template>
    <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 class="text-xl font-semibold">Frequently Asked Questions</h2>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>

        <!-- Search -->
        <div class="p-6 border-b">
            <div class="relative max-w-md mx-auto">
                <input v-model="searchQuery" type="text" placeholder="Search feedback"
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- FAQ List -->
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Left Column -->
                <div class="space-y-2">
                    <div v-for="(faq, index) in leftColumnFaqs" :key="index" class="border border-gray-200 rounded-lg">
                        <button @click="toggleFaq(index)"
                            class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                            <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                            <svg class="w-5 h-5 text-gray-500 transition-transform"
                                :class="{ 'rotate-180': faq.isOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="faq.isOpen" class="px-4 pb-3 text-sm text-gray-600">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-2">
                    <div v-for="(faq, index) in rightColumnFaqs" :key="`right-${index}`"
                        class="border border-gray-200 rounded-lg">
                        <button @click="toggleRightFaq(index)"
                            class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                            <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                            <svg class="w-5 h-5 text-gray-500 transition-transform"
                                :class="{ 'rotate-180': faq.isOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="faq.isOpen" class="px-4 pb-3 text-sm text-gray-600">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')

const leftColumnFaqs = ref([
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        isOpen: true
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    }
])

const rightColumnFaqs = ref([
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    },
    {
        question: 'What does "ads limit" mean?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isOpen: false
    }
])

const toggleFaq = (index: number) => {
    if (leftColumnFaqs.value[index]) {
        leftColumnFaqs.value[index].isOpen = !leftColumnFaqs.value[index].isOpen
    }
}

const toggleRightFaq = (index: number) => {
    if (rightColumnFaqs.value[index]) {
        rightColumnFaqs.value[index].isOpen = !rightColumnFaqs.value[index].isOpen
    }
}
</script>
