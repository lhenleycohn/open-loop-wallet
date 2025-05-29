import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Get wallets for a customer
router.get('/customer/:customerId', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('customer_id', customerId);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get wallet balance from DB
router.get('/:walletId/balance', async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const { data, error } = await supabase
      .from('wallets')
      .select('balance')
      .eq('id', walletId)
      .single();
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ balance: data?.balance ?? 0 });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example route to demonstrate correct typing
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // ...existing code for this route...
});

export default router;