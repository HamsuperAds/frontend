<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-2 md:px-4 py-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Sidebar - Conversations List -->
                <div class="lg:col-span-1 bg-white rounded-lg max-h-[calc(100vh-20px)] shadow overflow-hidden flex-col"
                    :class="selectedConversation ? 'hidden lg:flex' : 'flex'">
                    <div class="px-4 py-3 border-b">
                        <h2 class="text-lg font-semibold text-blue-600">My messages</h2>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scroll">
                        <!-- Skeleton Loader -->
                        <div v-if="isLoadingConversations" class="space-y-4 p-4">
                            <div v-for="i in 5" :key="i" class="flex gap-3">
                                <Skeleton class="h-12 w-12 rounded" />
                                <div class="space-y-2 flex-1">
                                    <Skeleton class="h-4 w-3/4" />
                                    <Skeleton class="h-4 w-1/2" />
                                </div>
                            </div>
                        </div>

                        <!-- Conversation List -->
                        <div v-else>
                            <div v-for="conversation in conversations"
                                :key="conversation.ad.id + conversation.other_user.id"
                                @click="selectConversation(conversation)"
                                class="flex items-start gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                                :class="{ 'bg-blue-50': selectedConversation?.ad?.id === conversation.ad.id && selectedConversation?.other_user?.id === conversation.other_user.id }">
                                <img :src="conversation.other_user?.avatar || '/images/placeholder-user.png'"
                                    :alt="conversation.other_user?.first_name"
                                    class="w-12 h-12 rounded object-cover shrink-0" />
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between mb-1">
                                        <h3 class="font-semibold text-gray-900 truncate">
                                            {{ conversation.other_user?.first_name }} {{
                                                conversation.other_user?.last_name }}
                                        </h3>
                                        <span class="text-xs text-gray-500 shrink-0 ml-2"
                                            v-if="conversation.latest_message">
                                            {{ formatDate(conversation.latest_message.created_at) }}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-900 font-medium truncate mb-0.5">{{
                                        conversation.ad.title }}</p>
                                    <p class="text-sm text-gray-500 truncate" v-if="conversation.latest_message">
                                        <span
                                            v-if="conversation.latest_message.sender_id === conversation.other_user.id">
                                            {{ conversation.latest_message.message }}
                                        </span>
                                        <span v-else>
                                            You: {{ conversation.latest_message.message }}
                                        </span>
                                    </p>
                                </div>
                                <div v-if="conversation.unread_count > 0"
                                    class="shrink-0 flex flex-col items-end justify-center self-center ml-2">
                                    <span class="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {{ conversation.unread_count }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Chat Area -->
                <div class="lg:col-span-2 bg-white rounded-lg shadow flex-col"
                    :class="!selectedConversation ? 'hidden lg:flex' : 'flex'">
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
                            <button @click="selectedConversation = null"
                                class="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                                <Icon name="heroicons-solid:chevron-left" />
                            </button>
                            <img :src="selectedConversation.other_user?.avatar || '/images/placeholder-user.png'"
                                :alt="selectedConversation.other_user?.first_name"
                                class="w-10 h-10 -ml-2 rounded object-cover" />
                            <div class="flex-1">
                                <h3 class="font-semibold text-gray-900">
                                    {{ selectedConversation.other_user?.first_name }} {{
                                        selectedConversation.other_user?.last_name }}
                                </h3>
                                <NuxtLink :to="`/ad-details?id=${selectedConversation.ad.id}`"
                                    class="flex items-center gap-2 text-sm hover:underline">
                                    <img :src="selectedConversation.ad.primary_image?.image_path || '/images/placeholder.png'"
                                        :alt="selectedConversation.ad.title" class="w-6 h-6 rounded object-cover" />
                                    <span class="text-gray-600 truncate max-w-[200px]">{{ selectedConversation.ad.title
                                        }}</span>
                                    <span class="text-blue-600 font-semibold">₦{{
                                        Number(selectedConversation.ad.price).toLocaleString() }}</span>
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Messages Area -->
                        <div ref="messagesContainer"
                            class="max-h-[70vh] custom-scroll flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            <!-- Loading Spinner -->
                            <div v-if="isLoadingMessages" class="flex justify-center py-4">
                                <Icon name="svg-spinners:ring-resize" class="w-8 h-8 text-blue-500" />
                            </div>

                            <template v-else>
                                <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
                                    No messages yet. Start the conversation!
                                </div>
                                <div v-for="(message, index) in messages" :key="message.id || index" class="flex"
                                    :class="message.sender_id === selectedConversation.other_user.id ? 'justify-start' : 'justify-end'">
                                    <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
                                        :class="message.sender_id === selectedConversation.other_user.id ? 'bg-gray-100 text-gray-900 rounded-tl-none' : 'bg-blue-500 text-white rounded-tr-none'">
                                        <p class="text-sm">{{ message.message }}</p>
                                        <span class="text-xs opacity-70 block mt-1"
                                            :class="message.sender_id === selectedConversation.other_user.id ? 'text-gray-500' : 'text-blue-100'">
                                            {{ formatDate(message.created_at) }}
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Message Input -->
                        <div class="p-4 border-t">
                            <div class="flex items-center gap-2">
                                <input v-model="newMessage" type="text" placeholder="write your message"
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    @keyup.enter="sendMessage" />
                                <button @click="sendMessage" :disabled="isSendingMessage"
                                    class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Icon v-if="isSendingMessage" name="svg-spinners:ring-resize" class="w-6 h-6" />
                                    <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { toast } from 'vue-sonner'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
