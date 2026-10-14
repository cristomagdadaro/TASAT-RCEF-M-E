<template>
    <div class="mx-auto max-w-4xl p-4 sm:p-6">
        <div
            class="mb-6 flex flex-col gap-3 border-b border-black pb-4 sm:flex-row sm:items-center sm:justify-between"
        >
            <div>
                <h2
                    class="text-xl font-bold uppercase tracking-wide text-black"
                >
                    Saved Survey Interviews
                </h2>
                <p class="text-xs text-neutral-600">Offline Field Records</p>
            </div>

            <div class="flex items-center gap-2">
                <router-link
                    :to="{ name: 'new-interview' }"
                    class="border border-black bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                    + New Interview
                </router-link>
            </div>
        </div>

        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div class="flex-1">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by farmer name, municipality, province, or reference ID..."
                    class="w-full border border-black bg-white px-3 py-2 text-sm text-black focus:outline-none"
                    @input="handleSearch"
                />
            </div>
            <div class="text-xs font-semibold uppercase text-neutral-600">
                Total Saved: {{ totalCount }}
            </div>
        </div>

        <div
            v-if="loading"
            class="border border-black bg-white p-6 text-center text-sm text-neutral-700"
        >
            Loading saved interview records...
        </div>

        <div
            v-else-if="interviews.length === 0"
            class="border border-dashed border-black bg-white p-8 text-center"
        >
            <p class="text-sm font-bold uppercase text-black">
                No Interviews Found
            </p>
            <p class="mt-1 text-xs text-neutral-600">
                No farmer survey interviews have been recorded yet.
            </p>
            <div class="mt-4">
                <router-link
                    :to="{ name: 'new-interview' }"
                    class="inline-block border border-black bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                >
                    Start First Interview
                </router-link>
            </div>
        </div>

        <div v-else class="space-y-3">
            <div
                v-for="interview in interviews"
                :key="interview.referenceId"
                class="border border-black bg-white p-4"
            >
                <div
                    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <div class="flex items-center gap-2">
                            <span
                                class="text-xs font-mono font-bold uppercase text-neutral-600"
                            >
                                {{ interview.referenceId }}
                            </span>
                            <span
                                v-if="interview.farmerInfo.isRiceFarmer()"
                                class="border border-black bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-black"
                            >
                                Rice Farmer
                            </span>
                            <span
                                v-else
                                class="border border-neutral-400 bg-white px-1.5 py-0.5 text-[11px] text-neutral-600"
                            >
                                Non-Rice Farmer
                            </span>
                        </div>

                        <h3 class="mt-1 text-base font-bold text-black">
                            {{ interview.farmerInfo.b1q1FarmerName }}
                        </h3>

                        <div class="mt-1 text-xs text-neutral-700">
                            <span>Sex: {{ interview.farmerInfo.b1q2Sex }}</span>
                            <span class="mx-2">&bull;</span>
                            <span>Age: {{ interview.farmerInfo.b1q3Age }}</span>
                            <span class="mx-2">&bull;</span>
                            <span
                                >Location:
                                {{ interview.farmerInfo.b1q5MunicipalityCity }},
                                {{ interview.farmerInfo.b1q4Province }}</span
                            >
                        </div>

                        <div
                            v-if="
                                interview.farmerInfo.isRiceFarmer() &&
                                interview.riceFarmingInfo
                            "
                            class="mt-1 text-xs text-neutral-600"
                        >
                            <span
                                >Farm Area:
                                {{
                                    interview.riceFarmingInfo.b2q1TotalFarmArea
                                }}
                                ha</span
                            >
                            <span class="mx-2">&bull;</span>
                            <span
                                >Ecosystem:
                                {{
                                    interview.riceFarmingInfo
                                        .b2q2PrimaryEcosystem
                                }}</span
                            >
                            <span class="mx-2">&bull;</span>
                            <span
                                >Certified Seeds:
                                {{
                                    interview.riceFarmingInfo
                                        .b2q4UsesCertifiedSeeds
                                }}</span
                            >
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-between border-t border-neutral-200 pt-2 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0"
                    >
                        <span class="text-[11px] text-neutral-500">
                            {{ formatDate(interview.interviewDate) }}
                        </span>
                        <router-link
                            :to="{
                                name: 'interview-detail',
                                params: { id: interview.referenceId },
                            }"
                            class="border border-black bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-neutral-100 active:bg-neutral-200"
                        >
                            View Record
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { LocalSQLiteSurveyRepository } from "../../infrastructure/repositories/LocalSQLiteSurveyRepository";
import { GetSurveyInterviewsUseCase } from "../../application/use-cases/GetSurveyInterviewsUseCase";
import { SurveyInterview } from "../../domain/entities/SurveyInterview";

const surveyRepo = new LocalSQLiteSurveyRepository();
const getInterviewsUseCase = new GetSurveyInterviewsUseCase(surveyRepo);

const interviews = ref<SurveyInterview[]>([]);
const totalCount = ref<number>(0);
const loading = ref<boolean>(true);
const searchQuery = ref<string>("");

const loadInterviews = async (query = "") => {
    loading.value = true;
    try {
        interviews.value = await getInterviewsUseCase.execute(query);
        totalCount.value = await surveyRepo.count();
    } catch (e) {
        console.error("Error loading interviews from SQLite:", e);
    } finally {
        loading.value = false;
    }
};

let searchTimer: any = null;
const handleSearch = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        loadInterviews(searchQuery.value);
    }, 250);
};

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

onMounted(() => {
    loadInterviews();
});
</script>
