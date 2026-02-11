<template>
    <div>
        <!-- Chat Button / Interface -->
        <div v-if="!isChatting">
            <button @click="startChat"
                class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clip-rule="evenodd"></path>
                </svg>
                Chat
            </button>
            <div v-if="showLoginMessage" class="mt-2 text-center text-sm text-red-600">
                Login to chat seller <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">
                    here</NuxtLink>
            </div>
        </div>

        <!-- Chat Input Area -->
        <div v-else class="space-y-3">
            <textarea v-model="chatMessage" rows="3"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Type your message..."></textarea>
            <div class="flex justify-end gap-2">
                <button @click="closeChat" class="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
                    Cancel
                </button>
                <button @click="sendMessage" :disabled="!chatMessage.trim() || isSendingMessage"
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <Icon v-if="isSendingMessage" name="svg-spinners:ring-resize" class="w-4 h-4" />
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    <span v-if="!isSendingMessage">Send</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi, useAuth } from '#imports';
import { toast } from 'vue-sonner';

const props = defineProps<{
    adId: string;
    receiverId: string;
    sellerId: string;
}>();

const { status, data: authData } = useAuth();
const isChatting = ref(false);
const chatMessage = ref('');
const isSendingMessage = ref(false);
const showLoginMessage = ref(false);

const startChat = () => {
    if (status.value !== 'authenticated') {
        showLoginMessage.value = true;
        return;
    }

    // Check if current user is the seller
    // Assuming authData.value contains the user object with an id property
    // We try to access it safely. If the structure is different (e.g. authData.value.user.id), handle that.
    const currentUserId = (authData.value as any)?.id || (authData.value as any)?.user?.id;

    if (currentUserId && String(currentUserId) === String(props.sellerId)) {
        toast.error('You cannot chat with yourself');
        return;
    }

    isChatting.value = true;
    showLoginMessage.value = false;
};

const closeChat = () => {
    isChatting.value = false;
    showLoginMessage.value = false;
};

const sendMessage = async () => {
    if (!chatMessage.value.trim()) return;

    isSendingMessage.value = true;
    try {
        const response = await useApi().fetchPost<{
            success: boolean;
            message: string;
            data: any;
        }>('/messages', {
            ad_id: props.adId,
            receiver_id: props.receiverId,
            message: chatMessage.value
        });

        if (response.success) {
            toast.success('Message sent successfully');
            chatMessage.value = '';
            isChatting.value = false;
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to send message');
    } finally {
        isSendingMessage.value = false;
    }
};
</script>
