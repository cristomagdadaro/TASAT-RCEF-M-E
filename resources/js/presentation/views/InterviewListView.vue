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

        <div
            v-if="notificationMessage"
            class="mb-4 flex items-center justify-between border border-black bg-neutral-100 p-3 text-xs text-black"
        >
            <span class="font-semibold">{{ notificationMessage }}</span>
            <button
                type="button"
                @click="notificationMessage = null"
                class="font-bold uppercase text-black underline"
            >
                Dismiss
            </button>
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
            class="mb-3 flex items-center justify-between text-[11px] text-neutral-500"
        >
            <span
                >Mobile: Swipe right to delete &bull; Swipe left to update</span
            >
            <span class="hidden sm:inline">Web: Use inline action buttons</span>
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
                class="relative overflow-hidden border border-black bg-white select-none"
            >
                <div
                    class="absolute inset-y-0 left-0 flex w-full items-center justify-start bg-neutral-900 px-5 text-xs font-bold uppercase tracking-wider text-white"
                    :class="{
                        'opacity-100':
                            activeSwipeId === interview.referenceId &&
                            swipeOffsetX > 0,
                        'opacity-0':
                            activeSwipeId !== interview.referenceId ||
                            swipeOffsetX <= 0,
                    }"
                >
                    <span>Delete Record</span>
                </div>

                <div
                    class="absolute inset-y-0 right-0 flex w-full items-center justify-end bg-black px-5 text-xs font-bold uppercase tracking-wider text-white"
                    :class="{
                        'opacity-100':
                            activeSwipeId === interview.referenceId &&
                            swipeOffsetX < 0,
                        'opacity-0':
                            activeSwipeId !== interview.referenceId ||
                            swipeOffsetX >= 0,
                    }"
                >
                    <span>Update Record</span>
                </div>

                <div
                    class="relative bg-white p-4"
                    :style="getCardStyle(interview.referenceId)"
                    @touchstart="onTouchStart($event, interview.referenceId)"
                    @touchmove="onTouchMove($event, interview.referenceId)"
                    @touchend="onTouchEnd(interview)"
                    @mousedown="onMouseDown($event, interview.referenceId)"
                >
                    <div
                        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
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
                                <span
                                    >Sex:
                                    {{ interview.farmerInfo.b1q2Sex }}</span
                                >
                                <span class="mx-2">&bull;</span>
                                <span
                                    >Age:
                                    {{ interview.farmerInfo.b1q3Age }}</span
                                >
                                <span class="mx-2">&bull;</span>
                                <span
                                    >Location:
                                    {{
                                        interview.farmerInfo
                                            .b1q5MunicipalityCity
                                    }},
                                    {{
                                        interview.farmerInfo.b1q4Province
                                    }}</span
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
                                        interview.riceFarmingInfo
                                            .b2q1TotalFarmArea
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
                            class="flex flex-col items-start gap-2 border-t border-neutral-200 pt-2 sm:items-end sm:border-t-0 sm:pt-0"
                        >
                            <span class="text-[11px] text-neutral-500">
                                {{ formatDate(interview.interviewDate) }}
                            </span>
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <router-link
                                    :to="{
                                        name: 'interview-detail',
                                        params: { id: interview.referenceId },
                                    }"
                                    class="border border-black bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-neutral-100 active:bg-neutral-200"
                                >
                                    View Record
                                </router-link>
                                <router-link
                                    :to="{
                                        name: 'edit-interview',
                                        params: { id: interview.referenceId },
                                    }"
                                    class="border border-black bg-neutral-100 px-3 py-1 text-xs font-semibold text-black hover:bg-neutral-200 active:bg-neutral-300"
                                >
                                    Update
                                </router-link>
                                <button
                                    type="button"
                                    @click.stop="confirmDelete(interview)"
                                    class="border border-black bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-black hover:text-white active:bg-neutral-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="interviewToDelete"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
            <div
                class="w-full max-w-md border-2 border-black bg-white p-6 shadow-xl"
            >
                <h3 class="text-base font-bold uppercase text-black">
                    Confirm Record Deletion
                </h3>
                <p class="mt-2 text-xs text-neutral-700">
                    Are you sure you want to permanently delete interview record
                    <strong class="font-mono">{{
                        interviewToDelete.referenceId
                    }}</strong>
                    for
                    <strong>{{
                        interviewToDelete.farmerInfo.b1q1FarmerName
                    }}</strong
                    >?
                </p>
                <p class="mt-1 text-xs text-neutral-500">
                    This offline SQLite database record will be removed from
                    this device.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        @click="interviewToDelete = null"
                        class="border border-black bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        @click="executeDelete"
                        class="border border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800"
                    >
                        Delete Record
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { LocalSQLiteSurveyRepository } from "../../infrastructure/repositories/LocalSQLiteSurveyRepository";
import { GetSurveyInterviewsUseCase } from "../../application/use-cases/GetSurveyInterviewsUseCase";
import { DeleteSurveyInterviewUseCase } from "../../application/use-cases/DeleteSurveyInterviewUseCase";
import { SurveyInterview } from "../../domain/entities/SurveyInterview";

