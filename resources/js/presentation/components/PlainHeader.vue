<template>
    <header class="border-b border-black bg-white px-4 py-3 sm:px-6">
        <div class="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-lg font-bold uppercase tracking-wider text-black">
                    TASAT-RCEF M&E
                </h1>
                <p class="text-xs text-neutral-600">
                    Field Survey Questionnaire (Offline SQLite Mode)
                </p>
            </div>

            <div v-if="authStore.user" class="flex items-center gap-3">
                <div class="text-right text-xs">
                    <span class="block font-semibold text-black">{{ authStore.user.name }}</span>
                    <span class="text-neutral-500">ID: {{ authStore.user.username }}</span>
                </div>
                <button
                    type="button"
                    @click="handleLogout"
                    class="border border-black bg-white px-3 py-1 text-xs font-medium text-black hover:bg-neutral-100 active:bg-neutral-200"
                >
                    Logout
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    await authStore.logout();
    router.push({ name: 'login' });
};
</script>
