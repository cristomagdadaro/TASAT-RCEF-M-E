<template>
    <div class="mx-auto max-w-3xl p-4 sm:p-6">
        <div
            class="mb-6 flex items-center justify-between border-b border-black pb-4"
        >
            <div>
                <h2
                    class="text-xl font-bold uppercase tracking-wide text-black"
                >
                    Field Questionnaire
                </h2>
                <p class="text-xs text-neutral-600">
                    Appendix A: Sample Field Questionnaire &bull; Offline Entry
                </p>
            </div>
            <router-link
                :to="{ name: 'interviews' }"
                class="border border-black bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-100"
            >
                &larr; Back to Records
            </router-link>
        </div>

        <div
            v-if="errorMessage"
            class="mb-6 border border-black bg-neutral-200 p-4 text-xs text-black"
        >
            <p class="font-bold uppercase">
                Please correct the following before saving:
            </p>
            <p class="mt-1">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleSave" class="space-y-6">
            <section class="border border-black bg-white p-5">
                <div class="border-b border-neutral-300 pb-3">
                    <span
                        class="text-[11px] font-bold uppercase tracking-wider text-neutral-500"
                        >Block 1</span
                    >
                    <h3 class="text-base font-bold uppercase text-black">
                        Farmer Information
                    </h3>
                    <p class="mt-1 text-xs text-neutral-600">
                        <strong>Instructions:</strong> Record the basic
                        information of the farmer being interviewed.
                    </p>
                </div>

                <div class="mt-4 space-y-4">
                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="b1q1"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q1] Farmer's Full Name
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Text</span
                            >
                        </div>
                        <input
                            id="b1q1"
                            v-model="b1q1FarmerName"
                            type="text"
                            required
                            placeholder="Enter farmer's full name"
                            class="mt-1 w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{
                                'border-red-600': errors.b1q1_farmer_name,
                            }"
                        />
                        <p
                            v-if="errors.b1q1_farmer_name"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q1_farmer_name }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q2] Sex <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Single Choice</span
                            >
                        </div>
                        <div class="mt-2 flex gap-6 text-sm text-black">
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Male"
                                    v-model="b1q2Sex"
                                    class="accent-black"
                                />
                                <span>Male</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Female"
                                    v-model="b1q2Sex"
                                    class="accent-black"
                                />
                                <span>Female</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b1q2_sex"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q2_sex }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="b1q3"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q3] Age <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Numeric (whole number)</span
                            >
                        </div>
                        <input
                            id="b1q3"
                            v-model.number="b1q3Age"
                            type="number"
                            min="10"
                            max="120"
                            step="1"
                            required
                            placeholder="e.g. 45"
                            class="mt-1 w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{ 'border-red-600': errors.b1q3_age }"
                        />
                        <p
                            v-if="errors.b1q3_age"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q3_age }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="b1q4"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q4] Province
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Dropdown</span
                            >
                        </div>
                        <select
                            id="b1q4"
                            v-model="b1q4Province"
                            required
                            class="mt-1 w-full border border-black bg-white px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{ 'border-red-600': errors.b1q4_province }"
                        >
                            <option value="" disabled>
                                -- Select Province --
                            </option>
                            <option
                                v-for="province in PHILIPPINE_PROVINCES"
                                :key="province"
                                :value="province"
                            >
                                {{ province }}
                            </option>
                        </select>
                        <p
                            v-if="errors.b1q4_province"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q4_province }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="b1q5"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q5] Municipality/City
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Text</span
                            >
                        </div>
                        <input
                            id="b1q5"
                            v-model="b1q5MunicipalityCity"
                            type="text"
                            required
                            placeholder="Enter municipality or city"
                            class="mt-1 w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{
                                'border-red-600': errors.b1q5_municipality_city,
                            }"
                        />
                        <p
                            v-if="errors.b1q5_municipality_city"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q5_municipality_city }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B1Q6] Is the farmer currently engaged in rice
                                farming? <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Single Choice</span
                            >
                        </div>
                        <div class="mt-2 flex gap-6 text-sm text-black">
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Yes"
                                    v-model="b1q6EngagedInRiceFarming"
                                    class="accent-black"
                                />
                                <span class="font-semibold">Yes</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="No"
                                    v-model="b1q6EngagedInRiceFarming"
                                    class="accent-black"
                                />
                                <span>No</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b1q6_engaged_in_rice_farming"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b1q6_engaged_in_rice_farming }}
                        </p>
                    </div>
                </div>
            </section>

            <section
                v-if="b1q6EngagedInRiceFarming === 'Yes'"
                class="border border-black bg-white p-5"
            >
                <div class="border-b border-neutral-300 pb-3">
                    <span
                        class="text-[11px] font-bold uppercase tracking-wider text-neutral-500"
                        >Block 2</span
                    >
                    <h3 class="text-base font-bold uppercase text-black">
                        Rice Farming Information
                    </h3>
                    <p class="mt-1 text-xs text-neutral-600">
                        <strong>Display Condition:</strong> Shown because B1Q6 =
                        Yes.<br />
                        <strong>Instructions:</strong> Record the farmer's rice
                        farming information.
                    </p>
                </div>

                <div class="mt-4 space-y-4">
                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="b2q1"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q1] Total rice farm area (hectares)
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Decimal Number</span
                            >
                        </div>
                        <input
                            id="b2q1"
                            v-model.number="b2q1TotalFarmArea"
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="e.g. 1.75"
                            class="mt-1 w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{
                                'border-red-600': errors.b2q1_total_farm_area,
                            }"
                        />
                        <p
                            v-if="errors.b2q1_total_farm_area"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q1_total_farm_area }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q2] Primary rice ecosystem
                                <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Single Choice</span
                            >
                        </div>
                        <div
                            class="mt-2 flex flex-col gap-2 text-sm text-black sm:flex-row sm:gap-6"
                        >
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Irrigated"
                                    v-model="b2q2PrimaryEcosystem"
                                    class="accent-black"
                                />
                                <span>Irrigated</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Rainfed Lowland"
                                    v-model="b2q2PrimaryEcosystem"
                                    class="accent-black"
                                />
                                <span>Rainfed Lowland</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Upland"
                                    v-model="b2q2PrimaryEcosystem"
                                    class="accent-black"
                                />
                                <span>Upland</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b2q2_primary_ecosystem"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q2_primary_ecosystem }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q3] Rice establishment method
                                <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Single Choice</span
                            >
                        </div>
                        <div class="mt-2 flex gap-6 text-sm text-black">
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Direct Seeding"
                                    v-model="b2q3EstablishmentMethod"
                                    class="accent-black"
                                />
                                <span>Direct Seeding</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Transplanting"
                                    v-model="b2q3EstablishmentMethod"
                                    class="accent-black"
                                />
                                <span>Transplanting</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b2q3_establishment_method"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q3_establishment_method }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q4] Does the farmer use certified rice seeds?
                                <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Single Choice</span
                            >
                        </div>
                        <div class="mt-2 flex gap-6 text-sm text-black">
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="Yes"
                                    v-model="b2q4UsesCertifiedSeeds"
                                    class="accent-black"
                                />
                                <span>Yes</span>
                            </label>
                            <label
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value="No"
                                    v-model="b2q4UsesCertifiedSeeds"
                                    class="accent-black"
                                />
                                <span>No</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b2q4_uses_certified_seeds"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q4_uses_certified_seeds }}
                        </p>
                    </div>

                    <div
                        v-if="b2q4UsesCertifiedSeeds === 'Yes'"
                        class="border-l-2 border-black pl-3"
                    >
                        <div class="flex items-center justify-between">
                            <label
                                for="b2q5"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q5] If yes, what seed variety does the farmer
                                primarily use?
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Text (Conditional)</span
                            >
                        </div>
                        <input
                            id="b2q5"
                            v-model="b2q5SeedVariety"
                            type="text"
                            placeholder="e.g. NSIC Rc 222, Rc 480"
                            class="mt-1 w-full border border-black px-3 py-2 text-sm text-black focus:outline-none"
                            :class="{
                                'border-red-600': errors.b2q5_seed_variety,
                            }"
                        />
                        <p
                            v-if="errors.b2q5_seed_variety"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q5_seed_variety }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q6] What are the farmer's main rice
                                production challenges?
                                <span class="text-red-700">*</span>
                            </span>
                            <span class="text-[11px] text-neutral-500"
                                >Multiple Choice</span
                            >
                        </div>
                        <div
                            class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-black"
                        >
                            <label
                                v-for="challenge in PRODUCTION_CHALLENGES"
                                :key="challenge"
                                class="flex items-center gap-2 border border-neutral-300 p-2 cursor-pointer hover:bg-neutral-50"
                            >
                                <input
                                    type="checkbox"
                                    :value="challenge"
                                    v-model="b2q6ProductionChallenges"
                                    class="accent-black"
                                />
                                <span>{{ challenge }}</span>
                            </label>
                        </div>
                        <p
                            v-if="errors.b2q6_production_challenges"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q6_production_challenges }}
                        </p>
                    </div>

                    <div
                        v-if="b2q6ProductionChallenges.includes('Others')"
                        class="border-l-2 border-black pl-3"
                    >
                        <div class="flex items-center justify-between">
                            <label
                                for="b2q7"
                                class="text-xs font-bold uppercase text-black"
                            >
                                [B2Q7] If Others is selected, please specify
                                <span class="text-red-700">*</span>
                            </label>
                            <span class="text-[11px] text-neutral-500"
                                >Text (Conditional)</span
                            >
                        </div>
                        <textarea
                            id="b2q7"
                            v-model="b2q7OtherChallengeDetails"
                            rows="2"
                            placeholder="Specify other production challenge details..."
                            class="mt-1 w-full border border-black p-2 text-sm text-black focus:outline-none"
                            :class="{
                                'border-red-600':
                                    errors.b2q7_other_challenge_details,
                            }"
                        ></textarea>
                        <p
                            v-if="errors.b2q7_other_challenge_details"
                            class="mt-1 text-xs text-red-700"
                        >
                            {{ errors.b2q7_other_challenge_details }}
                        </p>
                    </div>
                </div>
            </section>

            <div
                v-else-if="b1q6EngagedInRiceFarming === 'No'"
                class="border border-neutral-400 bg-neutral-50 p-4 text-xs text-neutral-700"
            >
                <strong>Notice:</strong> Block 2 (Rice Farming Information) is
                hidden because the respondent indicated they are not currently
                engaged in rice farming (B1Q6 = No). You may proceed to submit
                Block 1.
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <router-link
                    :to="{ name: 'interviews' }"
                    class="border border-black bg-white px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-neutral-100"
                >
                    Cancel
                </router-link>
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="border border-black bg-black px-6 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                    <span v-if="isSubmitting">Saving to SQLite...</span>
                    <span v-else>Save Interview to SQLite</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PHILIPPINE_PROVINCES } from "../../domain/value-objects/PhilippineProvinces";
