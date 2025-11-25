<template>
    <div class="default-layout">
        <!-- Navbar -->
        <NavBar :showSearch="true" />

        <main class="main-content">
            <slot />
        </main>



        <!-- Footer -->
        <PageFooter />
    </div>
</template>

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