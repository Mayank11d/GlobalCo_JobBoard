export interface Company {
    _id: string;
    name: string;
    description: string;
    website?: string;
    location?: string;
    logoUrl?: string;
    ownerId: string | any;
    createdAt: string;
    updatedAt: string;
}

export interface CompanyResponse {
    success: boolean;
    message: string;
    data: Company;
}

export interface CompaniesResponse {
    success: boolean;
    message: string;
    count: number;
    data: Company[];
}
