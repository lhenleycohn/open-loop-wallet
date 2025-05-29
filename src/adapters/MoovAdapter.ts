import { PaymentProvider } from '../services/PaymentProvider';
import { Wallet } from '../models/Wallet';
import { Transaction } from '../models/Transaction';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export class MoovAdapter implements PaymentProvider {
  async createWallet(userId: string): Promise<Wallet> {
    if (!userId) {
      throw new Error('userId is required to create a wallet');
    }
    const walletId = 'wallet-' + Math.random().toString(36).substr(2, 9);
    const insertPayload = { id: walletId, customer_id: userId, balance: 0 };
    console.log('Attempting to insert wallet:', insertPayload);
    const { data, error } = await supabase
      .from('wallets')
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase wallet insert error:', error, 'Payload:', insertPayload);
      throw new Error(`Failed to create wallet: ${error.message}`);
    }

    console.log('Wallet created in DB:', data);
    return { id: data.id, userId: data.customer_id, balance: data.balance };
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

  async createBusiness(businessName: string, ownerId: string): Promise<{ id: string; name: string }> {
    // Placeholder logic for creating a business
    return { id: 'business-123', name: businessName };
  }

  async createCustomer(customerName: string, email: string): Promise<{ id: string; name: string; email: string }> {
    // Placeholder logic for creating a customer
    return { id: 'customer-456', name: customerName, email };
  }

  async getWalletsForCustomer(userId: string) {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('customer_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }
}
