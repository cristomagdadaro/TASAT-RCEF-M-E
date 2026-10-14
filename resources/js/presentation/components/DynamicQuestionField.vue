<template>
    <div>
        <div>
            <label
                :for="question.id"
                class="text-xs font-bold uppercase text-black dark:text-neutral-200"
            >
                {{ question.qNumber }}. {{ displayLabel }}
                <span v-if="isRequired" class="text-red-700 dark:text-red-400">*</span>
            </label>
        </div>

        <div v-if="question.type === 'text'" class="mt-1">
            <input
                :id="question.id"
                :value="modelValue"
                type="text"
                :placeholder="displayPlaceholder"
                class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] px-3 py-2 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-colors"
                :class="{ 'border-red-600 dark:border-red-500': Boolean(error) }"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement).value,
                    )
                "
            />
        </div>

        <div v-else-if="question.type === 'number'" class="mt-1">
            <input
                :id="question.id"
                :value="modelValue"
                type="number"
                :step="question.step || '1'"
                :min="question.min"
                :max="question.max"
                :placeholder="displayPlaceholder"
                class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] px-3 py-2 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-colors"
                :class="{ 'border-red-600 dark:border-red-500': Boolean(error) }"
                @input="handleNumberInput"
            />
        </div>

        <div
            v-else-if="question.type === 'radio'"
            class="mt-2 flex flex-wrap gap-2 text-sm text-black dark:text-white"
        >
            <label
                v-for="opt in question.options"
                :key="opt"
                class="flex cursor-pointer items-center gap-2 border px-3 py-2 text-xs transition-colors"
                :class="
                    modelValue === opt
                        ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-800 font-bold text-black dark:text-white'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] text-neutral-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                "
            >
                <input
                    type="radio"
                    :name="question.id"
                    :value="opt"
                    :checked="modelValue === opt"
                    class="accent-black dark:accent-white"
                    @change="$emit('update:modelValue', opt)"
                />
                <span>
                    {{ getOptionText(opt) }}
                </span>
            </label>
        </div>

        <div v-else-if="question.type === 'dropdown'" class="mt-1">
            <select
                :id="question.id"
                :value="modelValue"
                class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] px-3 py-2 text-sm text-black dark:text-white focus:outline-none transition-colors"
                :class="{ 'border-red-600 dark:border-red-500': Boolean(error) }"
                @change="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLSelectElement).value,
                    )
                "
            >
                <option value="" disabled class="bg-white dark:bg-neutral-900 text-black dark:text-white">
                    -- Select {{ displayLabel }} --
                </option>
                <option
                    v-for="opt in question.options"
                    :key="opt"
                    :value="opt"
                    class="bg-white dark:bg-neutral-900 text-black dark:text-white"
                >
                    {{ getOptionText(opt) }}
                </option>
            </select>
        </div>

        <div
            v-else-if="question.type === 'checkbox'"
            class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-black dark:text-white"
        >
            <label
                v-for="opt in question.options"
                :key="opt"
                class="flex cursor-pointer items-center gap-2 border p-2 text-xs transition-colors"
                :class="
                    Array.isArray(modelValue) && modelValue.includes(opt)
                        ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-800 font-semibold text-black dark:text-white'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] text-neutral-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                "
            >
                <input
                    type="checkbox"
                    :value="opt"
                    :checked="
                        Array.isArray(modelValue) && modelValue.includes(opt)
                    "
                    class="accent-black dark:accent-white"
                    @change="
                        handleCheckboxChange(
                            opt,
                            ($event.target as HTMLInputElement).checked,
                        )
                    "
                />
                <span>{{ getOptionText(opt) }}</span>
            </label>
        </div>

        <div v-else-if="question.type === 'textarea'" class="mt-1">
            <textarea
                :id="question.id"
                :value="modelValue"
                rows="2"
                :placeholder="displayPlaceholder"
                class="w-full border border-black dark:border-neutral-700 bg-white dark:bg-[#121212] p-2 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-colors"
                :class="{ 'border-red-600 dark:border-red-500': Boolean(error) }"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLTextAreaElement).value,
                    )
                "
            ></textarea>
        </div>

        <p v-if="error" class="mt-1 text-xs text-red-700 dark:text-red-400">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { QuestionConfig } from "../../domain/value-objects/QuestionnaireSchema";

const props = defineProps<{
    question: QuestionConfig;
    modelValue: any;
    formData?: Record<string, any>;
    error?: string;
    label?: string;
    placeholder?: string;
    optionLabels?: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", val: any): void;
}>();

const displayLabel = computed(() => props.label || props.question.label);

const displayPlaceholder = computed(() => {
    if (props.placeholder !== undefined && props.placeholder !== null) {
        return props.placeholder;
    }
    return props.question.placeholder || "Enter response";
});

const getOptionText = (opt: string) => {
    return props.optionLabels?.[opt] || opt;
};

const isRequired = computed(() => {
    if (typeof props.question.required === "function") {
        return props.question.required(props.formData || {});
    }
    return Boolean(props.question.required);
});

const handleNumberInput = (e: Event) => {
    const raw = (e.target as HTMLInputElement).value;
    if (raw === "") {
        emit("update:modelValue", null);
    } else {
        emit("update:modelValue", Number(raw));
    }
};

const handleCheckboxChange = (option: string, isChecked: boolean) => {
    const current = Array.isArray(props.modelValue)
        ? [...props.modelValue]
        : [];
    if (isChecked) {
        if (!current.includes(option)) {
            current.push(option);
        }
    } else {
        const idx = current.indexOf(option);
        if (idx !== -1) {
            current.splice(idx, 1);
        }
    }
    emit("update:modelValue", current);
};
</script>
