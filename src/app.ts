import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MoovAdapter } from './adapters/MoovAdapter';
import cors from 'cors';
import customersRouter from './routes/customers';

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
const moovAdapter = new MoovAdapter();

// Middleware
app.use(bodyParser.json());

console.log('Base Path:', process.env.MOOV_BASE_PATH);
console.log('Client ID:', process.env.MOOV_CLIENT_ID);
console.log('Current directory:', __dirname);

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

// Create a Wallet
app.post('/wallets', async (req, res) => {
  const { userId } = req.body;
  try {
    const wallet = await moovAdapter.createWallet(userId);
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create wallet' });
  }
});

// Transfer Funds
app.post('/transfers', async (req, res) => {
  const { fromWallet, toWallet, amount } = req.body;
  try {
    const transaction = await moovAdapter.transferFunds(fromWallet, toWallet, amount);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to transfer funds' });
  }
});

// Get Wallet Balance
app.get('/wallets/:walletId/balance', async (req, res) => {
  const { walletId } = req.params;
  try {
    const balance = await moovAdapter.getBalance(walletId);
    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get wallet balance' });
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

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});