<template>
    <div>
        <div class="flex items-center justify-between">
            <label
                :for="question.id"
                class="text-xs font-bold uppercase text-black"
            >
                {{ question.qNumber }}. {{ question.label }}
                <span v-if="isRequired" class="text-red-700">*</span>
            </label>
            <span class="text-[11px] text-neutral-500">{{
                question.badge
            }}</span>
        </div>

        <div v-if="question.type === 'text'" class="mt-1">
            <input
                :id="question.id"
                :value="modelValue"
                type="text"
                :placeholder="question.placeholder || 'Enter response'"
                class="w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                :class="{ 'border-red-600': Boolean(error) }"
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
                :placeholder="question.placeholder || 'Enter number'"
                class="w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                :class="{ 'border-red-600': Boolean(error) }"
                @input="handleNumberInput"
            />
        </div>

        <div
            v-else-if="question.type === 'radio'"
            class="mt-2 flex flex-wrap gap-6 text-sm text-black"
        >
            <label
                v-for="opt in question.options"
                :key="opt"
                class="flex cursor-pointer items-center gap-2"
            >
                <input
                    type="radio"
                    :name="question.id"
                    :value="opt"
                    :checked="modelValue === opt"
                    class="accent-black"
                    @change="$emit('update:modelValue', opt)"
                />
                <span :class="{ 'font-semibold': modelValue === opt }">
                    {{ opt }}
                </span>
            </label>
        </div>

        <div v-else-if="question.type === 'dropdown'" class="mt-1">
            <select
                :id="question.id"
                :value="modelValue"
                class="w-full border border-black bg-white px-3 py-2 text-sm text-black focus:outline-none"
                :class="{ 'border-red-600': Boolean(error) }"
                @change="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLSelectElement).value,
                    )
                "
            >
                <option value="" disabled>
                    -- Select {{ question.label }} --
                </option>
                <option v-for="opt in question.options" :key="opt" :value="opt">
                    {{ opt }}
                </option>
            </select>
        </div>

        <div
            v-else-if="question.type === 'checkbox'"
            class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-black"
        >
            <label
                v-for="opt in question.options"
                :key="opt"
                class="flex cursor-pointer items-center gap-2 border border-neutral-300 p-2 hover:bg-neutral-50"
            >
                <input
                    type="checkbox"
                    :value="opt"
                    :checked="
                        Array.isArray(modelValue) && modelValue.includes(opt)
                    "
                    class="accent-black"
                    @change="
                        handleCheckboxChange(
                            opt,
                            ($event.target as HTMLInputElement).checked,
                        )
                    "
                />
                <span>{{ opt }}</span>
            </label>
        </div>

        <div v-else-if="question.type === 'textarea'" class="mt-1">
            <textarea
                :id="question.id"
                :value="modelValue"
                rows="2"
                :placeholder="question.placeholder || 'Specify details...'"
                class="w-full border border-black p-2 text-sm text-black focus:outline-none"
                :class="{ 'border-red-600': Boolean(error) }"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLTextAreaElement).value,
                    )
                "
            ></textarea>
        </div>

        <p v-if="error" class="mt-1 text-xs text-red-700">
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
}>();

const emit = defineEmits<{
    (e: "update:modelValue", val: any): void;
}>();

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
