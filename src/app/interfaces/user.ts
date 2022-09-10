export interface User {
    id?: string;
    name: string;
    birthDay: any;
    tall: number;
    weight: number;
    userDetails?: {
        bmi?: number;
        bmr?: number;
        ccal?: number;
        protein?: number;
        fat?: number;
        carb?: number;
    }
}

