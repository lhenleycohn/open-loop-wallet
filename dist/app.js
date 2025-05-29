"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const MoovAdapter_1 = require("./adapters/MoovAdapter");
const cors_1 = __importDefault(require("cors"));
const customers_1 = __importDefault(require("./routes/customers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
const moovAdapter = new MoovAdapter_1.MoovAdapter();
// Middleware
app.use(body_parser_1.default.json());
console.log('Base Path:', process.env.MOOV_BASE_PATH);
console.log('Client ID:', process.env.MOOV_CLIENT_ID);
console.log('Current directory:', __dirname);
try {
    console.log('MoovAdapter path:', require.resolve('./adapters/MoovAdapter'));
}
catch (error) {
    if (error instanceof Error) {
        console.error('Error resolving MoovAdapter path:', error.message);
    }
    else {
        console.error('Error resolving MoovAdapter path:', String(error));
    }
}
// Routes
// Create a Wallet
app.post('/wallets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const wallet = yield moovAdapter.createWallet(userId);
        res.status(201).json(wallet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
}));
// Transfer Funds
app.post('/transfers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromWallet, toWallet, amount } = req.body;
    try {
        const transaction = yield moovAdapter.transferFunds(fromWallet, toWallet, amount);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to transfer funds' });
    }
}));
// Get Wallet Balance
app.get('/wallets/:walletId/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId } = req.params;
    try {
        const balance = yield moovAdapter.getBalance(walletId);
        res.status(200).json({ balance });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get wallet balance' });
    }
}));
// Withdraw to Bank
app.post('/withdrawals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, amount } = req.body;
    try {
        const transaction = yield moovAdapter.withdrawToBank(walletId, amount);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to withdraw to bank' });
    }
}));
// Create a Business
app.post('/businesses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, ownerId } = req.body;
    try {
        const business = yield moovAdapter.createBusiness(businessName, ownerId);
        res.status(201).json(business);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create business' });
    }
}));
// Customers routes
app.use('/customers', customers_1.default);
// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map