import { PHILIPPINE_PROVINCES } from './PhilippineProvinces';
import { PRODUCTION_CHALLENGES } from './ChallengesList';

export interface QuestionConfig {
    id: string;
    qNumber: string;
    label: string;
    type: 'text' | 'number' | 'radio' | 'dropdown' | 'checkbox' | 'textarea';
    badge: string;
    required: boolean | ((form: Record<string, any>) => boolean);
    options?: readonly string[];
    placeholder?: string;
    step?: string;
    min?: number;
    max?: number;
    isConditionalChild?: boolean;
    condition?: (form: Record<string, any>) => boolean;
}

export interface BlockConfig {
    id: string;
    subtitle: string;
    title: string;
    instructions: string;
    condition?: (form: Record<string, any>) => boolean;
    questions: QuestionConfig[];
}

export const QUESTIONNAIRE_BLOCKS: BlockConfig[] = [
    {
        id: 'block1',
        subtitle: 'Block 1',
        title: 'Farmer Information',
        instructions: 'Fill-in the required information',
        questions: [
            {
                id: 'B1Q1',
                qNumber: 'Q1',
                label: "Farmer's Full Name",
                type: 'text',
                badge: 'Text',
                placeholder: "Enter farmer's full name",
                required: true,
            },
            {
                id: 'B1Q2',
                qNumber: 'Q2',
                label: 'Sex',
                type: 'radio',
                badge: 'Single Choice',
                options: ['Male', 'Female'],
                required: true,
            },
            {
                id: 'B1Q3',
                qNumber: 'Q3',
                label: 'Age',
                type: 'number',
                badge: 'Numeric (whole number)',
                placeholder: 'e.g. 45',
                step: '1',
                min: 10,
                max: 120,
                required: true,
            },
            {
                id: 'B1Q4',
                qNumber: 'Q4',
                label: 'Province',
                type: 'dropdown',
                badge: 'Dropdown',
                options: PHILIPPINE_PROVINCES,
                required: true,
            },
            {
                id: 'B1Q5',
                qNumber: 'Q5',
                label: 'Municipality/City',
                type: 'text',
                badge: 'Text',
                placeholder: 'Enter municipality or city',
                required: true,
            },
            {
                id: 'B1Q6',
                qNumber: 'Q6',
                label: 'Is the farmer currently engaged in rice farming?',
                type: 'radio',
                badge: 'Single Choice',
                options: ['Yes', 'No'],
                required: true,
            },
        ],
    },
    {
        id: 'block2',
        subtitle: 'Block 2',
        title: 'Rice Farming Information',
        instructions: 'Fill-in the required information',
        // Condition: ONLY show Block 2 when B1Q6 is 'Yes' or true
        condition: (form: Record<string, any>) => form.B1Q6 === 'Yes' || form.B1Q6 === true,
        questions: [
            {
                id: 'B2Q1',
                qNumber: 'Q1',
                label: 'Total rice farm area (hectares)',
                type: 'number',
                badge: 'Decimal Number',
                placeholder: 'e.g. 1.75',
                step: '0.01',
                min: 0.01,
                required: true,
            },
            {
                id: 'B2Q2',
                qNumber: 'Q2',
                label: 'Primary rice ecosystem',
                type: 'radio',
                badge: 'Single Choice',
                options: ['Irrigated', 'Rainfed Lowland', 'Upland'],
                required: true,
            },
            {
                id: 'B2Q3',
                qNumber: 'Q3',
                label: 'Rice establishment method',
                type: 'radio',
                badge: 'Single Choice',
                options: ['Direct Seeding', 'Transplanting'],
                required: true,
            },
            {
                id: 'B2Q4',
                qNumber: 'Q4',
                label: 'Does the farmer use certified rice seeds?',
                type: 'radio',
                badge: 'Single Choice',
                options: ['Yes', 'No'],
                required: true,
            },
            {
                id: 'B2Q5',
                qNumber: 'Q5',
                label: 'If yes, what seed variety does the farmer primarily use?',
                type: 'text',
                badge: 'Text (Conditional)',
                placeholder: 'e.g. NSIC Rc 222, Rc 480',
                isConditionalChild: true,
                condition: (form: Record<string, any>) => form.B2Q4 === 'Yes',
                required: (form: Record<string, any>) => form.B2Q4 === 'Yes',
            },
            {
                id: 'B2Q6',
                qNumber: 'Q6',
                label: "What are the farmer's main rice production challenges?",
                type: 'checkbox',
                badge: 'Multiple Choice',
                options: PRODUCTION_CHALLENGES,
                required: true,
            },
            {
                id: 'B2Q7',
                qNumber: 'Q7',
                label: 'If Others is selected, please specify',
                type: 'text',
                badge: 'Text (Conditional)',
                placeholder: 'Specify other production challenge details...',
                isConditionalChild: true,
                condition: (form: Record<string, any>) =>
                    Array.isArray(form.B2Q6) && form.B2Q6.includes('Others'),
                required: (form: Record<string, any>) =>
                    Array.isArray(form.B2Q6) && form.B2Q6.includes('Others'),
            },
        ],
    },
];
