export type SexType = 'Male' | 'Female';
export type YesNoType = 'Yes' | 'No';

export interface FarmerInformationProps {
    b1q1FarmerName: string;
    b1q2Sex: SexType | '';
    b1q3Age: number | null;
    b1q4Province: string;
    b1q5MunicipalityCity: string;
    b1q6EngagedInRiceFarming: YesNoType | '';
}

export class FarmerInformation {
    public readonly b1q1FarmerName: string;
    public readonly b1q2Sex: SexType | '';
    public readonly b1q3Age: number | null;
    public readonly b1q4Province: string;
    public readonly b1q5MunicipalityCity: string;
    public readonly b1q6EngagedInRiceFarming: YesNoType | '';

    constructor(props: FarmerInformationProps) {
        this.b1q1FarmerName = props.b1q1FarmerName;
        this.b1q2Sex = props.b1q2Sex;
        this.b1q3Age = props.b1q3Age !== null && props.b1q3Age !== undefined ? Number(props.b1q3Age) : null;
        this.b1q4Province = props.b1q4Province;
        this.b1q5MunicipalityCity = props.b1q5MunicipalityCity;
        this.b1q6EngagedInRiceFarming = props.b1q6EngagedInRiceFarming;
    }

    public isRiceFarmer(): boolean {
        return this.b1q6EngagedInRiceFarming === 'Yes';
    }

    public static createEmpty(): FarmerInformation {
        return new FarmerInformation({
            b1q1FarmerName: '',
            b1q2Sex: '',
            b1q3Age: null,
            b1q4Province: '',
            b1q5MunicipalityCity: '',
            b1q6EngagedInRiceFarming: '',
        });
    }

    public static fromJSON(data: any): FarmerInformation {
        return new FarmerInformation({
            b1q1FarmerName: data.b1q1_farmer_name || data.b1q1FarmerName || '',
            b1q2Sex: data.b1q2_sex || data.b1q2Sex || '',
            b1q3Age: data.b1q3_age !== undefined ? Number(data.b1q3_age) : (data.b1q3Age !== undefined ? Number(data.b1q3Age) : null),
            b1q4Province: data.b1q4_province || data.b1q4Province || '',
            b1q5MunicipalityCity: data.b1q5_municipality_city || data.b1q5MunicipalityCity || '',
            b1q6EngagedInRiceFarming: data.b1q6_engaged_in_rice_farming || data.b1q6EngagedInRiceFarming || '',
        });
    }

    public toJSON() {
        return {
            b1q1_farmer_name: this.b1q1FarmerName,
            b1q2_sex: this.b1q2Sex,
            b1q3_age: this.b1q3Age,
            b1q4_province: this.b1q4Province,
            b1q5_municipality_city: this.b1q5MunicipalityCity,
            b1q6_engaged_in_rice_farming: this.b1q6EngagedInRiceFarming,
        };
    }
}
