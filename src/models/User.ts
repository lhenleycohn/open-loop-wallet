export interface User {
    id: string;
    name: string;
    email: string;
    kycStatus: "unverified" | "pending" | "verified";
}