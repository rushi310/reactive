
export interface Iuser {
    id?: string;
    name: string;
    role: string;
    experience: string;
    status: boolean;
    description: string;
    imageUrl: string;

    currentAddress: {
        city: string;
        state: string;
        country: string;
        zipcode: string;
    };

    permanentAddress: {
        city: string;
        state: string;
        country: string;
        zipcode: string;
    };

    isAddSame: boolean;
    skills: string[];

    createdAt?: any;
}