import { PRODUCTION_CHALLENGES } from "../../domain/value-objects/ChallengesList";
import {
    FarmerInformation,
    SexType,
    YesNoType,
} from "../../domain/entities/FarmerInformation";
import {
    RiceFarmingInformation,
    EcosystemType,
    EstablishmentMethodType,
} from "../../domain/entities/RiceFarmingInformation";
import { LocalSQLiteSurveyRepository } from "../../infrastructure/repositories/LocalSQLiteSurveyRepository";
import { SaveSurveyInterviewUseCase } from "../../application/use-cases/SaveSurveyInterviewUseCase";
import { useAuthStore } from "../store/authStore";

const router = useRouter();
const authStore = useAuthStore();
const surveyRepo = new LocalSQLiteSurveyRepository();
const saveInterviewUseCase = new SaveSurveyInterviewUseCase(surveyRepo);

// Block 1 Form State
const b1q1FarmerName = ref<string>("");
const b1q2Sex = ref<SexType | "">("");
const b1q3Age = ref<number | null>(null);
const b1q4Province = ref<string>("Nueva Ecija");
const b1q5MunicipalityCity = ref<string>("");
const b1q6EngagedInRiceFarming = ref<YesNoType | "">("Yes");

// Block 2 Form State
const b2q1TotalFarmArea = ref<number | null>(null);
const b2q2PrimaryEcosystem = ref<EcosystemType | "">("Irrigated");
const b2q3EstablishmentMethod = ref<EstablishMethodType | "">("Transplanting");
const b2q4UsesCertifiedSeeds = ref<YesNoType | "">("Yes");
const b2q5SeedVariety = ref<string>("");
const b2q6ProductionChallenges = ref<string[]>([]);
const b2q7OtherChallengeDetails = ref<string>("");

