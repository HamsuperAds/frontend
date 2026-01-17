<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                <!-- Left Sidebar - Conversations List -->
                <div class="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
                    <div class="px-4 py-3 border-b">
                        <h2 class="text-lg font-semibold text-blue-600">My messages</h2>
                    </div>

                    <div class="flex-1 overflow-y-auto">
                        <div v-for="conversation in conversations" :key="conversation.id"
                            @click="selectConversation(conversation)"
                            class="flex items-start gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                            :class="{ 'bg-blue-50': selectedConversation?.id === conversation.id }">
                            <img :src="conversation.image" :alt="conversation.name"
                                class="w-12 h-12 rounded object-cover flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between mb-1">
                                    <h3 class="font-semibold text-gray-900 truncate">{{ conversation.name }}</h3>
                                    <span class="text-xs text-gray-500 flex-shrink-0 ml-2">{{ conversation.date
                                    }}</span>
                                </div>
                                <p class="text-sm text-gray-600 truncate">{{ conversation.adTitle }}</p>
                                <p class="text-sm text-gray-500 truncate">{{ conversation.lastMessage }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Chat Area -->
                <div class="lg:col-span-2 bg-white rounded-lg shadow flex flex-col">
                    <!-- No Conversation Selected -->
                    <div v-if="!selectedConversation"
                        class="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg>
                        <p class="text-lg">Select a chat to see messages</p>
                    </div>

                    <!-- Conversation Selected -->
                    <template v-else>
                        <!-- Chat Header -->
                        <div class="p-4 border-b flex items-center gap-3">
                            <img :src="selectedConversation.image" :alt="selectedConversation.name"
                                class="w-10 h-10 rounded object-cover" />
                            <div class="flex-1">
                                <h3 class="font-semibold text-gray-900">{{ selectedConversation.name }}</h3>
                                <div class="flex items-center gap-2 text-sm">
                                    <img :src="selectedConversation.adImage" :alt="selectedConversation.adTitle"
                                        class="w-6 h-6 rounded object-cover" />
                                    <span class="text-gray-600">{{ selectedConversation.adTitle }}</span>
                                    <span class="text-blue-600 font-semibold">{{ selectedConversation.adPrice }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Messages Area -->
                        <div class="flex-1 overflow-y-auto p-4 space-y-4">
                            <div v-for="(message, index) in selectedConversation.messages" :key="index" class="flex"
                                :class="message.sent ? 'justify-end' : 'justify-start'">
                                <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
                                    :class="message.sent ? 'bg-gray-200 text-gray-900' : 'bg-gray-200 text-gray-900'">
                                    <p class="text-sm">{{ message.text }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Message Input -->
                        <div class="p-4 border-t">
                            <div class="flex items-center gap-2">
                                <input v-model="newMessage" type="text" placeholder="write your message"
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    @keyup.enter="sendMessage" />
                                <button @click="sendMessage"
                                    class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const selectedConversation = ref<any>(null)
const newMessage = ref('')

const conversations = ref([
    {
        id: 1,
        name: 'Evo Tech Ltd',
        adTitle: 'Qlinq Motorcycle 2024 Black',
        lastMessage: 'What is the last price?',
        date: '16 Aug',
        image: '/images/temp/electric-motorcycles.png',
        adImage: '/images/temp/electric-motorcycles.png',
        adPrice: '₦1,645,845',
        messages: [
            { text: 'What is the last price?', sent: false },
            { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', sent: true },
            { text: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', sent: true }
        ]
    },
    {
        id: 2,
        name: 'Gid Solar Ent.',
        adTitle: '550watts solar panel',
        lastMessage: 'There is discount for bulk ...',
        date: '16 Aug',
        image: '/images/temp/electric-motorcycles1.png',
        adImage: '/images/temp/electric-motorcycles1.png',
        adPrice: '₦45,000',
        messages: [
            { text: 'Is there a discount for bulk purchase?', sent: false },
            { text: 'Yes, we offer discounts for bulk orders', sent: true }
        ]
    },
    {
        id: 3,
        name: 'Solid Properties',
        adTitle: '2 Bedroom flat for rent',
        lastMessage: 'How much is agency fee?',
        date: '16 Aug',
        image: '/images/temp/electric-motorcycles2.png',
        adImage: '/images/temp/electric-motorcycles2.png',
        adPrice: '₦500,000',
        messages: [
            { text: 'How much is the agency fee?', sent: false }
        ]
    },
    {
        id: 4,
        name: 'Evo Tech Ltd',
        adTitle: 'Qlinq Motorcycle 2024 Black',
        lastMessage: 'What is the last price?',
        date: '16 Aug',
        image: '/images/temp/electric-motorcycles3.png',
        adImage: '/images/temp/electric-motorcycles3.png',
        adPrice: '₦1,645,845',
        messages: [
            { text: 'What is the last price?', sent: false }
        ]
    }
])

const selectConversation = (conversation: any) => {
    selectedConversation.value = conversation
}

const sendMessage = () => {
    if (newMessage.value.trim() && selectedConversation.value) {
        selectedConversation.value.messages.push({
            text: newMessage.value,
            sent: true
        })
        newMessage.value = ''
    }
}
</script>
