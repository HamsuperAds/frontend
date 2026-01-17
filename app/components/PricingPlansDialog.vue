<template>
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="$emit('update:modelValue', false)">
        <div class="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div class="p-8">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Pricing Plans</h2>
                    <button @click="$emit('update:modelValue', false)" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="plan in plans" :key="plan.id" class="border-2 rounded-lg overflow-hidden"
                        :style="{ borderColor: plan.color }">
                        <div class="text-white px-6 py-4 flex items-center justify-between"
                            :style="{ backgroundColor: plan.color }">
                            <h3 class="text-xl font-bold">{{ plan.name }}</h3>
                            <img :src="plan.icon" :alt="plan.name" class="w-6 h-6" />
                        </div>
                        <div class="p-6 space-y-4">
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="text-gray-700">On-top</span>
                                <span class="font-semibold" :style="{ color: plan.color }">{{
                                    formatDuration(plan.on_top_duration_hours) }}</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="text-gray-700">Auto Renew</span>
                                <span class="font-semibold"
                                    :class="plan.auto_renew_interval_hours ? '' : 'text-gray-400'"
                                    :style="plan.auto_renew_interval_hours ? { color: plan.color } : {}">{{
                                        plan.auto_renew_interval_hours ? formatDuration(plan.auto_renew_interval_hours)
                                            : 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="text-gray-700">SRP Promotion</span>
                                <span class="font-semibold" :class="plan.srp_promotion_days ? '' : 'text-gray-400'"
                                    :style="plan.srp_promotion_days ? { color: plan.color } : {}">{{
                                        plan.srp_promotion_days ? plan.srp_promotion_days + ' days' : 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="text-gray-700">Email marketing</span>
                                <span class="font-semibold" :class="plan.email_marketing_enabled ? '' : 'text-gray-400'"
                                    :style="plan.email_marketing_enabled ? { color: plan.color } : {}">{{
                                        plan.email_marketing_enabled ? 'Yes' : 'N/A' }}</span>
                            </div>
                        </div>
                        <div class="text-white px-6 py-4 flex items-center justify-between"
                            :style="{ backgroundColor: plan.color }">
                            <span class="font-semibold">Price:</span>
                            <span class="text-2xl font-bold">{{ Number(plan.price) === 0 ? 'Free' : '₦' +
                                Number(plan.price).toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppResourceInfoStore } from '#imports';
import type { PromotionPlan } from '~/types/promotionPlan';

defineProps<{
    modelValue: boolean;
}>();

defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const appResourceStore = useAppResourceInfoStore();
const plans = computed(() => appResourceStore.promotionPlans as PromotionPlan[]);

const formatDuration = (hours: number) => {
    if (hours >= 24) {
        const days = Math.floor(hours / 24)
        return days + (days === 1 ? ' day' : ' days')
    }
    return hours + 'hrs'
}
</script>
