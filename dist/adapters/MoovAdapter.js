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
exports.MoovAdapter = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
class MoovAdapter {
    createWallet(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('userId is required to create a wallet');
            }
            const walletId = 'wallet-' + Math.random().toString(36).substr(2, 9);
            const insertPayload = { id: walletId, customer_id: userId, balance: 0 };
            console.log('Attempting to insert wallet:', insertPayload);
            const { data, error } = yield supabase
                .from('wallets')
                .insert([insertPayload])
                .select()
                .single();
            if (error) {
                console.error('Supabase wallet insert error:', error, 'Payload:', insertPayload);
                throw new Error(`Failed to create wallet: ${error.message}`);
            }
            console.log('Wallet created in DB:', data);
            return { id: data.id, userId: data.customer_id, balance: data.balance };
        });
    }
    transferFunds(from, to, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: 'tx-456',
                fromWallet: from.id,
                toWallet: to.id,
                amount,
                status: "settled"
            };
        });
    }
    getBalance(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            // placeholder logic
            return 100;
        });
    }
    issueRefund(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            // placeholder refund logic
            return {
                id: 'tx-refund',
                fromWallet: 'merchant-wallet',
                toWallet: 'customer-wallet',
                amount: 50,
                status: "settled"
            };
        });
    }
    linkBankAccount(userId, plaidToken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Linking bank for user ${userId} using Plaid token ${plaidToken}`);
        });
    }
    withdrawToBank(walletId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: 'tx-withdraw',
                fromWallet: walletId,
                toWallet: 'external-bank',
                amount,
                status: "settled"
            };
        });
    }
    createBusiness(businessName, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for creating a business
            return { id: 'business-123', name: businessName };
        });
    }
    createCustomer(customerName, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for creating a customer
            return { id: 'customer-456', name: customerName, email };
        });
    }
    getWalletsForCustomer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from('wallets')
                .select('*')
                .eq('customer_id', userId);
            if (error)
                throw new Error(error.message);
            return data;
        });
    }
}
exports.MoovAdapter = MoovAdapter;
//# sourceMappingURL=MoovAdapter.js.map