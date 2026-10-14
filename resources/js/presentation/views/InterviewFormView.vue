<template>
    <div class="mx-auto max-w-3xl p-4 sm:p-6">
        <div class="mb-4 flex items-center justify-between border-b border-black pb-4">
            <div>
                <h2 class="text-xl font-bold uppercase tracking-wide text-black">
                    {{ currentTranslation.title }}
                </h2>
                <p class="text-xs text-neutral-600">
                    {{ currentTranslation.subtitle }}
                </p>
            </div>
            <router-link
                :to="{ name: 'interviews' }"
                class="border border-black bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-100"
            >
                {{ currentTranslation.backButton }}
            </router-link>
        </div>

        <div class="mb-6 flex flex-col gap-2 border border-black bg-neutral-100 p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-2">
                <label for="language-selector" class="font-bold uppercase text-black">
                    {{ currentTranslation.languageLabel }}
                </label>
                <select
                    id="language-selector"
                    :value="currentLanguage"
                    class="border border-black bg-white px-2 py-1 text-xs font-semibold text-black focus:outline-none"
                    @change="handleLanguageChange(($event.target as HTMLSelectElement).value)"
                >
                    <option
                        v-for="lang in SUPPORTED_LANGUAGES"
                        :key="lang.code"
                        :value="lang.code"
                    >
                        {{ lang.name }}
                    </option>
                </select>
            </div>
            <div class="text-[11px] text-neutral-600">
                RCEF Multilingual Survey
            </div>
        </div>

        <div
            v-if="errorMessage"
            class="mb-6 border border-black bg-neutral-200 p-4 text-xs text-black"
        >
            <p class="font-bold uppercase">
                {{ currentTranslation.errorHeader }}
            </p>
            <p class="mt-1">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleSave" class="space-y-6">
            <template v-for="block in visibleBlocks" :key="block.id">
                <section class="border border-black bg-white p-5">
                    <div class="border-b border-neutral-300 pb-3">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                            {{ block.subtitle }}
                        </span>
                        <h3 class="text-base font-bold uppercase text-black">
                            {{ getBlockTitle(block) }}
                        </h3>
                        <p class="mt-1 text-xs text-neutral-600">
                            <strong>Instructions:</strong> {{ getBlockInstructions(block) }}
                        </p>
                    </div>

                    <div class="mt-4 space-y-4">
                        <template
                            v-for="question in visibleQuestions(block)"
                            :key="question.id"
                        >
                            <div
                                :class="{
                                    'border-l-2 border-black pl-3 ml-2': question.isConditionalChild,
                                }"
                            >
                                <DynamicQuestionField
                                    :question="question"
                                    :label="getQuestionLabel(question.id, question.label)"
                                    :placeholder="getQuestionPlaceholder(question.id, question.placeholder)"
                                    :option-labels="currentTranslation.options"
                                    :model-value="formData[question.id]"
                                    :form-data="formData"
                                    :error="getFieldError(question.id)"
                                    @update:model-value="(val) => (formData[question.id] = val)"
                                />
                            </div>
                        </template>
                    </div>
                </section>
            </template>

            <div
                v-if="formData.B1Q6 === 'No'"
                class="border border-neutral-400 bg-neutral-50 p-4 text-xs text-neutral-700"
            >
                <strong>Notice:</strong> {{ currentTranslation.block2_hidden_notice }}
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <router-link
                    :to="{ name: 'interviews' }"
                    class="border border-black bg-white px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-neutral-100"
                >
                    {{ currentTranslation.cancelButton }}
                </router-link>
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="border border-black bg-black px-6 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                    <span v-if="isSubmitting">{{ currentTranslation.savingButton }}</span>
                    <span v-else>{{ currentTranslation.saveButton }}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
    QUESTIONNAIRE_BLOCKS,
    type BlockConfig,
    type QuestionConfig,
} from '../../domain/value-objects/QuestionnaireSchema';
import {
    SUPPORTED_LANGUAGES,
    getTranslation,
} from '../../domain/value-objects/QuestionnaireTranslations';
import { FarmerInformation } from '../../domain/entities/FarmerInformation';
import { RiceFarmingInformation } from '../../domain/entities/RiceFarmingInformation';
import { LocalSQLiteSurveyRepository } from '../../infrastructure/repositories/LocalSQLiteSurveyRepository';
import { SaveSurveyInterviewUseCase } from '../../application/use-cases/SaveSurveyInterviewUseCase';
import { useAuthStore } from '../store/authStore';
import DynamicQuestionField from '../components/DynamicQuestionField.vue';

const router = useRouter();
const authStore = useAuthStore();
const surveyRepo = new LocalSQLiteSurveyRepository();
const saveInterviewUseCase = new SaveSurveyInterviewUseCase(surveyRepo);

const currentLanguage = ref<string>(localStorage.getItem('preferred_language') || 'en');

const handleLanguageChange = (lang: string) => {
    currentLanguage.value = lang;
    localStorage.setItem('preferred_language', lang);
};

const currentTranslation = computed(() => getTranslation(currentLanguage.value));

const getBlockTitle = (block: BlockConfig): string => {
    if (block.id === 'block1') return currentTranslation.value.block1_title;
    if (block.id === 'block2') return currentTranslation.value.block2_title;
    return block.title;
};

const getBlockInstructions = (block: BlockConfig): string => {
    if (block.id === 'block1') return currentTranslation.value.block1_instructions;
    if (block.id === 'block2') return currentTranslation.value.block2_instructions;
    return block.instructions;
};

