<template>
    <Sheet :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <SheetContent side="right" class="w-full sm:max-w-md flex flex-col p-0 h-screen overflow-hidden">
            <SheetHeader class="p-6 border-b">
                <div class="flex items-center justify-between mt-2">
                    <SheetTitle class="text-xl font-bold">Notifications</SheetTitle>
                    <span v-if="unreadCount > 0" class="text-sm font-medium text-gray-500">
                        Unread ({{ unreadCount }})
                    </span>
                </div>
            </SheetHeader>

            <!-- Loading State -->
            <div v-if="loading && !notifications.length" class="flex-1 flex items-center justify-center">
                <Icon name="svg-spinners:ring-resize" class="w-8 h-8 text-blue-600" />
            </div>

            <!-- Empty State -->
            <div v-else-if="!notifications.length"
                class="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div class="bg-gray-100 p-4 rounded-full mb-4">
                    <Icon name="heroicons:bell" class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-900">No notifications yet</h3>
                <p class="text-gray-500 mt-1 text-sm">We'll notify you when something important happens.</p>
            </div>

            <!-- Notifications List -->
            <div v-else class="flex-1 overflow-y-auto px-4 py-2 custom-scroll">
                <div class="space-y-3">
                    <div v-for="notification in notifications" :key="notification.id"
                        class="p-4 rounded-xl border transition-all cursor-pointer group hover:bg-gray-50 bg-white"
                        :class="[notification.read_at ? 'border-gray-100' : 'border-blue-100 bg-blue-50/30']"
                        @click="handleNotificationClick(notification)">

                        <div class="flex gap-3">
                            <div class="mt-1">
                                <span v-if="!notification.read_at"
                                    class="block w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                                <span v-else class="block w-2.5 h-2.5 bg-gray-200 rounded-full"></span>
                            </div>

                            <div class="flex-1">
                                <p class="text-sm text-gray-900 leading-relaxed">{{ notification.data.message }}</p>
                                <p class="text-xs text-gray-500 mt-1 capitalize">{{ formatTime(notification.created_at)
                                    }}</p>

                                <!-- Action Buttons -->
                                <div class="flex items-center gap-4 mt-3" @click.stop>
                                    <button v-if="!notification.read_at" @click="markAsRead(notification)"
                                        class="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 min-w-[70px]"
                                        :disabled="processingId === notification.id">
                                        <Icon v-if="processingId === notification.id" name="svg-spinners:ring-resize"
                                            class="w-3 h-3" />
                                        <template v-else>Mark as read</template>
                                    </button>
                                    <button @click="deleteNotification(notification)"
                                        class="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 min-w-[40px]"
                                        :disabled="processingId === notification.id">
                                        <Icon v-if="processingId === notification.id" name="svg-spinners:ring-resize"
                                            class="w-3 h-3" />
                                        <template v-else>Delete</template>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex items-center justify-between py-6">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || loading"
                        class="px-4 py-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                        <Icon v-if="loading && paginationDirection === 'prev'" name="svg-spinners:ring-resize"
                            class="w-3 h-3" />
                        Previous
                    </button>
                    <span class="text-xs text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages || loading"
                        class="px-4 py-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                        Next
                        <Icon v-if="loading && paginationDirection === 'next'" name="svg-spinners:ring-resize"
                            class="w-3 h-3" />
                    </button>
                </div>
            </div>

            <!-- Footer Actions -->
            <SheetFooter v-if="notifications.length" class="p-6 border-t flex flex-row gap-3 mt-auto">
                <button @click="markAllAsRead" :disabled="bulkProcessing || unreadCount === 0"
                    class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Icon v-if="bulkProcessing === 'read-all'" name="svg-spinners:ring-resize" class="w-4 h-4" />
                    Mark all as read
                </button>
                <button @click="deleteAllRead" :disabled="bulkProcessing || !hasReadNotifications"
                    class="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Icon v-if="bulkProcessing === 'delete-read'" name="svg-spinners:ring-resize" class="w-4 h-4" />
                    Delete all read
                </button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import type { Notification, NotificationResponse } from '~/types/notification'

