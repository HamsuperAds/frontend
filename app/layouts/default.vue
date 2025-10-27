<template>
    <div class="default-layout">
        <header class="header">
            <nav>
                <NuxtLink to="/">Home</NuxtLink>
            </nav>
        </header>

        <main class="main-content">
            <slot />
        </main>

        <footer class="footer">
            <p>&copy; {{ new Date().getFullYear() }} Hamsuper</p>
        </footer>
    </div>
</template>

<style scoped>
.default-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
}

.header {
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.header a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.header a:hover {
    color: #007bff;
}

.main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.footer {
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    text-align: center;
    color: #6c757d;
}

.footer p {
    margin: 0;
    font-size: 0.9rem;
}
</style>