const router = useRouter();
const surveyRepo = new LocalSQLiteSurveyRepository();
const getInterviewsUseCase = new GetSurveyInterviewsUseCase(surveyRepo);
const deleteInterviewUseCase = new DeleteSurveyInterviewUseCase(surveyRepo);

const interviews = ref<SurveyInterview[]>([]);
const totalCount = ref<number>(0);
const loading = ref<boolean>(true);
const searchQuery = ref<string>("");
const notificationMessage = ref<string | null>(null);
const interviewToDelete = ref<SurveyInterview | null>(null);

const activeSwipeId = ref<string | null>(null);
const swipeOffsetX = ref<number>(0);
const isSwiping = ref<boolean>(false);

let startX = 0;
let startY = 0;
let isHorizontal = false;
let isMouseDown = false;
let mouseTargetInterview: SurveyInterview | null = null;

const getCardStyle = (refId: string) => {
    if (activeSwipeId.value === refId) {
        return {
            transform: `translateX(${swipeOffsetX.value}px)`,
            transition: isSwiping.value ? "none" : "transform 0.2s ease-out",
        };
    }
    return {
        transform: "translateX(0px)",
        transition: "transform 0.2s ease-out",
    };
};

const onTouchStart = (e: TouchEvent, refId: string) => {
    if (activeSwipeId.value && activeSwipeId.value !== refId) {
        activeSwipeId.value = null;
        swipeOffsetX.value = 0;
    }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isHorizontal = false;
    isSwiping.value = false;
};

const onTouchMove = (e: TouchEvent, refId: string) => {
    const diffX = e.touches[0].clientX - startX;
    const diffY = e.touches[0].clientY - startY;

    if (!isSwiping.value) {
        if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isHorizontal = true;
            isSwiping.value = true;
            activeSwipeId.value = refId;
        } else if (Math.abs(diffY) > 10) {
            return;
        }
    }

    if (isHorizontal && activeSwipeId.value === refId) {
        swipeOffsetX.value = Math.max(-130, Math.min(130, diffX));
    }
};

const onTouchEnd = (interview: SurveyInterview) => {
    if (!isSwiping.value || activeSwipeId.value !== interview.referenceId) {
        swipeOffsetX.value = 0;
        activeSwipeId.value = null;
        isSwiping.value = false;
        return;
    }

    const threshold = 70;
    const finalOffset = swipeOffsetX.value;

    if (finalOffset > threshold) {
        swipeOffsetX.value = 0;
        activeSwipeId.value = null;
        confirmDelete(interview);
    } else if (finalOffset < -threshold) {
        swipeOffsetX.value = 0;
        activeSwipeId.value = null;
        router.push({
            name: "edit-interview",
            params: { id: interview.referenceId },
        });
    } else {
        swipeOffsetX.value = 0;
        activeSwipeId.value = null;
    }

    isSwiping.value = false;
};

const onMouseDown = (e: MouseEvent, refId: string) => {
    if (e.button !== 0) return;
    if (activeSwipeId.value && activeSwipeId.value !== refId) {
        activeSwipeId.value = null;
        swipeOffsetX.value = 0;
    }
    startX = e.clientX;
    startY = e.clientY;
    isHorizontal = false;
    isSwiping.value = false;
    isMouseDown = true;
    activeSwipeId.value = refId;
    mouseTargetInterview =
        interviews.value.find((i) => i.referenceId === refId) || null;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
    if (!isMouseDown) return;
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;

    if (!isSwiping.value) {
        if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isHorizontal = true;
            isSwiping.value = true;
        } else if (Math.abs(diffY) > 10) {
            return;
        }
    }

    if (isHorizontal) {
        swipeOffsetX.value = Math.max(-130, Math.min(130, diffX));
    }
};

const onMouseUp = () => {
    if (!isMouseDown) return;
    isMouseDown = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);

    if (isSwiping.value && mouseTargetInterview) {
        const threshold = 70;
        const finalOffset = swipeOffsetX.value;

        if (finalOffset > threshold) {
            confirmDelete(mouseTargetInterview);
        } else if (finalOffset < -threshold) {
            router.push({
                name: "edit-interview",
                params: { id: mouseTargetInterview.referenceId },
            });
        }
    }

    swipeOffsetX.value = 0;
    activeSwipeId.value = null;
    isSwiping.value = false;
    mouseTargetInterview = null;
};

const confirmDelete = (interview: SurveyInterview) => {
    interviewToDelete.value = interview;
};

const executeDelete = async () => {
    if (!interviewToDelete.value) return;
    const refId = interviewToDelete.value.referenceId;
    try {
        await deleteInterviewUseCase.execute(refId);
        notificationMessage.value = `Interview record ${refId} successfully deleted.`;
        interviewToDelete.value = null;
        await loadInterviews(searchQuery.value);
        setTimeout(() => {
            notificationMessage.value = null;
        }, 4000);
    } catch (e) {
        console.error("Failed to delete interview:", e);
    }
};

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

onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
});
</script>