const getQuestionLabel = (qId: string, fallback: string): string => {
    const key = `${qId.toLowerCase()}_label` as keyof typeof currentTranslation.value;
    const val = currentTranslation.value[key];
    return typeof val === 'string' ? val : fallback;
};

const getQuestionPlaceholder = (qId: string, fallback?: string): string => {
    const key = `${qId.toLowerCase()}_placeholder` as keyof typeof currentTranslation.value;
    const val = currentTranslation.value[key];
    return typeof val === 'string' ? val : fallback || '';
};

const formData = reactive<Record<string, any>>({
    B1Q1: '',
    B1Q2: '',
    B1Q3: null,
    B1Q4: 'Nueva Ecija',
    B1Q5: '',
    B1Q6: '',
    B2Q1: null,
    B2Q2: 'Irrigated',
    B2Q3: 'Transplanting',
    B2Q4: '',
    B2Q5: '',
    B2Q6: [],
    B2Q7: '',
});

const visibleBlocks = computed(() => {
    return QUESTIONNAIRE_BLOCKS.filter((block) => {
        if (!block.condition) return true;
        return block.condition(formData);
    });
});

const visibleQuestions = (block: BlockConfig): QuestionConfig[] => {
    return block.questions.filter((q) => {
        if (!q.condition) return true;
        return q.condition(formData);
    });
};

const isSubmitting = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const errors = ref<Record<string, string>>({});

const idToErrorKey: Record<string, string> = {
    B1Q1: 'b1q1_farmer_name',
    B1Q2: 'b1q2_sex',
    B1Q3: 'b1q3_age',
    B1Q4: 'b1q4_province',
    B1Q5: 'b1q5_municipality_city',
    B1Q6: 'b1q6_engaged_in_rice_farming',
    B2Q1: 'b2q1_total_farm_area',
    B2Q2: 'b2q2_primary_ecosystem',
    B2Q3: 'b2q3_establishment_method',
    B2Q4: 'b2q4_uses_certified_seeds',
    B2Q5: 'b2q5_seed_variety',
    B2Q6: 'b2q6_production_challenges',
    B2Q7: 'b2q7_other_challenge_details',
};

const getFieldError = (qId: string): string | undefined => {
    const key = idToErrorKey[qId];
    return errors.value[key] || errors.value[qId];
};

watch(
    () => formData.B1Q6,
    (newVal) => {
        if (newVal !== 'Yes' && newVal !== true) {
            formData.B2Q1 = null;
            formData.B2Q2 = 'Irrigated';
            formData.B2Q3 = 'Transplanting';
            formData.B2Q4 = '';
            formData.B2Q5 = '';
            formData.B2Q6 = [];
            formData.B2Q7 = '';

            const block2Keys = [
                'b2q1_total_farm_area',
                'b2q2_primary_ecosystem',
                'b2q3_establishment_method',
                'b2q4_uses_certified_seeds',
                'b2q5_seed_variety',
                'b2q6_production_challenges',
                'b2q7_other_challenge_details',
                'block2',
                'B2Q1',
                'B2Q2',
                'B2Q3',
                'B2Q4',
                'B2Q5',
                'B2Q6',
                'B2Q7',
            ];
            block2Keys.forEach((k) => delete errors.value[k]);
        }
    }
);

watch(
    () => formData.B2Q4,
    (newVal) => {
        if (newVal !== 'Yes') {
            formData.B2Q5 = '';
            delete errors.value['b2q5_seed_variety'];
            delete errors.value['B2Q5'];
        }
    }
);

watch(
    () => formData.B2Q6,
    (newVal) => {
        if (!Array.isArray(newVal) || !newVal.includes('Others')) {
            formData.B2Q7 = '';
            delete errors.value['b2q7_other_challenge_details'];
            delete errors.value['B2Q7'];
        }
    },
    { deep: true }
);

const handleSave = async () => {
    errors.value = {};
    errorMessage.value = null;

    const farmerInfo = new FarmerInformation({
        b1q1FarmerName: formData.B1Q1,
        b1q2Sex: formData.B1Q2,
        b1q3Age: formData.B1Q3,
        b1q4Province: formData.B1Q4,
        b1q5MunicipalityCity: formData.B1Q5,
        b1q6EngagedInRiceFarming: formData.B1Q6,
    });

    const riceFarmingInfo = farmerInfo.isRiceFarmer()
        ? new RiceFarmingInformation({
              b2q1TotalFarmArea: formData.B2Q1,
              b2q2PrimaryEcosystem: formData.B2Q2,
              b2q3EstablishmentMethod: formData.B2Q3,
              b2q4UsesCertifiedSeeds: formData.B2Q4,
              b2q5SeedVariety: formData.B2Q5,
              b2q6ProductionChallenges: formData.B2Q6,
              b2q7OtherChallengeDetails: formData.B2Q7,
          })
        : null;

    isSubmitting.value = true;
    try {
        await saveInterviewUseCase.execute(
            farmerInfo,
            riceFarmingInfo,
            authStore.user ? { id: authStore.user.id, name: authStore.user.name } : null
        );

        router.push({ name: 'interviews' });
    } catch (err: any) {
        if (err.errors) {
            errors.value = err.errors;
            errorMessage.value =
                err.message || 'Validation failed. Please review the highlighted fields.';
        } else {
            errorMessage.value = err.message || 'An error occurred while saving the interview.';
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>
