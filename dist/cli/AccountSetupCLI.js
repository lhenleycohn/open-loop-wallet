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
exports.AccountSetupCLI = void 0;
const readline_1 = __importDefault(require("readline"));
class AccountSetupCLI {
    constructor() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    prompt(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.rl.question(question, (answer) => resolve(answer));
            });
        });
    }
    gatherAccountInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Please provide the following information to create an account:');
            const userId = process.env.USER_ID || ''; // Pull userId from environment variables
            if (!userId) {
                throw new Error('USER_ID environment variable is not set.');
            }
            const name = yield this.prompt('Name: ');
            const email = yield this.prompt('Email: ');
            return { userId, name, email };
        });
    }
    gatherWalletInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Please provide the following information to create a wallet:');
            const userId = process.env.USER_ID || ''; // Pull userId from environment variables
            if (!userId) {
                throw new Error('USER_ID environment variable is not set.');
            }
            return { userId };
        });
    }
    gatherTransactionInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Please provide the following information to create a transaction:');
            const fromWallet = yield this.prompt('From Wallet ID: ');
            const toWallet = yield this.prompt('To Wallet ID: ');
            const amount = parseFloat(yield this.prompt('Amount (in cents): '));
            return { fromWallet, toWallet, amount };
        });
    }
    close() {
        this.rl.close();
    }
}
exports.AccountSetupCLI = AccountSetupCLI;
//# sourceMappingURL=AccountSetupCLI.js.map