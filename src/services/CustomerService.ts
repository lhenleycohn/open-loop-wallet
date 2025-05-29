import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Customer } from '../models/Customer';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl) throw new Error('SUPABASE_URL is required.');
if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_KEY is required.');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function getAllCustomers(): Promise<Customer[]> {
  // Use left join and select wallets.id as walletId directly
  const { data, error } = await supabase
    .from('customers')
    .select('id, name, email, status, created_at, wallets(id)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Map walletId to top-level property for each customer
  return data.map((customer: any) => {
    const walletId: string | null =
      Array.isArray(customer.wallets) && customer.wallets.length > 0
        ? customer.wallets[0].id
        : null;
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      status: customer.status,
      walletId,
      // ...other fields if needed...
    } as Customer;
  });
}
