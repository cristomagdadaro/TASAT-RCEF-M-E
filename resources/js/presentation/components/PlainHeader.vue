<template>
    <header class="border-b border-black bg-white px-4 pb-3 sm:px-6 safe-top-padding">
        <div class="mx-auto flex max-w-4xl flex-row items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
                <h1 class="text-base font-bold uppercase tracking-wider text-black truncate sm:text-lg">
                    TASAT-RCEF M&E
                </h1>
                <p class="text-[11px] text-neutral-600 truncate sm:text-xs">
                    Field Survey Questionnaire
                </p>
            </div>

            <div v-if="authStore.user" class="flex shrink-0 items-center gap-2 sm:gap-3">
                <div class="text-right text-[11px] sm:text-xs">
                    <span class="block max-w-[130px] truncate font-semibold leading-tight text-black sm:max-w-none">
                        {{ authStore.user.name }}
                    </span>
                    <span class="block text-neutral-500 leading-tight">
                        ID: {{ authStore.user.username }}
                    </span>
                </div>
                <button
                    type="button"
                    @click="handleLogout"
                    class="border border-black bg-white px-2.5 py-1 text-xs font-medium text-black hover:bg-neutral-100 active:bg-neutral-200"
                >
                    Logout
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    await authStore.logout();
    router.push({ name: "login" });
};
</script>
