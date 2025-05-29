
import { Wallet, Transaction } from '../models';

export interface PaymentProvider {
    createWallet(userId: string): Promise<Wallet>;
    transferFunds(from: Wallet, to: Wallet, amount: number): Promise<Transaction>;
    getBalance(walletId: string): Promise<number>;
    issueRefund(txId: string): Promise<Transaction>;
    linkBankAccount(userId: string, plaidToken: string): Promise<void>;
    withdrawToBank(walletId: string, amount: number): Promise<Transaction>;
  }
  