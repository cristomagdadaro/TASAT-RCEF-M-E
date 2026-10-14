<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="[
            'inline-block px-4 py-2 text-sm font-medium transition-colors text-center border',
            variantClass,
            disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            block ? 'w-full' : '',
        ]"
    >
        <span v-if="loading">Processing...</span>
        <slot v-else />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        type?: 'button' | 'submit' | 'reset';
        variant?: 'primary' | 'secondary' | 'danger';
        disabled?: boolean;
        loading?: boolean;
        block?: boolean;
    }>(),
    {
        type: 'button',
        variant: 'primary',
        disabled: false,
        loading: false,
        block: false,
    }
);

const variantClass = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'border-black bg-white text-black hover:bg-neutral-100 active:bg-neutral-200';
        case 'danger':
            return 'border-black bg-black text-white hover:bg-neutral-800 active:bg-neutral-900';
        case 'primary':
        default:
            return 'border-black bg-black text-white hover:bg-neutral-800 active:bg-neutral-900';
    }
});
</script>
