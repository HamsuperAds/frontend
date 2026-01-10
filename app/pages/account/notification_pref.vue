<template>
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-900">Notification Preferences</h2>
            <p class="text-sm text-gray-500 mt-1">Manage what notifications you want to receive.</p>
        </div>

        <div class="p-6 space-y-6">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-8">
                <Icon name="svg-spinners:ring-resize" class="w-8 h-8 mx-auto text-blue-500" />
            </div>

            <div v-else class="space-y-6">
                <!-- Ad Created -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">Ad Created</h3>
                        <p class="text-sm text-gray-500">Receive alerts when your ad is successfully created.</p>
                    </div>
                    <Switch :model-value="form.ad_created === '1'"
                        @update:model-value="(val) => form.ad_created = val ? '1' : '0'" />
                </div>

                <!-- Transaction Status Changed -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">Transaction Status</h3>
                        <p class="text-sm text-gray-500">Get notified when a transaction status updates.</p>
                    </div>
                    <Switch :model-value="form.transaction_status_changed === '1'"
                        @update:model-value="(val) => form.transaction_status_changed = val ? '1' : '0'" />
                </div>

                <!-- Password Changed -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">Password Changed</h3>
                        <p class="text-sm text-gray-500">Receive an alert when your password is changed.</p>
                    </div>
                    <Switch :model-value="form.password_changed === '1'"
                        @update:model-value="(val) => form.password_changed = val ? '1' : '0'" />
                </div>

                <!-- New Message Received -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">New Messages</h3>
                        <p class="text-sm text-gray-500">Get notified when you receive a new message.</p>
                    </div>
                    <Switch :model-value="form.new_message_received === '1'"
                        @update:model-value="(val) => form.new_message_received = val ? '1' : '0'" />
                </div>

                <!-- New Feedback Received -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">New Feedback</h3>
                        <p class="text-sm text-gray-500">Get notified when you receive new feedback.</p>
                    </div>
                    <Switch :model-value="form.new_feedback_received === '1'"
                        @update:model-value="(val) => form.new_feedback_received = val ? '1' : '0'" />
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-6 border-t flex justify-end">
                <Button @click="savePreferences" :disabled="isSaving || !hasChanges"
                    class="px-8 bg-blue-600 hover:bg-blue-700">
                    <Icon v-if="isSaving" name="svg-spinners:ring-resize" class="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue-sonner'
import Switch from '@/components/ui/switch/Switch.vue'
import Button from '@/components/ui/button/Button.vue'

definePageMeta({
    layout: 'profile'
})

const { $getUser } = useNuxtApp()
const user = $getUser()
const isLoading = ref(false)
const isSaving = ref(false)

const form = ref<Record<string, string>>({
    ad_created: '1',
    transaction_status_changed: '1',
    password_changed: '1',
    new_message_received: '1',
    new_feedback_received: '0'
})

const initialForm = ref<Record<string, string>>({})

onMounted(() => {
    if (user?.notification_preference) {
        const prefs = user.notification_preference
        const mappedPrefs = {
            ad_created: prefs.ad_created ? '1' : '0',
            transaction_status_changed: prefs.transaction_status_changed ? '1' : '0',
            password_changed: prefs.password_changed ? '1' : '0',
            new_message_received: prefs.new_message_received ? '1' : '0',
            new_feedback_received: prefs.new_feedback_received ? '1' : '0'
        }
        form.value = { ...mappedPrefs }
        initialForm.value = { ...mappedPrefs }
    }
})

const hasChanges = computed(() => {
    return JSON.stringify(form.value) !== JSON.stringify(initialForm.value)
})

const savePreferences = async () => {
    isSaving.value = true
    try {
        const payload = {
            ...form.value,
            _method: 'PUT'
        }
        await useApi().fetchPost('/notification-preferences', payload)

        // Update initial form state after successful save
        initialForm.value = { ...form.value }

        toast.success('Notification preferences updated successfully')
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to update preferences')
    } finally {
        isSaving.value = false
    }
}
</script>