const props = defineProps<{
    isOpen: boolean
    unreadCount: number
}>()

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void
    (e: 'refreshCount'): void
}>()

const notifications = ref<Notification[]>([])
const loading = ref(false)
const processingId = ref<string | null>(null)
const bulkProcessing = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const paginationDirection = ref<'prev' | 'next' | null>(null)

const hasReadNotifications = computed(() => notifications.value.some(n => n.read_at !== null))

const fetchNotifications = async (page = 1) => {
    loading.value = true
    try {
        const response = await useApi().fetchGet<NotificationResponse>(`/notifications?page=${page}`)
        if (response.success) {
            notifications.value = response.data.data
            currentPage.value = response.data.current_page
            totalPages.value = response.data.last_page
        }
    } catch (error: any) {
        console.error('Error fetching notifications:', error)
    } finally {
        loading.value = false
        paginationDirection.value = null
    }
}

const handleNotificationClick = async (notification: Notification) => {
    // Navigate first
    const dataType = notification.data.type
    let path = ''

    if (dataType === 'transaction_status_changed') {
        path = '/account/transactions'
    } else if (dataType === 'ad_created') {
        path = '/account/my-adverts'
    }

    if (path) {
        emit('update:isOpen', false)
        await navigateTo(path)
    }

    // Mark as read if unread
    if (!notification.read_at) {
        await markAsRead(notification, true)
    }
}

const markAsRead = async (notification: Notification, silent = false) => {
    if (notification.read_at) return

    if (!silent) processingId.value = notification.id
    try {
        const response = await useApi().fetchPost<{ success: boolean }>(`/notifications/${notification.id}/read`)
        if (response.success) {
            notification.read_at = new Date().toISOString()
            emit('refreshCount')
        }
    } catch (error) {
        if (!silent) toast.error('Failed to mark notification as read')
    } finally {
        if (!silent) processingId.value = null
    }
}

const deleteNotification = async (notification: Notification) => {
    processingId.value = notification.id
    try {
        const response = await useApi().fetchDelete<{ success: boolean }>(`/notifications/${notification.id}`)
        if (response.success) {
            notifications.value = notifications.value.filter(n => n.id !== notification.id)
            toast.success('Notification deleted')
            emit('refreshCount')
            if (notifications.value.length === 0 && currentPage.value > 1) {
                fetchNotifications(currentPage.value - 1)
            }
        }
    } catch (error) {
        toast.error('Failed to delete notification')
    } finally {
        processingId.value = null
    }
}

const markAllAsRead = async () => {
    bulkProcessing.value = 'read-all'
    try {
        const response = await useApi().fetchPost<{ success: boolean }>('/notifications/read-all')
        if (response.success) {
            notifications.value.forEach(n => n.read_at = n.read_at || new Date().toISOString())
            emit('refreshCount')
            toast.success('All notifications marked as read')
        }
    } catch (error) {
        toast.error('Failed to mark all as read')
    } finally {
        bulkProcessing.value = null
    }
}

const deleteAllRead = async () => {
    bulkProcessing.value = 'delete-read'
    try {
        const response = await useApi().fetchDelete<{ success: boolean }>('/notifications/read/all')
        if (response.success) {
            notifications.value = notifications.value.filter(n => !n.read_at)
            emit('refreshCount')
            toast.success('Read notifications deleted')
            if (notifications.value.length === 0) fetchNotifications(1)
        }
    } catch (error) {
        toast.error('Failed to delete read notifications')
    } finally {
        bulkProcessing.value = null
    }
}

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    paginationDirection.value = page < currentPage.value ? 'prev' : 'next'
    fetchNotifications(page)
}

const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        fetchNotifications(1)
    }
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
    width: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
</style>
