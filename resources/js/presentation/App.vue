<template>
    <div
        class="min-h-screen bg-[#f5f5f5] text-neutral-900 dark:bg-[#0f0f0f] dark:text-[#f5f5f5] font-sans flex flex-col transition-colors"
    >
        <PlainHeader />
        <main class="flex-1 pb-12">
            <router-view />
        </main>
        <footer
            class="border-t border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#171717] py-3 text-center text-xs text-neutral-500 dark:text-neutral-400"
        >
            TASAT-RCEF M&E &bull; Offline Field Survey &bull; Cristo Rey C.
            Magdadaro
        </footer>
    </div>
</template>

<script setup lang="ts">
import PlainHeader from "./components/PlainHeader.vue";
</script>
