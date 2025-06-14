import { Router, Request, Response } from 'express';
import { getAllCustomers } from '../services/CustomerService';
import { createClient } from '@supabase/supabase-js';

const router = Router();

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

router.get('/', async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Create customer
router.post('/', async (req, res) => {
  try {
    const { customerName, email, status } = req.body;
    if (!customerName || !email) {
      res.status(400).json({ error: 'customerName and email are required in the request body', received: req.body });
      return;
    }
    const { data, error } = await supabase
      .from('customers')
      .insert([{ name: customerName, email, status: status || 'new' }])
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
