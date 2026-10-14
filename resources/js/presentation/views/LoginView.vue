<template>
    <div
        class="flex min-h-[calc(100vh-60px)] items-center justify-center p-4 safe-top-padding"
    >
        <div class="w-full max-w-md border border-black dark:border-neutral-800 bg-white dark:bg-[#171717] p-6 transition-colors">
            <div class="mb-6 border-b border-neutral-300 dark:border-neutral-800 pb-4">
                <h2
                    class="text-xl font-bold uppercase tracking-wide text-black dark:text-white"
                >
                    Login to TASAT-RCEF
                </h2>
                <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Monitoring & Evaluation Field System
                </p>
            </div>

            <div
                v-if="authStore.errorMessage"
                class="mb-4 border border-black dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 p-3 text-xs text-black dark:text-white"
            >
                <strong>Error:</strong> {{ authStore.errorMessage }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label
                        for="identifier"
                        class="mb-1 block text-xs font-bold uppercase tracking-wide text-black dark:text-neutral-300"
                    >
                        Username or Email
                    </label>
                    <input
                        id="identifier"
                        v-model="identifier"
                        type="text"
                        autocomplete="username"
                        required
                        class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] px-3 py-2 text-sm text-black dark:text-white focus:outline-none"
                        placeholder="e.g. enumerator1"
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-1 block text-xs font-bold uppercase tracking-wide text-black dark:text-neutral-300"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] px-3 py-2 text-sm text-black dark:text-white focus:outline-none"
                        placeholder="••••••••"
                    />
                </div>

                <div class="pt-2">
                    <PlainButton
                        type="submit"
                        :loading="authStore.isLoading"
                        block
                    >
                        Log In
                    </PlainButton>
                </div>
            </form>

            <div class="mt-6 border-t border-neutral-300 dark:border-neutral-800 pt-4">
                <p class="mb-2 text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                    Test Accounts (Choose to Fill):
                </p>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <button
                        type="button"
                        @click="fillAccount('enumerator1', 'Password123!')"
                        class="border border-neutral-400 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-2 text-left hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <span class="block font-semibold text-black dark:text-white"
                            >Account 1</span
                        >
                        <span class="block text-neutral-600 dark:text-neutral-400"
                            >ID: enumerator1</span
                        >
                    </button>
                    <button
                        type="button"
                        @click="fillAccount('enumerator2', 'Password123!')"
                        class="border border-neutral-400 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-2 text-left hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <span class="block font-semibold text-black dark:text-white"
                            >Account 2</span
                        >
                        <span class="block text-neutral-600 dark:text-neutral-400"
                            >ID: enumerator2</span
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import PlainButton from "../components/PlainButton.vue";

const authStore = useAuthStore();
const router = useRouter();

const identifier = ref("enumerator1");
const password = ref("Password123!");

const fillAccount = (user: string, pass: string) => {
    identifier.value = user;
    password.value = pass;
};

const handleSubmit = async () => {
    try {
        await authStore.login(identifier.value, password.value);
        router.push({ name: "interviews" });
    } catch (e) {
    }
};
</script>
