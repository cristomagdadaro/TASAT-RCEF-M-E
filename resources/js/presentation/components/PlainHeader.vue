<template>
    <header
        class="border-b border-black dark:border-neutral-800 bg-white dark:bg-[#171717] px-4 pb-3 sm:px-6 safe-top-padding transition-colors"
    >
        <div
            class="mx-auto flex max-w-4xl flex-row items-center justify-between gap-3"
        >
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                    <h1
                        class="text-base font-bold uppercase tracking-wider text-black dark:text-white truncate sm:text-lg"
                    >
                        TASAT-RCEF M&E
                    </h1>
                </div>
                <p
                    class="text-[11px] text-neutral-600 dark:text-neutral-400 truncate sm:text-xs"
                >
                    Field Survey Questionnaire
                </p>
            </div>

            <div class="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    @click="themeStore.toggleTheme"
                    class="border border-black dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-1 text-xs font-semibold uppercase text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                    {{ themeStore.isDark ? "Light UI" : "Dark UI" }}
                </button>

                <div
                    v-if="authStore.user"
                    class="flex items-center gap-2 sm:gap-3"
                >
                    <div class="text-right text-[11px] sm:text-xs">
                        <span
                            class="block max-w-[130px] truncate font-semibold leading-tight text-black dark:text-white sm:max-w-none"
                        >
                            {{ authStore.user.name }}
                        </span>
                        <span
                            class="block text-neutral-500 dark:text-neutral-400 leading-tight"
                        >
                            ID: {{ authStore.user.username }}
                        </span>
                    </div>
                    <button
                        type="button"
                        @click="handleLogout"
                        class="border border-black dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 active:bg-neutral-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();

const handleLogout = async () => {
    await authStore.logout();
    router.push({ name: "login" });
};
</script>
