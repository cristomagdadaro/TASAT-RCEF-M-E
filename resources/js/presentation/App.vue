<template>
    <div class="min-h-screen bg-[#f5f5f5] text-neutral-900 font-sans flex flex-col">
        <PlainHeader />
        <main class="flex-1 pb-12">
            <router-view />
        </main>
        <footer class="border-t border-neutral-300 bg-white py-3 text-center text-xs text-neutral-500">
            TASAT-RCEF M&E &bull; Offline Android Field Application (SQLite Storage)
        </footer>
    </div>
</template>

<script setup lang="ts">
import PlainHeader from './components/PlainHeader.vue';
</script>
