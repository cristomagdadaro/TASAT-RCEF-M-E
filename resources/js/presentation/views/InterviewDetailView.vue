<template>
    <div class="mx-auto max-w-3xl p-4 sm:p-6">
        <div
            class="mb-6 flex items-center justify-between border-b border-black pb-4"
        >
            <div>
                <span
                    class="text-xs font-mono font-bold uppercase text-neutral-600"
                >
                    {{ interview?.referenceId || "Record Detail" }}
                </span>
                <h2
                    class="text-xl font-bold uppercase tracking-wide text-black"
                >
                    {{
                        interview?.farmerInfo.b1q1FarmerName ||
                        "Interview Details"
                    }}
                </h2>
            </div>
            <router-link
                :to="{ name: 'interviews' }"
                class="border border-black bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-100"
            >
                &larr; Back to Records
            </router-link>
        </div>

        <div
            v-if="loading"
            class="border border-black bg-white p-6 text-center text-sm text-neutral-600"
        >
            Loading interview details...
        </div>

        <div
            v-else-if="!interview"
            class="border border-black bg-white p-6 text-center text-sm text-black"
        >
            Interview record not found.
        </div>

        <div v-else class="space-y-6">
            <div class="border border-black bg-neutral-100 p-4 text-xs">
                <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div>
                        <span class="text-neutral-500">Reference ID:</span>
                        <p class="font-bold text-black">
                            {{ interview.referenceId }}
                        </p>
                    </div>
                    <div>
                        <span class="text-neutral-500">Date Recorded:</span>
                        <p class="font-bold text-black">
                            {{ formatDate(interview.interviewDate) }}
                        </p>
                    </div>
                    <div>
                        <span class="text-neutral-500">Enumerator:</span>
                        <p class="font-bold text-black">
                            {{ interview.enumeratorName || "Local Enumerator" }}
                        </p>
                    </div>
                </div>
            </div>

            <section class="border border-black bg-white p-5">
                <div class="border-b border-neutral-300 pb-2">
                    <span
                        class="text-[11px] font-bold uppercase text-neutral-500"
                        >Block 1</span
                    >
                    <h3 class="text-sm font-bold uppercase text-black">
                        Farmer Information
                    </h3>
                </div>

                <dl class="mt-4 divide-y divide-neutral-200 text-sm">
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q1. Farmer's Full Name
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q1FarmerName }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">Q2. Sex</dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q2Sex }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">Q3. Age</dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q3Age }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q4. Province
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q4Province }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q5. Municipality/City
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q5MunicipalityCity }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q6. Engaged in Rice Farming
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.farmerInfo.b1q6EngagedInRiceFarming }}
                        </dd>
                    </div>
                </dl>
            </section>

            <section
                v-if="
                    interview.farmerInfo.isRiceFarmer() &&
                    interview.riceFarmingInfo
                "
                class="border border-black bg-white p-5"
            >
                <div class="border-b border-neutral-300 pb-2">
                    <span
                        class="text-[11px] font-bold uppercase text-neutral-500"
                        >Block 2</span
                    >
                    <h3 class="text-sm font-bold uppercase text-black">
                        Rice Farming Information
                    </h3>
                </div>

                <dl class="mt-4 divide-y divide-neutral-200 text-sm">
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q1. Total Rice Farm Area
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.riceFarmingInfo.b2q1TotalFarmArea }}
                            hectares
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q2. Primary Rice Ecosystem
                        </dt>
                        <dd class="font-bold text-black">
                            {{ interview.riceFarmingInfo.b2q2PrimaryEcosystem }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q3. Rice Establishment Method
                        </dt>
                        <dd class="font-bold text-black">
                            {{
                                interview.riceFarmingInfo
                                    .b2q3EstablishmentMethod
                            }}
                        </dd>
                    </div>
                    <div class="py-2.5 flex justify-between">
                        <dt class="font-medium text-neutral-600">
                            Q4. Uses Certified Rice Seeds
                        </dt>
                        <dd class="font-bold text-black">
                            {{
                                interview.riceFarmingInfo.b2q4UsesCertifiedSeeds
                            }}
                        </dd>
                    </div>
                    <div
                        v-if="interview.riceFarmingInfo.usesCertifiedSeeds()"
                        class="py-2.5 flex justify-between"
                    >
                        <dt class="font-medium text-neutral-600">
                            Q5. Primary Seed Variety
                        </dt>
                        <dd class="font-bold text-black">
                            {{
                                interview.riceFarmingInfo.b2q5SeedVariety ||
                                "N/A"
                            }}
                        </dd>
                    </div>
                    <div class="py-2.5">
                        <dt class="font-medium text-neutral-600">
                            Q6. Main Production Challenges
                        </dt>
                        <dd class="mt-1">
                            <ul class="list-disc pl-5 font-semibold text-black">
                                <li
                                    v-for="challenge in interview
                                        .riceFarmingInfo
                                        .b2q6ProductionChallenges"
                                    :key="challenge"
                                >
                                    {{ challenge }}
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div
                        v-if="interview.riceFarmingInfo.hasOtherChallenge()"
                        class="py-2.5"
                    >
                        <dt class="font-medium text-neutral-600">
                            Q7. Other Challenge Specified
                        </dt>
                        <dd class="mt-1 font-bold text-black">
                            {{
                                interview.riceFarmingInfo
                                    .b2q7OtherChallengeDetails
                            }}
                        </dd>
                    </div>
                </dl>
            </section>

            <div
                v-else
                class="border border-neutral-300 bg-neutral-50 p-4 text-xs text-neutral-600"
            >
                Block 2 was not applicable because the farmer is not engaged in
                rice farming (Q6 = No).
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { LocalSQLiteSurveyRepository } from "../../infrastructure/repositories/LocalSQLiteSurveyRepository";
import { GetSurveyInterviewByIdUseCase } from "../../application/use-cases/GetSurveyInterviewByIdUseCase";
import { SurveyInterview } from "../../domain/entities/SurveyInterview";

const route = useRoute();
const surveyRepo = new LocalSQLiteSurveyRepository();
const getInterviewUseCase = new GetSurveyInterviewByIdUseCase(surveyRepo);

const interview = ref<SurveyInterview | null>(null);
const loading = ref<boolean>(true);

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
        const d = new Date(dateString);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return dateString;
    }
};

onMounted(async () => {
    loading.value = true;
    try {
        const id = route.params.id as string;
        interview.value = await getInterviewUseCase.execute(id);
    } catch (e) {
        console.error("Failed to load interview detail from SQLite:", e);
    } finally {
        loading.value = false;
    }
});
</script>
