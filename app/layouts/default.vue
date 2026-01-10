<template>
    <div class="default-layout">
        <!-- Navbar -->
        <NavBar :showSearch="showSearch" />

        <main class="main-content">
            <slot />
        </main>



        <!-- Footer -->
        <PageFooter />
        <Toaster />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import { computed } from 'vue'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const route = useRoute()
const excludedRoutes = ['create-ad', 'search', 'auth-login', 'auth-register', 'faqs', 'about', 'contact-us', 'terms-and-conditions', 'privacy-policy']

const showSearch = computed(() => {
    return !excludedRoutes.includes(route.name as string)
})
</script>

<style scoped>
.default-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
}

.main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}
</style>