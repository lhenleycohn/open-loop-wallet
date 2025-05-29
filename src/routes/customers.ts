import { Router } from 'express';

const router = Router();

// Dummy data for demonstration
const customers = [
  { id: '1', name: 'Alice', status: 'new' },
  { id: '2', name: 'Bob', status: 'in_progress' },
  { id: '3', name: 'Carol', status: 'completed' },
];

router.get('/', (req, res) => {
  res.json(customers);
});

export default router;
