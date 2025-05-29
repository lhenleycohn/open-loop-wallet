import { Router, Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { MoovAdapter } from '../adapters/MoovAdapter';

const router = Router();
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Get wallets for a customer
router.get('/customer/:customerId', async (req: Request, res: Response, next: NextFunction) => {
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
    next(err);
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

export default router;
