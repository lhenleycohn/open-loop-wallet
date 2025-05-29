import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create business
router.post('/', async (req, res) => {
  try {
    const { name, owner_id, status } = req.body;
    // owner_id should be the id from the customers table
    if (!name || !owner_id) {
      res.status(400).json({ error: 'name and owner_id (customer id) are required' });
      return;
    }
    const { data, error } = await supabase
      .from('businesses')
      .insert([{ name, owner_id, status: status || 'new' }])
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

// Get all businesses
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('businesses').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ data });
});

export default router;
