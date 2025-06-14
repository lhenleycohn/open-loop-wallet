import { PaymentProvider } from '../services/PaymentProvider';
import { Wallet, Transaction } from '../models';

export class MoovAdapter implements PaymentProvider {
  async createWallet(userId: string): Promise<Wallet> {
    return { id: 'wallet-123', userId, balance: 0 };
  }

  async transferFunds(from: Wallet, to: Wallet, amount: number): Promise<Transaction> {
    return {
      id: 'tx-456',
      fromWallet: from.id,
      toWallet: to.id,
      amount,
      status: "settled"
    };
  }

  async getBalance(walletId: string): Promise<number> {
    // placeholder logic
    return 100;
  }

  async issueRefund(txId: string): Promise<Transaction> {
    // placeholder refund logic
    return {
      id: 'tx-refund',
      fromWallet: 'merchant-wallet',
      toWallet: 'customer-wallet',
      amount: 50,
      status: "settled"
    };
  }

  async linkBankAccount(userId: string, plaidToken: string): Promise<void> {
    console.log(`Linking bank for user ${userId} using Plaid token ${plaidToken}`);
  }

  async withdrawToBank(walletId: string, amount: number): Promise<Transaction> {
    return {
      id: 'tx-withdraw',
      fromWallet: walletId,
      toWallet: 'external-bank',
      amount,
      status: "settled"
    };
  }
}
