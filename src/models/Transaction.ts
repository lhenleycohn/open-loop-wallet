// Transaction.ts
export interface Transaction {
    id: string;
    fromWallet: string;
    toWallet: string;
    amount: number;
    status: string;
    // ...other fields as needed...
  }
