import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { MoovAdapter } from './adapters/MoovAdapter';
import cors from 'cors';
import customersRouter from './routes/customers';
import walletsRouter from './routes/wallets';

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
const moovAdapter = new MoovAdapter();

// Middleware
app.use(bodyParser.json());

console.log('Base Path:', process.env.MOOV_BASE_PATH);
console.log('Client ID:', process.env.MOOV_CLIENT_ID);
console.log('Current directory:', __dirname);
console.log('NODE_ENV:', process.env.NODE_ENV);

try {
  console.log('MoovAdapter path:', require.resolve('./adapters/MoovAdapter'));
} catch (error) {
  if (error instanceof Error) {
    console.error('Error resolving MoovAdapter path:', error.message);
  } else {
    console.error('Error resolving MoovAdapter path:', String(error));
  }
}

// Routes

// Transfer Funds
app.post('/transfers', async (req, res) => {
  const { fromWallet, toWallet, amount } = req.body;
  try {
    // If MoovAdapter does not have getWalletById, use wallet IDs directly
    const transaction = await moovAdapter.transferFunds(fromWallet, toWallet, amount);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to transfer funds' });
  }
});

// Withdraw to Bank
app.post('/withdrawals', async (req, res) => {
  const { walletId, amount } = req.body;
  try {
    const transaction = await moovAdapter.withdrawToBank(walletId, amount);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to withdraw to bank' });
  }
});

// Create a Business
app.post('/businesses', async (req, res) => {
  const { businessName, ownerId } = req.body;
  try {
    const business = await moovAdapter.createBusiness(businessName, ownerId);
    res.status(201).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create business' });
  }
});

// Customers routes
app.use('/customers', customersRouter);

// Wallets routes
app.use('/wallets', walletsRouter);

// Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// At the end, only start the server:
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});