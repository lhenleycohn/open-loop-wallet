// Transaction.ts
export interface Transaction {
    id: string;
    fromWallet: string;
    toWallet: string;
    amount: number;
    status: "pending" | "settled" | "failed";
    providerTxId?: string;
  }
  