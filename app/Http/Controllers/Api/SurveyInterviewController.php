<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSurveyInterviewRequest;
use App\Services\SurveyInterviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SurveyInterviewController extends Controller
{
    public function __construct(
        protected SurveyInterviewService $surveyService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = [
            'search' => $request->query('search'),
            'enumerator_id' => $request->query('enumerator_id'),
        ];

        $interviews = $this->surveyService->listInterviews($filters);

        return response()->json([
            'status' => 'success',
            'data' => $interviews,
            'count' => $interviews->count(),
        ]);
    }

    public function show(int|string $id): JsonResponse
    {
        $interview = $this->surveyService->getInterview($id);

        if (!$interview) {
            $interview = $this->surveyService->getInterviewByReference((string) $id);
        }

        if (!$interview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Interview record not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $interview,
        ]);
    }

    public function store(StoreSurveyInterviewRequest $request): JsonResponse
    {
        $user = $request->user();
        $interview = $this->surveyService->storeInterview(
            $request->validated(),
            $user?->id,
            $user?->name
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer survey interview recorded successfully',
            'data' => $interview,
        ], 201);
    }
}
