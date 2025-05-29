import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Wallet } from '../models/Wallet';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl) throw new Error('SUPABASE_URL is required.');
if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_KEY is required.');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// No need to redefine Wallet type here, use the imported one

export async function getWalletById(walletId: string): Promise<Wallet> {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('id', walletId)
    .single();

  if (error || !data) throw error || new Error('Wallet not found');
  return data as Wallet;
}
