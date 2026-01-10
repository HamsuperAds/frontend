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
                    <Switch :checked="form.ad_created === '1'"
                        @update:checked="(val) => form.ad_created = val ? '1' : '0'" />
                </div>

                <!-- Transaction Status Changed -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">Transaction Status</h3>
                        <p class="text-sm text-gray-500">Get notified when a transaction status updates.</p>
                    </div>
                    <Switch :checked="form.transaction_status_changed === '1'"
                        @update:checked="(val) => form.transaction_status_changed = val ? '1' : '0'" />
                </div>

                <!-- Password Changed -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">Password Changed</h3>
                        <p class="text-sm text-gray-500">Receive an alert when your password is changed.</p>
                    </div>
                    <Switch :checked="form.password_changed === '1'"
                        @update:checked="(val) => form.password_changed = val ? '1' : '0'" />
                </div>

                <!-- New Message Received -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">New Messages</h3>
                        <p class="text-sm text-gray-500">Get notified when you receive a new message.</p>
                    </div>
                    <Switch :checked="form.new_message_received === '1'"
                        @update:checked="(val) => form.new_message_received = val ? '1' : '0'" />
                </div>

                <!-- New Feedback Received -->
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">New Feedback</h3>
                        <p class="text-sm text-gray-500">Get notified when you receive new feedback.</p>
                    </div>
                    <Switch :checked="form.new_feedback_received === '1'"
                        @update:checked="(val) => form.new_feedback_received = val ? '1' : '0'" />
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-6 border-t flex justify-end">
                <Button @click="savePreferences" :disabled="isSaving" class="px-8 bg-blue-600 hover:bg-blue-700">
                    <Icon v-if="isSaving" name="svg-spinners:ring-resize" class="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

onMounted(() => {
    if (user?.notification_pref) {
        try {
            // Parse existing preferences if they are stored as JSON string on user object
            // Adjust this logic if the backend format is different
            const prefs = typeof user.notification_pref === 'string'
                ? JSON.parse(user.notification_pref)
                : user.notification_pref

            form.value = { ...form.value, ...configToForm(prefs) }
        } catch (e) {
            console.error('Error parsing notification preferences:', e)
        }
    }
})

// Helper to ensure we stick to '1'/'0' string format
const configToForm = (prefs: any) => {
    const newForm: Record<string, string> = {}
    Object.keys(form.value).forEach(key => {
        if (prefs[key] !== undefined) {
            // Handle boolean or string inputs from backend
            const val = prefs[key]
            if (val === true || val === '1' || val === 1) newForm[key] = '1'
            else newForm[key] = '0'
        }
    })
    return newForm
}

const savePreferences = async () => {
    isSaving.value = true
    try {
        // Assuming endpoint is '/account/notification-preferences' or similar
        // Since user provided a snapshot of keys, we send them as a flat object
        const response = await useApi().fetchPost('/account/notification-preferences', form.value)

        toast.success('Notification preferences updated successfully')
    } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to update preferences')
    } finally {
        isSaving.value = false
    }
}
</script>
