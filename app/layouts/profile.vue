<template>
    <div class="profile-layout">
        <!-- Navbar -->
        <NavBar :showSearch="false" />

        <div class="container mx-auto px-1 md:px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Desktop Sidebar -->
                    <div class="hidden lg:block">
                        <ProfileSidebar />
                    </div>

                    <!-- Mobile Sidebar (Sheet) -->
                    <div class="lg:hidden mb-6">
                        <Sheet v-model:open="isSheetOpen">
                            <SheetTrigger as-child>
                                <button
                                    class="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors w-full justify-center">
                                    <Icon name="heroicons:user-circle" class="w-5 h-5" />
                                    My Account
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" class="p-0 border-r-0 bg-transparent shadow-none w-[300px]">
                                <SheetHeader class="sr-only">
                                    <SheetTitle>My Account</SheetTitle>
                                </SheetHeader>
                                <ProfileSidebar @nav-click="isSheetOpen = false"
                                    class="h-full border-r-0 shadow-none" />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <!-- Main Content -->
                <main class="lg:col-span-3">
                    <slot />
                </main>
            </div>
        </div>

        <!-- Footer -->
        <PageFooter />
        <Toaster />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const appResourceInfoStore = useAppResourceInfoStore();
const isSheetOpen = ref(false)

watch(() => appResourceInfoStore.toastMessage, (newMessage) => {
    if (newMessage) {
        toast(newMessage);
        appResourceInfoStore.toastMessage = null;
    }
});
</script>

<style scoped>
.profile-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
}
</style>