import type { Conversation, ConversationResponse, ChatMessage, ChatResponse, SendMessageResponse } from '~/types/chat'

const selectedConversation = ref<Conversation | null>(null)
const conversations = ref<Conversation[]>([])
const isLoadingConversations = ref(true)
const isLoadingMessages = ref(false)
const messages = ref<ChatMessage[]>([])
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const { $getUser } = useNuxtApp();
const pollingInterval = ref<any>(null)

// Fetch conversations
const fetchConversations = async (isBackground = false) => {
    if (!isBackground) isLoadingConversations.value = true
    try {
        const response = await useApi().fetchGet<ConversationResponse>('/messages/conversations')
        if (response.success) {
            const newConversations = response.data

            // If polling, check if we need to update the selected conversation's messages
            if (isBackground && selectedConversation.value) {
                const updatedConv = newConversations.find(c =>
                    c.ad.id === selectedConversation.value?.ad.id &&
                    c.other_user.id === selectedConversation.value?.other_user.id
                )

                if (updatedConv) {
                    // Check if there's a new message
                    const currentLatestId = selectedConversation.value.latest_message?.id
                    const newLatestId = updatedConv.latest_message?.id

                    if (currentLatestId !== newLatestId) {
                        fetchMessages(selectedConversation.value, true)
                    }
                }
            }

            conversations.value = newConversations
        }
    } catch (error: any) {
        // Don't show toast on background polling errors to avoid spamming
        if (!isBackground) {
            toast.error(error?.data?.message || 'Failed to fetch conversations')
        }
    } finally {
        if (!isBackground) isLoadingConversations.value = false
    }
}

// Fetch messages for a conversation
const fetchMessages = async (conversation: Conversation, isBackground = false) => {
    if (!conversation.other_user?.id || !conversation.ad?.id) return

    if (!isBackground) isLoadingMessages.value = true
    try {
        const response = await useApi().fetchGet<ChatResponse>(`/messages/conversations/${conversation.ad.id}/${conversation.other_user.id}`)
        if (response.success) {
            messages.value = response.data
            setTimeout(() => {
                scrollToBottom()
            }, 49);
        }
    } catch (error: any) {
        if (!isBackground) {
            toast.error(error?.data?.message || 'Failed to fetch messages')
        }
    } finally {
        if (!isBackground) isLoadingMessages.value = false
    }
}

const selectConversation = async (conversation: Conversation) => {
    selectedConversation.value = conversation
    await fetchMessages(conversation)
}

const markMessagesAsRead = async () => {
    const conversation = selectedConversation.value
    if (!conversation || conversation.unread_count === 0) return

    const unreadMessageIds: (string | number)[] = []

    // efficient loop to find unread messages to be marked as read
    for (let i = messages.value.length - 1; i >= 0; i--) {
        const msg: ChatMessage = messages.value[i]!
        if (msg.receiver_id === $getUser()?.id && !msg.is_read) {
            unreadMessageIds.push(msg.id)
        }
        if (unreadMessageIds.length >= conversation.unread_count) {
            break
        }
    }

    if (unreadMessageIds.length === 0) return

    try {
        await useApi().fetchPost('/messages/bulk/read', {
            message_ids: unreadMessageIds
        })

        // Update local state
        messages.value.forEach(msg => {
            if (unreadMessageIds.includes(msg.id)) {
                // @ts-ignore
                msg.is_read = true
            }
        })

        // Update unread count in conversations list
        const convInList = conversations.value.find(c =>
            c.ad.id === conversation.ad.id &&
            c.other_user.id === conversation.other_user.id
        )

        if (convInList) {
            convInList.unread_count = 0
        }

        if (selectedConversation.value && selectedConversation.value.ad.id === conversation.ad.id) {
            selectedConversation.value.unread_count = 0
        }

    } catch (error) {
        console.error('Failed to mark messages as read', error)
    }
}

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
    markMessagesAsRead()
}

const isSendingMessage = ref(false)

const sendMessage = async () => {
    if (!newMessage.value.trim() || !selectedConversation.value) return

    isSendingMessage.value = true

    try {
        const payload = {
            ad_id: selectedConversation.value.ad.id,
            receiver_id: selectedConversation.value.other_user.id,
            message: newMessage.value.trim()
        }

        const response = await useApi().fetchPost<SendMessageResponse>('/messages', payload)

        if (response.success) {
            messages.value.push(response.data)
            newMessage.value = ''
            scrollToBottom()
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to send message')
    } finally {
        isSendingMessage.value = false
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(/\s/g, '')

    if (days === 0) {
        return time
    } else if (days === 1) {
        return `${time} Yesterday`
    } else {
        return `${time} ${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}`
    }
}

const startPolling = () => {
    pollingInterval.value = setInterval(() => {
        fetchConversations(true)
    }, 15000)
}

onMounted(() => {
    fetchConversations()
    startPolling()
})

onUnmounted(() => {
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
    }
})
</script>
