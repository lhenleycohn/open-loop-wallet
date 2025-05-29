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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovAdapter = void 0;
class MoovAdapter {
    createWallet(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return { id: 'wallet-123', userId, balance: 0 };
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
}
exports.MoovAdapter = MoovAdapter;
//# sourceMappingURL=MoovAdapter.js.map