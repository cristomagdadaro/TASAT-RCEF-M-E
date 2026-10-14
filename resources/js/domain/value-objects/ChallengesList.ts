export const PRODUCTION_CHALLENGES = [
    'High fertilizer cost',
    'Pest and disease',
    'Lack of irrigation',
    'Labor shortage',
    'Low selling price',
    'Others',
] as const;

export type ProductionChallengeType = (typeof PRODUCTION_CHALLENGES)[number];