// Status
const isSubmitting = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const errors = ref<{ [key: string]: string }>({});

const handleSave = async () => {
    errors.value = {};
    errorMessage.value = null;

    const farmerInfo = new FarmerInformation({
        b1q1FarmerName: b1q1FarmerName.value,
        b1q2Sex: b1q2Sex.value,
        b1q3Age: b1q3Age.value,
        b1q4Province: b1q4Province.value,
        b1q5MunicipalityCity: b1q5MunicipalityCity.value,
        b1q6EngagedInRiceFarming: b1q6EngagedInRiceFarming.value,
    });

    const riceFarmingInfo = farmerInfo.isRiceFarmer()
        ? new RiceFarmingInformation({
              b2q1TotalFarmArea: b2q1TotalFarmArea.value,
              b2q2PrimaryEcosystem: b2q2PrimaryEcosystem.value,
              b2q3EstablishmentMethod: b2q3EstablishmentMethod.value,
              b2q4UsesCertifiedSeeds: b2q4UsesCertifiedSeeds.value,
              b2q5SeedVariety: b2q5SeedVariety.value,
              b2q6ProductionChallenges: b2q6ProductionChallenges.value,
              b2q7OtherChallengeDetails: b2q7OtherChallengeDetails.value,
          })
        : null;

    isSubmitting.value = true;
    try {
        await saveInterviewUseCase.execute(
            farmerInfo,
            riceFarmingInfo,
            authStore.user
                ? { id: authStore.user.id, name: authStore.user.name }
                : null,
        );

        router.push({ name: "interviews" });
    } catch (err: any) {
        if (err.errors) {
            errors.value = err.errors;
            errorMessage.value =
                err.message ||
                "Validation failed. Please review the highlighted fields.";
        } else {
            errorMessage.value =
                err.message || "An error occurred while saving to SQLite.";
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>
