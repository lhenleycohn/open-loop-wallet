export interface Merchant {
  id: string;
  name: string;
  email: string;
  businessName: string;
  kycStatus: "unverified" | "pending" | "verified";
}