<template>
  <footer class="bg-blue-500 text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Social -->
        <div class="flex justify-center">
          <div class="max-w-min whitespace-nowrap">
            <h3 class="font-semibold mb-4">Socials</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-blue-200">Facebook</a></li>
              <li><a href="#" class="hover:text-blue-200">Instagram</a></li>
              <li><a href="#" class="hover:text-blue-200">Hamsuper Twitter</a></li>
            </ul>
          </div>
        </div>

        <!-- Company Info -->
        <div class="flex justify-center">
          <div class="max-w-min whitespace-nowrap">
            <h3 class="font-semibold mb-4">Company Info</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/about" class="hover:text-blue-200">About Hamsuper</a></li>
              <li><a href="/terms-and-conditions" class="hover:text-blue-200">Terms & Conditions</a></li>
              <li><a href="/privacy-policy" class="hover:text-blue-200">Privacy Policy</a></li>
              <li><a href="/faqs" class="hover:text-blue-200">FAQ</a></li>
              <li><a href="/contact-us" class="hover:text-blue-200">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <!-- Our Apps -->
        <div class="text-center">
          <h3 class="font-semibold mb-4">Our Apps</h3>
          <div class="space-y-2 flex justify-center flex-col items-center">
            <a href="#" class="block">
              <img src="/assets/images/play-store.png" alt="Google Play" class="h-10">
            </a>
            <a href="#" class="block">
              <img src="/assets/images/app-store.png" alt="App Store" class="h-10">
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-blue-400 mt-8 pt-4 text-center text-sm">
        © 2024 Hamsuper.com
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style></style>